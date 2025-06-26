// src/components/Orders/OrderCard.jsx
import React from 'react';
import { Eye, Package, Calendar, DollarSign } from 'lucide-react';

const OrderCard = ({ order, onViewDetails, getStatusColor, getStatusIcon, getTotalItems }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-extrabold text-blue-700 mb-2">
            Order #{order.id.slice(0, 8)}...
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600">{formatDate(order.created_at)}</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-bold shadow ${getStatusColor(order.status)}`}
          style={{ minWidth: 100, textAlign: 'center' }}>
          <span className="mr-1">{getStatusIcon(order.status)}</span>
          {order.status}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Package size={16} className="text-gray-500" />
          <span className="text-sm text-gray-600">
            {getTotalItems(order)} items
          </span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign size={16} className="text-gray-500" />
          <span className="text-lg font-bold text-green-600">
            ${order.total_amount.toFixed(2)}
          </span>
        </div>
      </div>
      <button
        onClick={() => onViewDetails(order.id)}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg shadow"
      >
        <Eye size={18} />
        View Details
      </button>
    </div>
  );
};

export default OrderCard;