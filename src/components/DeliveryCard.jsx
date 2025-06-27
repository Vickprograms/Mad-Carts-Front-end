import React from 'react';

export default function DeliveryCard({ delivery }) {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <h2 className="font-bold">Order ID: {delivery.order_id}</h2>
      <p>Status: {delivery.status}</p>
      <p>Delivery Date: {delivery.delivery_date}</p>
      <p>Notes: {delivery.delivery_notes}</p>
      {delivery.delivered_at && <p>Delivered At: {delivery.delivered_at}</p>}
    </div>
  );
}