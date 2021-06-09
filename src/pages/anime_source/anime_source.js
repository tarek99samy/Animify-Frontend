/* eslint no-restricted-globals:0 */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Divider from '../../components/divider/divider';
import Expand from '../../components/expand/expand';
import ReportModal from '../../components/report_modal/report_modal';
import SearchModal from '../../components/search_modal/search_modal';
import { API_BASE_URL } from '../../utils/consts';
import { getUserList, getUserToken, isLoggedIn } from '../../utils/state_manager';
import './anime_source.scss';

const AnimeSource = ({ match }) => {
  const [data, setData] = useState({
    title: '',
    bannerImgUrl: '',
    description: '',
    numberOfEposides: 0,
    episodeArrayLinks: []
  });
  const [currentEposides, setCurrentEposides] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const {
    params: { sourceServer, gotoURL }
  } = match;
  const userListing = getUserList();

  const formatEposides = (eposides) => {
    return eposides.map((link, index) => {
      return { title: `Eposide ${index + 1}`, link };
    });
  };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/source/anime-info?sourceServer=${sourceServer}&gotoURL=/category/${gotoURL}`)
      .then((response) => {
        setData({
          title: response.data.name,
          bannerImgUrl: response.data.artwork,
          description: response.data.synopsis,
          numberOfEposides: response.data.noOfEpisodes,
          episodeArrayLinks: response.data.episodeArrayLinks
        });
        setCurrentEposides(formatEposides(response.data.episodeArrayLinks.slice(0, 10)));
        if (isLoggedIn()) {
          axios
            .post(
              `${API_BASE_URL}/source/check-anime-subscribe`,
              {
                sourceServer,
                anime: {
                  artwork: response.data.bannerImgUrl,
                  name: response.data.title,
                  gotoURL: `/category/${gotoURL}`
                }
              },
              {
                headers: {
                  Authorization: `Bearer ${getUserToken()}`
                }
              }
            )
            .then((responseFlag) => setIsSubscribed(responseFlag.data))
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [match.params]);

  const showMoreEposides = () => {
    setCurrentEposides(
      formatEposides(
        currentEposides.concat(data.episodeArrayLinks.slice(currentEposides.length, currentEposides.length + 10))
      )
    );
  };

  const handleSubscribe = () => {
    axios
      .post(
        `${API_BASE_URL}/source/anime-subscribe`,
        {
          sourceServer,
          anime: {
            artwork: data.bannerImgUrl,
            name: data.title,
            gotoURL: `/category/${gotoURL}`
          }
        },
        {
          headers: {
            Authorization: `Bearer ${getUserToken()}`
          }
        }
      )
      .then(() => {
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

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

            <div className='dropdown'>
              <button
                className='btn btn-primary btn-sm source__banner__content__controls__link'
                type='button'
                id='actionMenu'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                Actions
              </button>
              <ul className='dropdown-menu source__banner__content__controls__dropdown' aria-labelledby='actionMenu'>
                <li>
                  <button
                    type='button'
                    className='dropdown-item source__banner__content__controls__dropdown__item'
                    data-bs-toggle='modal'
                    data-bs-target='#listingSearch'
                  >
                    Show Information
                  </button>
                </li>
                <li>
                  <button
                    type='button'
                    className='dropdown-item source__banner__content__controls__dropdown__item'
                    data-bs-toggle='modal'
                    data-bs-target='#reportToAdmin'
                  >
                    Report anime
                  </button>
                </li>
                {!isSubscribed ? (
                  <li>
                    <button
                      type='button'
                      className='dropdown-item source__banner__content__controls__dropdown__item'
                      onClick={handleSubscribe}
                    >
                      SUBSCRIBE
                    </button>
                  </li>
                ) : null}
              </ul>
            </div>

            <SearchModal
              searchPathName={`listings/anime-search?listingServer=${userListing}`}
              detailsPath={`anime-info/${userListing}`}
              searchQuery={data.title}
              id='listingSearch'
              title='Top listings found'
            />

            <ReportModal id='reportToAdmin' url={location.href} />
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
                <a
                  href={`/watch/${data.episodeArrayLinks.length}?src=${eposide.link}&artwork=${data.bannerImgUrl}&name=${data.title}&gotoURL=${gotoURL}`}
                  className='source__eposides__eposide__link'
                >
                  Watch Now
                </a>
              </div>
            </div>
            <Divider fullWidth={1} />
          </div>
        ))}
      </div>
      {currentEposides.length !== data.episodeArrayLinks.length ? (
        <div className='source__eposides__load'>
          <button
            type='button'
            className='btn col-12 btn-dark col-sm-5 source__eposides__load__btn'
            onClick={showMoreEposides}
          >
            Load more
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default AnimeSource;
