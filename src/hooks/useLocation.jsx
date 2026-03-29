import { useState, useEffect } from "react";
import axios from "axios";

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);

  const getLocation = async () => {
    setLocationError("");
    setLocationLoading(true);

    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported by your browser.");
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
          const response = await axios.get(url);
          setLocation(response.data);
          localStorage.setItem("userLocation", JSON.stringify(response.data));
        } catch (err) {
          setLocationError("Could not fetch address. Try again.");
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
        setLocationLoading(false);
        if (error.code === 1) {
          setLocationError(
            "Permission denied. Allow location in browser settings.",
          );
        } else if (error.code === 2) {
          setLocationError("Location unavailable. Try again.");
        } else if (error.code === 3) {
          setLocationError("Request timed out. Try again.");
        } else {
          setLocationError("Could not get location.");
        }
      },
      { timeout: 10000, enableHighAccuracy: false },
    );
  };

  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setLocation(JSON.parse(savedLocation));
    }
  }, []);

  return { location, getLocation, setLocation, locationError, locationLoading };
};

export default useLocation;
