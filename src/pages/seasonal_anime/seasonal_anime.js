import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SeeMore from '../../components/see_more/see_more';
import trimName from '../../utils/trim_name';
import { API_BASE_URL } from '../../utils/consts';
import './seasonal_anime.scss';

function Seasonal() {
  const [seasonalAnime, setSeasonalAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/listings/anime-seasonal?listingServer=0&page=1&perPage=12&seasonYear=2021&season=0`)
      .then((response) => {
        setSeasonalAnime(trimName(response.data.items, 20));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className='main'>
      <SeeMore list={seasonalAnime} base='/anime-info/0/' />
    </div>
  );
}

export default Seasonal;
