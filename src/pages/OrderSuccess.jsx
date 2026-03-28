import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MapPin, Phone, Package, ChevronRight, CheckCheck } from "lucide-react";

const OrderSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // If someone navigates here directly without placing an order, redirect
    if (!state?.orderId) {
      navigate("/products", { replace: true });
      return;
    }
    setTimeout(() => setVisible(true), 50);
  }, []);

  if (!state?.orderId) return null;

  const { orderId, items, deliveryInfo, total, itemsTotal } = state;

  // Format order ID to short readable format
  const shortId = "ORD-" + orderId.substring(0, 8).toUpperCase();

  return (
    <div
      className="min-h-screen py-12 px-4"
      style={{
        background:
          "linear-gradient(135deg, #f0f4ff 0%, #fafafa 60%, #f0fff4 100%)",
      }}
    >
      <div
        className="max-w-lg mx-auto transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
        }}
      >
        {/* SUCCESS BADGE */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-5 shadow-lg"
            style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
          >
            <CheckCheck className="text-white w-9 h-9" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Order Placed!
          </h1>
          <p className="text-gray-500 mt-1.5 text-sm">
            Thank you for shopping with Cartify 🎉
          </p>

          <div className="mt-3 px-4 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm">
            <span className="text-xs text-gray-400 mr-1.5">Order ID</span>
            <span className="text-xs font-mono font-bold text-gray-700">
              {shortId}
            </span>
          </div>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div
            className="h-2 w-full"
            style={{
              background: "linear-gradient(90deg, #3b82f6, #6366f1, #8b5cf6)",
            }}
          />

          <div className="p-6 space-y-6">
            {/* DELIVERY INFO */}
            {deliveryInfo && (
              <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                    <MapPin size={14} className="text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-blue-700">
                    Delivering to
                  </span>
                </div>
                <div className="pl-9 space-y-0.5">
                  <p className="font-semibold text-gray-800 text-sm">
                    {deliveryInfo.fullName}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {deliveryInfo.address}, {deliveryInfo.state}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {deliveryInfo.postcode}, {deliveryInfo.country}
                  </p>
                  <p className="text-gray-500 text-sm flex items-center gap-1.5 mt-1">
                    <Phone size={12} className="text-gray-400" />
                    {deliveryInfo.phone}
                  </p>
                </div>
              </div>
            )}

            {/* ORDER ITEMS */}
            {items?.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Package size={14} className="text-indigo-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    Order Summary
                  </span>
                </div>

                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.product_id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-12 h-12 rounded-xl object-cover bg-white border border-gray-100 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-gray-700 flex-shrink-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="mt-4 rounded-xl border border-gray-100 overflow-hidden">
                  <div className="flex justify-between px-4 py-2.5 text-sm text-gray-500 bg-gray-50">
                    <span>Items total</span>
                    <span>${itemsTotal}</span>
                  </div>
                  <div className="flex justify-between px-4 py-2.5 text-sm text-gray-500 border-t border-gray-100">
                    <span>Delivery</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between px-4 py-2.5 text-sm text-gray-500 border-t border-gray-100">
                    <span>Handling</span>
                    <span>$5</span>
                  </div>
                  <div className="flex justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600">
                    <span className="font-bold text-white">Grand Total</span>
                    <span className="font-bold text-white text-lg">
                      ${total}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ESTIMATED DELIVERY */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-50 border border-amber-100">
              <span className="text-xl">🚚</span>
              <div>
                <p className="text-xs text-amber-600 font-medium">
                  Estimated Delivery
                </p>
                <p className="text-sm font-semibold text-gray-700">
                  3–5 business days
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="px-6 pb-6">
            <Link
              to="/products"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-semibold text-white transition-all hover:opacity-90 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #3b82f6, #6366f1)",
              }}
            >
              Continue Shopping
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          A confirmation has been noted for order{" "}
          <span className="font-mono">{shortId}</span>
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;
