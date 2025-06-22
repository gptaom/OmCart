import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProductEditPage = () => {
  const { id } = useParams(); // "new" or existing product id
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    brand: '',
    category: '',
    description: '',
    price: '',
    countInStock: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch product if editing
  useEffect(() => {
    const fetchProduct = async () => {
      if (!isNew) {
        try {
          const { data } = await axios.get(`/api/products/${id}`);
          setFormData({
            name: data.name,
            image: data.image,
            brand: data.brand,
            category: data.category,
            description: data.description,
            price: data.price,
            countInStock: data.countInStock,
          });
        } catch  {
          setError('Failed to load product');
        }
      }
    };
    fetchProduct();
  }, [id, isNew]);

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isNew) {
        await axios.post('/api/products', formData);
        toast.success('Product created');
      } else {
        await axios.put(`/api/products/${id}`, formData);
        toast.success('Product updated');
      }
      navigate('/admin/products');
    } catch  {
      toast.error('Error saving product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">
        {isNew ? 'Create Product' : 'Edit Product'}
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'brand', 'category', 'description', 'image', 'price', 'countInStock'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
            <input
              type={field === 'price' || field === 'countInStock' ? 'number' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md disabled:opacity-50"
        >
          {loading ? 'Saving...' : isNew ? 'Create' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default ProductEditPage;
