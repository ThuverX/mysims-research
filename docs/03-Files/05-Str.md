# Str
String files are used to store translated pieces of game text. They also have an XML counterpart.
Use [this editor](https://github.com/bottledlactose/mysims-str-editor) to edit these files.

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