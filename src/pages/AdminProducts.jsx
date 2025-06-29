import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialForm = {
  name: "",
  price: "",
  quantity: "",
  category: "",
  description: "",
  size: "",
  brand: ""
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://127.0.0.1:5555/api/products/products", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setProducts(res.data);
    } catch (err) {
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    const token = localStorage.getItem("token");
    try {
      if (editingId) {
        // Update product
        await axios.put(`http://127.0.0.1:5555/api/products/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Create product
        await axios.post("http://127.0.0.1:5555/api/products/create", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setForm(initialForm);
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      setFormError("Failed to save product.");
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name || "",
      price: product.price || "",
      quantity: product.quantity || "",
      category: product.category || "",
      description: product.description || "",
      size: product.size || "",
      brand: product.brand || ""
    });
    setEditingId(product.id);
    setFormError("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://127.0.0.1:5555/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      alert("Failed to delete product.");
    }
  };

  const handleCancel = () => {
    setForm(initialForm);
    setEditingId(null);
    setFormError("");
  };

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto", background: "#1C1F26", color: "#F5F5F5", borderRadius: 16, padding: 24, border: "1px solid #2A2C34" }}>
      <button onClick={() => navigate('/admin')} style={{ marginBottom: 16, background: '#FFAA00', color: '#0B0C10', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 600, cursor: 'pointer' }}>
        ← Back to Dashboard
      </button>
      <h2 style={{ color: "#FFD700", fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Manage Products</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24, background: '#2A2C34', borderRadius: 8, padding: 16 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #FFD700', background: '#0B0C10', color: '#F5F5F5' }} />
          <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #FFD700', background: '#0B0C10', color: '#F5F5F5' }} />
          <input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} required style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #FFD700', background: '#0B0C10', color: '#F5F5F5' }} />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #FFD700', background: '#0B0C10', color: '#F5F5F5' }} />
          <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required style={{ flex: 2, padding: 8, borderRadius: 4, border: '1px solid #FFD700', background: '#0B0C10', color: '#F5F5F5' }} />
          <input name="size" placeholder="Size" value={form.size} onChange={handleChange} required style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #FFD700', background: '#0B0C10', color: '#F5F5F5' }} />
          <input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} required style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #FFD700', background: '#0B0C10', color: '#F5F5F5' }} />
        </div>
        {formError && <div style={{ color: '#f87171', marginBottom: 8 }}>{formError}</div>}
        <button type="submit" style={{ background: '#FFAA00', color: '#0B0C10', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 600, marginRight: 8 }}>
          {editingId ? "Update Product" : "Add Product"}
        </button>
        {editingId && <button type="button" onClick={handleCancel} style={{ background: '#2A2C34', color: '#FFD700', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 600 }}>Cancel</button>}
      </form>
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p style={{ color: "#f87171" }}>{error}</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr style={{ borderBottom: "1px solid #2A2C34" }}>
              <th style={{ textAlign: "left", padding: 8 }}>Name</th>
              <th style={{ textAlign: "left", padding: 8 }}>Price</th>
              <th style={{ textAlign: "left", padding: 8 }}>Quantity</th>
              <th style={{ textAlign: "left", padding: 8 }}>Category</th>
              <th style={{ textAlign: "left", padding: 8 }}>Description</th>
              <th style={{ textAlign: "left", padding: 8 }}>Size</th>
              <th style={{ textAlign: "left", padding: 8 }}>Brand</th>
              <th style={{ textAlign: "left", padding: 8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={{ borderBottom: "1px solid #2A2C34" }}>
                <td style={{ padding: 8 }}>{product.name}</td>
                <td style={{ padding: 8 }}>{product.price}</td>
                <td style={{ padding: 8 }}>{product.quantity}</td>
                <td style={{ padding: 8 }}>{product.category}</td>
                <td style={{ padding: 8 }}>{product.description}</td>
                <td style={{ padding: 8 }}>{product.size}</td>
                <td style={{ padding: 8 }}>{product.brand}</td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => handleEdit(product)} style={{ background: '#FFD700', color: '#1C1F26', border: 'none', borderRadius: 4, padding: '4px 10px', fontWeight: 600, marginRight: 6, cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDelete(product.id)} style={{ background: '#f87171', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', fontWeight: 600, cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminProducts; 