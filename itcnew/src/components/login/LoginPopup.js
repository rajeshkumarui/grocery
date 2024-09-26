// LoginPopup.js
import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { PopupContext } from "../../contexts/PopupContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Popup.css";
import "../register/register.css";
import "./login.css";

const LoginPopup = () => {
  const {
    signInHandleChange,
    signInUser,
    errors,
    setSignInUser,
    validateForm,
    setUser,
    user,
    setUserLoggedIn,
  } = useContext(UserContext);
  const { popupClosed, showPopup } = useContext(PopupContext);
  const navigate = useNavigate();  
  const login = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios.post("https://grocery-server-mu.vercel.app/login", signInUser).then((res) => {
        const userResponse = res.data;
        if (userResponse.status === 401){
          alert('Incorrect password!!');
          return false
        }
        if (userResponse.status === 404){
          alert('Incorrect Email!!');
          return false
        }
        else {
          setUser({
            ...user,
            name: userResponse.user.name,
          });
          alert(userResponse.message);
          setSignInUser({});
         // setShowLoginPopup(false);
          popupClosed();
          navigate("/");
          setUserLoggedIn(true);
        }
      });
    }
  };


  return (
    
        <div className="login">
          <button className="close-btn" onClick={popupClosed}>
            <span></span>
          </button>
          <h2>Already a customer?</h2>
          <div className={`form-group ${errors.email ? "error" : ""}`}>
            <input
              type="text"
              name="email"
              value={signInUser.email}
              onChange={signInHandleChange}
              placeholder="Enter your Email"
            ></input>
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          <div className={`form-group ${errors.password ? "error" : ""}`}>
            <input
              type="password"
              name="password"
              value={signInUser.password}
              onChange={signInHandleChange}
              placeholder="Enter your Password"
            ></input>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          <div className="button" onClick={login}>
            Login
          </div>
          <div>New to ITC E-Store?</div>
          <div
            className="button"
            onClick={() => {
              showPopup('register')
            }}
          >
            Register
          </div>
        </div>
  );
};

export default LoginPopup;
