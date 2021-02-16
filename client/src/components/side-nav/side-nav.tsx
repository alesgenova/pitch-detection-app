import React from 'react';

import './side-nav.css';
import 'hamburgers/dist/hamburgers.min.css';

const SideNavContext = React.createContext({
  expanded: false,
  toggleExpanded: () => {},
});

function _SideNav({
  expanded: _expanded,
  onToggle,
  children,
}: {
  expanded?: boolean;
  onToggle?: Function;
  children?: React.ReactNode;
}) {
  // We use built-in state unless a managed state is passed in.
  let [expanded, setExpanded] = React.useState(_expanded || false);
  if (_expanded != null) {
    expanded = _expanded;
  }
  function toggleExpanded() {
    setExpanded(!expanded);
    if (onToggle) {
      onToggle(!expanded);
    }
  }

  return (
    <SideNavContext.Provider value={{ expanded, toggleExpanded }}>
      <nav className={`sidenav ${expanded ? 'expanded' : ''}`}>{children}</nav>
    </SideNavContext.Provider>
  );
}

export function Toggle() {
  const { expanded, toggleExpanded } = React.useContext(SideNavContext);
  return (
    <div className="sidenav-toggle">
      <button
        className={`hamburger hamburger--squeeze ${
          expanded ? 'is-active' : ''
        }`}
        type="button"
        aria-label="Menu"
        aria-controls="navigation"
        onClick={toggleExpanded}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
    </div>
  );
}

export function Nav({ children }: { children: React.ReactNode }) {
  return <div className="sidenav-nav">{children}</div>;
}

export function NavItem({
  children,
  ...rest
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  let { className, ..._rest } = rest;
  className = 'sidenav-item ' + (className ? className : '');
  return (
    <div className={className} {..._rest}>
      {children}
    </div>
  );
}

export function NavIcon({ children }: { children: React.ReactNode }) {
  return <button className="sidenav-icon">{children}</button>;
}
export function NavText({ children }: { children: React.ReactNode }) {
  return <div className="sidenav-text">{children}</div>;
}
export function NavExtra({ children }: { children: React.ReactNode }) {
  return <div className="sidenav-extra">{children}</div>;
}

export const SideNav = Object.assign(_SideNav, {
  Nav,
  NavItem,
  NavIcon,
  NavText,
  NavExtra,
});
