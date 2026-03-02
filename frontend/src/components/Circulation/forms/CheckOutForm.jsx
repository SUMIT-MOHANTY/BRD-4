import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { checkout } from '../../../api/circulationApi';

function CheckOutForm({ members, books, onSuccess }) {
  const [memberId, setMemberId] = useState('');
  const [bookId, setBookId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!memberId || !bookId || !dueDate) { setError('All fields are required'); return; }
    try {
      await checkout({ member_id: Number(memberId), book_id: Number(bookId), due_date: dueDate });
      setError('');
      onSuccess && onSuccess();
    } catch (_) { setError('Checkout failed'); }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border">
      <h5>Check Out Book</h5>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label className="form-label">Member</label>
        <select className="form-select" value={memberId} onChange={e=>setMemberId(e.target.value)} data-testid="member-select">
          <option value="">Select member</option>
          {members.map(m=> <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Book</label>
        <select className="form-select" value={bookId} onChange={e=>setBookId(e.target.value)} data-testid="book-select">
          <option value="">Select book</option>
          {books.map(b=> <option key={b.id} value={b.id}>{b.title}</option>)}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Due Date</label>
        <input type="date" className="form-control" value={dueDate} onChange={e=>setDueDate(e.target.value)} data-testid="due-date"/>
      </div>
      <button type="submit" className="btn btn-primary">Check Out</button>
    </form>
  );
}
CheckOutForm.propTypes = {
  members: PropTypes.array.isRequired,
  books: PropTypes.array.isRequired,
  onSuccess: PropTypes.func,
};
export default CheckOutForm;
