import {
  useWeatherData,
  getWeatherCondition,
} from "../contexts/WeatherDataProvider";
import { useDataValidation } from "../utils/Hooks";

export default function CurrentTemp() {
  const { weatherData } = useWeatherData();
  const { condition, icon } = getWeatherCondition(
    weatherData?.current_weather?.weathercode
  );
  useDataValidation(weatherData);
  return (
    <div
      data-aos="zoom-in"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
      className="mt-6 d-flex gap-2"
    >
      <img src={`/assets/${icon}`} alt {...condition} className="weathericon" />
      <h1 className="currenttemp">
        {weatherData?.current_weather?.temperature}
        <sup>{weatherData?.hourly_units?.temperature_2m}</sup>
      </h1>
    </div>
  );
}


