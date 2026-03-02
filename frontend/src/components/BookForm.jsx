import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
function BookForm({ editMode = false }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({title:'',author:'',published_date:'',is_available:true});
  useEffect(() => {
    if (editMode && id) {
      axios.get(`/api/v1/books/${id}/`).then(r => setForm(r.data));
    }
  }, [editMode, id]);
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (editMode) {
      await axios.put(`/api/v1/books/${id}/`, form);
    } else {
      await axios.post('/api/v1/books/', form);
    }
    navigate('/');
  };
  return (
    <form onSubmit={handleSubmit} className="border p-4">
      <div className="mb-3"><label className="form-label">Title</label>
        <input className="form-control" name="title" value={form.title} onChange={handleChange} required />
      </div>
      <div className="mb-3"><label className="form-label">Author</label>
        <input className="form-control" name="author" value={form.author} onChange={handleChange} required />
      </div>
      <div className="mb-3"><label className="form-label">Published Date</label>
        <input type="date" className="form-control" name="published_date" value={form.published_date?.split('T')[0] || ''} onChange={handleChange} />
      </div>
      <div className="form-check mb-3">
        <input className="form-check-input" type="checkbox" name="is_available" checked={form.is_available} onChange={handleChange} />
        <label className="form-check-label">Available</label>
      </div>
      <button type="submit" className="btn btn-primary">{editMode ? 'Update' : 'Create'}</button>
    </form>
  );
}
export default BookForm;
