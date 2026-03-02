import {useEffect, useState} from 'react';
import apiClient from '../apiClient';

export default function useDashboardData() {
  const [summary,setSummary]=useState(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);
  useEffect(()=>{
    apiClient.get('/api/dashboard/summary/').then(res=>{setSummary(res.data.data);setLoading(false);}).catch(err=>{setError(err.message);setLoading(false);});
  },[]);
  return {summary, loading, error};
}
