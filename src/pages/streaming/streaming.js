import axios from 'axios';
import React, { useEffect, useState } from 'react';
import VideoPlayer from 'react-video-js-player';
import { API_BASE_URL } from '../../utils/consts';
import { getUserSource } from '../../utils/state_manager';
import './streaming.scss';

const Streaming = ({ match, location }) => {
  const [currentEposideSrc, setCurrentEposideSrc] = useState('');
  const [previousVideoURL, setPreviousVideoURL] = useState('');
  const [nextVideoURL, setNextVideoURL] = useState('');
  const {
    params: { totalEposides }
  } = match;

  useEffect(() => {
    const gotoURL = location.search.split('src=')[1];
    axios
      .get(`${API_BASE_URL}/source/anime-episode-url?sourceServer=${getUserSource()}&episodeLink=${gotoURL}`)
      .then((response) => {
        setCurrentEposideSrc(response.data);
        const eposideNumber = +gotoURL.split('-').pop();
        if (eposideNumber > 1) setPreviousVideoURL(gotoURL.replace(/.$/, `${eposideNumber - 1}`));
        if (eposideNumber < totalEposides) setNextVideoURL(gotoURL.replace(/.$/, `${eposideNumber + 1}`));
      })
      .catch((error) => {
        console.log(error);
        setCurrentEposideSrc('not-found');
      });
  }, [location.search]);

  return (
    <div className='streaming'>
      <div className='container'>
        {currentEposideSrc.length ? (
          <>
            <VideoPlayer
              autoplay={false}
              src={currentEposideSrc}
              type='video/mp4'
              playbackRates={[1, 1.25, 1.5, 2]}
              controls
              preload
              bigPlayButton
              isFullScreen
            />
            <ul className='pagination justify-content-center mt-5'>
              <li className={`page-item ${previousVideoURL.length === 0 ? 'disabled' : ''}`}>
                <a
                  className='page-link'
                  href={`/watch/${totalEposides}?src=${previousVideoURL}`}
                  aria-disabled={previousVideoURL.length === 0}
                >
                  Previous
                </a>
              </li>
              <li className={`page-item ${nextVideoURL.length === 0 ? 'disabled' : ''}`}>
                <a className='page-link' href={`/watch/${totalEposides}?src=${nextVideoURL}`}>
                  Next
                </a>
              </li>
            </ul>
          </>
        ) : (
          <div className='row justify-content-center m-5'>
            <div className='spinner-grow text-primary' role='status'></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Streaming;
