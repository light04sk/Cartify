import { useCart } from "../context/CartContext";
import CartList from "../components/cart/CartList";
import DeliveryForm from "../components/cart/DeliveryForm";
import BillSummary from "../components/cart/BillSummary";
import EmptyCart from "../components/cart/EmptyCart";
import { useEffect, useState } from "react";
import { supabase } from "../lib/Client";

const Cart = () => {
  const { cartItem } = useCart();

  const totalPrice = Math.round(
    cartItem.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

  if (!cartItem.length) return <EmptyCart />;

  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setFullName(data.user.user_metadata.full_name);
      }
    };

    getUser();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 ">
      <h1 className="text-2xl font-bold mb-6">My Cart ({cartItem.length})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <CartList cartItem={cartItem} />
          <DeliveryForm fullName={fullName} />
        </div>

        <BillSummary totalPrice={totalPrice} />
      </div>
    </div>
  );
};

export default Cart;
