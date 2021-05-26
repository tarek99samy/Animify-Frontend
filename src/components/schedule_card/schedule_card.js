import React from 'react';
import epochTimeConverter from '../../utils/epoch_time_converter';
import trimName from '../../utils/trim_name';
import './schedule_card.scss';

function ScheduleCard(props) {
  return (
    <div className='container cards'>
      <div className='row row-cols-1 cards__row'>
        {props.list.map((anime) => (
          <div className='card schedule__card col'>
            <div className='row g-0'>
              <div className='col-4 schedule__card__col'>
                <img src={anime.artwork} alt='animeimage' className='schedule__card__img' />
              </div>
              <div className='col-8 schedule__card__col'>
                <div className='card-body'>
                  <span className='schedule__card__date'>{epochTimeConverter(anime.airingDate)}</span><br />
                  <span className='schedule__card__text'>{anime.name}</span><br />
                  <span className='schedule__card__synopsis'>{anime.synopsis}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScheduleCard;
