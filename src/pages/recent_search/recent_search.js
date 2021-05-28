import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SeeMore from '../../components/see_more/see_more';
import trimName from '../../utils/trim_name';
import { API_BASE_URL } from '../../utils/consts';
import './recent_search.scss';

function RecentSearch() {
  const [recentSearch, setRecentSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  }, []);
  return (
    <div className='main'>
      <SeeMore list={recentSearch} />
    </div>
  );
}

export default RecentSearch;
