// src/pages/Deliveries.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeliveryCard from '../components/DeliveryCard';
import DeliveryForm from '../components/DeliveryForm';
import './Deliveries.css';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);

  async function fetchDeliveries() {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/deliveries', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDeliveries(res.data);
    } catch (err) {
      console.error("Failed to fetch deliveries:", err);
    }
  }

  useEffect(() => {
    fetchDeliveries();
  }, []);

  return (
    <div className="deliveries-container">
      <h1 className="dashboard-title">Driver Dashboard - Deliveries</h1>

      <div className="form-container">
        <DeliveryForm onCreated={fetchDeliveries} />
      </div>

      <div className="deliveries-list">
        {deliveries.map(delivery => (
          <div key={delivery.id} className="delivery-card-wrapper">
            <DeliveryCard delivery={delivery} />
          </div>
        ))}
      </div>
    </div>
  );
}
