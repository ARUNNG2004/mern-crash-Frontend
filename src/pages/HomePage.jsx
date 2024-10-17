import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const HomePage = () => {
  const { fetchProducts,products} = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("products", products);

  return (
    <div className="bg-dark p-4">
      <h1 className="text-center text-primary mb-4">Current Products</h1>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      {products.length === 0 && (
        <p className="text-center text-muted">
          No products found{' '}
          <Link to="/create" className="text-primary">
            Create a product
          </Link>
        </p>
      )}
    </div>
  );
};

export default HomePage;
