import React, {useEffect, useState} from 'react';
import apiClient from '../../apiClient';

export default function PopularBooksDisplay() {
  const [books,setBooks]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);
  useEffect(()=>{apiClient.get('/api/dashboard/popular/').then(res=>{setBooks(res.data.data);setLoading(false);}).catch(err=>{setError(err.message);setLoading(false);});},[]);
  if(loading) return <p>Loading popular books...</p>;
  if(error) return <p className='error'>{error}</p>;
  return (
    <div className='popular-books'>
      <h2>Top Borrowed Books</h2>
      <div className='book-grid'>
        {books.map(b=> (
          <div key={b.id} className='book-card'>
            <h4>{b.title}</h4>
            <p>{b.author}</p>
            <p>Borrowed: {b.borrow_count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
