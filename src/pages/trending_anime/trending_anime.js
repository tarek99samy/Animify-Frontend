import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../../components/side_bar/side_bar';
import NavBar from '../../components/nav_bar/nav_bar';
import SeeMore from '../../components/see_more/see_more';
import trimName from '../../utils/trim_name';
import { API_BASE_URL } from '../../utils/consts';
import './trending_anime.scss';

function Trending() {
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/listings/anime-trending?listingServer=0&page=1&perPage=12`)
      .then((response) => {
        setTrendingAnime(trimName(response.data.items));
        setIsLoading(false);
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
        <span className='main__title m-2'> Trending Anime </span>
        <SeeMore list={trendingAnime} />
      </div>
    </div>
  );
}

export default Trending;
