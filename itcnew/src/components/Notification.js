import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import './Notification.css';

const Notification = () => {
  const { notification, closeNotification } = useContext(CartContext);

  if (!notification) return null;

  return (
        <div className="notification">
            {notification}
            <button className="close-btn" onClick={closeNotification}>X</button>
        </div>
  );
};

export default Notification;
