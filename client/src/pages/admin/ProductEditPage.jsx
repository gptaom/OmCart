import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ProductFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    image: "",
    price: 0,
    countInStock: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load existing product if in edit mode
  useEffect(() => {
    if (isEdit) {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
          setForm({
            name: data.name || "",
            brand: data.brand || "",
            category: data.category || "",
            description: data.description || "",
            image: data.image || "",
            price: data.price || 0,
            countInStock: data.countInStock || 0,
          });
        } catch {
          setError("Product not found");
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/products/${id}`, form);
        toast.success("Product updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/products", form);
        toast.success("Product created successfully");
      }
      navigate("/admin/products");
    } catch {
      toast.error("Something went wrong");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        {isEdit ? "Edit Product" : "Create Product"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "brand", "category", "description", "image", "price", "countInStock"].map(
          (field) => (
            <div key={field}>
              <label className="block mb-1 capitalize">{field}</label>
              <input
                type={field === "price" || field === "countInStock" ? "number" : "text"}
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          )
        )}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          {isEdit ? "Update" : "Create"} Product
        </button>
      </form>
    </div>
  );
};

export default ProductFormPage;