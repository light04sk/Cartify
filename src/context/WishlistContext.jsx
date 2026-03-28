// context/WishlistContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../lib/Client";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    const { data, error } = await supabase
      .from("wishlist")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setWishlist(data || []);
  };

  useEffect(() => {
    if (user) fetchWishlist();
    else setWishlist([]);
  }, [user]);

  const addToWishlist = async (product) => {
    if (!user) {
      toast.error("Please login to save to wishlist");
      return;
    }
    const { error } = await supabase.from("wishlist").upsert(
      {
        user_id: user.id,
        product_id: product.id || product.product_id,
        title: product.title,
        thumbnail: product.thumbnail,
        price: product.price,
      },
      { onConflict: "user_id,product_id" },
    );
    if (!error) {
      toast.success("Added to wishlist!");
      fetchWishlist();
    }
  };

  const removeFromWishlist = async (productId) => {
    await supabase
      .from("wishlist")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", productId);
    toast.success("Removed from wishlist!");
    fetchWishlist();
  };

  const isWishlisted = (productId) =>
    wishlist.some((i) => i.product_id === productId);

  const toggleWishlist = (product) => {
    if (isWishlisted(product.id)) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, isWishlisted, toggleWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
