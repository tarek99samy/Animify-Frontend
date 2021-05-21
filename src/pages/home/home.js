import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import SideBar from '../../components/side_bar/side_bar';
import HomeCard from '../../components/home_card/home_card';
import './home.scss';

function Home() {
  const [seasonalAnime, setSeasonalAnime] = useState([]);
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [animeSchedule, setAnimeSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://cmp306-api.us-east-1.elasticbeanstalk.com/listings/anime-trending?listingServer=0&page=1&perPage=8')
      .then((response) => {
        setTrendingAnime(response.data.items);
        console.log(trendingAnime);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        'http://cmp306-api.us-east-1.elasticbeanstalk.com/listings/anime-seasonal?listingServer=0&page=1&perPage=8&seasonYear=2021&season=0'
      )
      .then((response) => {
        setSeasonalAnime(response.data.items);
        console.log(seasonalAnime);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <SideBar />
      <div className='main'>
        <HomeCard name='Seasonal Anime' list={seasonalAnime} />
        <HomeCard name='Trending Anime' list={trendingAnime} />

        {/* <HomeCard />
        <HomeCard /> */}
      </div>
    </div>
  );
}

export default Home;
