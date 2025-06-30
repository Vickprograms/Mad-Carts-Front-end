import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../services/products";
import { useCart } from "../hooks/useCart";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem, loading: cartLoading, error: cartError } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    await addItem(product.id, product.price, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (loading) return <div className="loading">Loading product...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail">
      <div className="product-images">
        <img src={product.media} alt={product.name} />
      </div>
      <div className="product-info">
        <h1>{product.description}</h1>
        <div className="price">${product.price}</div>
        <div className="rating">
          Rating: {product.rating?.rate} ({product.rating?.count} reviews)
        </div>
        <p className="description">{product.description}</p>
        <button className="add-to-cart" onClick={handleAddToCart} disabled={cartLoading}>
          {cartLoading ? "Adding..." : "Add to Cart"}
        </button>
        {added && <div style={{ color: '#FFD700', marginTop: 10 }}>Added to cart!</div>}
        {cartError && <div className="error">{cartError}</div>}
      </div>
    </div>
  );
}