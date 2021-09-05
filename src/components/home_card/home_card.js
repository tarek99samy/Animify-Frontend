import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LibraryCard from '../library_card/library_card';
import './home_card.scss';

const HomeCard = (props) => {
  return (
    <div className='container-fluid home-cards mt-3'>
      <div className='d-flex justify-content-between'>
        <span className='home-cards__title ml-4 mt-3'>{props.name}</span>
        {props.showSeeMore !== false ? (
          <Link to={props.route}>
            <motion.div whileHover={{ scale: 1.1 }}>
              <span className='home-cards__more mt-3'>View More</span>
            </motion.div>
          </Link>
        ) : null}
      </div>
      <div className='row home-cards__wrapper card-group'>
        {props.list.map((anime) => (
          <LibraryCard anime={anime} base={props.base} showNumber={false} key={anime.gotoURL} />
        ))}
      </div>
    </div>
  );
};

export default HomeCard;
