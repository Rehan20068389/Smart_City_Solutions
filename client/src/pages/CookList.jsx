import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function CookList() {
  const [items, setItems] = useState([]);
  useEffect(()=> { fetchItems(); }, []);
  async function fetchItems(){
    const res = await api.get('/cooks');
    setItems(res.data);
  }
  async function deleteItem(id){
    await api.delete(`/cooks/${id}`);
    fetchItems();
  }
  return (
    <div>
      <h2>Cooks</h2>
      <table border="1" cellPadding="6">
        <thead><tr><th>ID</th><th>Name</th><th>Exp</th><th>Rate</th><th>Actions</th></tr></thead>
        <tbody>
          {items.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td><td>{c.name}</td><td>{c.experience_years}</td><td>{c.daily_rate}</td>
              <td><button onClick={()=>deleteItem(c.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
