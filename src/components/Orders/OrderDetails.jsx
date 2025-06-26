// src/components/Orders/OrderDetails.jsx
import React from 'react';
import { ArrowLeft, Package, Calendar, DollarSign, User } from 'lucide-react';

const OrderDetails = ({ order, onBack, getStatusColor, getStatusIcon, getTotalItems }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!order) {
    return (
      <div className="text-center py-12">
        <Package size={64} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600">Order not found</h3>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
      </div>

      {/* Order Info Card */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Information</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Package size={16} className="text-gray-500" />
                <span className="text-sm text-gray-600">Order ID:</span>
                <span className="text-sm font-mono">{order.id}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-500" />
                <span className="text-sm text-gray-600">Created:</span>
                <span className="text-sm">{formatDate(order.created_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={16} className="text-gray-500" />
                <span className="text-sm text-gray-600">User ID:</span>
                <span className="text-sm font-mono">{order.user_id}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status:</span>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  <span className="mr-1">{getStatusIcon(order.status)}</span>
                  {order.status}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Items:</span>
                <span className="font-semibold">{getTotalItems(order)}</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-gray-800">Total Amount:</span>
                <span className="font-bold text-green-600 flex items-center gap-1">
                  <DollarSign size={16} />
                  {order.total_amount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h2>
        <div className="space-y-4">
          {order.order_items && order.order_items.length > 0 ? (
            order.order_items.map((item, index) => (
              <div key={item.id || index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">
                      Product ID: {item.product_id}
                    </h3>
                    <p className="text-sm text-gray-600">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No items in this order</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;