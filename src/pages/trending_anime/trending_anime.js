import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SeeMore from '../../components/see_more/see_more';
import trimName from '../../utils/trim_name';
import './trending_anime.scss';

function Trending() {
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://cmp306-api.us-east-1.elasticbeanstalk.com/listings/anime-trending?listingServer=0&page=1&perPage=8')
      .then((response) => {
        setTrendingAnime(trimName(response.data.items));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className='main'>
      <SeeMore list={trendingAnime} />
    </div>
  );
}

export default Trending;
