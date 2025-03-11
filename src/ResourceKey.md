# Resource keys
Resource keys are the main way files are stored and referenced in many Maxis games. They are an abstraction on top of the filesystem. In simple terms this means they are just file paths.

# Format

A resourcekey consists of three parts.
1. The instance
    - A 64bit unsigned integer
    - This is like the file name, as its just that, an [FNV64](FNV.md) hashed version of its original file name.
2. The type
    - A 32bit unsigned integer, it's the file type, for a list of knows types check [here](index.md#formats).
    - In most cases again a [FNV32](FNV.md) version of the original file type.
3. The group
    - A 32bit unsigned integer.
    - This is like a folder (also an FNV32 hashed string), but can be `0` if the file is meant to be at the root. 

We usually show these files like this: `0x00000000!0x00000000EE93FAC8.dds`. Where `0x00000000` is the group and `0x00000000EE93FAC8` is the instance[^1].

*The Editor also displays them like this `00000000 - 00000000EE93FAC8`.*

> You may also sometimes see them referenced as `ITG`, because of the order they come in.

# Examples
Here are some examples:
|Resource Key|Real Path|Found in|
|------------|---------|--------|
|0x2C593B57!0x0000000000000001.windowsmodel|afAccessorySalonGlasses/1.windowsmodel|Characters.package|
|0x3C2A2452!0x00000000695B9F31.materialset|Mouth/afMouthKarine.materialset|Characters.package|
|0x3B971C87!0x00000000102B3F11.material|column_square/locDeco_fortuneTeller_column.material|Objects.package|

These names were found by hashing strings found inside the game files. And comparing them against all known resource keys.
Ones that could not be recovered like this may have partial or incomplete names. Like `0xCFFED122!0x000000002FA92BDF.material` just becomes `decoAppleBowl/2FA92BDF.material` (Found in Objects.package).

# Pattern

```cpp
import type.base;

struct ResourceKey {
    type::Hex<u64> instance;
    type::Hex<u32> type;
    type::Hex<u32> group;
};
```

[^1]: This is how the MySims Cozy Bundle for the switch stores its files.