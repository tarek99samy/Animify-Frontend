import React, { useState, useEffect } from 'react';

import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

import { Link, useLocation } from 'react-router-dom';
import { isLoggedIn, logout } from '../../utils/state_manager';
import SideBarElement from './side_bar_element';
import hideBars from '../../utils/hideBars';
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
  }
];

const sideBarList = items.map((item) => {
  return <SideBarElement item={item} key={item.name} />;
});

function SideBar() {
  const [hideValue, setHideValue] = useState('');
  const [isToggled, setToggleValue] = useState(false);
  const location = useLocation();

  // return (

  // );

  // useEffect(() => {
  //   setHideValue(hideBars(location.pathname));
  // }, [location]);
  /*
  return (
    <div className={`sidebar flex-column ${hideValue}`}>
      <div>
        <Link to='/'>
          <h4 className='sidebar__title'>Animify</h4>
        </Link>
      </div>
      <ul className='nav flex-column sidebar__list'>
        {sideBarList}
        {isLoggedIn() ? (
          <>
            <SideBarElement
              item={{
                name: 'Library',
                icon: 'fa fa-bookmark sidebar__item__icon',
                route: '/library'
              }}
            />
            <SideBarElement
              item={{
                name: 'Settings',
                icon: 'fa fa-cog sidebar__item__icon',
                route: '/settings'
              }}
            />
            <li className='nav-item sidebar__item'>
              <Link to='/' className='nav-link sidebar__item__link' onClick={() => logout()}>
                <i className='fa fa-sign-out-alt sidebar__item__icon'></i>
                <span className='sidebar__item__text'>Logout</span>
              </Link>
            </li>
          </>
        ) : null}
      </ul>
    </div>
  );
  */
  return 'hi';
}

export default SideBar;
