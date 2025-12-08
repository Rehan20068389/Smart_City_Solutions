//Referance from youtube:"https://youtu.be/La5cL2jNoVw?si=Xg-4nxotDtM6htIL"
//Referance from youtube:"https://www.youtube.com/watch?v=-4XpG5_Lj_o"
//Referance from chatgpt
import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function CookList() {
  const [items, setItems] = useState([]);
  useEffect(()=> { fetchItems(); }, []); //the useEffect is used to fetch the deatils

  const [form, setForm] = useState({//this is from chatgpt
    name: '',
    experience_years: '',
    specialties: '',
    daily_rate: '',
    rating: ''
  });
  
  const [editId, setEditId] = useState(null);

  useEffect(() => {  //from this to: my own written code
    fetchItems();
  }, []);
  async function fetchItems(){
    const res = await api.get('/cooks');
    setItems(res.data);
  }
  async function deleteItem(id){
    await api.delete(`/cooks/${id}`);
    fetchItems();
  } //to this.

  async function submit(e) {//its from chatgpt
    e.preventDefault();

    if (editId) {
      // Update cook
      await api.put(`/cooks/${editId}`, form);
      setEditId(null);
    } else {
      // Create cook
      await api.post('/cooks', form);
    }

    setForm({
      name: '',
      experience_years: '',
      specialties: '',
      daily_rate: '',
      rating: ''
    });

    fetchItems();//here getting the cooks data 
  }

  function startEdit(cook) {
    setEditId(cook.id);
    setForm({
      name: cook.name,
      experience_years: cook.experience_years,
      specialties: cook.specialties,
      daily_rate: cook.daily_rate,
      rating: cook.rating
    });
  }

  return (
    //the form filed and table styling are updated with chatgpt code from my own code
   <div>  
      <h2>{editId ? 'Edit Cook' : 'Add Cook'}</h2>

      {/* Form */}
      <form onSubmit={submit} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <br />
      {/* here all the cooks details are inputed and sotres it */}
        <input
          placeholder="Experience Years"
          type="number"
          value={form.experience_years}
          onChange={(e) => setForm({ ...form, experience_years: e.target.value })}
          required
        />
        <br />

        <input
          placeholder="Specialties"
          value={form.specialties}
          onChange={(e) => setForm({ ...form, specialties: e.target.value })}
          required
        />
        <br />

        <input
          placeholder="Daily Rate"
          type="number"
          value={form.daily_rate}
          onChange={(e) => setForm({ ...form, daily_rate: e.target.value })}
          required
        />
        <br />

        <input
          placeholder="Rating"
          type="number"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
        />
        <br /><br />

        <button type="submit">
          {editId ? 'Update Cook' : 'Create Cook'}
        </button>
      </form>

      {/* Table */}
      <h2>Cooks</h2>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Exp</th>
            <th>Rate</th>
            <th>Specialties</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.experience_years}</td>
              <td>{c.daily_rate}</td>
              <td>{c.specialties}</td>
              <td>{c.rating}</td>

              <td>
                {/*  the update and delete buttons are here the onclick function calling */}
                <button onClick={() => startEdit(c)}>Edit</button>
                <button onClick={() => deleteItem(c.id)} style={{ marginLeft: 8 }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
}
