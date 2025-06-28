import { Link } from 'react-router-dom';
import './ProductCard.css';
import { AddToCartButton } from './AddToCartButton.jsx';

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <img src={product.media} alt={product.name} />
        <h3>{product.description}</h3>
        <p>${product.price}</p>
        {product.rating ? (
          <div className="rating">
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </div>
        ) : (
          <div className="rating">No rating available</div>
        )}
      </Link>

      {/* ✅ Use your AddToCartButton */}
      <AddToCartButton product={product} />
    </div>
  );
}
