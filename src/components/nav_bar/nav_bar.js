/* eslint-disable  */
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
  const [notificatiosUnreadCount, setNotificatiosUnreadCount] = useState(0);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/notification/get-user-notifications?page=1&limit=5`, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`
        }
      })
      .then((response) => {
        let tempCount = 0;
        response.data.items.forEach((element) => {
          tempCount += element.read === false;
        });
        setNotificatiosUnreadCount(tempCount);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setHideValue(hideBars(location.pathname));
    if (!location.pathname.includes('/search-result')) {
      setSearchQuery('');
    }
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
    getSearchHistory();
  }, []);

  const getSearchHistory = () => {
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
  };
  const handleFieldChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const inputSearchFoucs = (val) => {
    setSearchFocus(val);
  };

  const handleSuggestionCLick = (query, val) => {
    console.log(val);
    inputSearchFoucs('');
    setSearchQuery(val);
    history.replace({ pathname: `/search-result/${getUserSource()}/${query}` });
  };

  const removeHistory = (id) => {
    axios
      .delete(`${API_BASE_URL}/user-history/user-search-history?historyId=${id}`, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`
        }
      })
      .then(() => {
        getSearchHistory();
      })
      .catch((error) => {
        console.error(error);
      });
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
        />
        <ul className={`list-group navbar__search__list ${searchFoucs}`}>
          {searchHistory.map((search, index) => (
            <li
              className='list-group-item navbar__search__list__item'
              onClick={() => handleSuggestionCLick(search.query, search.id)}
              key={index}
            >
              <span>{search.query}</span>
              <i
                className='fa fa-trash navbar__search__list__item__icon'
                onClick={(e) => {
                  e.stopPropagation();
                  removeHistory(search.id);
                }}
              ></i>
            </li>
          ))}
        </ul>
        {isLoggedIn() ? (
          <div className='navbar__buttons--login'>
            <span className='navbar__username'>{getGlobalState().username}</span>
            <i className='fa fa-user navbar__icon fa-lg navbar__usericon'></i>
            <Notifications initialCount={notificatiosUnreadCount} />
          </div>
        ) : (
          <div className='navbar__buttons--logout'>
            <Link to='/login'>
              <button type='button' className='btn navbar__signbtn'>
                Log In
              </button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
export default NavBar;
