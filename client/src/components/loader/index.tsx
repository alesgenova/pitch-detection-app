import React from 'react';

import {
  BACKGROUND,
  PRIMARY,
  PRIMARY_LIGHT,
  PRIMARY_TEXT,
} from '../../constants/colors';
import { State as AppState } from '../../App';

import PlayIcon from './play.svg';

interface Props {
  detectorName: 'autocorrelation' | 'mcleod';
  loading: boolean;
  windowSize: number;
  clarityThreshold: number;
  onParamChange: <K extends keyof AppState>(key: K, value: AppState[K]) => void;
  onStart: () => void;
}

const Loader: React.FC<Props> = ({
  detectorName,
  windowSize,
  clarityThreshold,
  onParamChange,
  onStart,
  loading,
}) => {
  return (
    <React.Fragment>
      <div className="content" style={{ textAlign: 'center' }}>
        <h2>A Rust + WebAssembly Pitch Detector</h2>
        <h3>Author</h3>
        <span>Alessandro Genova</span>
        <h3>Core Library</h3>
        <span>
          <a
            href="https://github.com/alesgenova/pitch-detection"
            target="_blank"
          >
            Source
          </a>
          <br />
          (rust)
        </span>
        <h3>Demo App</h3>
        <span>
          <a
            href="https://github.com/alesgenova/pitch-detection-app"
            target="_blank"
          >
            Source
          </a>
          <br />
          (wasm, react)
        </span>
        <br />
        <h3>Detector</h3>
        <select
          value={detectorName}
          onChange={(e) => {
            onParamChange('detectorName', e.target.value as any);
          }}
        >
          <option value="mcleod">McLeod</option>
          <option value="autocorrelation">Autocorrelation</option>
        </select>
        <h3>Window Size</h3>
        <select
          value={windowSize}
          onChange={(e) => {
            onParamChange('windowSize', parseInt(e.target.value));
          }}
        >
          <option value={512}>512 samples</option>
          <option value={1024}>1024 samples</option>
          <option value={2048}>2048 samples</option>
          <option value={4096}>4096 samples</option>
        </select>
        <h3>Clarity Threshold</h3>
        <input
          value={clarityThreshold}
          type="range"
          min={0.0}
          max={1.0}
          step={0.01}
          onChange={(e) => {
            onParamChange('clarityThreshold', parseFloat(e.target.value));
          }}
        />
        <br />({clarityThreshold})
      </div>
      <div className="floating-container-center">
        <button
          disabled={loading}
          onClick={onStart}
          className="floating-button-large"
          style={{
            backgroundColor: loading ? PRIMARY_LIGHT : PRIMARY,
            color: PRIMARY_TEXT,
          }}
        >
          <img src={PlayIcon} />
        </button>
      </div>
    </React.Fragment>
  );
};

export default Loader;
