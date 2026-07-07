import React from "react";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold text-green-600">Payment successful</h1>
      <p>Thank you for your purchase.</p>
      <button
        onClick={() => navigate("/")}
        className="bg-black text-white px-6 py-2 rounded-xl"
      >
        Back to shop
      </button>
    </div>
  );
}
export default Success;