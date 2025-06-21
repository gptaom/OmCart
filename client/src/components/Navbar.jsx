import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, Search, User } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", to: "/" },
    { name: "Catalog", to: "/catalog" },
    { name: "Features", to: "/features" },
    { name: "FAQ", to: "/faq" },
    { name: "Blog", to: "/blog" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold text-gray-800">
          OmCart
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-gray-600 hover:text-blue-600 transition font-medium"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4 text-gray-600">
          <Link to="/search" className="hover:text-blue-600">
            <Search className="w-5 h-5" />
          </Link>
          <Link to="/account" className="hover:text-blue-600">
            <User className="w-5 h-5" />
          </Link>
          <Link to="/cart" className="hover:text-blue-600">
            <ShoppingCart className="w-5 h-5" />
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden focus:outline-none hover:text-blue-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block text-gray-700 hover:text-blue-600 font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
