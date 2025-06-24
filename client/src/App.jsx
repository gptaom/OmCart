import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProductList from "./pages/admin/AdminProductList";
import ProductEditPage from './pages/admin/ProductEditPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import MyOrdersPage from './pages/MyOrdersPage';
import AdminOrderList from './pages/admin/AdminOrderList';
import AdminUserList from './pages/admin/AdminUserList';
import WishlistPage from './pages/WishlistPage';


import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute'; // ✅ Import your new private route

const App = () => {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Protected Routes */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/products" element={<AdminRoute><AdminProductList /></AdminRoute>} />
        <Route path="/admin/products/:id/edit" element={<AdminRoute><ProductEditPage /></AdminRoute>} />
        <Route path="/admin/products/new" element={<AdminRoute><ProductEditPage /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><AdminOrderList /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><AdminUserList /></AdminRoute>}/>

        {/* User Protected Routes using PrivateRoute wrapper */}
        <Route element={<PrivateRoute />}>
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/placeorder" element={<PlaceOrderPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/order/:id" element={<OrderConfirmationPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />


        </Route>
      </Routes>
    </div>
  );
};

export default App;
