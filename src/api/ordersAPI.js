const API_BASE = 'http://127.0.0.1:5555/api/orders';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
  return headers;
};

export const getOrders = async () => {
  try {
    const response = await fetch(`${API_BASE}/my-orders`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getOrder = async (orderId) => {
  try {
    const response = await fetch(`${API_BASE}/${orderId}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch order: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_BASE}/create`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      throw new Error(`Failed to create order: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateOrder = async (orderId, updateData) => {
  try {
    const response = await fetch(`${API_BASE}/${orderId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updateData)
    });

    if (!response.ok) {
      throw new Error(`Failed to update order: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteOrder = async (orderId) => {
  try {
    const response = await fetch(`${API_BASE}/${orderId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`Failed to delete order: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}; 