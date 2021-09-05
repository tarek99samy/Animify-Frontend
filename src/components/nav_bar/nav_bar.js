/* eslint-disable  */
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
import { Link, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

import {
  isLoggedIn,
  getGlobalState,
  getUserToken,
  getUserSource,
  toggleSideBarState,
  setSideBarState,
  getSideBarWidth,
  getSideBarState
} from '../../utils/state_manager';
import { API_BASE_URL } from '../../utils/consts';
import hideBars from '../../utils/hideBars';
import Notifications from '../notifications/notifications';
import './nav_bar.scss';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#3b3b3d',
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '70%'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#8d5af6'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  appBar: {
    backgroundColor: '#222222',
    zIndex: 99,
    position: 'relative'
  },
  purpleColor: {
    color: '#8d5af6'
  }
}));

function NavBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hideValue, setHideValue] = useState('');
  const [searchFoucs, setSearchFocus] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [notificatiosUnreadCount, setNotificatiosUnreadCount] = useState(0);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/notification/get-user-notifications?page=1&limit=5`, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`
        }
      })
      .then((response) => {
        let tempCount = 0;
        response.data.items.forEach((element) => {
          tempCount += element.read === false;
        });
        setNotificatiosUnreadCount(tempCount);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setHideValue(hideBars(location.pathname));
    if (!location.pathname.includes('/search-result')) {
      setSearchQuery('');
    }
  }, [location]);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton className={classes.purpleColor} aria-label='show 11 new notifications' color='inherit'>
          <Badge badgeContent={11} color='secondary'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          className={classes.purpleColor}
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const handleClickOnSearch = (event) => {
    if (event.charCode === 13) {
      if (isLoggedIn()) {
        axios
          .post(
            `${API_BASE_URL}/user-history/user-search-history?query=${searchQuery}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${getUserToken()}`
              }
            }
          )
          .then(() => {})
          .catch((error) => {
            console.error(error);
          });
      }
      history.replace({ pathname: `/search-result/${getUserSource()}/${searchQuery}` });
    }
  };

  useEffect(() => {
    setHideValue(hideBars(location.pathname));
  }, [location]);

  useEffect(() => {
    getSearchHistory();
  }, []);

  const getSearchHistory = () => {
    axios
      .get(`${API_BASE_URL}/user-history/user-search-history?page=1&&limit=5`, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`
        }
      })
      .then((response) => {
        setSearchHistory(response.data.items);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleFieldChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const inputSearchFoucs = (val) => {
    setSearchFocus(val);
  };

  const handleSuggestionCLick = (query, val) => {
    console.log(val);
    inputSearchFoucs('');
    setSearchQuery(val);
    history.replace({ pathname: `/search-result/${getUserSource()}/${query}` });
  };

  const removeHistory = (id) => {
    axios
      .delete(`${API_BASE_URL}/user-history/user-search-history?historyId=${id}`, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`
        }
      })
      .then(() => {
        getSearchHistory();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /*
  return (
    <div className={`${hideValue}`}>
      <div className='navbar d-flex'>
        <div className='mr-auto p-2'>
          <input
            type='search'
            className='navbar__search dropdown-toggle'
            placeholder='Search for animes hi'
            name='searchQuery'
            autoComplete='off'
            onKeyPress={handleClickOnSearch}
            onChange={handleFieldChange}
            onFocus={() => inputSearchFoucs('focused')}
          />
        </div>

        { <ul className={`list-group navbar__search__list ${searchFoucs}`}>
          {searchHistory.map((search, index) => (
            <li
              className='list-group-item navbar__search__list__item'
              onClick={() => handleSuggestionCLick(search.query, search.id)}
              key={index}
            >
              <span>{search.query}</span>
              <i
                className='fa fa-trash navbar__search__list__item__icon'
                onClick={(e) => {
                  e.stopPropagation();
                  removeHistory(search.id);
                }}
              ></i>
            </li>
          ))}
        </ul> }
        {isLoggedIn() ? (
          <div className='navbar__buttons--login p-2'>
            <span className='navbar__username'>{getGlobalState().username}</span>
            <i className='fa fa-user navbar__icon fa-lg navbar__usericon'></i>
            <Notifications initialCount={notificatiosUnreadCount} />
          </div>
        ) : (
          <div className='navbar__buttons--logout p-2'>
            <Link to='/login'>
              <button type='button' className='btn navbar__signbtn'>
                Log In
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
  */
  return (
    <div className='navbar'>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            className={`${classes.menuButton} ${classes.purpleColor} navbar__menubar`}
            color='inherit'
            aria-label='open drawer'
            onClick={() => toggleSideBarState()}
          >
            <MenuIcon />
          </IconButton>

          <motion.div className={classes.search} whileTap={{ scale: 1.1 }}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>

            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </motion.div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <IconButton className={classes.purpleColor} color='inherit'>
              <Badge badgeContent={1} color='secondary'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              className={classes.purpleColor}
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <AccountCircle />
            </IconButton> */}
            {isLoggedIn() ? (
              <div className='navbar__buttons--login'>
                <span className='navbar__username'>{getGlobalState().username}</span>
                <i className='fa fa-user navbar__icon fa-lg navbar__usericon'></i>
                <Notifications initialCount={notificatiosUnreadCount} />
              </div>
            ) : (
              <div className='navbar__buttons--logout'>
                <Link to='/login'>
                  <button type='button' className='btn navbar__signbtn'>
                    Log In
                  </button>
                </Link>
              </div>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              className={classes.purpleColor}
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
export default NavBar;
