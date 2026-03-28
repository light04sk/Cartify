import { useEffect } from "react";
import { Link } from "react-router-dom";
import useOrders from "../hooks/useOrders";
import {
  Package,
  MapPin,
  Phone,
  Clock,
  ChevronRight,
  ShoppingBag,
  CheckCircle2,
  Loader2,
  Calendar,
  Hash,
} from "lucide-react";
import Lottie from "lottie-react";
import EmptyLottie from "../assets/empty.json";

const Orders = () => {
  const { orders, ordersLoading, fetchOrders } = useOrders();

  useEffect(() => {
    fetchOrders();
  }, []);

  if (ordersLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
          <p className="text-gray-400 text-sm font-medium tracking-wide">
            Fetching your orders…
          </p>
        </div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 flex flex-col items-center max-w-md w-full text-center">
          <Lottie animationData={EmptyLottie} loop className="w-52 mb-2" />
          <h2 className="text-xl font-bold text-gray-800 mt-2">
            No orders yet
          </h2>
          <p className="text-gray-400 text-sm mt-2 mb-6 leading-relaxed">
            Looks like you haven't placed any orders. Start shopping to see them
            here!
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-sm transition-colors"
          >
            <ShoppingBag size={16} />
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-300 ">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 mt-2 bg-blue-50 rounded-xl flex items-center justify-center">
              <Package size={18} className="text-blue-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 font-serif">
              My Orders
            </h1>
          </div>
          <p className="text-gray-400 text-sm ml-12">
            {orders.length} order{orders.length > 1 ? "s" : ""} placed
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        {orders.map((order) => {
          const shortId = "ORD-" + order.id.substring(0, 8).toUpperCase();
          const date = new Date(order.created_at).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });

          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-gray-50 bg-gray-50/60">
                <div className="flex flex-wrap items-center gap-4">
                  {/* Order ID */}
                  <div className="flex items-center gap-1.5">
                    <Hash size={13} className="text-gray-400" />
                    <span className="font-mono text-sm font-bold text-gray-700">
                      {shortId}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Calendar size={13} />
                    <span className="text-xs">{date}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 flex flex-col lg:flex-row gap-6">
                {/* LEFT — Items */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                    Items Ordered
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {order.items.map((item) => (
                      <div
                        key={item.product_id}
                        className="flex items-center gap-4 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-2xl px-4 py-4 transition-colors group w-full sm:w-[calc(50%-8px)] lg:w-full xl:w-[calc(50%-8px)]"
                      >
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-white border border-gray-200 shrink-0 shadow-sm">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-gray-800 truncate">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-400 mt-1">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-base font-bold text-blue-600 mt-1">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden lg:block w-px bg-gray-100 shrink-0" />
                <div className="block lg:hidden h-px bg-gray-100" />

                {/* RIGHT — Delivery + Total */}
                <div className="lg:w-60 xl:w-64 shrink-0 flex flex-col gap-3">
                  {/* Delivery Info */}
                  {order.delivery_info && (
                    <div className="rounded-xl border border-gray-100 overflow-hidden">
                      <div className="bg-blue-500 px-3 py-2 flex items-center gap-1.5">
                        <MapPin size={12} className="text-white" />
                        <span className="text-white text-xs font-semibold">
                          Delivering to
                        </span>
                      </div>
                      <div className="px-3 py-3 space-y-1 bg-blue-50/40">
                        <p className="text-sm font-semibold text-gray-800">
                          {order.delivery_info.fullName}
                        </p>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {order.delivery_info.address},{" "}
                          {order.delivery_info.state}
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.delivery_info.postcode},{" "}
                          {order.delivery_info.country}
                        </p>
                        <p className="text-xs text-gray-400 flex items-center gap-1.5 pt-0.5">
                          <Phone size={10} />
                          {order.delivery_info.phone}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Grand Total */}
                  <div className="flex justify-between items-center bg-gray-900 rounded-xl px-4 py-3.5">
                    <span className="text-sm font-medium text-gray-300">
                      Grand Total
                    </span>
                    <span className="text-xl font-bold text-white">
                      ${order.total}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
