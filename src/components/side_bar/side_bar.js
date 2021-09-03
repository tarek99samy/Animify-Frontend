import React, { useState, useEffect } from 'react';

import { alpha, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Link, useLocation } from 'react-router-dom';
import { isLoggedIn, logout, getSideBarState, getSideBarWidth } from '../../utils/state_manager';
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

    minHeight: '100vh',
    color: 'white'
  },
  drawer: {},
  purpleColor: {
    color: '#8d5af6'
  }
});

function SideBar() {
  const classes = useStyles();

  const [hideValue, setHideValue] = useState('');
  const [isToggled, setToggleValue] = useState(true);
  const location = useLocation();

  window.addEventListener('storage', () => {
    setToggleValue(getSideBarState());
    // console.log('isToggled ', isToggled);
  });
  // return (

  // );
  // useEffect(() => {

  // });
  // useEffect(() => {
  //   setHideValue(hideBars(location.pathname));
  // }, [location]);

  const list = () => (
    <div className={classes.list} role='presentation'>
      <h1 className='text-center p-2'>Animify</h1>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon className={classes.purpleColor}>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon className={classes.purpleColor}>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    /*  <div className={`sidebar flex-column ${hideValue}`}>
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
            </div>  */
    <div>
      {
        <React.Fragment key='left'>
          <Drawer anchor='left' className={classes.drawer} open={isToggled} variant='persistent'>
            {list()}
          </Drawer>
        </React.Fragment>
      }
    </div>
  );
}

export default SideBar;
