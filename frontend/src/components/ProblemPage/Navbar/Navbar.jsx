import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './Navbar.module.css';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const NavBar = ({ setSelectedOption }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setLogin] = useState(false);
  const [isAdmin, setAdmin] = useState(false); // State to track admin status

  // Function to check login status and admin role
  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/user/isLogin`, { withCredentials: true });
      console.log('Login Response:', res);
      if (res.status === 200) {
        setLogin(true);
        console.log('User Role:', res.data.role); // Log the user role to verify
        if (res.data.role === 'admin') {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
      } else {
        setLogin(false);
        setAdmin(false);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      setLogin(false);
      setAdmin(false);
    }
  };
  

  useEffect(() => {
    checkLoginStatus();
  }, [location]);

  const handleLogout = async () => {
    const confirmation = window.confirm("Are you sure you want to Logout?");
    if (confirmation) {
      try {
        await axios.get(`${SERVER_URL}/user/logout`, { withCredentials: true });
        navigate('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  };

  return (
    <div className={styles.navbar}>
      <button onClick={() => setSelectedOption('problemList')}>Problem List</button>
      {isLogin && isAdmin && (
        <button onClick={() => navigate('/admin')}>Admin</button>
      )}
      {isLogin && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
  
};

export default NavBar;
