import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HomeCard from '../../components/home_card/home_card';
import ScrollableSchedule from '../../components/scrollable_schedule/scrollable_schedule';
import trimName from '../../utils/trim_name';
import { API_BASE_URL } from '../../utils/consts';
import './home.scss';
import { isLoggedIn, getUserToken, getUserSource, getUserList } from '../../utils/state_manager';

function Home() {
  const [subscribedAnime, setSubscribedAnime] = useState([]);
  const [showSeeMore, setShowSeeMore] = useState(true);
  const [seasonalAnime, setSeasonalAnime] = useState([]);
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [animeSchedule, setAnimeSchedule] = useState([]);
  const date = new Date();
  const timestamp = Math.floor(date.getTime() / 1000.0);

  useEffect(() => {
    if (isLoggedIn()) {
      axios
        .get(`${API_BASE_URL}/source/get-subscribed-anime?page=1&limit=8'`, {
          headers: {
            Authorization: `Bearer ${getUserToken()}`
          }
        })
        .then((response) => {
          setSubscribedAnime(trimName(response.data.items));
          setShowSeeMore(response.data.meta.totalItems > 9);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    axios
      .get(`${API_BASE_URL}/listings/anime-trending?listingServer=${getUserList()}&page=1&perPage=8`)
      .then((response) => {
        setTrendingAnime(trimName(response.data.items));
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get(
        `${API_BASE_URL}/listings/anime-seasonal?listingServer=${getUserList()}&page=1&perPage=8&seasonYear=2021&season=0`
      )
      .then((response) => {
        setSeasonalAnime(trimName(response.data.items));
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get(`${API_BASE_URL}/listings/anime-schedule?listingServer=${getUserList()}&page=1&perPage=8&date=${timestamp}`)
      .then((response) => {
        setAnimeSchedule(trimName(response.data.items, 20, true));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className='main'>
      <ScrollableSchedule list={animeSchedule} route='anime-schedule' />
      {isLoggedIn() && subscribedAnime.length ? (
        <HomeCard
          name='Subscriptions'
          list={subscribedAnime}
          route='/library/subscribed'
          base={`/anime-source/${getUserSource()}`}
          showSeeMore={showSeeMore}
        />
      ) : null}
      <HomeCard
        name='Seasonal Anime'
        list={seasonalAnime}
        route='seasonal-anime'
        base={`/anime-info/${getUserList()}/`}
      />
      <HomeCard
        name='Trending Anime'
        list={trendingAnime}
        route='trending-anime'
        base={`/anime-info/${getUserList()}/`}
      />
    </div>
  );
}

export default Home;
