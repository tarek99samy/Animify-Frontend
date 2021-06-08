import React from 'react';
import LibraryLogout from '../../components/library/library_logout';
import LibraryLogin from '../../components/library/library_login';
import { isLoggedIn } from '../../utils/state_manager';
import './library.scss';

function Library() {
  return <div className='main'>{isLoggedIn() ? <LibraryLogin /> : <LibraryLogout />}</div>;
}

export default Library;
