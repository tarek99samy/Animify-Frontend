import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { getGlobalState, getUserToken, logout } from '../../utils/state_manager';
import { API_BASE_URL } from '../../utils/consts';
import './settings.scss';

const Settings = () => {
  const [availableServers, setAvailableServers] = useState({ listings: [], sources: [] });
  const [preferences, setPreferences] = useState({ list: 0, source: 0 });
  const [data, setData] = useState({
    email: '',
    username: '',
    firstName: '',
    lastName: ''
  });
  const history = useHistory();

  useEffect(() => {
    const userState = getGlobalState();
    setData({
      email: userState.email,
      username: userState.username,
      firstName: userState.firstName,
      lastName: userState.lastName
    });
    setPreferences({
      list: userState.preferred_list,
      source: userState.preferred_source
    });

    axios
      .get(`${API_BASE_URL}/listings/available-listings`)
      .then((responseList) => {
        axios
          .get(`${API_BASE_URL}/source/available-sources`)
          .then((responseSource) => {
            setAvailableServers({ sources: responseSource.data, listings: responseList.data });
          })
          .catch((errorSource) => console.log(errorSource));
      })
      .catch((errorList) => console.log(errorList));
  }, []);

  const handlePreferenceChange = (event) => {
    setPreferences({ ...preferences, [event.target.name]: event.target.value });
  };

  const handleFieldChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    let failed = false;

    axios
      .put(
        `${API_BASE_URL}/my/edit_preferences?prefType=source`,
        { prefId: preferences.source },
        {
          headers: {
            Authorization: `Bearer ${getUserToken()}`
          }
        }
      )
      .catch(() => {
        failed = true;
      });

    axios
      .put(
        `${API_BASE_URL}/my/edit_preferences?prefType=list`,
        { prefId: preferences.list },
        {
          headers: {
            Authorization: `Bearer ${getUserToken()}`
          }
        }
      )
      .catch(() => {
        failed = true;
      });

    axios
      .put(`${API_BASE_URL}/my/account`, data, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`
        }
      })
      .catch(() => {
        failed = true;
      });

    if (failed) {
      alert('An error occured, please try again later');
    } else {
      alert('Changes saved successfully');
      logout();
      history.push({ pathname: '/login' });
    }
  };

  return (
    <div className='settings'>
      <form onSubmit={handleSubmitEdit}>
        <div className='settings__section'>
          <div className='row settings__row settings__row--title'>Preferences</div>
          <div className='row settings__row'>
            <div className='col-12 col-sm-5 col-md-5 col-xl-4'>
              <label className='form-label'>Prefered Listing</label>
              <select
                name='list'
                className={`form-select ${availableServers.listings.length === 1 ? 'settings__disabled__field' : ''}`}
                onChange={handlePreferenceChange}
                disabled={availableServers.listings.length === 1}
              >
                {availableServers.listings.map((listing, index) => (
                  <option value={listing.value} key={index}>
                    {listing.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='col-12 col-sm-5 col-md-5 col-xl-4'>
              <label className='form-label'>Prefered Source</label>
              <select
                name='source'
                className={`form-select ${availableServers.sources.length === 1 ? 'settings__disabled__field' : ''}`}
                onChange={handlePreferenceChange}
                disabled={availableServers.sources.length === 1}
              >
                {availableServers.sources.map((source, index) => (
                  <option value={source.value} key={index}>
                    {source.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <div className='row settings__row settings__row--title'>Profile</div>
          <div className='row settings__row'>
            <div className='col-12 col-sm-6 col-md-5 col-xl-4'>
              <label className='form-label'>First name</label>
              <input
                type='text'
                name='firstName'
                className='form-control'
                defaultValue={data.firstName}
                minLength='2'
                placeholder='First name'
                onChange={handleFieldChange}
              />
            </div>
            <div className='col-12 col-sm-6 col-md-5 col-xl-4'>
              <label className='form-label'>Last name</label>
              <input
                type='text'
                name='lastName'
                className='form-control'
                defaultValue={data.lastName}
                minLength='2'
                placeholder='Last name'
                onChange={handleFieldChange}
              />
            </div>
          </div>
          <div className='row settings__row'>
            <div className='col-12 col-sm-6 col-md-5 col-xl-4'>
              <label className='form-label'>Email</label>
              <input
                type='email'
                name='email'
                className='form-control'
                defaultValue={data.email}
                placeholder='Email'
                onChange={handleFieldChange}
              />
            </div>
            <div className='col-12 col-sm-6 col-md-5 col-xl-4'>
              <label className='form-label'>User Name</label>
              <input
                type='text'
                name='username'
                className='form-control'
                defaultValue={data.username}
                minLength='2'
                placeholder='User Name'
                onChange={handleFieldChange}
              />
            </div>
          </div>
        </div>

        <div className='row settings__row settings__row--submit'>
          <button type='submit' className='col-9 col-sm-5 col-lg-3 btn '>
            Apply Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
