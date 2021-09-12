import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SeeMore from '../../components/see_more/see_more';
import trimName from '../../utils/trim_name';
import { getUserList } from '../../utils/state_manager';
import { API_BASE_URL } from '../../utils/consts';
import './trending_anime.scss';

function Trending(props) {
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className='main'>
      <SeeMore
        url={`${API_BASE_URL}/listings/anime-trending?listingServer=${getUserList()}`}
        base={`/anime-info/${getUserList()}/`}
      />
    </div>
  );
}

export default Trending;
