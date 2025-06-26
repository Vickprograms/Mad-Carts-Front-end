import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductManager from './components/ProductManager';
import MainApp from './components/MainApp';
import './App.css'

function App() {
  return (
    <div style={{ padding: '1rem' }}>
      <nav id="nav-bar">
         <Link to="/">Home</Link>
        <Link to="/ProductManager">Product Manager</Link>
      </nav>

      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/ProductManager" element={<ProductManager />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
