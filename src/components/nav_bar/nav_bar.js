import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { isLoggedIn, getGlobalState, getUserToken, getUserSource } from '../../utils/state_manager';
import { API_BASE_URL } from '../../utils/consts';
import hideBars from '../../utils/hideBars';
import Notifications from '../notifications/notifications';
import './nav_bar.scss';

function NavBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hideValue, setHideValue] = useState('');
  const [searchFoucs, setSearchFocus] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setHideValue(hideBars(location.pathname));
  }, [location]);

  const handleClickOnSearch = (event) => {
    if (event.charCode === 13) {
      if (isLoggedIn()) {
        axios
          .post(
            `${API_BASE_URL}/user-history/user-search-history?query=${searchQuery}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${getUserToken()}`
              }
            }
          )
          .then(() => {})
          .catch((error) => {
            console.error(error);
          });
      }
      history.replace({ pathname: `/search-result/${getUserSource()}/${searchQuery}` });
    }
  };
  useEffect(() => {
    setHideValue(hideBars(location.pathname));
  }, [location]);
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/user-history/user-search-history?page=1&&limit=5`, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`
        }
      })
      .then((response) => {
        setSearchHistory(response.data.items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
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
          {searchHistory.map((search) => (
            <Link
              to={`/search-result/${getUserSource()}/${search.query}`}
              className='list-group-item navbar__search__list__item'
              key={search.id}
            >
              <li> {search.query} </li>
            </Link>
          ))}
        </ul>
        {isLoggedIn() ? (
          <div className='navbar__buttons--login'>
            <span className='navbar__username'>{getGlobalState().username}</span>
            <i className='fa fa-user navbar__icon fa-lg navbar__usericon'></i>
            <Notifications />
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
