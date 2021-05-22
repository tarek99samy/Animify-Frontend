import React from 'react';
import './divider.scss';

const Divider = ({ fullWidth }) => {
  return (
    <div className='row justify-content-center m-0'>
      <div className={`divider ${fullWidth ? 'divider--100' : null}`}></div>
    </div>
  );
};

export default Divider;
