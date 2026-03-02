import {render, screen} from '@testing-library/react';
import SummaryCard from '../components/SummaryCard.jsx';
test('renders title and value',()=>{render(<SummaryCard title='Books' value={123} />);expect(screen.getByText('Books')).toBeInTheDocument();expect(screen.getByText('123')).toBeInTheDocument();});
