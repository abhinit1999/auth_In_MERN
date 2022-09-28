import React from 'react'
import { NavLink } from 'react-router-dom';
import "./navbar.css";




const Navbar = () => {
  return (
    <nav>
        <ul>
            <NavLink className="nav_link" to="/">Home</NavLink>
            <NavLink className="nav_link" to="/about">About</NavLink>
            <NavLink className="nav_link" to="/details">Details</NavLink>
            <NavLink className="nav_link" to="/user/signup">Signup</NavLink>
        </ul>
    </nav>
  )
}

export default Navbar;