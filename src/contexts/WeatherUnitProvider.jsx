import { createContext, useContext, useState, useEffect } from "react";
const WeatherUnitContext = createContext();

export function useWeatherUnit() {
  return useContext(WeatherUnitContext);
}

export default function WeatherUnitProvider({ children }) {
  const [weatherUnit, setWeatherUnit] = useState(
    localStorage.getItem("weatherunit")
      ? localStorage.getItem("weatherunit")
      : "celcius"
  );
  useEffect(() => {
    localStorage.setItem("weatherunit", weatherUnit);
  }, [weatherUnit]);

  return (
    <WeatherUnitContext.Provider value={{ weatherUnit, setWeatherUnit }}>
      {children}
    </WeatherUnitContext.Provider>
  );
}
