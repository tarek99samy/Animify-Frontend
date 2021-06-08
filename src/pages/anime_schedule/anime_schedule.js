import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../../components/side_bar/side_bar';
import NavBar from '../../components/nav_bar/nav_bar';
import trimName from '../../utils/trim_name';
import ScheduleCard from '../../components/schedule_card/schedule_card';
import { API_BASE_URL } from '../../utils/consts';

function AnimeSchedule() {
  const [animeList, setAnimeSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const date = new Date();
  const timestamp = Math.floor(date.getTime() / 1000.0);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/listings/anime-schedule?listingServer=0&page=1&perPage=12&date=${timestamp}`)
      .then((response) => {
        setAnimeSchedule(trimName(response.data.items, 20, true));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div>
      <SideBar />
      <NavBar />
      <div className='main'>
        <div className='container schedule__cards'>
          <div className='row schedule__cards__row justify-content-center'>
            {animeList.map((anime) => (
              <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4' key={anime.gotoURL}>
                <ScheduleCard anime={anime} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeSchedule;
