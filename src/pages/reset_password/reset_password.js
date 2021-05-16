import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { userContext } from '../../context/user_context';
import { API_BASE_URL } from '../../utils/consts';
import './reset_password.scss';

const ResetPassword = (props) => {
  const [email, setEmail] = useState({ email: '' });
  const [message, setMessage] = useState('');
  const { state } = useContext(userContext);

  useEffect(() => {
    if (state.isLoggedIn) {
      return <Redirect to='/' />;
    }
  }, []);

  const handleFieldChange = (event) => {
    setEmail({ email: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email);
    setMessage('An has been sent to you, use the link in the mail to create your new password');
    // axios
    //   .post(`${API_BASE_URL}/auth/reset`, {
    //     data: email
    //   })
    //   .then((response) => {
    //     setMessage("An has been sent to you, use the link in the mail to create your new password")
    //     });
    //   .catch((error) => {
    //     console.log(error);
    //     alert('An error occured, please try again');
    //   });
  };

  return (
    <div className='reset'>
      <span className='reset__title'>Welcome back</span>
      <form className='container' onSubmit={handleSubmit}>
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

        <div className='row reset__row'>
          <input type='submit' className='btn reset__submit col-4 col-lg-2 col-md-2' value='Send Reset Mail' />
        </div>

        <div className='row reset__row'>
          <span className='col-9 reset__message'>{message}</span>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
