import { useNavigate } from "react-router-dom";
import banner from "../../assets/banner1.webp";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className=" md:py-24">
      <div
        className="relative max-w-7xl mx-auto md:rounded-2xl pt-28 bg-cover bg-center h-[550px] md:h-[600px] "
        style={{
          backgroundImage: `url(${banner})`,
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/60 md:rounded-2xl bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
              Everything You Need, One Click Away
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Explore curated products with great prices and fast delivery.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-semibold mt-8 py-2 px-4 md:py-3 md:px-6 rounded-lg transition duration-300"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
