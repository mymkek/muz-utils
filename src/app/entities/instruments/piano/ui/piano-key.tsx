import {Note} from "@/app/shared/lib/common-types";
import {KeyData} from "@/app/entities/instruments/piano/model/keyboard-map";

type PianoKeyProps = {
    note: Note;
    octave: number;
    color?: string;
    keyContent?: string;
    isNoteAccidental: boolean;
    isEnabled: boolean;
    width: number;
    onPlay: (data: KeyData) => void;
    onStop: (data: KeyData) => void;
}

export const PianoKey = ({
                             keyContent,
                             color,
                             isNoteAccidental,
                             isEnabled,
                             width,
                             note,
                             octave,
                             onStop,
                             onPlay
                         }: PianoKeyProps) => {

    function handleMouseEnter(event) {
        if (event.buttons) {
            const dataset = {
                note: event.target.dataset.note,
                octave: event.target.dataset.octave
            };
            onPlay(dataset)
        }
    }

    const startPlayingNote = (event) => {
        const dataset = {
            note: event.target.dataset.note,
            octave: event.target.dataset.octave
        };
        onPlay(dataset)
    }

    const stopPlayingNote = (event) => {
        const dataset = {
            note: event.target.dataset.note,
            octave: event.target.dataset.octave
        };
        onStop(dataset)
    }

    const eventHandlers = {
        onMouseDown: startPlayingNote,
        onMouseEnter: handleMouseEnter,
        onTouchStart: startPlayingNote,
        onMouseUp: stopPlayingNote,
        //onMouseOut: stopPlayingNote,
        onTouchEnd: stopPlayingNote,
    };


    const AccidentalKey = () => {
        const backgroundColor = (isEnabled && color) ? color : 'black';
        return (
            <div style={{position: 'relative'}}>
                <button data-note={note} data-octave={octave} {...eventHandlers} style={{
                    height: 120,
                    width: width * 0.8,
                    marginLeft: -width * 0.8 * 0.5,
                    backgroundColor: backgroundColor,
                    position: 'absolute'
                }}>
                    {keyContent}
                </button>
            </div>
        );
    }

    const NaturalKey = () => {
        const backgroundColor = (isEnabled && color) ? color : 'white';
        return (
            <div>
                <button data-note={note} data-octave={octave} {...eventHandlers} style={{
                    height: 200,
                    width: width,
                    backgroundColor: backgroundColor,
                }}>
                    {keyContent}
                </button>
            </div>
        );
    }

    const KeyComponent = isNoteAccidental ? AccidentalKey : NaturalKey;

    return <KeyComponent/>;
};
