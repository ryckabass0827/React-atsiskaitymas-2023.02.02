import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();


    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/users');
            const data = await response.json();
            const user = data.find(user => user.email === form.email);
            if (!user) {
                setError('Email not found');
            } else if (user.password !== form.password) {
                setError('Incorrect password');
            } else {
                setSuccessMessage('Logged in successfully');
                setTimeout(() => {
                    navigate('/home');
                }, 3000);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>

            <div className='Menu'>
                <img src="https://t4.ftcdn.net/jpg/04/89/63/47/240_F_489634765_xwyjfDKIOv6RRtrefiBN17tMGJ34pvxK.jpg" alt="logo" />
                <button> <Link to="/login">Login</Link></button>
                <button> <Link to="/register">Register</Link></button>
            </div>
            <div className='logPage'>
                <form className='LoginForm' onSubmit={handleSubmit}>
                    <p>Enter your Email</p>
                    <input className='Email'
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <p>Enter your password</p>
                    <input className='Password'
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <button type="submit">Login</button>
                    {successMessage && <p>{successMessage}</p>}
                    {error && <p>{error}</p>}
                </form>
            </div>
        </>
    );
};

export default Login;
