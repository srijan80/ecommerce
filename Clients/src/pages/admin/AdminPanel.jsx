import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backend = "http://localhost:5000/api";

function AdminPanel() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backend}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      navigate("/adminlogin");
      return;
    }

    fetchProducts();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        price: Number(form.price),
      };

      if (editingId) {
        await axios.put(`${backend}/products/${editingId}`, payload);
      } else {
        await axios.post(`${backend}/products`, payload);
      }

      setForm({ name: "", price: "", description: "", image: "" });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Something went wrong. Check console.");
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      description: product.description || "",
      image: product.image || "",
    });
    setEditingId(product._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${backend}/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const handleCancel = () => {
    setForm({ name: "", price: "", description: "", image: "" });
    setEditingId(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/adminlogin");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <div>
             <button
            onClick={() => navigate("/Customerorders")}
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Customer Orders
          </button> <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
          </div>
          
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? "Edit Product" : "Add New Product"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Product Name"
              value={form.name}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <input
              name="price"
              type="number"
              placeholder="Price (Rs.)"
              value={form.price}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <input
              name="image"
              placeholder="Image URL"
              value={form.image}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black md:col-span-2"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black md:col-span-2"
            />
            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
              >
                {editingId ? "Update Product" : "Add Product"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : (
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4">Image</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Description</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500">
                        No products found. Add one above.
                      </td>
                    </tr>
                  ) : (
                    products.map((p) => (
                      <tr key={p._id} className="border-t hover:bg-gray-50">
                        <td className="p-4">
                          {p.image ? (
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
                              No img
                            </div>
                          )}
                        </td>
                        <td className="p-4 font-medium">{p.name}</td>
                        <td className="p-4 text-green-600 font-semibold">Rs. {p.price}</td>
                        <td className="p-4 text-gray-600 text-sm max-w-xs truncate">{p.description}</td>
                        <td className="p-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleEdit(p)}
                            className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-700 transition mr-2"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(p._id)}
                            className="bg-red-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-red-700 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
