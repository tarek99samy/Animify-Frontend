import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SeeMore from '../../components/see_more/see_more';
import trimName from '../../utils/trim_name';
import { getUserList } from '../../utils/state_manager';
import { API_BASE_URL } from '../../utils/consts';
import './trending_anime.scss';

function Trending() {
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/listings/anime-trending?listingServer=${getUserList()}&page=1&perPage=12`)
      .then((response) => {
        setTrendingAnime(trimName(response.data.items));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className='main'>
      <SeeMore list={trendingAnime} base={`/anime-info/${getUserList()}/`} />
    </div>
  );
}

export default Trending;
