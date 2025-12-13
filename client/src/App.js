import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import CarCreate from './pages/CarCreate.jsx';
import CookCreate from './pages/CookCreate.jsx';
import CarList from './pages/CarList.jsx';
import CookList from './pages/CookList.jsx';
import UserDashboard from './components/UserDashboard.js';
import ProviderDashboard from './components/providerDashboard.js';
import BookingForm from './pages/BookingForm.jsx';
import MyBookings from './pages/MyBookings.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminUsers from './pages/admin/AdminUsers.jsx';
import AdminProviders from './pages/admin/AdminProviders.jsx';
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path="/create-car" element={<CarCreate />} />
          <Route path="/create-cook" element={<CookCreate />} />
          <Route path="/cars" element={<CarList />} />
          <Route path='/cooks' element={<CookList />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/provider-dashboard" element={<ProviderDashboard />} />
          <Route path='/booking' element={<BookingForm />} />
          <Route path='/my-bookings' element={<MyBookings />} />
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/admin/users' element={<AdminUsers />} />
          <Route path='/admin/providers' element={<AdminProviders />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
