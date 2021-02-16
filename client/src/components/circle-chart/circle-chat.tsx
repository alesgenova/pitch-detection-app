import React from 'react';
import {
  computeInnerAndOuterRadius,
  freqToAngle,
  freqToNote,
  radialBoxLayoutOffsets,
} from './utils';

export type Note =
  | 'C'
  | 'Db'
  | 'D'
  | 'Eb'
  | 'E'
  | 'F'
  | 'Gb'
  | 'G'
  | 'Ab'
  | 'A'
  | 'Bb'
  | 'B';

export const NOTE_SYMBOLS_SHARP: { [key in Note]: string } = {
  C: 'C',
  Db: 'C♯',
  D: 'D',
  Eb: 'D♯',
  E: 'E',
  F: 'F',
  Gb: 'F♯',
  G: 'G',
  Ab: 'G♯',
  A: 'A',
  Bb: 'A♯',
  B: 'B',
};
export const NOTE_SYMBOLS_FLAT: { [key in Note]: string } = {
  C: 'C',
  Db: 'D♭',
  D: 'D',
  Eb: 'E♭',
  E: 'E',
  F: 'F',
  Gb: 'G♭',
  G: 'G',
  Ab: 'A♭',
  A: 'A',
  Bb: 'B♭',
  B: 'B',
};

export function drawCircleChartBackground(
  ctx: CanvasRenderingContext2D,
  [w, h]: [number, number],
  options: {
    innerR?: number;
    outerR?: number;
  } = {}
) {
  const offsetAngle = 0;
  const [cX, cY] = [w / 2, h / 2];
  const outerR = options.outerR ?? Math.min(w, h) / 3;
  const innerR = options.innerR ?? outerR * 0.6;

  const ring = new Path2D();
  ring.arc(cX, cY, outerR, 0, 2 * Math.PI);
  // If we don't move to the start of the next arc, there
  // will be a line connecting them.
  ring.moveTo(cX + innerR, cY);
  ring.arc(cX, cY, innerR, 0, 2 * Math.PI);
  ctx.fillStyle = 'rgb(204,204,240)';
  ctx.fill(ring, 'evenodd');

  ctx.strokeStyle = 'rgb(110,102,102)';

  // draw some ticks
  const ticks = new Path2D();
  for (let i = 0; i < 5 * 12; i++) {
    const angle = (i / (5 * 12)) * 2 * Math.PI - offsetAngle;
    let tickLen = 0.5;
    if (i % 5 === 0) {
      // Every fifth tick is long
      tickLen = 1.0;
    }
    const vecX = Math.cos(angle);
    const vecY = Math.sin(angle);
    ticks.moveTo(vecX * outerR + cX, vecY * outerR + cY);
    ticks.lineTo(
      vecX * (1 - 0.08 * tickLen) * outerR + cX,
      vecY * (1 - 0.08 * tickLen) * outerR + cY
    );
  }
  ctx.lineWidth = 2;
  ctx.stroke(ticks);

  ctx.lineWidth = 1;
  ctx.stroke(ring);

  return { innerR, outerR };
}

function drawCircleChartArrow(
  ctx: CanvasRenderingContext2D,
  [w, h]: [number, number],
  options: {
    angle: number;
    opacity: number;
    innerR: number;
    outerR: number;
  }
) {
  const { angle, opacity, innerR, outerR } = options;
  const [vec_x, vec_y] = [Math.cos(angle), Math.sin(angle)];
  // Compute the normal vector
  const [nvec_x, nvec_y] = [-vec_y, vec_x];

  ctx.moveTo(
    vec_x * innerR + 3 * nvec_x + w / 2,
    -(vec_y * innerR + 3 * nvec_y) + h / 2
  );
  ctx.lineTo(
    vec_x * innerR - 3 * nvec_x + w / 2,
    -(vec_y * innerR - 3 * nvec_y) + h / 2
  );
  ctx.lineTo(vec_x * outerR + w / 2, -(vec_y * outerR) + h / 2);

  ctx.fillStyle = `rgba(0,128,204,${opacity})`;
  ctx.fill();
  ctx.strokeStyle = `rgba(0,77,204,${opacity})`;
  ctx.lineJoin = 'bevel';
  ctx.stroke();
}

function Frequency({
  hz,
  noteFormat,
}: {
  hz: number;
  noteFormat: 'sharp' | 'flat';
}) {
  const noteSymbols =
    noteFormat === 'sharp' ? NOTE_SYMBOLS_SHARP : NOTE_SYMBOLS_FLAT;
  const { note, octave } = freqToNote(hz);
  return (
    <div className="freq-container">
      <span className="freq-note">
        {noteSymbols[note]}
        <span className="freq-octave">{octave}</span>
      </span>
      <span className="freq-hz">{Math.round(hz)} Hz</span>
    </div>
  );
}

const CircleChartBackground = React.memo(function CircleChartBackground({
  w,
  h,
  noteFormat = 'sharp',
}: {
  w: number;
  h: number;
  noteFormat?: 'sharp' | 'flat';
}) {
  const canvas = React.useRef<HTMLCanvasElement>(null);
  // The note labels are rendered in divs so we can use CSS to style them.
  // We need to store refs to all these divs so we can dynamically compute their
  // sizes.
  const noteRefs = React.useRef<React.RefObject<HTMLDivElement>[]>([
    { current: null },
    { current: null },
    { current: null },
    { current: null },
    { current: null },
    { current: null },
    { current: null },
    { current: null },
    { current: null },
    { current: null },
    { current: null },
    { current: null },
  ]);
  const offsetAngle = 0;
  const [cX, cY] = [w / 2, h / 2];
  const outerR = Math.min(w, h) / 3;
  const innerR = outerR * 0.6;

  const noteSymbols =
    noteFormat === 'sharp' ? NOTE_SYMBOLS_SHARP : NOTE_SYMBOLS_FLAT;
  const notes = Object.keys(noteSymbols) as Note[];

  React.useEffect(() => {
    const ctx = canvas.current?.getContext('2d');
    if (!ctx) {
      return;
    }

    drawCircleChartBackground(ctx, [w, h], { innerR, outerR });
    // Position all the labels
    for (let i = 0; i < 12; i++) {
      const angle = (-i / 12.0) * 2 * Math.PI + Math.PI / 2 + offsetAngle;
      const ref = noteRefs.current[i];
      if (!ref.current) {
        continue;
      }
      const div = ref.current;
      const { width: divW, height: divH } = div.getBoundingClientRect();
      const [ox, oy] = radialBoxLayoutOffsets(angle, outerR + 4, divW, divH);
      div.style.left = `${ox + cX}px`;
      div.style.top = `${oy + cY}px`;
    }
  }, [w, h, noteFormat, cX, cY, innerR, outerR, offsetAngle]);

  return (
    <React.Fragment>
      <canvas width={w} height={h} ref={canvas} className="freq-background" />
      {noteRefs.current.map((ref, i) => (
        <div key={i} ref={ref} className="freq-note-label">
          {noteSymbols[notes[i]]}
        </div>
      ))}
    </React.Fragment>
  );
});

export function CircleChart({
  freq = 440,
  clarity = 0,
}: {
  freq: number | null;
  clarity: number | null;
}) {
  const [w, setW] = React.useState(400);
  const [h, setH] = React.useState(400);
  const surroundingDivRef = React.useRef<HTMLDivElement>(null);
  const canvasPointerRef = React.useRef<HTMLCanvasElement>(null);
  const { innerR, outerR } = computeInnerAndOuterRadius(w, h);
  const angle = freqToAngle(freq || 440);

  // Track resize changes and make sure to resize the circle chart accordingly
  React.useLayoutEffect(() => {
    function handleResize() {
      const div = surroundingDivRef.current;
      if (!div) {
        return;
      }
      const { width, height } = div.getBoundingClientRect();
      setW(width);
      setH(height);
    }
    // Run the resizer once when the component mounts.
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setW, setH, surroundingDivRef]);

  React.useEffect(() => {
    if (!canvasPointerRef.current) {
      return;
    }
    const pointerContext = canvasPointerRef.current.getContext('2d');
    if (!pointerContext) {
      return;
    }

    //Our draw come here
    drawCircleChartArrow(pointerContext, [w, h], {
      angle: 0,
      opacity: 0.8,
      innerR,
      outerR,
    });
  }, [w, h, innerR, outerR]);

  return (
    <div ref={surroundingDivRef} className="freq-surround">
      <CircleChartBackground w={w} h={h} noteFormat="sharp" />
      {freq && <Frequency hz={freq || 440} noteFormat="sharp" />}
      <canvas
        className="freq-pointer"
        width={w}
        height={h}
        ref={canvasPointerRef}
        style={{
          transformOrigin: 'center',
          transform: `rotate(${angle}rad)`,
          visibility: freq ? 'visible' : 'hidden',
        }}
      />
    </div>
  );
}
