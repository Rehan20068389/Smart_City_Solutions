import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/auth/signup', form);
    alert('Signup successful — please login');
    navigate('/login');
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Signup</h2>
      <form onSubmit={submit}>
        <div><input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} /></div>
        <div><input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} /></div>
        <div><input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} /></div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
