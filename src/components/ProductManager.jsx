import React, { useState } from "react";
import CreateProductForm from "./CreateProductForm";
import UpdateProductForm from "./UpdateProductForm";
import PartialUpdateForm from "./PartialUpdateForm";
import DeleteProductForm from "./DeleteProductForm";

const ProductManager = () => {
  const [mode, setMode] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const styles = {
    container: {
      backgroundColor: '#0B0C10',
      color: '#F5F5F5',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: 'Segoe UI, sans-serif',
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#FFD700',
      marginBottom: '1rem',
    },
    buttonGroup: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
    },
    button: {
      padding: '10px 16px',
      backgroundColor: '#FFAA00',
      border: 'none',
      borderRadius: '4px',
      color: '#0B0C10',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background 0.2s',
    },
    section: {
      marginTop: '2rem',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🛠️ Product Manager</h2>
      <div style={styles.buttonGroup}>
        <button onClick={() => setMode("create")} style={styles.button}>Create</button>
        <button onClick={() => setMode("update")} style={styles.button}>Update</button>
        <button onClick={() => setMode("partial")} style={styles.button}>Partial Update</button>
        <button onClick={() => setMode("delete")} style={styles.button}>Delete</button>
      </div>

      <div style={styles.section}>
        {mode === "create" && <CreateProductForm />}
        {mode === "update" && (
          <UpdateProductForm 
            selectedProduct={selectedProduct} 
            setSelectedProduct={setSelectedProduct} 
          />
        )}
        {mode === "partial" && (
          <PartialUpdateForm 
            selectedProduct={selectedProduct} 
            setSelectedProduct={setSelectedProduct} 
          />
        )}
        {mode === "delete" && (
          <DeleteProductForm 
            selectedProduct={selectedProduct} 
            setSelectedProduct={setSelectedProduct} 
          />
        )}
      </div>
    </div>
  );
};

export default ProductManager;
