import { useState, useEffect } from "react";
import useLocation from "../../hooks/useLocation";
import { toast } from "react-toastify";
import { Pencil, CheckCircle } from "lucide-react";

const DeliveryForm = ({ fullName }) => {
  const { location, getLocation } = useLocation();
  const [phone, setPhone] = useState("");
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    state: "",
    postcode: "",
    country: "",
  });

  useEffect(() => {
    const savedInfo = localStorage.getItem("deliveryInfo");
    if (savedInfo) {
      const parsed = JSON.parse(savedInfo);
      setPhone(parsed.phone || "");
      setFormData({
        fullName: parsed.fullName || "",
        address: parsed.address || "",
        state: parsed.state || "",
        postcode: parsed.postcode || "",
        country: parsed.country || "",
      });
      if (
        parsed.address &&
        parsed.state &&
        parsed.postcode &&
        parsed.country &&
        parsed.phone
      ) {
        setSaved(true);
      }
    }
  }, []);

  useEffect(() => {
    if (location?.address) {
      setFormData((prev) => ({
        ...prev,
        address: location.address.county || prev.address,
        state: location.address.state || prev.state,
        postcode: location.address.postcode || prev.postcode,
        country: location.address.country || prev.country,
      }));
    }
  }, [location]);

  const inputStyle =
    "p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (saved) setSaved(false);
  };

  const handleSubmit = () => {
    if (!formData.address.trim()) {
      toast.error("Please enter or detect your address");
      return;
    }
    if (!formData.state.trim()) {
      toast.error("Please enter your state");
      return;
    }
    if (!formData.postcode.trim()) {
      toast.error("Please enter your postcode");
      return;
    }
    if (!formData.country.trim()) {
      toast.error("Please enter your country");
      return;
    }
    if (!phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }
    if (!/^\d{7,15}$/.test(phone.trim())) {
      toast.error("Enter a valid phone number (7–15 digits)");
      return;
    }

    const deliveryInfo = {
      fullName: formData.fullName || fullName,
      address: formData.address,
      state: formData.state,
      postcode: formData.postcode,
      country: formData.country,
      phone: phone.trim(),
    };

    localStorage.setItem("deliveryInfo", JSON.stringify(deliveryInfo));
    setSaved(true);
    toast.success("Address saved successfully!");
  };

  const handleEdit = () => {
    setSaved(false);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Delivery Information</h2>
        {saved && (
          <button
            onClick={handleEdit}
            className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition"
          >
            <Pencil size={14} />
            Edit
          </button>
        )}
      </div>

      {/* Saved confirmation banner */}
      {saved && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2.5 rounded-xl">
          <CheckCircle size={16} />
          Address saved — this will be used for all your orders.
        </div>
      )}

      {/* Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          className={inputStyle}
          placeholder="Full Name"
          value={formData.fullName || fullName}
          onChange={handleChange("fullName")}
        />
        <input
          className={inputStyle}
          placeholder="Address"
          value={formData.address}
          onChange={handleChange("address")}
        />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          className={inputStyle}
          placeholder="State"
          value={formData.state}
          onChange={handleChange("state")}
        />
        <input
          className={inputStyle}
          placeholder="Postcode"
          value={formData.postcode}
          onChange={handleChange("postcode")}
        />
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          className={inputStyle}
          placeholder="Country"
          value={formData.country}
          onChange={handleChange("country")}
        />
        <input
          className={inputStyle}
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => {
            const val = e.target.value.replace(/[^\d]/g, "");
            setPhone(val);
            if (saved) setSaved(false);
          }}
          maxLength={15}
          type="tel"
          autoComplete="tel"
        />
      </div>

      {/* Submit + Detect */}
      {!saved && (
        <>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl w-full transition"
          >
            Submit
          </button>

          <div className="text-center text-gray-400">— OR —</div>

          <button
            type="button"
            onClick={getLocation}
            className="bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 rounded-xl w-full transition"
          >
            Detect Location
          </button>
        </>
      )}
    </div>
  );
};

export default DeliveryForm;
