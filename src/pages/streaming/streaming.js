import axios from 'axios';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import VideoPlayer from 'react-video-js-player';
import { API_BASE_URL } from '../../utils/consts';
import { getUserSource, getUserToken } from '../../utils/state_manager';
import './streaming.scss';
import { Player } from '@lottiefiles/react-lottie-player';
import { motion } from 'framer-motion';
const Streaming = ({ match, location }) => {
  const [currentEposideSrc, setCurrentEposideSrc] = useState('');
  const [previousVideoURL, setPreviousVideoURL] = useState('');
  const [nextVideoURL, setNextVideoURL] = useState('');
  const {
    params: { totalEposides }
  } = match;

  useEffect(() => {
    const urlParams = location.search.slice(1).split('&');
    const eposideLink = qs.parse(urlParams[0]).src;
    const eposideNumber = +eposideLink.split('-').pop();

    const addWatchedData = {
      sourceServer: getUserSource(),
      anime: {
        artwork: qs.parse(urlParams[1]).artwork,
        name: qs.parse(urlParams[2]).name,
        gotoURL: qs.parse(urlParams[3]).gotoURL
      },
      episodeLink: eposideLink,
      episodeNumber: eposideNumber
    };

    axios
      .get(`${API_BASE_URL}/source/anime-episode-url?sourceServer=${getUserSource()}&episodeLink=${eposideLink}`)
      .then((response) => {
        axios
          .post(`${API_BASE_URL}/user-history/user-watched-history`, addWatchedData, {
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
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
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
          </motion.div>
        ) : (
          <Player
            autoplay={true}
            loop={true}
            style={{ height: '150px', width: '150px', paddingTop: '50px' }}
            src={require('../../lottie-animations/lf30_editor_wdtotvax.json')}
            speed={2}
          ></Player>
        )}
      </div>
    </div>
  );
};

export default Streaming;
