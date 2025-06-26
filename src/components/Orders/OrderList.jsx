// src/components/Orders/OrderList.jsx
import React from 'react';
import OrderCard from './OrderCard';
import { Package } from 'lucide-react';

const OrderList = ({ orders, onViewDetails, getStatusColor, getStatusIcon, getTotalItems }) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package size={64} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No orders found</h3>
        <p className="text-gray-500">Your orders will appear here once you make a purchase.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Package size={24} />
        Your Orders ({orders.length})
      </h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onViewDetails={onViewDetails}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
            getTotalItems={getTotalItems}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderList;