export const fetchProducts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5555/api/products/products');
      
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json()
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };
  
  export const fetchProductById = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/api/products/${id}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  };
  