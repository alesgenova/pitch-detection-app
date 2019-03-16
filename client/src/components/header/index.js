import React from 'react';

import { PRIMARY, PRIMARY_TEXT } from '../../constants/colors';

export default ({ onClick, loading }) => {
  return (
    <div className="header" style={{backgroundColor: PRIMARY, color: PRIMARY_TEXT}}>
      Pitch Detector
    </div>
  )
}
