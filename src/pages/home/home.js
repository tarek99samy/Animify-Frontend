import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import HomeCard from '../../components/home_card/home_card';
import ScrollableSchedule from '../../components/scrollable_schedule/scrollable_schedule';
import trimName from '../../utils/trim_name';
import { API_BASE_URL } from '../../utils/consts';
import './home.scss';

function Home() {
  const [seasonalAnime, setSeasonalAnime] = useState([]);
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [animeSchedule, setAnimeSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const date = new Date();
  const timestamp = Math.floor(date.getTime() / 1000.0);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/listings/anime-trending?listingServer=0&page=1&perPage=8`)
      .then((response) => {
        setTrendingAnime(trimName(response.data.items));
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${API_BASE_URL}/listings/anime-seasonal?listingServer=0&page=1&perPage=8&seasonYear=2021&season=0`)
      .then((response) => {
        setSeasonalAnime(trimName(response.data.items));
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${API_BASE_URL}/listings/anime-schedule?listingServer=0&page=1&perPage=8&date=${timestamp}`)
      .then((response) => {
        setAnimeSchedule(trimName(response.data.items, 20, true));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      {/* <SideBar />
      <NavBar /> */}
      <div className='main'>
        <ScrollableSchedule list={animeSchedule} route='anime-schedule' />
        <HomeCard name='Seasonal Anime' list={seasonalAnime} route='seasonal-anime' />
        <HomeCard name='Trending Anime' list={trendingAnime} route='trending-anime' />
      </div>
    </div>
  );
}

export default Home;
