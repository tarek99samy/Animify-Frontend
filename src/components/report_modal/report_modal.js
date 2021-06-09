import axios from 'axios';
import React, { useState } from 'react';
import { API_BASE_URL } from '../../utils/consts';
import { getUserToken } from '../../utils/state_manager';
import './report_modal.scss';

const ReportModal = ({ url, id }) => {
  const [data, setData] = useState({ title: '', body: '' });

  const handleFieldChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmitReport = (event) => {
    event.preventDefault();
    data.URL = url;
    console.log(data);
    axios
      .post(
        `${API_BASE_URL}/reports/add-report`,
        { report: data },
        { headers: { Authorization: `Bearer ${getUserToken()}` } }
      )
      .then(() => window.location.reload())
      .catch((error) => console.log(error));
  };

  return (
    <div
      className='modal report fade'
      id={id}
      data-bs-backdrop='true'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog report modal-lg'>
        <div className='modal-content'>
          <div className='modal-header report__header'>
            <h6 className='modal-title report__header__title' id='exampleModalLabel'>
              Report Anime to make admins review
            </h6>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>
          <div className='modal-body report__body'>
            <form onSubmit={handleSubmitReport}>
              <div className='mb-3'>
                <label className='col-form-label report__body__label'>Title</label>
                <input
                  type='text'
                  className='form-control report__body__field'
                  name='title'
                  onChange={handleFieldChange}
                />
              </div>
              <div className='mb-3'>
                <label className='col-form-label report__body__label'>Description</label>
                <textarea
                  className='form-control report__body__field'
                  name='body'
                  onChange={handleFieldChange}
                ></textarea>
              </div>
              <div className='mb-3 text-end'>
                <button type='submit' className='btn btn-primary report__body__button'>
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
