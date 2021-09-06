import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './library_card.scss';

const LibraryCard = (props) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }}>
      <Link to={`${props.base}${props.anime.gotoURL}`} className='card library_card' key={props.anime.gotoURL}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 1.2 }}
          transition={{ duration: 0.5 }}
        >
          <img src={props.anime.artwork} className='library_card__img fluid-img' alt='props.animeImg' />
          {props.showNumber ? (
            <div className='card__eposide row'>
              <span className='card__eposide__num text-center'>Ep.{props.anime.episodeNumber}</span>
            </div>
          ) : null}
          <div className='library_card__txt_div'>
            <span className='library_card__txt'>{props.anime.name}</span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default LibraryCard;
