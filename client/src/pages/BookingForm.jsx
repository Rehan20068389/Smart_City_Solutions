//Referance from youtube:"https://youtu.be/NwoAZF66_Go?si=-cPP_x3voUiFbtQf"
//Referance from youtube:"https://youtu.be/tBObk72EYYw?si=DyU_mSI4GqZdkCYt"
//Referance from stack overflow:"https://stackoverflow.com/questions/67748575/
// javascript-submit-form-in-then-block-and-return-false-from-a-non-async-function"
//Referance from chatgpt:"https://chatgpt.com/share/693c695c-dff8-8008-b5d3-729d8e7b5d34"
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

  //my own modifications
  async function submit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("You must log in to make a booking.");

    try {
      const payload = { //creates a payload object with the basic booking details
        serviceType: form.serviceType,
        serviceId: Number(form.serviceId),
        fromDate: form.fromDate,
        toDate: form.toDate,
        price: Number(form.price) };

       if (form.serviceType === "car") {  // only showing the pickup,drop locations only its a car 
        payload.pickupLocation = form.pickupLocation;//service from user.
        payload.dropLocation = form.dropLocation;
      }

      const res = await api.post("/bookings", payload,{//sending the payload
       headers: { Authorization: `Bearer ${token}` },
      })

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
    } catch (err) { //error handling for,availability logic,token missing ,server eroor
      console.error(err);
      if (err.response?.status === 409) alert("Service not available for selected dates");
      else if (err.response?.status === 401) alert("Unauthorized. Please log in.");
      else if (err.response?.status === 500) alert("Server error: " + err.response?.data?.message);
      else alert("Error: " + err.message);
    }
  }

  return (
    <form onSubmit={submit}>
      <div>
        <label>Service Type: </label>
        <select value={form.serviceType} 
        onChange={e => setForm({ ...form, serviceType: e.target.value, serviceId: "",pickupLocation: "",dropLocation: ""   })}>
          <option value="car">Car</option>
          <option value="cook">Cook</option>
        </select>
      </div>

      <div>
        <label>Choose {form.serviceType}: </label>
        <select value={form.serviceId} 
        onChange={e => setForm({ ...form, serviceId: e.target.value })}>
          <option value=""> Select </option>
          {form.serviceType === "car" 
            ? cars.map(c => <option key={c.id} value={c.id}>{c.model}</option>)
            : cooks.map(c => <option key={c.id} value={c.id}>{c.name}</option>)
          }
        </select>
      </div>
 
  {/* my own modifications */}
      <input type="date" value={form.fromDate} onChange={e => setForm({ ...form, fromDate: e.target.value })} />
      <input type="date" value={form.toDate} onChange={e => setForm({ ...form, toDate: e.target.value })} />
  {form.serviceType === "car" && (
        <>
      <input placeholder="Pickup location" value={form.pickupLocation} onChange={e => setForm({ ...form, pickupLocation: e.target.value })} />
      <input placeholder="Drop location" value={form.dropLocation} onChange={e => setForm({ ...form, dropLocation: e.target.value })} />
         </>
   )}

      <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />

      <button type="submit">Book</button>
    </form>
  );
}
