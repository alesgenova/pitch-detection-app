import { Note, NOTE_SYMBOLS_SHARP } from './circle-chat';

export function freqToNote(freq: number): { note: Note; octave: number } {
  const notes = Object.keys(NOTE_SYMBOLS_SHARP) as Note[];
  const logNote = Math.log2(freq) - LOG_A;
  // LOG_A is the log of A_4
  const octave = Math.floor(logNote) + 4;
  const rot = (((logNote - 0.25) % 1) + 1) % 1;
  for (let i = 0; i < 12; i++) {
    const low = i / 12 - 1 / 24;
    const hi = i / 12 + 1 / 24;
    if (rot > low && rot <= hi) {
      return { note: notes[i], octave };
    }
  }
  return { note: 'C', octave };
}

// The log of A_4
const LOG_A = Math.log2(440);

/**
 * Convert a frequency to an angle in radians. The frequency
 * of a "C" is at the top of the circle.
 *
 * @export
 * @param {number} freq
 * @returns {number}
 */
export function freqToAngle(freq: number): number {
  // We subtract 0.5, because A is halfway around the circle chart from 0 deg.
  return ((((Math.log2(freq) - LOG_A - 0.5) % 1) + 1) % 1) * Math.PI * 2;
}

/**
 * Computes the inner and outer radius for the circle chart
 * based on the available size.
 *
 * @param {number} w
 * @param {number} h
 * @returns
 */
export function computeInnerAndOuterRadius(w: number, h: number) {
  const outerR = Math.min(w, h) / 3;
  const innerR = outerR * 0.6;
  return { innerR, outerR };
}

/**
 * Compute the offset from the center of a circle of radius `r` that a box
 * of width/height `w`/`h` needs to have to be tangent to the circle.
 *
 * @param {number} angle - angle in which to compute the displacement
 * @param {number} r - radius of the circle
 * @param {number} w - width of the box
 * @param {number} h - height of the box
 * @returns {[number, number]} - displacement of the lower-left corner of the box to be tangent
 */
export function radialBoxLayoutOffsets(
  angle: number,
  r: number,
  w: number,
  h: number
): [number, number] {
  angle = ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

  // This code was ported from Python. It's just easier to
  // rename the math functions.
  const pi = Math.PI;
  const tan = Math.tan;
  const arctan = Math.atan;
  const sqrt = Math.sqrt;
  const sin = Math.sin;
  const cos = Math.cos;

  let [outx, outy] = [0, 0];

  if (r === 0) {
    return [outx, outy];
  }

  const criticalrange1 = arctan(w / 2.0 / (r + h / 2.0));
  const criticalrange2 = arctan(w / 2.0 / (r + h / 2.0));

  // Edge is touching
  if (angle < 0 + criticalrange1 || angle > 2 * pi - criticalrange1) {
    outx = r;
    outy = -(r + w / 2) * tan(angle) - h / 2.0;
  } else if (angle > pi - criticalrange1 && angle < pi + criticalrange1) {
    outx = -r - w;
    outy = -(r + w / 2) * tan(pi - angle) - h / 2.0;
  } else if (
    angle > pi / 2 - criticalrange2 &&
    angle < pi / 2 + criticalrange2
  ) {
    outx =
      sqrt((w * w) / 4.0 + (r + h / 2.0) * (r + h / 2.0)) *
        sin(pi / 2.0 - angle) -
      w / 2.0;
    outy = -(r + h);
  } else if (
    angle > (pi * 3) / 2 - criticalrange2 &&
    angle < (pi * 3) / 2 + criticalrange2
  ) {
    outx =
      sqrt((w * w) / 4.0 + (r + h / 2.0) * (r + h / 2.0)) *
        sin(pi / 2 - angle) -
      w / 2;
    outy = r;
  }
  // Corner is touching
  else if (angle >= 0 + criticalrange1 && angle <= pi / 2 - criticalrange2) {
    const a = sqrt((w * w) / 4.0 + (h * h) / 4.0);
    const b = r;
    const B = angle - arctan(h / w);
    const c = sqrt(b * b + (cos(B) * cos(B) - 1) * a * a) + cos(B) * a;
    outx = c * cos(angle) - w / 2.0;
    outy = -(c * sin(angle) + h / 2.0);
  } else if (angle >= pi / 2 + criticalrange2 && angle <= pi - criticalrange1) {
    //adjust angle so we can pretend we're in the first quadrant
    angle = pi - angle;
    const a = sqrt((w * w) / 4.0 + (h * h) / 4.0);
    const b = r;
    const B = angle - arctan(h / w);
    const c = sqrt(b * b + (cos(B) * cos(B) - 1) * a * a) + cos(B) * a;
    outx = -(c * cos(angle) - w / 2) - w;
    outy = -(c * sin(angle) + h / 2);
  } else if (
    angle >= pi + criticalrange1 &&
    angle <= (pi * 3) / 2 - criticalrange2
  ) {
    // adjust angle so we can pretend we're in the first quadrant
    angle -= pi;
    const a = sqrt((w * w) / 4 + (h * h) / 4);
    const b = r;
    const B = angle - arctan(h / w);
    const c = sqrt(b * b + (cos(B) * cos(B) - 1) * a * a) + cos(B) * a;
    outx = -c * cos(angle) - w / 2;
    outy = c * sin(angle) - h / 2;
  } else if (
    angle >= (pi * 3) / 2 + criticalrange2 &&
    angle <= 2 * pi - criticalrange1
  ) {
    // adjust angle so we can pretend we're in the first quadrant
    angle = 2 * pi - angle;
    const a = sqrt((w * w) / 4 + (h * h) / 4);
    const b = r;
    const B = angle - arctan(h / w);
    const c = sqrt(b * b + (cos(B) * cos(B) - 1) * a * a) + cos(B) * a;
    outx = c * cos(angle) - w / 2;
    outy = c * sin(angle) - h / 2;
  }

  return [outx, outy];
}
