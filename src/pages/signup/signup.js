import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { userContext } from '../../context/user_context';
import './signup.scss';

const SignUp = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showErrors, setShowErrors] = useState([false, false, false]);
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
    const emailRegExp = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/);
    const passwordRegExp = new RegExp(/^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,50}$/);
    const validation = [
      !emailRegExp.test(data.email),
      !passwordRegExp.test(data.password),
      data.password !== data.confirmPassword
    ];
    setShowErrors(validation);
    if (validation.includes(true)) {
      return;
    }
    console.log(data);
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
      </form>
    </div>
  );
};

export default SignUp;
