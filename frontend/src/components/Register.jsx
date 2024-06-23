import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from './Register.module.css';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${SERVER_URL}/user/register`, user);
      if (res.status === 200) {
        navigate('/login');
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError('User already exists with the same email.');
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className={style.container}>
      <h2>Register</h2>
      {error && <p className={style.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={style.formGroup}>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" value={user.firstName} onChange={handleChange} required />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" value={user.lastName} onChange={handleChange} required />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={user.email} onChange={handleChange} required />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={user.password} onChange={handleChange} required />
        </div>
        <div className={style.formGroup}>
          <button type="submit">Register</button>
        </div>
      </form>
      <p>
        Already have an account? <a style={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>Login here</a>
      </p>
    </div>
  );
}