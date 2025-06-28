const API_BASE = 'http://127.0.0.1:5555/api/cart';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
  return headers;
};

export const getCart = async () => {
  const response = await fetch(`${API_BASE}/my-cart`, {
    method: 'GET',
    headers: getAuthHeaders()
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch cart: ${response.status}`);
  }

  return await response.json();
};

export const createCart = async () => {
  const response = await fetch(`${API_BASE}/create`, {
    method: 'POST',
    headers: getAuthHeaders()
  });

  if (!response.ok) {
    throw new Error(`Failed to create cart: ${response.status}`);
  }

  return await response.json();
};

export const addItemToCart = async (productId, quantity = 1) => {
  const response = await fetch(`${API_BASE}/add-item`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      product_id: productId,
      quantity: quantity
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to add item to cart: ${response.status}`);
  }

  return await response.json();
};

export const updateCartItem = async (productId, quantity) => {
  const response = await fetch(`${API_BASE}/update-item`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      product_id: productId,
      quantity: quantity
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to update cart item: ${response.status}`);
  }

  return await response.json();
};

export const removeCartItem = async (productId) => {
  const response = await fetch(`${API_BASE}/remove-item`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      product_id: productId
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to remove item from cart: ${response.status}`);
  }

  return await response.json();
};

export const deleteCart = async () => {
  try {
    const response = await fetch(`${API_BASE}/delete`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`Failed to delete cart: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
