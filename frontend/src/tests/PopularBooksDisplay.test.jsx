import {render, screen, waitFor} from '@testing-library/react';
import PopularBooksDisplay from '../components/PopularBooksDisplay.jsx';
import apiClient from '../apiClient';
jest.mock('../apiClient');
test('renders popular books', async()=>{apiClient.get.mockResolvedValueOnce({data:{data:[{id:1,title:'Sample Book',author:'Author',borrow_count:10}]}});render(<PopularBooksDisplay/>);await waitFor(()=>expect(screen.getByText('Sample Book')).toBeInTheDocument());});
