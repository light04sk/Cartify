import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getData } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const CarouselSkeleton = () => (
  <div className="bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] h-[600px] flex items-center justify-center px-4">
    <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center w-full max-w-4xl animate-pulse">
      <div className="order-2 md:order-1 space-y-4 flex-1 w-full text-center md:text-left">
        <div className="h-3 w-40 bg-indigo-900 rounded mx-auto md:mx-0" />
        <div className="h-8 w-80 bg-indigo-900 rounded mx-auto md:mx-0" />
        <div className="h-8 w-64 bg-indigo-900 rounded mx-auto md:mx-0" />
        <div className="space-y-2 pt-1">
          <div className="h-4 w-72 bg-slate-700/60 rounded mx-auto md:mx-0" />
          <div className="h-4 w-60 bg-slate-700/60 rounded mx-auto md:mx-0" />
          <div className="h-4 w-52 bg-slate-700/60 rounded mx-auto md:mx-0" />
        </div>
        <div className="h-12 w-32 bg-indigo-800/70 rounded-xl mt-4 mx-auto md:mx-0" />
      </div>
      <div className="order-1 md:order-2 relative flex-shrink-0">
        <div className="absolute inset-0 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="relative w-[220px] sm:w-[280px] md:w-[400px] h-[220px] sm:h-[280px] md:h-[380px] bg-indigo-900/50 rounded-2xl" />
      </div>
    </div>
  </div>
);

const Carousel = () => {
  const { productsData } = getData();
  const navigate = useNavigate();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (!productsData || productsData.length === 0) {
    return <CarouselSkeleton />;
  }

  return (
    <div className="relative overflow-hidden">
      {/* Custom Arrows */}
      <button
        ref={prevRef}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-gray-600 hover:bg-gray-500 text-white rounded-full p-2.5 transition"
        aria-label="Previous slide"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <button
        ref={nextRef}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-gray-600 hover:bg-gray-500 text-white rounded-full p-2.5 transition"
        aria-label="Next slide"
      >
        <ArrowRight className="w-5 h-5" />
      </button>

      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        speed={500}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
      >
        {productsData.slice(98, 112).map((item) => (
          <SwiperSlide key={item.id}>
            <div className="bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a]">
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
