import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomeProducts() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/products/categories`);
        setCategories(res.data);
      } catch (err) {
        setError('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/api/products/category?q=${encodeURIComponent(selectedCategory)}`);
        setProducts(res.data);
        setSelectedProduct(null);
        setError(null);
      } catch (err) {
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

  const styles = {
    page: {
      backgroundColor: '#0B0C10',
      color: '#F5F5F5',
      padding: '1rem',
      borderRadius: '8px',
    },
    heading: {
      color: '#FFD700',
      fontSize: '1.5rem',
      marginBottom: '1rem',
    },
    categoryButton: {
      backgroundColor: '#1C1F26',
      color: '#F5F5F5',
      border: '1px solid #2A2C34',
      borderRadius: '8px',
      padding: '1rem',
      cursor: 'pointer',
      minWidth: '140px',
      transition: '0.2s',
    },
    backButton: {
      margin: '1rem 0',
      backgroundColor: '#2A2C34',
      color: '#FFAA00',
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    },
    productCard: {
      backgroundColor: '#1C1F26',
      color: '#F5F5F5',
      border: '1px solid #2A2C34',
      borderRadius: '8px',
      overflow: 'hidden',
      cursor: 'pointer',
      width: '200px',
    },
    productImage: {
      width: '100%',
      height: '140px',
      objectFit: 'cover',
    },
    grid: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      marginTop: '1rem',
    },
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Browse Products by Category</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!selectedCategory && (
        <div style={styles.grid}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              style={styles.categoryButton}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {selectedCategory && !selectedProduct && (
        <>
          <button onClick={backToCategories} style={styles.backButton}>← Back to Categories</button>
          <h2 style={{ color: '#FFAA00' }}>Products in {selectedCategory}</h2>
          {loading ? (
            <p style={{ marginTop: '1rem' }}>Loading products...</p>
          ) : (
            <div style={styles.grid}>
              {products.map((p) => (
                <div
                  key={p.id}
                  style={styles.productCard}
                  onClick={() => handleProductClick(p)}
                >
                  <img
                    src={`${BASE_URL}/static/uploads/${p.media}`}
                    alt={p.name}
                    style={styles.productImage}
                  />
                  <div style={{ padding: '0.5rem' }}>
                    <h4>{p.name}</h4>
                    <p style={{ color: '#FFD700' }}>KES {p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {selectedProduct && (
        <div style={{ marginTop: '1rem' }}>
          <button onClick={backToProducts} style={styles.backButton}>← Back to {selectedCategory}</button>
          <h2 style={{ color: '#FFD700' }}>{selectedProduct.name}</h2>
          <img
            src={`${BASE_URL}/static/uploads/${selectedProduct.media}`}
            alt={selectedProduct.name}
            style={{ width: '300px', borderRadius: '8px', marginBottom: '1rem' }}
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
