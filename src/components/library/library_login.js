import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getUserToken } from '../../utils/state_manager';
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
        // console.log(recentlyWatched);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className='library__login'>
      <span className='library__login__text'>You Library</span> <br />
      <Link to='/library/subscribed' className='card library__login__card'>
        <img src='/assets/img/notification.svg' className='library__login__card__img fluid-img' alt='subscribed bell' />
        <div>
          <span>Subscribed</span>
        </div>
      </Link>
    </div>
  );
}

export default LibraryLogin;
