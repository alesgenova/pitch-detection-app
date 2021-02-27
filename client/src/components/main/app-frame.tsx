import React from 'react';
import { ListGroup, Navbar } from 'react-bootstrap';
import { Gear, Lightbulb, Play, Stop } from 'react-bootstrap-icons';
import { useStoreActions, useStoreState } from '../../model';
import {
  NavIcon,
  NavItem,
  NavText,
  NavExtra,
  SideNav,
  Toggle,
} from '../side-nav/side-nav';
import {
  SelectClarityThreshold,
  SelectDetector,
  SelectDisplayType,
  SelectWindowSize,
} from './options';

export function AppFrame({ children }: { children: React.ReactNode }) {
  const [menuExpanded, setMenuExpanded] = React.useState(false);
  const [running, setRunning] = React.useState(false);
  const clarityThreshold = useStoreState((state) => state.clarityThreshold);

  const { initializeStream, stopStream, setEnabled } = useStoreActions(
    (actions) => actions
  );

  React.useEffect(() => {
    if (running) {
      (async () => {
        await initializeStream();
        setEnabled(true);
        console.log('Stream Initialized');
      })();
    } else {
      (async () => {
        setEnabled(false);
        await stopStream();
        console.log('Stream Stopped');
      })();
    }

    return stopStream;
  }, [initializeStream, running, setEnabled, stopStream]);

  return (
    <React.Fragment>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand>Pitch Detector</Navbar.Brand>
      </Navbar>
      <div className="main-container">
        <SideNav expanded={menuExpanded} onToggle={setMenuExpanded}>
          <Toggle />
          <SideNav.Nav>
            <NavItem
              className={running ? 'active' : ''}
              onClick={() => {
                setRunning(!running);
              }}
            >
              {running ? (
                <React.Fragment>
                  <NavIcon>
                    <Stop size="20" />
                  </NavIcon>
                  <NavText>Stop</NavText>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <NavIcon>
                    <Play size="20" />
                  </NavIcon>
                  <NavText>Start</NavText>
                </React.Fragment>
              )}
            </NavItem>
            <NavItem
              onClick={() => {
                setMenuExpanded(!menuExpanded);
              }}
            >
              <NavIcon>
                <Gear size="20" />
              </NavIcon>
              <NavText>Settings</NavText>
            </NavItem>
            <NavExtra>
              <ListGroup variant="flush" color="primary">
                <ListGroup.Item>
                  <div className="setting">
                    <span className="setting-desc">Window Size</span>
                    <SelectWindowSize />
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="setting">
                    <span className="setting-desc">Detector</span>
                    <SelectDetector />
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="setting">
                    <span className="setting-desc">
                      Clarity Threshold ({clarityThreshold})
                    </span>
                    <SelectClarityThreshold />
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="setting">
                    <span className="setting-desc">Display Type</span>
                  </div>
                  <SelectDisplayType />
                </ListGroup.Item>
              </ListGroup>
            </NavExtra>
            <NavItem
              className={'mt-auto' + (running ? '' : ' active')}
              onClick={() => {
                // The about screen automatically shows when the app is not running,
                // so this is a shortcut to show the about screen
                setRunning(false);
              }}
            >
              <NavIcon>
                <Lightbulb size="20" />
              </NavIcon>
              <NavText>About</NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>

        <main role="main">{children}</main>
      </div>
    </React.Fragment>
  );
}
