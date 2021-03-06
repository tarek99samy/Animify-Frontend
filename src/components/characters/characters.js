import React from 'react';
import './characters.scss';

const Characters = ({ actors }) => {
  return (
    <div className='container-fluid characters'>
      <div className='row characters__title'>Characters</div>
      <div className='characters__content'>
        {actors.map((actor, index) => (
          <div className='characters__content__actor' key={index}>
            <img src={actor.avatar} alt='' className='characters__content__actor__img' />
            <span className='col-2 characters__content__actor__name'>{`${actor.charachterName.first} ${actor.charachterName.last}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characters;
