import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomeProducts() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch category names
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5555/api/products/categories');
        setCategories(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  // Fetch products for selected category
  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedCategory) return;
      setLoading(true);
      try {
        const res = await axios.get(`http://127.0.0.1:5555/api/products/category?q=${encodeURIComponent(selectedCategory)}`);
        setProducts(res.data);
        setSelectedProduct(null);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryClick = (name) => setSelectedCategory(name);
  const handleProductClick = (product) => setSelectedProduct(product);
  const backToProducts = () => setSelectedProduct(null);
  const backToCategories = () => {
    setSelectedCategory(null);
    setProducts([]);
    setSelectedProduct(null);
  };

  return (
    <div className="home-products" style={{ padding: '1rem' }}>
      <h1>Browse Products by Category</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!selectedCategory && (
        <div className="category-list" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {categories.map((catName) => (
            <button
              key={catName}
              onClick={() => handleCategoryClick(catName)}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                background: 'white',
                padding: '1rem',
                cursor: 'pointer'
              }}
            >
              <h4>{catName}</h4>
            </button>
          ))}
        </div>
      )}

      {selectedCategory && !selectedProduct && (
        <div>
          <button onClick={backToCategories} style={{ margin: '1rem 0' }}>← Back to Categories</button>
          <h2>Products in {selectedCategory}</h2>
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {products.map((p) => (
                <div
                  key={p.id}
                  style={{
                    width: '200px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleProductClick(p)}
                >
                  <img
                    src={`http://127.0.0.1:5555/static/uploads/${p.media}`}
                    alt={p.name}
                    style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '0.5rem' }}>
                    <h4>{p.name}</h4>
                    <p>KES {p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {selectedProduct && (
        <div style={{ marginTop: '1rem' }}>
          <button onClick={backToProducts} style={{ marginBottom: '1rem' }}>← Back to {selectedCategory}</button>
          <h2>{selectedProduct.name}</h2>
          console.log(selectedProduct.media)
          <img
            src={`http://127.0.0.1:5555/static/uploads/${selectedProduct.media}`}
            alt={selectedProduct.name}
            style={{ width: '300px', objectFit: 'cover' }}
          />
          <p><strong>Price:</strong> KES {selectedProduct.price}</p>
          <p><strong>Brand:</strong> {selectedProduct.brand}</p>
          <p>{selectedProduct.description}</p>
        </div>
      )}
    </div>
  );
}

export default HomeProducts;
