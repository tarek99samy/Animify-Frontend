import React from 'react';
import './see_more.scss';

function SeeMore(props) {
  return (
    <div className='container cards'>
      <div className='row row-cols-1 cards__row'>
        {props.list.map((anime) => (
          <div className='card seemore__card col'>
            <div className='row g-0'>
              <div className='col-8'>
                <img src={anime.artwork} alt='animeimage' className='seemore__card__img' />
              </div>
              <div className='col-4'>
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
