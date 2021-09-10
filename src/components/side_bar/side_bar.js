import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  isLoggedIn,
  logout,
  getSideBarState,
  getSideBarWidth,
  resetSideBarState,
  setSideBarState
} from '../../utils/state_manager';

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

const useStyles = makeStyles({
  list: {
    width: getSideBarWidth(),

    minHeight: '100%',
    color: 'white'
  },
  drawer: {},
  purpleColor: {
    color: '#8d5af6'
  }
});
let firstTime = true;
function SideBar() {
  const classes = useStyles();

  const [hideValue, setHideValue] = useState('');
  const [isToggled, setToggleValue] = useState(true);
  const [sideBarVarient, setSideBarVarient] = useState('persistent');
  const location = useLocation();

  window.addEventListener('storage', () => {
    setToggleValue(getSideBarState());
  });

  // check first time for state
  if (firstTime && window.innerWidth <= 1000) {
    resetSideBarState();
    setToggleValue(false);
    setSideBarVarient('temporary');
    firstTime = false;
  }
  // listen for window size changes
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 1000) {
      resetSideBarState();
      setToggleValue(false);
      setSideBarVarient('temporary');
    } else {
      setSideBarState();
      setToggleValue(true);
      setSideBarVarient('persistent');
    }
  });

  window.addEventListener('click', (e) => {
    if (window.innerWidth <= 1000 && e.clientX > 250 && isToggled) {
      resetSideBarState();
      setToggleValue(false);
    }
  });

  useEffect(() => {
    setHideValue(hideBars(location.pathname));
  }, [location]);

  const list = () => (
    <div className={classes.list} role='presentation'>
      <div className={`sidebar flex-column ${hideValue}`}>
        <div>
          <Link to='/'>
            <h1 className='text-center p-2'>Animify</h1>
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
    </div>
  );
  return (
    <div>
      <React.Fragment key='left'>
        <Drawer anchor='left' className={classes.drawer} open={isToggled} variant={sideBarVarient}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default SideBar;
