import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<div className="p-6">Products Page</div>} />
        <Route path="/about" element={<div className="p-6">About Page</div>} />
        <Route path="/contact" element={<div className="p-6">Contact Page</div>} />
      </Routes>
      

    </div>
  );
};

export default App;
