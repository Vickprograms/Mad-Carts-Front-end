// src/components/Cart/CartSummary.jsx
import React from 'react';
import { Calculator } from 'lucide-react';

const CartSummary = ({ cart, totalAmount, totalItems }) => {
  if (!cart || !cart.cart_items || cart.cart_items.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Calculator size={20} />
        Cart Summary
      </h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Items:</span>
          <span className="font-semibold text-gray-800">{totalItems}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-semibold text-gray-800">${totalAmount.toFixed(2)}</span>
        </div>
        
        <div className="border-t pt-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-800">Total Amount:</span>
            <span className="text-2xl font-bold text-green-600">${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-4 p-3 bg-white rounded-lg">
          <p className="text-sm text-gray-600">
            Created: {new Date(cart.created_at).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            Cart ID: {cart.id}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;