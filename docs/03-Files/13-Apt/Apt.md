# Apt File

## Pattern

```cpp
import std.string;

using MovieCharacter;
using ShapeCharacter;
using SpriteCharacter;
using ImageCharacter;

enum CharacterType : u64 {
    SHAPE = 1,
    TEXT = 2,
    FONT = 3,
    BUTTON = 4,
    SPRITE = 5,
    SOUND = 6,
    IMAGE = 7,
    MORPH = 8,
    MOVIE = 9,
    STATIC_TEXT = 10,
    NONE = 11,
    VIDEO = 12
};

struct Character {
    CharacterType type;
    u64 sig;
    
    // prevent infinite loop
    /*if(type == 9) {
        MovieCharacter movie;
    }*/
    
    if(type == CharacterType::SHAPE) {
        ShapeCharacter shape;
    }
    if(type == CharacterType::SPRITE) {
        SpriteCharacter sprite;
    }
    if(type == CharacterType::IMAGE) {
        ImageCharacter image;
    }
};

struct Array<T> {
    u64 capacity;
    u64 offset;
    if(offset > 0) {
        u64 jump = $;
        
        $ = offset;
        T data[capacity];
        
        $ = jump;
    }
};

struct CharacterPtr {
    Character* character : u64;
};

enum FrameItemType : u64 {
    ACTION = 1,
    FRAME_LABEL = 2,
    PLACE_OBJECT = 3,
    REMOVE_OBJECT = 4,
    BACKGROUND_COLOR = 5,
    INIT_ACTION = 8
};

struct ActionFrameItem {
    u64 actionScriptOffset;
};

struct BackgroundFrameItem {
    u32 color;
    u32 pad;
};

struct LabelFrameItem {
    std::string::NullString* label : u64;
    u32 flags;
    u32 frameId;
};

bitfield PlaceObjectFlags {
    Move              : 1; // 0x00000001
    HasCharacter      : 1; // 0x00000002
    HasMatrix         : 1; // 0x00000004
    HasColorTransform : 1; // 0x00000008
    HasRatio          : 1; // 0x00000010
    HasName           : 1; // 0x00000020
    HasClipDepth      : 1; // 0x00000040
    HasClipAction     : 1; // 0x00000080

    _reserved         : 24; // remaining bits
};

struct Matrix2x2 {
    float m[4];
};

struct Vector2 {
    float x;
    float y;
};

struct RemoveObjectFrameItem {
    u64 depth;
};

struct PlaceObjectFrameItem {
    PlaceObjectFlags placeFlags;
    u32 depth;
    u32 characterId;
    Matrix2x2 rotScale;
    Vector2 translation;
    u32 tintColor;
    u32 additiveColor;
    float ratio;
    u64 nameOffset;
    if(nameOffset != 0) {
        u64 jump = $;
        
        $ = nameOffset;
        std::string::NullString name;
        
        $ = jump;
    }
    u32 clipDepth;
    char pad[20];
};

struct FrameItem {
    FrameItemType type;
    
    if(type == FrameItemType::BACKGROUND_COLOR) {
        BackgroundFrameItem background;
    }
    if(type == FrameItemType::ACTION) {
        ActionFrameItem action;
    }
    if(type == FrameItemType::FRAME_LABEL) {
        LabelFrameItem label;
    }
    if(type == FrameItemType::PLACE_OBJECT) {
        PlaceObjectFrameItem placeObject;
    }
    if(type == FrameItemType::REMOVE_OBJECT) {
        RemoveObjectFrameItem removeObject;
    }
};

struct FrameItemPtr {
    FrameItem * item : u64;
};

struct Frame {
    Array<FrameItemPtr> frames;
};

struct PlayableCharacter {
    Array<Frame> frames;
};

struct MovieCharacter : PlayableCharacter {
    u64;
    Array<CharacterPtr> characters;
    u32 screenWidth;
    u32 screenHeight;
    u64 msPerFrame;
    Array<u32> imports;
    Array<u32> exports;
};

struct Vector4 {
    float x;
    float y;
    float z;
    float w;
};

struct SpriteCharacter {
    Array<Frame> frames;
    u64;
};

struct ShapeCharacter {
    Vector4 bounds;
    u64 geometryId;
};

struct ImageCharacter {
    u64 textureId;
};

// const apt offset + character type + signature
MovieCharacter root @ 144 + 16;
```