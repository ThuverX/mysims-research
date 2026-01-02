# Apt

> Apt is a complicated format, all documentation will focus on MySims Cozy Bundle version of these files, they are **NOT** compatible with: MySims (2010), Command & Conquer or any other EA game

Apt is the UI system used in MySims (2010), MySims Cozy Bundle and MySims Kingdom Cozy Bundle, it is based on [Adobe Flash](https://en.wikipedia.org/wiki/Adobe_Flash).

## Parts

Apt is split up in 3 file types:

|Name|Magic|Extension|Purpose|
|-|-|-|-|
|[Big](Big)|`BIGF`|.big|Archive format that holds all other `.apt` UI files.|
|[Apt](Apt)|`Apt Data`|.apt|Main file format, holds element description, import export references and action script code.|
|[Const](Const)|`Apt Constant File`|.const|Contains a list of constants used in the `.apt` file.|
|[Geo](Geo)|`Apt PCGL geometry File`|.geo|Contains 2d vertices used to draw the `.apt` element on.|