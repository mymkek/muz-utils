'use client';

import {useEffect, useRef, useState} from "react";
import LinearChart from "@/app/apps/velocity-recorder/velocity-chart/chart";


const dataArray = new Array(1000).fill(0).map(() => Math.random() * 127);

export default function VelocityChart({}) {

    const marks: Array<{
        label: string,
        value: number
    }> = [
        { label: "pppp", value: 1 },
        { label: "ppp", value: 15 },
        { label: "pp", value: 29 },
        { label: "p", value: 43 },
        { label: "mp", value: 57 },
        { label: "mf", value: 71 },
        { label: "f", value: 85 },
        { label: "ff", value: 99 },
        { label: "fff", value: 113 },
        { label: "ffff", value: 127 }
    ];

    return (
        <LinearChart marks={marks} max={127} data={dataArray} min={0}/>
    );
};
