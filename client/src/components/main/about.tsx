import React from 'react';

export function About() {
  return (
    <div className="container">
      <h2>A Rust + WebAssembly Pitch Detector</h2>
      <h3>Authors</h3>
      <span>Alessandro Genova, Jason Siefken</span>
      <h3>Core Library</h3>
      <span>
        <a href="https://github.com/alesgenova/pitch-detection" target="_blank">
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
    </div>
  );
}
