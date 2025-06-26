// src/components/Cart/CartActions.jsx
import React, { useState } from 'react';
import { ShoppingBag, Trash2, AlertTriangle } from 'lucide-react';

const CartActions = ({ cart, onCheckout, onClearCart, loading }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCheckout = () => {
    if (!cart || !cart.cart_items || cart.cart_items.length === 0) {
      alert('Cart is empty!');
      return;
    }
    onCheckout(cart);
  };

  const handleClearCart = () => {
    if (showConfirm) {
      onClearCart(cart.id);
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
    }
  };

  const cancelClear = () => {
    setShowConfirm(false);
  };

  if (!cart || !cart.cart_items || cart.cart_items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <ShoppingBag size={20} />
        {loading ? 'Processing...' : 'Proceed to Checkout'}
      </button>

      {/* Clear Cart Section */}
      {!showConfirm ? (
        <button
          onClick={handleClearCart}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Trash2 size={18} />
          Clear Cart
        </button>
      ) : (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={20} className="text-red-600" />
            <span className="font-semibold text-red-800">Confirm Clear Cart</span>
          </div>
          <p className="text-red-700 mb-4">
            Are you sure you want to clear all items from your cart? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleClearCart}
              disabled={loading}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Yes, Clear Cart
            </button>
            <button
              onClick={cancelClear}
              disabled={loading}
              className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartActions;