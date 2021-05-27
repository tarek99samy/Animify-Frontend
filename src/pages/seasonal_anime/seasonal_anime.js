import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SeeMore from '../../components/see_more/see_more';
import trimName from '../../utils/trim_name';
import './seasonal_anime.scss';

function Seasonal() {
  const [seasonalAnime, setSeasonalAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        'http://cmp306-api.us-east-1.elasticbeanstalk.com/listings/anime-seasonal?listingServer=0&page=1&perPage=8&seasonYear=2021&season=0'
      )
      .then((response) => {
        setSeasonalAnime(trimName(response.data.items, 20));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className='main'>
      <SeeMore list={seasonalAnime} />
    </div>
  );
}

export default Seasonal;
