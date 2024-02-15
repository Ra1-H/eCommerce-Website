import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/products/all")
      .then((response) => response.json())
      .then((response: any) => {
        setProducts(response);
      });
  }, []);

  return (
    <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 justify-items-center">
      {products.map((product: any) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}

export default ProductList