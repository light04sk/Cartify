import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import emptyCart from "../../assets/emptyCart.json";

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4 text-center">
      <Lottie animationData={emptyCart} loop className="w-64 sm:w-72 md:w-80" />

      <h2 className="mt-6 text-2xl sm:text-3xl font-semibold text-gray-800">
        Your cart is empty
      </h2>

      <p className="mt-2 text-gray-500 max-w-md">
        Looks like you haven’t added anything yet. Discover amazing products and
        start shopping now.
      </p>

      <button
        onClick={() => navigate("/products")}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition shadow-sm hover:shadow-md"
      >
        Browse Products
      </button>
    </div>
  );
};

export default EmptyCart;
