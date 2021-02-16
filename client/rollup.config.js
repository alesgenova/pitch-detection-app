import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';

export default [
  {
    input: 'worker/index.ts',
    output: [
      {
        file: 'public/pitch-detection/worker.js',
        format: 'cjs',
      },
    ],
    plugins: [
      resolve(),
      typescript({ target: 'es5', declaration: false }),
      getBabelOutputPlugin({ presets: ['@babel/preset-env'] }),
      copy({
        targets: [
          { src: '../wasm/pkg/**.wasm', dest: 'public/pitch-detection' },
        ],
      }),
    ],
  },
];
