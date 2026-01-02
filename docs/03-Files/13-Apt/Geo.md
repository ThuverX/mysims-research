# Apt Geo

> ⚠️ This page is incomplete.

Describes geometries used in the main `.apt` file, these are 2d models used for drawing on.

# Pattern

```cpp
import type.base;

struct Vector2 {
    float x;
    float y;
};

struct Vertex {
    Vector2 v1;
    Vector2 v2;
    Vector2 v3;
};

struct AptGeoEntry {
    u64 type;
    u64 vertexCount;
    u64 vertexOffset;
    u32 flags;
    float;
    Vertex vertices[vertexCount] @ vertexOffset;
    if(type == 5) {
        float matrix[15];
        u32 textureIndex;
        u32;
        u32;
    }
};

struct AptPointer {
    AptGeoEntry* ptr : u64;
};

struct AptGeoIndex {
    u32 objectId;
    u32 geoCount;
    u64 tableOffset;
   
    AptPointer geos[geoCount] @ tableOffset;
};

struct AptGeoFile {
    char magic[24];
    u64 numObjects;
    u64 indexTableStart;
    AptGeoIndex indicies[numObjects];
};

AptGeoFile file @ 0;
```