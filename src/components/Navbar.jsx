import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MapPin, ChevronDown, X, ShoppingCart, Menu } from "lucide-react";
import { useCart } from "../context/CartContext";
import useLocation from "../hooks/useLocation";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/Client";

const Navbar = () => {
  const [dropDown, setDropDown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { cartItem } = useCart();
  const { location, setLocation, getLocation } = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <>
      {/* NAVBAR */}
      <div className="bg-white py-4 shadow-md fixed top-0 w-full z-50">
        <div className="max-w-8xl mx-10 flex ">
          {/* LEFT */}
          <div className="flex items-center gap-10">
            <Link to="/">
              <h1 className="font-bold text-3xl font-serif">
                <span className="text-blue-500 text-4xl">C</span>artify
              </h1>
            </Link>

            {/* Location */}
            <div className="relative hidden sm:flex gap-1 cursor-pointer items-center">
              <MapPin className="text-blue-500" />
              <div onClick={() => setDropDown(!dropDown)}>
                {location ? (
                  <div className="flex flex-col -space-y-1 text-sm">
                    <span className="text-gray-500">
                      {location.address.county}
                    </span>
                    <span className="font-medium text-gray-800">
                      {location.address.state}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-700 font-medium">Add Address</span>
                )}
              </div>
              <ChevronDown />

              {dropDown && (
                <div className="absolute top-full mt-3 left-0 w-64 bg-white border shadow-lg rounded-xl p-4 z-50">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-sm">Update location</span>
                    <X
                      onClick={() => setDropDown(false)}
                      className="cursor-pointer text-gray-500"
                    />
                  </div>

                  <button
                    onClick={() => {
                      getLocation();
                      setDropDown(false);
                    }}
                    className="w-full text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm font-semibold"
                  >
                    Auto Detect
                  </button>

                  <button
                    onClick={() => {
                      localStorage.removeItem("userLocation");
                      setLocation("");
                      setDropDown(false);
                    }}
                    className="w-full mt-2 text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-semibold"
                  >
                    Clear Location
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="ml-auto flex items-center gap-8">
            {/* DESKTOP MENU */}
            <nav className="hidden mr-10 md:flex">
              <ul className="flex gap-8 items-center text-md font-serif">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600" : "text-gray-700"
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600" : "text-gray-700"
                  }
                >
                  Products
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600" : "text-gray-700"
                  }
                >
                  About
                </NavLink>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600" : "text-gray-700"
                  }
                >
                  Contact
                </NavLink>
                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600" : "text-gray-700"
                  }
                >
                  Orders
                </NavLink>
                <NavLink
                  to="/wishlist"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600" : "text-gray-700"
                  }
                >
                  Wishlist
                </NavLink>
              </ul>
            </nav>

            {/* CART */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 rounded-full">
                {cartItem.length}
              </span>
            </Link>

            {/* AUTH BUTTONS */}
            <div className="hidden md:flex items-center gap-5">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-500 font-medium"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-blue-500 text-white px-5 py-1.5 rounded-full font-medium hover:bg-blue-600 transition"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button onClick={() => setMobileMenu(true)} className="md:hidden">
              <Menu className="h-7 w-7 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed inset-0 z-50 ${mobileMenu ? "visible" : "invisible"}`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMobileMenu(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            mobileMenu ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Sidebar Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-white shadow-xl flex flex-col transition-transform duration-300 ${
            mobileMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-5 border-b">
            <h2 className="font-bold text-xl font-serif">
              <span className="text-blue-500 text-2xl">C</span>artify
            </h2>
            <button
              onClick={() => setMobileMenu(false)}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Nav Links */}
          <ul className="flex flex-col px-4 py-6 gap-1">
            {[
              { to: "/", label: "Home" },
              { to: "/products", label: "Products" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
              { to: "/orders", label: "Orders" },
              { to: "/wishlist", label: "Wishlist" },
            ].map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={() => setMobileMenu(false)}
                  className={({ isActive }) =>
                    `block w-full px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="mx-6 border-t" />

          {/* AUTH */}
          <div className="px-6 py-6 mt-auto space-y-3">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full py-2.5 border border-red-400 text-red-500 rounded-full font-medium hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenu(false)}
                  className="block text-center py-2.5 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenu(false)}
                  className="block text-center py-2.5 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
