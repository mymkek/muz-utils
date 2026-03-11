import { useEffect, useRef } from "react";
import { Beam, Renderer, Stave, StaveNote, Voice, Formatter, FretHandFinger, Modifier, Factory } from "vexflow";

// C major scale, 2 octaves up and back
// Fingering: 1 2 3 1 2 3 4 1 2 3 1 2 3 4 5 4 3 2 1 3 2 1 4 3 2 1 3 2 1
const cMajor2Octaves = [
  { keys: ["c/4"], finger: "1" },
  { keys: ["d/4"], finger: "2" },
  { keys: ["e/4"], finger: "3" },
  { keys: ["f/4"], finger: "1" },
  { keys: ["g/4"], finger: "2" },
  { keys: ["a/4"], finger: "3" },
  { keys: ["b/4"], finger: "4" },
  { keys: ["c/5"], finger: "1" },
  { keys: ["d/5"], finger: "2" },
  { keys: ["e/5"], finger: "3" },
  { keys: ["f/5"], finger: "1" },
  { keys: ["g/5"], finger: "2" },
  { keys: ["a/5"], finger: "3" },
  { keys: ["b/5"], finger: "4" },
  { keys: ["c/6"], finger: "5" },
  { keys: ["b/5"], finger: "4" },
  { keys: ["a/5"], finger: "3" },
  { keys: ["g/5"], finger: "2" },
  { keys: ["f/5"], finger: "1" },
  { keys: ["e/5"], finger: "3" },
  { keys: ["d/5"], finger: "2" },
  { keys: ["c/5"], finger: "1" },
  { keys: ["b/4"], finger: "4" },
  { keys: ["a/4"], finger: "3" },
  { keys: ["g/4"], finger: "2" },
  { keys: ["f/4"], finger: "1" },
  { keys: ["e/4"], finger: "3" },
  { keys: ["d/4"], finger: "2" },
  { keys: ["c/4"], finger: "1" },
];



export function ScaleFingerings() {
  const elementId = 'scores-container'

  useEffect(() => {
    const container = document.getElementById(elementId);
    if (container) container.innerHTML = "";

    const vf = new Factory({
      renderer: {
        elementId,
        width: 700,
        height: 300
      }
    });
    const score = vf.EasyScore();
    const system = vf.System();

    // Create a 4/4 treble stave and add two parallel voices.
    system.addStave({
      voices: [
        score.voice(score.beam(score.notes('C#5/8, B4, A4, G#4, B4, A4, G#4, F6', {stem: 'up'}))),
      ]
    }).addClef('treble');

    system.addStave({
      voices: [
        score.voice(score.notes('C#3/q, B2, A2/8, B2, C#3, D3', {clef: 'bass', stem: 'up'})),
      ]
    }).addClef('bass');

    system.addConnector()
    

    // Draw it!
    vf.draw();

  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold text-neutral-200 mb-3">
        C Major Scale — 2 Octaves — Right Hand Fingerings
      </h2>
      <div
        id={elementId}
        className="w-full rounded-xl border border-neutral-800 bg-white p-4"
      />
    </div>
  );
}
