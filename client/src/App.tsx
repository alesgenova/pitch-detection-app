import React from 'react';

import PitchComponent from './components/pitch';
import { PitchMonitor } from './components/pitch/pitch-monitor';
import { CircleChart } from './components/circle-chart/circle-chat';
import { AppFrame } from './components/main/app-frame';
import { useStoreActions, useStoreState } from './model';
import { About } from './components/main/about';

function App() {
  const POWER_THRESHOLD = 0.15;

  const detectorName = useStoreState((state) => state.detectorName);
  const windowSize = useStoreState((state) => state.windowSize);
  const clarityThreshold = useStoreState((state) => state.clarityThreshold);
  const displayType = useStoreState((state) => state.displayType);
  const enabled = useStoreState((state) => state.enabled);

  const { loaded, stream, workerConnection } = useStoreState((state) => ({
    loaded: state.loaded,
    loading: state.loading,
    stream: state.stream,
    workerConnection: state.workerConnection,
  }));

  const { initializeWorker } = useStoreActions((actions) => actions);

  React.useEffect(() => {
    (async () => {
      await initializeWorker();
      console.log('Worker initialized');
    })();
  }, [initializeWorker]);

  let mainDisplay = <About />;
  if (loaded && stream && workerConnection) {
    const pitchRenderer =
      displayType === 'circle' ? CircleChart : PitchComponent;
    mainDisplay = (
      <PitchMonitor
        stream={stream}
        detectorName={detectorName}
        workerConnection={workerConnection}
        windowSize={windowSize}
        powerThreshold={POWER_THRESHOLD}
        clarityThreshold={clarityThreshold}
        enabled={enabled}
        pitchRenderer={pitchRenderer}
      />
    );
  }

  return <AppFrame>{mainDisplay}</AppFrame>;
}

export default App;
