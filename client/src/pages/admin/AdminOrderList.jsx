import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        const { data } = await axios.get('/api/orders', config);
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load orders');
      }
    };

    if (userInfo?.isAdmin) fetchOrders();
  }, [userInfo]);

  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded shadow">
              <p><strong>ID:</strong> {order._id}</p>
              <p><strong>User:</strong> {order.user?.name || 'Unknown'}</p>
              <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
              <p><strong>Paid:</strong> {order.isPaid ? 'Yes' : 'No'}</p>
              <p><strong>Delivered:</strong> {order.isDelivered ? 'Yes' : 'No'}</p>
              <Link to={`/order/${order._id}`} className="text-blue-600 underline">View</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrderList;
