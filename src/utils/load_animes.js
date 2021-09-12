import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useLoadAnime(url, perPage, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [animes, setAnimes] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios
      .get(`${url}&page=${pageNumber}&perPage=${perPage}`)
      .then((response) => {
        setHasMore(response.data.meta.currentPage < response.data.meta.totalPages);
        setLoading(false);
        setAnimes((prevAnimes) => {
          return [...prevAnimes, ...response.data.items];
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [url, pageNumber, perPage]);

  return { loading, error, animes, hasMore };
}
