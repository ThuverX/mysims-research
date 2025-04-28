# Level

{{#include ../../includes/KingdomSpecific.md}}

A level is a collection of models, objects and meta data, like grid size.

## Pattern

{{#include ../../includes/Incomplete.md}}

```cpp
import type.base;

struct Vector3 {
    float x;
    float y;
    float z;
};

struct LevelSceneObject {
    type::Hex<u64> name;
    Vector3 pos;
    Vector3 rot;
    Vector3 scale;
    u32 zero;
};


struct LevelBinFile {
    char magic[4];
    u32 version;
    float startPosX;
    float startPosZ;
    u32 cellSizeX;
    u32 cellSizeZ;
    u32 numCellsX;
    u32 numCellsZ;
    float; // world bottom? water layer?
    float;
    u32 modelCount;
    u32 objectCount;
    Vector3 boundsMin;
    Vector3 boundsMax;
    type::Hex<u64> models[modelCount];
    LevelSceneObject objects[objectCount];
};

LevelBinFile level @ $;
```