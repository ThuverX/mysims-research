# RevoModel

The model format of the Wii releases of MySims, MySims Kingdom and MySims Agents. The Cozy Bundle
releases on PC use [Win32 Model](./Win32Model) instead, which holds the same data in a different
shape.

:::info[Wii releases]
This information applies to the **Wii** releases. "Revo" was Nintendo's codename for the Wii.
:::

| | |
|---|---|
| Magic | `RMDL` |
| Type id | `0xF9E50586` in MySims and Kingdom, `0x2954E734` in Agents |
| Found in | [packages](../DBPF), as a resource; Agents uses a big-endian `FPBD` variant |
| Byte order | Big-endian |
| Offsets | Absolute, from the start of the file, and 32-bit |

A file is a header, a table of meshes and the meshes themselves, followed by the model's extra
parameters and its rigs. Everything is reached through absolute offsets, so the file is really a
memory image. Each mesh is a [GX](https://wiibrew.org/wiki/GX) display list that draws from
separate attribute arrays, much as the Wii's GPU takes it, which is the main difference from the
PC format: a Win32 Model interleaves its vertices into one buffer and indexes them with a face
list.

Unless noted otherwise, everything below holds for every model the three games ship: 7,526
distinct ones, 2,682 in MySims, 2,861 in Kingdom and 1,983 in Agents, with 22,102 meshes between
them. A model is often embedded in several packages, which is why the games hold 21,703 model
resources in all; no two of the distinct ones are shared between games.

## Header

| Offset | Type | Name | Notes |
|---|---|---|---|
| 0x00 | char[4] | magic | `RMDL` |
| 0x04 | u32 | version | `0x00000101` in every file |
| 0x08 | f32[3] | boundsMin | `FLT_MAX` three times, unused |
| 0x14 | f32[3] | boundsMax | `-FLT_MAX` three times, unused |
| 0x20 | u32 | meshCount | At least 1 |
| 0x24 | u32 | meshTableOffset | Always `0x58`, so the table follows the header |
| 0x28 | u32 | extraCount | |
| 0x2C | u32 | extraKeysOffset | |
| 0x30 | u32 | extraValuesOffset | |
| 0x34 | u32 | rigTableOffset | `0` when the model has no rigs |
| 0x38 | u8[32] | reserved | Zero |

The model's own bounds are never filled in; the real bounds are on each mesh. The mesh table is
`meshCount` offsets of 4 bytes, one per mesh.

### Extra parameters

`extraKeysOffset` points at `extraCount` [FNV32](../../FNV) keys, and `extraValuesOffset` at that
many NUL-terminated strings, in the same order. Win32 Model stores the values as one block with
its size; RevoModel stores only where they start.

| Key | Values |
|---|---|
| `0x9281771A` | The model's shadow: `no_shadow` in 1,684 of the 1,866 models that have the key, otherwise a shadow model's name such as `round1x1_shadow` or `treeOakMature_shadow` |
| `0xDFD4F97F` | `1`, in 255 models |

## Meshes

Each mesh table entry points at a mesh info of `0x5C` bytes.

| Offset | Type | Name | Notes |
|---|---|---|---|
| 0x00 | u32 | displayListSize | A multiple of 32, often more than the commands need |
| 0x04 | u32 | displayListOffset | 32-byte aligned |
| 0x08 | u32 | arrayCount | |
| 0x0C | u32 | arrayTableOffset | |
| 0x10 | u64 + u32 + u32 | material | Instance, type and group of a [Resource Key](../../ResourceKey) |
| 0x20 | f32[3] | boundsMin | |
| 0x2C | f32[3] | boundsMax | |
| 0x38 | u32[2] | unknown | The same two words Win32 Model carries |
| 0x40 | u32 | name | FNV32; `fnv32("none")` = `0x2CA33BDB` in 12,564 of the 22,102 meshes |
| 0x44 | u8[12] | reserved | Zero |
| 0x50 | u32 | skinOffset | `0` when the mesh is not skinned |
| 0x54 | u32 | boneListOffset | `0` when the mesh is not skinned |
| 0x58 | u32 | rigOffset | One of the rig table's entries; `0` when not skinned |

The material is a `Material` or `MaterialSet`: type `0x01D0E75D` or `0x02019972` in MySims and
Kingdom, `0xE6640542` or `0x787E842A` in Agents. MySims names its materials with FNV64 on the Wii
and FNV32 in the Cozy Bundle, so the same material has a different instance in the two releases.

## Array table

`arrayCount` entries of 8 bytes, one per vertex attribute.

| Offset | Type | Name | Notes |
|---|---|---|---|
| 0x00 | u8 | attribute | The GX attribute, see below |
| 0x01 | u8 | elementSize | Bytes per element |
| 0x02 | u8[2] | padding | Zero |
| 0x04 | u32 | dataOffset | 32-byte aligned |

| Attribute | Name | Element | Used by |
|---|---|---|---|
| 9 | position | 3 × f32 | Every mesh |
| 10 | normal | 3 × f32 | Every mesh except 2,747 in Agents |
| 11 | colour 0 | RGBA8 | 724 meshes, in Kingdom and Agents |
| 13 | texture coordinate 0 | 2 × f32 | Every mesh; the diffuse map's |
| 14 | texture coordinate 1 | 2 × f32 | 12,156 meshes; the lightmap's |
| 15 | texture coordinate 2 | 2 × f32 | 1,691 meshes, mostly Kingdom's water and grid shaders |
| 16 | texture coordinate 3 | 2 × f32 | 47 meshes |

The numbering is GX's own `GXAttr`, where 11 and 12 are the two colours and 13 to 20 are texture
coordinates 0 to 7. Colour 1 and texture coordinates 4 to 7 never appear. The table is sorted by
attribute in all but 9 of the 22,102 meshes; the exceptions are all in Agents, in five files, and
all put colour 0 out of place — last in eight of them, straight after the position in the ninth.

**The arrays carry no length.** Each holds as many elements as the display list indexes, which is
what makes an array's end knowable at all: the next block begins at the next 32-byte boundary
after it. Three arrays of the 78,177 in the games hold more than the display list reaches, all of
them texture coordinate 0 in MySims — two in `CatchAll` packages with 143 and 139 elements to
spare, and one in `InteriorNooks` with 6, of which three are real-looking UVs the game never
draws.

Nothing says the values have to be usable: in eight of Kingdom's `IslandLeaf` models a mesh's
whole normal array is a single `NaN` vector, which every vertex in the mesh then indexes.

An index is per attribute, not per vertex, so the arrays of one mesh are usually all different
lengths. That same `InteriorNooks` mesh stores 1,125 positions, 791 normals, 1,122 of texture
coordinate 0 and 1,137 of texture coordinate 1.

## Display list

A standard GX display list: one byte of command, then its operands. Only these commands appear.

| Byte | Command | Followed by |
|---|---|---|
| `0x00` | NOP | Nothing |
| `0x20` | Load position matrix (indexed) | u16 palette index, u16 descriptor `0xB000 + slot × 12` |
| `0x28` | Load normal matrix (indexed) | u16 palette index, u16 descriptor `0x8400 + slot × 9` |
| `0x90` | Triangles | u16 vertex count, then the vertices (Agents only) |
| `0x98` | Triangle strip | u16 vertex count, then the vertices |

A vertex is one `u16` index per array, in array table order, and in a skinned mesh a `u8` position
matrix index first. That byte is GX's `PNMTXIDX`, `slot × 3`, so a primitive can draw from ten
matrix slots at most; slots 0 to 9 are all that occur, and no vertex ever names a slot the list
did not load earlier.

The two loads always come in pairs, one position and one normal matrix for the same slot: both
appear 128,469 times across the games. A run of loads is always closed by a NOP before the
primitives that use it — in all 41,780 runs, a primitive never follows a load directly.

In a strip, triangle *i* is (v*i*, v*i*+1, v*i*+2) when *i* is even and (v*i*+1, v*i*, v*i*+2)
when it is odd. Read that way, every triangle winds the same way as in Win32 Model.

`displayListSize` is the size of the buffer, not of the commands: 21,932 of the 22,102 meshes
have room left over, and the rest of the buffer is zeros. The exporter seems to have sized these
by its own estimate, and 16,356 of those sizes are powers of two.

## Skin

A skinned mesh points at a skin header of 12 bytes.

| Offset | Type | Name | Notes |
|---|---|---|---|
| 0x00 | u32 | paletteOffset | Directly after this header |
| 0x04 | u32 | scratchOffset | Directly after the palette |
| 0x08 | u32 | paletteCount | 1 to 70 |

The palette is `paletteCount` entries of 20 bytes, `f32 weights[4]` then `u8 bones[4]`. An unused
bone is `0xFF` with a weight of `0`, and the weights of an entry sum to 1. Each entry is one
blended matrix the display list can load, so every vertex with the same bones and weights shares
an entry. The bones index the mesh's bone list, not the rig.

The scratch area is `paletteCount × 48` bytes, three `(1, 0, 0, 0)` rows per entry in every file.
It looks like room for the game to blend the 3 × 4 matrices into.

The bone list, at `boneListOffset` and directly after the scratch area, is a `u32` count and that
many FNV32 bone names. Its order is neither the rig's nor the palette's: of the 509 skinned meshes
in the games, only 118 list their bones in rig order, and 205 list bones no palette entry uses.
Win32 Model indexes the rig directly and needs no list of its own.

## Rigs

The rig table is a list of `u32` offsets ending with a `0`. A model has at most three rigs: 407
models have one, 34 have two and 8 have three.

| Offset | Type | Name | Notes |
|---|---|---|---|
| 0x00 | u32 | boneCount | 1 to 37 |
| 0x04 | u32 | hashesOffset | Directly after this header |
| 0x08 | u32 | matricesOffset | Directly after the hashes |

The hashes are `boneCount` FNV32 bone names, and the matrices `boneCount` inverse bind matrices of
16 floats, in the same element order as Win32 Model, with the translation in elements 12 to 14. A
Wii rig may list a few more bones than the PC one, and in a different order; the games match bones
by hash.

## Layout

The blocks come in a fixed order, and together with the padding between them they account for
every byte of every file:

1. The header, then the mesh table.
2. Each mesh, in table order, directly after the one before: the mesh info; zeros to the next
   32-byte boundary and then 32 more; the display list; the array table; each array on a 32-byte
   boundary; then, if the mesh is skinned, the skin header, palette, scratch area and bone list,
   with no padding between them.
3. The extra keys, then the extra values.
4. The rig table, aligned to 4 bytes, then the rigs.
5. In Kingdom, zeros to a multiple of 32 bytes, in all 2,861 files. Agents files end where the
   last block does. MySims is inconsistent: 2,041 files are padded to 32 bytes and 641 only to 4.

The 32 bytes of zeros before every display list are there in all 22,102 meshes.

## Pattern

The pattern reads everything except the lengths of the attribute arrays, which it cannot know
without replaying the display list; it shows each array's first element instead. The zeros that
pad a display list parse as a run of NOPs.

```cpp
#pragma endian big

import std.mem;
import std.string;
import type.base;

struct Vector3 {
    float x;
    float y;
    float z;
};

struct Vector2 {
    float x;
    float y;
};

struct Colour {
    u8 r;
    u8 g;
    u8 b;
    u8 a;
};

struct ResourceKey {
    type::Hex<u64> instance;
    type::Hex<u32> type;
    type::Hex<u32> group;
};

enum Attribute : u8 {
    Position = 9,
    Normal = 10,
    Colour0 = 11,
    Colour1 = 12,
    Tex0 = 13,
    Tex1 = 14,
    Tex2 = 15,
    Tex3 = 16,
    Tex4 = 17,
    Tex5 = 18,
    Tex6 = 19,
    Tex7 = 20
};

struct Element<auto size> {
    if (size == 12)
        Vector3 value;
    else if (size == 8)
        Vector2 value;
    else if (size == 4)
        Colour value;
    else
        u8 bytes[size];
};

struct ArrayEntry {
    Attribute attribute;
    u8 elementSize;
    padding[2];
    Element<elementSize> *first : u32;   // as many as the display list indexes
};

struct Vertex<auto arrays, auto skinned> {
    if (skinned)
        u8 matrix;                      // PNMTXIDX: slot * 3
    u16 index[arrays];
};

struct Command<auto end, auto arrays, auto skinned> {
    u8 opcode;
    if (opcode == 0x00) {
        // A run of NOPs, and the zeros that pad the buffer.
        u8 nops[while($ < end && std::mem::read_unsigned($, 1) == 0x00)];
    } else if (opcode == 0x20 || opcode == 0x28 || opcode == 0x30 || opcode == 0x38) {
        u16 paletteIndex;
        type::Hex<u16> descriptor;
    } else {
        u16 vertexCount;
        Vertex<arrays, skinned> vertices[vertexCount];
    }
};

struct DisplayList<auto end, auto arrays, auto skinned> {
    Command<end, arrays, skinned> commands[while($ < end)];
};

struct PaletteEntry {
    float weights[4];
    u8 bones[4];                        // index the bone list; 0xFF unused
};

struct Scratch {
    float rows[12];                     // three (1, 0, 0, 0) rows in every file
};

struct Skin {
    u32 paletteOffset;
    u32 scratchOffset;
    u32 paletteCount;

    PaletteEntry palette[paletteCount] @ paletteOffset;
    Scratch scratch[paletteCount] @ scratchOffset;
};

struct BoneList {
    u32 count;
    type::Hex<u32> bones[count];        // FNV32 names
};

struct Mesh {
    u32 displayListSize;
    u32 displayListOffset;
    u32 arrayCount;
    u32 arrayTableOffset;
    ResourceKey material;
    Vector3 boundsMin;
    Vector3 boundsMax;
    type::Hex<u32> unknown[2];
    type::Hex<u32> name;                // FNV32, usually fnv32("none")
    padding[12];
    u32 skinOffset;
    u32 boneListOffset;
    u32 rigOffset;

    ArrayEntry arrays[arrayCount] @ arrayTableOffset;
    DisplayList<displayListOffset + displayListSize, arrayCount, skinOffset != 0>
        displayList @ displayListOffset;
    if (skinOffset != 0) {
        Skin skin @ skinOffset;
        BoneList boneList @ boneListOffset;
    }
};

struct MeshPointer {
    Mesh *mesh : u32;
};

struct Rig {
    u32 boneCount;
    u32 hashesOffset;
    u32 matricesOffset;

    type::Hex<u32> bones[boneCount] @ hashesOffset;
    float inverseBind[boneCount * 16] @ matricesOffset;
};

struct RigPointer {
    Rig *rig : u32;
};

struct RevoModel {
    char magic[4];                      // RMDL
    type::Hex<u32> version;             // 0x00000101
    Vector3 boundsMin;                  // FLT_MAX, unused
    Vector3 boundsMax;                  // -FLT_MAX, unused
    u32 meshCount;
    u32 meshTableOffset;                // always 0x58
    u32 extraCount;
    u32 extraKeysOffset;
    u32 extraValuesOffset;
    u32 rigTableOffset;                 // 0 when there are no rigs
    padding[32];

    MeshPointer meshes[meshCount] @ meshTableOffset;
    if (extraCount > 0) {
        type::Hex<u32> extraKeys[extraCount] @ extraKeysOffset;
        std::string::NullString extraValues[extraCount] @ extraValuesOffset;
    }
    if (rigTableOffset != 0)
        RigPointer rigs[while(std::mem::read_unsigned($, 4) != 0)] @ rigTableOffset;
};

RevoModel model @ 0x00;
```

## Unknowns

- The two words at mesh info `0x38`. Win32 Model carries the same pair, and a converted model
  keeps them, but what the game does with them is not known.
- What decides a display list's buffer size, and what orders a mesh's bone list.
- Whether the games accept GX primitives other than strips and triangle lists, or element formats
  other than the ones above; none appear in the shipped files.
