import { useState, useEffect } from "react";
import axios from "axios";

const useLocation = () => {
  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      const response = await axios.get(url);

      setLocation(response.data);
      localStorage.setItem("userLocation", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setLocation(JSON.parse(savedLocation));
    }
  }, []);

  return { location, getLocation, setLocation };
};

export default useLocation;
