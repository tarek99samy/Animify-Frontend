import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScheduleCard from '../schedule_card/schedule_card';
import './scrollable_schedule.scss';

const ScrollableSchedule = (props) => {
  return (
    <div className='container-fluid schedule pt-3'>
      <div className='d-flex justify-content-between'>
        <span className='schedule__title'>This Week</span>
        <Link to={props.route}>
          <motion.div whileHover={{ scale: 1.1 }}>
            <motion.span className='schedule__more pt-4 mr-2'>Show Schedule</motion.span>
          </motion.div>
        </Link>
      </div>
      <div className='schedule__content'>
        {props.list.map((anime) => (
          <ScheduleCard anime={anime} key={anime.gotoURL} />
        ))}
      </div>
    </div>
  );
};

export default ScrollableSchedule;
