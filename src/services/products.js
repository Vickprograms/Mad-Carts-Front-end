const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchAllProducts = async () => {
  const response = await fetch(`${BASE_URL}/api/products/products`);
  return await response.json();
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/products/${id}`);
  return await response.json();
};
  