import React from 'react';
import OrderList from '../components/Orders/OrderList';
import { useOrders } from '../hooks/useOrders';

const OrdersPage = () => {
  const {
    orders,
    loading,
    error,
    getStatusColor,
    getStatusIcon,
    getTotalItems,
    fetchOrder
  } = useOrders();

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading orders...</div>;
  if (error) return <div style={{ padding: '2rem', color: 'red', textAlign: 'center' }}>{error}</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <OrderList
        orders={orders}
        onViewDetails={fetchOrder}
        getStatusColor={getStatusColor}
        getStatusIcon={getStatusIcon}
        getTotalItems={getTotalItems}
      />
    </div>
  );
};

export default OrdersPage; 