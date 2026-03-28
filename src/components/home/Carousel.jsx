import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getData } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";

const CarouselSkeleton = () => (
  <div className="bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] h-[600px] flex items-center justify-center px-4">
    <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center w-full max-w-4xl animate-pulse">
      {/* Text side */}
      <div className="order-2 md:order-1 space-y-4 flex-1 w-full text-center md:text-left">
        {/* Subtitle line */}
        <div className="h-3 w-40 bg-indigo-900 rounded mx-auto md:mx-0" />
        {/* Title lines */}
        <div className="h-8 w-80 bg-indigo-900 rounded mx-auto md:mx-0" />
        <div className="h-8 w-64 bg-indigo-900 rounded mx-auto md:mx-0" />
        {/* Description lines */}
        <div className="space-y-2 pt-1">
          <div className="h-4 w-72 bg-slate-700/60 rounded mx-auto md:mx-0" />
          <div className="h-4 w-60 bg-slate-700/60 rounded mx-auto md:mx-0" />
          <div className="h-4 w-52 bg-slate-700/60 rounded mx-auto md:mx-0" />
        </div>
        {/* Button */}
        <div className="h-12 w-32 bg-indigo-800/70 rounded-xl mt-4 mx-auto md:mx-0" />
      </div>

      {/* Image side */}
      <div className="order-1 md:order-2 relative flex-shrink-0">
        {/* Glow ring placeholder */}
        <div className="absolute inset-0 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="relative w-[220px] sm:w-[280px] md:w-[400px] h-[220px] sm:h-[280px] md:h-[380px] bg-indigo-900/50 rounded-2xl" />
      </div>
    </div>
  </div>
);

const Carousel = () => {
  const { productsData } = getData();
  const navigate = useNavigate();

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div onClick={onClick} className={`arrow ${className} z-[3]`}>
        <ArrowLeft
          className="arrows bg-gray-600 text-white rounded-full p-3 w-10 h-10 absolute left-[50px] hover:bg-gray-500 transition"
          style={{ ...style, display: "block" }}
        />
      </div>
    );
  };

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div onClick={onClick} className={`arrow ${className} z-[3]`}>
        <ArrowRight
          className="arrows bg-gray-600 text-white rounded-full p-3 w-10 h-10 absolute right-[50px] hover:bg-gray-500 transition"
          style={{ ...style, display: "block" }}
        />
      </div>
    );
  };

  var settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow to="next" />,
    prevArrow: <SamplePrevArrow to="prev" />,
  };

  if (!productsData || productsData.length === 0) {
    return <CarouselSkeleton />;
  }

  return (
    <div className="overflow-hidden">
      <Slider {...settings}>
        {productsData.slice(98, 112).map((item) => (
          <div
            key={item.id}
            className="bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a]"
          >
            <div className="flex flex-col md:flex-row gap-8 md:gap-10 justify-center items-center h-[600px] px-4">
              {/* IMAGE */}
              <div className="order-1 md:order-2 relative">
                <div className="absolute inset-0 rounded-full bg-indigo-600/20 blur-3xl" />
                <img
                  onClick={() => navigate(`/products/${item.id}`)}
                  src={item.images[0]}
                  alt={item.title}
                  className="relative w-[220px] sm:w-[280px] md:w-[400px] mx-auto hover:scale-105 transition-all shadow-indigo-700/50 cursor-pointer"
                />
              </div>

              {/* TEXT */}
              <div className="order-2 md:order-1 space-y-3 md:space-y-6 text-center md:text-left">
                <h3 className="text-indigo-400 font-semibold text-sm">
                  Powering Your World with the Best.
                </h3>
                <h1 className="md:text-4xl text-xl font-bold uppercase md:w-[500px] text-white">
                  {item.title}
                </h1>
                <p className="md:w-[500px] line-clamp-3 text-slate-300">
                  {item.description}
                </p>
                <button
                  onClick={() => navigate(`/products/${item.id}`)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl shadow-lg shadow-indigo-600/40 transition cursor-pointer"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
