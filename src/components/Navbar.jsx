import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="" alt="" />
            </div>
            <div className="navbar-links">
                <button>
                    <Link to="/home">Home</Link>
                </button>
                <button>
                    <Link to="/add">Add</Link>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
