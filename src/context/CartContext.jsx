// context/CartContext.jsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { toast } from "react-toastify";
import { supabase } from "../lib/Client";
import { useAuth } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItem, setCartItem] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  // ─── Helpers to extract only what we need from full DummyJSON product ───
  const normalize = (product, qty = 1) => ({
    product_id: product.id || product.product_id,
    title: product.title,
    thumbnail: product.thumbnail,
    price: product.price,
    quantity: qty,
  });

  // ─── Fetch cart from Supabase ────────────────────────────────────────────
  const fetchCart = useCallback(async () => {
    setCartLoading(true);
    const { data, error } = await supabase
      .from("cart")
      .select("*")
      .order("created_at", { ascending: true });
    if (!error) setCartItem(data || []);
    setCartLoading(false);
  }, []);

  // ─── Merge guest localStorage cart into Supabase on login ───────────────
  const mergeGuestCart = useCallback(
    async (userId) => {
      const guest = JSON.parse(localStorage.getItem("guestCart") || "[]");
      if (guest.length === 0) return;

      const upserts = guest.map((item) => ({ ...item, user_id: userId }));
      await supabase
        .from("cart")
        .upsert(upserts, { onConflict: "user_id,product_id" });

      localStorage.removeItem("guestCart");
      fetchCart();
    },
    [fetchCart],
  );

  // ─── On auth change ──────────────────────────────────────────────────────
  useEffect(() => {
    if (user) {
      mergeGuestCart(user.id).then(() => fetchCart());
    } else {
      // Load guest cart
      const guest = JSON.parse(localStorage.getItem("guestCart") || "[]");
      setCartItem(guest);
    }
  }, [user]);

  // ─── Save guest cart to localStorage whenever it changes (logged out) ───
  useEffect(() => {
    if (!user) {
      localStorage.setItem("guestCart", JSON.stringify(cartItem));
    }
  }, [cartItem, user]);

  // ─── addToCart ───────────────────────────────────────────────────────────
  const addToCart = async (product, quantity = 1) => {
    const item = normalize(product, quantity);

    if (user) {
      const existing = cartItem.find((i) => i.product_id === item.product_id);

      if (existing) {
        // Increase quantity in Supabase
        await supabase
          .from("cart")
          .update({ quantity: existing.quantity + quantity })
          .eq("user_id", user.id)
          .eq("product_id", item.product_id);
        toast.success("Product quantity increased!");
      } else {
        await supabase.from("cart").insert({ ...item, user_id: user.id });
        toast.success("Product added to cart!");
      }
      fetchCart();
    } else {
      // Guest mode
      setCartItem((prev) => {
        const exists = prev.find((i) => i.product_id === item.product_id);
        if (exists) {
          toast.success("Product quantity increased!");
          return prev.map((i) =>
            i.product_id === item.product_id
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          );
        }
        toast.success("Product added to cart!");
        return [...prev, item];
      });
    }
  };

  // ─── updateQuantity ──────────────────────────────────────────────────────
  const updateQuantity = async (productId, action) => {
    const existing = cartItem.find(
      (i) => i.product_id === productId || i.id === productId,
    );
    if (!existing) return;

    const newQty =
      action === "increase" ? existing.quantity + 1 : existing.quantity - 1;

    if (newQty <= 0) return deleteItem(productId);

    if (user) {
      await supabase
        .from("cart")
        .update({ quantity: newQty })
        .eq("user_id", user.id)
        .eq("product_id", existing.product_id);
      fetchCart();
    } else {
      setCartItem((prev) =>
        prev.map((i) =>
          i.product_id === productId ? { ...i, quantity: newQty } : i,
        ),
      );
    }

    toast.success(
      action === "increase" ? "Quantity increased!" : "Quantity decreased!",
    );
  };

  // ─── deleteItem ──────────────────────────────────────────────────────────
  const deleteItem = async (productId) => {
    if (user) {
      await supabase
        .from("cart")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", productId);
      fetchCart();
    } else {
      setCartItem((prev) => prev.filter((i) => i.product_id !== productId));
    }
    toast.success("Product removed!");
  };

  // ─── clearCart ───────────────────────────────────────────────────────────
  const clearCart = async () => {
    if (user) {
      await supabase.from("cart").delete().eq("user_id", user.id);
    } else {
      localStorage.removeItem("guestCart");
    }
    setCartItem([]);
  };

  const cartCount = cartItem.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cartItem.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItem,
        cartLoading,
        cartCount,
        cartTotal,
        addToCart,
        updateQuantity,
        deleteItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
