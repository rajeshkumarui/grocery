// PopupContext.js
import React, { createContext, useState } from 'react';

export const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [activePopup, setActivePopup] = useState(null);

  const showPopup = (popupName) => setActivePopup(popupName);
  const popupClosed = () => setActivePopup(null);

  return (
    <PopupContext.Provider value={{ activePopup, showPopup, popupClosed }}>
      {children}
    </PopupContext.Provider>
  );
};
