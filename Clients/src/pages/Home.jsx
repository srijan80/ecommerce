//home
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/layout/layout";
import Cards from "./components/Card";

const backend = "http://localhost:5000/api";

const Home = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backend}/products`, {
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      
      const productsData = response.data?.data || response.data || [];
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return  (
  <Layout>
  <div className="max-w-7xl mx-auto px-4 py-10">
    <h1 className="text-3xl font-bold mb-10 tracking-tight">
      Featured Products
    </h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
       <Cards key={product._id} product={product}  />
      ))}
    </div>
  </div>
</Layout>
);
};

export default Home;

