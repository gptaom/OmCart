import React from 'react';
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`}>
      <div className="border rounded p-4 shadow hover:shadow-lg transition duration-300 cursor-pointer">
        <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4" />
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-500">{product.brand}</p>
        <p className="text-blue-600 font-bold">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
