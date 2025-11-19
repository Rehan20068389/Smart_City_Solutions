import React from 'react';
import { Link } from 'react-router-dom';
export default function Nav() {
  return (
    <nav style={{ padding: 10, borderBottom: '1px solid #ddd' }}>
      <Link to="/">Home</Link> | <Link to="/cars">Cars</Link> | <Link to="/create-car">Add Car</Link> | <Link to="/cooks">Cooks</Link> | <Link to="/create-cook">Add Cook</Link> | <Link to="/booking">New Booking</Link> | <Link to="/mybookings">Bookings</Link> | <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
    </nav>
  );
}
