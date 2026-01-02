# XMB

XMB files are a binary XML format, it is not used everywhere and some files have even been switched to XML and back to XMB depending on the game version.

The neighbours and children here act like linked lists.

```cpp
import std.string;

char magic[4] @ $;
u32 name_table_size @ $;
u32 data_size @ $;
u32 root_offset @ $;

struct Node {
    s32 name_offset;
    s32 text_offset;
    s32 neighbour_offset;
    s32 child_offset;
    padding[4];

    if(name_offset >= 0) {
        std::string::NullString name @ name_offset + 16;
    }

    if(text_offset >= 0) {
        std::string::NullString text @ text_offset + 16;
    }

    if(neighbour_offset >= 0) {
        Node neighbour @ neighbour_offset + 16 + name_table_size;
    }

    if(child_offset >= 0) {
        Node child @ child_offset + 16 + name_table_size;
    }
};

Node root @ root_offset + 16 + name_table_size;
```