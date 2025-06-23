import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveShippingAddress } from '../store/CartSlice';

const ShippingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(form));
    navigate('/payment');
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {['fullName', 'address', 'city', 'postalCode', 'country'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium capitalize mb-1">
              {field.replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default ShippingPage;
