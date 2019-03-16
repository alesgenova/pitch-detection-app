import React, { Component } from 'react';

import { PitchDisplay } from 'pitch-display';

import { BACKGROUND, SECONDARY, SECONDARY_LIGHT, SECONDARY_TEXT, PRIMARY_LIGHT } from '../../constants/colors';
import StopIcon from './stop.svg';

class PitchComponent extends Component {
  audioContext;
  mediaStreamSource;
  analyser;
  signal;
  detector;
  result;
  buffer;
  quit = false;
  displayElement;
  pitchDisplay;

  componentDidMount() {
    console.log('PitchComponent did mount', PitchDisplay);
    this.pitchDisplay = new PitchDisplay(this.displayElement, 6000, 5000);
    this.pitchDisplay.setBackgroundColor(BACKGROUND);
    const { stream, detectorClass, windowSize } = this.props;
    this.detector = detectorClass.new(windowSize, windowSize / 2);
    this.buffer = new Float32Array( windowSize );
    this.result = new Float32Array(2);
    this.audioContext = new AudioContext();
    // Create an AudioNode from the stream.
    this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream);
    // Connect it to the destination.
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = windowSize;
    this.mediaStreamSource.connect( this.analyser );
    window.addEventListener('resize', this.onResize);
    this.mainLoop();
  }

  componentWillUnmount() {
    console.log('PitchComponent will unmount');
    window.removeEventListener('resize', this.onResize);
    this.quit = true;
  }

  mainLoop = () => {
    if (this.quit) {
      return;
    }
    requestAnimationFrame(this.mainLoop);
    this.updatePitch();
  }

  onResize = () => {
    this.pitchDisplay.resize();
  }

  updatePitch() {
    const { sampleRate, powerThreshold, clarityThreshold } = this.props;
    this.analyser.getFloatTimeDomainData(this.buffer);
    this.detector.get_pitch(this.buffer, sampleRate, powerThreshold, clarityThreshold, this.result);
    const [frequency, clarity] = this.result;
    if (frequency > 0) {
      const time = (new Date()).getTime();
      this.pitchDisplay.pushFrequency({frequency, clarity, time});
    }
    this.pitchDisplay.render(false);
  }

  render() {
    const { onStop } = this.props;
    return (
      <div className="full" style={{position: 'relative'}}>
        <div className="full" style={{position: 'relative'}}
          ref={ref => {this.displayElement = ref;}}
        />
        <div className="floating-container">
          <button
            onClick={onStop}
            className="floating-button"
            style={{backgroundColor: SECONDARY, color: SECONDARY_TEXT}}
          >
            <ion-icon src={StopIcon}/>
          </button>
        </div>
      </div>
    )
  }
}

export default PitchComponent;
