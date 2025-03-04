# Shaders

Shaders have the file extension `.fx` or `.fxh`, and can be found in `GameData_Win32/Shaders`.

## HLSL
Shaders use HLSL, the primary language for shaders used in [DirectX](https://en.wikipedia.org/wiki/DirectX). The `.fx` files contain both the Pixel and Vertex Shaders.

## Shader hashes
[Materials](/mysims-research/Files/Material.md#material) reference shaders using their [FNV32](/mysims-research/FNV.md) hash:

|Name|Hash|
|----|----|
|casFace|0xCC1046A7|
|casFaceShiny|0xA654AB38|
|casFaceShinyModulatedAccents|0xD91354E0|
|casFaceShinyModulatedAccentsSkinned|0x94AB09A4|
|casFaceShinyOpaqueAccents|0x108747D2|
|casFaceShinyOpaqueAccentsSkinned|0x6548EEC2|
|casFaceShinyReversedAccents|0xB445141B|
|casFaceShinyReversedAccentsSkinned|0x4F6AD45D|
|casFaceShinySkinned|0x5266048C|
|casFaceSkinned|0x04EB01C1|
|casHat|0x24F7F0DB|
|casHatSkinned|0x6683DB1D|
|customMask|0xFA625054|
|customMaskSkinned|0x68E561D0|
|Face|0xA0C00292|
|FaceSkinned|0x7BF66582|
|idColor|0x41AD8167|
|idColorSkinned|0x544B0481|
|lambert|0x94773578|
|lambertEnvMap|0x04EFD88D|
|lambertEnvMapSkinned|0x57B0516B|
|lambertLightMap|0x11D90EB6|
|lambertLightMapSkinned|0x535168FE|
|lambertSkinned|0x2650FECC|
|lambertTransparent|0x8AAFBD1E|
|lambertTransparentEnvMap|0x8C801E73|
|lambertTransparentEnvMapSkinned|0x5A9B2365|
|lambertTransparentSkinned|0xE16E35F6|
|lambertTritone|0x9D8D3A6F|
|lineset|0xC4C534C9|
|phong|0xB9105A6D|
|phongSkinned|0x65DC8ACB|
|plumbob|0xDEF16564|
|shadererror|0xA2A9B074|
|shadowMappingIDMapFill|0x286A83BB|
|shadowMappingIDMapLookup_3x3Kernel|0xDC3D72E4|
|shadowMappingIDMapLookup_4x4Kernel_Pass1|0x53B37265|
|shadowMappingIDMapLookup_4x4Kernel_Pass2|0x53B37266|
|shadowProjector|0x293A5873|
|shadow_low|0x7674D0AE|
|shadow_low_I8|0xBAF2CFCA|
|shadow_low_I8_invAlpha|0x6F44AB1E|
|shadow_low_invAlpha|0xDA720C6A|
|shadow_med|0xA07751EA|
|ShinyGlossMap|0xFF49577E|
|ShinyGlossMapSkinned|0x8BFF4FD6|
|ShinyGlossMapTransparent|0x14597B24|
|ShinyGlossMapTransparentSkinned|0xFA6AD820|
|Sim|0x22706EFA|
|SimPreBakedTextures_Tex1Mod_Tex2Mod|0xCC7E68DB|
|SimPreBakedTextures_Tex1Mod_Tex2ModSkinned|0xD27B831D|
|SimPreBakedTextures_Tex1Mod_Tex2Op|0xC1C024D4|
|SimPreBakedTextures_Tex1Mod_Tex2OpSkinned|0x28C2BB50|
|SimPreBakedTextures_Tex1Op_Tex2Mod|0xCBE11A70|
|SimPreBakedTextures_Tex1Op_Tex2ModSkinned|0xC6766774|
|SimPreBakedTextures_Tex1Op_Tex2Op|0x46681DE9|
|SimPreBakedTextures_Tex1Op_Tex2OpSkinned|0x51C6313F|
|SimSkinned|0xE70021FA|
|swarmAdditive|0x0BA3C15B|
|swarmDecal|0x79F61866|
|swarmDecalIgnoreDepth|0x80FF4623|
|swarmDepthDecal|0x39A9B569|
|swarmModulate|0x2CD7906E|
|terrainLightMapTinted|0x224E7FEE|
|text|0xB12BFA38|
|video|0xB1CC1AF6|
|Water|0x9E3C3DFA|
|WaterShiny|0xE3B338AF|
|WaterShinyBumpy|0xFF8234C4|