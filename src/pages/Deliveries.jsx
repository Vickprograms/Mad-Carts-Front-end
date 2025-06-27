import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeliveryCard from '../components/DeliveryCard';
import DeliveryForm from '../components/DeliveryForm';

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Driver Dashboard - Deliveries</h1>
      <DeliveryForm onCreated={fetchDeliveries} />
      <div className="grid gap-4 mt-4">
        {deliveries.map(delivery => <DeliveryCard key={delivery.id} delivery={delivery} />)}
      </div>
    </div>
  );
}