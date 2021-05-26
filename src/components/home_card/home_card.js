import React from 'react';
import { Link } from 'react-router-dom';
import './home_card.scss';

const HomeCard = (props) => {
  return (
    <div className='container-fluid home-cards mt-3'>
      <div className='d-flex justify-content-between'>
        <span className='home-cards__title ml-4 mt-3'>{props.name}</span>
        {props.showSeeMore !== false ? (
          <Link to={props.route}>
            <span className='home-cards__more mt-3'>View More</span>
          </Link>
        ) : null}
      </div>
      <div className='row home-cards__wrapper card-group'>
        {props.list.map((anime, index) => (
          <Link to={`/anime-info/0/${anime.gotoURL}`} className='home-card card' key={index}>
            <div>
              <img src={anime.artwork} className='home-card__img fluid-img' alt='animeImg' />
              <div>
                <span className='home-card__txt'>{anime.name}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeCard;
