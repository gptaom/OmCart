import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/productCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/products");

        console.log("Products API response:", data);

        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading products...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Products</h1>
      // ...existing code...
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {Array.isArray(products) && products.map((product) => (
    <ProductCard key={product._id} product={product} />
  ))}
</div>
// ...existing code...
    </div>
  );
};

export default Products;
