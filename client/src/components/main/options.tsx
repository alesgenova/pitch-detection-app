import React from 'react';
import { Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { useStoreActions, useStoreState } from '../../model';

export function Select({
  selected: _selected,
  onSelect: _onSelect,
  choices,
}: {
  selected?: any;
  onSelect?: Function;
  choices: { value: any; desc: React.ReactNode }[];
}) {
  let [selected, setSelected] = React.useState(_selected);
  if (_selected != null) {
    selected = _selected;
  }
  const selectedIndex = Math.max(
    choices.findIndex((item) => item.value === selected),
    0
  );

  function onSelect(index: any) {
    setSelected(choices[index].value);
    if (_onSelect) {
      _onSelect(choices[index].value);
    }
  }

  return (
    <DropdownButton
      onSelect={onSelect}
      title={choices[selectedIndex].desc}
      variant="outline-light"
      as="span"
    >
      {choices?.map(({ desc }, i) => (
        <Dropdown.Item key={i} eventKey={'' + i}>
          {desc}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

export function SelectWindowSize() {
  const windowSize = useStoreState((state) => state.windowSize);
  const setWindowSize = useStoreActions((actions) => actions.setWindowSize);
  return (
    <Select
      selected={windowSize}
      onSelect={setWindowSize}
      choices={[
        { value: 512, desc: '512 Samples' },
        { value: 1024, desc: '1024 Samples' },
        { value: 2048, desc: '2048 Samples' },
        { value: 4096, desc: '4096 Samples' },
      ]}
    />
  );
}

export function SelectDetector() {
  const detectorName = useStoreState((state) => state.detectorName);
  const setDetectorName = useStoreActions((actions) => actions.setDetectorName);
  return (
    <Select
      selected={detectorName}
      onSelect={setDetectorName}
      choices={[
        { value: 'mcleod', desc: 'McLeod' },
        { value: 'autocorrelation', desc: 'Autocorrelation' },
      ]}
    />
  );
}

export function SelectClarityThreshold() {
  const clarityThreshold = useStoreState((state) => state.clarityThreshold);
  const setClarityThreshold = useStoreActions(
    (actions) => actions.setClarityThreshold
  );

  return (
    <Form>
      <Form.Group>
        <Form.Control
          type="range"
          value={clarityThreshold}
          min={0.0}
          max={1.0}
          step={0.01}
          onChange={(e) => setClarityThreshold(parseFloat(e.target.value))}
        />
      </Form.Group>
    </Form>
  );
}

export function SelectDisplayType() {
  const displayType = useStoreState((state) => state.displayType);
  const setDisplayType = useStoreActions((actions) => actions.setDisplayType);

  return (
    <Select
      selected={displayType}
      onSelect={setDisplayType}
      choices={[
        { value: 'chart', desc: 'Linear Chart' },
        { value: 'circle', desc: 'Circle Chart' },
      ]}
    />
  );
}
