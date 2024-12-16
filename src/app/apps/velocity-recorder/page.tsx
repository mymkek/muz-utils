'use client';

import {useEffect, useState} from "react";
import {LineChart} from "@mui/x-charts";
import VelocityChart from "@/app/apps/velocity-recorder/velocity-chart";


type Data = {
    timeStamp: number;
    bytes: string;
}

export default function VelocityRecorder() {

    useEffect(() => {
        navigator.permissions.query({name: "midi", sysex: true}).then((result) => {
            if (result.state === "granted") {
                console.log("Access granted.")
            } else if (result.state === "prompt") {
                console.log("Using API will prompt for permission")
            } else {
                console.log("Permission was denied by user prompt or permission policy")
            }
        });
    }, []);


    const [record, setRecord] = useState<any[]>([]);
    const [midiAccess, setMidiAccess] = useState<MIDIAccess | null>(null);


    function onMIDIMessage(event: MIDIMessageEvent) {
        if (!event.data) return;

        if(event.data[0] === 144) {
            setRecord(prevState => [...prevState,  event.data[2]]);
        }

    }

    function onMIDISuccess(midiAccess: MIDIAccess) {
        console.log("MIDI ready!", midiAccess);
        for (const entry of midiAccess.inputs) {
            const input = entry[1];
            input.onmidimessage = onMIDIMessage;
            console.log(
                `Input port [type:'${input.type}']` +
                ` id:'${input.id}'` +
                ` manufacturer:'${input.manufacturer}'` +
                ` name:'${input.name}'` +
                ` version:'${input.version}'`,
            );
        }
        setMidiAccess(midiAccess)
    }


    function onMIDIFailure(msg) {
        console.error(`Failed to get MIDI access - ${msg}`);
    }

    useEffect(() => {
        navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    }, []);


    return (
        <div>
            <VelocityChart dataArray={record}/>

        </div>
    );
}
