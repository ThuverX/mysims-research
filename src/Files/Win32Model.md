# Win32 Model

Specific model files used only in the windows version of MySims. We don't know their exact extension, but the Taco Bell version refers to them as Win32Models. They can contain a list of models and a list of [meshes](#win32-mesh).

## Win32 Mesh
Win32 meshes are parts of a model that usually share the same material. The game refers to them as "Drawables". They contain a reference to a [Material](./Material/MySims.md), a vertex list, and a face list.

### Vertex keys
Vertices are read using a list of vertex keys, which tell the engine how the vertices should be read. This is mostlikely done for space optimization.

```c

enum VertexKeyType: u8 {
    FLOAT2 = 1,
    FLOAT3 = 2,
    FLOAT = 4,
    UNKNOWN = 0
};

struct VertexKey {
    u32 offset;
    VertexKeyType type;
    u8 index; // where to put this data inside the vertex, think position, normal or uv
    u8 subIndex; // used with the uv, to tell if it should be placed in UV2, usually 0
};
```

## Model Pattern
```cpp
import type.base;
import std.string;

using CString = std::string::NullString;

struct Bone {
    float transform[16]; // 4x4 matrix
};

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

struct WindowsRig {
    u32 numBones;
    type::Hex<u32> boneHashes[numBones];
    Bone bones[numBones];
};

struct VertexKey {
    u32 offset;
    u8 type;
    u8 index;
    u8 subIndex;
};

struct Face {
    u16 a;
    u16 b;
    u16 c;
};

struct WindowsMesh {
    ResourceKey material;
    Vector3 boundsMin;
    Vector3 boundsMax;
    u32 ukn1[2];
    u32 name;
    u32 three;
    padding [12]; // all zero
    u32 numVerts;
    u32 numFaces;
    u32 vertexKeyCount;
    VertexKey vertexKeys[vertexKeyCount];
    u32 vertexArraySize;
    u8 vertexData [vertexArraySize];
    u32 facesArraySize;
    Face faces[numFaces];
    s32 rigIndex;
};

struct WindowsModel {
    u8 four;
    char magic[4];

    u8 minorVersion;
    u8 majorVersion;

    padding [2];

    Vector3 boundsMin;
    Vector3 boundsMax;

    u32 numExtraParams;
    type::Hex<u32> extraParamKeys[numExtraParams];
    if(numExtraParams != 0) {
        u32 extraParamValueSize;
        CString extraPramsValues[numExtraParams];
    } else {
        padding[1];
    }
    
    u32 numRigs;
    WindowsRig rigs[numRigs];
    u32 numMeshes;
    WindowsMesh meshes[numMeshes];
};

WindowsModel model @ $;
```