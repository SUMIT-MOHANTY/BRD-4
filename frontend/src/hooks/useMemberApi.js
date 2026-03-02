import {useState, useCallback} from 'react';
import * as memberApi from '../api/member';

export const useMemberApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const wrap = useCallback((fn) => async (...args) => {
    setLoading(true); setError(null);
    try { const res = await fn(...args); return res; }
    catch (e) { setError(e); throw e; }
    finally { setLoading(false); }
  }, []);

  return {
    loading,
    error,
    fetchMembers: wrap(memberApi.fetchMembers),
    fetchMember: wrap(memberApi.fetchMember),
    createMember: wrap(memberApi.createMember),
    updateMember: wrap(memberApi.updateMember),
    deleteMember: wrap(memberApi.deleteMember),
  };
};
