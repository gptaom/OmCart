import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../store/wishlistSlice";
import { Heart, HeartOff } from "lucide-react";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some(item => item._id === product._id);

  const handleWishlistToggle = () => {
    dispatch(toggleWishlist(product._id));
  };

  return (
    <div className="border rounded-lg p-4 relative">
      {/* Product info */}
      <img src={product.image} alt={product.name} className="w-full h-40 object-contain" />
      <h3 className="font-semibold mt-2">{product.name}</h3>
      <p className="font-bold">${product.price}</p>

      {/* Wishlist icon */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-2 right-2 text-gray-500"
      >
        {isWishlisted ? (
          <Heart className="text-red-500 fill-red-500" />
        ) : (
          <Heart />
        )}
      </button>
    </div>
  );
};

export default ProductCard;
