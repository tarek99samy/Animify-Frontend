import React, { useRef, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { isLoggedIn, getUserToken, getUserSource } from '../../utils/state_manager';
import { API_BASE_URL } from '../../utils/consts';
import './see_more.scss';
import { motion } from 'framer-motion';
import useLoadAnime from '../../utils/load_animes';
import { Player } from '@lottiefiles/react-lottie-player';
function SeeMore(props) {
  const observer = useRef();
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const addClickedHistory = (anime) => {
    if (isLoggedIn() && props.base.includes('/anime-source')) {
      axios
        .post(
          `${API_BASE_URL}/user-history/user-clicked-history`,
          {
            sourceServer: getUserSource(),
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
  const { animes, hasMore, loading, error } = useLoadAnime(props.url, perPage, pageNumber);
  const lastAnimeElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  return (
    <div className='container cards'>
      <div className='row g-1 cards__row justify-content-center'>
        {animes.map((anime, index) => {
          if (index + 1 == animes.length) {
            return (
              <motion.div
                whileHover={{ scale: 1.1 }}
                className='col-12 col-sm-6 col-md-4  seemore__card iam-last-one'
                ref={lastAnimeElementRef}
                key={anime.gotoURL + `${index}+anime`}
              >
                <Link to={`${props.base}${anime.gotoURL}`} key={anime.gotoURL} onClick={() => addClickedHistory(anime)}>
                  <div className='row'>
                    <div className='col-5'>
                      <img src={anime.artwork} alt='animeimage' className='seemore__card__img' />
                    </div>
                    <div className='col-7 row align-items-center'>
                      <div className='card-body col-12'>
                        <span className='seemore__card__text'>{anime.name}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          } else {
            return (
              <motion.div
                whileHover={{ scale: 1.1 }}
                className='col-12 col-sm-6 col-md-4  seemore__card'
                key={anime.gotoURL + `${index}+anime`}
              >
                <Link to={`${props.base}${anime.gotoURL}`} key={anime.gotoURL} onClick={() => addClickedHistory(anime)}>
                  <div className='row'>
                    <div className='col-5'>
                      <img src={anime.artwork} alt='animeimage' className='seemore__card__img' />
                    </div>
                    <div className='col-7 row align-items-center'>
                      <div className='card-body col-12'>
                        <span className='seemore__card__text'>{anime.name}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          }
        })}
        {loading && (
          <Player
            autoplay={true}
            loop={true}
            style={{ height: '150px', width: '150px', paddingTop: '50px' }}
            src={require('../../lottie-animations/lf30_editor_wdtotvax.json')}
            speed={2}
          ></Player>
        )}
        {!hasMore && (
          <h2 style={{ color: 'hsl(260, 90, 66)' }} className='text-center'>
            no more results
          </h2>
        )}
      </div>
    </div>
  );
}

export default SeeMore;
