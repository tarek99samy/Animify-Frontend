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
          <div className='navbar__buttons--login'>
            <Link to='/profile'>
              <span className='navbar__username'>Eman Othman</span>
            </Link>
            <Link to='/profile'>
              <i className='fa fa-user navbar__icon fa-lg navbar__usericon'></i>
            </Link>
            <i className='fa fa-bell navbar__icon fa-lg'></i>
          </div>
        ) : (
          <div className='navbar__buttons--logout'>
            <Link to='/login'>
              <button type='button' className='btn navbar__loginbtn'>
                Log in
              </button>
            </Link>
            <Link to='/signup'>
              <button type='button' className='btn navbar__signbtn'>
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
export default NavBar;
