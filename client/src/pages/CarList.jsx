//Referance from youtube "https://youtu.be/La5cL2jNoVw?si=Xg-4nxotDtM6htIL"
//used chatgpt for the forms and table structure 
// "https://chatgpt.com/g/g-p-6931b1a54e548191b62a939dda79a3c1-programming/c/6936b612-815c-832f-a737-29cc8ac476c2"
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

  useEffect(() => {
    fetchCars();
  }, []);
  
  async function fetchCars(){ // in here all the cars are listed
    const res = await api.get('/cars');//to get all the cars 
    setCars(res.data);
  }

   async function handleSubmit(e) {
    e.preventDefault();

    if (editingId) {
      // To update the cars
      await api.put(`/cars/${editingId}`, form);
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
    await api.delete(`/cars/${id}`);
    fetchCars();
  }

 function editCar(car) { // here loading the car data into from for editing
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
      <h2>Car Management </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <h3>{editingId ? "Update Car" : "Add New Car"}</h3>

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
            <th>Actions</th>
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

              <td>
                <button onClick={() => editCar(c)}>Edit</button>
                &nbsp;
                <button onClick={() => deleteCar(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   
   
  );
}
