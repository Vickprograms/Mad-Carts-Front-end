import React from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';

const DeleteProductForm = ({ selectedProduct, setSelectedProduct }) => {
  const BASE_URL = import.meta.env.VITE_API_URL;

  const handleDelete = async () => {
    if (!selectedProduct) return;
    const confirmed = window.confirm(`Delete product "${selectedProduct.name}"?`);
    if (!confirmed) return;

    try {
      await axios.delete(`${BASE_URL}/products/${selectedProduct.id}`);
      alert('Product deleted!');
      setSelectedProduct(null);
    } catch (error) {
      alert('Delete failed');
      console.error(error.message);
    }
  };

  const styles = {
    container: {
      backgroundColor: '#0B0C10',
      color: '#F5F5F5',
      padding: '2rem',
      fontFamily: 'Segoe UI, sans-serif',
      minHeight: '100vh',
    },
    card: {
      backgroundColor: '#1C1F26',
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(255, 215, 0, 0.1)',
      maxWidth: '500px',
      margin: '2rem auto',
      border: '1px solid #2A2C34',
    },
    heading: {
      color: '#FFD700',
      marginBottom: '1rem',
    },
    label: {
      marginBottom: '0.5rem',
      display: 'block',
      fontWeight: 'bold',
    },
    button: {
      marginTop: '1rem',
      backgroundColor: 'red',
      color: '#fff',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Delete Product</h2>
      <Searchbar isAdmin={true} onSelectProduct={setSelectedProduct} />

      {selectedProduct && (
        <div style={styles.card}>
          <p style={styles.label}><strong>ID:</strong> {selectedProduct.id}</p>
          <p style={styles.label}><strong>Name:</strong> {selectedProduct.name}</p>
          <button onClick={handleDelete} style={styles.button}>
            Confirm Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteProductForm;
