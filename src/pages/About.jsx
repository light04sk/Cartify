import { useEffect } from "react";
import { Link } from "react-router-dom";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 text-white py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Cartify</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Your one-stop destination for next-gen electronics, fashion,
            sport-accessories and lifestyle products.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-slate-900">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At Cartify, our mission is to make online shopping simple, fast,
              and enjoyable. We curate high-quality products and deliver them
              with great pricing, secure payments, and fast shipping.
            </p>
          </div>
          <div className="bg-indigo-50 rounded-2xl p-10 text-center shadow">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              Trusted by 10,000+ users
            </h3>
            <p className="text-gray-600">
              Across India for electronics, fashion, sports & lifestyle
              shopping.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10 text-slate-900">
            Why Choose Cartify?
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: "Fast Delivery",
                desc: "Quick and reliable shipping across India.",
              },
              {
                title: "Secure Payment",
                desc: "100% protected payment gateway.",
              },
              {
                title: "Quality Products",
                desc: "Curated and verified products.",
              },
              { title: "24/7 Support", desc: "We’re always here to help you." },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg mb-2 text-indigo-600">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Built for Modern Shoppers
            </h2>
            <p className="text-gray-300">
              Cartify is built using modern web technologies like React and
              Tailwind CSS, focusing on performance, design, and user
              experience.
            </p>
          </div>
          <div className="bg-white/10 rounded-2xl p-10 backdrop-blur">
            <h3 className="text-xl font-semibold mb-2">Tech Stack</h3>
            <ul className="text-gray-300 space-y-2">
              <li>⚡ React JS</li>
              <li>🎨 Tailwind CSS</li>
              <li>🛒 Modern E-commerce UI</li>
              <li>🚀 Optimized Performance</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Start Shopping with Cartify
        </h2>
        <p className="text-gray-600 mb-6">
          Discover electronics, fashion & lifestyle products today.
        </p>
        <Link to={"/products"}>
          <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition shadow-sm hover:shadow-md">
            Browse Products
          </button>
        </Link>
      </section>
    </div>
  );
};

export default About;
