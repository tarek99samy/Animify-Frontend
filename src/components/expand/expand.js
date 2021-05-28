import React, { useState } from 'react';
import './expand.scss';

const Expand = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='container-fluid expand'>
      <div className='row expand__header'>
        <span className='col-auto expand__header__title'>Synopsis</span>
        <button className='col-5 col-lg-3 btn expand__header__control' type='button' onClick={handleExpand}>
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      <div className='row expand__content'>
        <p className='expand__content__text'>{isExpanded ? text : `${text.slice(0, 150)}...`}</p>
      </div>
    </div>
  );
};

export default Expand;
