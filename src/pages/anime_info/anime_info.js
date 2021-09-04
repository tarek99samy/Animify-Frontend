import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Characters from '../../components/characters/characters';
import Divider from '../../components/divider/divider';
import Expand from '../../components/expand/expand';
import HomeCard from '../../components/home_card/home_card';
import SearchModal from '../../components/search_modal/search_modal';
import Statistics from '../../components/statistics/statistics';
import Upcoming from '../../components/upcoming/upcoming';
import { API_BASE_URL } from '../../utils/consts';
import { getUserSource } from '../../utils/state_manager';
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
    information: [],
    relatedAnimes: []
  });

  const userServer = getUserSource();

  const formatInformation = (information) => {
    return Object.keys(information).map((key) => {
      let value = information[key];
      if (Array.isArray(value)) {
        if (value.length === 0) value = ['No genere'];
        else value = [value[0], value[1]];
      } else if (value === 'null/null/null') value = 'not specified';
      else if (value === null) value = 0;

      return { key, value };
    });
  };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/listings/anime-info?listingServer=${match.params.listingId}&id=${match.params.animeId}`)
      .then((response) => {
        setData({
          backgroundImgUrl: response.data.artwork,
          bannerImgUrl: response.data.wallpaper ? response.data.wallpaper : response.data.artwork,
          title: response.data.name.primaryName,
          subtitle: response.data.name.nativeName,
          description: response.data.synopsis,
          statistics: response.data.statistics.ratings,
          characters: response.data.charachters,
          information: formatInformation(response.data.information),
          relatedAnimes: response.data.relatedAnimes
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [match.params]);

  return (
    <div className='container-fluid info main'>
      <div className='info__wrapper'>
        <div className='row info__banner'>
          <div className='info__banner__overlay'></div>

          <img
            src={data.backgroundImgUrl ? data.backgroundImgUrl : '/assets/img/defualt.png'}
            alt='background'
            className='info__banner__background'
          />

          <div className='container-fluid row info__banner__content'>
            <div className='col-4'>
              <img
                src={data.bannerImgUrl ? data.bannerImgUrl : '/assets/img/defualt.png'}
                alt='banner'
                className='rounded img-thumbnail col-4 col-md-auto info__banner__content__img'
              />
            </div>

            <div className='col-8 info__banner__content__controls row  align-items-center'>
              <div className='col '>
                <span className='info__banner__content__controls__title'>{data.title}</span>
                <br></br>
                <span className='info__banner__content__controls__subtitle'>{data.subtitle}</span>
                <br></br>
                <button
                  type='button'
                  className='btn btn-primary info__banner__content__controls__link'
                  data-bs-toggle='modal'
                  data-bs-target='#sourceSearch'
                >
                  VIEW EPOSIDES
                </button>

                <SearchModal
                  searchPathName={`source/anime-search?sourceServer=${userServer}`}
                  detailsPath={`anime-source/${userServer}`}
                  searchQuery={data.title}
                  id='sourceSearch'
                  title='Top sources found'
                />
              </div>
            </div>
          </div>
        </div>
        <Expand text={data.description} />
        <Divider fullWidth={false} />
        <Upcoming />
        <Statistics statistics={data.statistics} />
        <Divider fullWidth={false} />
        <Characters actors={data.characters} />
        <div className='container-fluid info__details'>
          <div className='info__details__title'>Information</div>
          {data.information.map((item, index) => (
            <div key={index}>
              <div className='info__details__row'>
                <span className='col-6 info__details__row__key'>{item.key}</span>
                <span className='col-6 info__details__row__value'>{item.value}</span>
              </div>
              <Divider fullWidth={1} />
            </div>
          ))}
        </div>
        <HomeCard name='Related Animes' list={data.relatedAnimes} route='' showSeeMore={false} base='/anime-info' />
      </div>
    </div>
  );
};

export default AnimeInfo;
