import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryProductViewer from './CategoryProductViewer';
import Searchbar from './Searchbar';

function MainApp() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/categories`);
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const logRecentView = (productId) => {
    axios.post(`${BASE_URL}/create-history`, {
      product_id: productId,
      user_id: user?.id,
    }).catch(err => {
      console.error('Failed to log recent view:', err);
    });
  };

  return (
    <>
      <Searchbar />

      {!selectedCategory ? (
        <>
          <h2>Pick a category</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {categories.map((cat, i) => (
              <button
                key={`${cat}-${i}`}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  border: '1px solid #ccc',
                  backgroundColor: '#f9f9f9'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => setSelectedCategory(null)}
            style={{ marginBottom: '1rem' }}
          >
            ← Back to Categories
          </button>
          <CategoryProductViewer
            category={selectedCategory}
            logRecentView={logRecentView}
          />
        </>
      )}
    </>
  );
}

export default MainApp;
