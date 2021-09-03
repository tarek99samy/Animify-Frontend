import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SeeMore from '../../components/see_more/see_more';
import trimName from '../../utils/trim_name';
import calculateSeason from '../../utils/calculate_season';
import { getUserList } from '../../utils/state_manager';
import { API_BASE_URL } from '../../utils/consts';
import './see_more_results.scss';

function SeeMoreResults({ match }) {
  const [animeList, setAnimeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const location = useLocation();
  // console.log(location)

  useEffect(() => {
    if (match.params.type === 'trending-anime') {
      axios
        .get(`${API_BASE_URL}/listings/anime-trending?listingServer=${getUserList()}&page=1&perPage=12`)
        .then((response) => {
          setAnimeList(trimName(response.data.items));
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .get(
          `${API_BASE_URL}/listings/anime-seasonal?listingServer=${getUserList()}&page=1&perPage=12&seasonYear=${new Date().getFullYear()}&season=${calculateSeason()}`
        )
        .then((response) => {
          setAnimeList(trimName(response.data.items, 20));
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <div className='main'>
      <SeeMore list={animeList} base={`/anime-info/${getUserList()}/`} />
    </div>
  );
}

export default SeeMoreResults;
