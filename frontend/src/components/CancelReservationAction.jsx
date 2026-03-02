import React from 'react';
import {Button} from '@mui/material';

const CancelReservationAction = ({reservationId, token}) => {
  const handleCancel = async () => {
    try {
      const resp = await fetch(`/api/reservations/${reservationId}/cancel/`, {
        method: 'POST',
        headers: {Authorization: `Bearer ${token}`},
      });
      if (!resp.ok) throw new Error('Cancel failed');
      // Refresh UI - the parent component will refetch on its own in a real app.
      window.location.reload();
    } catch (e) {
      alert(e.message);
    }
  };

  return <Button variant="contained" color="secondary" onClick={handleCancel}>Cancel</Button>;
};

export default CancelReservationAction;
