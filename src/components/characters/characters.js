import React from 'react';
import './characters.scss';
import { motion } from 'framer-motion';

const Characters = ({ actors }) => {
  return (
    <div className='container-fluid characters'>
      <div className='row characters__title'>Characters</div>
      <div className='characters__content'>
        {actors.map((actor, index) => (
          <motion.div className='characters__content__actor' key={index} whileHover={{ scale: 1.1 }}>
            <motion.img
              src={actor.avatar}
              alt=''
              className='characters__content__actor__img skeleton'
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            />
            <span className='col-2 characters__content__actor__name'>{`${
              actor.charachterName.first ? actor.charachterName.first : ''
            } ${actor.charachterName.last ? actor.charachterName.last : ''}`}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Characters;
