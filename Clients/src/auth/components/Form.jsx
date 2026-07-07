import React, { useState } from "react";
import { Link } from "react-router-dom";

const Form = (props) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!data.email.trim()) {
      setError("Email is required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!data.password.trim()) {
      setError("Password is required");
      return;
    }
    if (data.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    props.onSubmit(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          {props.type === "Register" ? "Register" : "Login"}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-2 font-medium">Email</label>
          <input
            onChange={handleChange}
            value={data.email}
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Password</label>
          <input
            onChange={handleChange}
            value={data.password}
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <p className="text-center mt-4 text-sm">
            {props.type === "Register"
              ? "Already have an account? "
              : "Don't have an account? "}
            <Link
              to={props.type === "Register" ? "/login" : "/register"}
              className="text-blue-500 hover:underline"
            >
              {props.type === "Register" ? "Login" : "Register"}
            </Link>
          </p>
        </div>

        <button
          type="submit"
          disabled={props.loading}
          className="w-full bg-black text-white py-2 mt-2 rounded-md hover:bg-gray-800 disabled:bg-gray-500"
        >
          {props.loading ? "Loading..." : props.type === "Register" ? "Register" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Form;
