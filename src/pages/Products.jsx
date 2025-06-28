import { useEffect, useState } from "react";
import { fetchProducts } from "../services/products";
import ProductCard from "../components/ProductCard";
import HomeProducts from "../components/HomeProducts.jsx";
import Searchbar from "../components/Searchbar.jsx";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const styles = {
    page: {
      backgroundColor: '#0B0C10',
      color: '#F5F5F5',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: 'Segoe UI, sans-serif',
    },
    heading: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#FFD700',
      margin: '1.5rem 0',
      textAlign: 'center',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
    },
    loading: {
      color: '#FFAA00',
      textAlign: 'center',
      marginTop: '3rem',
    },
    error: {
      color: 'red',
      textAlign: 'center',
      marginTop: '3rem',
    },
  };

  if (loading) return <div style={styles.loading}>Loading products...</div>;
  if (error) return <div style={styles.error}>Error: {error}</div>;

  return (
    <div style={styles.page}>
      <Searchbar />
      <h1 style={styles.heading}>Our Products</h1>
      <HomeProducts />
      <div style={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
