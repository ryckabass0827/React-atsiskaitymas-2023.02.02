import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Add = () => {
    const [form, setForm] = useState({ post: '' });
    const [error, setError] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/posts');
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            const currentUser = data.find(user => user.email === localStorage.getItem('email'));
            if (!currentUser) {
                setError('User not found');
                return;
            }
            const index = data.indexOf(currentUser);
            data[index].posts = [...currentUser.posts, form.post];
            await fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            setForm({ post: '' });
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='AddPage'>
            <header className='header'>
                <Navbar />
            </header>

            <form className='PostForm' onSubmit={handleSubmit}>
                <h2>Add your post</h2>
                <textarea
                    name="post"
                    value={form.post}
                    onChange={handleChange}
                    required
                />
                <br />
                <button type="submit">Add Post</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Add
