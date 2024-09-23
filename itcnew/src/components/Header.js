import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../contexts/UserContext";
import { CartContext } from "../contexts/CartContext";
import { PopupContext } from "../contexts/PopupContext";
import { WishlistContext } from "../contexts/WishlistContext";
import { Link, useNavigate } from "react-router-dom";
import LoginPopup from "./login/LoginPopup";
import RegisterPopup from "./register/RegisterPopup";
import LocationPopup from "./LocationPopup";
import LoginRegisterOnHover from "./LoginRegisterOnHover";
import "./Header.css";
import ItcLogo from "./assets/itc-logo.svg";
import { LocationContext } from "../contexts/LocationContext";

const Header = () => {
  const { activePopup, popupClosed, showPopup } = useContext(PopupContext);
  const { cartItems, setCartItems } = useContext(CartContext);
  const { wishlist, clearWishlist } = useContext(WishlistContext);
  const { user, isUserLoggedIn, setUserLoggedIn, setUser } = useContext(UserContext);
 const {updateLocation, location, setLocation} = useContext(LocationContext)
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const loginRef = useRef();
  const registerRef = useRef();
  const locationRef = useRef();
  const navigate = useNavigate();

  const logout = () => {
    setUser({});
    setCartItems([]);
    setUserLoggedIn(false);
    clearWishlist();
  };

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };
  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

 

  // Display Location Popup if location is not set
  useEffect(() => {
    // if (!location) {
    //openLocationPopup();
    // } //else {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
     // console.log(latitude, longitude);
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setLocation(data.address.state_district);
        });
    });
    // }
  }, []);

  // Close popups on click outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        activePopup &&
        loginRef.current &&
        !loginRef.current.contains(event.target)
      ) {
        popupClosed();
      }
      if (
        activePopup &&
        registerRef.current &&
        !registerRef.current.contains(event.target)
      ) {
        popupClosed();
      }
      if (
        activePopup &&
        locationRef.current &&
        !locationRef.current.contains(event.target)
      ) {
        popupClosed();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [activePopup, popupClosed]);

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={ItcLogo} alt="logo image" />
        </Link>
      </div>
      <div className="location" onClick={() => showPopup("location")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="20"
          viewBox="0 0 18 24"
        >
          <g id="Location" transform="translate(-5470 3740)">
            <path
              id="pin_drop_FILL1_wght400_GRAD0_opsz48"
              d="M19.5,28a32.81,32.81,0,0,1-6.783-7.185A12.4,12.4,0,0,1,10.5,14.067a10.851,10.851,0,0,1,.817-4.359,9.88,9.88,0,0,1,2.117-3.155,8.737,8.737,0,0,1,2.9-1.915,8.174,8.174,0,0,1,6.333,0,8.737,8.737,0,0,1,2.9,1.915,9.881,9.881,0,0,1,2.117,3.155,10.851,10.851,0,0,1,.817,4.359,12.4,12.4,0,0,1-2.217,6.748A32.81,32.81,0,0,1,19.5,28Zm0-11.6a2.156,2.156,0,0,0,1.65-.748,2.727,2.727,0,0,0,0-3.611,2.194,2.194,0,0,0-3.3,0,2.727,2.727,0,0,0,0,3.611A2.156,2.156,0,0,0,19.5,16.4Z"
              transform="translate(5459.5 -3744)"
              fill="#FF715B"
            ></path>
            <circle
              id="Ellipse_117"
              data-name="Ellipse 117"
              cx="3"
              cy="3"
              r="3"
              transform="translate(5476 -3733)"
              fill="#fff"
            ></circle>
          </g>
        </svg>
        <span>{location}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
        >
          <defs>
            <clipPath id="clip-path">
              <rect
                id="Rectangle_781"
                data-name="Rectangle 781"
                width="12"
                height="12"
                transform="translate(5181 -3644)"
                fill="#fff"
              ></rect>
            </clipPath>
          </defs>
          <g
            id="Chevron"
            transform="translate(-5181 3644)"
            clipPath="url(#clip-path)"
          >
            <path
              id="arrow"
              d="M0,0,4.566,4,9,0"
              transform="translate(5182.5 -3639.5)"
              fill="none"
              stroke="#2e396a"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2.5"
            ></path>
          </g>
        </svg>
      </div>
      <div
        className="user-icon"
        onMouseEnter={!isUserLoggedIn ? handleMouseEnter : () => false}
        onMouseLeave={handleMouseLeave}
      >
        <span className="guest-text">
          {isUserLoggedIn ? (
            <span className="loggedin-text">Hi, {user.name}</span>
          ) : (
            "Welcome Guest!"
          )}
        </span>
        {isDropdownVisible && <LoginRegisterOnHover />}
      </div>
      <div className="wishlist-wrapper">
          <div className="wishlist-icon" onClick={()=> {
            {isUserLoggedIn ? navigate("/wishlist") : showPopup('login')}
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <defs>
                <clipPath id="clip-path">
                  <rect
                    id="Rectangle_802"
                    data-name="Rectangle 802"
                    width="24"
                    height="24"
                    transform="translate(3977)"
                    fill="#fff"
                  ></rect>
                </clipPath>
              </defs>
              <g id="Heart" transform="translate(-3977)">
                <path
                  id="Path_3451"
                  data-name="Path 3451"
                  d="M12.063,16.286a8.086,8.086,0,0,1,4.089-2.562,6.541,6.541,0,0,1,6.662,2.463,6.028,6.028,0,0,1,.26,6.8,9.327,9.327,0,0,1-1.3,1.532q-4.322,4.2-8.678,8.361c-.934.9-1.187.9-2.118,0C7.883,29.891,4.744,26.945,1.714,23.9a5.8,5.8,0,0,1-.564-7.585,6.581,6.581,0,0,1,9.737-1.1c.377.324.734.668,1.176,1.072"
                  transform="translate(3977 -11.551)"
                  fill="#ff715b"
                ></path>
              </g>
            </svg>
            <span>{wishlist.length}</span>
          </div>
      </div>
      <div className="cart">
        <Link to="/cart">
          <svg
            width="24"
            height="24"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86"
              fill="#ff715b"
            ></path>
          </svg>
          <span>{cartCount}</span>
        </Link>
      </div>
      {/* {activePopup === 'login' && <Login />} */}
      {activePopup === "login" && (
        <div className="popup login-popup">
          <div className="popup-inner" ref={loginRef}>
            <LoginPopup />
          </div>
        </div>
      )}
      {activePopup === "register" && (
        <div className="popup register-popup">
          <div className="popup-content" ref={registerRef}>
            <RegisterPopup />
          </div>
        </div>
      )}
      {activePopup === "location" && (
        <div className="popup location-popup">
          <div className="popup-inner" ref={locationRef}>
            <LocationPopup />
          </div>
        </div>
      )}
      <div className="logout-text" onClick={logout}>
        <span> {isUserLoggedIn ? `Logout` : " "} </span>
      </div>
    </header>
  );
};

export default Header;
