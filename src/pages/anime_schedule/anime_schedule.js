import React, { useRef, useState, useCallback } from 'react';
import axios from 'axios';
import SideBar from '../../components/side_bar/side_bar';
import NavBar from '../../components/nav_bar/nav_bar';
import trimName from '../../utils/trim_name';
import { getUserList } from '../../utils/state_manager';
import ScheduleCard from '../../components/schedule_card/schedule_card';
import { API_BASE_URL } from '../../utils/consts';
import useLoadAnime from '../../utils/load_animes';
import { Player } from '@lottiefiles/react-lottie-player';
function AnimeSchedule() {
  const observer = useRef();
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const date = new Date();
  const timestamp = Math.floor(date.getTime() / 1000.0);
  const url = `${API_BASE_URL}/listings/anime-schedule?listingServer=${getUserList()}&date=${timestamp}`;
  const { animes, hasMore, loading, error } = useLoadAnime(url, perPage, pageNumber);
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
    <div>
      <div className='main'>
        <div className='container schedule__cards'>
          <div className='row schedule__cards__row justify-content-center'>
            {animes.map((anime, index) => {
              if (index + 1 == animes.length) {
                return (
                  <div
                    className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 '
                    key={anime.name + index}
                    ref={lastAnimeElementRef}
                  >
                    <ScheduleCard
                      url={`${API_BASE_URL}/listings/anime-schedule?listingServer=${getUserList()}&date=${timestamp}`}
                      anime={anime}
                    />
                  </div>
                );
              } else {
                return (
                  <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4' key={anime.name + index}>
                    <ScheduleCard
                      url={`${API_BASE_URL}/listings/anime-schedule?listingServer=${getUserList()}&date=${timestamp}`}
                      anime={anime}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
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

export default AnimeSchedule;
