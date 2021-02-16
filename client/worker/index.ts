import init, {
  AutocorrelationDetector,
  McLeodDetector,
} from 'pitch-detection-wasm';
import { WorkerMessenger, ChildHandshake } from 'post-me';
import 'regenerator-runtime';

import { WorkerMethods } from './types';

init('./pitch_detection_wasm_bg.wasm').then(() => {
  const messenger = new WorkerMessenger({ worker: self as any });

  let detector:
    | AutocorrelationDetector
    | McLeodDetector
    | undefined = undefined;

  const methods: WorkerMethods = {
    createDetector: (name, size, padding) => {
      if (detector) {
        detector.free();
        detector = undefined;
      }
      switch (name) {
        case 'autocorrelation': {
          detector = AutocorrelationDetector.new(size, padding);
          break;
        }
        case 'mcleod': {
          detector = McLeodDetector.new(size, padding);
          break;
        }
        default: {
          throw new Error(`Detector type not recognized: ${name}`);
        }
      }
    },

    getPitch: (signal, sampleRate, powerThreshold, clarityThreshold) => {
      if (!detector) {
        throw new Error(`Detector not initialized`);
      }

      let result = new Float32Array(2);
      detector.get_pitch(
        signal,
        sampleRate,
        powerThreshold,
        clarityThreshold,
        result
      );

      return result;
    },
  };

  ChildHandshake(messenger, methods);
});
