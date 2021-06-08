import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { isLoggedIn, getGlobalState } from '../../utils/state_manager';
import hideBars from '../../utils/hideBars';
import './nav_bar.scss';

function NavBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hideValue, setHideValue] = useState('');
  const [searchFoucs, setSearchFocus] = useState('');

  const history = useHistory();
  const location = useLocation();
  const handleClickOnSearch = (event) => {
    if (event.charCode === 13) {
      history.replace({ pathname: `/search-result/0/${searchQuery}` });
    }
  };
  useEffect(() => {
    setHideValue(hideBars(location.pathname));
  }, [location]);
  const handleFieldChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const inputSearchFoucs = (val) => {
    setSearchFocus(val);
  };
  return (
    <div className={`${hideValue}`}>
      <nav className='navbar'>
        <input
          type='search'
          className='navbar__search dropdown-toggle'
          placeholder='Search for animes'
          name='searchQuery'
          autoComplete='off'
          onKeyPress={handleClickOnSearch}
          onChange={handleFieldChange}
          onFocus={() => inputSearchFoucs('focused')}
          onBlur={() => inputSearchFoucs('')}
        />
        <ul className={`list-group navbar__search__list ${searchFoucs}`}>
          <li className='list-group-item navbar__search__list__item'>An item</li>
          <li className='list-group-item navbar__search__list__item'>A second item</li>
          <li className='list-group-item navbar__search__list__item'>A third item</li>
          <li className='list-group-item navbar__search__list__item'>A fourth item</li>
          <li className='list-group-item navbar__search__list__item'>And a fifth one</li>
        </ul>
        {isLoggedIn() ? (
          <div className='navbar__buttons--login'>
            <Link to='/profile'>
              <span className='navbar__username'>{getGlobalState().username}</span>
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
