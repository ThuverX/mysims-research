# Apt const

# Pattern

```cpp
import std.string;

enum Type : u32 {
    STRING = 1,
    NUMBER = 4
};

struct Entry {
    Type type;
    u32 value;
    if(type == Type::STRING) {
        std::string::NullString @ value;
    }
};

struct Header {
    char magic[17];
    padding[3];
    u32 aptOffset;
    u32 itemCount;
    padding[4];
    Entry entries[itemCount];
};

Header header @ $;
```