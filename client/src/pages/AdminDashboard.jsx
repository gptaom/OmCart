import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 text-blue-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          <p>View and manage all products.</p>
        </div>

        <div className="bg-green-100 text-green-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <p>Manage user accounts and roles.</p>
        </div>

        <div className="bg-yellow-100 text-yellow-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Orders</h2>
          <p>Track and manage orders.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
