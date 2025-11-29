import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: '' });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!form.role) {
      alert("please select user type");
      return;
    }

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

        {/* user type selection */}
        <div style={{ marginTop: 15 }}>
          <h4>Select User Type:</h4>
          <button 
            type="button" 
            style={{ marginRight: 10, background: form.role==='user'?'green':'gray', color:'white' }}
            onClick={() => setForm({ ...form, role: 'user' })}
          >
            Normal User
          </button>

          <button 
            type="button" 
            style={{ background: form.role==='provider'?'green':'gray', color:'white' }}
            onClick={() => setForm({ ...form, role: 'provider' })}
          >
            Service Provider
          </button>
        </div>

        <button type="submit" style={{ marginTop: 20 }}>Signup</button>
       
       
         
         
       
       
         
         
         

         
        
         
        
        
        
        
        

        
      </form>
    </div>
  );
}
