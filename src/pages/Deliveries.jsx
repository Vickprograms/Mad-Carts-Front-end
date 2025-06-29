import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeliveryCard from '../components/DeliveryCard';
import DeliveryForm from '../components/DeliveryForm';
import "../styles/deliveries.css";

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);

  async function fetchDeliveries() {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/deliveries', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setDeliveries(res.data);
  }

  useEffect(() => {
    fetchDeliveries();
  }, []);

  return (
    <div className="deliveries-container">
      <div className="deliveries-card">
        <h1 className="deliveries-title">Your Deliveries</h1>
        <DeliveryForm onCreated={fetchDeliveries} />
        <div className="deliveries-list">
          {deliveries.length === 0 ? (
            <div className="deliveries-empty">No deliveries found.</div>
          ) : (
            deliveries.map(delivery => (
              <div className="delivery-item" key={delivery.id}>
                <DeliveryCard delivery={delivery} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}