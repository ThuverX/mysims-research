# Win32 Model

Specific model files used only in the windows version of MySims. We don't know their exact extension, but the Taco Bell version refers to them as Win32Models. They can contain a list of models and a list of [meshes](#win32-mesh).

## Win32 Mesh
Win32 meshes are parts of a model that usually share the same material. The game refers to them as "Drawables". They contain a reference to a [Material](/Files/Material.md), a vertex list, and a face list.

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

### Mesh Pattern
stub.

## Win32 Rig
stub.

### Rig Pattern
stub.

## Model Pattern
stub.