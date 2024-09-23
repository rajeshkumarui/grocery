// LocationPopup.js
import React, { useState, useRef, useContext } from "react";
import { PopupContext } from "../contexts/PopupContext";
import { LocationContext } from "../contexts/LocationContext";
import "./LocationPopup.css";
import "./Popup.css";
import OrImage from "./assets/or-image-loginscreen.png";

const LocationPopup = () => {
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [validPin, setValidPin] = useState(true);
  const [error, setError] = useState("");
  const [errorDetect, setErrorDetect] = useState("");
  const [errorPin, setErrorPin] = useState("");
  const {popupClosed} = useContext(PopupContext);
  const { updateLocation } = useContext(LocationContext);
  const proceedRef = useRef();
  const pincodeRef = useRef();
  const handlePincodeChange = (e) => {
    const value = e.target.value;
    const inputPinVal = `https://api.postalpincode.in/pincode/${value}`;
   // console.log("input val is ", inputPinVal);
    if (/^\d{0,6}$/.test(value)) {
      setPincode(value);

      if (value.length !== 6) {
        setErrorPin("Please enter valid pincode");
        proceedRef.current.classList.value = "disable";
      } else {
        setErrorPin(" ");
        proceedRef.current.classList.value = "proceed";

        try {
          fetch(inputPinVal)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              if (data[0].PostOffice === null) {
                setErrorPin("Please enter valid pincode");
                setValidPin(false);
                return false;
              } else {
                const newCity = data[0].PostOffice[0].District;
                setValidPin(true);
                return setCity(newCity);
              }
            });
        } catch (e) {
          console.log("Error", e);
        }
      }
    }
  };

  const handleProceed = () => {
    //console.log("pincodes", pincode);
    if (pincode && validPin) {
      updateLocation(city);
      popupClosed();
    } else {
      setError(
        "There is no delivery in this location, please choose a different location!"
      );
    }
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        // Assuming a reverse geocoding API call is made here to get the city name
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            const detectedCity = data.address.state_district; // Mocked city name
            updateLocation(detectedCity);
            //console.log('detect city',  detectedCity)
            popupClosed();
          }).catch((error)=>{
            console.log('error', error);
          });
      });
    } else {
      setError("Geolocation is not supported by this browser.");
    }

    function handlePermission() {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          report(result.state);
        } else if (result.state === "prompt") {
          report(result.state);      
        } else if (result.state === "denied") {
          //report(result.state);
          setErrorDetect('Location access denied, please change in browser settings');
        }
        result.addEventListener("change", () => {
          report(result.state);
        });
      });
    }
    
    function report(state) {
      console.log(`Permission ${state}`);
    }
    
    handlePermission();
    
  };

  return (
    <div className="location-content">
      <button className="close-btn" onClick={popupClosed}>
        <span></span>
      </button>
      <p>Location {city}</p>
      <h3>Select your delivery location</h3>
      <div className="inpur-area">
        <p>Location</p>
        <input
          type="text"
          placeholder="Enter your pincode"
          value={pincode}
          onChange={handlePincodeChange}
          maxLength="6"
          ref={pincodeRef}
        />
        {errorPin && <p className="error-message">{errorPin}</p>}
      </div>
      <div className="proceed-area">
        <button onClick={handleProceed} ref={proceedRef} className="disable">
          Proceed
        </button>

        {error && (
          <div className="error-block">
            <span className="icon-error"></span>
            <p className="error-message">{error}</p>
          </div>
        )}

        <img src={OrImage} alt="or image" />
        <button className="detect-location-btn" onClick={detectLocation}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
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
          Detect my location
        </button>
        {errorDetect && (
            <p className="error-message">{errorDetect}</p>
        )}
      </div>
    </div>
  );
};

export default LocationPopup;
