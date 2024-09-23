import React, { useContext, useRef } from "react";
import { UserContext } from "../contexts/UserContext";

const withClosePopup = (Component) => {
  return function EnhancedComponent(props) {
    const { closePopup } = useContext(UserContext);
    const popupRef = useRef(null);

   

    return (
      <Component
        {...props}
        popupRef={popupRef}
        handleOutsideClick={closePopup}
      />
    );
  };
};

export default withClosePopup;
