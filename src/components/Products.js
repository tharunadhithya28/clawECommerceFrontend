import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  console.log(products);
  

  useEffect(() => {
    axios.get('http://localhost:5000/api/products/')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="products-page">
      <h1>Products</h1>
      <div className="products-list">
        {products.map(product => (
          <div key={product._id} className="product-item">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
