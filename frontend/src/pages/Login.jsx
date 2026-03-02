import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try { await login(username, password); navigate('/dashboard'); } catch (err) { console.error(err); }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} required />
      <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required />
      <button type='submit'>Login</button>
    </form>
  );
}
