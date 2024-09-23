// LocationContext.js
import React, { createContext, useState } from 'react';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null); // Can store city name like 'Delhi', 'Mumbai', etc.
  const updateLocation = (city) => {
    setLocation(city);
  };

  return (
    <LocationContext.Provider value={{ location, setLocation, updateLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
