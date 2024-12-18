# wmdl

Windows models, only model format used by MySims PC.
Rig data is probably wrong.

Vertex id's are used more dynamically than hexpat suggests.
It uses a "VertexKey" a 7bit value defining the look of the upcomming vertices. My C# code describes it better.
```cs
        vertexKeyCount = Buffer.ReadUInt32();

        for (int i = 0; i < vertexKeyCount; i++)
        {
            vertexKeys.Add(
                new VertexKey()
                {
                    offset = Buffer.ReadUInt32(),
                    type = (VertexKeyType)Buffer.ReadByte(),
                    index = Buffer.ReadByte(),
                    subIndex = Buffer.ReadByte(),
                }
            );
        }

        vertexArraySize = Buffer.ReadUInt32();
        var vertexSize = vertexArraySize / numVerts;

        for (int i = 0; i < vertexArraySize; i += (int)vertexSize)
        {
            var start = Buffer.BaseStream.Position;
            var vertex = new Vertex();

            foreach (var key in vertexKeys)
            {
                Buffer.BaseStream.Position = start + key.offset;

                switch (key.type)
                {
                    case VertexKeyType.FLOAT2:
                    {
                        vertex.SetByIndex(key.index, Buffer.ReadVector2(), key.subIndex);
                        continue;
                    }

                    case VertexKeyType.FLOAT3:
                    {
                        vertex.SetByIndex(key.index, Buffer.ReadVector3(), key.subIndex);
                        continue;
                    }

                    case VertexKeyType.FLOAT:
                    {
                        vertex.SetByIndex(key.index, Buffer.ReadSingle(), key.subIndex);
                        continue;
                    }
                    case VertexKeyType.UNKNOWN:
                    default:
                        throw new Exception($"Unknown VertexKeyType {key.type} ({(int)key.type})");
                }
            }

            vertices.Add(vertex);
        }
```

Very old hexpat.
```hexpat
import std.string;

struct Vector3 {
    float x;
    float y;
    float z;
};

struct Vector2 {
    float x;
    float y;
};

struct Weight {
    u32 a;
    u32 b;
    u32 c;
    float d;
};

struct Vertex3 {
    Vector3 position;
    Vector3 normal;
    Vector2 uv;
};

struct Vertex4 {
    Vector3 position;
    Vector3 normal;
    Vector2 uv;
    Vector2 uv2;
};

struct Vertex5 {
    Vector3 position;
    Weight weight;
    Vector3 normal;
    Vector2 uv;
};

struct Vertex6 {
    Vector3 position;
    Weight weight;
    Vector3 normal;
    Vector2 uv;
    Vector2 uv2;
};

struct Face {
    u16 a;
    u16 b;
    u16 c;
};

struct Bone {
    float; // also always same?
    float ukn[11];
    float x;
    float y;
    float z;
    float; // same for every bone
};

struct Rig {
    u32 num_bones;
    u32 bone_hashes[num_bones];
    Bone bones[num_bones];
};

struct Mesh {
    u32 material_hash;
    padding[8];
    u32 group_hash;
    u8 same_as_header[24];
    padding[52-24];
    u32 num_verts;
    u32 num_faces;
    u32 vert_type;

    u8 vertkeys[vert_type * 7];

    if(vert_type == 3) {
        u32 verts_size;
        Vertex3 vertices[num_verts];
    } else if(vert_type == 4) {
        u32 verts_size;
        Vertex4 vertices[num_verts];
    } else if(vert_type == 5) {
        u32 verts_size;
        Vertex5 vertices[num_verts];
    } else if(vert_type == 6) {
        u32 verts_size;
        Vertex6 vertices[num_verts];
    }

    u32 faces_size;
    Face faces[num_faces];
    s32 rig;
};

struct Header {
    u8 version;
    char magic[6];
    u16 blank;
    padding[24];

    u32 num_extra_params;
    u32 param_ids[num_extra_params];
    if(num_extra_params != 0) {
        u32 extra_params_size;
        std::string::NullString params[num_extra_params];
    } else {
        padding[1];
    }

    u32 num_rigs;
    Rig rigs[num_rigs];
    u32 num_meshes;
    Mesh meshes[num_meshes];
};

Header header @ 0;
```