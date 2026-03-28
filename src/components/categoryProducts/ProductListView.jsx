import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const ProductListView = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="flex flex-col sm:flex-row gap-6 p-5">
        <div
          className="flex-shrink-0 cursor-pointer"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full sm:w-72 h-60 object-contain rounded-xl bg-gray-50 group-hover:scale-105 transition"
          />
        </div>

        <div className="flex flex-col justify-between flex-1">
          <div>
            <h1
              onClick={() => navigate(`/products/${product.id}`)}
              className="text-lg md:text-xl font-semibold text-gray-800 hover:text-indigo-600 cursor-pointer line-clamp-2"
            >
              {product.title}
            </h1>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-2xl font-bold text-gray-900">
                ${product.price}
              </span>
              <span className="text-sm text-green-600 font-medium">
                {Math.ceil(product.discountPercentage)}% OFF
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Free delivery by <span className="font-medium">Tomorrow</span>
            </p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => addToCart(product)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg text-sm font-semibold cursor-pointer transition"
            >
              Add to Cart
            </button>

            <div className="flex items-center gap-4">
              {/* Heart button */}
              <button onClick={() => toggleWishlist(product)}>
                <Heart
                  size={20}
                  className={
                    isWishlisted(product.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400 hover:text-red-400"
                  }
                />
              </button>
              <button
                onClick={() => navigate(`/products/${product.id}`)}
                className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
              >
                View Details →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListView;
