import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function sideBarElement({ item }) {
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);

  return (
    <>
      <li
        className='nav-item sidebar__item'
        onMouseOver={() => {
          setRotation(rotation + 360);
          setScale(1.1);
        }}
        onMouseLeave={() => setScale(1)}
      >
        <Link to={item.route} className='nav-link sidebar__item__link'>
          <motion.i className={item.icon} animate={{ rotate: rotation, scale: scale }}></motion.i>
          <span className='sidebar__item__text'>{item.name}</span>
        </Link>
      </li>
    </>
  );
}

export default sideBarElement;
