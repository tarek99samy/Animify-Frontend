import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { getUserToken } from '../../utils/state_manager';
import SideBar from '../side_bar/side_bar';
import NavBar from '../nav_bar/nav_bar';

export default function PrivateRoute({ children, ...rest }) {
  const history = useHistory();

  useEffect(() => {
    if (getUserToken().length > 0) {
      history.push({ pathname: '/' });
    }
  }, []);

  return (
    <>
      <NavBar />
      {!rest.path.includes('/anime-info') ? <SideBar /> : null}
      {/* <SideBar /> */}
      <Route {...rest} render={() => children} />
    </>
  );
}
