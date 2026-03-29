import { useState, useEffect } from "react";
import useLocation from "../../hooks/useLocation";
import { toast } from "react-toastify";
import { Pencil, CheckCircle } from "lucide-react";

const DeliveryForm = ({ fullName }) => {
  const { location, getLocation } = useLocation();
  const [phone, setPhone] = useState("");
  const [saved, setSaved] = useState(false);

  // Load saved delivery info from localStorage on mount
  useEffect(() => {
    const savedInfo = localStorage.getItem("deliveryInfo");
    if (savedInfo) {
      const parsed = JSON.parse(savedInfo);
      setPhone(parsed.phone || "");
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

  const inputStyle =
    "p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";

  const readOnlyStyle =
    "p-3 rounded-xl border border-gray-100 bg-gray-50 text-gray-700 cursor-default";

  const handleSubmit = () => {
    if (!location?.address?.county) {
      toast.error("Please detect your location first");
      return;
    }
    if (!location?.address?.state) {
      toast.error("State is missing — please detect location again");
      return;
    }
    if (!location?.address?.postcode) {
      toast.error("Postcode is missing — please detect location again");
      return;
    }
    if (!location?.address?.country) {
      toast.error("Country is missing — please detect location again");
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
      fullName,
      address: location?.address?.county,
      state: location?.address?.state,
      postcode: location?.address?.postcode,
      country: location?.address?.country,
      phone: phone.trim(),
    };

    localStorage.setItem("deliveryInfo", JSON.stringify(deliveryInfo));
    setSaved(true);
    toast.success("Address saved successfully!");
  };

  const handleEdit = () => {
    setSaved(false);
  };

  const savedInfo = (() => {
    try {
      return JSON.parse(localStorage.getItem("deliveryInfo") || "{}");
    } catch {
      return {};
    }
  })();

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
          className={readOnlyStyle}
          placeholder="Full Name"
          value={saved ? savedInfo.fullName || fullName : fullName}
          readOnly
        />
        <input
          className={readOnlyStyle}
          placeholder="Address"
          value={
            saved ? savedInfo.address || "" : location?.address?.county || ""
          }
          readOnly
        />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          className={readOnlyStyle}
          placeholder="State"
          value={saved ? savedInfo.state || "" : location?.address?.state || ""}
          readOnly
        />
        <input
          className={readOnlyStyle}
          placeholder="Postcode"
          value={
            saved ? savedInfo.postcode || "" : location?.address?.postcode || ""
          }
          readOnly
        />
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          className={readOnlyStyle}
          placeholder="Country"
          value={
            saved ? savedInfo.country || "" : location?.address?.country || ""
          }
          readOnly
        />
        {/* FIXED: removed readOnly, use disabled instead so mobile keyboard works */}
        <input
          className={saved ? readOnlyStyle : inputStyle}
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          maxLength={15}
          type="tel"
          disabled={saved}
        />
      </div>

      {/* Submit + Detect — hidden when saved */}
      {!saved && (
        <>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl w-full transition"
          >
            Submit
          </button>

          <div className="text-center text-gray-400">— OR —</div>

          <button
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
