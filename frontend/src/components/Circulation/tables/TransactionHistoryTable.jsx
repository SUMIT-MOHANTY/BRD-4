import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../../api/circulationApi';

function TransactionHistoryTable() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const load = (p = 1) => {
    fetchTransactions({ page: p, page_size: pageSize }).then(res => {
      setData(res.data.results);
      setCount(res.data.count);
      setPage(p);
    });
  };

  useEffect(() => { load(); }, []);

  const totalPages = Math.ceil(count / pageSize);
  return (
    <div className="p-3">
      <h5>Transaction History</h5>
      <table className="table table-striped">
        <thead><tr>
          <th>ID</th><th>Book</th><th>Member</th><th>Type</th><th>Date</th>
        </tr></thead>
        <tbody>
          {data.map(t => (
            <tr key={t.transaction_id}>
              <td>{t.transaction_id}</td><td>{t.book_title}</td><td>{t.member_name}</td><td>{t.type}</td><td>{t.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          <li className={"page-item " + (page===1 && "disabled")}>
            <button className="page-link" onClick={()=>load(page-1)} disabled={page===1}>Prev</button>
          </li>
          {[...Array(totalPages)].map((_,i)=>(
            <li key={i+1} className={"page-item " + (page===i+1 && "active")}>
              <button className="page-link" onClick={()=>load(i+1)}>{i+1}</button>
            </li>
          ))}
          <li className={"page-item " + (page===totalPages && "disabled")}>
            <button className="page-link" onClick={()=>load(page+1)} disabled={page===totalPages}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default TransactionHistoryTable;
