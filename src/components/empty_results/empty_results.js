import React from 'react';
import './empty_results.scss';

const EmptyResults = (props) => {
  return (
    <div className='main'>
      {props.search ? (
        <div className='search'>
          <strong className='search__text'>No results to show</strong> <br />
          <span className='search__info'>Please check spelling or try different keywords</span>
        </div>
      ) : null}
    </div>
  );
};

export default EmptyResults;
