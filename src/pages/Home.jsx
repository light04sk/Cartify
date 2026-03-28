import Carousel from "../components/home/Carousel";
import Categories from "../components/home/Categories";
import Banner from "../components/home/Banner";
import Services from "../components/home/Services";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Carousel />
      <Categories />
      <Banner />
      <Services />
    </>
  );
};

export default Home;
