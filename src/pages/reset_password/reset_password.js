/* eslint no-nested-ternary: "off" */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { getGlobalState } from '../../utils/state_manager';
import { API_BASE_URL } from '../../utils/consts';
import './reset_password.scss';

const ResetPassword = () => {
  const [data, setData] = useState({ email: '', otp: '', password: '' });
  const [resetStage, setResetStage] = useState(1);
  const [state, setState] = useState({});
  const history = useHistory();

  useEffect(() => {
    setState(getGlobalState());
  }, []);

  useEffect(() => {
    if (state.token === '') {
      return <Redirect to='/login' />;
    }
  }, [state]);

  const handleFieldChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const sendOTP = () => {
    axios
      .post(`${API_BASE_URL}/auth/send_reset_otp?email=${data.email}`)
      .then((response) => {
        console.log(response);
        setResetStage(2);
      })
      .catch((error) => {
        console.log(error);
        alert('invalid email');
        setResetStage(1);
      });
  };

  const sendNewPassword = () => {
    axios
      .post(`${API_BASE_URL}/auth/reset_password?email=${data.email}&otp=${data.otp}`, {
        password: data.password
      })
      .then((response) => {
        console.log(response);
        history.push({ pathname: '/login' });
      })
      .catch((error) => {
        console.log(error);
        alert('invalid otp or password');
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (resetStage === 1) {
      sendOTP();
    } else {
      sendNewPassword();
    }
  };

  console.log(state);

  return (
    <div className='reset'>
      <span className='reset__title'>Reset Your Password</span>
      <form className='container' onSubmit={handleSubmit}>
        {resetStage === 1 ? (
          <div className='row reset__row'>
            <div className='col-xl-6 col-lg-6 col-md-9 col-sm-12 col-xs-12'>
              <input
                type='email'
                className='form-control'
                placeholder='email@example.com'
                autoComplete='new-email'
                name='email'
                required
                onChange={handleFieldChange}
              />
            </div>
          </div>
        ) : null}

        {resetStage === 2 ? (
          <>
            <div className='row reset__row'>
              <div className='col-xl-6 col-lg-6 col-md-9 col-sm-12 col-xs-12'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='OTP'
                  autoComplete='new-otp'
                  name='otp'
                  required
                  onChange={handleFieldChange}
                />
              </div>
            </div>

            <div className='row reset__row'>
              <div className='col-xl-6 col-lg-6 col-md-9 col-sm-12 col-xs-12'>
                <input
                  type='password'
                  className='form-control'
                  placeholder='password'
                  autoComplete='new-password'
                  name='password'
                  required
                  onChange={handleFieldChange}
                />
              </div>
            </div>
          </>
        ) : null}

        <div className='row reset__row'>
          <input
            type='submit'
            className='btn reset__submit col-8 col-lg-2 col-md-2'
            value={resetStage === 1 ? 'Send Mail' : 'reset password'}
          />
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
