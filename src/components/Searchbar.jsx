import React, { useState } from 'react';
import axios from 'axios';

const Searchbar = ({ isAdmin, onSelectProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5555/autocomplete?q=${query}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error('Suggestion Error:', error.message);
    }
  };

  const fetchDetails = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://127.0.0.1:5555/autocomplete?q=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Search Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (val.trim().length > 0) {
      fetchSuggestions(val.trim());
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (item) => {
    setSearchTerm(item.name);
    setSuggestions([]);
    fetchDetails(item.name);
    setSelectedProduct(null);
  };

  const handleSearchClick = () => {
    if (searchTerm.trim() !== '') {
      setSuggestions([]);
      fetchDetails(searchTerm.trim());
      setSelectedProduct(null);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    if (onSelectProduct) {
      onSelectProduct(product); // ✅ send selected product up
    }
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;
    try {
      await axios.delete(`http://127.0.0.1:5555/products/${selectedProduct.id}`);
      alert('Product deleted!');
      setResults((prev) => prev.filter((item) => item.id !== selectedProduct.id));
      setSelectedProduct(null);
      if (onSelectProduct) {
        onSelectProduct(null); // Reset in parent too
      }
    } catch (error) {
      alert('Delete failed');
      console.error('Delete error:', error.message);
    }
  };

  return (
    <div style={{ width: '400px', margin: '20px auto', position: 'relative' }}>
      <div style={{ display: 'flex', gap: '5px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search products..."
          style={{ flex: 1, padding: '10px', fontSize: '16px' }}
        />
        <button onClick={handleSearchClick} style={{ padding: '10px' }}>
          Search
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className="autocomplete-list">
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(item)}
              onMouseDown={(e) => e.preventDefault()}
              style={{ padding: '10px', cursor: 'pointer' }}
            >
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
            <ul>
              {results.map((item, i) => (
                <li
                  key={i}
                  onClick={() => handleProductClick(item)}
                  style={{
                    border: selectedProduct?.id === item.id ? '2px solid red' : '1px solid #ccc',
                    padding: '10px',
                    marginBottom: '10px',
                    cursor: 'pointer'
                  }}
                >
                  <img src={item.media} alt={item.name} style={{ maxWidth: '100px' }} />
                  <div><strong>{item.name}</strong></div>
                  <div>{item.description || 'No description'}</div>
                  {isAdmin && selectedProduct?.id === item.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                      }}
                      style={{ marginTop: '5px', color: 'white', backgroundColor: 'red', padding: '5px 10px' }}
                    >
                      Delete
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Searchbar;