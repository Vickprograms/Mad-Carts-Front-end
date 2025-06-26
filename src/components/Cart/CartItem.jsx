// src/components/Cart/CartItem.jsx
import React from 'react';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(item.id, newQuantity);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-3 hover:shadow-md transition-shadow flex items-center border-l-4 border-blue-400">
      <ShoppingCart size={32} className="mr-4 text-blue-400" />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 mb-1">
          Product ID: {item.product_id}
        </h3>
        <p className="text-gray-600 text-sm mb-2">
          Price: ${item.price.toFixed(2)} each
        </p>
        <p className="text-lg font-bold text-green-600">
          Total: ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
      <div className="flex items-center gap-3">
        {/* Quantity Controls */}
        <div className="flex items-center border rounded-lg">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="p-2 hover:bg-gray-100 transition-colors"
            disabled={item.quantity <= 1}
          >
            <Minus size={16} className={item.quantity <= 1 ? 'text-gray-300' : 'text-gray-600'} />
          </button>
          <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="p-2 hover:bg-gray-100 transition-colors"
          >
            <Plus size={16} className="text-gray-600" />
          </button>
        </div>
        {/* Remove Button */}
        <button
          onClick={() => onRemove(item.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;