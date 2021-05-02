import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { userContext } from '../../context/user_context';

const Login = (props) => {
  const [state, dispatch] = useContext(userContext);
  useEffect(() => {
    if (state.isLoggedIn) {
      return <Redirect to='/' />;
    }
  }, []);
  return (
    <div className='container'>
      <h1>login here</h1>
    </div>
  );
};

export default Login;
