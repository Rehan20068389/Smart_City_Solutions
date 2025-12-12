//Referance from chatgpt:"https://chatgpt.com/share/693ac586-38b8-8008-890e-ab3f41dd6abb"
//Referance from youtube:"https://youtu.be/tBObk72EYYw?si=IGXbiNqtLD-ReXBw"
import React, { useState, useEffect } from "react";
import api from "../api/api";

export default function BookingForm() {
  const [cars, setCars] = useState([]);
  const [cooks, setCooks] = useState([]);
  const [form, setForm] = useState({
    serviceType: "car",
    serviceId: "",
    fromDate: "",
    toDate: "",
    pickupLocation: "",
    dropLocation: "",
    price: 0,
  });

  useEffect(() => {
    async function loadData() {
      try {
        const carsRes = await api.get("/cars/public");
        setCars(carsRes.data);

        const cooksRes = await api.get("/cooks/public");
        setCooks(cooksRes.data);
      } catch (err) {
        console.error("Error loading data:", err.response?.status, err.message);
      }
    }
    loadData();
  }, []);

  async function submit(e) {
    e.preventDefault();
    try {
      const payload = { ...form, serviceId: Number(form.serviceId), price: Number(form.price) };
      const res = await api.post("/bookings", payload); // userId not needed
      alert("Booking created: " + res.data.id);

      setForm({
        serviceType: "car",
        serviceId: "",
        fromDate: "",
        toDate: "",
        pickupLocation: "",
        dropLocation: "",
        price: 0,
      });
    } catch (err) {
      console.error(err);
      if (err.response?.status === 409) alert("Service not available for selected dates");
      else if (err.response?.status === 401) alert("Unauthorized. Please log in.");
      else alert("Error: " + err.message);
    }
  }

  return (
    <form onSubmit={submit}>
      <div>
        <label>Service Type: </label>
        <select value={form.serviceType} onChange={e => setForm({ ...form, serviceType: e.target.value, serviceId: "" })}>
          <option value="car">Car</option>
          <option value="cook">Cook</option>
        </select>
      </div>

      <div>
        <label>Choose {form.serviceType}: </label>
        <select value={form.serviceId} onChange={e => setForm({ ...form, serviceId: e.target.value })}>
          <option value="">-- Select --</option>
          {form.serviceType === "car" 
            ? cars.map(c => <option key={c.id} value={c.id}>{c.model}</option>)
            : cooks.map(c => <option key={c.id} value={c.id}>{c.name}</option>)
          }
        </select>
      </div>

      <input type="date" value={form.fromDate} onChange={e => setForm({ ...form, fromDate: e.target.value })} />
      <input type="date" value={form.toDate} onChange={e => setForm({ ...form, toDate: e.target.value })} />
      <input placeholder="Pickup location" value={form.pickupLocation} onChange={e => setForm({ ...form, pickupLocation: e.target.value })} />
      <input placeholder="Drop location" value={form.dropLocation} onChange={e => setForm({ ...form, dropLocation: e.target.value })} />
      <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />

      <button type="submit">Book</button>
    </form>
  );
}
