const API_BASE = `${import.meta.env.VITE_API_URL}/api/cart`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
  return headers;
};

export const getCart = async () => {
  const response = await fetch(`${API_BASE}/`, {
    method: 'GET',
    headers: getAuthHeaders()
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch cart: ${response.status}`);
  }

  return await response.json();
};

export const createCart = async () => {
  const response = await fetch(`${API_BASE}/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({})
  });

  if (!response.ok) {
    throw new Error(`Failed to create cart: ${response.status}`);
  }

  return await response.json();
};

export const addItemToCart = async (productId, price, quantity = 1) => {
  const response = await fetch(`${API_BASE}/add-item`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      product_id: productId,
      price: price,
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
    method: 'PATCH',
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
  const response = await fetch(`${API_BASE}/remove-item?product_id=${encodeURIComponent(productId)}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });

  if (!response.ok) {
    throw new Error(`Failed to remove item from cart: ${response.status}`);
  }

  return await response.json();
};

export const deleteCart = async () => {
  try {
    const response = await fetch(`${API_BASE}/`, {
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
