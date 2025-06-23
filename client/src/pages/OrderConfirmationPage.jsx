import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../store/CartSlice';
import { useLocation } from 'react-router-dom';

const OrderConfirmationPage = () => {
  const { state } = useLocation(); // state passed from PlaceOrder page
  const dispatch = useDispatch();

  const order = state?.order;

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  if (!order) {
    return <div className="max-w-xl mx-auto mt-10 text-center text-red-600">No order found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Order Placed Successfully!</h2>
      <p className="mb-6">Thank you for your purchase. Your order ID is: <strong>{order._id}</strong></p>

      <div className="mb-4">
        <h3 className="font-semibold">Shipping Address</h3>
        <p>{order.shippingAddress.fullName}</p>
        <p>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">Payment Method</h3>
        <p>{order.paymentMethod}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">Items</h3>
        <ul className="space-y-2">
          {order.orderItems.map((item) => (
            <li key={item._id} className="flex justify-between border-b pb-1">
              <span>{item.name} x {item.qty}</span>
              <span>${(item.price * item.qty).toFixed(2)}</span>

            </li>
          ))}
        </ul>
      </div>

      <div className="text-right text-xl font-bold mt-6">
        Total: ${order.totalPrice.toFixed(2)}
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
