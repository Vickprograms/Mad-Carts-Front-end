// src/components/Cart/CartList.jsx
import React from 'react';
import CartItem from './CartItem';
import { ShoppingCart } from 'lucide-react';

const CartList = ({ cart, onUpdateQuantity, onRemoveItem }) => {
  if (!cart || !cart.cart_items || cart.cart_items.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
        <p className="text-gray-500">Add some items to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <ShoppingCart size={24} />
        Cart Items ({cart.cart_items.length})
      </h2>
      
      {cart.cart_items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemoveItem}
        />
      ))}
    </div>
  );
};

export default CartList;