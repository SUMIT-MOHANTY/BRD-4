import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import TransactionHistoryTable from '../components/Circulation/tables/TransactionHistoryTable';
import { fetchTransactions } from '../api/circulationApi';
jest.mock('../api/circulationApi');

test('renders rows and paginates', async () => {
  fetchTransactions.mockResolvedValue({data:{results:[
    {transaction_id:1,book_title:'Book A',member_name:'M1',type:'checkout',date:'2024-01-01'}
  ], count:2}});
  const {getByText, getByRole}= render(<TransactionHistoryTable/>);
  await waitFor(()=>expect(getByText('Book A')).toBeInTheDocument());
  fireEvent.click(getByRole('button',{name:/Next/i}));
  expect(fetchTransactions).toHaveBeenCalledWith({page:2,page_size:10});
});
