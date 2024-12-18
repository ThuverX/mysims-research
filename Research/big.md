# big

EA's big file format, used for packaging UI's further
Hexpat should be fully correct this time.
```
import std.string;

struct Header {
    char magic[4];
    u32 archive_size;
    be u32 entry_count;
    be u32 first_entry;
};

struct Entry {
    be s32 offset;
    be s32 file_size;
    std::string::NullString filename;
    if(file_size > 0)
        char data[file_size] @ offset;
};

Header header @ $;
Entry entries[header.entry_count] @ $;
```