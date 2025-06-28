const API_BASE = 'http://127.0.0.1:5555/api/cart';

const getToken = () => {
  return localStorage.getItem('access_token'); // Make sure you store your JWT here after login
};

const authHeader = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

export const cartAPI = {
  // Get current user's cart
  getMyCart: async () => {
    const response = await fetch(`${API_BASE}/`, {
      method: 'GET',
      headers: authHeader(),
    });
    if (!response.ok) throw new Error('Failed to fetch cart');
    return await response.json();
  },

  // Create a new empty cart for current user
  createCart: async () => {
    const response = await fetch(`${API_BASE}/`, {
      method: 'POST',
      headers: authHeader(),
    });
    if (!response.ok) throw new Error('Failed to create cart');
    return await response.json();
  },

  // Add item to cart
  addItemToCart: async (itemData) => {
    const response = await fetch(`${API_BASE}/add-item`, {
      method: 'POST',
      headers: authHeader(),
      body: JSON.stringify(itemData),
    });
    if (!response.ok) throw new Error('Failed to add item');
    return await response.json();
  },

  // Update quantity of an item
  updateItemQuantity: async (product_id, quantity) => {
    const response = await fetch(`${API_BASE}/update-item`, {
      method: 'PATCH',
      headers: authHeader(),
      body: JSON.stringify({ product_id, quantity }),
    });
    if (!response.ok) throw new Error('Failed to update item');
    return await response.json();
  },

  // Remove item from cart
  removeItemFromCart: async (product_id) => {
    const response = await fetch(`${API_BASE}/remove-item?product_id=${product_id}`, {
      method: 'DELETE',
      headers: authHeader(),
    });
    if (!response.ok) throw new Error('Failed to remove item');
    return await response.json();
  },

  // Delete the whole cart
  deleteCart: async () => {
    const response = await fetch(`${API_BASE}/`, {
      method: 'DELETE',
      headers: authHeader(),
    });
    if (!response.ok) throw new Error('Failed to delete cart');
    return await response.json();
  },
};
