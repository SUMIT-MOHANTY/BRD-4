import {useState, useEffect} from 'react';
import {Modal, Input, Select, Button, Alert, Spinner} from './ui';
import {isValidEmail, isValidPhone} from '../utils/validation';

export const MemberForm = ({member, onClose, onSuccess}) => {
  const isEdit = !!member;
  const [form, setForm] = useState({first_name:'', last_name:'', email:'', phone:'', membership_status:'active'});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => { if(isEdit) setForm(member); }, [member, isEdit]);
  const validate = () => {
    const errs = {};
    if(!form.first_name) errs.first_name='Required';
    if(!form.last_name) errs.last_name='Required';
    if(!form.email || !isValidEmail(form.email)) errs.email='Invalid email';
    if(!form.phone || !isValidPhone(form.phone)) errs.phone='Invalid phone';
    if(!form.membership_status) errs.membership_status='Required';
    setErrors(errs);
    return Object.keys(errs).length===0;
  };
  const handleSubmit = async () => {
    if(!validate()) return;
    setSubmitting(true);
    try {
      const api = await import('../api/member');
      if(isEdit) await api.updateMember(member.id, form);
      else await api.createMember(form);
      onSuccess();
    } catch(e) {
      setErrors({api:e.message||'Submission error'});
    } finally { setSubmitting(false); }
  };
  return (
    <Modal title={isEdit?'Edit Member':'Add Member'} onClose={onClose}>
      {errors.api && <Alert type='error'>{errors.api}</Alert>}
      <Input label='First Name' value={form.first_name} onChange={e=>setForm({...form, first_name:e.target.value})} error={errors.first_name} />
      <Input label='Last Name' value={form.last_name} onChange={e=>setForm({...form, last_name:e.target.value})} error={errors.last_name} />
      <Input label='Email' value={form.email} onChange={e=>setForm({...form, email:e.target.value})} error={errors.email} />
      <Input label='Phone' value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} error={errors.phone} />
      <Select label='Status' options={['active','inactive']} value={form.membership_status} onChange={e=>setForm({...form, membership_status:e.target.value})} error={errors.membership_status} />
      <div style={{marginTop:'1rem'}}>
        <Button onClick={handleSubmit} disabled={submitting}>{submitting?<Spinner size='sm'/>:'Save'}</Button>
        <Button variant='secondary' onClick={onClose} style={{marginLeft:'0.5rem'}}>Cancel</Button>
      </div>
    </Modal>
  );
};
