// src/pages/OrderDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useOrders } from '../hooks/useOrders';
import OrderList from '../components/Orders/OrderList';
import OrderDetails from '../components/Orders/OrderDetails';
import { RefreshCw, AlertCircle } from 'lucide-react';
import '../styles/orders.css';

// Simple Toast component
function Toast({ message, onClose }) {
  if (!message) return null;
  return (
    <div style={{ position: 'fixed', top: 20, right: 20, background: '#38bdf8', color: 'white', padding: '16px 24px', borderRadius: 8, zIndex: 1000 }}>
      {message}
      <button onClick={onClose} style={{ marginLeft: 16, background: 'transparent', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>✕</button>
    </div>
  );
}

const OrderDetailsPage = () => {
  const {
    orders,
    currentOrder,
    loading,
    error,
    fetchOrders,
    fetchOrder,
    getStatusColor,
    getStatusIcon,
    getTotalItems,
    setCurrentOrder
  } = useOrders();

  const [view, setView] = useState('list'); // 'list' or 'details'
  const [toast, setToast] = useState('');

  // Show a toast if error occurs
  useEffect(() => {
    if (error) setToast(error);
  }, [error]);

  // View order details
  const handleViewDetails = async (orderId) => {
    try {
      await fetchOrder(orderId);
      setView('details');
    } catch (error) {
      console.error('Error fetching order:', error);
      alert('Failed to load order details');
    }
  };

  // Go back to order list
  const handleBackToList = () => {
    setView('list');
    setCurrentOrder(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Toast message={toast} onClose={() => setToast('')} />
      <div className="max-w-6xl mx-auto">
        {view === 'list' ? (
          <>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
                <button
                  onClick={fetchOrders}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                >
                  <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                  Refresh Orders
                </button>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                  <AlertCircle size={20} className="text-red-600" />
                  <span className="text-red-700">{error}</span>
                </div>
              )}
            </div>

            {/* Orders List */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              {loading ? (
                <div className="text-center py-12">
                  <RefreshCw size={48} className="mx-auto text-gray-400 mb-4 animate-spin" />
                  <p className="text-gray-600">Loading orders...</p>
                </div>
              ) : (
                <OrderList
                  orders={orders}
                  onViewDetails={handleViewDetails}
                  getStatusColor={getStatusColor}
                  getStatusIcon={getStatusIcon}
                  getTotalItems={getTotalItems}
                />
              )}
            </div>
          </>
        ) : (
          // Order Details View
          <div className="bg-white rounded-lg shadow-sm border p-6">
            {loading ? (
              <div className="text-center py-12">
                <RefreshCw size={48} className="mx-auto text-gray-400 mb-4 animate-spin" />
                <p className="text-gray-600">Loading order details...</p>
              </div>
            ) : (
              <OrderDetails
                order={currentOrder}
                onBack={handleBackToList}
                getStatusColor={getStatusColor}
                getStatusIcon={getStatusIcon}
                getTotalItems={getTotalItems}
              />
            )}
            
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle size={20} className="text-red-600" />
                <span className="text-red-700">{error}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsPage;