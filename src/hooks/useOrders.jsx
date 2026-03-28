// hooks/useOrders.js
import { useState } from "react";
import { supabase } from "../lib/Client";
import { useAuth } from "../context/AuthContext";

const useOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const fetchOrders = async () => {
    if (!user) return;
    setOrdersLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (!error) setOrders(data || []);
    setOrdersLoading(false);
  };

  const placeOrder = async ({ items, deliveryInfo, total }) => {
    if (!user) return { error: "Not logged in" };

    const { data, error } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        items, // cart array saved as JSON
        delivery_info: deliveryInfo,
        total,
        status: "Pending",
      })
      .select()
      .single();

    return { data, error };
  };

  return { orders, ordersLoading, fetchOrders, placeOrder };
};

export default useOrders;
