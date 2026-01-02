# Adding lua scripts

Lua hooks are an advanced method to add new code to the game. This could be used to add new interactions, NPC's or anything the game needs to register.
For now we will make a simple mod that will greet the player once they load a save file.

To start make a lua folder inside your mod. Like this:

![image](https://github.com/user-attachments/assets/d39ebb8d-7c98-4db5-b014-02331b513054)


And add a new file called `greeter.lua`, and open it in your text editor.
The code inside this file will be loaded every time a lua file is required. That just means your file will always be loaded and sometimes be loaded multiple times. So its always important to check if your code was already loaded before doing any editing the classes or variables.
In our case we just want to make sure there's actually a player in the game. i.e. we are not in the menu.

```lua
if Player then
end
```

Here we're asking, is there a Player variable. If so, run the code between the `then` and `end`. Good, we now know we can do operations on the Player class.

So lets add a hook, a hook is a piece of code that looks at an object or class, in this case `Player`. And then looks at its `PatchTaskInventory` method, and after the `PatchTaskInventory` method is called (since its a `PostHook`) it will run the function we define (here `function(self) end`). We also need to give this hook a name, `"Greeter__Player:PatchTaskInventory"` seems like a nice and descriptive name.

`PatchTaskInventory` runs only when a player is just created, so its a good place to greet the player!

```diff
if Player then
+   Hooks:PostHook(Player, "PatchTaskInventory", "Greeter__Player:PatchTaskInventory", function(self)
+   end)
end
```

But this won't do anything on its own, so lets display a message, for this we can use the `DisplayMessage` function that comes with the game.
```diff
if Player then
    Hooks:PostHook(Player, "PatchTaskInventory", "Greeter__Player:PatchTaskInventory", function(self)
+       DisplayMessage("Greeter","Hey I'm here to greet you, have a nice day!")
    end)
end
```
We add the function call in between the `function(self)` and `end` to say: Run this once the hook runs. And then we just call `DisplayMessage` with our title and message.

There's just one last thing we need to do now. And that's register the hook with mod loader.
Open up your Mod XML and add these lines
```diff
<Mod>
    <Name>MyMod</Name>
    <Description>A simple mod</Description>
    <Author>ThuverX</Author>
+   <Hooks>
+       <Hook>lua/greeter.lua</Hook>
+   </Hooks>
</Mod>
```


Here we define a `Hooks` element with our `Hook` inside. That's all, now once again add this mod folder to your mods. And run the game.

You will once again see a log saying the hook loaded:
```
[2025-03-05 16:19:27] [INFO] (D:\a\MySimsModLoader\MySimsModLoader\src\mods\Mod.cpp:116) MyMod registered 1 hook(s)
```

And once you load a savefile, you will be greeted!

![image](https://github.com/user-attachments/assets/413e3f29-e9a4-453b-a406-1c09496c3814)

You can continue in the next chapter, by using your first tweaker and adding new clothing to the game!