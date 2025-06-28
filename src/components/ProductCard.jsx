import { Link } from 'react-router-dom';
import { AddToCartButton } from './AddToCartButton.jsx';

export default function ProductCard({ product }) {
  const styles = {
    card: {
      backgroundColor: '#1C1F26',
      color: '#F5F5F5',
      padding: '1rem',
      marginBottom: '1rem', // optional if you want extra vertical spacing
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(255, 215, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      transition: 'transform 0.2s',
    },
    image: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '6px',
      marginBottom: '0.75rem',
    },
    description: {
      fontSize: '0.9rem',
      color: '#ccc',
      marginBottom: '0.5rem',
    },
    price: {
      color: '#FFD700',
      fontWeight: 'bold',
      fontSize: '1.1rem',
      marginBottom: '0.5rem',
    },
    rating: {
      fontSize: '0.85rem',
      color: '#aaa',
      marginBottom: '1rem',
    },
  };

  return (
    <div style={styles.card}>
      <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src={product.media} alt={product.name} style={styles.image} />
        <div style={styles.description}>{product.description}</div>
        <div style={styles.price}>${product.price}</div>
        <div style={styles.rating}>
          {product.rating
            ? `Rating: ${product.rating.rate} (${product.rating.count} reviews)`
            : 'No rating available'}
        </div>
      </Link>

      <AddToCartButton product={product} />
    </div>
  );
}
