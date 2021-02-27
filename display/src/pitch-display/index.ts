import { scaleLinear, ScaleLinear } from 'd3-scale';

import { NOTE_STRINGS } from '../constants';

import { noteFromPitch, colorFromNote, centsOffFromPitch} from '../utils';

interface IFrequency {
  frequency: number;
  clarity: number;
  time: number;
}

class PitchDisplay {
  scaleX: ScaleLinear<number, number>;
  scaleY: ScaleLinear<number, number>;
  now: number; // Time at the last call to render()
  container: HTMLElement;
  bgCanvas: HTMLCanvasElement;
  noteCanvas: HTMLCanvasElement;
  bgContext: CanvasRenderingContext2D;
  noteContext: CanvasRenderingContext2D;
  timeSpan: number;
  timeOffset: number;
  frequencies: IFrequency[] = [];
  background: string = '#efefef';
  highlight: string = '#888888';

  constructor(container: HTMLElement, timeSpan: number = 15000, timeOffset = 7000) {
    this.container = container;

    this.container.style.position = "relative";
    const canvasStyle = "position: absolute; width: 100%; height: 100%;";
    this.bgCanvas = document.createElement("canvas");
    this.bgCanvas.setAttribute("style", canvasStyle);
    this.bgContext = this.bgCanvas.getContext('2d');

    this.noteCanvas = document.createElement("canvas");
    this.noteCanvas.setAttribute("style", canvasStyle);
    this.noteContext = this.noteCanvas.getContext('2d');
    
    this.container.appendChild(this.bgCanvas);
    this.container.appendChild(this.noteCanvas);

    this.timeSpan = timeSpan;
    this.timeOffset = timeOffset;

    this.resize();
  }

  resize() {
    let w = this.container.clientWidth;
    let h = this.container.clientHeight;

    this.bgCanvas.width = w;
    this.bgCanvas.height = h;
    this.noteCanvas.width = w;
    this.noteCanvas.height = h;

    this.scaleX = scaleLinear()
      .domain([-this.timeOffset, -this.timeOffset + this.timeSpan])
      .range([0, w]);

    let margin = h / (NOTE_STRINGS.length + 1);
    this.scaleY = scaleLinear()
      .domain([0, NOTE_STRINGS.length - 1])
      .range([h - margin, margin]);

    this.render();
  }

  pushFrequency(frequency: IFrequency) {
    this.frequencies.push(frequency);
  }

  cleanupFrequencies() {
    // Throw away the frequencies that are out of the current display window
    this.frequencies = this.frequencies.filter((val) => this.now - val.time < this.timeOffset);
  }

  render(full: boolean = true) {
    this.now = (new Date()).getTime();
    this.cleanupFrequencies();
    if (full) {
      this.drawBackground();
    }
    this.drawNotes();
  }

  setBackgroundColor(color: string) {
    this.background = color;
    this.drawBackground();
  }

  setHighlightColor(color: string) {
    this.highlight = color;
    this.drawBackground();
  }

  drawBackground() {
    let w = this.bgCanvas.width;
    let h = this.bgCanvas.height;
    this.bgContext.fillStyle = this.background;
    this.bgContext.clearRect(0, 0, w, h);
    this.bgContext.fillRect(0, 0, w, h);

    for (let i = 0; i < NOTE_STRINGS.length; ++i) {
      let y = this.scaleY(i);
      this.bgContext.fillStyle = this.highlight + '55';
      this.bgContext.fillRect(0, y, w, 1);
      this.bgContext.fillStyle = this.highlight;
      this.bgContext.font = '14px Sans'
      this.bgContext.fillText(NOTE_STRINGS[i], this.scaleX(0) + 20, y - 2);
      this.bgContext.fillText(NOTE_STRINGS[i], 20, y - 2);
    }

    this.bgContext.fillStyle = this.highlight + '55';
    this.bgContext.fillRect(this.scaleX(0), 0, 1, h);
  }

  drawNotes() {
    let w = this.noteCanvas.width;
    let h = this.noteCanvas.height;
    
    this.noteContext.clearRect(0, 0, w, h);
    this.noteContext.beginPath();
    this.noteContext.strokeStyle = 'rgba(0, 0, 0, 0.1)';

    // Calculate notes and colors from frequencies
    const notes = [];
    for (let frequency of this.frequencies) {
      let t: number = frequency.time;
      let f: number = frequency.frequency;
      let c: number = frequency.clarity;
      let note = noteFromPitch(f);
      let centsOff = centsOffFromPitch(f, note);
      let x = this.scaleX(t - this.now);
      let y = this.scaleY(note % 12 + centsOff / 100);
      let color = colorFromNote(note);
      notes.push({
        time: t,
        x,
        y,
        clarity: c,
        color
      })
    }

    // Draw lines
    const timeCutoff = 500;
    this.noteContext.beginPath();
    for (let i = 1; i < notes.length; ++i) {
      const {x, y, time} = notes[i];
      const prevTime = notes[i - 1].time;
      if (time - prevTime > timeCutoff) {
        this.noteContext.stroke();
        this.noteContext.beginPath();
        this.noteContext.moveTo(x, y);
      } else {
        this.noteContext.lineTo(x, y);
      }
    }
    this.noteContext.stroke();

    // Draw circles
    for (let note of notes) {
      const {x, y, clarity, color} = note;
      this.noteContext.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${clarity * 0.5})`;
      this.noteContext.beginPath();
      this.noteContext.arc(x, y, 3, 0, Math.PI * 2);
      this.noteContext.fill();
    }
  }
}

export { PitchDisplay }
