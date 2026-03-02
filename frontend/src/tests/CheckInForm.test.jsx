import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CheckInForm from '../components/Circulation/forms/CheckInForm';
import { checkIn } from '../api/circulationApi';
jest.mock('../api/circulationApi');

test('submits check‑in', async () => {
  checkIn.mockResolvedValue({data:{transaction_id:55}});
  const {getByTestId, getByText} = render(<CheckInForm/>);
  fireEvent.change(getByTestId('book-id'), {target:{value:'20'}});
  fireEvent.click(getByText('Check In'));
  await waitFor(()=>expect(checkIn).toHaveBeenCalledWith({book_id:20}));
});
