# String file
String files are used to store translated pieces of game text. They also have an XML counterpart.

## Pattern

```cpp
import type.base;

struct String {
    type::Hex<u32> name;
    u32 len;
    char string[len];
    padding[1];
};

struct StrFile {
    u32 version;
    u32 count;
    String strings[count];
};

StrFile file @ $;
```