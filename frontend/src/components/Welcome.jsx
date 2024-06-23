import React from 'react';
import { Link } from 'react-router-dom';
import './welcome.css'; 

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-message">
        <h2>Welcome to Online Judge!</h2>
        <p>This website is to solve coding questions and check against test cases.</p>
      </div>
      <nav>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </nav>
    </div>
  );
};

export default Welcome;
