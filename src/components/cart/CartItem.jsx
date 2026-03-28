import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const navigate = useNavigate();
  const { updateQuantity, deleteItem } = useCart();

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-4">
        <img
          src={item.thumbnail}
          alt={item.title}
          onClick={() => navigate(`/products/${item.product_id}`)}
          className="w-20 h-20 rounded-xl object-cover cursor-pointer border"
        />

        <div>
          <h3
            onClick={() => navigate(`/products/${item.product_id}`)}
            className="font-medium text-gray-800 line-clamp-2 cursor-pointer hover:text-blue-600 transition max-w-[220px]"
          >
            {item.title}
          </h3>
          <p className="text-blue-600 font-semibold">${item.price}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 border border-gray-200 rounded-full px-3 py-1">
          <button
            onClick={() => updateQuantity(item.product_id, "decrease")}
            className="text-gray-500 hover:text-blue-600 text-xl"
          >
            −
          </button>
          <span className="font-medium">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.product_id, "increase")}
            className="text-gray-500 hover:text-blue-600 text-xl"
          >
            +
          </button>
        </div>

        <button
          onClick={() => deleteItem(item.product_id)}
          className="p-2 rounded-full hover:bg-red-50 transition"
        >
          <Trash2 className="text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
