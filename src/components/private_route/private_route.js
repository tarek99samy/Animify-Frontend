import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { userContext } from '../../context/user_context';

export default function PrivateRoute({ children, ...rest }) {
  const [state, dispatch] = useContext(userContext);

  return (
    <Route
      {...rest}
      render={() => {
        return state.isLoggedIn ? children : <Redirect to='/login' />;
      }}
    />
  );
}
