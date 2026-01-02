# Win32 Model

Specific model files used only in the windows version of MySims. We don't know their exact extension, but the Taco Bell version refers to them as Win32Models. They can contain a list of models and a list of [drawables](#drawable).

## Drawables
Drawables are parts of a model that share the same material. They contain a reference to a [Material](./Material/MySims), a vertex list, and a face list.

### Vertex keys
Vertices are read using a list of vertex keys, which tell the engine how the vertices should be read. This is done for space optimization.

```c
enum VertexKeySize : u8 {
    kFloat2 = 1,            // used by uv's
    kFloat3 = 2,            // used by position, normal and weights
    kU32 = 4                // used by vertex groups
};

enum VertexKeyIndex : u8 {
    kPosition = 0,          // Vector3
    kNormal = 1,            // Vector3
    kUv = 2,                // Vector2
    kBoneGroups = 3,        // 4 u8's
    kWeight = 4,            // Vector3
};

struct VertexKey {
    u32 offset;
    VertexKeySize size;
    VertexKeyIndex index;
    u8 subIndex;
};
```

## Model Pattern
```cpp
import type.base;
import std.string;

struct ResourceKey {
    type::Hex<u64> instance;
    type::Hex<u32> type;
    type::Hex<u32> group;
};

struct Vector3 {
    float x;
    float y;
    float z;
};

struct Vector2 {
    float x;
    float y;
};

struct Bounds {
    Vector3 min;
    Vector3 max;
};

enum VertexKeySize : u8 {
    kFloat2 = 1,
    kFloat3 = 2,
    kU32 = 4
};

enum VertexKeyIndex : u8 {
    kPosition = 0,
    kNormal = 1,
    kUv = 2,
    kBoneGroups = 3,
    kWeight = 4,
};

struct VertexKey {
    u32 offset;
    VertexKeySize size;
    VertexKeyIndex index;
    u8 subIndex;
};

struct Vertex<auto size> {
    padding [size];
};

struct Face {
    u16 a;
    u16 b;
    u16 c;
};

struct Bone {
    float transform[16]; // 4x4 matrix
};


struct Rig {
    u32 numBones;
    u32 boneHashes[numBones];
    Bone bones[numBones];
};

struct Drawable {
    ResourceKey material;
    Bounds bounds;
    padding [8];
    type::Hex<u32> name;
    padding [16];
    u32 numVerts;
    u32 numFaces;
    u32 numVertexKeys;
    VertexKey vertexKeys[numVertexKeys];
    u32 vertexArraySize;
    u32 vertexSize = vertexArraySize / numVerts;
    Vertex<vertexSize> vertices[numVerts];
    u32 facesArraySize;
    Face faces[numFaces];
    s32 rigIndex;
};

struct WindowsModel {
    padding [1];
    char magic[4];
    u8 minorVersion;
    u8 majorVersion;
    padding [2];
    Bounds bounds;
    u32 numExtraParams;
    if(numExtraParams > 0) {
        u32 extraParamKeys[numExtraParams];
        u32 extraParamValueSize;
        std::string::NullString extraPramsValues[numExtraParams];
    } else {
        padding[1];
    }
    
    u32 numRigs;
    Rig rigs[numRigs];
    u32 numDrawables;
    Drawable drawables[numDrawables];
};

WindowsModel file @ $;
```