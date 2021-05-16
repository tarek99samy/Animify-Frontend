import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Characters from '../../components/characters/characters';
import Expand from '../../components/expand/expand';
import HomeCard from '../../components/home_card/home_card';
import Statistics from '../../components/statistics/statistics';
import Upcoming from '../../components/upcoming/upcoming';
import { userContext } from '../../context/user_context';
import { API_BASE_URL } from '../../utils/consts';
import './anime_info.scss';

const AnimeInfo = (props) => {
  return (
    <div className='container-fluid info'>
      <div className='info__banner'>
        <img src='' alt='background' className='info__banner__background' />
        <img src='' alt='' className='info__banner__image' />
        <div className='info__banner__content'>
          <span className='info__banner__content__title'></span>
          <span className='info__banner__content__subtitle'></span>
          <button type='button' className='btn info__banner__content__link'>
            VIEW EPOSIDES
          </button>
        </div>
      </div>
      <Expand />
      <Upcoming />
      <Statistics />
      <Characters />
      {/* info -- inplace */}
      {/* related -- HomeCard */}
      <HomeCard />
    </div>
  );
};

export default AnimeInfo;
