import React, {useContext} from 'react';
import { UserContext } from '../contexts/UserContext';
import { PopupContext } from '../contexts/PopupContext';

const LoginRegisterOnHover = () => {
    const { isUserLoggedIn, setUser, setErrors, setSignInUser } = useContext(UserContext);
    const { showPopup } = useContext(PopupContext);
    const handleRegisterClick = () => {
        showPopup('register');
        setUser({});
        setErrors({});
    }
    const handleLoginClick = () => {
        showPopup('login');
        setSignInUser({});
        setErrors({});
    }
    return ( 
        <div className='login-register'>
            <div className='login-content'>
                <button onClick={handleLoginClick} className='login-btn'>Login</button>
            </div>
            <div className='register-content'>
                <p>New to ITC E-store?</p>
                <button onClick={!isUserLoggedIn ? handleRegisterClick : ()=> false} className='register-btn'>Create account</button>
            </div>
        </div>
    );
  };

  export default LoginRegisterOnHover;