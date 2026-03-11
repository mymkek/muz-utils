import { useEffect, useRef } from "react";
import { Renderer, Stave, StaveNote, Beam, Formatter, FretHandFinger, Modifier, Fraction, StaveConnector, Voice } from "vexflow";

// C major scale, 2 octaves — RH up C4→C6→C4, LH down C4→C2→C4
export const cMajor2Octaves = {
  right: [
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
  ],
  left: [
    { keys: ["c/4"], finger: "5" },
    { keys: ["b/3"], finger: "4" },
    { keys: ["a/3"], finger: "3" },
    { keys: ["g/3"], finger: "2" },
    { keys: ["f/3"], finger: "1" },
    { keys: ["e/3"], finger: "3" },
    { keys: ["d/3"], finger: "2" },
    { keys: ["c/3"], finger: "1" },
    { keys: ["b/2"], finger: "4" },
    { keys: ["a/2"], finger: "3" },
    { keys: ["g/2"], finger: "2" },
    { keys: ["f/2"], finger: "1" },
    { keys: ["e/2"], finger: "3" },
    { keys: ["d/2"], finger: "2" },
    { keys: ["c/2"], finger: "1" },
    { keys: ["d/2"], finger: "2" },
    { keys: ["e/2"], finger: "3" },
    { keys: ["f/2"], finger: "1" },
    { keys: ["g/2"], finger: "2" },
    { keys: ["a/2"], finger: "3" },
    { keys: ["b/2"], finger: "4" },
    { keys: ["c/3"], finger: "1" },
    { keys: ["d/3"], finger: "2" },
    { keys: ["e/3"], finger: "3" },
    { keys: ["f/3"], finger: "1" },
    { keys: ["g/3"], finger: "2" },
    { keys: ["a/3"], finger: "3" },
    { keys: ["b/3"], finger: "4" },
    { keys: ["c/4"], finger: "5" },
  ],
};

function makeNotes(data, stemDir, fingerPos) {
  return data.map(({ keys, finger }) => {
    const note = new StaveNote({ keys, duration: "8", stem_direction: stemDir });
    const fingerMod = new FretHandFinger(finger);
    fingerMod.setPosition(fingerPos);
    note.addModifier(fingerMod, 0);
    return note;
  });
}

export function ScaleFingerings({ scaleData = cMajor2Octaves }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";

    const rhNotes = makeNotes(scaleData.right, 1, Modifier.Position.ABOVE);
    const lhNotes = makeNotes(scaleData.left, -1, Modifier.Position.BELOW);

    const noteCount = Math.max(scaleData.right.length, scaleData.left.length);
    const staveWidth = noteCount * 28 + 80;
    const totalWidth = staveWidth + 30;
    const totalHeight = 300;

    const renderer = new Renderer(container, Renderer.Backends.SVG);
    renderer.resize(totalWidth, totalHeight);
    const ctx = renderer.getContext();

    const trebleStave = new Stave(20, 60, staveWidth).addClef("treble");
    trebleStave.setContext(ctx).draw();

    const bassStave = new Stave(20, 175, staveWidth).addClef("bass");
    bassStave.setContext(ctx).draw();

    new StaveConnector(trebleStave, bassStave)
      .setType(StaveConnector.type.BRACE)
      .setContext(ctx)
      .draw();

    new StaveConnector(trebleStave, bassStave)
      .setType(StaveConnector.type.SINGLE_LEFT)
      .setContext(ctx)
      .draw();

    // Beams must be created BEFORE draw so flags are removed from notes
    const beamOpts = { groups: [new Fraction(4, 8)] };
    const beams = [
      ...Beam.generateBeams(rhNotes, beamOpts),
      ...Beam.generateBeams(lhNotes, beamOpts),
    ];

    const rhVoice = new Voice({ num_beats: 4, beat_value: 4 }).setStrict(false);
    rhVoice.addTickables(rhNotes);

    const lhVoice = new Voice({ num_beats: 4, beat_value: 4 }).setStrict(false);
    lhVoice.addTickables(lhNotes);

    new Formatter()
      .joinVoices([rhVoice])
      .joinVoices([lhVoice])
      .format([rhVoice, lhVoice], staveWidth - 50);

    rhVoice.draw(ctx, trebleStave);
    lhVoice.draw(ctx, bassStave);

    beams.forEach((b) => b.setContext(ctx).draw());
  }, [scaleData]);

  return (
    <div>
      <h2 className="text-lg font-semibold text-neutral-200 mb-3">
        C Major Scale — 2 Octaves — Both Hands Fingerings
      </h2>
      <div
        ref={containerRef}
        className="w-full rounded-xl border border-neutral-800 bg-white p-4 overflow-x-auto"
      />
    </div>
  );
}
