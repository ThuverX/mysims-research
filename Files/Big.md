# Big
Archive files using EA's BIG file format. For MySims they contain UI definition files using `.apt` files.

## Pattern
```c
import std.string;

struct Header {
    char magic[4];
    u32 archiveSize;
    be u32 entryCount;
    be u32 firstEntry;
};

struct Entry {
    be s32 offset;
    be s32 fileSize;
    std::string::NullString filename;
    if(fileSize > 0)
        u8 data[fileSize] @ offset;
};

Header header @ $;
Entry entries[header.entryCount] @ $;
```