import React from 'react';
import { Link } from 'react-router-dom';
import './side_bar.scss';

function SideBar() {
  return (
    <div className='sidebar flex-column'>
      <div>
        <Link to='/'>
          <h4 className='sidebar__title'>Animify</h4>
        </Link>
      </div>
      <ul className='nav flex-column sidebar__list'>
        <li className='nav-item sidebar__item'>
          <Link to='/' className='nav-link sidebar__item__link'>
            <i className='fa fa-home sidebar__item__icon'></i>
            <span className='sidebar_item__text'>Home</span>
          </Link>
        </li>
        <li className='nav-item sidebar__item'>
          <Link to='/search' className='nav-link sidebar__item__link'>
            <i className='fa fa-search sidebar__item__icon'></i>
            <span className='sidebar_item__text'>Search</span>
          </Link>
        </li>
        <li className='nav-item sidebar__item'>
          <Link to='/library' className='nav-link sidebar__item__link'>
            <i className='fa fa-bookmark sidebar__item__icon'></i>
            <span className='sidebar_item__text'>Library</span>
          </Link>
        </li>
        <li className='nav-item sidebar__item'>
          <Link to='/settings' className='nav-link sidebar__item__link'>
            <i className='fa fa-cog sidebar__item__icon'></i>
            <span className='sidebar_item__text'>Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
