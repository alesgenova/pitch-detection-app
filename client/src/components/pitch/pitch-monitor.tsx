import { Connection } from 'post-me';
import React from 'react';
import { WorkerMethods } from '../../../worker/types';

interface PitchSetup {
  analyser?: AnalyserNode;
  audioContext?: AudioContext;
  buffer?: Float32Array;
}
interface PitchProps {
  stream: MediaStream;
  workerConnection: Connection<{}, WorkerMethods, {}>;
  detectorName: 'autocorrelation' | 'mcleod';
  windowSize: number;
  powerThreshold: number;
  clarityThreshold: number;
  enabled: boolean;
  pitchRenderer: React.ComponentType<{
    freq: number | null;
    clarity: number | null;
  }>;
}

/**
 * While `enabled` is truthy, get the pitch from the input source,
 * and pass its frequency and clarity to `pitchRenderer`.
 *
 * `pitchRenderer` should be a react component that accepts `freq` and `clarity`
 * props.
 *
 * @export
 * @param {PitchProps} {
 *   stream,
 *   detectorName,
 *   workerConnection,
 *   windowSize,
 *   powerThreshold,
 *   clarityThreshold,
 *   enabled,
 *   pitchRenderer,
 * }
 * @returns
 */
export function PitchMonitor({
  stream,
  detectorName,
  workerConnection,
  windowSize,
  powerThreshold,
  clarityThreshold,
  enabled,
  pitchRenderer,
}: PitchProps) {
  const [freq, setFreq] = React.useState<number | null>(null);
  const [clarity, setClarity] = React.useState<number | null>(null);
  const pendingRef = React.useRef(false);
  const pitchSetupRef = React.useRef<PitchSetup>({});

  // Gets called first-thing whenever this component's props change.
  const setupConnection = React.useCallback(async () => {
    await workerConnection
      .remoteHandle()
      .call('createDetector', detectorName, windowSize, windowSize / 2);
    const pitchSetup = pitchSetupRef.current;
    pitchSetup.buffer = new Float32Array(windowSize);
    pitchSetup.audioContext = new AudioContext();
    // Create an AudioNode from the stream.
    const mediaStreamSource = pitchSetup.audioContext.createMediaStreamSource(
      stream
    );
    // Connect it to the destination.
    pitchSetup.analyser = pitchSetup.audioContext.createAnalyser();
    pitchSetup.analyser.fftSize = windowSize;
    mediaStreamSource.connect(pitchSetup.analyser);
  }, [pitchSetupRef, windowSize, detectorName, stream, workerConnection]);

  // Find the current pitch/clarity and save it in `freq`/`clarity`.
  const updatePitch = React.useCallback(async () => {
    if (!pendingRef.current) {
      pendingRef.current = true;

      const pitchSetup = pitchSetupRef.current;
      const { analyser, buffer, audioContext } = pitchSetup;
      if (!analyser || !buffer || !audioContext) {
        console.warn(
          'Trying to update the pitch, but missing an analyser/buffer/audioContext'
        );
        return;
      }
      analyser.getFloatTimeDomainData(buffer);
      const result = await workerConnection
        .remoteHandle()
        .call(
          'getPitch',
          buffer,
          audioContext.sampleRate,
          powerThreshold,
          clarityThreshold
        );
      const frequency = result[0];
      const clarity = result[1];
      if (frequency > 0) {
        setFreq(frequency);
        setClarity(clarity);
      } else {
        setFreq(null);
        setClarity(null);
      }

      pendingRef.current = false;
    }
  }, [
    pendingRef,
    pitchSetupRef,
    setFreq,
    setClarity,
    powerThreshold,
    clarityThreshold,
    workerConnection,
  ]);

  // This function only gets called when the dependencies update, and it automatically
  // cleans up when it is called subsequent times. It starts an endless loop
  // of computing the current pitch.
  React.useEffect(() => {
    if (!enabled) {
      // This function runs whenever the state of `enabled` changes.
      // When this function is re-run, it automatically cancels the
      // the audio monitoring, so all we need to do is return here.
      return;
    }
    console.log('Starting audio monitoring.');
    const escape = { cancelRender: false };
    function renderFrame() {
      if (escape.cancelRender) {
        return;
      }
      requestAnimationFrame(renderFrame);
      updatePitch();
    }
    (async () => {
      await setupConnection();
      renderFrame();
    })();

    return () => {
      console.log('Stopping audio monitoring.');
      escape.cancelRender = true;
    };
  }, [setupConnection, updatePitch, enabled]);

  const PitchRenderer = pitchRenderer;
  return <PitchRenderer freq={freq} clarity={clarity} />;
}
