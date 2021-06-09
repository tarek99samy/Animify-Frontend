import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LibraryCard from '../library_card/library_card';
import { getUserToken, getUserSource } from '../../utils/state_manager';
import { API_BASE_URL } from '../../utils/consts';
import './library_login.scss';

function LibraryLogin() {
  const [recentlyWatched, setRecentlyWatched] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/user-history/user-watched-history?page=1&limit=30'`, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`
        }
      })
      .then((response) => {
        setRecentlyWatched(response.data.items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className='library__login'>
      <span className='library__login__text'>You Library</span> <br />
      <div className='container cards'>
        <div className='row g-1 cards__row'>
          <Link to='/library/subscribed' className='card library__login__card'>
            <img
              src='/assets/img/notification.svg'
              className='library__login__card__img fluid-img'
              alt='subscribed bell'
            />
            <div>
              <span>Subscribed</span>
            </div>
          </Link>
          {recentlyWatched.map((anime) => (
            <LibraryCard anime={anime} base={`/anime-source/${getUserSource()}/category/`} showNumber />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LibraryLogin;
