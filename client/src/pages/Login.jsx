import React, { useState } from 'react';
import api from '../api/api';
import { redirect, useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
    const res = await api.post('/auth/login', form);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('role', res.data.user.role);

    // redirect based on the user
     if (res.data.user.role === 'provider') {
      navigate('/provider-dashboard');
    } else {
      navigate('/user-dashboard');
    }
   } catch (err) {
      // catch Axios errors
      console.error(err);
      alert(err.response?.data?.error || 'Login failed');
    }
  
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
