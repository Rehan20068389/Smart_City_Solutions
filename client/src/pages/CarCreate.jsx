import React, { useState } from 'react';
import api from '../api/api';
import './CarCreate.css';

export default function CarCreate(){
  const [form, setForm] = useState({ model:'', type:'', price_per_day:'', location:'' });
  async function submit(e){
    e.preventDefault();
    await api.post('/cars', form);
    alert('Car created');
    setForm({ model:'', type:'', price_per_day:'', location:'' });
  }
  return (
    <form className='car-form' onSubmit={submit}>
      <h3>Add Car</h3>
      <div><label>Model: <input value={form.model} onChange={e=>setForm({...form, model:e.target.value})} /></label></div>
      <div><label>Type: <input value={form.type} onChange={e=>setForm({...form, type:e.target.value})} /></label></div>
      <div><label>Price/day: <input value={form.price_per_day} onChange={e=>setForm({...form, price_per_day:e.target.value})} /></label></div>
      <div><label>Location: <input value={form.location} onChange={e=>setForm({...form, location:e.target.value})} /></label></div>
      <button type="submit">Create</button>
    </form>
  );
}
