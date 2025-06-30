import React, { useState } from "react";
import axios from "axios";
import Searchbar from "./Searchbar";

const UpdateProductForm = ({ selectedProduct, setSelectedProduct }) => {
  const [formState, setFormState] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const BASE_URL = import.meta.env.VITE_API_URL;

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const formData = new FormData();
    formData.append("name", formState.name || selectedProduct.name);
    formData.append("category", formState.category || selectedProduct.category);
    formData.append("price", formState.price || selectedProduct.price);
    formData.append("quantity", formState.quantity || selectedProduct.quantity);
    formData.append("size", formState.size || selectedProduct.size);
    formData.append("description", formState.description || selectedProduct.description);
    formData.append("brand", formState.brand || selectedProduct.brand);

    if (imageFile) formData.append("image", imageFile);

    try {
      const response = await axios.put(
        `${BASE_URL}/products/${selectedProduct.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setSuccessMessage("✅ Product updated successfully!");
      setSelectedProduct(response.data);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const styles = {
    container: {
      backgroundColor: "#0B0C10",
      color: "#F5F5F5",
      padding: "2rem",
      borderRadius: "8px",
      maxWidth: "600px",
      margin: "2rem auto",
      border: "1px solid #2A2C34",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    label: {
      fontWeight: "bold",
    },
    input: {
      padding: "10px",
      background: "#1C1F26",
      border: "1px solid #2A2C34",
      borderRadius: "4px",
      color: "#F5F5F5",
    },
    button: {
      background: "#FFAA00",
      color: "#0B0C10",
      padding: "10px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    success: {
      color: "#FFD700",
      marginTop: "1rem",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={{ color: "#FFD700", marginBottom: "1rem" }}>Update Product</h2>
      <Searchbar isAdmin={false} onSelectProduct={setSelectedProduct} />

      {selectedProduct && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div><strong>ID:</strong> {selectedProduct.id}</div>

          <label style={styles.label} htmlFor="name">Name</label>
          <input
            style={styles.input}
            type="text"
            name="name"
            defaultValue={selectedProduct.name}
            onChange={handleInputChange}
          />

          <label style={styles.label} htmlFor="category">Category</label>
          <input
            style={styles.input}
            type="text"
            name="category"
            defaultValue={selectedProduct.category}
            onChange={handleInputChange}
          />

          <label style={styles.label} htmlFor="price">Price</label>
          <input
            style={styles.input}
            type="number"
            name="price"
            defaultValue={selectedProduct.price}
            onChange={handleInputChange}
          />

          <label style={styles.label} htmlFor="quantity">Quantity</label>
          <input
            style={styles.input}
            type="number"
            name="quantity"
            defaultValue={selectedProduct.quantity}
            onChange={handleInputChange}
          />

          <label style={styles.label} htmlFor="size">Size</label>
          <input
            style={styles.input}
            type="text"
            name="size"
            defaultValue={selectedProduct.size}
            onChange={handleInputChange}
          />

          <label style={styles.label} htmlFor="brand">Brand</label>
          <input
            style={styles.input}
            type="text"
            name="brand"
            defaultValue={selectedProduct.brand}
            onChange={handleInputChange}
          />

          <label style={styles.label} htmlFor="description">Description</label>
          <textarea
            style={{ ...styles.input, minHeight: "80px" }}
            name="description"
            defaultValue={selectedProduct.description}
            onChange={handleInputChange}
          />

          <label style={styles.label} htmlFor="image">Image</label>
          <input
            style={styles.input}
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />

          <button type="submit" style={styles.button}>Update</button>

          {successMessage && <p style={styles.success}>{successMessage}</p>}
        </form>
      )}
    </div>
  );
};

export default UpdateProductForm;
