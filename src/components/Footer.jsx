import { Facebook, Instagram, Twitter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand — full width on mobile */}
        <div className="col-span-2 sm:col-span-2 md:col-span-1">
          <h2 className="text-2xl font-bold text-white">Cartify</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Your one-stop shop for next-gen electronics, fashion and lifestyle.
          </p>
          <div className="mt-4 flex gap-4 text-gray-300">
            <Facebook className="w-5 h-5 hover:text-red-400 cursor-pointer transition" />
            <Instagram className="w-5 h-5 hover:text-red-400 cursor-pointer transition" />
            <Twitter className="w-5 h-5 hover:text-red-400 cursor-pointer transition" />
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-white font-semibold mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li
              onClick={() => navigate("/category/electronics")}
              className="hover:text-red-400 cursor-pointer"
            >
              Electronics
            </li>
            <li
              onClick={() => navigate("/category/men's fashion")}
              className="hover:text-red-400 cursor-pointer"
            >
              Fashion
            </li>
            <li
              onClick={() => navigate("/category/home & lifestyle")}
              className="hover:text-red-400 cursor-pointer"
            >
              Home & Lifestyle
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li
              onClick={() => navigate("/about")}
              className="hover:text-red-400 cursor-pointer"
            >
              About
            </li>
            <li
              onClick={() => navigate("/products")}
              className="hover:text-red-400 cursor-pointer"
            >
              Products
            </li>
            <li
              onClick={() => navigate("/contact")}
              className="hover:text-red-400 cursor-pointer"
            >
              Contact
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-red-400 cursor-pointer">Help Center</li>
            <li className="hover:text-red-400 cursor-pointer">Returns</li>
            <li className="hover:text-red-400 cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-400">
        © 2026 Cartify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
