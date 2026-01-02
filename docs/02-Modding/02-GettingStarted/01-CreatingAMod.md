# Creating a mod

Creating a mod for MSML is easy. In this example we will be replacing, the game's grass texture.

## Creating mod.xml

Start by creating a folder inside `MySims/mods` (`MySims/bin/mods` for Taco Bell Edition). This will be the home for all your mod files. Start by creating a `mod.xml` file and open it with your favorite text editor.

The mod.xml file is where you describe your mod, who created it, what does it do? Start by adding pasting this into your `mod.xml` file.
```xml
<Mod>
    <Name>Your mod name</Name>
    <Description>Your mod description</Description>
    <Author>Your name</Author>
</Mod>
```
Here we can see a name, description and author field. Fill these out with the relevant information!

This is the most barebones version of the Mod XML. It will register just fine, but not actually do anything once its loaded!

## Replacing the grass texture
Start by creating an `assets` folder inside your mod (this isn't a requirement, you can name this folder anything), here we will place all are new and replacement files. To replace the grass we only need to add a file with the exact name the game uses for the grass.

In our case I know the grass texture files are called
 - `0x00000000!0x00000000EE93FAC8.dds`
 - `0x00000000!0x0000000061805F86.dds`

*(If you were to search for these files yourself, using Cozy Bundle is the easiest way, look in the `GameData_Win64/Textures/Textures/Levels` folder)*

So we now know what files we need to replace, if we simply add our own dds files with those exact names. The game will load them over the base ones!

![image](https://github.com/user-attachments/assets/e1ed8421-8a42-4751-bb5e-84d20c0a9b1e)

Congrats on making your first mod! You can continue by adding a lua script to your mod in the next chapter.