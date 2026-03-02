import React, {useEffect, useState} from 'react';
import {Box, Tabs, Tab, Typography, Badge, CircularProgress} from '@mui/material';
import CancelReservationAction from './CancelReservationAction';

const ReservationListView = ({memberId, token}) => {
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    try {
      const resp = await fetch(`/api/reservations/?member=${memberId}`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      if (!resp.ok) throw new Error('Network response was not ok');
      const data = await resp.json();
      setReservations(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabChange = (e, newValue) => setTab(newValue);

  const active = reservations.filter(r => ['pending', 'available'].includes(r.status));
  const past   = reservations.filter(r => r.status === 'canceled' || r.status === 'fulfilled');

  const rows = (list) => (
    <Box display="flex" flexDirection="column" gap={2}>
      {list.map(res => (
        <Box key={res.id} display="flex" alignItems="center" gap={2} p={1} border="1px solid #e0e0e0" borderRadius={2}>
          <Typography>{res.book?.title || 'Unknown Book'}</Typography>
          <Badge badgeContent={res.status} color={res.status === 'available' ? 'success' : 'primary'} />
          <Typography>{new Date(res.created_at).toLocaleDateString()}</Typography>
          {['pending','available'].includes(res.status) && (
            <CancelReservationAction reservationId={res.id} token={token} />
          )}
        </Box>
      ))}
    </Box>
  );

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box>
      <Tabs value={tab} onChange={handleTabChange} aria-label="reservation tabs">
        <Tab label="Active" />
        <Tab label="History" />
      </Tabs>
      {tab === 0 && rows(active)}
      {tab === 1 && rows(past)}
    </Box>
  );
};

export default ReservationListView;
