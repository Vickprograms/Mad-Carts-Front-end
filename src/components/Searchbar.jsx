import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Stylesheet.css';
import { logSearchHistory, logRecentView } from '../api/productManagerApi';

import { useAuth } from '../context/AuthContext';

const Searchbar = ({ isAdmin, onSelectProduct }) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef(null);
  const debounceRef = useRef(null);

  // Hide suggestions when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch suggestions
  const fetchSuggestions = async (query) => {
    try {
      const res = await axios.get(`http://127.0.0.1:5555/api/products/autocomplete?q=${query}`);
      setSuggestions(res.data);
      setShowSuggestions(true);
    } catch (err) {
      console.error('Suggestion error:', err);
    }
  };

  // Fetch search results and log search history
  const fetchResults = async (query) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://127.0.0.1:5555/api/products/autocomplete?q=${query}`);
      setResults(res.data);
      if (user) await logSearchHistory(query, localStorage.getItem('token'));
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change with debounce
  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (val.trim()) fetchSuggestions(val.trim());
      else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);
  };

  const handleSuggestionClick = (item) => {
    setSearchTerm(item.name);
    setShowSuggestions(false);
    fetchResults(item.name);
    setSelectedProduct(null);
  };

  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      fetchResults(searchTerm.trim());
      setSelectedProduct(null);
    }
  };

  const handleSelect = async (item) => {
    try {
      const res = await axios.get(`http://127.0.0.1:5555/api/products/${item.id}`);
      const product = res.data;
      setSelectedProduct(product);
      onSelectProduct?.(product);
      if (user) await logRecentView(item.id, localStorage.getItem('token'));
    } catch (err) {
      alert('Could not fetch product details.');
      console.error(err);
    }
  };

  return (
    <div className='searchbar-container' ref={containerRef}>
      {!selectedProduct && (
        <>
          <div className='searchbar'>
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={() => searchTerm.trim() && setShowSuggestions(true)}
              placeholder="Search products..."
              style={{ flex: 1, padding: '10px', fontSize: '16px' }}
            />
            <button onClick={handleSearchClick} style={{ padding: '10px' }}>🔍</button>
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <ul className="autocomplete-list">
              {suggestions.map(item => (
                <li
                  key={item.id}
                  onClick={() => handleSuggestionClick(item)}
                  onMouseDown={e => e.preventDefault()}
                  style={{ padding: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  {item.media && (
                    <img src={item.media} alt={item.name}
                         style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: '10px' }} />
                  )}
                  {item.name}
                </li>
              ))}
            </ul>
          )}

          <div style={{ marginTop: '20px' }}>
            {loading && <p>Loading results...</p>}
            {!loading && results.length > 0 && (
              <div>
                <h3>Results:</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {results.map(item => (
                    <li key={item.id} style={{ marginBottom: '10px' }}>
                      <button
                        onClick={() => handleSelect(item)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          border: selectedProduct?.id === item.id ? '2px solid red' : '1px solid #ccc',
                          padding: '10px',
                          background: 'white',
                          cursor: 'pointer'
                        }}
                      >
                        {item.media && (
                          <img src={item.media} alt={item.name}
                               style={{ maxWidth: '60px', marginRight: '10px' }} />
                        )}
                        <div>
                          <strong>{item.name}</strong>
                          <p>{item.description?.slice(0, 50)}...</p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}

      {selectedProduct && (
        <div className='product-detail'>
          <button onClick={() => setSelectedProduct(null)} style={{ marginBottom: '20px' }}>
            Back 
          </button>
          <div className='product-box'>
            <img src={selectedProduct.media} alt={selectedProduct.name} style={{ maxWidth: '200px' }} />
            <p>{selectedProduct.description}</p>
            <p><strong>Name:</strong> {selectedProduct.name}</p>
            <p><strong>Category:</strong> {selectedProduct.category}</p>
            <p><strong>Price:</strong> {selectedProduct.price}</p>
            <p><strong>Size:</strong> {selectedProduct.size}</p>
            <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
            <p><strong>Brand:</strong> {selectedProduct.brand}</p>
          </div>
          {isAdmin && (
            <button
              onClick={async () => {
                try {
                  await axios.delete(`http://127.0.0.1:5555/api/products/${selectedProduct.id}`);
                  alert('Product deleted.');
                  setSelectedProduct(null);
                  setResults(prev => prev.filter(p => p.id !== selectedProduct.id));
                } catch {
                  alert('Delete failed.');
                }
              }}
              style={{ marginTop: '10px', backgroundColor: 'red', color: 'white', padding: '10px' }}
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
