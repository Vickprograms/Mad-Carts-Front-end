// src/pages/CartPage.jsx
import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useOrders } from '../hooks/useOrders';
import CartList from '../components/Cart/CartList';
import CartSummary from '../components/Cart/CartSummary';
import CartActions from '../components/Cart/CartActions';
import { RefreshCw, AlertCircle } from 'lucide-react';
import '../styles/cart.css';


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

  const [selectedCartId, setSelectedCartId] = useState('');

  // Select a cart to display
  const handleCartSelect = (cartId) => {
    setSelectedCartId(cartId);
    const cart = carts.find(c => c.id === cartId);
    setCurrentCart(cart);
  };

  // Update item quantity (simplified - in real app, you'd call API)
  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (!currentCart) return;
    
    // This is a simplified version - in real app, you'd need to call your API
    // to update the cart item quantity
    const updatedCart = {
      ...currentCart,
      cart_items: currentCart.cart_items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    };
    setCurrentCart(updatedCart);
  };

  // Remove item from cart (simplified)
  const handleRemoveItem = (itemId) => {
    if (!currentCart) return;
    
    // This is a simplified version - in real app, you'd need to call your API
    const updatedCart = {
      ...currentCart,
      cart_items: currentCart.cart_items.filter(item => item.id !== itemId)
    };
    setCurrentCart(updatedCart);
  };

  // Convert cart to order
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
      
      // Clear the cart after successful order
      await deleteCart(cart.id);
      setCurrentCart(null);
      setSelectedCartId('');
      
      alert(`Order created successfully! Order ID: ${newOrder.id.slice(0, 8)}...`);
      
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to create order. Please try again.');
    }
  };

  // Clear cart
  const handleClearCart = async (cartId) => {
    try {
      await deleteCart(cartId);
      setCurrentCart(null);
      setSelectedCartId('');
    } catch (error) {
      console.error('Clear cart error:', error);
      alert('Failed to clear cart. Please try again.');
    }
  };

  const totalAmount = currentCart ? calculateCartTotal(currentCart) : 0;
  const totalItems = currentCart ? getTotalItems(currentCart) : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Shopping Cart</h1>
          
          {/* Cart Selection */}
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Select Cart</h2>
              <button
                onClick={fetchCarts}
                disabled={cartLoading}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
              >
                <RefreshCw size={16} className={cartLoading ? 'animate-spin' : ''} />
                Refresh
              </button>
            </div>
            
            {cartError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle size={16} className="text-red-600" />
                <span className="text-red-700">{cartError}</span>
              </div>
            )}

            <select
              value={selectedCartId}
              onChange={(e) => handleCartSelect(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Choose a cart...</option>
              {carts.map((cart) => (
                <option key={cart.id} value={cart.id}>
                  Cart {cart.id.slice(0, 8)}... ({cart.cart_items?.length || 0} items)
                </option>
              ))}
            </select>
          </div>
        </div>

        {currentCart ? (
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
            <p className="text-gray-600">Please select a cart to view its contents.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;