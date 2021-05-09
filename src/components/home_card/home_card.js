import React from 'react';

import './home_card.scss';

const HomeCard = (props) => {
  return (
    <div className='container-fluid home-cards'>
      <div className='d-flex justify-content-between'>
        <span className='home-cards__title ml-4'>{props.name}</span>
        <span className='home-cards__more'>View More</span>
      </div>
      <div className='row home-cards__wrapper card-group'>
        {props.list.map((anime) => (
          <div className='card home-card'>
            <img src={anime.link} className='home-card__img' alt='animeImg' />
            <div>
              <span className='home-card__txt'>{anime.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCard;
