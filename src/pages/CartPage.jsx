// src/pages/CartPage.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { useOrders } from '../hooks/useOrders';
import CartList from '../components/Cart/CartList';
import CartSummary from '../components/Cart/CartSummary';
import CartActions from '../components/Cart/CartActions';
import { RefreshCw, AlertCircle } from 'lucide-react';
import '../styles/cart.css';
import { useNavigate } from 'react-router-dom';

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

const CartPage = () => {
  const {
    carts,
    currentCart,
    loading: cartLoading,
    error: cartError,
    fetchCarts,
    updateCart,
    deleteCart,
    calculateCartTotal,
    getTotalItems,
    setCurrentCart
  } = useCart();

  const {
    createOrder,
    loading: orderLoading,
    error: orderError
  } = useOrders();

  const navigate = useNavigate();
  const [toast, setToast] = useState('');

  // On mount, set the current cart to the first cart (if any)
  React.useEffect(() => {
    if (carts.length > 0) {
      setCurrentCart(carts[0]);
    } else {
      setCurrentCart(null);
    }
  }, [carts, setCurrentCart]);

  // Update item quantity (local state only)
  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (!currentCart) return;
    const updatedCart = {
      ...currentCart,
      cart_items: currentCart.cart_items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    };
    setCurrentCart(updatedCart);
  };

  // Remove item from cart (local state only)
  const handleRemoveItem = (itemId) => {
    if (!currentCart) return;
    const updatedCart = {
      ...currentCart,
      cart_items: currentCart.cart_items.filter(item => item.id !== itemId)
    };
    setCurrentCart(updatedCart);
  };

  // Checkout
  const handleCheckout = async (cart) => {
    try {
      const orderData = {
        user_id: cart.user_id,
        total_amount: calculateCartTotal(cart),
        order_items: cart.cart_items.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price
        }))
      };
      const newOrder = await createOrder(orderData);
      await deleteCart(cart.id);
      setCurrentCart(null);
      setToast('Order placed successfully! Redirecting...');
      setTimeout(() => {
        setToast('');
        navigate(`/orders/${newOrder.id}`);
      }, 2000);
    } catch (error) {
      setToast('Failed to create order. Please try again.');
    }
  };

  // Clear cart
  const handleClearCart = async (cartId) => {
    try {
      await deleteCart(cartId);
      setCurrentCart(null);
      setToast('Cart cleared!');
    } catch (error) {
      setToast('Failed to clear cart. Please try again.');
    }
  };

  const totalAmount = currentCart ? calculateCartTotal(currentCart) : 0;
  const totalItems = currentCart ? getTotalItems(currentCart) : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Toast message={toast} onClose={() => setToast('')} />
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Shopping Cart</h1>
          <button
            onClick={() => navigate('/')}
            className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium"
          >
            ← Back to Shopping
          </button>
        </div>
        {cartLoading ? (
          <div className="text-center py-12">
            <RefreshCw size={48} className="mx-auto text-gray-400 mb-4 animate-spin" />
            <p className="text-gray-600">Loading cart...</p>
          </div>
        ) : currentCart ? (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <CartList
                cart={currentCart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
            </div>
            {/* Cart Summary & Actions */}
            <div className="space-y-6">
              <CartSummary
                cart={currentCart}
                totalAmount={totalAmount}
                totalItems={totalItems}
              />
              <CartActions
                cart={currentCart}
                onCheckout={handleCheckout}
                onClearCart={handleClearCart}
                loading={orderLoading || cartLoading}
              />
              {orderError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                  <AlertCircle size={16} className="text-red-600" />
                  <span className="text-red-700">{orderError}</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">Your cart is empty.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;