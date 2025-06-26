import React, { useState } from "react";
import axios from "axios";
import Searchbar from "./Searchbar"; // Assumes it accepts onSelectProduct

const UpdateProductForm = ({ selectedProduct, setSelectedProduct }) => {
  const [formState, setFormState] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
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

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:5555/products/${selectedProduct.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessMessage("Product updated successfully!");
      setSelectedProduct(response.data); // Update with latest data
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div>
      <h2>Update Product</h2>
      <Searchbar isAdmin={false} onSelectProduct={setSelectedProduct} />

      {selectedProduct && (
        <form onSubmit={handleSubmit} className="space-y-2">
          <p><strong>ID:</strong> {selectedProduct.id}</p>

          <input
            type="text"
            name="name"
            placeholder="Name"
            defaultValue={selectedProduct.name}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            defaultValue={selectedProduct.category}
            onChange={handleInputChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            defaultValue={selectedProduct.price}
            onChange={handleInputChange}
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            defaultValue={selectedProduct.quantity}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="size"
            placeholder="Size"
            defaultValue={selectedProduct.size}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="brand"
            placeholder="Brand"
            defaultValue={selectedProduct.brand}
            onChange={handleInputChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            defaultValue={selectedProduct.description}
            onChange={handleInputChange}
          />

          <input type="file" name="image" accept="image/*" onChange={handleImageChange} />

          <button type="submit" className="btn">Update</button>

          {successMessage && <p className="text-green-500">{successMessage}</p>}
        </form>
      )}
    </div>
  );
};

export default UpdateProductForm;