import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { isLoggedIn } from '../../utils/state_manager';

export default function PrivateRoute({ children, ...rest }) {
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn()) {
      history.push({ pathname: '/' });
    }
  }, []);

  return <Route {...rest} render={() => children} />;
}
