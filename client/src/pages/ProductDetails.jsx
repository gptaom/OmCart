import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError("Product not found");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading product...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <img src={product.image} alt={product.name} className="w-full rounded-lg shadow" />
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-xl font-semibold text-blue-600 mb-2">${product.price}</p>
        <p className="text-sm text-gray-500 mb-4">{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</p>
        <button
          disabled={product.countInStock === 0}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md disabled:opacity-50"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
