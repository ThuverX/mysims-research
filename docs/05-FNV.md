# FNV
[Fowler–Noll–Vo](https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function) or FNV is the hashing system used by MySims to hash various names.

## FNV32 vs FNV64
MySims specifically used FNV32 for uint32's and FNV64 for uint64's. In practice this means shaders names and groups use FNV32 while instances use FNV64.

|Size|Prime|Basis|
|----|-----|-----|
|32|0x01000193|0x811c9dc5|
|64|0x00000100000001b3|0xcbf29ce484222325|

## Algorithm
In pseudocode, taken from [Wikipedia](https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function).
```
algorithm fnv-1 is
    hash := FNV_offset_basis

    for each byte_of_data to be hashed do
        hash := hash × FNV_prime
        hash := hash XOR byte_of_data

    return hash 
```