import React from 'react';

import './home_card.scss';

const HomeCard = (props) => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <h4 className='section__name col-md-6'>{props.name}</h4>
        <div className='show__more col-md-2 ms-auto'>View More</div>
      </div>
      <div className='row home_cards card-group'>
        {props.list.map((anime) => (
          <div className='card home__card'>
            <img src={anime.link} className='card__img' alt='animeImg' />
            <div className='card__body'>
              <p className='card__body-txt'>{anime.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCard;
