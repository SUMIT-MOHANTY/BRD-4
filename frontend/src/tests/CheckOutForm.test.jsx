import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CheckOutForm from '../components/Circulation/forms/CheckOutForm';
import { checkout } from '../api/circulationApi';
jest.mock('../api/circulationApi');

test('renders and submits checkout form', async () => {
  const members = [{id:1, name:'Alice'}];
  const books = [{id:10, title:'React Book'}];
  checkout.mockResolvedValue({data:{transaction_id:99}});
  const {getByTestId, getByText} = render(<CheckOutForm members={members} books={books} />);
  fireEvent.change(getByTestId('member-select'), {target:{value:'1'}});
  fireEvent.change(getByTestId('book-select'), {target:{value:'10'}});
  fireEvent.change(getByTestId('due-date'), {target:{value:'2024-12-01'}});
  fireEvent.click(getByText('Check Out'));
  await waitFor(()=>expect(checkout).toHaveBeenCalledWith({member_id:1, book_id:10, due_date:'2024-12-01'}));
});
