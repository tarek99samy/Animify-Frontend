import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { getGlobalState } from '../../utils/state_manager';

export default function PrivateRoute({ children, ...rest }) {
  const history = useHistory();

  useEffect(() => {
    const currentState = getGlobalState();
    if (currentState.token.length > 0) {
      history.push({ pathname: '/' });
    }
  }, []);

  return <Route {...rest} render={() => children} />;
}
