# Material
Materials define which shader along with what parameters the material uses.

## Pattern

```cpp
import type.base;

struct ResourceKey {
    type::Hex<u64> instance;
    type::Hex<u32> type;
    type::Hex<u32> group;
};

struct MaterialParameter {
    type::Hex<u32> type;
    u32 valueType;
    u32 valueFieldCount;
    u32 offset;
    
    u32 jump = $;
    $ = offset + 64;
    
    if(valueType == 1) {
        float color[valueFieldCount];
    } else if(valueType == 2) {
        u32 value;
    } else if(valueType == 4) {
        ResourceKey mapKey;
    }
    
    $ = jump;
};

struct MaterialData {
    u32 one1;
    u32 one2;
    padding[8]; // all zero
    u32 one3;
    ResourceKey self;
    u32 headerSize;
    u32 totalSize;
    char magic1[4];
    u32 version;
    type::Hex<u32> materialHash;
    type::Hex<u32> shaderHash;
    u32 mtrlSize;
    char magic2[4];
    padding[4]; // all zero
    u32 dataSize;
    u32 numParams;
    MaterialParameter params[numParams];
};

MaterialData material @ $;
```

## Parameter names
|name|hash|
|----|----|
|diffuseColor|0x7FEE2D1A|
|useLights|0x76F88689|
|highlightMultiplier|0x2616B09A|
|diffuseMap|0x6CC0FD85|
|ambientMap|0x20CB22B7|
|specularMap|0xAD528A60|
|alphaMap|0x2A20E51B|
|shadowReceiver|0xF46B90AE|
|blendmode|0xB2649C2F|
|transparency|0x05D22FD3|
|ambient|0x04A5DAA3|
|diffuse|0x637DAA05|
|greenChannelMultiplier|0xD1F4CB96|
|blueChannelMultiplier|0x7BB10C17|
|redChannelMultiplier|0x99BF82F6|
|nightTint|0x689AEFFE|
|dayTint|0xFBBBB5C2|
|overbrightDay|0x1D17D10F|
|negativeColorBiasNight|0xDB88EC28|
|negativeColorBiasDay|0x29214C0C|
|overbrightNight|0xB779F79B|
|specularColor|0xBF2AD9B3|
|specular|0x2CE11842|
|transparent|0x988403F9|
|vNormalWaveSpeed|0xAB26E148|
|emissionMap|0xF303D152|
|vReflectionWaveSpeed|0xDB319586|
|normalMapScale|0x3C45E334|
|jitterScale|0xA2E40EAB|
|waveFrequency|0x02937388|
|uReflectionWaveSpeed|0x50E0193B|
|waterColorBlue|0x2A93BAFB|
|baseAlpha|0x5916ED3E|
|reflectionSharpness|0xE460597B|
|intensity|0x933E38F4|
|waveAmplitude|0x11EFE2FD|
|noiseFrequency|0x7FD42F11|
|ShinyPower|0xBD237B0D|
|VspeedLayer2|0x2E18B549|
|warpAmp|0xDB5EBEE7|
|VspeedLayer0|0x2E18B54B|
|VspeedLayer1|0x2E18B54A|
|UspeedLayer1|0x7EEA0C2B|
|UspeedLayer0|0x7EEA0C2A|
|UspeedLayer2|0x7EEA0C28|
|reflectionIntensity|0xD552A779|
|reflectionAmount|0xB32A1342|
|uNormalWaveSpeed|0x9F63578D|
|diffuseAlpha|0xF72FCA9B|
|contrastSubtractColor|0x7490C750|
|contrastMultiplyColor|0x6612378C|
|amBodyShakespeare|0x9038F94B|
|amHeadHairLongSpikey|0x1067900C|
|auHeadHairBigFro|0x0923FB40|
|afBodyLayeredSkirt|0x58B2F06D|
|afHeadHairFortune|0x80C83701|
|amHeadHairSpikey|0x75486BDE|
|afHeadHairTightBun|0x6C8C62C9|
|afHeadHatPirateGinny|0x61F36B5B|
|auHeadHatCap|0xE17E380C|
|faceSkinTones|0x0FDC6FDC|
|auHeadHairFlowerCrown|0x9EDA8CF5|
|amHeadHatBellhop|0xF0D0E420|
|amHeadHatMagician|0xC1519BCF|
|auHeadHatPilotGoggles|0x8F0C0492|
|afBodyLowPoofSkirt|0xC5AE022B|
|afBodyMayor|0x383B9128|
|auHeadHatCapback|0xD89AD4D5|
|afHeadHairLibrarian|0x7255E7BE|
|afBodyTurtleneckBaggy|0xE2498117|
|auHeadHatBeenie|0xBCB6F07C|
|afHeadHairSmallBraids|0xFCDF8C6A|
|afHeadHairPuffyLayers|0x359839D2|
|amHeadHairIvyLeague|0xDE545F5E|
|afHeadHairMayor|0x146CB6B6|
|amHeadHairNigel|0xE97A9352|
|auHeadHatNinja|0xB4DE4520|
|auHeadHairMidShaggy|0x7C22B02C|
|afBodyShortApron|0x556E4212|
|afHeadHairCurlsRibbons|0x8CBF470E|
|auBodyPantsJacketBag|0x3B2679D5|
|afBodyShortSkirtSweater|0xD12B0C98|
|amHeadHairRay|0xCF76A1C7|
|amHeadHairArcade|0xE029E90D|
|afBodyHighPoofLongSkirt|0xF434AA77|
|afHeadHatBandanaDreads|0xEA080C69|
|auHeadHairFoxEars|0xC9314483|
|afBodyCollarSkirt|0x7D6FDC4C|
|afBodyCoatSkirt|0xC51BB766|
|afHeadHairStylishPeacock|0xE806C452|
|afBodyKimono|0x5F00B265|
|auHeadHatTopHat|0x16E4CA30|
|amHeadHatChef|0xB7A93AA8|
|auBodyKnight|0x6515EB2C|
|amHeadHairEthan|0xE9CA3E0B|
|afHeadHairClara|0x0A371797|
|afHeadHatWendalyn|0x6E2B178D|
|amBodyHauntedHouseBoy|0xA822B3E8|
|auHeadHatMohawk|0xD59381FB|
|auHeadHairSuperShortLayered|0xE72A5F1C|
|amHeadHairTim|0xEB85D831|
|auBodyHoodiePants|0x79A3B7FF|
|afBodyLongSleeveLongDress|0xD01B0A09|
|afHeadHatCowgirl|0x4A351BDC|
|auHeadHatBald|0x9ED158AB|
|amBodyMartialArts|0xD9DFB575|
|propBookClosed|0xE2B571A9|
|amBodyFlipper|0xE1A22A57|
|afBodyLongSkirtLargeCuff|0x66BA9C80|
|auHeadHatPirate|0xE4F0D787|
|auHeadHairShortFlatBangs|0x26F07855|
|auBodyBellhop|0x2836EA65|
|auBodyApronBear|0xC800D94B|
|afBodyKneeLengthSkirt|0xDD91B6B6|
|auHeadHatRasta|0x8D58D24F|
|afBodyLongSkirt|0x32E0CA0B|
|auBodySkinTight|0x23C6D774|
|auBodyCalfLengthPants|0x7BEBDD19|
|plumbobColor|0xEDDCECE1|
|afHeadHairDoubleBuns|0x455BEF77|
|auHeadHairHairspraySpikey|0xC36D202B|
|afHeadHairRaveKimono|0xAFC8F11B|
|auHeadHairBowlCut|0x40A202A7|
|amHeadHairCruise|0xAD6D2254|
|auBodyLongPantsBoots|0x57059004|
|afHeadHatNewspaperCap|0x791597CA|
|afHeadHatBandana|0x5519CFB6|
|afHeadHairAlexa|0x811F207F|
|afHeadHairStreakedLolita|0x37C3B76C|
|afHeadHairPuffyLayersBunny|0xF8404FFA|
|auBodyApronTshirtPants|0xBE323F01|
|auBodyLongPantsShortSleeves|0xC34A68D0|
|amBodyArcade|0xBCF4239B|
|afBodyAlexa|0xB3F9D3F1|
|afBodyAsymmetricalSkirt|0xCB6A2C62|
|auHeadHatCadet|0x88B04723|
|auBodyBear|0x8157DC19|
|auHeadHairDisco|0x4E053DBD|
|afBodyShortSleeveApron|0xAF284852|
|auBodyRolledSleevesLongPants|0x8804B9B4|
|afHeadHairPigTail|0x4487E3D4|
|afHeadHairLooseCurlsLong|0xEBBB243F|
|afHeadHairLong|0xBBF23C58|
|afHeadHairPigTailFlowers|0xB9642FF0|
|afHeadHairLongBraid|0xAA3CD006|
|afHeadHairLongPigtail|0x804AD79A|
|afHeadHatBeaniePigtails|0x608CAA94|
|afBodyChineseDress|0xC3DD71DA|
|amHeadHatCowboy|0xD987C7AD|
|afBodyFloristYoungerSister|0x667D4E9C|
|auHeadHatEarhat|0x1688F273|
|afHeadHairHighSalon|0x4038B561|
|afHeadHairSoftBobBangs|0xB857A450|
|afHeadHairKarine|0x16229F12|
|amBodyGothCoat|0xE808F034|
|afHeadHairBangsHighPonyTail|0xEBB1363D|
|amHeadHatMartialArts|0x10B11928|
|auHeadHairShortFro|0x31B41A58|
|afBodyWendalyn|0x32FF6934|
|amHeadHatShakespeare|0x172754F2|
|auBodyBackpack|0x4CF48F41|
|auHeadHairLongLayered|0x5E5E0BB5|
|afHeadHairBee|0xDB272B16|
|amHeadHairSlickBack|0x0562A36E|
|afHeadHatFedoraHeadset|0xADF12CDC|
|auBodySuitBowTie|0x206508D6|
|amHeadHatNewspaperCap|0x21EAEAC7|
|auBodyNoSleevesLongPants|0x0568E523|
|amHeadHairPompadour|0x4C34687C|
|auBodyPirate|0x1F8C55E8|
|auBodyShortPantsShortSleeves|0x6293CA92|
|amBodyChef|0x57CFFD77|
|afBodyShortSkirtBag|0x9E77273B|
|afHeadHairPuffyLayersTiara|0x407405F3|
|amHeadHairSidePart|0x61AB1E17|
|amBodySamurai|0x69E3E1A7|
|amHeadHairShort|0xF67D2839|
|amHeadHatFlipper|0x68592352|
|afBodyFortuneTeller|0x1437614B|
|auBodyShortSleevApronPants|0xA8EC7CF0|
|auHeadHatVisor|0x7FD2FD6D|
|auHeadHairMuseum|0x94F2A3F5|
|amHeadHatBuzzCut|0xAB532E19|
|auBodyShortJacketClosed|0xEAE93C5D|
|afBodyHighPoofSkirt|0x115E90E5|
|auHeadHatHippieBandana|0xA66E30F0|
|afBodySmallWings|0xE042258B|
|afHeadHairStylish|0x6C25C854|
|afHeadHairLayeredBangsMedium|0x30872F06|
|afHeadHatCrumplebottom|0x6A7C3EFC|
|amHeadHatFedora|0x0A0BF0F7|
|auHeadHairDandelion|0x5C211319|
|auBodyNinja|0x1514F851|
|auHeadHairSushi|0x018261BD|
|afHeadHairLongLayered|0x2A45864C|
|afHeadHairLongPonytail|0x22DF72CE|
|auHeadHairVeryShortSpiky|0x5A0C9575|
|afHeadHairObservatory|0x8D6F69F2|
|auBodyBulkySweaterLongPants|0x8637DF43|
|auHeadHairShortCurly|0x5FC9D348|
|auBodyLongPantsLongSleeve|0x86769DAF|
|amHeadHairScientist|0x2344A259|
|auHeadHatBear|0x79DBAB9E|
|amHeadHatCombOver|0x1F0050D9|
|afBodyMini|0x04985945|
|afHeadHairUpdoRibbons|0x37A80FC1|
|amHeadHatBaker|0x3D88B8B3|
|auBodyLabCoat|0xBCC02D91|
|envmapAlpha|0x0A345310|
|door_archedTopBar|0x4A1A7937|

# Material Set
A material set is a list of references to material files.

## Pattern

```cpp
import type.base;

struct ResourceKey {
    type::Hex<u64> instance;
    type::Hex<u32> type;
    type::Hex<u32> group;
};

struct MTST {
    char magic[4];
    u32 version;
    u32 name;
    u32 index;
    u32 count;
    u32 indicies[count];
    padding[4];
};

struct MaterialSet {
    u32 one1;
    u32 one2;
    padding[4];
    u32 materialCount;
    u32 one3;
    ResourceKey selfKey;
    ResourceKey materials[materialCount];
    u32 headerSize;
    u32 mtstSize;
    MTST mtst;
};

MaterialSet materialSet @ $;
```