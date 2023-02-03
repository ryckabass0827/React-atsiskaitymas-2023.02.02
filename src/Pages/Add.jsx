import React, { useState } from 'react';
import Navbar from '../components/Navbar';



const Add = () => {
    const [form, setForm] = useState({ title: '', description: '' });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const newPost = {
                title: form.title,
                description: form.description
            };

            const response = await fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPost)
            });
            setSuccessMessage('Post submitted successfully view it in Home page');
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            setForm({ title: '', description: '' });
        } catch (error) {
            setError(error);
        }
    };



    return (
        <>
            <header className='header'>
                <img src="" alt="" />
                <Navbar />
            </header>
            <div className='addPage'>
                <form className='Add' onSubmit={handleSubmit}>
                    <p>Enter your Title</p>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <p>Add some Description</p>
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <button type="submit">Add Post</button>
                    {successMessage && <p>{successMessage}</p>}
                    {error && <p>{error}</p>}
                </form>
            </div>
        </>
    );
};

export default Add;
