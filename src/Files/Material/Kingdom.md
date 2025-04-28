# Material

{{#include ../../includes/KingdomSpecific.md}}

> Check out the MySims version [here](./MySims.md).

Materials define which shader along with what parameters the material uses.

```cpp
import type.base;

struct ResourceKey {
    be u32 low [[hidden]];
    be u32 high [[hidden]];
    u64 instance = low | high << 32 [[export, format("type::impl::format_hex")]];
    type::Hex<be u32> type;
    type::Hex<be u32> group;
};

struct MaterialParameter {
    type::Hex<be u32> type;
    be u32 valueType;
    be u32 valueFieldCount;
    be u32 offset;
    
    u32 jump = $;
    $ = offset + 16;
    
    if(valueType == 1) {
        be float color[valueFieldCount];
    } else if(valueType == 2) {
        be u32 value;
    } else if(valueType == 4) {
        ResourceKey mapKey;
    }
    
    $ = jump;
};

struct LRTMData {
    char magic2[4];
    u32;
    be u32 paramSize;
    be u32 paramCount;
    MaterialParameter params[paramCount];
};

struct MaterialData {
    char magic1[4];
    u32;
    u32;
    u32 lrtmSize;
    LRTMData ltrmData;
};

MaterialData material @ $;
```

# Material Set
A material set is a list of references to material files.


```cpp
import type.base;

struct MaterialSet {
    char magic[4];
    u32 one;
    u32 zero;
    u32 materialCount;
    type::Hex<u64> instances[materialCount];
    type::Hex<u64> self; // I think?
};

MaterialSet materialSet @ $;
```