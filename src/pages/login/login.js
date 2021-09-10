import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { isLoggedIn, setGlobalState } from '../../utils/state_manager';
import { API_BASE_URL } from '../../utils/consts';
import './login.scss';

const Login = () => {
  const [data, setData] = useState({
    userIdentifier: '',
    password: ''
  });
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn()) {
      history.push({ pathname: '/' });
    }
  }, []);

  const handleFieldChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${API_BASE_URL}/auth/login`, data)
      .then((response) => {
        axios
          .get(`${API_BASE_URL}/my/account`, {
            headers: {
              Authorization: `Bearer ${response.data.access_token}`
            }
          })
          .then((userData) => {
            setGlobalState({ ...userData.data, token: response.data.access_token });
            history.push({ pathname: '/' });
          })
          .catch(() => {
            alert('An error occured, please try again');
            history.push({ pathname: '/login' });
          });
      })
      .catch(() => {
        alert('An error occured, please try again');
        history.push({ pathname: '/login' });
      });
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

        <div className='row login__form__row'>
          <span className='col-9 login__info'>
            Do not have an account?{' '}
            <Link to='/signup' className='login__redirection'>
              Sign Up
            </Link>{' '}
            now
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
