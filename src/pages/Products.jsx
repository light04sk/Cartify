import FilterSection from "../components/products/FilterSection";
import ProductCards from "../components/products/ProductCards";
import Pagination from "../components/products/Pagination";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import EmptyLottie from "../assets/empty.json";
import { getData } from "../context/DataContext";
import { SlidersHorizontal, X } from "lucide-react";

// ─── Skeletons ────────────────────────────────────────────────────────────────

const FilterSkeleton = () => (
  <div className="animate-pulse space-y-6 p-4 border border-gray-100 rounded-2xl">
    {/* Search bar */}
    <div className="h-10 w-full bg-gray-200 rounded-lg" />

    {/* Category groups — 2 columns like the real filter */}
    <div className="grid grid-cols-2 gap-6">
      {[...Array(6)].map((_, col) => (
        <div key={col} className="space-y-3">
          {/* Group heading */}
          <div className="h-3 w-24 bg-gray-300 rounded" />
          {/* 3–4 checkbox rows */}
          {[...Array(col % 2 === 0 ? 4 : 3)].map((_, row) => (
            <div key={row} className="flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-200 rounded" />
              <div
                className="h-3 bg-gray-200 rounded"
                style={{ width: `${55 + ((row * 13) % 30)}px` }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>

    {/* Brand + Price range side by side */}
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <div className="h-3 w-12 bg-gray-300 rounded" />
        <div className="h-9 w-full bg-gray-200 rounded-lg" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-20 bg-gray-300 rounded" />
        <div className="h-3 w-24 bg-gray-200 rounded" />
        <div className="h-2 w-full bg-gray-200 rounded-full mt-2" />
      </div>
    </div>

    {/* Reset button */}
    <div className="h-10 w-32 bg-gray-200 rounded-lg" />
  </div>
);

const ProductCardSkeleton = () => (
  <div className="animate-pulse border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
    {/* Product image */}
    <div className="w-full h-48 bg-gray-200" />
    <div className="p-3 space-y-3">
      {/* Title */}
      <div className="h-4 w-3/4 bg-gray-200 rounded" />
      <div className="h-4 w-1/2 bg-gray-200 rounded" />
      {/* Price */}
      <div className="h-5 w-16 bg-gray-300 rounded" />
      {/* Add to Cart button */}
      <div className="h-10 w-full bg-gray-200 rounded-lg" />
    </div>
  </div>
);

const ProductPageSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 mb-10">
    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 mt-8">
      {/* Left: filter skeleton — hidden on mobile */}
      <div className="hidden lg:block">
        <FilterSkeleton />
      </div>

      {/* Right: 8 product card skeletons */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {[...Array(8)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const Product = () => {
  const { productsData } = getData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [page, setPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    setPage(1);
  };

  const pageHandler = (currPage) => {
    setPage(currPage);
  };

  const filteredProducts = productsData?.filter((item) => {
    return (
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category) &&
      (brand === "All" || item.brand === brand) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1]
    );
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [filteredProducts]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsFilterOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const lastPage = Math.ceil(filteredProducts?.length / 8);

  // ── Show skeleton while data is loading ──
  if (!productsData || productsData.length === 0) {
    return <ProductPageSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
        {/* ── MOBILE FILTER TOGGLE BUTTON ── */}
        <div className="lg:hidden flex items-center justify-between mt-8">
          <p className="text-sm text-gray-500">
            {filteredProducts?.length ?? 0} products found
          </p>
          <button
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border bg-white shadow-sm text-sm font-medium hover:bg-purple-50 transition-all"
          >
            {isFilterOpen ? (
              <>
                <X size={16} />
                Close Filters
              </>
            ) : (
              <>
                <SlidersHorizontal size={16} />
                Filters
              </>
            )}
          </button>
        </div>

        {/* ── FILTER PANEL ── */}
        <div
          className={`
            lg:block
            transition-all duration-300 ease-in-out overflow-hidden
            ${isFilterOpen ? "block max-h-[2000px] opacity-100" : "hidden max-h-0 opacity-0"}
            lg:max-h-none lg:opacity-100
          `}
        >
          <FilterSection
            search={search}
            setSearch={setSearch}
            brand={brand}
            setBrand={setBrand}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            category={category}
            setCategory={setCategory}
            handleCategoryChange={handleCategoryChange}
            handleBrandChange={handleBrandChange}
          />
        </div>

        {/* ── PRODUCTS SECTION ── */}
        {filteredProducts?.length > 0 ? (
          <div className="flex flex-col justify-center items-center">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredProducts
                ?.slice(page * 8 - 8, page * 8)
                .map((product) => (
                  <ProductCards key={product.id} product={product} />
                ))}
            </div>
            <Pagination
              pageHandler={pageHandler}
              page={page}
              lastPage={lastPage}
            />
          </div>
        ) : (
          // ── EMPTY STATE — keep Lottie here, this is intentional UI feedback ──
          <div className="flex justify-center items-center md:h-[600px] md:w-[900px] mt-10">
            <Lottie
              animationData={EmptyLottie}
              loop={true}
              className="w-[500px]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
