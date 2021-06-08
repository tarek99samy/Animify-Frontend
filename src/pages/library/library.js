import React from 'react';
import LibraryLogout from '../../components/library/library_logout';
import { isLoggedIn, getUserToken } from '../../utils/state_manager';
import './library.scss';

function Library() {
  return <div className='main'>{isLoggedIn() ? <h1>Library</h1> : <LibraryLogout />}</div>;
}

export default Library;
