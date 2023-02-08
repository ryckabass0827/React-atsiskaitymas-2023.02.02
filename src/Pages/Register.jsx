import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const Register = () => {
    const [form, setForm] = useState({ email: '', password: '', password2: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (form.password !== form.password2) {
                setError('Passwords do not match');
            } else {
                const response = await fetch('http://localhost:3000/users');
                let data = await response.json();
                const emailExists = data.find(user => user.email === form.email);
                if (emailExists) {
                    setError('Email already exists');
                } else {
                    await fetch('http://localhost:3000/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ ...form, id: data.length + 1 })
                    });
                    setSuccessMessage('Registered successfully');
                    setTimeout(() => {
                        navigate('/login');
                    }, 1000);
                }

            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <div className='Menu'>
                <img src="https://t4.ftcdn.net/jpg/04/89/63/47/240_F_489634765_xwyjfDKIOv6RRtrefiBN17tMGJ34pvxK.jpg" alt="logo" />
                <button> <Link to="/login">Login</Link></button>
                <button> <Link to="/register">Register</Link></button>
            </div>
            <div className='regPage'>
                <form className='RegisterForm' onSubmit={handleSubmit}>
                    <p>Enter your Email</p>
                    <input className='R_email'
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <p>Enter your password</p>
                    <input className='R_password'
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <p>Please repeat password</p>
                    <input className='R_password2'
                        type="password"
                        name="password2"
                        placeholder="Confirm Password"
                        value={form.password2}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <button type="submit">Register</button>
                    {successMessage && <p>{successMessage}</p>}
                    {error && <p>{error}</p>}

                </form>
            </div>
        </>
    );
};

export default Register;
