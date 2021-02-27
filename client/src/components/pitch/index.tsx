import React, { Component } from 'react';

import { PitchDisplay } from 'pitch-display';

import { BACKGROUND } from '../../constants/colors';

export interface PitchProps {
  freq: number | null;
  clarity: number | null;
}

class PitchComponent extends Component<PitchProps> {
  displayElement = React.createRef<HTMLDivElement>();
  pitchDisplay?: PitchDisplay;
  lastRender: number = 0;
  continuousUpdate: boolean = true;

  componentDidMount() {
    this.pitchDisplay = new PitchDisplay(
      this.displayElement.current!,
      6000,
      5000
    );
    this.pitchDisplay.setBackgroundColor(BACKGROUND);

    // We want to ensure `pitchDisplay` updates at regular
    // time intervals even if the note has not changed (so
    // that the display continues scrolling)
    const startRender = () => {
      this.updatePitch();
      if (this.continuousUpdate) {
        requestAnimationFrame(startRender);
      }
    };
    startRender();
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    this.continuousUpdate = false;
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    if (this.pitchDisplay) {
      this.pitchDisplay.resize();
    }
  };

  updatePitch() {
    const time = new Date().getTime();
    if (time - this.lastRender < 17) {
      // We don't want to render faster than 60fps
      return;
    }
    if (!this.pitchDisplay) {
      return;
    }
    const { freq, clarity } = this.props;
    if (freq && freq > 0) {
      this.pitchDisplay.pushFrequency({
        frequency: freq,
        clarity: clarity || 0,
        time,
      });
    }
    this.lastRender = time;
    this.pitchDisplay.render(false);
  }

  render() {
    this.updatePitch();
    return (
      <React.Fragment>
        <div
          className="full"
          style={{ position: 'relative' }}
          ref={this.displayElement}
        />
      </React.Fragment>
    );
  }
}

export default PitchComponent;
