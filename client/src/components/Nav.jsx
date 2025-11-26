import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Nav.css";
export default function Nav() {

  const navigate = useNavigate();
  //get loged in user 
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  //drop down for user details

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  return (
    <nav className='navbar'>
      <div className='nav-left'>
        <Link to="/" className='brand'>Urban Company</Link>
      </div>

      {/* Wrap links + user menu together */}
      <div className="nav-right">
        <div className='nav-links'>
          <Link to="/">Home</Link>
          <Link to="/cars">Cars</Link>
          <Link to="/create-car">Add Car</Link>
          <Link to="/cooks">Cooks</Link>
          <Link to="/create-cook">Add Cook</Link>
          <Link to="/booking">New Booking</Link>
          <Link to="/mybookings">Bookings</Link>
        </div>

        {/* if user is logged in ,showing the user details */}

        <div className="nav-user-section">
          {user ? (
            <div
              className={`user-menu ${open ? "open" : ""}`}
              onClick={() => setOpen(!open)}
              ref={dropdownRef}
            >
              <span className="user-name">👤 {user.name} ▼</span>

              <div className="user-dropdown">
                <div className="user-info">
                  <p><strong>{user.name}</strong></p>
                  <p>{user.email}</p>
                </div>

                <button className="logout-btn" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>


      </div>
    </nav>
  );
}
