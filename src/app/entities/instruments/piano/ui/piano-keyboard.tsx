"use client"

import {PianoKey} from "@/app/entities/instruments/piano/ui/piano-key";
import {defaultKeyboardMap, KeyData} from "@/app/entities/instruments/piano/model/keyboard-map";



export const PianoKeyboard = () => {

    const handlePlayNote = (data: KeyData) => {
        console.log(data)
    }

    const handleStopNote = (data: KeyData) => {
        console.log(data)
    }

    return (
        <div style={{overflowX: 'auto', maxWidth: '100%'}}>
            <div style={{display: 'flex'}}>
                {defaultKeyboardMap.map(key =>
                    <PianoKey key={key.note + key.octave} keyContent={key.note + key.octave}
                              isNoteAccidental={key.type === "black"} isEnabled={key.enabled} width={50} note={key.note}
                              octave={key.octave} onPlay={handlePlayNote} onStop={handleStopNote}/>
                )}
            </div>
        </div>

    );
};
