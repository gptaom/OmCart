import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, Search, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const userInfo = useSelector((state) => state.auth?.userInfo);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

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
        <Link to="/" className="text-2xl font-semibold text-gray-800">
          OmCart
        </Link>

        {/* Desktop nav */}
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

        {/* Icons and User */}
        <div className="flex items-center space-x-4 text-gray-600">
          <Link to="/search" className="hover:text-blue-600">
            <Search className="w-5 h-5" />
          </Link>

          <Link to="/cart" className="relative hover:text-blue-600">
            <ShoppingCart className="w-5 h-5" />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {totalQuantity}
              </span>
            )}
          </Link>

          {/* User actions */}
          {userInfo ? (
            <div className="flex items-center gap-2">
              <span className="text-gray-700 text-sm hidden sm:inline">Hi, {userInfo.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">
                <User className="w-5 h-5" />
              </Link>
            </>
          )}

          {/* Mobile toggle */}
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
              onClick={() => setMobileMenuOpen(false)}
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
