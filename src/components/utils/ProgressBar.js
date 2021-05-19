import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const initStyle = { marginLeft: '30px', display: 'flex', justifyContent: 'center', marginBottom: 50 };

const CircularProgressExampleSimple = ({ size = 70, thickness = 6, marginTop = '20%', addStyle, addClass }) => (
  <div className={addClass && { ...addClass }} style={addStyle ? { ...initStyle, ...addStyle } : initStyle}>
    <CircularProgress size={size} thickness={thickness} style={{ marginTop: marginTop }} />
  </div>
);

export default CircularProgressExampleSimple;
