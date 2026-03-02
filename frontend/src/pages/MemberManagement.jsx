import {useState, useEffect, useCallback} from 'react';
import {MemberSearchBar} from '../components/MemberSearchBar';
import {MemberList} from '../components/MemberList';
import {MemberForm} from '../components/MemberForm';
import {MemberDetails} from '../components/MemberDetails';
import {useMemberApi} from '../hooks/useMemberApi';
import {Button} from '../components/ui';

export const MemberManagement = () => {
  const {loading, error, fetchMembers, createMember, updateMember, deleteMember} = useMemberApi();
  const [query, setQuery] = useState('');
  const [members, setMembers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const loadMembers = useCallback(async () => {
    try { const {data}= await fetchMembers({search: query}); setMembers(data.results); }
    catch(e){ console.error(e); }
  }, [fetchMembers, query]);

  useEffect(() => { loadMembers(); }, [loadMembers]);

  const handleDelete = async (id) => {
    if(!window.confirm('Delete this member?')) return;
    try { await deleteMember(id); loadMembers(); } catch(e){ console.error(e); }
  };

  const handleEdit = (member) => { setEditingMember(member); setShowForm(true); };
  const handleAdd = () => { setEditingMember(null); setShowForm(true); };
  const handleFormSuccess = () => { setShowForm(false); loadMembers(); };

  return (
    <div>
      <h2>Member Management</h2>
      <Button onClick={handleAdd}>Add Member</Button>
      <MemberSearchBar onSearch={setQuery} />
      <MemberList members={members} loading={loading} error={error}
        onEdit={handleEdit} onDelete={handleDelete} onSelect={setSelectedId} />
      {showForm && <MemberForm member={editingMember} onClose={()=>setShowForm(false)} onSuccess={handleFormSuccess} />}
      {selectedId && <MemberDetails memberId={selectedId} onClose={()=>setSelectedId(null)} />}
    </div>
  );
};
