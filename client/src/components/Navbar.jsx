// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, User, Search } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items); 
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const navItems = [
    { name: "Home", to: "/" },
    { name: "Products", to: "/products" },
    { name: "Blog", to: "/blog" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          OmCart
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              {item.name}
            </Link>
          ))}

          {userInfo?.isAdmin && (
            <Link to="/admin/products" className="text-red-600 font-semibold">
              Admin
            </Link>
          )}

          {userInfo ? (
            <>
              <Link to="/account" className="hover:text-blue-600">
                Hi, {userInfo.name.split(" ")[0]}
              </Link>
              <button onClick={handleLogout} className="text-sm text-red-600">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-blue-600">Login</Link>
          )}

          
          <Link to="/cart" className="relative">
         <ShoppingCart className="w-5 h-5" />
        {totalCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
            {totalCount}
          </span>
        )}
      </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden focus:outline-none hover:text-blue-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {userInfo?.isAdmin && (
            <Link
              to="/admin/products"
              className="block text-red-600 font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin
            </Link>
          )}

          {userInfo ? (
            <>
              <Link
                to="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-700 hover:text-blue-600"
              >
                Account
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="block text-left w-full text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
