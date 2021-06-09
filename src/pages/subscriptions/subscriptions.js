import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LibraryCard from '../../components/library_card/library_card';
import trimName from '../../utils/trim_name';
import { API_BASE_URL } from '../../utils/consts';
import { getUserToken, getUserSource } from '../../utils/state_manager';

function Subscriptions() {
  const [subscribedAnime, setSubscribedAnime] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/source/get-subscribed-anime?page=1&limit=20'`, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`
        }
      })
      .then((response) => {
        setSubscribedAnime(trimName(response.data.items));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div className='main'>
      <div className='row g-1 cards__row justify-content-center'>
        {subscribedAnime.map((anime) => (
          <LibraryCard anime={anime} base={`/anime-source/${getUserSource()}`} showNumber={false} key={anime.id} />
        ))}
      </div>
    </div>
  );
}

export default Subscriptions;
