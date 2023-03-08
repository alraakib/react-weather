import { createContext, useContext, useEffect, useState } from "react";
const LocationContext = createContext();

export function useLocation() {
  return useContext(LocationContext);
}

export default function LocationProvider({ children }) {
  const [location, setLocation] = useState({
    preciseLocation: false,
    data: undefined,
  });

  useEffect(() => {
    fetch("https://api.techniknews.net/ipgeo/")
      .then((response) => response.json())
      .then((data) => {
        const { lat, lon, country, regionName, city } = data;
        setLocation({
          preciseLocation: false,
          data: {
            lat: lat,
            lon: lon,
            country: country,
            regionName: regionName,
            city: city,
          },
        });
      })
      .catch((error) => {
        throw new error(error);
      });
  }, []);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}
