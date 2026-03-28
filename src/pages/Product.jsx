import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumns from "../components/product/Breadcrumns";
import { ShoppingCart, Heart } from "lucide-react";
import { getData } from "../context/DataContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Lottie from "lottie-react";
import Loading from "../assets/loading.json";

const Product = () => {
  const { setProductId, singleProduct } = getData();
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setProductId(Number(id));
    setQuantity(1);
  }, [id]);

  if (!singleProduct) {
    return (
      <div className="flex flex-col justify-center items-center h-[500px]">
        <Lottie
          animationData={Loading}
          loop={true}
          className="w-[300px] md:w-[300px]"
        />
        <p className="text-gray-700 text-sm md:text-base text-center">
          Loading product...
        </p>
        <p className="text-gray-700 text-sm md:text-base text-center">
          It will take some time, Please wait!
        </p>
      </div>
    );
  }

  const originalPrice = Math.round(
    singleProduct.price +
      (singleProduct.price * singleProduct.discountPercentage) / 100,
  );

  const handleAddToCart = () => {
    addToCart(singleProduct, quantity);
  };

  return (
    <>
      {singleProduct ? (
        <div className="px-4 md:px-10 py-8 bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto space-y-6">
            <Breadcrumns title={singleProduct.title} />

            <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10 grid md:grid-cols-2 gap-12">
              {/* Image Section */}
              <div className="flex items-center justify-center">
                <img
                  src={singleProduct.images[0]}
                  alt={singleProduct.title}
                  className="w-[520px] max-h-[420px] object-contain"
                />
              </div>

              {/* Details Section */}
              <div className="flex flex-col gap-5">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {singleProduct.title}
                </h1>

                <p className="text-sm text-gray-500 uppercase tracking-wide">
                  {singleProduct.brand} / {singleProduct.category}
                </p>

                {/* Price */}
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-blue-600">
                    ${singleProduct.price}
                  </span>
                  <span className="line-through text-gray-400">
                    ${originalPrice}
                  </span>
                  <span className="bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full">
                    {Math.ceil(singleProduct.discountPercentage)}% OFF
                  </span>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {singleProduct.description}
                </p>

                {/* Quantity */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">
                    Quantity
                  </span>
                  <div className="flex items-center gap-3 border border-gray-200 rounded-full px-3 py-1 w-fit">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="text-gray-500 hover:text-blue-600 text-xl"
                    >
                      −
                    </button>
                    <span className="font-medium w-5 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="text-gray-500 hover:text-blue-600 text-xl"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleAddToCart}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-md"
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>

                  {/* Wishlist Heart Button */}
                  <button
                    onClick={() => toggleWishlist(singleProduct)}
                    className="flex items-center gap-2 border border-gray-200 hover:border-red-300 px-5 py-3 rounded-xl transition"
                  >
                    <Heart
                      size={22}
                      className={
                        isWishlisted(singleProduct.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400 hover:text-red-400"
                      }
                    />
                  </button>
                </div>

                {/* Trust badges */}
                <div className="flex gap-6 text-sm text-gray-500 mt-4">
                  <span>🚚 Free Delivery</span>
                  <span>🔒 Secure Payment</span>
                  <span>↩ 7 Days Return</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Nothing to see</div>
      )}
    </>
  );
};

export default Product;
