import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post('/auth/login', form);
    localStorage.setItem('token', res.data.token);
    alert('Login successful');
    navigate('/');
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div><input placeholder="Email" value={form.email} 
        onChange={e=>setForm({...form, email:e.target.value})} /></div>
        <div><input type="password" placeholder="Password" value={form.password} 
        onChange={e=>setForm({...form, password:e.target.value})} /></div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
