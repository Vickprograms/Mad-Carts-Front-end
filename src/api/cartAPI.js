// src/api/cartAPI.js
const API_BASE = 'http://localhost:5000/api';


export const cartAPI = {
  // Get all carts
  getCarts: async () => {
    try {
      const response = await fetch(`${API_BASE}/carts`);
      if (!response.ok) throw new Error('Failed to fetch carts');
      return await response.json();
    } catch (error) {
      console.error('Error fetching carts:', error);
      throw error;
    }
  },

  // Get one cart by ID
  getCart: async (id) => {
    try {
      const response = await fetch(`${API_BASE}/carts/${id}`);
      if (!response.ok) throw new Error('Failed to fetch cart');
      return await response.json();
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  // Create a new cart
  createCart: async (cartData) => {
    try {
      const response = await fetch(`${API_BASE}/carts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData)
      });
      if (!response.ok) throw new Error('Failed to create cart');
      return await response.json();
    } catch (error) {
      console.error('Error creating cart:', error);
      throw error;
    }
  },

  // Update a cart
  updateCart: async (id, cartData) => {
    try {
      const response = await fetch(`${API_BASE}/carts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData)
      });
      if (!response.ok) throw new Error('Failed to update cart');
      return await response.json();
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  },

  // Delete a cart
deleteCart: async (id) => {
  try {
    const response = await fetch(`${API_BASE}/carts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'  // 💥 this is the missing piece
      }
    });
    if (!response.ok) throw new Error('Failed to delete cart');
    return await response.json();
  } catch (error) {
    console.error('Error deleting cart:', error);
    throw error;
  }
}

};
