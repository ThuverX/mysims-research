# MySims Research
These files try to document MySims and MySims Kingdom to the best of our ability.

**Interested in making mods? This wiki now also includes information on how to mod the game using the MySims Modloader [here](Modding/index.md)**.

> ⚠️ IMPORTANT
>
> These documents are a work in progress.

#### Patterns

This documentation uses [ImHex's](https://imhex.werwolv.net/) HexPattern files, which are an easy way to program and display how binary file formats are defined.

## Versions
MySims was released multiple times on different platforms.

|Name|Release Date|Language|Notes|
|----|------------|--------|-----|
|Nintendo Wii|2007|PowerPC Big Endian 32 Gekko Broadway|Contains debug symbols|
|Windows|2008|x86 Little Endian||
|Taco Bell[^1]|2010|x86 Little Endian|Contains unpacked Lua and RTT information|
|Origin|2011|x86 Little Endian||
|Cozy Bundle Nintendo Switch|2024|Aarch64|Has updated maximum values|
|Cozy Bundle PC|2025|x64 Little Endian|Nearly all files unpacked, new skin tone system, RTTI included|

## Formats

> Any time a "hash" or "id" is mentioned we are talking about an [FNV](./FNV.md) hash.

Some of these formats are based on the research done by [Morcutool](https://github.com/Olivercomet/MorcuTool).

|Name|Game|ID[^2]|Notes|
|-|-|-|-|
|[DBPF](Files/DBPF.md)|MySims/Kingdom||EA's DataBase Packed File, found as `.package` files|
|[Win32Model](Files/Win32Model.md)|MySims/Kingdom|`0xB359C791`|Only used on all windows versions|
|[Material](Files/Material/MySims.md)|MySims/Kingdom|`0x01D0E75D`|Material information|
|[Clip](Files/Clip.md)|MySims/Kingdom|`0x6B20C4F3`|Granny3D animation|
|Rig|MySims/Kingdom|`0x8eaf13de`|Granny3D Model rig|
|[Str](Files/Str.md)|MySims/Kingdom||String file|
|Xml|MySims/Kingdom|`0xDC37E964`|Generic Xml|
|Physics|MySims/Kingdom|`0xD5988020`|Havok baked physics|
|[Big](Files/Big.md)|MySims/Kingdom|`0x5BCA8C06`|EA's big file format|
|[Bnk](Files/Bnk.md)|MySims/Kingdom|`0xB6B5C271`|Audio bank|
|[Lua](Files/Lua.md)|MySims/Kingdom|`0x474999B4`|Scripts|
|[Fx](Files/Shader.md)|MySims/Kingdom|`0x6B772503`|Shader file|
|[Swarm](Files/Swarm.md)|MySims/Kingdom|`0xCF60795E`|Particle effects|
|FootprintSet|MySims/Kingdom|`0x2C81B60A`|Pathfinding information|
|[MaterialSet](Files/Material/MySims.md#material-set)|MySims/Kingdom|`0x02019972`|List of materials|
|[DDS](https://en.wikipedia.org/wiki/DirectDraw_Surface)|MySims/Kingdom|`0x00B2D882`|Texture file|
|[TTF](https://en.wikipedia.org/wiki/TrueType)|MySims/Kingdom|`0xFD72D418`|TrueType font file|
|[TTC](https://en.wikipedia.org/wiki/TrueType)|MySims/Kingdom|`0x35EBB959`|TrueType collection File|
|CompositeTexture|MySims/Kingdom|`0x8E342417`|Same as DDS, used for face textures|
|RuntimeSettings|MySims/Kingdom|`0x6D3E3FB4`|Audio Setting Definition|
|Download|MySims[^3]|`0xD86F5E67`|Files downloaded for online play|
|Luo|MySims[^3]|`0x2B8E2411`|Compiled lua|
|[Xmb](Files/Xmb.md)|MySims[^3]|`0x1E1E6516`|Binary Xml|
|ShaderParameters|MySims[^3]||Shader artist parameters|
|CAB XML|MySims|`0xA6856948`|Create A Build (Building Information)|
|LightSet XML|MySims|`0x50182640`|List of light information|
|LightBox XML|MySims|`0xB61215E9`|List of light boxes|
|Slot XML|MySims|`0x4045d294`|Object slot information|
|[Level XML](Files/Xml/Level.md)|MySims|`0x585EE310`|Level definition|
|[World XML](Files/Xml/World.md)|MySims||World definition|
|Slot Binary|Kingdom|`0x487bf9e4`|Object slot information|
|Snap Binary|Kingdom|`0xb70f1cea`||
|[Level Binary](Files/Bin/Level.md)|Kingdom|`0x58969018`|Level definition|
|FootprintSet2|Kingdom|`0x8101a6ea`|Pathfinding information|
|LightSet Binary|Kingdom|`0x50002128`|List of light information|
|Object Grid Volume Binary|Kingdom|`0xd00decf5`||
|Buildable Region Binary|Kingdom|`0xc84acd30`|Building information|
|Voxel Grid Heightmap Binary|Kingdom|`0x614ed283`|Heightmap information|

## Contributors
This project was started by:
- [ThuverX](https://github.com/ThuverX)
- [Lyralei1](https://github.com/Lyralei1)
- [asteriddle](https://github.com/asteriddle)
- [Click here for an updated list of contributors](https://github.com/ThuverX/mysims-research/graphs/contributors)

[^1]: In 2010 you could get a MySims disc with your Taco Bell Order.
[^2]: If a file doesn't have an Id it means its not found inside any Package.
[^3]: Cozy bundle does not use these.