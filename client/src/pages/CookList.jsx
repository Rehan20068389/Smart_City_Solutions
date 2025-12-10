//Referance from youtube:"https://youtu.be/La5cL2jNoVw?si=Xg-4nxotDtM6htIL"
//Referance from youtube:"https://www.youtube.com/watch?v=-4XpG5_Lj_o"
//Referance from chatgpt:"https://chatgpt.com/share/6939ba10-0150-8008-b128-7f634e81db1a"
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

const user = JSON.parse(localStorage.getItem("user"));//
const isProvider = user?.role === "provider";//


  async function fetchItems(){
    const res = await api.get('/cooks/public');//api request for fetching all the cooks details which are
    setItems(res.data);                 //created by the current loged In provider.
  }
  async function deleteItem(id){
    if (!isProvider) return alert("Not authorized");//
    await api.delete(`/cooks/${id}`);//api request for the delecting a particular cook details by using the 
    fetchItems();                    //cooks Id.
  } //to this.

  async function submit(e) {//its from chatgpt
    e.preventDefault();
    if (!isProvider) return alert("Not authorized");// its not from the provider then return alert
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

  function startEdit(cook) { //here the function were the cook can change the details.
    if (!isProvider) return;// its not from the provider then return 
    setEditId(cook.id);//cookId is passed here for edit option.
    setForm({//In this form getting all the details of the cook for the edit option
      name: cook.name,
      experience_years: cook.experience_years,
      specialties: cook.specialties,
      daily_rate: cook.daily_rate,
      rating: cook.rating
    });
  }

  return (
    //the form filed and table styling are updated with chatgpt code from my own modification code
   <div style={{padding: 20}}>  
      <h2>Cooks</h2>

       {/* PROVIDER ONLY FORM */}
    {isProvider && ( //if its a provider then ,can do update and delete operations 
      <>
      <h3>{editId ? "Edit Cook" : "Add Cook"}</h3>
   
   
      
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
   </>
 )}
      {/* Table */}
      
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Exp</th>
            <th>Rate</th>
            <th>Specialties</th>
            <th>Rating</th>
            {isProvider && <th>Actions</th>}
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
          {isProvider && ( //here only showing buttons to the provider
              <td>
                {/*  the update and delete buttons are here the onclick function calling */}
                <button onClick={() => startEdit(c)}>Edit</button>
                <button onClick={() => deleteItem(c.id)} style={{ marginLeft: 8 }}>
                  Delete
                </button>
              </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
}
