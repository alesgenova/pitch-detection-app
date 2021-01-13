import React, { Component } from 'react';
import { Connection } from 'post-me';

import { PitchDisplay } from 'pitch-display';

import { BACKGROUND, SECONDARY, SECONDARY_LIGHT, SECONDARY_TEXT, PRIMARY_LIGHT } from '../../constants/colors';
import { WorkerMethods } from '../../../worker/types';
import StopIcon from './stop.svg';

interface Props {
  stream: MediaStream;
  workerConnection: Connection<{}, WorkerMethods, {}>;
  detectorName: 'autocorrelation' | 'mcleod';
  windowSize: number;
  powerThreshold: number;
  clarityThreshold: number;
  onStop: () => void;
}

class PitchComponent extends Component<Props> {
  audioContext?: AudioContext;
  mediaStreamSource?: MediaStreamAudioSourceNode;
  analyser?: AnalyserNode;
  buffer?: Float32Array;
  pending = false;
  quit = false;
  displayElement = React.createRef<HTMLDivElement>();
  pitchDisplay?: PitchDisplay;

  componentDidMount() {
    this.pitchDisplay = new PitchDisplay(this.displayElement.current!, 6000, 5000);
    this.pitchDisplay.setBackgroundColor(BACKGROUND);
    const { stream, workerConnection, detectorName, windowSize } = this.props;
    workerConnection.remoteHandle().call('createDetector', detectorName, windowSize, windowSize / 2).then(() => {
      this.buffer = new Float32Array(windowSize);
      this.audioContext = new AudioContext();
      // Create an AudioNode from the stream.
      this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream);
      // Connect it to the destination.
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = windowSize;
      this.mediaStreamSource.connect(this.analyser);
      window.addEventListener('resize', this.onResize);
      this.mainLoop();
    });
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
    if (this.pitchDisplay) {
      this.pitchDisplay.resize();
    }
  }

  updatePitch() {
    if (!this.pending) {
      this.pending = true;
      const { powerThreshold, clarityThreshold, workerConnection } = this.props;
      const time = (new Date()).getTime();
      this.analyser!.getFloatTimeDomainData(this.buffer!);
      workerConnection.remoteHandle().call('getPitch', this.buffer!, this.audioContext!.sampleRate, powerThreshold, clarityThreshold).then(result => {
        const frequency = result[0];
        const clarity = result[1];
        if (frequency > 0) {
          this.pitchDisplay!.pushFrequency({ frequency, clarity, time });
        }
        this.pending = false;
      })
    }
    this.pitchDisplay!.render(false);
  }

  render() {
    const { onStop } = this.props;
    return (
      <div className="full" style={{ position: 'relative' }}>
        <div className="full" style={{ position: 'relative' }}
          ref={this.displayElement}
        />
        <div className="floating-container">
          <button
            onClick={onStop}
            className="floating-button"
            style={{ backgroundColor: SECONDARY, color: SECONDARY_TEXT }}
          >
            <img src={StopIcon} />
          </button>
        </div>
      </div>
    )
  }
}

export default PitchComponent;
