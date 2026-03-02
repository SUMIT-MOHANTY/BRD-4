import {Table, Button, Spinner, Alert} from './ui';

export const MemberList = ({members, loading, error, onEdit, onDelete, onSelect}) => {
  if (loading) return <Spinner />;
  if (error) return <Alert type="error">{error.message || 'Error loading members'}</Alert>;
  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Phone</th><th>Status</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {members.map(m => (
          <tr key={m.id} onClick={()=>onSelect(m.id)} style={{cursor:'pointer'}}>
            <td>{m.id}</td><td>{m.first_name}</td><td>{m.last_name}</td><td>{m.email}</td><td>{m.phone}</td>
            <td>{m.membership_status}</td>
            <td>
              <Button size="sm" onClick={e=>{e.stopPropagation(); onEdit(m);}}>Edit</Button>
              <Button size="sm" variant="danger" onClick={e=>{e.stopPropagation(); onDelete(m.id);}}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
