import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">Stock Management</h1>
      <ul className="navbar-links">
        <li>
          <Link to="/">Account</Link>
        </li>
        <li>
          <Link to="/Observer">Observer</Link>
        </li>
        <li>
          <Link to="/Users">Users</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
