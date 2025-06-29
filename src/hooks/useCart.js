import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCart, createCart, addItemToCart, updateCartItem, removeCartItem, deleteCart } from '../api/cartAPI';

export const useCart = () => {
  const [currentCart, setCurrentCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchMyCart = async () => {
    if (!user) {
      setCurrentCart(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getCart();
      
      if (data.message) {
        setCurrentCart(null);
      } else if (data.cart_items && Array.isArray(data.cart_items)) {
        setCurrentCart(data);
      } else {
        setCurrentCart(null);
      }
    } catch (err) {
      setError(err.message);
      
      try {
        const newCart = await createCart();
        setCurrentCart(newCart);
      } catch (createErr) {
        setError(createErr.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (productId, price, quantity = 1) => {
    setLoading(true);
    setError(null);

    try {

      if (!currentCart) {
        await createCart();
        await fetchMyCart();
      }
      
      await addItemToCart(productId, price, quantity);

      await fetchMyCart();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateItemQuantity = async (productId, quantity) => {
    if (!currentCart) return;
    
    setLoading(true);
    setError(null);

    try {
      const updatedCart = await updateCartItem(productId, quantity);
      setCurrentCart(updatedCart);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    if (!currentCart) return;
    
    setLoading(true);
    setError(null);

    try {
      const updatedCart = await removeCartItem(productId);
      setCurrentCart(updatedCart);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!currentCart || !currentCart.cart_items || currentCart.cart_items.length === 0) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      for (const item of currentCart.cart_items) {
        await removeCartItem(item.product_id);
      }
      setCurrentCart(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateCartTotal = (cart) => {
    if (!cart || !cart.cart_items) return 0;
    return cart.cart_items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = (cart) => {
    if (!cart || !cart.cart_items) return 0;
    return cart.cart_items.reduce((total, item) => total + item.quantity, 0);
  };


  useEffect(() => {
    setCurrentCart(null);
    setError(null);
  }, [user?.id]);


  useEffect(() => {
    if (user) {
      fetchMyCart();
    }
  }, [user?.id]);

  return {
    currentCart,
    loading,
    error,
    fetchMyCart,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
    calculateCartTotal,
    getTotalItems
  };
}; 