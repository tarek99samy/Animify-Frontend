import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Characters from '../../components/characters/characters';
import Divider from '../../components/divider/divider';
import Expand from '../../components/expand/expand';
import HomeCard from '../../components/home_card/home_card';
import Statistics from '../../components/statistics/statistics';
import Upcoming from '../../components/upcoming/upcoming';
import { API_BASE_URL } from '../../utils/consts';
import './anime_info.scss';

const AnimeInfo = ({ match }) => {
  const [data, setData] = useState({
    backgroundImgUrl: '',
    bannerImgUrl: '',
    title: '',
    subtitle: '',
    description: '',
    statistics: [],
    characters: [],
    information: {},
    relatedAnimes: []
  });
  console.log(match.params);
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/listings/anime-info?listingServer=${match.params.listingId}&id=${match.params.animeId}`)
      .then((response) => {
        setData({
          backgroundImgUrl: response.data.artwork,
          bannerImgUrl: response.data.wallpaper,
          title: response.data.name.primaryName,
          subtitle: response.data.name.nativeName,
          description: response.data.synopsis,
          statistics: response.data.statistics.ratings,
          characters: response.data.charachters,
          information: response.data.information,
          relatedAnimes: response.data.relatedAnimes
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className='container-fluid info'>
      <div className='row info__banner'>
        <div className='info__banner__overlay'></div>

        <img src={data.backgroundImgUrl} alt='background' className='info__banner__background' />

        <div className='container-fluid info__banner__content'>
          <img src={data.bannerImgUrl} alt='banner' className='col-3 info__banner__content__img' />
          <div className='col-8 info__banner__content__controls'>
            <span className='info__banner__content__controls__title'>{data.title}</span>
            <span className='info__banner__content__controls__subtitle'>{data.subtitle}</span>
            <Link to='/eposides'>
              <button type='button' className='btn info__banner__content__controls__link'>
                VIEW EPOSIDES
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Expand text={data.description} />
      <Divider />
      <Upcoming />

      <Statistics statistics={data.statistics} />

      <Characters />

      {/* info -- inplace */}

      {/* related -- HomeCard */}
      {/* <HomeCard /> */}
    </div>
  );
};

export default AnimeInfo;
