import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { isLoggedIn } from '../../utils/state_manager';
import './nav_bar.scss';

function NavBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();
  const handleClickOnSearch = (event) => {
    if (event.charCode == 13) {
      history.replace({ pathname: `/search-result/0/${searchQuery}` });
    }
  };
  const handleFieldChange = (event) => {
    console.log(event.target.value);
    setSearchQuery(event.target.value);
  };
  return (
    <div>
      <nav className='navbar'>
        <input
          type='search'
          className='navbar__search'
          placeholder='Search for animes'
          name='searchQuery'
          autoComplete='off'
          onKeyPress={handleClickOnSearch}
          onChange={handleFieldChange}
        />
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
