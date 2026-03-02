import {useState, useEffect} from 'react';
import {Modal, Badge, Spinner, Alert} from './ui';

export const MemberDetails = ({memberId, onClose}) => {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const load = async () => {
      setLoading(true); setError(null);
      try { const {data}= await import('../api/member').then(m=>m.fetchMember(memberId)); setMember(data); }
      catch(e){ setError(e); }
      finally{ setLoading(false); }
    };
    load();
  }, [memberId]);
  return (
    <Modal title='Member Details' onClose={onClose}>
      {loading && <Spinner />}
      {error && <Alert type='error'>{error.message}</Alert>}
      {member && (
        <div>
          <p><strong>ID:</strong> {member.id}</p>
          <p><strong>Name:</strong> {member.first_name} {member.last_name}</p>
          <p><strong>Email:</strong> {member.email}</p>
          <p><strong>Phone:</strong> {member.phone}</p>
          <p><strong>Status:</strong> <Badge>{member.membership_status}</Badge></p>
        </div>
      )}
    </Modal>
  );
};
