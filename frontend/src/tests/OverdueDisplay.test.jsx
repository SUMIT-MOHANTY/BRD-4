import React from 'react';
import { render, waitFor } from '@testing-library/react';
import OverdueDisplay from '../components/Circulation/displays/OverdueDisplay';
import { fetchOverdue } from '../api/circulationApi';
jest.mock('../api/circulationApi');

test('shows overdue list', async () => {
  fetchOverdue.mockResolvedValue({data:[{book_id:5,title:'Django',member_name:'Bob',days_overdue:3}]});
  const {getByText}= render(<OverdueDisplay/>);
  await waitFor(()=>expect(getByText('Django')).toBeInTheDocument());
  expect(getByText('Bob')).toBeInTheDocument();
  expect(getByText('3 day(s)')).toBeInTheDocument();
});
