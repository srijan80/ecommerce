import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ product }) => {
  const navigate = useNavigate();

  const handleBuyNow = (event) => {
    event.stopPropagation();
    navigate(`/checkout/${product._id}`);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="cursor-pointer group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="300" viewBox="0 0 500 300"%3E%3Crect width="500" height="300" fill="%23f3f4f6"/%3E%3Ctext x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-family="Arial, sans-serif" font-size="24"%3EImage unavailable%3C/text%3E%3C/svg%3E';
          }}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {product.name}
        </h2>

        <p className="text-gray-500 text-sm mt-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-5">
          <p className="text-xl font-bold text-gray-900">
            Rs. {product.price}
          </p>

          <button
          onClick={handleBuyNow}
            
            className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 active:scale-95 transition"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;