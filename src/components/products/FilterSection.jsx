import { getData } from "../../context/DataContext";

const FilterSection = ({
  search,
  setSearch,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
  category,
  setCategory,
  handleCategoryChange,
  handleBrandChange,
}) => {
  const { productsData, BrandData } = getData();

  const CATEGORY_ORDER = [
    "Accessories",
    "Electronics",
    "Men's Fashion",
    "Women's Fashion",
    "Home & Lifestyle",
  ];

  //  Dynamic grouping from normalized data
  const CATEGORY_GROUPS = productsData.reduce((acc, product) => {
    const main = product.mainCategory;
    const sub = product.category;

    if (!acc[main]) acc[main] = new Set();
    acc[main].add(sub);

    return acc;
  }, {});

  const CATEGORY_GROUPS_ARRAY = Object.entries(CATEGORY_GROUPS)
    .map(([key, value]) => [key, Array.from(value)])
    .sort(
      (a, b) => CATEGORY_ORDER.indexOf(a[0]) - CATEGORY_ORDER.indexOf(b[0]),
    );

  return (
    <div className="bg-gray-100 mt-8 p-6 rounded-md w-full">
      {/* SEARCH */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white p-3 rounded-md border-gray-400 border-2 w-full"
        />
      </div>

      {/* CATEGORIES */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {CATEGORY_GROUPS_ARRAY.map(([groupName, categories]) => (
          <div key={groupName}>
            <h2 className="font-bold text-sm text-gray-800 mb-2 underline">
              {groupName}
            </h2>

            <div className="flex flex-col gap-2">
              {categories.map((item, idx) => (
                <label
                  key={idx}
                  className="flex gap-2 items-center text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={category === item}
                    value={item}
                    onChange={handleCategoryChange}
                  />
                  <span className="uppercase">{item}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Products / All (same as your image) */}
        <div>
          <h2 className="font-bold text-sm text-gray-800 mb-2 underline">
            Products
          </h2>
          <label className="flex gap-2 items-center text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={category === "All"}
              value="All"
              onChange={handleCategoryChange}
            />
            <span className="uppercase">ALL</span>
          </label>
        </div>
      </div>

      {/* BRAND + PRICE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h1 className="font-semibold mb-2">Brand</h1>
          <select
            value={brand}
            onChange={handleBrandChange}
            className="bg-white w-full p-2 border-gray-200 border-2 rounded-md"
          >
            {BrandData?.map((item, idx) => (
              <option key={idx} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h1 className="font-semibold mb-2">Price Range</h1>
          <label className="text-sm block mb-1">
            ${priceRange[0]} - ${priceRange[1]}
          </label>
          <input
            type="range"
            min="0"
            max="2000"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="w-full"
          />
        </div>
      </div>

      {/* RESET */}
      <div className="flex justify-center">
        <button
          onClick={() => {
            setSearch("");
            setPriceRange([0, 2000]);
            setCategory("All");
            setBrand("All");
          }}
          className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-md px-6 py-2"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
