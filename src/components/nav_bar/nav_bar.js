import React from 'react';
import './nav_bar.scss';

function NavBar() {
  return (
    <div>
      <nav className='navbar'>
        <input type='search' className='navbar__search' placeholder='Search for animes' />
      </nav>
    </div>
  );
}
export default NavBar;
