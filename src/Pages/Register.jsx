import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {
    const [form, setForm] = useState({ email: '', password: '', password2: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
                    data = [...data, { ...form, id: data.length + 1 }];
                    await fetch('http://localhost:3000/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });
                    alert('Registration successful!');
                    navigate('/home');
                }
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <div className='Menu'>
                <img src="" alt="" />
                <button> <Link to="/login">Login</Link></button>
                <button> <Link to="/register">Register</Link></button>
            </div>
            <form className='RegisterForm' onSubmit={handleSubmit}>
                <input className='R_email'
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <br />
                <input className='R_password'
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <br />
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
                {error && <p>{error}</p>}

            </form>
        </>
    );
};

export default Register;
