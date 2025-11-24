import React, { useState } from 'react';
import api from '../api/api';
import './CookCreate.css';

export default function CookCreate(){
  const [form, setForm] = useState({ name:'', experience_years:0, specialties:'', daily_rate:0 });
  async function submit(e){
    e.preventDefault();
    await api.post('/cooks', form);
    alert('Cook created');
    setForm({ name:'', experience_years:0, specialties:'', daily_rate:0 });
  }
  return (
    <form onSubmit={submit}>
      <h3>Add Cook</h3>
      <div><label>Name: <input value={form.name} 
      onChange={e=>setForm({...form, name:e.target.value})} /></label></div>
      <div><label>Experience years: <input type="number" value={form.experience_years} 
      onChange={e=>setForm({...form, experience_years:Number(e.target.value)})} /></label></div>
      <div><label>Specialties: <input value={form.specialties} 
      onChange={e=>setForm({...form, specialties:e.target.value})} /></label></div>
      <div><label>Daily rate: <input type="number" value={form.daily_rate} 
      onChange={e=>setForm({...form, daily_rate:Number(e.target.value)})} /></label></div>
      <button type="submit">Create</button>
    </form>
  );
}
