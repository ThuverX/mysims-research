# Creating your first mod
> ⚠️ **The modloader is still undergoing changes.**

1. To start create a folder and name it anything you want. This is usually the same name as the mod itself.
2. Create a `mod.xml` inside this folder

## 2. The Mod XML
Edit the `mod.xml` with your favorite text editor, I'm using [VSCode](https://code.visualstudio.com/).
The Mod XML contains all the info that a mod needs to work, who made it, what files to load and which hooks to load. We'll get into those later.
For now you can copy and paste this text into your editor:
```xml
<Mod>
    <Name>Your mod name</Name>
    <Description>Your mod description</Description>
    <Author>Your name</Author>
</Mod>
```
Replace each of the relevant data. You can also use the author section to give credit to files or info you may have used.

This is the most barebones version of the Mod XML. It will register just fine, but not actually do anything once its loaded!

## 3. Make it do something
Now here's a bit of a split depending on what you want the mod to do. We'll first go into replacing textures

### 3.1 Replacing textures
Replacing textures in MSML is easy! No need to package them, or give them weird names.
First start by making an `assets` folder inside your mod folder. It should now look like this:

![image](https://github.com/user-attachments/assets/6e787372-ec12-4f1a-aab3-072b565785c2)

Then we need to tell MSML that it needs to load these assets. This is done by adding the `Assets` element to the Mod XML. Like this:

```diff
<Mod>
    <Name>MyMod</Name>
    <Description>A simple mod</Description>
    <Author>ThuverX</Author>
+   <Assets path="assets/"></Assets>
</Mod>
```

> If for some reason you have named your assets folder something different make sure to change it here too.

Any texture you place inside the assets folder will now be loaded. Make sure they are of the DDS file type, it's the only format the game understands.
But this just loads the textures, it won't actually replace them. To do that we need to add a `Replacer` element to the Assets element.

Lets go through a full example, I'll be replacing the grass in the game with this texture

![image](https://github.com/user-attachments/assets/425a50e2-accf-40ee-b17e-603d31333ac6)

And I've added this texture to the assets folder as `grass.dds`. Now to replace the grass we will need the key of the original key asset.
This may sound a bit confusing, but keys are basically file names and extensions, but represented by numbers.

Getting these keys is more difficult and the [Editor](https://github.com/ThuverX/MySimsEditor) tries to make this easier, but since it isn't released yet we will use [MorcuTool](https://github.com/Olivercomet/MorcuTool).

> This tutorial won't go into using MorcuTool. As it will soon become obsolete.

Once you have found the key for the texture you want to replace, in my case it's: `0x00000000!0x00000000EE93FAC8`. It may be in a different format. `0x00000000EE93FAC8` is the important part. Its the instance, basically the file name, while `0x00000000` is the group, or the folder its in. In this case it's in no folder.

Then we can add the replacer to our XML like this:
```diff
<Mod>
    <Name>MyMod</Name>
    <Description>A simple mod</Description>
    <Author>ThuverX</Author>
    <Assets path="assets/">
+       <Replacer key="0x00000000!0x00000000EE93FAC8" type="dds">assets/grass.dds</Replacer>
    </Assets>
</Mod>
```
We add a Replacer element, give it the key of the grass file. We know it's a DDS file so we set that too. Then lastly we set it to the name of the file we want to replace it with. Notice that we started it with `assets/` this may seem optional but it is not. The game will only ever load files from the folder you set in the `Assets` element and nothing else.

You have no successfully replaced a texture. Copy the mod folder to your mods folder, that should be in `MySims/bin/mods`. Place it next to the Base mod:

![image](https://github.com/user-attachments/assets/30e3d9df-0ac6-45a6-8225-69853f62f67f)

Now when you start the game should see a log telling you that one file was loaded:
```
[2025-03-05 16:03:52] [INFO] (D:\a\MySimsModLoader\MySimsModLoader\src\mods\Mod.cpp:94) MyMod registered 1 replacer(s)
```

And loading a savefile you should see that the texture was replaced!

![image](https://github.com/user-attachments/assets/e1ed8421-8a42-4751-bb5e-84d20c0a9b1e)

Congrats on making your first texture replacement mod! Continue reading if you also want to add new Lua code.

### 3.2 Lua hook

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
    <Assets path="assets/">
        <Replacer key="0x00000000!0x00000000EE93FAC8" type="dds">assets/grass.dds</Replacer>
    </Assets>
</Mod>
```

Here we define a `Hooks` element with our `Hook` inside. That's all, now once again add this mod folder to your mods. And run the game.

You will once again see a log saying the hook loaded:
```
[2025-03-05 16:19:27] [INFO] (D:\a\MySimsModLoader\MySimsModLoader\src\mods\Mod.cpp:116) MyMod registered 1 hook(s)
```

And once you load a savefile, you will be greeted!

![image](https://github.com/user-attachments/assets/413e3f29-e9a4-453b-a406-1c09496c3814)


That's it! Texture replacement are more generically `file` replacers. So you can also replace XML files or anything else. Though some file formats are hard to create, something the [Editor](https://github.com/ThuverX/MySimsEditor) will fix once it's released!