import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "../store/wishlistSlice";
import ProductCard from "../components/ProductCard";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      {loading && <p>Loading wishlist...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && items.length === 0 && <p>No items in your wishlist.</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
