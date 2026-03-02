import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import styles from '../styles/Sidebar.module.css';
export default function Sidebar() {
  const { user } = useAuth();
  const role = user?.role || 'guest';
  return (
    <aside className={styles.sidebar}>
      <ul>
        <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
        {role !== 'guest' && <li><NavLink to='/books'>Books</NavLink></li>}
        {role === 'admin' && <li><NavLink to='/members'>Members</NavLink></li>}
      </ul>
    </aside>
  );
}
