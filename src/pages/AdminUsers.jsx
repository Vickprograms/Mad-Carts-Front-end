import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialForm = { username: "", email: "", password: "", phone_no: "", role: "customer" };

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://127.0.0.1:5555/api/users/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

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
        // Update user
        await axios.put(`http://127.0.0.1:5555/api/users/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Create user
        await axios.post("http://127.0.0.1:5555/api/users/", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setForm(initialForm);
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      setFormError("Failed to save user.");
    }
  };

  const handleEdit = (user) => {
    setForm({ ...user, password: "" }); // Don't prefill password
    setEditingId(user.id);
    setFormError("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://127.0.0.1:5555/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      alert("Failed to delete user.");
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
      <h2 style={{ color: "#FFD700", fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Manage Users</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24, background: '#2A2C34', borderRadius: 8, padding: 16 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
          <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #FFD700', background: '#0B0C10', color: '#F5F5F5' }} />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #FFD700', background: '#0B0C10', color: '#F5F5F5' }} />
          <input name="phone_no" placeholder="Phone" value={form.phone_no} onChange={handleChange} required style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #FFD700', background: '#0B0C10', color: '#F5F5F5' }} />
          <select name="role" value={form.role} onChange={handleChange} style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #FFD700', background: '#0B0C10', color: '#F5F5F5' }}>
            <option value="customer">Customer</option>
            <option value="driver">Driver</option>
            <option value="admin">Admin</option>
          </select>
          <input name="password" type="password" placeholder={editingId ? "New Password (optional)" : "Password"} value={form.password} onChange={handleChange} required={!editingId} style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #FFD700', background: '#0B0C10', color: '#F5F5F5' }} />
        </div>
        {formError && <div style={{ color: '#f87171', marginBottom: 8 }}>{formError}</div>}
        <button type="submit" style={{ background: '#FFAA00', color: '#0B0C10', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 600, marginRight: 8 }}>
          {editingId ? "Update User" : "Add User"}
        </button>
        {editingId && <button type="button" onClick={handleCancel} style={{ background: '#2A2C34', color: '#FFD700', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 600 }}>Cancel</button>}
      </form>
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p style={{ color: "#f87171" }}>{error}</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr style={{ borderBottom: "1px solid #2A2C34" }}>
              <th style={{ textAlign: "left", padding: 8 }}>Username</th>
              <th style={{ textAlign: "left", padding: 8 }}>Email</th>
              <th style={{ textAlign: "left", padding: 8 }}>Phone</th>
              <th style={{ textAlign: "left", padding: 8 }}>Role</th>
              <th style={{ textAlign: "left", padding: 8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: "1px solid #2A2C34" }}>
                <td style={{ padding: 8 }}>{user.username}</td>
                <td style={{ padding: 8 }}>{user.email}</td>
                <td style={{ padding: 8 }}>{user.phone_no}</td>
                <td style={{ padding: 8 }}>{user.role}</td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => handleEdit(user)} style={{ background: '#FFD700', color: '#1C1F26', border: 'none', borderRadius: 4, padding: '4px 10px', fontWeight: 600, marginRight: 6, cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDelete(user.id)} style={{ background: '#f87171', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', fontWeight: 600, cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers; 