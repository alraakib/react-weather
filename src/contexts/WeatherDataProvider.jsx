import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "./LocationProvider";
import { useWeatherUnit } from "./WeatherUnitProvider";
const WeatherDataContext = createContext();

export function useWeatherData() {
  return useContext(WeatherDataContext);
}

export function getWeatherCondition(code) {
  const weatherCode = {
    0: "Clear",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing Rime Fog",
    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Dense Drizzle",
    56: "Light Freezing Drizzle",
    57: "Dense Freezing Drizzle",
    61: "Slight Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    66: "Light Freezing Rain",
    67: "heavy Freezing Rain",
    71: "Slight Snow Fall",
    73: "moderate Snow Fall",
    75: "heavy Snow Fall",
    77: "Snow Grains",
    80: "Slight Rain Showers",
    81: "Moderate Rain Showers",
    82: "Violent Rain Showers",
    85: "slight Snow Showers",
    86: "heavy Snow Showers",
    95: "Thunderstorm",
    96: "Thunderstorm with Slight Hail",
    99: "Thunderstorm with Heavy Hail",
  };
  const weatherIcon = {
    0: "0.png",
    1: "1.png",
    2: "2.png",
    3: "3.png",
    45: "45.png",
    48: "48.png",
    51: "51.png",
    53: "53.png",
    55: "55.png",
    56: "51.png",
    57: "55.png",
    61: "61.png",
    63: "63.png",
    65: "65.png",
    66: "66.png",
    67: "67.png",
    71: "71.png",
    73: "73.png",
    75: "75.png",
    77: "67.png",
    80: "61.png",
    81: "63.png",
    82: "65.png",
    85: "66.png",
    86: "67.png",
    95: "95.png",
    96: "96.png",
    99: "99.png",
  };
  const condition = weatherCode[code];
  const image = weatherIcon[code];
  return { condition: condition, icon: image };
}

export default function WeatherDataProvider({ children }) {
  const [weatherData, setWeatherData] = useState();
  const { weatherUnit } = useWeatherUnit();
  const { location } = useLocation();
  useEffect(() => {
    if (location.data) {
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${
          location?.data?.lat
        }&longitude=${
          location?.data?.lon
        }&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant&current_weather=true&timezone=auto&past_days=7${
          weatherUnit == "fahrenheit" ? "&temperature_unit=fahrenheit" : ""
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
        })
        .catch((error) => {
          throw new error(error);
        });
    }
  }, [location, weatherUnit]);

  return (
    <WeatherDataContext.Provider value={{ weatherData, setWeatherData }}>
      {children}
    </WeatherDataContext.Provider>
  );
}
