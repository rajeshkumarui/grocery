import React from 'react';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found-container">
            <h1>404</h1>
            <p>Oops! The page you are looking for does not exist.</p>
            <a href="/" className="back-home">Go Back to Home</a>
        </div>
    );
};

export default NotFound;