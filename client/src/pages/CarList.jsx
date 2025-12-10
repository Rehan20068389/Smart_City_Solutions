//Referance from youtube "https://youtu.be/La5cL2jNoVw?si=Xg-4nxotDtM6htIL"
//used chatgpt for the forms and table structure 
//https://chatgpt.com/share/6939ba10-0150-8008-b128-7f634e81db1a
import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function CarList() {
  const [cars, setCars] = useState([]);
  useEffect(()=> { fetchCars(); }, []);
  const [form, setForm] = useState({
    model: "",
    type: "",
    price_per_day: "",
    location: "",
    with_driver: false,
  });

  const [editingId, setEditingId] = useState(null);

   const user = JSON.parse(localStorage.getItem("user"));
  const isProvider = user?.role === "provider";

  useEffect(() => {
    fetchCars();
  }, []);
  
  async function fetchCars(){ // in here all the cars are listed.
    const res = await api.get('/cars/public');//to get all the cars api call to the banckend side.
    setCars(res.data);
  }

   async function handleSubmit(e) {
    e.preventDefault();
       if (!isProvider) return alert("Not authorized");// its not from the provider then return alert

    if (editingId) {
      // To update the cars
      await api.put(`/cars/${editingId}`, form);//here api request to edit the car details by using the editingid.
      setEditingId(null);
    } else {
      // to create 
      await api.post("/cars", form);
    }

    setForm({
      model: "",
      type: "",
      price_per_day: "",
      location: "",
      with_driver: false,
    });

    fetchCars(); 
  }


  async function deleteCar(id){// here the cars are deleted 
       if (!isProvider) return alert("Not authorized");// its not from the provider then return alert

    await api.delete(`/cars/${id}`);//api request to delete the cars with creation Id
    fetchCars();
  }

 function editCar(car) { // here loading the car data into from for editing
       if (!isProvider) return;// its not from the provider then return 
 
  setEditingId(car.id);
    setForm({
      model: car.model,
      type: car.type,
      price_per_day: car.price_per_day,
      location: car.location,
      with_driver: car.with_driver,
    });
  }

  return (
   
     <div style={{ padding: "20px" }}>
      <h2>Cars  </h2>

      {/* Provider Form */}
      {isProvider && (//giving the update ,delete options to the provder only
        <>
           <h3>{editingId ? "Update Car" : "Add New Car"}</h3>
      
      
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
       

        <input
          placeholder="Model"
          value={form.model}
          onChange={(e) => setForm({ ...form, model: e.target.value })}
        />
        <br /><br />

        <input
          placeholder="Type"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        />
        <br /><br />

        <input
          placeholder="Price per day"
          value={form.price_per_day}
          onChange={(e) => setForm({ ...form, price_per_day: e.target.value })}
        />
        <br /><br />

        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <br /><br />

        <label>
          With Driver?
          <input
            type="checkbox"
            checked={form.with_driver}
            onChange={(e) =>
              setForm({ ...form, with_driver: e.target.checked })
            }
          />
        </label>
        <br /><br />

        <button type="submit">
          {editingId ? "Update Car" : "Create Car"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({
                model: "",
                type: "",
                price_per_day: "",
                location: "",
                with_driver: false,
              });
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}
      </form>
      </>
     )}
      {/* Table */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Model</th>
            <th>Type</th>
            <th>Price/Day</th>
            <th>Location</th>
            <th>Driver?</th>
            {isProvider && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {cars.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.model}</td>
              <td>{c.type}</td>
              <td>{c.price_per_day}</td>
              <td>{c.location}</td>
              <td>{c.with_driver ? "Yes" : "No"}</td>
            
            {isProvider && (//only giving the providers the buttons to update and delete
              <td>
                <button onClick={() => editCar(c)}>Edit</button>
                &nbsp;
                <button onClick={() => deleteCar(c.id)}>Delete</button>
              </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   
   
  );
}
