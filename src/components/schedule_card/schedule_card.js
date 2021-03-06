import React from 'react';
import { Link } from 'react-router-dom';
import { getUserList } from '../../utils/state_manager';
import epochTimeConverter from '../../utils/epoch_time_converter';
import './schedule_card.scss';

function ScheduleCard({ anime }) {
  return (
    <Link to={`/anime-info/${getUserList()}/${anime.gotoURL}`} className='card schedule__card col'>
      <div>
        <div className='row g-0'>
          <div className='col-4 schedule__card__col'>
            <img src={anime.artwork} alt='animeimage' className='schedule__card__img' />
            <div className='schedule__card__eposide row'>
              <span className='text-center'>Ep.{anime.episodeNumber}</span>
            </div>
          </div>
          <div className='col-8 schedule__card__col'>
            <div className='card-body'>
              <span className='schedule__card__date'>{epochTimeConverter(anime.airingDate)}</span>
              <br />
              <span className='schedule__card__text'>{anime.name}</span>
              <br />
              <span className='schedule__card__synopsis'>{anime.synopsis}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ScheduleCard;
