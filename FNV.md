# FNV
[Fowler–Noll–Vo](https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function) or FNV is the hashing system used by MySims to hash various names.

## FNV32 vs FNV64
MySims specifically used FNV32 for uint32's and FNV64 for uint64's. In practice this means shaders names and groups use FNV32 while instances use FNV64.

|Size|Prime|Basis|
|----|-----|-----|
|32|0x01000193|0x811c9dc5|
|64|0x00000100000001b3|0xcbf29ce484222325|

## Algorithm
In pseudocode, taken from Wikipedia
```
algorithm fnv-1 is
    hash := FNV_offset_basis

    for each byte_of_data to be hashed do
        hash := hash × FNV_prime
        hash := hash XOR byte_of_data

    return hash 
```
In CSharp, taken from [MySims Editor](https://github.com/ThuverX/MySimsEditor).
> Note that strings are first lowered before being converted to bytes.
```cs
public static class FNV
{
    private static readonly uint PRIME_32 = 0x01000193;
    private static readonly ulong PRIME_64 = 0x00000100000001B3;
    private static readonly uint OFFSET_32 = 0x811C9DC5;
    private static readonly ulong OFFSET_64 = 0xCBF29CE484222325;

    public static uint Create32(byte[] bytes)
    {
        var hash = OFFSET_32;

        for (int i = 0; i < bytes.Length; i++)
        {
            hash *= PRIME_32;
            hash ^= bytes[i];
        }
        return hash;
    }

    public static ulong Create64(byte[] bytes)
    {
        var hash = OFFSET_64;

        for (int i = 0; i < bytes.Length; i++)
        {
            hash *= PRIME_64;
            hash ^= bytes[i];
        }
        return hash;
    }

    public static uint FromString32(string str)
    {
        return Create32(Encoding.UTF8.GetBytes(str.ToLower()));
    }

    public static ulong FromString64(string str)
    {
        return Create64(Encoding.UTF8.GetBytes(str.ToLower()));
    }
}

```