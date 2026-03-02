import React, {useState} from 'react';
import SummaryCard from '../components/SummaryCard.jsx';
import CirculationTrendsChart from '../components/CirculationTrendsChart.jsx';
import OverdueItemsList from '../components/OverdueItemsList.jsx';
import PopularBooksDisplay from '../components/PopularBooksDisplay.jsx';
import DateRangeSelector from '../components/DateRangeSelector.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import useDashboardData from '../hooks/useDashboardData.js';
import '../styles/dashboard.css';

export default function DashboardPage() {
  const [range, setRange] = useState({startDate:'', endDate:''});
  const {summary, loading, error} = useDashboardData();
  return (
    <div className='dashboard-page'>
      <h1>Library Dashboard</h1>
      <DateRangeSelector onChange={(s,e)=>setRange({startDate:s,endDate:e})} />
      {loading && <LoadingSpinner />}
      {error && <p className='error'>{error}</p>}
      <div className='dashboard-grid'>
        <SummaryCard title='Total Books' value={summary?.total_books ?? '-'} />
        <SummaryCard title='Total Members' value={summary?.total_members ?? '-'} />
        <SummaryCard title='Active Loans' value={summary?.active_loans ?? '-'} />
        <SummaryCard title='Overdue Items' value={summary?.overdue_items ?? '-'} />
        <CirculationTrendsChart startDate={range.startDate} endDate={range.endDate} />
        <OverdueItemsList />
        <PopularBooksDisplay />
      </div>
    </div>
  );
}
