import React, { useState, useEffect } from 'react';


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
        <>
            <h1>Welcome, {user.email}</h1>
            <h2>Profile</h2>
            <p>Email: {user.email}</p>
            <h2>Posts</h2>
            {posts.map(post => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                </div>
            ))}

        </>
    );
};

export default Home;
