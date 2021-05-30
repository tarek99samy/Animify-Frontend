import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Divider from '../../components/divider/divider';
import Expand from '../../components/expand/expand';
import { API_BASE_URL } from '../../utils/consts';
import { getGlobalState } from '../../utils/state_manager';
import './anime_source.scss';

const AnimeSource = ({ match }) => {
  const [data, setData] = useState({
    name: '',
    bannerImgUrl: '',
    description: '',
    numberOfEposides: 0,
    episodeArrayLinks: []
  });
  const [currentEposides, setCurrentEposides] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${API_BASE_URL}/source/anime-info?sourceServer=${match.params.sourceServer}&gotoURL=/category/${match.params.gotoURL}`
      )
      .then((response) => {
        setData({
          title: response.data.name,
          bannerImgUrl: response.data.artwork,
          description: response.data.synopsis,
          numberOfEposides: response.data.noOfEpisodes,
          episodeArrayLinks: response.data.episodeArrayLinks
        });
        setCurrentEposides(
          response.data.episodeArrayLinks.slice(0, 50).map((link, index) => {
            return { title: `Eposide ${index + 1}`, link };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [match.params]);

  const handleSubscribe = () => {
    axios
      .post(
        `${API_BASE_URL}/source/anime-subscribe`,
        {
          sourceServer: match.params.sourceServer,
          anime: {
            artwork: data.bannerImgUrl,
            name: data.title,
            gotoURL: `/category/${match.params.gotoURL}`
          }
        },
        {
          headers: {
            Authorization: getGlobalState().token
          }
        }
      )
      .then(() => {
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  const showMoreEposides = () => {};

  return (
    <div className='container-fluid source'>
      <div className='row source__banner'>
        <div className='source__banner__overlay'></div>

        <img
          src={data.bannerImgUrl ? data.bannerImgUrl : '/assets/img/defualt.png'}
          alt='background'
          className='source__banner__background'
        />

        <div className='container-fluid source__banner__content'>
          <img
            src={data.bannerImgUrl ? data.bannerImgUrl : '/assets/img/defualt.png'}
            alt='banner'
            className='col-4 col-md-auto source__banner__content__img'
          />
          <div className='col-6 col-sm-5 source__banner__content__controls'>
            <span className='source__banner__content__controls__title'>{data.title}</span>
            <button
              type='button'
              className='btn btn-primary source__banner__content__controls__link'
              onClick={handleSubscribe}
            >
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
      <Expand text={data.description} />
      <Divider fullWidth={false} />
      <div className='container-fluid source__eposides'>
        <div className='row source__eposides__heading'>Eposides</div>
        <Divider fullWidth={false} />
        {currentEposides.map((eposide, index) => (
          <div key={index}>
            <div className='row source__eposides__eposide'>
              <div className='col-6 text-start source__eposides__eposide__title'>{eposide.title}</div>
              <div className='col-6 text-end'>
                <Link to={`/watch/${eposide.link}`} className='source__eposides__eposide__link'>
                  Watch Now
                </Link>
              </div>
            </div>
            <Divider fullWidth={1} />
          </div>
        ))}
      </div>
      {currentEposides.length !== data.episodeArrayLinks.length ? (
        <button type='button' className='btn row btn-primary source__eposides__load' onClick={showMoreEposides}>
          Load more
        </button>
      ) : null}
    </div>
  );
};

export default AnimeSource;
