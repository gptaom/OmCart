import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../axios';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.auth);

  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      if (!order && id && userInfo?.token) {
        try {
          setLoading(true);
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
          const { data } = await axios.get(`/api/orders/${id}`, config);
          setOrder(data);
        } catch (err) {
          console.error(err);
          setError('Failed to load order details.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrder();
  }, [id, order, userInfo]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!order) return <p className="p-6">No order found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-green-600 mb-2">Order Placed Successfully!</h2>
      <p className="mb-4">
        Thank you for your purchase. Your order ID is:{' '}
        <strong>{order._id}</strong>
      </p>

      <div className="mb-4">
        <h3 className="font-semibold">Shipping Address</h3>
        <p>
          {order.shippingAddress.fullName}
          <br />
          {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
          {order.shippingAddress.country} - {order.shippingAddress.postalCode}
        </p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">Payment Method</h3>
        <p>{order.paymentMethod}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">Items</h3>
        <ul className="border-t">
          {order.orderItems.map((item) => (
            <li key={item.product} className="flex justify-between border-b py-2">
              <span>{item.name} × {item.qty}</span>
              <span>${(item.qty * item.price).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-right font-bold text-xl">
        Total: ${order.totalPrice.toFixed(2)}
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
