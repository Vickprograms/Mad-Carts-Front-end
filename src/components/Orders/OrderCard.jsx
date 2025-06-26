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
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Order #{order.id.slice(0, 8)}...
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600">{formatDate(order.created_at)}</span>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
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
          <span className="text-sm font-semibold text-green-600">
            ${order.total_amount.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        onClick={() => onViewDetails(order.id)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <Eye size={16} />
        View Details
      </button>
    </div>
  );
};

export default OrderCard;