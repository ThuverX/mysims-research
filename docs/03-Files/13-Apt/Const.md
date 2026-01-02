# Apt const

Describes constants used in the main `.apt` file. Also contains the read offset for the main `.apt` file, requiring this to be read first.

# Pattern

```cpp
import std.string;

enum Type : u64 {
    STRING = 1,
    NUMBER = 4
};

struct Entry {
    Type type;
    
    if(type == Type::STRING) {
        std::string::NullString* stringvalue : u64;
    } else {
        u64 value;
    }
};

struct Header {
    char magic[24];
    u64 aptOffset;
    u64 entryCount;
    u64 startOffset;
    Entry entries[entryCount];
};

Header header @ $;
```