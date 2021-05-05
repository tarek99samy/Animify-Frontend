import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { userContext } from '../../context/user_context';
import './login.scss';

const Login = (props) => {
  const [data, setData] = useState({
    userIdentifier: '',
    password: ''
  });
  const { state, dispatch } = useContext(userContext);

  useEffect(() => {
    if (state.isLoggedIn) {
      return <Redirect to='/' />;
    }
  }, []);

  const handleFieldChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
  };

  return (
    <div className='login'>
      <span className='login__title'>Welcome back</span>
      <form className='container login__form' onSubmit={handleSubmit}>
        <div className='row login__form__row'>
          <div className='col-xl-6 col-lg-6 col-md-9 col-sm-12 col-xs-12'>
            <input
              type='text'
              className='form-control'
              placeholder='Username or Email'
              name='userIdentifier'
              minLength='2'
              required
              onChange={handleFieldChange}
            />
          </div>
        </div>

        <div className='row login__form__row'>
          <div className='col-xl-6 col-lg-6 col-md-9 col-sm-12 col-xs-12'>
            <input
              type='password'
              placeholder='Password'
              className='form-control'
              autoComplete='new-password'
              name='password'
              minLength='8'
              required
              onChange={handleFieldChange}
            />
          </div>
        </div>

        <div className='row login__form__row'>
          <input type='submit' className='btn login__form__submit col-4 col-lg-2 col-md-2' value='Login' />
        </div>
      </form>
    </div>
  );
};

export default Login;
