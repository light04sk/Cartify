import { useState, useEffect, createContext, useContext, useMemo } from "react";
import axios from "axios";
import { CATEGORY_MAP } from "../data/CategoryMap";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [productsData, setProductsData] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);
  const [productId, setProductId] = useState(null);

  const excluded = [
    "motorcycle",
    "skin-care",
    "vehicle",
    "womens-watches",
    "womens-jewellery",
  ];

  // Fetch ALL products ONCE
  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products?limit=200");
      const filtered = res.data.products.filter(
        (p) => !excluded.includes(p.category),
      );

      const normalized = filtered.map((p) => ({
        ...p,
        mainCategory: CATEGORY_MAP[p.category] || "Others",
      }));

      setProductsData(normalized);
    } catch (err) {
      console.error(err);
    }
  };

  // get single product data
  useEffect(() => {
    if (productsData.length && productId) {
      const product = productsData.find((p) => p.id === productId);
      setSingleProduct(product || null);
    }
  }, [productsData, productId]);

  // Derived data
  const MainCategoriesData = useMemo(
    () => [...new Set(productsData.map((p) => p.mainCategory))],
    [productsData],
  );

  const CategoriesData = useMemo(
    () => ["All", ...new Set(productsData.map((p) => p.category))],
    [productsData],
  );

  const BrandData = useMemo(
    () => ["All", ...new Set(productsData.map((p) => p.brand))],
    [productsData],
  );

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <DataContext.Provider
      value={{
        productsData,
        MainCategoriesData,
        CategoriesData,
        BrandData,
        singleProduct,
        setProductId, // 👈 expose setter
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const getData = () => useContext(DataContext);
