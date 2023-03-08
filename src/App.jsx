import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Hourly from "./pages/Hourly";
import ThisWeek from "./pages/ThisWeek";
import PastWeek from "./pages/PastWeek";
import ThemeProvider from "./contexts/ThemeProvider";
import LocationProvider from "./contexts/LocationProvider";
import WeatherDataProvider from "./contexts/WeatherDataProvider";
import WeatherUnitProvider from "./contexts/WeatherUnitProvider";

function App() {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);
  return (
    <ThemeProvider>
      <LocationProvider>
        <WeatherUnitProvider>
          <WeatherDataProvider>
            <BrowserRouter>
              <Navbar></Navbar>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hourly" element={<Hourly />} />
                <Route path="/thisweek" element={<ThisWeek />} />
                <Route path="/pastweek" element={<PastWeek />} />
              </Routes>
            </BrowserRouter>
          </WeatherDataProvider>
        </WeatherUnitProvider>
      </LocationProvider>
    </ThemeProvider>
  );
}

export default App;
