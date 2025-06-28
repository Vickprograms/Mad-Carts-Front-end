import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { ShoppingCart } from 'lucide-react';

const AddToCartButton = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await addItem(product.id, 1);
    } catch (error) {
      alert('Failed to add item to cart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="add-to-cart-btn"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        backgroundColor: '#2563eb',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.7 : 1
      }}
    >
      <ShoppingCart size={16} />
      {loading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
};

export default AddToCartButton;


