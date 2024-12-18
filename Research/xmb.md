# xmb
Binary XML? Looks like a custom format, this hexpat is once again old and I'm not sure if this is even correct.
```
import std.string;

char magic[4] @ $;
u32 name_table_size @ $;
u32 data_size @ $;
u32 root_offset @ $;

struct Node {
    s32 name_offset;
    s32 text_offset;
    s32 child_offset_a;
    s32 child_offset_b;
    padding[4];

    if(name_offset >= 0) {
        std::string::NullString name @ name_offset + 16;
    }

    if(text_offset >= 0) {
        std::string::NullString text @ text_offset + 16;
    }

    if(child_offset_a >= 0) {
        Node child_a @ child_offset_a + 16 + name_table_size;
    }

    if(child_offset_b >= 0) {
        Node child_b @ child_offset_b + 16 + name_table_size;
    }
};

Node root @ root_offset + 16 + name_table_size;
```