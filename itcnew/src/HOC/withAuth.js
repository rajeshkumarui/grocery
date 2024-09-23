// HOC/withAuth.js
import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { LocationContext } from '../contexts/LocationContext';

const withAuth = (Component) => (props) => {
  const { user } = useContext(UserContext);
  const { location } = useContext(LocationContext);

  if (!user || !location) {
    return <p>Please login and set location to proceed</p>;
  }

  return <Component {...props} />;
};

export default withAuth;
