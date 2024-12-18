# material set

Materials but more:
```
struct Ref {
    u32 ref_group;
    u32 ref_hash;
    padding[4];
    FileType ref_type;
};

struct Header {
    padding[12];
    u32 material_count;
    padding[16]; //self??
    Ref refs[material_count];
    padding[28];
    u32 other_count;
    u32 other_values[other_count];
};

Header header @ $;
```