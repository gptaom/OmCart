import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPaymentMethod } from '../store/CartSlice';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [method, setMethod] = useState('PayPal');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setPaymentMethod(method));
    navigate('/placeorder');
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Select Payment Method</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="paymentMethod"
              value="PayPal"
              checked={method === 'PayPal'}
              onChange={(e) => setMethod(e.target.value)}
            />
            <span>PayPal</span>
          </label>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="paymentMethod"
              value="CashOnDelivery"
              checked={method === 'CashOnDelivery'}
              onChange={(e) => setMethod(e.target.value)}
            />
            <span>Cash on Delivery</span>
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Continue to Place Order
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
