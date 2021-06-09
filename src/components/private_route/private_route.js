import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { getUserToken, isLoggedIn } from '../../utils/state_manager';
import SideBar from '../side_bar/side_bar';
import NavBar from '../nav_bar/nav_bar';

export default function PrivateRoute({ children, ...rest }) {
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn()) {
      history.push({ pathname: '/' });
    }
  }, []);

  return (
    <>
      <NavBar />
      <SideBar />
      <Route {...rest} render={() => children} />
    </>
  );
}
