import React, { useEffect, useState } from "react";
import axios from "../axios"; // ✅ use your configured axios instance
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await axios.get("/api/products");
        setProducts(productsRes.data);

        if (userInfo) {
          const wishlistRes = await axios.get("/api/wishlist", {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          });
          setWishlist(wishlistRes.data.map((item) => item._id));
        }

        setLoading(false);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load products.");
        setLoading(false);
      }
    };

    fetchData();
  }, [userInfo]);

  if (loading) return <div className="text-center mt-10">Loading products...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Products</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            wishlisted={wishlist.includes(product._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
