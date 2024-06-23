import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from './Login.module.css';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send login request with credentials
            const res = await axios.post(`${SERVER_URL}/user/login`, credentials, { withCredentials: true });
            if (res.status === 200) {
                navigate("/problems"); // Navigate to problems page after successful login
            }
        } catch (err) {
            if (err.response.status === 401) {
                setError('Incorrect email or password.');
            } else {
                setError('Login failed. Please try again later.');
            }
        }
    };

    return (
        <div className={style.container}>
            <h2>Login</h2>
            {error && <p className={style.error}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className={style.formGroup}>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={style.formGroup}>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
            Don't have an account? <a style={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>Register here</a>
            </p>
        </div>
    );
}
