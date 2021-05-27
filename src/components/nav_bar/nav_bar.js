import React from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../../utils/state_manager';
import './nav_bar.scss';

function NavBar() {
  return (
    <div>
      <nav className='navbar'>
        <input type='search' className='navbar__search' placeholder='Search for animes' />
        {isLoggedIn() ? (
          <div className='navbar__buttons'>
            <Link to='/profile'>
              <span className='navbar__username'>Eman Othman</span>
            </Link>
            <Link to='/profile'>
              <i className='fa fa-user navbar__icon fa-lg navbar__usericon'></i>
            </Link>
            <i className='fa fa-bell navbar__icon fa-lg'></i>
          </div>
        ) : null}
      </nav>
    </div>
  );
}
export default NavBar;
