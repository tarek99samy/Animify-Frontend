import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../utils/consts';
import './search_modal.scss';

const SearchModal = ({ searchQuery, id, searchPathName, detailsPath }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_BASE_URL}/${searchPathName}&page=${page}&perPage=3&query=${searchQuery}`)
      .then((response) => {
        console.log(response.data.items);
        setData(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  }, [page, searchQuery, searchPathName]);

  return (
    <div className='modal fade search__modal p-0' id={id} data-bs-backdrop='true'>
      <div className='modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Search results</h5>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>
          <div className='modal-body search__modal__body row'>
            {data.map((item, index) => (
              <a
                href={`/${detailsPath}${Number.isInteger(item.gotoURL) ? '/' : ''}${item.gotoURL}`}
                className='search__modal__body__card col-12 col-sm-4'
                key={index}
              >
                <div className='card'>
                  <img src={item.artwork} className='card-img-top search__modal__body__card__img' alt='artwork' />
                  <div className='card-body'>
                    <span className='search__modal__body__card__title'>{item.name}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
