import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, ChevronDown } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email format";
    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Form Data:", form); // Dummy submit proof
    setSuccess(true);
    setForm({ name: "", email: "", message: "" });

    setTimeout(() => setSuccess(false), 3000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact Cartify
          </h1>
          <p className="text-gray-300">
            We'd love to hear from you. Reach out anytime.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          {/* Company Info */}
          <div className="space-y-6 mt-10">
            <h2 className="text-2xl font-bold text-slate-900">Get in Touch</h2>

            <div className="flex items-center gap-4">
              <MapPin className="text-indigo-600" />
              <p className="text-gray-600">Kapra Mandal, Telangana, India</p>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="text-indigo-600" />
              <p className="text-gray-600">+91 98765 43210</p>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="text-indigo-600" />
              <p className="text-gray-600">support@cartify.com</p>
            </div>

            <div className="flex gap-4 pt-4">
              <span className="hover:text-indigo-600 cursor-pointer">
                Twitter
              </span>
              <span className="hover:text-indigo-600 cursor-pointer">
                Instagram
              </span>
              <span className="hover:text-indigo-600 cursor-pointer">
                LinkedIn
              </span>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-slate-50 p-8 rounded-xl shadow space-y-5"
          >
            <h3 className="text-xl font-semibold text-slate-900">
              Send a Message
            </h3>

            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-3 border rounded-lg"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-3 border rounded-lg"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <textarea
                rows="4"
                placeholder="Your Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full p-3 border rounded-lg"
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition w-full"
            >
              Send Message
            </button>

            {success && (
              <p className="text-green-600 text-center font-semibold">
                Message Sent Successfully!
              </p>
            )}
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>

          {[
            {
              q: "How long does delivery take?",
              a: "Usually 3–5 business days across India.",
            },
            {
              q: "Do you offer refunds?",
              a: "Yes, 30-day easy return policy.",
            },
            {
              q: "Is payment secure?",
              a: "100% secure payment gateway.",
            },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-lg mb-4 shadow">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex justify-between items-center p-4 font-semibold"
              >
                {item.q}
                <ChevronDown
                  className={`transition ${openFaq === i ? "rotate-180" : ""}`}
                />
              </button>
              {openFaq === i && (
                <p className="p-4 text-gray-600 pt-0">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;
