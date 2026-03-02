import React, {useEffect, useState} from 'react';
import apiClient from '../../apiClient';

export default function OverdueItemsList() {
  const [list,setList]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);
  useEffect(()=>{apiClient.get('/api/dashboard/overdue/').then(res=>{setList(res.data.data);setLoading(false);}).catch(err=>{setError(err.message);setLoading(false);});},[]);
  if(loading) return <p>Loading overdue items...</p>;
  if(error) return <p className='error'>{error}</p>;
  return (
    <div className='overdue-list'>
      <h2>Overdue Items</h2>
      <table>
        <thead><tr><th>Loan ID</th><th>Member</th><th>Due Date</th></tr></thead>
        <tbody>
          {list.map(item=> (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.member_name || item.member_id}</td>
              <td>{item.due_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
