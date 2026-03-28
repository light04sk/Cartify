import { ShoppingCart, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const ProductCards = React.memo(({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  return (
    <div className="border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-100 hover:shadow-2xl transition-all p-2">
      {/* Heart button */}
      <button
        onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
        className="absolute top-3 right-3 z-10 bg-white rounded-full p-1 shadow"
      >
        <Heart
          size={18}
          className={isWishlisted(product.id) ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-400"}
        />
      </button>

      <div onClick={() => navigate(`/products/${product.id}`)}>
        <img src={product.images[0]} alt={product.title} className="bg-gray-100 aspect-square" />
        <h1 className="line-clamp-1 p-1 font-semibold">{product.title}</h1>
        <p className="my-1 text-lg text-gray-800 font-bold">${product.price}</p>
      </div>
      <button
        onClick={() => addToCart(product)}
        className="bg-indigo-600 hover:bg-indigo-500 p-2 text-sm rounded-md text-white w-full cursor-pointer flex gap-3 items-center justify-center font-semibold"
      >
        <ShoppingCart />
        Add to Cart
      </button>
    </div>
  );
});

export default ProductCards;