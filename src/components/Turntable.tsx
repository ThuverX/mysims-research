import React, { useState } from "react";
import { ReactImageTurntable } from "react-image-turntable";
import RenderIfVisible from "react-render-if-visible";

const imageNames = [
    "0001.png",
    "0006.png",
    "0011.png",
    "0016.png",
    "0021.png",
    "0026.png",
    "0031.png",
    "0036.png",
    "0041.png",
    "0046.png",
    "0051.png",
    "0056.png",
    "0061.png",
    "0066.png",
    "0071.png",
    "0076.png",
    "0081.png",
    "0086.png",
    "0091.png",
    "0096.png",
].reverse();

export const Turntable = (
    { folder, size, style }: { folder: string; size: number; style: any },
) => {

    return (
        <div className="turntable">
            <RenderIfVisible defaultHeight={size}>
                <ReactImageTurntable
                    style={{
                        height: size + "px",
                        width: size + "px",
                    }}
                    
                    autoRotate={{ disabled: true }}
                    images={imageNames.map((img) => `/img/${folder}/${img}`)}
                />
            </RenderIfVisible>
        </div>
    )
}

export const Grid = ({ children }: { children: any[] }) => (
    <div className="grid">
        {children}
    </div>
)