import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import SideBar from '../../components/side_bar/side_bar';
import NavBar from '../../components/nav_bar/nav_bar';
import HomeCard from '../../components/home_card/home_card';
import './home.scss';

function Home() {
  const [seasonalAnime, setSeasonalAnime] = useState([]);
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [animeSchedule, setAnimeSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const date = new Date();
  const timestamp = Math.floor(date.getTime() / 1000.0);

  function trimName(arr) {
    const newArr = [];
    for (let i = 0; i < arr.length; i += 1) {
      const newName = arr[i].name.slice(0, 22);
      newArr.push({
        name: newName,
        gotoURL: arr[i].gotoURL,
        artwork: arr[i].artwork
      });
    }
    return newArr;
  }
  useEffect(() => {
    axios
      .get('http://cmp306-api.us-east-1.elasticbeanstalk.com/listings/anime-trending?listingServer=0&page=1&perPage=8')
      .then((response) => {
        setTrendingAnime(trimName(response.data.items));
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        'http://cmp306-api.us-east-1.elasticbeanstalk.com/listings/anime-seasonal?listingServer=0&page=1&perPage=8&seasonYear=2021&season=0'
      )
      .then((response) => {
        setSeasonalAnime(trimName(response.data.items));
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        `http://cmp306-api.us-east-1.elasticbeanstalk.com/listings/anime-schedule?listingServer=0&page=1&perPage=8&date=${timestamp}`
      )
      .then((response) => {
        setAnimeSchedule(trimName(response.data.items));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <SideBar />
      <NavBar />
      <div className='main'>
        <HomeCard name='This Week' list={animeSchedule} />
        <HomeCard name='Seasonal Anime' list={seasonalAnime} />
        <HomeCard name='Trending Anime' list={trendingAnime} />
      </div>
    </div>
  );
}

export default Home;
