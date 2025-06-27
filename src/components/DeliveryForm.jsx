import React, { useState } from 'react';
import axios from 'axios';

export default function DeliveryForm({ onCreated }) {
  const [form, setForm] = useState({ order_id: '', delivery_notes: '', delivery_date: '' });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/deliveries', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onCreated();
      setForm({ order_id: '', delivery_notes: '', delivery_date: '' });
    } catch (err) {
      alert('Error creating delivery');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded">
      <input name="order_id" value={form.order_id} onChange={handleChange} placeholder="Order ID" className="block w-full mb-2" />
      <input name="delivery_date" value={form.delivery_date} onChange={handleChange} type="date" className="block w-full mb-2" />
      <textarea name="delivery_notes" value={form.delivery_notes} onChange={handleChange} placeholder="Notes" className="block w-full mb-2"></textarea>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Create Delivery</button>
    </form>
  );
}
