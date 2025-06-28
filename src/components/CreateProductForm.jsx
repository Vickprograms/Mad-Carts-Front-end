import React, { useState } from "react";
import Searchbar from "./Searchbar";
import axios from 'axios';

const CreateProductForm = () => {
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    size: '',
    description: '',
    brand: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert("You must be logged in to create a product.");
      return;
    }

    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }

    try {
      
      for (let pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }

      await axios.post(
        'http://127.0.0.1:5555/api/products/create',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
          timeout: 10000
        }
      );
      alert("✅ Product created successfully!");
    } catch (error) {
      console.error("❌ Error creating product:", error);
      alert("Failed to create product. Check console for details.");
    }
  };

  const styles = {
    container: {
      backgroundColor: '#0B0C10',
      color: '#F5F5F5',
      padding: '2rem',
      minHeight: '100vh',
      fontFamily: 'Segoe UI, sans-serif'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      maxWidth: '500px',
      margin: '2rem auto',
      backgroundColor: '#1C1F26',
      padding: '2rem',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(255, 215, 0, 0.1)'
    },
    label: {
      color: '#F5F5F5',
      fontWeight: 'bold'
    },
    input: {
      padding: '0.6rem',
      border: '1px solid #2A2C34',
      borderRadius: '5px',
      backgroundColor: '#0B0C10',
      color: '#F5F5F5'
    },
    button: {
      padding: '0.8rem',
      backgroundColor: '#FFAA00',
      color: '#0B0C10',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      marginTop: '1rem'
    }
  };

  return (
    <div style={styles.container}>
      <Searchbar />
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label} htmlFor="name">Name:</label>
        <input name="name" id="name" onChange={handleChange} placeholder="Name" style={styles.input} />

        <label style={styles.label} htmlFor="category">Category:</label>
        <input name="category" id="category" onChange={handleChange} placeholder="Category" style={styles.input} />

        <label style={styles.label} htmlFor="price">Price:</label>
        <input name="price" id="price" onChange={handleChange} placeholder="Price" type="number" style={styles.input} />

        <label style={styles.label} htmlFor="quantity">Quantity:</label>
        <input name="quantity" id="quantity" onChange={handleChange} placeholder="Quantity" type="number" style={styles.input} />

        <label style={styles.label} htmlFor="size">Size:</label>
        <input name="size" id="size" onChange={handleChange} placeholder="Size" style={styles.input} />

        <label style={styles.label} htmlFor="description">Description:</label>
        <input name="description" id="description" onChange={handleChange} placeholder="Description" style={styles.input} />

        <label style={styles.label} htmlFor="brand">Brand:</label>
        <input name="brand" id="brand" onChange={handleChange} placeholder="Brand" style={styles.input} />

        <label style={styles.label} htmlFor="image">Image:</label>
        <input type="file" id="image" name="image" onChange={handleChange} style={styles.input} />

        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

export default CreateProductForm;
