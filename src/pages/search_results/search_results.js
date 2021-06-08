import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SeeMore from '../../components/see_more/see_more';
import trimName from '../../utils/trim_name';
import { API_BASE_URL } from '../../utils/consts';
import './search_results.scss';

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
      <SeeMore list={result} base='/anime-source' />
    </div>
  );
}

export default SearchResult;
