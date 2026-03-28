import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Heart, ShoppingCart, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import EmptyLottie from "../assets/empty.json";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!wishlist.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 flex flex-col items-center max-w-sm w-full text-center">
          <div className="w-80 h-80 flex items-center justify-center">
            <Lottie animationData={EmptyLottie} loop className="w-full" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mt-4">
            Your wishlist is empty
          </h2>
          <p className="text-gray-400 text-sm mt-2 mb-6 leading-relaxed">
            Save items you love and come back to them anytime.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-sm transition-colors"
          >
            <ShoppingBag size={15} />
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
              <Heart size={18} className="text-red-400 fill-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 font-serif">
              My Wishlist
            </h1>
          </div>
          <p className="text-gray-400 text-sm ml-12">
            {wishlist.length} saved item{wishlist.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {wishlist.map((item) => (
            <div
              key={item.product_id}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div
                className="relative cursor-pointer bg-gray-50 aspect-square overflow-hidden"
                onClick={() => navigate(`/products/${item.product_id}`)}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {/* Remove heart button overlay */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWishlist(item.product_id);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-red-50 transition-colors"
                >
                  <Heart size={14} className="fill-red-400 text-red-400" />
                </button>
              </div>

              {/* Info */}
              <div className="p-3 flex flex-col flex-1 gap-2">
                <div
                  className="cursor-pointer flex-1"
                  onClick={() => navigate(`/products/${item.product_id}`)}
                >
                  <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-snug">
                    {item.title}
                  </p>
                  <p className="text-sm font-bold text-gray-900 mt-1.5">
                    ${item.price}
                  </p>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => addToCart(item)}
                  className="flex items-center justify-center gap-1.5 w-full bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold py-2 rounded-xl transition-colors"
                >
                  <ShoppingCart size={13} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
