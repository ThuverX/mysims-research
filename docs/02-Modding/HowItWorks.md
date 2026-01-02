# How MSML works

MySims Mod Loader (MSML) is a mod loader and framework, it allows modders to add and modify game files, without directly replacing them.
MSML is a dll that gets loaded when the game loads and replaces and modifies some game functions. It mainly replaces the way the game loads files.

## The database system
Nearly all Maxis games (Even up to the Sims 4) use file databases to lookup game files. That means instead of scanning your disk everytime the game needs to load a file, the game scans the disk once and saves a list in its databases. MySims knows two types of databases:

- [Database Packed Files](/Files/DBPF)
  - Are the main database format used in the original 2007 release of MySims. It takes form of `.package` files that contain nearly every file the game uses.

- Database Directory Files
  - Usually are all the other "loose" files, but in MySims Cozy Bundle are the main database type. These files are not packaged into a single file, but instead the database just keeps a list of every file path.

Both these database have an `OpenRecord` function, which the game uses to request a `Record` (A file), MSML disables these for both Database types and introduces it own database.

- MSML's custom database
  - Keeps a list of "assets", assets are loaded from mods and can also be added programmatically.
  - It also keeps a list of Database Packed Files and Database Directory Files entries, populated by the original databases to forward to the original files.

In the end, all database lookups go through MSML's custom database, making it so every file can be replaced and modified.

## Lua hooking

MySims uses lua for its scripting system, where it attaches lua to game objects and activities to script their behaviour. Originally mods were made by replacing these lua files with new code, but this wasn't very scalable. MSML introduces lua hooks as an alternative to fully replacing files.

Hooks work by taking existing game functions, and adding, replacing or removing functionality from them. MSML does this by loading mods custom lua files after (or before) every lua file thats loaded. This way, variables can be changed and functions can be hooked. As an example MSML's basemod [replaces the original EA Logging](https://github.com/ThuverX/MySimsModLoader/blob/main/basemod/lua/ea.lua) functions to always fire. Aiding in debugging lua functions.


## Tweakers

MSML also introduces "tweakers", a system for replacing and modifying game files at runtime. Tweakers are written into MSML itself and allow easily adding and replacing normally hard to modify files. As an example, MSML introduces the material tweaker, which allows users to create [material files](/Files/Material/MySims) without needing to write out the bytes themselves.