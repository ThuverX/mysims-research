# Bnk

<Incomplete />

<CozySpecific />

An audio bank in Audiokinetic's [Wwise](https://www.audiokinetic.com/products/wwise/) format. Both
games drive all of their audio through Wwise, so a bank holds not just sound data but the events,
actions and containers that decide what plays.

The original releases are a different format. Wwise arrived with the Cozy Bundle; before it the
games used EA's own audio, and the move kept the type id and the name `bnk` while replacing
everything underneath. In the originals the banks live inside the [packages](./DBPF) under this
same type id rather than as loose files, and the streamed music is `SCHl` in `Sfx/*.strm`:

| Release | Bank magic | Byte order |
|---|---|---|
| Wii, MySims and Kingdom | `BNKb` | big-endian |
| PC 2010 | `BNKl` | little-endian |
| Cozy Bundle | `BKHD` | little-endian, and Wwise |

The PC release also keeps a per-sample `RuntimeSettings` XML beside every bank, under type
`0x6D3E3FB4`, holding the volume, 3d falloff, pitch and interruption settings that a Wwise bank
would carry inside itself. Everything below is the Cozy Bundle.

| | |
|---|---|
| Files | `GameData_Win64/Sfx/*.bnk`, 3,551 in MySims and 7,637 in Kingdom |
| Magic | None; the file starts with its first section, always `BKHD` |
| Byte order | Little-endian |
| Version | `150` in every bank of both games |
| DBPF type | `bnk`, `0xB6B5C271` |

Media is either embedded in the bank or streamed from `GameData_Win64/Sfx/Media/<media id>.wem`.
A `.wem` is a RIFF/WAVE file holding one Wwise-encoded stream.

> MySims also ships `GeneratedSoundBanks/`, which the game does not read. It is **not** a copy of
> the banks above: `Windows/` holds 1,050 of the 3,551, and all but two differ from their
> counterpart in `Sfx` — 381 are 48-byte stubs, 642 are smaller and 27 larger — so it is an
> earlier, partial build. The two that match are stubs in both folders. Beside it, `Wwise_IDs.h`
> lists every event, bank, bus and game parameter by name and id.

## Ids

Every id in a bank — bank, event, bus, audio device, game parameter — is the
[FNV32](../FNV) hash of a name, over the **lowercased** ASCII name. All 15,766 ids in
`Wwise_IDs.h` hash from the name beside them, and the `BKHD` bank id of all 11,188 banks is the
hash of the bank's own file name. Spaces count: the master bus is `Master Audio Bus`, which the
header writes as the C++ identifier `MASTER_AUDIO_BUS` but which hashes with its spaces.

Event names are normally `Play_<bank>`, so `apple_fall.bnk` holds the event `Play_apple_fall`.
Names are not stored in the bank, only the hashes.

## Sections

A bank is a flat run of sections, read while at least 8 bytes remain. In every shipped bank the
last section ends exactly at the end of the file.

| Offset | Type | Name |
|---|---|---|
| 0x00 | char[4] | id |
| 0x04 | u32 | size |
| 0x08 | u8[size] | body |

Four section ids carry the audio: `BKHD`, `DIDX`, `DATA` and `HIRC`. Almost every bank is either
`BKHD DIDX DATA HIRC` (10,789 banks) or `BKHD HIRC` with no media of its own (391). Six banks are
a `BKHD` and nothing else — 48-byte stubs for sounds that were cut. Each game's `Init.bnk` is the
exception, adding `INIT`, `STMG`, `ENVS` and `PLAT`; it is also the only bank holding busses and
audio devices.

### BKHD

| Offset | Type | Name | Notes |
|---|---|---|---|
| 0x00 | u32 | version | `150` |
| 0x04 | u32 | bankId | hash of the file name |
| 0x08 | u32 | languageId | hash of `sfx` (1,885 banks) or of `english(us)` (9,303) |
| 0x0C | u32 | altValues | always `0x10` |
| 0x10 | u32 | projectId | always `17341` |
| 0x14 | u32 | zero | |
| 0x18 | u8[16] | hash | different in every bank but one pair |
| 0x28 | … | padding | zero to the end of the section |

### DIDX

An index of the media embedded in this bank, `size / 12` entries of:

| Offset | Type | Name |
|---|---|---|
| 0x00 | u32 | mediaId |
| 0x04 | u32 | offset |
| 0x08 | u32 | size |

`offset` is from the start of the `DATA` body, not from the start of the file. The two games index
33,938 embedded media between them.

### DATA

The embedded `.wem` files, back to back at the offsets `DIDX` gives. The section has no structure
of its own.

### HIRC

The object hierarchy: a `u32` object count, then that many objects.

| Offset | Type | Name | Notes |
|---|---|---|---|
| 0x00 | u8 | type | see below |
| 0x01 | u32 | size | bytes after this field, the id included |
| 0x05 | u32 | id | |
| 0x09 | u8[size - 4] | body | per type |

These object types occur, with the number of objects of each across both games:

| Type | Name | Count | Read |
|---|---|---|---|
| 2 | sound | 34,475 | yes |
| 3 | action | 20,116 | yes |
| 4 | event | 20,127 | yes |
| 5 | random/sequence container | 11,663 | parent only |
| 8 | bus | 10 | no |
| 14 | — | 34,473 | no |
| 16 | — | 20,015 | no |
| 17 | — | 2 | no |
| 21 | audio device | 4 | no |

Types 8 and 21 appear only in `Init.bnk`, and their ids are exactly the five busses and two audio
devices `Wwise_IDs.h` names, which is how they are identified here. Types 14, 16 and 17 are not
decoded; 14 occurs about once per sound and 16 about once per event.

#### Sound (2)

| Offset | Type | Name | Notes |
|---|---|---|---|
| 0x00 | u32 | plugin | the source plug-in, which fixes the codec |
| 0x04 | u8 | streamType | `0` embedded in this bank's `DATA` (33,940 sounds), `2` streamed from `Media/` (535) |
| 0x05 | u32 | mediaId | `DIDX` entry, or `Media/<mediaId>.wem` |
| 0x09 | u32 | mediaSize | |
| 0x0D | u8 | sourceBits | |
| 0x0E | | node base | below |

#### Action (3)

| Offset | Type | Name | Notes |
|---|---|---|---|
| 0x00 | u16 | actionType | `0x0403` play (20,114), `0x0103` stop (2, both in `video_player.bnk`) |
| 0x02 | u32 | targetId | the object the action acts on |

#### Event (4)

| Offset | Type | Name | Notes |
|---|---|---|---|
| 0x00 | u8 | actionCount | `1`, or `0` for the 11 events that do nothing |
| 0x01 | u32[actionCount] | actions | action object ids |

To find what an event plays: follow the event to its actions, each action to its target, and the
target to the objects whose parent it is, collecting every sound reached.

#### Node base

A sound's body ends with a node base, which is where its parent and bus live. A container's body
starts with one.

| Type | Name | Notes |
|---|---|---|
| u8 | overrideFx | always `0` |
| u8 | fxCount | `0` or `1` |
| u8 | bypass | only when `fxCount > 0`; always `0` |
| effect × fxCount | fx | `u8 index; u32 effectId; u8 shareSet` |
| u8 | overrideMetadata | |
| u8 | metadataCount | always `0` |
| 6 bytes × metadataCount | metadata | never present, so the size is unconfirmed |
| u32 | overrideBus | `0`, or a bus id from `Init.bnk` |
| u32 | parentId | `0` when the sound has no parent |

The effect entry is **6 bytes**, not the 7 it is sometimes given as. With 7 the node base runs off
the end of the body on every object that has an effect: 8,448 sounds and 11,570 containers. At 6,
every one of them parses, and every one of the 34,475 sounds' `parentId` values is either `0`, an
object in the same bank, or a bus in `Init.bnk` — the only three things it can legally be.

A sound either has a parent or overrides its bus; none of them does both.

## Media

A `.wem` is an ordinary RIFF file: `RIFF`, a `u32` size, `WAVE`, then chunks of a 4-byte id, a
`u32` size, the body, and a pad byte when the size is odd. The chunks that matter are `fmt `, the
`data` the codec reads, and `seek` for Opus.

`fmt ` fields, as offsets within its body:

| Offset | Type | Name |
|---|---|---|
| 0x00 | u16 | codec |
| 0x02 | u16 | channels |
| 0x04 | u32 | sampleRate |
| 0x0C | u16 | blockAlign |
| 0x0E | u16 | bitsPerSample |
| 0x18 | u32 | frameCount |
| 0x1C | u32 | packetCount |
| 0x20 | u16 | preSkip |

The last three are Opus and Vorbis only.

### Codecs

The sound's `plugin` and the media's `fmt ` codec always agree, so either one names the codec:

| Plug-in | `fmt ` codec | Codec | Sounds |
|---|---|---|---|
| `0x00140001` | `0x3041` | Opus | 26,017 |
| `0x00020001` | `0x8311` | PT-ADPCM | 8,256 |
| `0x00040001` | `0xFFFF` | Wwise Vorbis | 199 |
| `0x00010001` | `0xFFFE` | PCM, extensible | 1 |
| `0x00C80002` | — | not audio; only in `video_player.bnk`, and its media is not in the game | 2 |

Opus is what nearly everything uses in both games. Wwise Vorbis strips the Vorbis headers against
a codebook library, so a `.wem` holding it is not a playable Ogg file until they are rebuilt.

## Converting

[vgmstream](https://github.com/vgmstream/vgmstream) reads both the banks and the `.wem` files,
including the Wwise Vorbis header rebuild.

## Pattern

`DATA` is left unexpanded, since its contents are the embedded `.wem` files that `DIDX` points
into.

```cpp
import std.mem;
import type.base;

struct BankHeader {
    u32 version;                 // 150
    type::Hex<u32> bankId;       // FNV32 of the bank's file name
    type::Hex<u32> languageId;   // FNV32 of "sfx" or "english(us)"
    u32 altValues;               // 0x10
    u32 projectId;               // 17341
    u32 zero;
    u8 hash[16];
    // zero padding to the end of the section
};

struct MediaEntry {
    type::Hex<u32> mediaId;
    u32 offset;                  // from the start of the DATA body
    u32 size;
};

struct Effect {
    u8 index;
    type::Hex<u32> effectId;
    u8 shareSet;
};

struct NodeBase {
    u8 overrideFx;
    u8 fxCount;
    if(fxCount > 0) {
        u8 bypass;
        Effect fx[fxCount];
    }
    u8 overrideMetadata;
    u8 metadataCount;
    u8 metadata[metadataCount * 6];
    type::Hex<u32> overrideBus;  // 0, or the id of a bus in Init.bnk
    type::Hex<u32> parentId;     // 0: no parent
};

struct Sound {
    type::Hex<u32> plugin;       // source plug-in, see Codecs
    u8 streamType;               // 0: embedded in DATA; 2: streamed from Media/
    type::Hex<u32> mediaId;
    u32 mediaSize;
    u8 sourceBits;
    NodeBase node;
};

struct Action {
    u16 actionType;              // 0x0403 play, 0x0103 stop
    type::Hex<u32> targetId;
};

struct Event {
    u8 actionCount;
    type::Hex<u32> actions[actionCount];
};

struct HircObject {
    u8 type;
    u32 size;                    // bytes after this field
    u32 bodyEnd = $ + size;
    type::Hex<u32> id;
    if(type == 2)
        Sound sound;
    else if(type == 3)
        Action action;
    else if(type == 4)
        Event event;
    $ = bodyEnd;
};

struct Hirc {
    u32 objectCount;
    HircObject objects[objectCount];
};

struct Section {
    char id[4];
    u32 size;
    u32 bodyEnd = $ + size;
    if(id == "BKHD")
        BankHeader header;
    else if(id == "DIDX")
        MediaEntry media[size / 12];
    else if(id == "HIRC")
        Hirc hirc;
    $ = bodyEnd;
};

struct Bank {
    Section sections[while(std::mem::size() - $ >= 8)];
};

Bank bank @ 0x00;
```

## Unknowns

- Object types 14, 16 and 17, and every field of types 5, 8 and 21 past the node base.
- Everything in a sound's body after the node base's parent id: properties, positioning, RTPCs.
- A container's play mode and child list; the node base is read only as far as the parent.
- `BKHD`'s 16-byte hash, and the `INIT`, `STMG`, `ENVS` and `PLAT` sections of `Init.bnk`.
- The size of a node base metadata entry, since no sound in either game has one.
