import {render, screen, waitFor} from '@testing-library/react';
import OverdueItemsList from '../components/OverdueItemsList.jsx';
import apiClient from '../apiClient';
jest.mock('../apiClient');
test('renders overdue list', async()=>{apiClient.get.mockResolvedValueOnce({data:{data:[{id:1,member_name:'John',due_date:'2024-02-01'}]}});render(<OverdueItemsList/>);await waitFor(()=>expect(screen.getByText('John')).toBeInTheDocument());});
