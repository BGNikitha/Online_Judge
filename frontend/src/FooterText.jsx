// FooterText.js

import React from 'react';
import { useLocation } from 'react-router-dom';
import './FooterText.css'; // Import the CSS file for styling

const FooterText = () => {
    const location = useLocation();
  
    // List of paths where you want to display "nikitha"
    const pathsToShowNikitha = ['/', '/login', '/register'];
  
    // Check if current path is in pathsToShowNikitha
    if (pathsToShowNikitha.includes(location.pathname)) {
      return (
        <div className="footer-text">
          nikitha
        </div>
      );
    }
  
    return null; // Hide footer text for other paths
  };
  
  export default FooterText;