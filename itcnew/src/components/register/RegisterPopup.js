// RegisterPopup.js
import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { PopupContext } from "../../contexts/PopupContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Popup.css";
import "./register.css";

const RegisterPopup = () => {
  const {
    user,
    handleChange,
    errors,
    validateFormResgister,
    setUserLoggedIn,
    setSignInUser,
  } = useContext(UserContext);
  const { popupClosed, showPopup } = useContext(PopupContext);

  const navigate = useNavigate();

  const register = () => {
    const { name, email, password, reEnterPassword } = user;
    if (validateFormResgister()) {
      if (name && email && password && (password === reEnterPassword)) {
        axios.post("http://localhost:9002/register", user).then((res) => {
          if (res.status === 201) {
            alert(res.data.message);
            setSignInUser({});
           // closePopup();
           popupClosed();
            navigate("/");
            setUserLoggedIn(true);
          } else {
            alert("user is already registered");
          }
        });
      } else {
        alert("invlid input");
      }
    }
  };

  return (
    
        <div className="register">
          <button className="close-btn" onClick={popupClosed}>
            <span></span>
          </button>
          {console.log("User", user)}
          <h2>Create an account</h2>
          <div className={`form-group ${errors.name ? "error" : ""}`}>
            <input
              type="text"
              name="name"
              value={user.name}
              placeholder="Your Name"
              onChange={handleChange}
            ></input>
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>
          <div className={`form-group ${errors.email ? "error" : ""}`}>
            <input
              type="text"
              name="email"
              value={user.email}
              placeholder="Your Email"
              onChange={handleChange}
            ></input>
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          <div className={`form-group ${errors.password ? "error" : ""}`}>
            <input
              type="password"
              name="password"
              value={user.password}
              placeholder="Your Password"
              onChange={handleChange}
            ></input>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          <div
            className={`form-group ${errors.reEnterPassword ? "error" : ""}`}
          >
            <input
              type="password"
              name="reEnterPassword"
              value={user.reEnterPassword}
              placeholder="Re-enter Password"
              onChange={handleChange}
            ></input>
            {errors.reEnterPassword && (
              <p className="error-text">{errors.reEnterPassword}</p>
            )}
          </div>
          <div className="button" onClick={register}>
            Register
          </div>
          <div>or</div>
          <div
            className="button"
            onClick={() => {
              showPopup('login')
            }}
          >
            Login
          </div>
        </div>
  );
};

export default RegisterPopup;
