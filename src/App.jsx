import React, { useState } from 'react';
import { Route, Link, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Add from './Pages/Add'
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('email'));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <Router>

        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            {!isLoggedIn && (
              <Navbar>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/add">Add posts</Link>
                </li>
              </Navbar>
            )}
          </ul>
        </nav>
        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} />}
          />
          <Route path="/register" element={<Register onLogin={handleLogin} />} />

        </Routes>
      </Router>

      <Footer />
    </>
  );
};

export default App;
