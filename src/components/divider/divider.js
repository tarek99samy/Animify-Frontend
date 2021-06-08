import React from 'react';
import './divider.scss';

const Divider = ({ fullWidth, marginTop = 'full' }) => {
  return (
    <div className='row justify-content-center m-0'>
      <div className={`divider ${fullWidth ? 'divider--100' : null} divider--mt__${marginTop}`}></div>
    </div>
  );
};

export default Divider;
