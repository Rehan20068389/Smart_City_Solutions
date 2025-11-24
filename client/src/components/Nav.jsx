import React from 'react';
import { Link } from 'react-router-dom';
import "./Nav.css";
export default function Nav() {
  return (
    <nav className='navbar'>
      <div className='nav-left'>
         <Link to="/" className='brand'>Urban Company</Link>
         </div>

   <div className='nav-links'>
      <Link to="/">Home</Link> 
       <Link to="/cars">Cars</Link> 
        <Link to="/create-car">Add Car</Link> 
         <Link to="/cooks">Cooks</Link> 
          <Link to="/create-cook">Add Cook</Link> 
           <Link to="/booking">New Booking</Link> 
            <Link to="/mybookings">Bookings</Link> 
             <Link to="/login">Login</Link> 
              <Link to="/signup">Signup</Link>
              </div>
    </nav>
  );
}
