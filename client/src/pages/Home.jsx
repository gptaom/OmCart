import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleBannerClick = () => {
    navigate("/products");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12">
        <img
          src="/src/assets/banner.jpg"
          alt="Shop Tech Deals"
          onClick={handleBannerClick}
          className="w-full h-[400px] object-cover rounded-lg shadow-lg cursor-pointer hover:scale-[1.01] transition-transform"
        />
      </div>

      {/* Headline Text */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Experience the Future of Tech
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Top deals on phones, laptops, and more.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition"
        >
          Shop Now
        </button>
      </div>

      {/* Featured Products Placeholder */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Featured Products</h2>
        {/* This is where the grid will go once we fetch and show products */}
        <p className="text-gray-500">Product listings coming soon...</p>
      </div>
    </div>
  );
};

export default Home;
