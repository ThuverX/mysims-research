# DataBase Packed File
Are MySims way of packaging files, they are also refered to as DBPF and use the extension `.package`.

## Format
DBPF have some different names for the files that are inside, in this documentation we will refer to them in the following way:
- Instance, hash - The name of the file. eg: `ticketmachine`
- Group - This is like a folder, for example the `ticketmachine` group contains both the files for the model and material of the ticketmachine.
- Type - This is the same as a file type, eg: `windowsmodel`, `material` or `xml`

> Check [Resource Keys](../ResourceKey) for more info.

Its important to note that some of these values have not been unhashed and thus are refered to by their instance id, instead of an actual name.

## Pattern

<!-- {{#include ../includes/Incomplete.md}} -->

```c
using FileType;
using DBPFFile;

DBPFFile file @ $;

struct DBPFHeader {
    char magic[4]; // Needs to be DBPF

    u32 majorVersion;
    u32 minorVersion;

    padding[12];

    u32 dateCreated;
    u32 dateModified;

    u32 indexMajorVersion;
    u32 indexEntryCount;
    u32 firstIndexOffset;
    u32 indexSize;

    u32 holeEntryCount;
    u32 holeOffset;
    u32 holeSize;

    u32 indexMinorVersion;
    u32 indexOffset;

    padding[28];
};

bitfield FieldFlags {
    resource_type   : 1;
    resource_group  : 1;
    instance_hi     : 1;
    instance_lo     : 1;
    offset          : 1;
    file_size       : 1;
    mem_size        : 1;
    flags           : 1;
    padding         : 17;
};

struct DBPFIndexHeader {
    FieldFlags fieldFlags;
    if(fieldFlags.resource_type) {
        u32 resourceType;
    }
    if(fieldFlags.resource_group) {
        u32 resourceGroup;
    }
    if(fieldFlags.instance_hi) {
        u32 instanceHi;
    }
    if(fieldFlags.instance_lo) {
        u32 instanceLo;
    }
};

struct DBPFIndex {
    FileType type;
    u32 group;
    u32 instance_hi;
    u32 instance_lo;
    u64 instance;
    u32 offset;
    u32 fileSize;
    u32 memSize;
    u16 isCompressed;
    u16 ukn1;
};

struct DBPFFile {
    DBPFHeader header;
    $ = header.indexOffset;
    DBPFIndexHeader indexHeader;
    DBPFIndex indicies[header.indexEntryCount]; // TODO: use fieldflags
};

enum FileType: u32 {
    Model = 0x01661233,
    RevoModel = 0xf9e50586,
    WindowsModel = 0xb359c791,
    rig = 0x8eaf13de,
    clip = 0x6b20c4f3,
    KeyNameMap = 0x0166038c,
    Geometry = 0x015a1849,
    Material = 0x01d0e75d,
    MaterialSet = 0x02019972,
    OldSpeedTree = 0x00b552ea,
    SpeedTree = 0x021d7e8c,
    dds = 0x00b2d882,
    CompositeTexture = 0x8e342417,
    SimOutfit = 0x025ed6f4,
    LevelXml = 0x585ee310,
    LevelBin = 0x58969018,
    Physics = 0xd5988020,
    LuaScript = 0x474999b4,
    LightSetXml = 0x50182640,
    LightSetBin = 0x50002128,
    xml = 0xdc37e964,
    FootPrintSet = 0x2c81b60a,
    ObjectConstructionXml = 0xc876c85e,
    ObjectConstructionBin = 0xc08ec0ee,
    SlotXml = 0x4045d294,
    SlotBin = 0x487bf9e4,
    swm = 0xcf60795e,
    SwarmBin = 0x9752e396,
    XmlBin = 0xe0d83029,
    CABXml = 0xa6856948,
    CABBin = 0xc644f440,
    big = 0x5bca8c06,
    bnk = 0xb6b5c271,
    lua = 0x474999b4,
    luo = 0x2b8e2411,
    LightBoxXml = 0xb61215e9,
    LightBoxBin = 0xd6215201,
    xmb = 0x1e1e6516,
    ttf = 0xfd72d418,
    ttc = 0x35ebb959
};
```
