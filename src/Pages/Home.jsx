import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';



const Home = () => {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3000/users');
            const users = await response.json();
            const currentUser = users.find(user => user.email === localStorage.getItem('email'));
            setUser(currentUser);

            const postResponse = await fetch('http://localhost:3000/posts');
            const postData = await postResponse.json();
            setPosts(postData);
        };
        fetchData();
    }, []);

    return (
        <div className='HomePage'>

            <header className='header'>
                <Navbar />
            </header>
            <h1>Welcome, {user ? user.email : ''}</h1>
            <h2>Posts</h2>
            <div className='Cards'>


                {posts.map(post => (
                    <div className='Card' key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.description}</p>


                    </div>
                ))}

            </div>
        </div>

    );
};

export default Home;
