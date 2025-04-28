# Creating a global mod (Controller)
> ⚠️ **The modloader is still undergoing changes.**

> **This approach requires you to make use of the [MySims ModLoader](../index.md).**
> **Make sure you've set that up first before proceeding!**

From this point on, the term "global mod" will be now considered a "Controller" as that's what Maxis has done as well.

## Intro
In this tutorial we're going to be exploring how to make a controller for My Sims. A controller is exactly what it says on the tin: It's a script that exists in the world and is not connected to any interactions or characters.

### When should I consider making a Global Mod?
When you...
- Find yourself making a "Manager". (i.e, a script that needs to keep up with things happening in the world and therefore cannot be connected to an interaction. Think: A weather mod).
- Find yourself in a situation where data needs to either be transfered from one world to another.
- Need something global that keeps track of multiple Game Objects and manipulate said data. (See: Controller_Tag)

Obviously these are just some case scenarios that you might need it. If your scenario isn't here that may not necessarily mean it's a terrible idea to make a controller for it!


## A few things to note about controllers:
Most of these things we will tackle in the next section, but in case you need a quick heads up:

- Controllers only run their `run()` function once by default.
- Controllers don't by default have Class Constructors (not to be confused with `constructor()` function. That's different. See **"Using a Constructor-like way to set up our controller"** below.)
- Controllers don't save your variable data by default, after save & Quitting the game.
- You can set up a controller through an interaction call.
- Controllers will keep their current data whenever you go from one world to another



## Getting started
First things first, we start with a bare basic setup. In this tutorial I'll go a bit more in depth as what certain approaches for your controller could be a good idea.

```lua

if Player then
    -- Make sure to replace everything starting with "MyController" with your controller name!!
    Hooks:PostHook(Player, "PatchTaskInventory", "MyController__Player:PatchTaskInventory", function(self)
       
        -- first grab any existing global controllers, before considering making a new one...
        -- @param `Controller_MyController` make sure that this is the name of your class variable (See section: Controller_MyController = ControllerBase:Inherit( "Controller_MyController" ))
        local myController = GetGlobalScriptObject("Controller_MyController") 

        -- if this is the first time loading it, load it in!
        if myController == nil then
            myController = SpawnObject( "Controller_MyController", "ObjectDefs/Controller_MyController_Def.xml", ObjectTypes.eGlobalScript, 0, 0, 0, 0, GetGlobalScriptsWorld())	
        end 
    end)
end

-- We also check if ControllerBase has been loaded in yet! Otherwise you'll get errors.
if ControllerBase then
    -- Make sure that the variable is global and is the same as the string param for `GetGlobalScriptObject()` and `SpawnObject()`
    Controller_MyController = ControllerBase:Inherit( "Controller_MyController" )
end

```
Feel free to copy this template when following this tutorial!

#### Why hook into the player?
Controllers are technically also GameObject, but "Empty" ones (aka, they have no mesh/skin/textures). This is completely normal in games, as it initially means a world has an instance that keeps all the information you'd like to keep, in an object! Think of it as an invisible moving box you're constantly adding things to.

However, *because* we need it to become a 'game object', it does mean we need to load it in. And what better way than seeing if the player has been instantiated to load in our controller as well! That way we also have the guarantee that everything in the world has been loaded, as the player seems to be loaded last.

### Setting up the controller class
Now that we have a class set up and ready to do things, we now will be looking at how to get a simple controller up and running! Keep in mind that from here on the code is going to feel very "Object-oriented". So if you have some experience in C# or the like, you might recognise some patterns here.  

Let's take a closer look at our `Controller_MyController` class we inherited...

First things first, for it to even "exist" we need to add two more functions:

```lua

if ControllerBase then
    Controller_MyController = ControllerBase:Inherit( "Controller_MyController" )

    -- Base variables. Just like in object oriented languages, these are variables you want to use all across but defaulting to nil or setting them to a default interger for example.
    function Controller_MyController:Constructor()
      self.
    end

    -- Where the magic happens! This is where our code is executed!
    function Controller_MyController:Run()
    end

end
```

And ironically that's all we need! Except, that for the player, we don't even know our controller "exists" now. So what better way than demonstrating it with a message box... Your code should now look something like this:

```lua
if Player then
    -- Make sure to replace everything starting with "MyController" with your controller name!!
    Hooks:PostHook(Player, "PatchTaskInventory", "MyController__Player:PatchTaskInventory", function(self)
       
        -- first grab any existing global controllers, before considering making a new one...
        -- @param `Controller_MyController` make sure that this is the name of your class variable (See section: Controller_MyController = ControllerBase:Inherit( "Controller_MyController" ))
        local myController = GetGlobalScriptObject("Controller_MyController") 

        -- if this is the first time loading it, load it in!
        if myController == nil then
            myController = SpawnObject( "Controller_MyController", "ObjectDefs/Controller_MyController_Def.xml", ObjectTypes.eGlobalScript, 0, 0, 0, 0, GetGlobalScriptsWorld())	
        end 
    end)
end


if ControllerBase then
    Controller_MyController = ControllerBase:Inherit( "Controller_MyController" )

    -- Base variables. Just like in object oriented languages, these are variables you want to use all across but defaulting to nil or setting them to a default interger for example.
    function Controller_MyController:Constructor()
      self.greetingText = "Hello there! I am a controller!"
    end

    -- Where the magic happens! This is where our code is executed!
    function Controller_MyController:Run()
      DisplayMessage("My Controller Header", self.greetingText)
    end

end
```

### Making the Game Recognize Your Object

Now that we've finished the coding portion, we need to let the game know how to actually spawn your new item. Notice this line in your code:

```lua
myController = SpawnObject( "Controller_MyController", "ObjectDefs/Controller_MyController_Def.xml", ObjectTypes.eGlobalScript, 0, 0, 0, 0, GetGlobalScriptsWorld())
```

The argument `"ObjectDefs/Controller_MyController_Def.xml"` tells the game to look for an XML definition file in the `ObjectDefs` folder, located at: `...\MySims\SimsRevData\GameData\ObjectDefs` *(`...` represents the preceding path to your MySims installation.)*

To add your own definition file, open that `ObjectDefs` folder and create a new text document, like so: `Right-click > New > Text Document`

Although the name isn’t strictly important, it’s best to keep it consistent. For example, call it `Controller_MyController_Def`, then replace the `.txt` extension with `.xml`. This ensures the game will recognize and load your custom object definition. 

Now, we open up the text file and feel free to copy paste this:

```xml
<?xml version="1.0" encoding="utf-8"?>
<ObjectDef>
  <Script>Controller_MyController</Script> <!-- ADD YOUR CONTROLLER CLASS NAME HERE~!! -->
</ObjectDef>
```

And voila! Now We test it in game and see if it works! 😉 If we did this correctly, once you load your game, we should see a message box that pops up saying "Hello there! I am a controller!". 



## The Advanced stuff
Now that you know how to set up a basic Controller, there are plenty of other creative ways to expand its functionality. While this guide doesn’t cover every possibility, make sure to review the global files for additional references—especially the files in the `controller` folder, located under the `Lua` folder in `SimsRevData\GameData`. This will help you get a better sense of all the global functions and features available for your custom Controller scripts.




### Grabbing your controller outside of our controller class
Sometimes, we need to grab some data from inside an interaction or a place outside of our controller class. To ensure we have the correct data to, for example, display to the player.

Let's say, instead of displaying our message inside of the controller's `run()` function, we instead do it in the interaction, we may want to do something like:

```lua
            local myController = GetGlobalScriptObject("Controller_MyController") -- Since our controller already exists, we grab it from the existing world global script list.
            if myController ~= nil then
                DisplayMessage("My Controller Title", myController.greetingText)
            end
```

Or, let's say, in case of running a function instead, we could do this:

```lua
            local myController = GetGlobalScriptObject("Controller_MyController") -- Since our controller already exists, we grab it from the existing world global script list.
            if myController ~= nil then
                DisplayMessage("My Controller Title", myController:FunctionHere()) -- Of course we can also parse in a parameter like you'd usually! But this isn't shown in the example
            end
```




### Using a Constructor-like way to set up our controller
Sometimes a controller needs a constructor-like approach to set up the variables, similar to when we instantiate a class with a constructor through C#. Often this is done after the controller object has been properly created.

The setup inside of our controller would look something like this...

```lua

    Controller_MyController = ControllerBase:Inherit( "Controller_MyController" )

    function Controller_MyController:Constructor()
      self.greetingText = nil
      self.player = nil
    end

    function Controller_Mycontroller:Setup(greeting, player)
      self.greetingText = greeting
      self.player = player
    end

    function Controller_MyController:Run()
      DisplayMessage("My Controller Header", self.greetingText)
    end

```

and then once we create our object, you may do something like this:

```lua
        local myController = SpawnObject( "Controller_MyController", "ObjectDefs/Controller_MyController_Def.xml", ObjectTypes.eLua, 0, 0, 0, 0, GetGlobalScriptsWorld())	
        if (myController ~= nil) then
            local text = "I am a greeting! Salutations!"
            local player = GetPlayerGameObject()

            -- for good measure, you never know if an NPC accidentally calls our function!
            if player ~= nil and text ~= "" then
              controller:Setup(text, sim)
            end

        end
```

after your `setup()` function has been called, the `Run()` should be called automatically by the game!



### Calling Run() Multiple times
*(**Heads Up**: Most of these functions are derived/called from their inherited class. That's why you might see some functions without seeing their source code. If you do want to see the source code for them, feel free to check out "ScriptObjectBase")*.

While most of the time your controller may do very straightforward things, we do have cases where we want it to, let's say, run multiple times or even "keeping track of things". There are a few solutions for this:



#### Solution 1 - Wait To Be Deleted:
Probably the simplest and most straightforward! However, this of course takes some taking care of on your side, as we need to somehow eventually remove our controller.

While this approach has it's pros, the biggest con is that it will be forever looping your functions every tick. While this is not necessarily *bad*, you seriously need to consider if you need to fire your functions every tick or rather a couple of hours into the game (Or day even). Otherwise it can tremedously affect gameplay and causing lagging. (Or worse, crashing!)

    function Controller_MyController:Run()

        while (self.toBeDeleted ~= true) do 
            self.Counter = self.Counter + 1 -- Just an example.
            self:shouldSelfDistruct()
            Yield() -- We add this here since it seems to help against crashing.
        end
        
    end

    function Controller_MyController:ShouldSelfDistruct()
        if self.Counter > 10 then
            -- Obviously this is a very "unclean" way of shutting down your controller, which is most of the time okay. However if you have a ton of VFX handling or animations, make sure to reset these in a function before calling this!
            self.toBeDeleted = true
        end
    end



#### Solution 2 - Wait For Notify:
This is probably the best approach to use if you're making something that needs to keep track of differences, updating variables consistently or even time-based reasons! For this, we will also dive a little into timers, so if you want to know more about that, make sure to read the "How To - Create and use Timers".

In this example, we're going for a scenario for my Seasons Manager mod. Here, we want every day to communicate back that there is one day less remaining till the season changes. Or even change the season alltogether!

```lua

    function Controller_SeasonManager:Run()
        self:StartTimer()
        while true do
            self:WaitForNotify()
        end
    end

    -- Setting up timer on first run. We make sure that the first timer is always set for next day during 6 am (that's what Times.Day does for us).
    function Controller_SeasonManager:StartTimer()
        local day, hour, minute = GetSimTime()
        self.dayCheckerTimer = TODTimerCreateAbs(self, day + 1, Times.Day, 0, 0)
    end


    function Controller_SeasonManager:TODTimerCallback(timerID, context)
        if timerID == self.dayCheckerTimer then
            local day = GetSimTime()

            self.dayCheckerTimer = TODTimerCreateAbs(self, day + 1, Times.Day, 0, 0)

            -- adding a day before we've reached the next season!
            self.daysRemaining = self.daysRemaining  - 1 

            if self.daysRemaining == -1 then
                
                if self.currentSeason == 3 then
                    self.currentSeason = 0
                else
                    self.currentSeason = self.currentSeason + 1
                end

                self.daysRemaining = self.daysToSwitchSeason
            end
            self:Notify() -- This is what matters the most here. We're now telling our Run() loop that it's been notified and it can continue!
        end
    end

```

In the example above, I make sure that the Run function includes a while loop. The cool thing about Controllers, is that they're technically "Yielding" the function till we tell it to continue again. 

This means, in this case, the first loop will pause, waits till our timer goes off (See: `TODTimerCallback()`) and once it hits the `self:Notify()`, it then loops again, waiting for the newest "notify" to happen.

Obviously, this can be quite powerful to use, and therefore feel free to add some additional functions after your "WaitForNotify()" in case stuff needs to run after the timer has rang!



#### Solution 3 - Using States:
The game also uses a concept of State machines. While that all sounds really complicated, it really doesn't have to be! Basically, we're just setting what "state" of the lifetime of our run function it's at currently. Here we often use terms as "Start", "running" and "End".

Often this approach makes more sense logistically when used together with an interaction, or another controller. But for now, we'll just show a really easy state machine setup.

```lua

    function Controller_MyController:Run()
        self:setState("Start") -- Alternatively you can set the state in your Setup() function too!

        while self:GetCurrentState() ~= "Stop" do
            self:HandlingMiddleState()
        end
    end

    function Controller_MyController:HandlingMiddleState()
        self:setState("Breakdancing") -- setting our custom state. Just for good measure!

        local index = 0
        while index < 10 do
            -- Have your sim breakdance 10 times or something here :p Have some fun!
            index = index + 1
        end
        -- Because now we've broken out of the while loop as we've hit over 10, we set the state to stop, so the state machine code EA made for us knows to stop "stating" 😉
        self:setState("Stop")
    end

```

However, if you ever did want to set the state of your controller outside of the controller class, it's actually pretty much the same approach as we'd do normally (as demonstrated under **Grabbing your controller outside the controller class.**) :


```lua
            local myController = GetGlobalScriptObject("Controller_MyController") -- Since our controller already exists, we grab it from the existing world global script list.
            if myController ~= nil then
                myController:setState("StateNameHere")
            end
```

### Saving our controller data
While the save file of the game might be a little questionable, we can take use of it though! Every controller (or rather, anything that eventually derives from "ScriptObjectBase") you can save data per save file! 

The idea is simple. Here's an example of how I did it for the Seasons Manager:

```lua


    function Controller_SeasonManager:Constructor()
        self.currentSeason = self.Seasons["Spring"]
        self.daysToSwitchSeason = 1 -- default 4
        self.daysPassed = 0
        self.daysRemaining = self.daysToSwitchSeason -- we make them the same since we're counting donw...
        self.temperature = 20 -- All in C, so 0 is cold, 40 is max (hot af), and -15 is REALLY cold.
        self.dayCheckerTimer = nil
    end

    -- --=========================================--
    -- -- Save/Load callbacks
    -- --=========================================--

    function Controller_SeasonManager:SaveCallback()
        local saveData = self:ConstructSaveData(  { "currentSeason",
                                                    "daysPassed",
                                                    "daysRemaining",
                                                    "temperature", }  )

        return saveData
    end

    function Controller_SeasonManager:LoadCallback(saveData)
        -- This is old data. I'm not entirely sure if this approach is necessary, but I have seen it done before. Other global scripts seem to just use RestoreSaveData()
        if (saveData.currentSeason ~= nil) then
            self.currentSeason = saveData.currentSeason
            self.daysToSwitchSeason = saveData.daysToSwitchSeason
            self.daysPassed = saveData.daysPassed
            self.daysRemaining = saveData.daysRemaining
            self.temperature = saveData.temperature
        else
            self:RestoreSaveData(saveData)
        end
    end

```

As you can see, I'm not saving everything in data, since I'm really only saving the relevant things. Obviously I want to save what the latest season was, the current days passed, days remaining and temperature so that once the player plays the game again, they have the correct season and such!

Though, you might wonder "Why aren't we saving the timer? What about "DaysToSwitchSeason"?", those things are actually not relevant to be stored in a save for a few reasons: 
- The controller will always be 'rebuilt' every time we start the game again. Due to that, our timer will too!
- Some of our variables are simply there as a "tunable", rather than being modified.
- If we save too many items, the save file can get bloated and therefore it takes much longer to actually "restore" our data when loading the game again.




