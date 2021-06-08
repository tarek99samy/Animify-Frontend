import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SeeMore from '../../components/see_more/see_more';
import trimName from '../../utils/trim_name';
import { getUserToken } from '../../utils/state_manager';
import { API_BASE_URL } from '../../utils/consts';
import './recent_search.scss';

function RecentSearch() {
  const [recentSearch, setRecentSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/user-history/user-clicked-history?page=1&limit=10`, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`
        }
      })
      .then((response) => {
        setRecentSearch(trimName(response.data.items, 20));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className='main'>
      <SeeMore list={recentSearch} base='/anime-source/0' />
    </div>
  );
}

export default RecentSearch;
