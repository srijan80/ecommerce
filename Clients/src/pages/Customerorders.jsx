import React, { useEffect, useState } from "react";
import axios from "axios";

const backend = "http://localhost:5000/api";

function CustomerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`${backend}/orders`)
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Customer orders</h1>
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Address</th>
                <th className="p-3">Product</th>
                <th className="p-3">Price</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-400">
                    No orders yet
                  </td>
                </tr>
              )}
              {orders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="p-3">{order.customerName}</td>
                  <td className="p-3">{order.phone}</td>
                  <td className="p-3">{order.address}</td>
                  <td className="p-3">{order.productName}</td>
                  <td className="p-3">Rs. {order.price}</td>
                  <td className="p-3 text-sm text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CustomerOrders;