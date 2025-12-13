//Reference from chatgpt

import React from 'react';
export default function HomePage() {
  const card = { width: 250, padding: 20, borderRadius: 8, border: '1px solid #ddd' };
  return (
    <div style={{ padding: 40 }}>
      <h1>Urban Company — Services </h1>
      <p>Book trusted professionals for home services, now with Car & Cook booking.</p>
      <div style={{ display: 'flex', gap: 20, marginTop: 20 }}>
        <div style={card}>
          <h3>Car Booking</h3>
          <p>Rent cars with/without driver.</p>
          <a href="/cars">Explore</a>
        </div>
        <div style={card}>
          <h3>Cook Booking</h3>
          <p>Hire cooks for events or daily meals.</p>
          <a href="/cooks">Explore</a>
        </div>
        <div style={card}>
          <h3>Bookings</h3>
          <p>View your bookings.</p>
          <a href="/my-bookings">View</a>
        </div>
      </div>
    </div>
  );
}
