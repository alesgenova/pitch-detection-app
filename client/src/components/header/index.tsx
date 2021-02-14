import React from 'react';

import { PRIMARY, PRIMARY_TEXT } from '../../constants/colors';

interface Props {}

const Header: React.FC<Props> = (props) => {
  return (
    <div
      className="header"
      style={{ backgroundColor: PRIMARY, color: PRIMARY_TEXT }}
    >
      Pitch Detector
    </div>
  );
};

export default Header;
