import React, { useState } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Add from './Pages/Add'
import Footer from './components/Footer';
import Main from './Pages/Main';
import './App.css';



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('email'));
  const handleLogin = () => {
    setIsLoggedIn(true);
  };



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} />}
          />
          <Route path="/home" element={<Home />} />
          <Route path="/add" element={<Add />} />
        </Routes >
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default App;
