import React from 'react';
import './library_logout.scss';

function LibraryLogout() {
  return (
    <div className='library__logout'>
      <img src='/assets/img/oops.svg' alt='oops' className='library__logout__img' /> <br />
      <span className='library__logout__text'>You are not logged in!</span> <br />
      <span className='library__logout__text'>
        Please <strong>login</strong> and try again
      </span>
    </div>
  );
}

export default LibraryLogout;
