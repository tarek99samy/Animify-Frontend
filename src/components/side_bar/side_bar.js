import React from 'react';
import { Link } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';
import { isLoggedIn } from '../../utils/state_manager';
import SideBarElement from './side_bar_element';
import './side_bar.scss';

const items = [
  {
    name: 'Home',
    icon: 'fa fa-home sidebar__item__icon',
    route: '/'
  },
  {
    name: 'Search',
    icon: 'fa fa-search sidebar__item__icon',
    route: '/search'
  },
  {
    name: 'Library',
    icon: 'fa fa-bookmark sidebar__item__icon',
    route: '/library'
  },
  {
    name: 'Settings',
    icon: 'fa fa-cog sidebar__item__icon',
    route: '/settings'
  }
];

const sideBarList = items.map((item, index) => {
  return <SideBarElement item={item} key={index} />;
});
function SideBar() {

  return (
    <div className='sidebar flex-column'>
      <div>
        <Link to='/'>
          <h4 className='sidebar__title'>Animify</h4>
        </Link>
      </div>
      <ul className='nav flex-column sidebar__list'>
        {sideBarList}
        { isLoggedIn()?(

          <li className='nav-item sidebar__item'>
          <Link to='/' className='nav-link sidebar__item__link'>
            <i className='fa fa-sign-out-alt sidebar__item__icon'></i>
            <span className='sidebar__item__text'>Logout</span>
          </Link>
        </li>
        ):null}
      </ul>
    </div>
  );
}

export default SideBar;
