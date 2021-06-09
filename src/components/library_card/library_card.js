import React from 'react';
import { Link } from 'react-router-dom';
import './library_card.scss';

const LibraryCard = (props) => {
  return (
    <Link to={`${props.base}${props.anime.gotoURL}`} className='card' key={props.anime.gotoURL}>
      <div>
        <img src={props.anime.artwork} className='card__img fluid-img' alt='props.animeImg' />
        {props.showNumber ? (
          <div className='card__eposide row'>
            <span className='card__eposide__num text-center'>Ep.{props.anime.episodeNumber}</span>
          </div>
        ) : null}
        <div>
          <span className='card__txt'>{props.anime.name}</span>
        </div>
      </div>
    </Link>
  );
};

export default LibraryCard;
