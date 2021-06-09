import axios from 'axios';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import VideoPlayer from 'react-video-js-player';
import { API_BASE_URL } from '../../utils/consts';
import { getUserSource, getUserToken } from '../../utils/state_manager';
import './streaming.scss';

const Streaming = ({ match, location }) => {
  const [currentEposideSrc, setCurrentEposideSrc] = useState('');
  const [previousVideoURL, setPreviousVideoURL] = useState('');
  const [nextVideoURL, setNextVideoURL] = useState('');
  const {
    params: { totalEposides }
  } = match;
  const [addWatchedData, setAddWatchedData] = useState({
    sourceServer: 0,
    anime: {
      artwork: '',
      name: '',
      gotoURL: ''
    },
    episodeLink: '',
    episodeNumber: ''
  });

  useEffect(() => {
    const urlParams = location.search.slice(1).split('&');
    const eposideLink = qs.parse(urlParams[0]).src;
    const eposideNumber = +eposideLink.split('-').pop();

    const tempAddWatch = {
      sourceServer: getUserSource(),
      anime: {
        artwork: qs.parse(urlParams[1]).artwork,
        name: qs.parse(urlParams[2]).name,
        gotoURL: qs.parse(urlParams[3]).gotoURL
      },
      episodeLink: eposideLink,
      episodeNumber: eposideNumber
    };
    setAddWatchedData(tempAddWatch);

    axios
      .get(`${API_BASE_URL}/source/anime-episode-url?sourceServer=${getUserSource()}&episodeLink=${eposideLink}`)
      .then((response) => {
        axios
          .post(`${API_BASE_URL}/user-history/user-watched-history`, tempAddWatch, {
            headers: {
              Authorization: `Bearer ${getUserToken()}`
            }
          })
          .then(() => {
            setCurrentEposideSrc(response.data);
            if (eposideNumber > 1) setPreviousVideoURL(eposideLink.replace(/.$/, `${eposideNumber - 1}`));
            if (eposideNumber < totalEposides) setNextVideoURL(eposideLink.replace(/.$/, `${eposideNumber + 1}`));
          })
          .catch((error) => console.log(error));
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
                  href={`/watch/${totalEposides}?src=${previousVideoURL}&artwork=${addWatchedData.anime.artwork}&name=${addWatchedData.anime.name}&gotoURL=${addWatchedData.anime.gotoURL}`}
                  aria-disabled={previousVideoURL.length === 0}
                >
                  Previous
                </a>
              </li>
              <li className={`page-item ${nextVideoURL.length === 0 ? 'disabled' : ''}`}>
                <a
                  className='page-link'
                  href={`/watch/${totalEposides}?src=${nextVideoURL}&artwork=${addWatchedData.anime.artwork}&name=${addWatchedData.anime.name}&gotoURL=${addWatchedData.anime.gotoURL}`}
                >
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
