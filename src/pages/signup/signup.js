import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { userContext } from '../../context/user_context';
import { API_BASE_URL } from '../../utils/consts';
import './signup.scss';

const SignUp = () => {
  const [data, setData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showErrors, setShowErrors] = useState([false, false, false]);
  const { state } = useContext(userContext);
  let history = useHistory();

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
    const emailRegExp = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/);
    const passwordRegExp = new RegExp(/^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,50}$/);
    const validation = [
      !emailRegExp.test(data.email),
      !passwordRegExp.test(data.password),
      data.password !== data.confirmPassword
    ];
    console.log(data);
    setShowErrors(validation);
    if (validation.includes(true)) {
      return;
    }
    delete data.confirmPassword;

    axios
      .post(`${API_BASE_URL}/user`, data)
      .then((response) => {
        console.log(response);
        history.push({ pathname: '/login' });
      })
      .catch((error) => {
        console.log(error);
        alert('An error occured, try again in a while');
      });
  };

  return (
    <div className='signup'>
      <span className='signup__title'>Sign Up to Animify</span>
      <form className='container signup__form' onSubmit={handleSubmit}>
        <div className='row signup__form__row'>
          <div className='col-xl-6 col-lg-6 col-md-9 col-sm-12 col-xs-12'>
            <input
              type='text'
              className='form-control'
              placeholder='User Name'
              name='username'
              minLength='2'
              required
              onChange={handleFieldChange}
            />
          </div>
        </div>

        <div className='row signup__form__row'>
          <div className='col-xl-6 col-lg-6 col-md-9 col-sm-12 col-xs-12'>
            <input
              type='text'
              className='form-control'
              placeholder='First Name'
              name='firstName'
              minLength='2'
              required
              onChange={handleFieldChange}
            />
          </div>
        </div>

        <div className='row signup__form__row'>
          <div className='col-xl-6 col-lg-6 col-md-9 col-sm-12 col-xs-12'>
            <input
              type='text'
              className='form-control'
              placeholder='Last Name'
              name='lastName'
              minLength='2'
              required
              onChange={handleFieldChange}
            />
          </div>
        </div>

        <div className='row signup__form__row'>
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
          {showErrors[0] ? <span className='col-9 signup__form__error'>* Invalid email</span> : null}
        </div>

        <div className='row signup__form__row'>
          <div className='col-xl-6 col-lg-6 col-md-9 col-sm-12 col-xs-12'>
            <input
              type='password'
              placeholder='Password'
              className='form-control'
              autoComplete='new-password'
              name='password'
              required
              onChange={handleFieldChange}
            />
          </div>
          {showErrors[1] ? (
            <span className='col-9 signup__form__error'>
              * Password must be at least 8 charachters, one lower case letter, one upper case letter, and one digit
            </span>
          ) : null}
        </div>

        <div className='row signup__form__row'>
          <div className='col-xl-6 col-lg-6 col-md-9 col-sm-12 col-xs-12'>
            <input
              type='password'
              placeholder='Confirm password'
              className='form-control'
              autoComplete='new-password'
              name='confirmPassword'
              required
              onChange={handleFieldChange}
            />
          </div>
          {showErrors[2] ? <span className='col-9 signup__form__error'>* The two passwords does not match</span> : null}
        </div>

        <div className='row signup__form__row'>
          <input type='submit' className='btn signup__form__submit col-4 col-lg-2 col-md-2' value='Sign Up' />
        </div>

        <div className='row signup__form__row'>
          <span className='col-9 signup__form__error'>
            Already have an account?{' '}
            <Link to='/login' className='col-9 signup__form__redirection'>
              Login
            </Link>{' '}
            now
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
