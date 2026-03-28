import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getData } from "../context/DataContext";
import ProductListView from "../components/categoryProducts/ProductListView";
import Lottie from "lottie-react";
import notFound from "../assets/notFound.json";

const Category = () => {
  const { category } = useParams();
  const { productsData } = getData();
  const navigate = useNavigate();

  // Filter products by category
  const filteredProducts = productsData.filter(
    (item) => item.mainCategory.toLowerCase() === category.toLowerCase(),
  );

  // Infinite scroll state
  const [visibleCount, setVisibleCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  // Reset when category or data changes
  useEffect(() => {
    setVisibleCount(5);
    window.scrollTo(0, 0);
  }, [category, filteredProducts.length]);

  // Load more products
  const loadMore = () => {
    setIsLoading(true);

    setTimeout(() => {
      setVisibleCount((prev) => {
        if (prev >= filteredProducts.length) return prev;
        return prev + 4;
      });
      setIsLoading(false);
    }, 500);
  };

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;

      if (
        scrollTop + windowHeight >= fullHeight - 400 &&
        !isLoading &&
        visibleCount < filteredProducts.length
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, visibleCount, filteredProducts.length]);

  return (
    <div>
      {filteredProducts.length > 0 ? (
        <div className="max-w-6xl mx-auto mt-10 mb-10 px-4">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="bg-gray-800 mb-5 text-white px-4 py-1 rounded-md cursor-pointer "
          >
            Back
          </button>

          {/* Product List */}
          <div className="space-y-6">
            {filteredProducts.slice(0, visibleCount).map((product) => (
              <ProductListView key={product.id} product={product} />
            ))}
          </div>

          {/* Loader */}
          {isLoading && (
            <p className="text-center text-gray-500 mt-6">
              Loading more products...
            </p>
          )}

          {/* End Message */}
          {visibleCount >= filteredProducts.length && (
            <p className="text-center text-gray-400 mt-6">
              You have reached the end 👋
            </p>
          )}
        </div>
      ) : (
        // Not Found
        <div className="flex flex-col justify-center items-center h-[500px]">
          <Lottie animationData={notFound} loop className="w-[300px]" />
        </div>
      )}
    </div>
  );
};

export default Category;
