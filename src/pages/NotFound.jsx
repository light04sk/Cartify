import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import NotFoundLottie from "../assets/notFound.json";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center">
      <Lottie animationData={NotFoundLottie} loop className="w-90 h-90" />

      <h2 className="text-3xl font-bold text-gray-900 font-serif mt-4">
        Page Not Found
      </h2>
      <p className="text-gray-400 text-sm mt-3 mb-8 max-w-xs leading-relaxed">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      <div className="flex items-center gap-3">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-600 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={15} />
          Go Back
        </button>
        <Link
          to="/"
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-semibold transition-colors"
        >
          <Home size={15} />
          Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
