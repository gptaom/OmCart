import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/products');


      setProducts(data);
    } catch {
      toast.error('Failed to fetch products');
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      toast.success('Product deleted');
      getProducts();
    } catch {
      toast.error('Delete failed');
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>

        {/* create product */}
        <Link
          to="/admin/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={18} /> Create New
        </Link>
      </div>

      <table className="w-full text-left border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border-b">Name</th>
            <th className="p-2 border-b">Price</th>
            <th className="p-2 border-b">Brand</th>
            <th className="p-2 border-b">Stock</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td className="p-2 border-b">{p.name}</td>
              <td className="p-2 border-b">${p.price}</td>
              <td className="p-2 border-b">{p.brand}</td>
              <td className="p-2 border-b">{p.countInStock}</td>
              <td className="p-2 border-b flex gap-3">
                <Link to={`/admin/products/${p._id}/edit`}>
                  <Pencil className="text-blue-600" size={18} />
                </Link>
                <button onClick={() => deleteProduct(p._id)}>
                  <Trash2 className="text-red-600" size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductList;
