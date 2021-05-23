import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../../components/side_bar/side_bar';
import NavBar from '../../components/nav_bar/nav_bar';
import SeeMore from '../../components/see_more/see_more';
import './trending_anime.scss';
import trimName from '../../utils/trim_name';

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
    <div>
      <SideBar />
      <NavBar />
      <div className='main'>
        <SeeMore list={trendingAnime} />
      </div>
    </div>
  );
}

export default Trending;
