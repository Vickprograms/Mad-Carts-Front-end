import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { logSearchHistory, logRecentView } from '../api/productManagerApi';

const Searchbar = ({ isAdmin, onSelectProduct }) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const containerRef = useRef(null);
  const debounceRef = useRef(null);

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const timeout = { current: null };

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        timeout.current = setTimeout(() => {
          setShowSuggestions(false);
          setResults([]);
          setSelectedProduct(null);
        }, 150);
      }
    };

    const cancelCollapse = () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    containerRef.current?.addEventListener('mousedown', cancelCollapse);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      containerRef.current?.removeEventListener('mousedown', cancelCollapse);
    };
  }, []);

  const fetchSuggestions = async (query) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products/autocomplete?q=${query}`);
      setSuggestions(res.data);
      setShowSuggestions(true);
    } catch {
      setSuggestions([]);
    }
  };

  const fetchResults = async (query) => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/products/autocomplete?q=${query}`);
      setResults(res.data);
      if (user) await logSearchHistory(query, localStorage.getItem('token'));
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (value.trim()) fetchSuggestions(value.trim());
      else setShowSuggestions(false);
    }, 300);
  };

  const handleSuggestionClick = (item) => {
    setSearchTerm(item.name);
    setShowSuggestions(false);
    handleSelect(item);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchResults(searchTerm.trim());
      setShowSuggestions(false);
      setSelectedProduct(null);
    }
  };

  const handleSelect = async (item) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products/${item.id}`);
      const product = res.data;
      setSelectedProduct(product);
      onSelectProduct?.(product);
      if (user) await logRecentView(item.id, localStorage.getItem('token'));
    } catch {
      alert('Could not load product details.');
    }
  };

  return (
    <div ref={containerRef} style={{ maxWidth: '700px', margin: '2rem auto', color: '#F5F5F5' }}>
      {!selectedProduct && (
        <>
          <div style={{ display: 'flex', marginBottom: '1rem' }}>
            <input
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search products..."
              style={{
                flex: 1,
                padding: '12px',
                fontSize: '16px',
                background: '#1C1F26',
                color: '#F5F5F5',
                border: '1px solid #2A2C34',
                borderRadius: '6px 0 0 6px',
              }}
            />
            <button
              onClick={handleSearch}
              style={{
                padding: '12px 20px',
                background: '#FFAA00',
                border: 'none',
                borderRadius: '0 6px 6px 0',
                color: '#0B0C10',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              🔍
            </button>
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <ul style={{ background: '#1C1F26', border: '1px solid #2A2C34', borderRadius: '6px', listStyle: 'none', padding: '0' }}>
              {suggestions.map((s) => (
                <li
                  key={s.id}
                  onClick={() => handleSuggestionClick(s)}
                  style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #2A2C34' }}
                >
                  {s.name}
                </li>
              ))}
            </ul>
          )}

          {loading && <p style={{ color: '#FFAA00' }}>Loading results...</p>}

          {results.length > 0 && (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {results.map((item) => (
                <li key={item.id} style={{ marginBottom: '1rem' }}>
                  <button
                    onClick={() => handleSelect(item)}
                    style={{
                      width: '100%',
                      background: '#1C1F26',
                      color: '#F5F5F5',
                      textAlign: 'left',
                      padding: '1rem',
                      border: '1px solid #2A2C34',
                      borderRadius: '6px',
                    }}
                  >
                    <strong>{item.name}</strong>
                    <p style={{ marginTop: '4px', color: '#ccc' }}>{item.description?.slice(0, 60)}...</p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {selectedProduct && (
        <div style={{ background: '#1C1F26', padding: '1rem', borderRadius: '6px' }}>
          <button onClick={() => setSelectedProduct(null)} style={{ marginBottom: '1rem', color: '#FFAA00' }}>
            ← Back
          </button>
          <h3>{selectedProduct.name}</h3>
          <img
            src={selectedProduct.media}
            alt={selectedProduct.name}
            style={{ maxWidth: '300px', margin: '1rem 0' }}
          />
          <p><strong>Category:</strong> {selectedProduct.category}</p>
          <p><strong>Price:</strong> KES {selectedProduct.price}</p>
          <p><strong>Size:</strong> {selectedProduct.size}</p>
          <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
          <p><strong>Brand:</strong> {selectedProduct.brand}</p>
          <p>{selectedProduct.description}</p>

          {isAdmin && (
            <button
              onClick={async () => {
                try {
                  await axios.delete(`${BASE_URL}/api/products/${selectedProduct.id}`);
                  alert('Product deleted');
                  setSelectedProduct(null);
                  setResults((prev) => prev.filter((p) => p.id !== selectedProduct.id));
                } catch {
                  alert('Failed to delete');
                }
              }}
              style={{
                backgroundColor: 'red',
                color: '#fff',
                padding: '10px',
                borderRadius: '4px',
                marginTop: '1rem',
              }}
            >
              Delete Product
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
