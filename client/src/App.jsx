import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';

const App = () => {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
      

    </div>
  );
};

export default App;
