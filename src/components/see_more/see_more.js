import React from 'react';
import './see_more.scss';

function SeeMore(props) {
  return (
    <div className='container cards'>
      <div className='row g-1 cards__row justify-content-center'>
        {props.list.map((anime, index) => (
          <div className='col-6 col-md-4 seemore__card' key={index}>
            <div className='row'>
              <div className='col-6'>
                <img src={anime.artwork} alt='animeimage' className='seemore__card__img' />
              </div>
              <div className='col-6'>
                <div className='card-body'>
                  <span className='seemore__card__text'>{anime.name}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeeMore;
