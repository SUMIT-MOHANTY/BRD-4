import {render, fireEvent} from '@testing-library/react';
import DateRangeSelector from '../components/DateRangeSelector.jsx';
test('calls onChange with selected dates',()=>{const cb=jest.fn();render(<DateRangeSelector onChange={cb}/>);const start=document.querySelector('input[type="date"]');fireEvent.change(start,{target:{value:'2024-01-01'}});expect(cb).toHaveBeenCalled();});
