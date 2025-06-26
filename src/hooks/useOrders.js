// src/hooks/useOrders.js
import { useState, useEffect } from 'react';
import { ordersAPI } from '../api/ordersAPI';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all orders
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ordersAPI.getOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch single order
  const fetchOrder = async (orderId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await ordersAPI.getOrderById(orderId);
      setCurrentOrder(data);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create new order
  const createOrder = async (orderData) => {
    setLoading(true);
    setError(null);
    try {
      const newOrder = await ordersAPI.createOrder(orderData);
      setOrders(prev => [...prev, newOrder]);
      return newOrder;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update order
  const updateOrder = async (orderData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedOrder = await ordersAPI.updateOrder(orderData);
      setOrders(prev => prev.map(order => 
        order.id === orderData.id ? updatedOrder : order
      ));
      if (currentOrder && currentOrder.id === orderData.id) {
        setCurrentOrder(updatedOrder);
      }
      return updatedOrder;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete order
  const deleteOrder = async (orderId) => {
    setLoading(true);
    setError(null);
    try {
      await ordersAPI.deleteOrder(orderId);
      setOrders(prev => prev.filter(order => order.id !== orderId));
      if (currentOrder && currentOrder.id === orderId) {
        setCurrentOrder(null);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get order status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'shipped':
        return 'text-blue-600 bg-blue-50';
      case 'delivered':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  // Get order status icon
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return '⏳';
      case 'shipped':
        return '🚚';
      case 'delivered':
        return '✅';
      default:
        return '📦';
    }
  };

  // Calculate total items in order
  const getTotalItems = (order) => {
    if (!order || !order.order_items) return 0;
    return order.order_items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };

  // Load orders on hook initialization
  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    currentOrder,
    loading,
    error,
    fetchOrders,
    fetchOrder,
    createOrder,
    updateOrder,
    deleteOrder,
    getStatusColor,
    getStatusIcon,
    getTotalItems,
    setCurrentOrder,
    setError
  };
};