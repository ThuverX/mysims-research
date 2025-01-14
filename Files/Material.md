# Material
stub.
# Material Set
A material set is a list of references to material files.

## Pattern
```c
struct MaterialRef {
    u32 type;
    u32 group;
    u64 instance;
};

struct MTST {
    char magic[4]; // Must be MTST
    u32 version;
    u32 name;
    u32 index;
    u32 count;
    u32 indicies[count];
};

struct MaterialSet {
    u32 ukn1[3];
    u32 count;
    u32 ukn2[3];
    MaterialRef materials[count];
    MaterialRef ukn3;
    MTST mtst;
};

MaterialSet materialSet @ $;
```