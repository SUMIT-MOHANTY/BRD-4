import {useState, useEffect} from 'react';
import {Input, Button} from './ui'; // assume generic UI lib

export const MemberSearchBar = ({onSearch}) => {
  const [term, setTerm] = useState('');
  useEffect(() => {
    const id = setTimeout(() => onSearch(term), 300);
    return () => clearTimeout(id);
  }, [term, onSearch]);
  return (
    <div style={{marginBottom: '1rem'}}>
      <Input placeholder="Search members..." value={term} onChange={(e)=>setTerm(e.target.value)} />
    </div>
  );
};
