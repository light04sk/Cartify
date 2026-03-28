import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";
import useOrders from "../../hooks/useOrders";

const BillSummary = ({ totalPrice }) => {
  const navigate = useNavigate();
  const { cartItem, clearCart } = useCart();
  const { placeOrder } = useOrders();

  const grandTotal = totalPrice + 5;

  const handleCheckout = async () => {
    const saved = localStorage.getItem("deliveryInfo");

    if (!saved) {
      toast.error("Please fill and submit your delivery address first");
      return;
    }

    const deliveryInfo = JSON.parse(saved);

    if (!deliveryInfo.phone || !deliveryInfo.address || !deliveryInfo.state) {
      toast.error("Delivery info is incomplete — please re-submit the form");
      return;
    }

    // Save order to Supabase
    const { data, error } = await placeOrder({
      items: cartItem,
      deliveryInfo,
      total: grandTotal,
    });

    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }

    // Clear cart and delivery info
    await clearCart();
    localStorage.removeItem("deliveryInfo");

    // Navigate with order data so success page can display it
    navigate("/order-success", {
      state: {
        orderId: data.id,
        items: cartItem,
        deliveryInfo,
        total: grandTotal,
        itemsTotal: totalPrice,
      },
    });
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-lg sticky top-24 space-y-5">
      <h2 className="font-semibold text-lg">Bill Details</h2>

      <div className="flex justify-between text-gray-600">
        <span>Items total</span>
        <span>${totalPrice}</span>
      </div>

      <div className="flex justify-between text-gray-600">
        <span>Delivery</span>
        <span className="text-blue-600 font-medium">
          <span className="line-through text-gray-400 mr-1">$25</span>Free
        </span>
      </div>

      <div className="flex justify-between text-gray-600">
        <span>Handling</span>
        <span>$5</span>
      </div>

      <div className="bg-blue-50 rounded-xl p-4 flex justify-between items-center">
        <span className="font-semibold">Grand Total</span>
        <span className="font-bold text-blue-600 text-lg">${grandTotal}</span>
      </div>

      {/* Promo code */}
      <div>
        <p className="text-gray-700 font-medium mb-2">Apply Promo Code</p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter code"
            className="p-3 rounded-xl border border-gray-200 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 rounded-xl border border-gray-200 font-medium hover:bg-blue-50 transition">
            Apply
          </button>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl w-full font-semibold transition"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default BillSummary;
