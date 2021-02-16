export type WorkerMethods = {
  createDetector: (
    name: 'autocorrelation' | 'mcleod',
    size: number,
    padding: number
  ) => void;
  getPitch: (
    signal: Float32Array,
    sampleRate: number,
    powerThreshold: number,
    clarityThreshold: number
  ) => Float32Array;
};
