import React from 'react';

import './home_card.scss';

const HomeCard = (props) => {
  return (
    <div className='container-fluid'>
      <div className='d-flex justify-content-between'>
        <span className='section__name ml-4'>{props.name}</span>
        <span className='show__more'>View More</span>
      </div>
      <div className='row home_cards card-group'>
        {props.list.map((anime) => (
          <div className='card home__card'>
            <img src={anime.link} className='card__img' alt='animeImg' />
            <div className='card__body'>
              <span className='card__body-txt'>{anime.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCard;
