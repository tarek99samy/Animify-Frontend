import React from 'react';
import { Link } from 'react-router-dom';
import './home_card.scss';

const HomeCard = (props) => {
  return (
    <div className='container-fluid home-cards'>
      <div className='d-flex justify-content-between'>
        <span className='home-cards__title ml-4 mt-4'>{props.name}</span>
        <Link to={props.route}>
          <span className='home-cards__more mt-3'>View More</span>
        </Link>
      </div>
      <div className='row home-cards__wrapper card-group'>
        {props.list.map((anime, index) => (
          <Link to={`/anime-info/0/${anime.gotoURL}`}>
            <fragment>
              <div className='card home-card' key={index}>
                <img src={anime.artwork} className='home-card__img card-img-top fluid-img' alt='animeImg' />
                <div>
                  <span className='home-card__txt'>{anime.name}</span>
                </div>
              </div>
            </fragment>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeCard;
