import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="https://t4.ftcdn.net/jpg/04/89/63/47/240_F_489634765_xwyjfDKIOv6RRtrefiBN17tMGJ34pvxK.jpg" alt="logo" />
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
