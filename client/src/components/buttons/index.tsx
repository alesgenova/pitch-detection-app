import React from 'react';
import {
  PRIMARY,
  PRIMARY_LIGHT,
  PRIMARY_TEXT,
  SECONDARY,
  SECONDARY_TEXT,
} from '../../constants/colors';
import StopIcon from './stop.svg';
import PlayIcon from './play.svg';

export function StopButton({ onStop }: { onStop: () => void }) {
  return (
    <div className="floating-container">
      <button
        onClick={onStop}
        className="floating-button"
        style={{ backgroundColor: SECONDARY, color: SECONDARY_TEXT }}
      >
        <img src={StopIcon} />
      </button>
    </div>
  );
}

export function StartButton({
  loading,
  onStart,
}: {
  loading: boolean;
  onStart: () => void;
}) {
  return (
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
  );
}
