import React from 'react';
import { Link } from 'react-router-dom';

function sideBarElement({ item }) {
  return (
    <>
      <li className='nav-item sidebar__item'>
        <Link to={item.route} className='nav-link sidebar__item__link'>
          <i className={item.icon}></i>
          <span className='sidebar__item__text'>{item.name}</span>
        </Link>
      </li>
    </>
  );
}

export default sideBarElement;
