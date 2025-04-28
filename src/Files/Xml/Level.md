# Level

{{#include ../../includes/MySimsSpecific.md}}

A level is a collection of models with some meta data, like grid size.

## Format
```xml
<?xml version="1.0"?>
<Level>
  <GridInfo>
    <CellSizeX>32</CellSizeX>
    <CellSizeZ>32</CellSizeZ>
    <!-- Player start position -->
    <StartPosX>-6.670966</StartPosX>
    <StartPosZ>-3.140734</StartPosZ>
    <NumCellsX>2</NumCellsX>
    <NumCellsZ>2</NumCellsZ>
    <ModelName>nook_desert_04</ModelName>
  </GridInfo>
  <GridCells>
    <!-- A list of model instances -->
    <Model>2832803049</Model>
    <Model>2832803048</Model>
    <Model>1759182464</Model>
    <Model>1759182465</Model>
  </GridCells>
  <CharacterLightRig>player_lightrig</CharacterLightRig>
</Level>
```