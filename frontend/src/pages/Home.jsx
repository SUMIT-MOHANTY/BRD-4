import React, { useEffect, useState } from 'react';
import axios from '../api.js';
function Home() {
  const [msg, setMsg] = useState('');
  useEffect(() => {
    axios.get('/api/v1/users/').then(r => setMsg('Fetched '+r.data.length+' users')).catch(()=>setMsg('Error'));
  }, []);
  return <h2>Home - {msg}</h2>;
}
export default Home;
