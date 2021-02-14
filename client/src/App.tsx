import React from 'react';

import { WorkerMessenger, ParentHandshake, Connection } from 'post-me';

import HeaderComponent from './components/header';
import LoaderComponent from './components/loader';
import PitchComponent from './components/pitch';
import { BACKGROUND } from './constants/colors';

interface Props {}
export interface State {
  loading: boolean;
  loaded: boolean;
  stream: MediaStream | undefined;
  detectorName: 'mcleod' | 'autocorrelation';
  windowSize: number;
  clarityThreshold: number;
  workerConnection: Connection | undefined;
}

class App extends React.Component<Props, State> {
  POWER_THRESHOLD = 0.15;

  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      loaded: false,
      stream: undefined,
      detectorName: 'mcleod',
      windowSize: 1024,
      clarityThreshold: 0.6,
      workerConnection: undefined,
    };
  }

  componentDidMount() {
    const worker = new Worker(
      `${process.env.PUBLIC_URL}/pitch-detection/worker.js`
    );

    const messenger = new WorkerMessenger({ worker });

    ParentHandshake(messenger, {}, 5, 1000)
      .then((connection) => {
        this.setState({ workerConnection: connection });
      })
      .catch(() => console.log('Failed connection to worker'));
  }

  onStart = () => {
    this.setState((state) => {
      return { ...state, loading: true };
    });

    const gotStream = (stream: MediaStream) => {
      this.setState((state) => {
        return {
          ...state,
          loading: false,
          loaded: true,
          stream: stream,
        };
      });
    };

    const gotError = (e: any) => {
      console.log(e);
      this.setState((state) => {
        return {
          ...state,
          loading: false,
          loaded: false,
          stream: undefined,
        };
      });
    };

    const options = {
      audio: {
        echoCancellation: true,
        autoGainControl: true,
      },
    };

    navigator.mediaDevices
      .getUserMedia(options)
      .then(gotStream)
      .catch(gotError);
  };

  onStop = () => {
    const { stream } = this.state;
    if (stream) {
      for (let track of stream.getTracks()) {
        track.stop();
      }
    }
    this.setState((state) => {
      return {
        ...state,
        loaded: false,
        stream: undefined,
      };
    });
  };

  onParamChange = <K extends keyof State>(key: K, value: State[K]) => {
    this.setState((state) => {
      return {
        ...state,
        [key]: value,
      };
    });
  };

  render() {
    const {
      detectorName,
      windowSize,
      clarityThreshold,
      loading,
      loaded,
      stream,
      workerConnection,
    } = this.state;
    return (
      <div className="app" style={{ backgroundColor: BACKGROUND }}>
        <HeaderComponent />
        <div className="content-container">
          {!loaded && (
            <LoaderComponent
              detectorName={detectorName}
              windowSize={windowSize}
              clarityThreshold={clarityThreshold}
              onParamChange={this.onParamChange}
              onStart={this.onStart}
              loading={loading}
            />
          )}

          {loaded && stream && workerConnection && (
            <PitchComponent
              stream={stream}
              detectorName={detectorName}
              workerConnection={workerConnection}
              windowSize={windowSize}
              powerThreshold={this.POWER_THRESHOLD}
              clarityThreshold={clarityThreshold}
              onStop={this.onStop}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
