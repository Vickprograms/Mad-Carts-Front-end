import React, { useState } from "react";
import Searchbar from "./Searchbar";
import axios from 'axios';
import './Stylesheet.css';

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

    const token = localStorage.getItem('token'); // 🛡️ Retrieve token from local storage

    if (!token) {
      alert("You must be logged in to create a product.");
      return;
    }

    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }

    try {
        console.log("🚀 Sending FormData:");
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
          timeout:10000
        }
      );
      alert("✅ Product created successfully!");
    } catch (error) {
      console.error("❌ Error creating product:", error);
      alert("Failed to create product. Check console for details.");
    }
  };

  return (
    <div className="create-container">
      <Searchbar />
      <div>
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="name">name:</label>
          <input name="name" id="name" onChange={handleChange} placeholder="Name" />

          <label htmlFor="category">category:</label>
          <input name="category" id="category" onChange={handleChange} placeholder="Category" />

          <label htmlFor="price">price:</label>
          <input name="price" id="price" onChange={handleChange} placeholder="Price" type="number" />

          <label htmlFor="quantity">quantity:</label>
          <input name="quantity" id="quantity" onChange={handleChange} placeholder="Quantity" type="number" />

          <label htmlFor="size">size:</label>
          <input name="size" id="size" onChange={handleChange} placeholder="Size" />

          <label htmlFor="description">description:</label>
          <input name="description" id="description" onChange={handleChange} placeholder="Description" />

          <label htmlFor="brand">brand:</label>
          <input name="brand" id="brand" onChange={handleChange} placeholder="Brand" />

          <label htmlFor="image">image:</label>
          <input type="file" id="image" name="image" onChange={handleChange} />
          
          <button type="submit" className="btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductForm;
