import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function CarList() {
  const [cars, setCars] = useState([]);
  useEffect(()=> { fetchCars(); }, []);
  async function fetchCars(){
    const res = await api.get('/cars');
    setCars(res.data);
  }
  async function deleteCar(id){
    await api.delete(`/cars/${id}`);
    fetchCars();
  }
  return (
    <div>
      <h2>Cars</h2>
      <table border="1" cellPadding="6">
        <thead><tr><th>ID</th><th>Model</th><th>Type</th><th>Price/Day</th><th>Location</th><th>Actions</th></tr></thead>
        <tbody>
          {cars.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td><td>{c.model}</td><td>{c.type}</td><td>{c.price_per_day}</td><td>{c.location}</td>
              <td><button onClick={()=>deleteCar(c.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
