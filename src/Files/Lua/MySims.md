# Lua

{{#include ../../includes/MySimsSpecific.md}}

MySims uses lua 5.1 as internal scripting, they almost always attach to GameObjects, but there are some hints on global classes too. Lua does not have engine access, only scripting capabilities and is therefore considered the 'front-end'.

<!-- toc -->

## Game Validation:
When loading the game, it seems every lua script is validated after the intro screen (the one with the MySims logo being assembled by sims). If a script has an error, this often means the game won't let you choose your save.

However, if your script passed the screen, another way to figure out there's a fault somewhere, is when your playable sim will just teleport in random places in the world.

## Error logging:
A quick insight paragraph on what type of logging we can and cannot be using when scripting for MySims PC

#### EA logger:
There aren't many ways to log errors in the game just yet. While it ships with a "logger", this seems to be an internal tool that EA used that would essentially 'click' onto the game to show you the error logs or even debug messages. This, however, is not available in the released version of the game, nor is the ea logger available to the public, and therefore is deemed not the way to error log your scripts.

#### How to log potential issues:
While this is still a very new area that hasn't been explored much, or possibly not shared with the community, the only way that might help "debugging" your code as of now is using the "modal" approach, that is used in other sims games. For this, the use of "DisplayMessage()" is recommended. You don't have to import this, as it's a global function within the game's codebase.

Example: 

```lua
DisplayMessage("My Debug Logger - title", "1")

sim = GetPlayerGameObject() -- Simply fluff code

-- Either continue our count...
DisplayMessage("My Debug Logger - title", "2")

-- OR, we print the variable, if necessary:
DisplayMessage("My Debug Logger - title", tostring(sim))

-- etc, etc....
```

If in all your messages print, *Yay!* If not, make sure to double check where it stopped last, and maybe try logging more variables.

#### Using Pcall()
Now, you might be curious why we don't use pcall() here to error check instead. While in some cases it may be possible to use it, know that, because a lot of things will be called on the same thread, Lua will complain about "tempt to yield across metamethod/C-call boundary" or in that same spirit. Since MySims was written on 5.1, **pcall() isn't yieldable, unlike pcall() in lua 5.2 and higher.**

While there are libraries that "patch" this out, this won't be possible with the way lua libraries are installed.


## GameObjects:
Meant in a very broad way. Including not just furniture and what we would consider *"objects"* in the real world, but also: *sims, furniture, trees, Essences, Buildings, etc.* Excluding the level or the world.

All GameObjects that are NOT Player built through CAB (Create a Build), inherit the class **"ScriptObjectBase"**. It sets up the bare basics for our GameObject to eventually make it possible to do things. It also handles tuning values (aka, the values we can adjust for something to happen more/less) and has an inherited animations table we can use.

Objects that are however CAB-made, use "ConstructedObjectBase" instead. Often the interactions are split from the main script object's class script, probably to avoid huge files.

**Keep in mind that a lot of these objects are made with an Object Oriented approach!**

###### Standard Basic ScriptObjectBase setup:

```lua
require "ScriptObjectBase"

-- Example: FishingBob = ScriptObjectBase:Inherit( "FishingBob" )
Your_Class_Name_Here = ScriptObjectBase:Inherit( "Needs_To_be_same_as_Class_Name" )

-- Required. Used often for instantiating variables, before usage. Also Instantiates your class.
function Your_Class_Name_Here:Constructor()
end 

-- Not required, but useful: De-instantiates your object if it needs to be destroyed according to the game/script. Often we remove FX effects here.
function Your_Class_Name_Here:Destructor()
end


-- For interactions, See "Interactions" and how to register them to your object
```

###### Standard Basic ConstructedObjectBase setup:

```lua
require "ConstructedObjectBase"

-- Example: FlowerStand = ConstructedObjectBase:Inherit("FlowerStand")
Your_Class_Name_Here = ConstructedObjectBase:Inherit( "Needs_To_be_same_as_Class_Name" )

-- EA Constructed Objects often include/override the animation table. Example is taken from FlowerStand.lua
Your_Class_Name_Here._animations = 
{
	ANIM_SNIFF               = { sim = "a2o-flowerStand-sniffFlowers" },
    ANIM_FLOWER_WATER_START  = { sim = "a2o-water-start" },
    ANIM_FLOWER_WATER_LOOP   = { sim = "a2o-flowerStand-water" },
    ANIM_FLOWER_WATER_STOP   = { sim = "a2o-water-stop" },
    ANIM_PRUNE               = { sim = "a2o-flowerStand-prune" },
}


-- Required. Used often for instantiating variables, before usage. Also Instantiates your class.
function Your_Class_Name_Here:Constructor()
end 

-- Not required, but useful: De-instantiates your object if it needs to be destroyed according to the game/script. Often we remove FX effects here.
function Your_Class_Name_Here:Destructor()
end

-- For interactions, See "Interactions" and how to register them to your object

```


Keep in mind that the game seems to point to also use an XML of the GameObject to refer to some definitions. Probably to instantiate the item with the right assets from the game file packages?

Here's an example (Keep in mind that these objects are considered ScriptObjectBase!!):

```xml
<?xml version="1.0" encoding="utf-8"?>
<ObjectDef> <!-- Seems to depend on the folder its in. Definetly want to check that out -->
 
    <!-- See rig explanation -->   
    <Model>flowerTulipMature</Model>
 
    <!-- rig name. Should be found in the game files with the same name. It's possible that it's one of those name -> fnv32 hashes, where the instance is that.
    <Rig>flowerMature-rig</Rig>
 
    <!-- Name of the variable we call when inheriting in our LUA script. could also be the lua file name without the '.lua' part. -->
    <Script>Flower</Script> 

    <CollisionInfo>0 0.05 0 0.5 0.1 0.5 3</CollisionInfo>	<!-- 3:cylinder --> <!-- Vector4? -->
    <NoFootPrint>1</NoFootPrint> <!-- standard numeric boolean. 0 = false, 1 = true -->
	
</ObjectDef>
```

## Interactions
If you're familiar with Sims 3 coding, this will be very similar to that structure wise.

These can be found on any gameobjects (sims, furniture, trees, etc) and make the object do something. Interactions always come with a: "Test()"  and "Run()" Making them the bare minimum to make them work.

A basic Interaction often looks something like this:

```lua 
require "InteractionBase"

GameObject_InteractionNameHere = InteractionSystem:MakeClass( InteractionBase, "GameObject_InteractionNameHere" )

function GameObject_InteractionNameHere:Test(sim,obj)
    return false -- or true! True means it will show our interaction.
end

function GameObject_InteractionNameHere:Run()
end

```

#### Test()
Before we see our interaction when standing in front of our object, or NPC (or ourself if you have Debug Enabler downloaded!), the game checks if the interaction should even be shown at all. "Can we fire it? Is this the correct candidate?" Is basically what it asks.

This can work for both our "actor' and "target" (example: actor=player, target=game object)

Only want Cute sims to use this interaction? Not a problem! That's what you'd want to filter out in Test().

#### Run()
This is where the magic happens. Here, we make the interaction useable and animatable (or just have our sim animate!)... or for a super simple test, even 'talk' with 'DialogMessage()'.

###### A few useful functions/params to know and use inside "Run()"

```lua


            -- Gets the world:
            GetWorld()

            -- Gets player:
            GetPlayerGameObject()


            -- Route to our slot and see if it was successful!
            primResult, primReason = RouteToSlot( sim, obj, 0 )
            if primResult ~= BlockingResult.Succeeded then
                return
            end

            -- But sometimes we want to route to the footprint instead (think... the object's boundary box. Not the best analogy but feel free to edit!)
            local primResult, primReason = RouteToFootprint( sim, obj )
            if primResult ~= BlockingResult.Succeeded then
                return
            end

            -- Remove Game Obejct:
            RemoveObject(self)

            -- Spawn Object:
            SpawnObject("MineralDispensor", "ObjectDefs/Dispenser_Generic_Def.xml", ObjectTypes.eHarvestingNode, x, y, z, 0)  -- Params: className? or ModelName?, def xml of item, objecttype, x, y, z, degrees

            -- Play animation (Without callback)
            primResult, primReason = PlayAnimBlocking( sim, "a-danceOff-start", 1 ) Params: gameObject, table containing animation strings for sim/object (But anim key is fine here too), Loop count.
            if primResult ~= BlockingResult.Succeeded then
                return
            end

            -- Slightly different approach, now with callback
            primResult, primReason = PlayAnimBlocking( sim, anim, 1, self, self.AnimateCallback ) -- Params: Actor, Anim key, numeric Boolean, parent (your class), function inside your class. 

            -- Attaches Object to other object (think: teacup snapped to sim's hand). 
            AttachToObject( self, "propPicnicBasket", "ContainmentSlot_8" ) --Params: Parent (mostly a sim, but can be any gameobject), modelName of prop/gameobject, slot name.

            -- Cancel Interaction for player. (MIGHT work on townies. need to double confirm this).
            self:CancelUserInteractions()

            -- Sets the item as "used" as it were. This way no other sims will see interactions for it.
            self:DisallowInteractions( true ) -- true == disallow, false == allow.

            -- 'sim' can be anything, but EA only uses it for sims for obvious reasons.
            -- Pushes the sim to follow another interaction, canceling the previous one so this one can now play.
            sim:PushInteraction( self, "Start", nil, nil, true ) -- GameObject with interaction, classname of interaction, potential params needed for your interaction, boolean = ? not sure yet. If it's the same as TS3, means if it should continue as pushed.


            -- Returns a vector3 of the pos of your GameObject:
            local x,y,z = GetGameObjectPosition(self)


            -- returns a vector3 type for where the slot position and rotation is:
            -- EA only seems to want the x and y variable, hence the _ which stands for "blank".
            local x,_,z    = GetSlotPositionRotation(obj, SlotTypes.kRoutingSlot, 0) -- params: GameObject itself, slot name, z index?

            -- Gets the object rotation. returns a vector3.
            local _,yRot,_ = GetGameObjectOrientation(obj) -- Pararms: GameObject.

            -- Get floor height of item. Might not be necessary ever, but you never know!
            local y = GetFloorHeightAt( pos.x, 0, pos.z ) -- Make sure to at least grab and parse the x and z positions!

            -- Is object facing other object?
            -- Here I made a quick example of what it could look like. obj: can be GameObject or sim. sim can be GameObject or sim.
            obj:IsFacing(sim)

            -- rotate the sim/object towards the pos given. 
            primResult, primReason = RotateToFacePosBlocked( sim, x, z ) -- item to move, x pos, z pos. Possibly has a variation where a y pos is possible?
            if primResult ~= BlockingResult.Succeeded then
                return
            end



            -- Snap item to position/rotation you wish it to be at:
            SnapToPositionRotation( self, x, y, z, 360degrees) -- Item to rotate, x,y,z, 360 degrees.

            -- Get camera zoom. Returns Float.
            GetCameraZoom()

            -- Change camera zoom!
            SetCameraZoom( val ) -- float for zoom. 10 is far, 1.0 is close.

            -- Create fx effect! Make sure to attach it to an nil object inside "contructor()"!
            self.fxHandle = CreateFx( "tulip-Effects", x, y, z, false ) -- Params: Effect name (check game files), x,y,z, I believe the last one is for if it needs to load instantly?

          -- proper logic of destroying your fx.
          if self.fxHandle ~= nil then
              DestroyFx(self.fxHandle)
              self.fxHandle = nil
          end

            -- Get current Sim time!
            local day, hour, minute = GetSimTime()

            

            -- FULL INTEREST TYPES TABLE:
            -- InterestType["kFood"]
            -- InterestType["kSciFi"]
            -- InterestType["kSpooky"]
            -- InterestType["kCute"]
            -- InterestType["kStudies"]
            -- InterestType["kFun"]

            -- Get sim's primary interest. InterestType table is global, so can be used as in the example.
            if sim:GetPrimaryInterest() == InterestType["kFood"]
            end

            -- Buuut if we need all the interest of the sim (sometimes they have multiple!)
            sim:GetInterests() -- returns a table.

            -- Get the needs of the object (Works on Sims only, unless you know what you're doing)
            sim:GetNeeds()
    

            -- Set a timer. This is useful if a function needs firing every second, minute, day or hour. (It's good to check "ActivityRocketLauncher's "CreateTimer()" function for inspiration)
            -- MAKE SURE TO CREATE AN NIL OBJECT UNDER CONTRUCTION! Call it timer or whatever you like. Just don't refer to your GameObject!!
            TODTimerCreateRel( self.timer, days, hours, minutes, seconds ) -- Params: If you don't need to set any time units, just set it to 0.
          
            -- Kill Timer, otherwise it will never stop! D:
            TODTimerKill(self.timer)

            -- Sleeps the simulator. Basically when there's a lot to process, it's good to "sleep" the simulator fora few ticks. The game will continue to run fine however and won't freeze.
            Sleep(30) -- Params: Ticks to sleep for. NOTE: the game's ticks seem to be frames related, but need to double confirm this.

            -- Gets random object weighted (the weight is often defined in the table.) See: CharacterBase.
            SelectRandomWeighted(CharacterBase._idleAnimations, true) -- table with weights, boolean = ?
            
            -- Global function: Get random number till 100.
            GetRandomInteger(100)

```

### Interaction Definitions & Registering our interaction
TO DO! but this is where the magic happens :D



## Animations:

TO-DO!!!!

[Lyralei] - I FINALLY figured it out, but still need to wrap my head around how to write it all out :p 
Basically, depending on the approach and whether it uses ConstructedObjectBase (CAB furniture) or ScriptObjectBase (non CAB items), it looks at the _kAnimations table.

Take, Couch.lua for example. It comes with a Couch._animations  table.

It also refers to what our sim or object should animate, referring to the CLIP Key name.

```lua
Couch._animations = 
{
    ANIM_COUCH_GETIN_START          = { sim = "a2o-getIn-start",                        obj = nil, },
}
```

However, for simple objects with animations, it seems to just use parameters and a table with specific keys, to loop/do the animations for us. Unless, we have a more complex object (such as `ActivityBookParty` where we have to fire a lot of animations in different ways due to variety.

Example:

```lua

Couch_Interaction_Nap.def = 
{
    ANIM_GETIN_START    = Couch._animations.ANIM_COUCH_GETIN_START,
    ANIM_GETIN_STOP     = Couch._animations.ANIM_COUCH_GETIN_STOP,
    ANIM_TRANS_IN       = Couch._animations.ANIM_COUCH_SLEEP_START,
    ANIM_LOOPS          = {
                            {   anim = Couch._animations.ANIM_COUCH_SLEEP_BREATHE,
                                stateInfo   =   {
                                                    { startState="base", endState="sleep",      weight=100,},
                                                    { startState="sleep", endState="sleep",      weight=100,},
                                                    { startState="nightmare", endState="sleep",      weight=100,},
                                                },
                            },

                            {   anim = Couch._animations.ANIM_COUCH_SLEEP_DREAM,
                                stateInfo   =   {
                                                    { startState="sleep", endState="sleep",      weight=20,},
                                                },                                
                            },
                            {   anim = Couch._animations.ANIM_COUCH_SLEEP_NIGHTMARE,
                                stateInfo   =   {
                                                    { startState="sleep", endState="nightmare",      weight=10,},
                                                },
                            },
                            {   anim = Couch._animations.ANIM_COUCH_SLEEP_WAKEUP_NORMAL,
                                stateInfo   =   {
                                                    { startState="sleep", endState="base",      weight=0,},
                                                },
                                availabilityTest = Couch_Interaction_Nap.WakeNormal,
                            },
                            {   anim = Couch._animations.ANIM_COUCH_SLEEP_WAKEUP_FAST,
                                stateInfo   =   {
                                                    { startState="sleep", endState="base",      weight=0,},
                                                },
                                availabilityTest = Couch_Interaction_Nap.WakeStartled,
                            },
                            {   anim = Couch._animations.ANIM_COUCH_SLEEP_WAKEUP_SCARED,
                                stateInfo   =   {
                                                    { startState="nightmare", endState="base",      weight=0,},
                                                },
                                --availabilityTest = Couch_Interaction_Nap.WakeStartled,
                            },
                                                        
                          },
    --ANIM_TRANS_OUT      = Couch._animations.ANIM_COUCH_SLEEP_WAKEUP_NORMAL,
    ANIM_GETOUT_START   = Couch._animations.ANIM_COUCH_GETOUT_START,
    ANIM_GETOUT_STOP    = Couch._animations.ANIM_COUCH_GETOUT_STOP,
    
    LOOP_MINUTES        = 20,
    PARKABLE_PLAYER     = true,
    
    ROUTE_FOOTPRINT     = true,
    CONTAINMENT_SLOT    = nil,  -- Non-standard slot name
    
    FORCE_TRANS_OUT     = true,
}
```

however, refering back to my mention of "complexer objects", the usage of `PlayAnimBlocking` is primarily used. It's simply playing a solo animation outside of the interaction def, and therefore not needing the need of our interaction def's animation. So I was thinking way too complicated about this :p

So yeah! You can do animations two ways: Play them solo, or put them in the interaction def list! Do make sure though to use the SAME keywords/keys that you see in my research reference, otherwise it will NOT work!!

Also, side note, it probably works, but I feel for the sad dev that made this lua Anim Utils and instead no one used it :p It's probably a debug thing but still... Thanks to them though, I was able to understand some of the params! :)

###### Event Ids
The Ids I've search and search and I cannot for the life of me figure out how it gets that... it's probably an internal engine thing i'm not realising :p In TS3 they were manually defined in the Jazz script and could get picked up easily within our script. Here however, it's complete magic to me lol.
