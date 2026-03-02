import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import styles from '../styles/Navbar.module.css';
export default function Navbar() {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/login'); };
  return (
    <nav className={styles.nav}>
      <NavLink to='/dashboard'>Dashboard</NavLink>
      <NavLink to='/books'>Books</NavLink>
      <NavLink to='/members'>Members</NavLink>
      {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}
