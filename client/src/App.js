import React, { Component, Fragment } from 'react';
import './App.css';

import { AutocorrelationDetector, McLeodDetector } from 'pitch-detection-wasm';

import HeaderComponent from './components/header';
import LoaderComponent from './components/loader';
import PitchComponent from './components/pitch';

function getDetectorClass(name) {
  switch(name) {
    case 'autocorrelation': {
      return AutocorrelationDetector;
    }

    case 'mcleod': {
      return McLeodDetector;
    }

    default: {
      return McLeodDetector;
    }
  }
}

class App extends Component {
  POWER_THRESHOLD = 0.15;

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loaded: false,
      stream: null,
      detectorName: 'mcleod',
      sampleRate: 44100,
      windowSize: 1024,
      clarityThreshold: 0.6
    }
  }

  onStart = () => {
    this.setState(state => {
      state.loading = true;
      return state;
    });

    const gotStream = (stream) => {
      this.setState(state => {
        state.loading = false;
        state.loaded = true;
        state.stream = stream;
        return state;
      });
    }

    const gotError = (e) => {
      console.log(e);
      this.setState(state => {
        state.loading = false;
        state.stream = null;
        return state;
      });
    }

    const options = {
      audio: {
        echoCancellation: true,
        autoGainControl: true,
        sampleRate: this.SAMPLE_RATE
      }
    }

    navigator.mediaDevices.getUserMedia(options )
      .then(gotStream)
      .catch(gotError);
  }

  onStop = () => {
    const { stream } = this.state;
    if (stream) {
      for (let track of stream.getTracks()) {
        track.stop();
      }
    }
    this.setState(state => {
      state.loaded = false;
      state.stream = null;
      return state;
    })
  }

  onParamChange = (key, value) => {
    this.setState(state => {
      state[key] = value;
      return state;
    })
  }

  render() {
    const {
      detectorName,
      sampleRate,
      windowSize,
      clarityThreshold,
      loading,
      loaded,
      stream
    } = this.state;
    return (
      <div className="app">
        <HeaderComponent />

        <div className="content-container">
          
          {!loaded &&
          <LoaderComponent
            detectorName={detectorName}
            sampleRate={sampleRate}
            windowSize={windowSize}
            clarityThreshold={clarityThreshold}
            onParamChange={this.onParamChange}
            onStart={this.onStart}
            loading={loading}
          />
          }

          {loaded &&
          <PitchComponent
            stream={stream}
            detectorClass={getDetectorClass(detectorName)}
            sampleRate={sampleRate}
            windowSize={windowSize}
            powerThreshold={this.POWER_THRESHOLD}
            clarityThreshold={clarityThreshold}
            onStop={this.onStop}
          />        
          }
        
        </div>
      </div>
    );
  }
}

export default App;
