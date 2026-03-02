import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import apiClient from '../../apiClient';

export default function CirculationTrendsChart({startDate,endDate}) {
  const [data,setData]=useState(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  useEffect(()=>{if(!startDate||!endDate)return;setLoading(true);apiClient.get('/api/dashboard/circulation/',{params:{start_date:startDate,end_date:endDate}}).then(res=>{setData(res.data.data);setLoading(false);}).catch(err=>{setError(err.message);setLoading(false);});},[startDate,endDate]);
  if(loading) return <p>Loading chart...</p>;
  if(error) return <p className='error'>{error}</p>;
  if(!data) return <p>Select a date range to view trends.</p>;
  const chartData = {
    labels: data.map(item=>item.date),
    datasets: [{label:'Circulation',data:data.map(item=>item.count),borderColor:'rgba(75,192,192,1)',fill:false}]
  };
  return <Line data={chartData} />;
}
