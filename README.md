# MySims Research
These files try to document MySims (PC) to the best of our ability. These files do not document any of MySims sequels or MySims DS.


# Versions
MySims was released multiple times on different platforms.

|Name|Release Date|Language|Notes|
|----|------------|--------|-----|
|Nintendo Wii|2007|PowerPC Big Endian 32 Gekko Broadway|Contains debug symbols|
|Windows|2008|x86 Little Endian||
|Origin|2008|x86 Little Endian||
|Taco Bell|2010|x86 Little Endian|Contains unpacked Lua and RTT information|
|Nintendo Switch|2024|Aarch64|Has updated maximum values|

# Formats

Some of these formats are based on the research done by [Morcutool](https://github.com/Olivercomet/MorcuTool)

|Name|Id|Notes|
|----|--|-----|
|[DBPF](Files/DBPF.md)||EA's Database Packed File|
|[Win32Model](Files/Win32Model.md)|0xB359C791|Only used on all windows versions|
|Download|0xD86F5E67|Files downloaded for online play|
|[Clip](Files/Clip.md)|0x6B20C4F3|Granny3D animation|
|[Material](Files/Material.md#material)|0x01D0E75D|Material and shader|
|[MaterialSet](Files/Material.md#material-set)|0x02019972|List of materials|
|DDS|0x00B2D882|Texture file|
|CompositeTexture|0x8E342417|Same as DDS|
|[Level](Files/Xml/Level.md)|0x585EE310|Level definition|
|[World](Files/Xml/World.md)||World definition|
|Physics|0xD5988020|Havok baked physics|
|LightSet|0x50182640||
|Xml|0xDC37E964|Generic Xml|
|FootprintSet|0x2C81B60A||
|Swarm|0xCF60795E|Particle effects|
|CAB|0xA6856948||
|Big|0x5BCA8C06|EA's big file format|
|[Lua](Files/Lua.md)|0x474999B4||
|Luo|0x2B8E2411|Compiled lua|
|LightBox|0xB61215E9||
|Xmb|0x1E1E6516|Binary Xml|
|TTF|0xFD72D418|Font file|
|TTC|0x35EBB959|Font File|
|RuntimeSettings|0x6D3E3FB4|Audio Definition|
|[Fx](Files/Shader.md)|0x6B772503|Shader file|
|ShaderParameters||Shader artist parameters|

# Contributors
This project was started by:
- [ThuverX](https://github.com/ThuverX)
- [Lyralei1](https://github.com/Lyralei1)
- [asteriddle](https://github.com/asteriddle)
- Click [here for an updated list of contributors](https://github.com/ThuverX/mysims-research/graphs/contributors)