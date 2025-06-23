import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/api/orders/myorders', {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        setOrders(data);
      } catch (err) {
        console.error('Failed to load orders', err);
      }
    };

    fetchOrders();
  }, [userInfo, navigate]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded shadow">
              <p><strong>ID:</strong> {order._id}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
              <p><strong>Paid:</strong> {order.isPaid ? 'Yes' : 'No'}</p>
              <p><strong>Delivered:</strong> {order.isDelivered ? 'Yes' : 'No'}</p>
              <button
                onClick={() => navigate(`/order/${order._id}`)}
                className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
