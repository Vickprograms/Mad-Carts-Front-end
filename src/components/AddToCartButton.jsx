import React, { useState } from 'react';
import {useCart} from '../hooks/useCart';

 export const AddToCartButton = ({ product }) => {
  const { addItem } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      console.log("🛒 Sending to /add-item:", {
  product_id: product.id,
  price: product.price,
  quantity: 1,
});
      await addItem({
        product_id: product.id,
        price: product.price,
        quantity: 1,
      });
      alert(`${product.name} added to cart! 🎉`);
    } catch (error) {
      alert('Oops! Could not add to cart. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className={`bg-black text-white px-6 py-2 rounded hover:bg-gray-800 ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {loading ? 'Adding...' : 'Add to Cart 🛒'}
    </button>
  );
};


