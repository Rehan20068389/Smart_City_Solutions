import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import CarCreate from './pages/CarCreate.jsx';
import CookCreate from './pages/CookCreate.jsx';
import CarList from './pages/CarList.jsx';
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
