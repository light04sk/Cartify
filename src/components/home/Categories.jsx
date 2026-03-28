import { getData } from "../../context/DataContext";
import electronicsImg from "../../assets/electronics.webp";
import homeImg from "../../assets/home.webp";
import menFashionImg from "../../assets/menFashion.webp";
import womenFashionImg from "../../assets/womenFashion.webp";
import { useNavigate } from "react-router-dom";

const CATEGORY_UI = {
  Electronics: {
    subtitle: "Latest gadgets & accessories",
    image: electronicsImg,
  },
  "Men's Fashion": {
    subtitle: "Trending styles for Men",
    image: menFashionImg,
  },
  "Women's Fashion": {
    subtitle: "Trending styles for Women",
    image: womenFashionImg,
  },
  "Home & Lifestyle": {
    subtitle: "Upgrade your living space",
    image: homeImg,
  },
};

const CategoriesSkeleton = () => (
  <div className="w-full max-w-7xl mx-auto mt-10 px-4 py-10 animate-pulse">
    {/* Section heading */}
    <div className="h-8 w-52 bg-gray-200 rounded mb-8" />

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="relative rounded-2xl overflow-hidden shadow-lg">
          {/* Card image placeholder */}
          <div className="w-full h-[420px] bg-gray-200" />

          {/* Overlay gradient placeholder */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-300/60 via-gray-200/20 to-transparent" />

          {/* Bottom text + button placeholder */}
          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <div className="h-6 w-32 bg-gray-300 rounded" />
            <div className="h-4 w-40 bg-gray-300/70 rounded" />
            <div className="h-9 w-28 bg-gray-300 rounded-lg mt-3" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Categories = () => {
  const { MainCategoriesData } = getData();
  const navigate = useNavigate();

  if (!MainCategoriesData || MainCategoriesData.length === 0) {
    return <CategoriesSkeleton />;
  }

  const categoryList = MainCategoriesData.map((title, index) => ({
    id: index + 1,
    title,
    subtitle: CATEGORY_UI[title]?.subtitle || "",
    image: CATEGORY_UI[title]?.image,
  }));

  return (
    <div className="w-full max-w-7xl mx-auto mt-10 px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Shop by Category
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categoryList.slice(1).map((item) => (
          <div
            key={item.id}
            className="relative group rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="w-full h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h2 className="text-2xl font-bold">{item.title}</h2>
              <p className="text-sm opacity-90 mb-3">{item.subtitle}</p>

              <button
                onClick={() =>
                  navigate(`/category/${item.title.toLowerCase()}`)
                }
                className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold transition hover:bg-black hover:text-white"
              >
                Explore
                <span className="text-lg">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
