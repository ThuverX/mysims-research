# MySims Research
These files try to document MySims (PC) to the best of our ability. And do not document any of MySims sequels or MySims DS.

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
|Cozy Bundle PC|2025|Unknown||

## Formats

> Any time a "hash" or "id" is mentioned we are talking about an [FNV](./FNV.md) hash.

Some of these formats are based on the research done by [Morcutool](https://github.com/Olivercomet/MorcuTool).

|Name|Id[^2]|Notes|
|----|--|-----|
|[DBPF](Files/DBPF.md)||EA's Database Packed File, found as `.package` files|
|[Win32Model](Files/Win32Model.md)|`0xB359C791`|Only used on all windows versions|
|Download|`0xD86F5E67`|Files downloaded for online play|
|[Clip](Files/Clip.md)|`0x6B20C4F3`|Granny3D animation|
|[Material](Files/Material.md#material)|`0x01D0E75D`|Material and shader|
|[MaterialSet](Files/Material.md#material-set)|`0x02019972`|List of materials|
|[DDS](https://en.wikipedia.org/wiki/DirectDraw_Surface)|`0x00B2D882`|Texture file|
|CompositeTexture|`0x8E342417`|Same as DDS, used for face textures|
|[Level](Files/Xml/Level.md)|`0x585EE310`|Level definition|
|[World](Files/Xml/World.md)||World definition|
|Physics|`0xD5988020`|Havok baked physics|
|LightSet|`0x50182640`||
|Xml|`0xDC37E964`|Generic Xml|
|FootprintSet|`0x2C81B60A`||
|Swarm|`0xCF60795E`|Particle effects|
|CAB|`0xA6856948`||
|[Big](Files/Big.md)|`0x5BCA8C06`|EA's big file format|
|[Bnk](Files/Bnk.md)|`0xB6B5C271`|Audio bank|
|[Lua](Files/Lua.md)|`0x474999B4`||
|Luo|`0x2B8E2411`|Compiled lua|
|LightBox|`0xB61215E9`||
|[Xmb](Files/Xmb.md)|`0x1E1E6516`|Binary Xml|
|[TTF](https://en.wikipedia.org/wiki/TrueType)|`0xFD72D418`|TrueType font file|
|[TTC](https://en.wikipedia.org/wiki/TrueType)|`0x35EBB959`|TrueType collection File|
|RuntimeSettings|`0x6D3E3FB4`|Audio Setting Definition|
|[Fx](Files/Shader.md)|`0x6B772503`|Shader file|
|ShaderParameters||Shader artist parameters|

## Contributors
This project was started by:
- [ThuverX](https://github.com/ThuverX)
- [Lyralei1](https://github.com/Lyralei1)
- [asteriddle](https://github.com/asteriddle)
- [Click here for an updated list of contributors](https://github.com/ThuverX/mysims-research/graphs/contributors)

[^1]: In 2010 you could get a MySims disc with your Taco Bell Order.
[^2]: If a file doesn't have an Id it means its not found inside any DBPF.