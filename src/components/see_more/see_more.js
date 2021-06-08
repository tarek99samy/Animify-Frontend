import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { isLoggedIn, getUserToken } from '../../utils/state_manager';
import { API_BASE_URL } from '../../utils/consts';
import './see_more.scss';

function SeeMore(props) {
  const addClickedHistory = (anime) => {
    if (isLoggedIn() && props.base.includes('/anime-source')) {
      axios
        .post(
          `${API_BASE_URL}/user-history/user-clicked-history`,
          {
            sourceServer: 0,
            anime: {
              artwork: anime.artwork,
              name: anime.name,
              gotoURL: anime.gotoURL
            }
          },
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
  };
  return (
    <div className='container cards'>
      <div className='row g-1 cards__row justify-content-center'>
        {props.list.map((anime) => (
          <Link
            to={`${props.base}${anime.gotoURL}`}
            className='col-6 col-md-4 seemore__card'
            key={anime.gotoURL}
            onClick={() => addClickedHistory(anime)}
          >
            <div className='row'>
              <div className='col-6'>
                <img src={anime.artwork} alt='animeimage' className='seemore__card__img' />
              </div>
              <div className='col-6'>
                <div className='card-body'>
                  <span className='seemore__card__text'>{anime.name}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SeeMore;
