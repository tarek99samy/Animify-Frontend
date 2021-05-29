import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Characters from '../../components/characters/characters';
import Divider from '../../components/divider/divider';
import Expand from '../../components/expand/expand';
import HomeCard from '../../components/home_card/home_card';
import Statistics from '../../components/statistics/statistics';
import Upcoming from '../../components/upcoming/upcoming';
import { API_BASE_URL } from '../../utils/consts';
import './anime_source.scss';

const AnimeSource = ({ match }) => {
  const [data, setData] = useState({
    name: '',
    description: '',
    numberOfEposides: 0,
    episodeArrayLinks: []
  });

  const formatInformation = (information) => {
    return Object.keys(information).map((key) => {
      return { key, value: information[key] };
    });
  };

  useEffect(() => {
    axios
      .get(
        `${API_BASE_URL}/source/anime-info?sourceServer=${match.params.sourceServer}&gotoURL=${match.params.gotoURL}`
      )
      .then((response) => {
        setData({
          name: response.data.name,
          description: response.data.synopsis,
          numberOfEposides: response.data.noOfEpisodes,
          episodeArrayLinks: response.data.episodeArrayLinks
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [match.params]);

  return (
    <div className='container-fluid source'>
      <div className='row source__banner'>
        <div className='source__banner__overlay'></div>

        <img src={data.backgroundImgUrl} alt='background' className='source__banner__background' />

        <div className='container-fluid source__banner__content'>
          <img src={data.bannerImgUrl} alt='banner' className='col-4 col-md-auto source__banner__content__img' />
          <div className='col-6 col-sm-5 source__banner__content__controls'>
            <span className='source__banner__content__controls__title'>{data.title}</span>
            <span className='source__banner__content__controls__subtitle'>{data.subtitle}</span>
            <Link to='/eposides'>
              <button type='button' className='btn btn-primary source__banner__content__controls__link'>
                VIEW EPOSIDES
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Expand text={data.description} />
      <Divider fullWidth={false} />
      <Upcoming />
      <Statistics statistics={data.statistics} />
      <Divider fullWidth={false} />
      <Characters actors={data.characters} />
      <div className='container-fluid source__details'>
        <div className='source__details__title'>Information</div>
        {data.information.map((item, index) => (
          <div key={index}>
            <div className='source__details__row'>
              <span className='col-6 source__details__row__key'>{item.key}</span>
              <span className='col-6 source__details__row__value'>
                {item.key === 'genres' ? `${item.value[0]} ${item.value[1]}` : item.value}
              </span>
            </div>
            <Divider fullWidth={1} />
          </div>
        ))}
      </div>
      <HomeCard name='Related Animes' list={data.relatedAnimes} route='anime-schedule' showSeeMore={false} />
    </div>
  );
};

export default AnimeSource;
