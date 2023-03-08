import { Suspense, useState, useEffect } from "react";
import { useThemeColor } from "../contexts/ThemeProvider";
import ErrorBoundary from "../utils/ErrorBoundary";
import Location from "../components/Location";
import CurrentTemp from "../components/CurrentTemp";
import TitleWithSubtitle from "../components/TitleWithSubtitle";
import { useLocation } from "../contexts/LocationProvider";
import {
  useWeatherData,
  getWeatherCondition,
} from "../contexts/WeatherDataProvider";
import WeatherStat from "../components/WeatherStat";
import { parseTime, getCurrentDateTime } from "../utils/Hooks";

export default function Home() {
  const primaryColor = useThemeColor("primary");
  const { location } = useLocation();
  const { weatherData } = useWeatherData();
  const [dateTime, setDateTime] = useState(getCurrentDateTime());
  const { condition } = getWeatherCondition(
    weatherData?.current_weather?.weathercode
  );
  const clock = () => {
    setDateTime(getCurrentDateTime());
  };
  useEffect(() => {
    const interval = setInterval(clock, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <ErrorBoundary
      fallback={
        <h1
          data-aos="zoom-in"
          data-aos-duration="250"
          data-aos-easing="ease-in-out"
          className="text-center"
        >
          Error getting weather data.
        </h1>
      }
    >
      <Suspense
        fallback={
          <h1
            data-aos="zoom-in"
            data-aos-duration="250"
            data-aos-easing="ease-in-out"
            className="text-center"
          >
            Loading current weather...
          </h1>
        }
      >
        <div className="d-flex justify-content-between flex-column flex-md-row def-gap">
          <div className="minw300">
            <Location />
            <TitleWithSubtitle
              animation={{
                type: "fade-left",
                duration: "500",
                easing: "ease-in-out",
                className: "mt-6 ",
              }}
              title="Weather Now"
              subtitle={dateTime}
            />
            <CurrentTemp />
            <TitleWithSubtitle
              animation={{
                type: "fade-right",
                duration: "500",
                easing: "ease-in-out",
                className: "mt-6 ",
              }}
              title={condition}
              subtitle={`Feels like ${
                weatherData?.hourly?.apparent_temperature[
                  weatherData?.hourly?.time.indexOf(
                    weatherData?.current_weather?.time
                  )
                ]
              } ${weatherData?.daily_units?.temperature_2m_max}`}
            />
          </div>
          <div>
            <TitleWithSubtitle
              animation={{
                type: "zoom-out",
                duration: "500",
                easing: "ease-in-out",
                className: "mt-0",
              }}
              title="Weather Statistics Today"
              subtitle={`In ${location?.data?.city}, ${location?.data?.country} `}
            />
            <div className="mt-6 minw300">
              <WeatherStat
                animation={{
                  type: "fade-left",
                  duration: "500",
                  easing: "ease-in-out",
                }}
                icon={`https://img.icons8.com/fluency-systems-regular/28/${primaryColor}/sunrise.svg`}
                title="Sunrise"
                value={parseTime(weatherData?.daily?.sunrise[7])}
              />
              <WeatherStat
                animation={{
                  type: "fade-right",
                  duration: "500",
                  easing: "ease-in-out",
                }}
                icon={`https://img.icons8.com/fluency-systems-regular/28/${primaryColor}/sunset.svg`}
                title="Sunset"
                value={parseTime(weatherData?.daily?.sunset[7])}
              />
              <WeatherStat
                animation={{
                  type: "fade-left",
                  duration: "500",
                  easing: "ease-in-out",
                }}
                icon={`https://img.icons8.com/fluency-systems-regular/28/${primaryColor}/thermometer-up.svg`}
                title="Max Temperature"
                value={`${weatherData?.daily?.temperature_2m_max[7]} ${weatherData?.daily_units?.temperature_2m_max}`}
              />
              <WeatherStat
                animation={{
                  type: "fade-right",
                  duration: "500",
                  easing: "ease-in-out",
                }}
                icon={`https://img.icons8.com/fluency-systems-regular/28/${primaryColor}/thermometer-down.svg`}
                title="Min Temperature"
                value={`${weatherData?.daily?.temperature_2m_min[7]} ${weatherData?.daily_units?.temperature_2m_min}`}
              />
              <WeatherStat
                animation={{
                  type: "fade-left",
                  duration: "500",
                  easing: "ease-in-out",
                }}
                icon={`https://img.icons8.com/fluency-systems-regular/28/${primaryColor}/hail.svg`}
                title="Precipitation Sum"
                value={`${weatherData?.daily?.precipitation_sum[7]} ${weatherData?.daily_units?.precipitation_sum}`}
              />
              <WeatherStat
                animation={{
                  type: "fade-right",
                  duration: "500",
                  easing: "ease-in-out",
                }}
                icon={`https://img.icons8.com/fluency-systems-regular/28/${primaryColor}/wind-speed-43-47.svg`}
                title="Wind Speed"
                value={`${weatherData?.daily?.windspeed_10m_max[7]} ${weatherData?.daily_units?.windspeed_10m_max}`}
              />
              <WeatherStat
                animation={{
                  type: "fade-right",
                  duration: "500",
                  easing: "ease-in-out",
                }}
                icon={`https://img.icons8.com/fluency-systems-regular/28/${primaryColor}/windsock.svg`}
                title="Wind Direction"
                value={`${weatherData?.daily?.winddirection_10m_dominant[7]}${weatherData?.daily_units?.winddirection_10m_dominant}`}
              />
            </div>
          </div>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}
