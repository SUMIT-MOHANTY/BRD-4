import React, { useEffect, useState } from 'react';
import { fetchOverdue } from '../../api/circulationApi';

function OverdueDisplay() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchOverdue().then(res => { setItems(res.data); setLoading(false); }).catch(()=>setLoading(false));
  }, []);

  if (loading) return <p>Loading overdue items...</p>;
  if (!items.length) return <p>No overdue items.</p>;

  return (
    <div className="p-3">
      <h5>Overdue Items</h5>
      <ul className="list-group">
        {items.map(i => (
          <li key={i.book_id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{i.title}</strong> - {i.member_name}
            </div>
            <span className="badge bg-danger rounded-pill">{i.days_overdue} day(s)</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default OverdueDisplay;
