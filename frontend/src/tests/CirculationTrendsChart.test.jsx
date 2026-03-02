import {render, screen, waitFor} from '@testing-library/react';
import CirculationTrendsChart from '../components/CirculationTrendsChart.jsx';
import apiClient from '../apiClient';
jest.mock('../apiClient');
test('fetches and displays chart', async()=>{apiClient.get.mockResolvedValueOnce({data:{data:[{date:'2024-01-01',count:5},{date:'2024-01-02',count:8}]}});render(<CirculationTrendsChart startDate='2024-01-01' endDate='2024-01-31'/>);await waitFor(()=>expect(screen.getByText('Circulation')).toBeInTheDocument());});
