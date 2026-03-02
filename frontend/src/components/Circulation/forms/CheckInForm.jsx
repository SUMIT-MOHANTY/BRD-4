import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { checkIn } from '../../../api/circulationApi';

function CheckInForm({ onSuccess }) {
  const [bookId, setBookId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookId) { setError('Book ID is required'); return; }
    try {
      await checkIn({ book_id: Number(bookId) });
      setError('');
      onSuccess && onSuccess();
    } catch (_) { setError('Check‑in failed'); }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border">
      <h5>Check In Book</h5>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label className="form-label">Book ID / ISBN</label>
        <input type="number" className="form-control" value={bookId} onChange={e=>setBookId(e.target.value)} data-testid="book-id"/>
      </div>
      <button type="submit" className="btn btn-primary">Check In</button>
    </form>
  );
}
CheckInForm.propTypes = { onSuccess: PropTypes.func };
export default CheckInForm;
