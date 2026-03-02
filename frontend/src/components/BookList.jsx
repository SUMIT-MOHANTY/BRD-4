import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function BookList() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    fetchBooks();
  }, []);
  const fetchBooks = async () => {
    const resp = await axios.get('/api/v1/books/');
    setBooks(resp.data);
  };
  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <input className="form-control mb-3" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
      <table className="table table-striped">
        <thead><tr><th>Title</th><th>Author</th><th>Published</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {filtered.map(b => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.published_date}</td>
              <td>{b.is_available ? 'Available' : 'Checked Out'}</td>
              <td><Link to={`/edit/${b.id}`} className="btn btn-sm btn-primary me-2">Edit</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default BookList;
