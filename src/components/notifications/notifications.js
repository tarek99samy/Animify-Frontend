/*
eslint jsx-a11y/no-static-element-interactions:0, jsx-a11y/click-events-have-key-events:0,
jsx-a11y/interactive-supports-focus:0 ,jsx-a11y/no-noninteractive-element-interactions:0
*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Divider from '../divider/divider';
import { API_BASE_URL } from '../../utils/consts';
import { getUserToken, isLoggedIn } from '../../utils/state_manager';
import './notifications.scss';

const Notifications = ({ initialCount }) => {
  const [notifications, setNotifications] = useState([]);
  const [notificatiosUnreadCount, setNotificatiosUnreadCount] = useState(initialCount);
  const [notificationsCurrentPage, setNotificationsCurrentPage] = useState(1);
  const [notificationsTotlaPages, setNotificationsTotlaPages] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/notification/get-user-notifications?page=${notificationsCurrentPage}&limit=5`, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`
        }
      })
      .then((response) => {
        let tempCount = 0;
        response.data.items.forEach((element) => {
          tempCount += element.read === false;
        });
        setNotificatiosUnreadCount(tempCount);
        setNotificationsTotlaPages(response.data.meta.totalPages);
      })
      .catch((error) => console.log(error));
  }, [showNotifications]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/notification/get-user-notifications?page=${notificationsCurrentPage}&limit=5`, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`
        }
      })
      .then((response) => {
        setNotifications(response.data.items);
      })
      .catch((error) => console.log(error));
  }, [notificationsCurrentPage]);

  const handleShowNotifications = () => {
    if (showNotifications) setNotificationsCurrentPage(1);
    setShowNotifications(!showNotifications);
  };

  const handleLoadMoreNotifications = () => {
    setNotificationsCurrentPage(notificationsCurrentPage + 1);
  };

  const handleNotificationRead = (notification) => {
    if (!notification.read) {
      axios
        .post(
          `${API_BASE_URL}/notification/set-notification-read?notificationId=${notification.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${getUserToken()}`
            }
          }
        )
        .then((response) => {
          if (response.status === 201) {
            setNotificatiosUnreadCount(notificatiosUnreadCount - 1);
            setShowNotifications(!showNotifications);
            window.location.reload();
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <i className='fa fa-bell navbar__icon fa-lg notifications__bell' onClick={handleShowNotifications}>
        <span className='badge bg-danger notifications__bell__badge'>
          {notificatiosUnreadCount > 9 ? '9+' : notificatiosUnreadCount}
        </span>
      </i>

      {showNotifications ? (
        <ul className='notifications__dropdown'>
          {notifications.map((notification, index) => (
            <div key={index}>
              <li className='notifications__dropdown__item' onClick={() => handleNotificationRead(notification)}>
                <div className='notifications__dropdown__item__content'>
                  <span className='notifications__dropdown__item__content__title'>
                    {notification.title}{' '}
                    <i
                      className={`fas ${
                        notification.read
                          ? 'fa-check-circle notifications__dropdown__item--read'
                          : 'fa-circle notifications__dropdown__item--unread'
                      }`}
                    ></i>
                  </span>
                  <span className='notifications__dropdown__item__content__body'>{notification.body}</span>
                </div>
              </li>
              <Divider fullWidth={1} />
            </div>
          ))}
          <div className='notifications__dropdown__loadmore'>
            {notificationsCurrentPage + 1 <= notificationsTotlaPages ? (
              <span
                className='notifications__dropdown__loadmore__text'
                role='presentation'
                onClick={handleLoadMoreNotifications}
              >
                Load more
              </span>
            ) : (
              <span className='notifications__dropdown__loadmore__text--empty'>No notifications available</span>
            )}
          </div>
        </ul>
      ) : null}
    </>
  );
};

export default Notifications;
