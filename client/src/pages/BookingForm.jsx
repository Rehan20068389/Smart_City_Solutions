//Referance from chatgpt: "https://chatgpt.com/share/693ac586-38b8-8008-890e-ab3f41dd6abb"
//Referance from youtube: ""

import React, { useState, useEffect } from "react";
import api from "../api/api";

export default function BookingForm() {
  const [cars, setCars] = useState([]);
  const [cooks, setCooks] = useState([]);
  const [form, setForm] = useState({
    userId: "",
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
        // Get logged-in user
        const userRes = await api.get("/auth/me");
        setForm(f => ({ ...f, userId: userRes.data.id }));

        // Load cars & cooks
        const carsRes = await api.get("/cars");
        setCars(carsRes.data);

        const cooksRes = await api.get("/cooks");
        setCooks(cooksRes.data);
      } catch (err) {
        console.error("Error loading data:", err.response?.status, err.message);
        if (err.response?.status === 403) {
          alert("You are not authorized. Please log in.");
        }
      }
    }
    loadData();
  }, []);

  async function submit(e) {
    e.preventDefault();
    const payload = { ...form, serviceId: Number(form.serviceId), price: Number(form.price) };
    try {
      const res = await api.post("/bookings", payload);
      alert("Booking created: " + res.data.id);

      setForm({
        ...form,
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
      if (err.response?.status === 409) {
        alert("Service not available for selected dates");
      } else {
        alert("Error: " + err.message);
      }
    }
  }

  return (
    <form onSubmit={submit} style={{ padding: 20 }}>
      <h2>Create Booking</h2>

      <div>
        <label>User ID: </label>
        <input value={form.userId} disabled />
      </div>

      <div>
        <label>Service Type: </label>
        <select
          value={form.serviceType}
          onChange={e => setForm({ ...form, serviceType: e.target.value, serviceId: "" })}
        >
          <option value="car">Car</option>
          <option value="cook">Cook</option>
        </select>
      </div>

      <div>
        <label>Choose {form.serviceType}: </label>
        <select value={form.serviceId} onChange={e => setForm({ ...form, serviceId: e.target.value })}>
          <option value="">-- Select --</option>
          {form.serviceType === "car"
            ? cars.map(c => <option key={c.id} value={c.id}>{c.id} - {c.model}</option>)
            : cooks.map(k => <option key={k.id} value={k.id}>{k.id} - {k.name}</option>)}
        </select>
      </div>

      <div>
        <label>From Date: </label>
        <input type="date" value={form.fromDate} onChange={e => setForm({ ...form, fromDate: e.target.value })} />
      </div>

      <div>
        <label>To Date: </label>
        <input type="date" value={form.toDate} onChange={e => setForm({ ...form, toDate: e.target.value })} />
      </div>

      <div>
        <label>Pickup Location: </label>
        <input value={form.pickupLocation} onChange={e => setForm({ ...form, pickupLocation: e.target.value })} />
      </div>

      <div>
        <label>Drop Location: </label>
        <input value={form.dropLocation} onChange={e => setForm({ ...form, dropLocation: e.target.value })} />
      </div>

      <div>
        <label>Price: </label>
        <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
      </div>

      <button type="submit" style={{ marginTop: 10 }}>Book</button>
    </form>
  );
}
