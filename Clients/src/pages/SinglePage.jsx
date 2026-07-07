import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/layout/layout";

const backend = "http://localhost:5000/api";

function SinglePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
  });

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backend}/products/${id}`, {
        headers: { "Cache-Control": "no-cache" },
      });
      const productData = response.data?.data || response.data;
      setProduct(productData);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePay = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`${backend}/orders`, {
      productName: product.name,
      price: product.price,
      customerName: formData.name,
      phone: formData.number,
      address: formData.address,
    });
    const response = await axios.post(`${backend}/payment/create-checkout-session`, {
      name: product.name,
      price: product.price,
      image: product.image,
      productId: product._id,
    });
    window.location.href = response.data.url;
  } catch (error) {
    console.error("Error:", error);
  }
};

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg font-medium animate-pulse">Loading product...</div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center flex-col">
          <p className="text-lg font-semibold">Product not found</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-black text-white px-4 py-2 rounded"
          >
            Go Back
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-10 grid md:grid-cols-2 gap-10">
          
          <div className="flex flex-col justify-center">
            <div className="flex justify-center items-center mb-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-sm max-h-80 object-cover rounded-xl shadow-sm hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-2xl font-semibold text-green-600 mt-3">
              Rs. {product.price}
            </p>
            <p className="text-gray-600 mt-5 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Checkout Details</h2>
            
            <form onSubmit={handlePay} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Processing..." : "Buy"}
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-100 transition"
              >
                Go Back
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SinglePage;