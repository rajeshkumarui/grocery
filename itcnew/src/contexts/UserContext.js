// UserContext.js
import React, { createContext, useState } from "react";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  
  const closePopup = () => {
    setShowLoginPopup(false);
    setShowRegisterPopup(false);
  };

  const handleRegisterClick = () => {
    setShowRegisterPopup(true);
  };

  const handleLoginClick = () => {
    setShowLoginPopup(true);
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const validateFormResgister = () => {
    let formErrors = {};

    if (!user.name) {
      formErrors.name = "Name is required";
    }

    if (!user.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      formErrors.email = "Email is invalid";
    }

    if (!user.password) {
      formErrors.password = "Password is required";
    } else if (user.password.length < 4) {
      formErrors.password = "Password must be at least 4 characters long";
    }

    if (!user.reEnterPassword) {
      formErrors.reEnterPassword = "Please re-enter your password";
    } else if (user.password !== user.reEnterPassword) {
      formErrors.reEnterPassword = "Passwords do not match";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const [signInUser, setSignInUser] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let formErrors = {};
    if (!signInUser.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signInUser.email)) {
      formErrors.email = "Email is invalid";
    }

    if (!signInUser.password) {
      formErrors.password = "Password is required";
    } else if (signInUser.password.length < 4) {
      formErrors.password = "Password must be at least 4 characters long";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const signInHandleChange = (e) => {
    const { name, value } = e.target;
    setSignInUser({
      ...signInUser,
      [name]: value,
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        handleChange,
        validateFormResgister,
        setShowLoginPopup,
        setShowRegisterPopup,
        closePopup,
        showRegisterPopup,
        showLoginPopup,
        handleRegisterClick,
        handleLoginClick,
        signInHandleChange,
        signInUser,
        setSignInUser,
        errors,
        validateForm,
        setErrors,
        isUserLoggedIn,
        setUserLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
