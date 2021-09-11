import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SeeMore from '../../components/see_more/see_more';
import trimName from '../../utils/trim_name';
import { API_BASE_URL } from '../../utils/consts';
import { getUserSource } from '../../utils/state_manager';
import './search_results.scss';
import { Player } from '@lottiefiles/react-lottie-player';

function SearchResult() {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    axios
      .get(
        `${API_BASE_URL}/source/anime-search?sourceServer=${params.sourceID}&page=1&perPage=12&query=${params.query}`
      )
      .then((response) => {
        setResult(trimName(response.data.items));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params]);
  return (
    <div className='main'>
      {isLoading ? (
        <Player
          autoplay={true}
          loop={true}
          style={{ height: '150px', width: '150px', paddingTop: '50px' }}
          src={require('../../lottie-animations/lf30_editor_wdtotvax.json')}
          speed={2}
        ></Player>
      ) : result.length == 0 ? (
        <div>
          <Player
            autoplay={true}
            loop={true}
            style={{ height: '300px', width: '300px', paddingTop: '50px' }}
            src={require('../../lottie-animations/earch_not_found.json')}
            speed={2}
          ></Player>
          <h1 className='text-center' style={{ color: 'white' }}>
            Sorry no results were found!
          </h1>
        </div>
      ) : (
        <SeeMore list={result} base={`/anime-source/${getUserSource()}`} />
      )}
    </div>
  );
}

export default SearchResult;
