import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useTheme, useThemeColor } from "../contexts/ThemeProvider";
import { useWeatherUnit } from "../contexts/WeatherUnitProvider";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { weatherUnit, setWeatherUnit } = useWeatherUnit();
  const Navigate = useNavigate();
  const primaryColor = useThemeColor("primary");
  const secondaryColor = useThemeColor("secondary");

  return (
    <div className="nav d-flex align-items-center justify-content-between def-gap bottomborder">
      <div className="d-flex align-items-center def-gap">
        <img
          src={logo}
          className="cursor-pointer"
          alt="logo"
          onClick={() => {
            Navigate("/", { replace: true });
          }}
        />
        <ul className="d-none d-md-flex align-items-center def-gap list-unstyled">
          <NavLink className="menulink" to="/" replace>
            <li>Today</li>
          </NavLink>
          <NavLink className="menulink" to="/hourly" replace>
            <li>Hourly</li>
          </NavLink>
          <NavLink className="menulink" to="/thisweek" replace>
            <li>This Week</li>
          </NavLink>
          <NavLink className="menulink" to="/pastweek" replace>
            <li>Past Week</li>
          </NavLink>
        </ul>
        <ul className="mobilenav d-flex d-md-none align-items-center justify-content-between list-unstyled">
          <NavLink className="mobilemenu" to="/" replace>
            {({ isActive }) => (
              <li>
                <div className="d-flex align-items-center gap-2 text-nowrap ps-2">
                  <img
                    src={`https://img.icons8.com/fluency-systems-regular/28/${
                      isActive ? primaryColor : secondaryColor
                    }/today.svg`}
                    alt="Light Mode"
                  />
                  <p className="m-0">Today</p>
                </div>
              </li>
            )}
          </NavLink>
          <NavLink className="mobilemenu" to="/hourly" replace>
            {({ isActive }) => (
              <li>
                <div className="d-flex align-items-center gap-2 text-nowrap ps-2">
                  <img
                    src={`https://img.icons8.com/fluency-systems-regular/28/${
                      isActive ? primaryColor : secondaryColor
                    }/coming-soon.svg`}
                    alt="Light Mode"
                  />
                  <p className="m-0">Hourly</p>
                </div>
              </li>
            )}
          </NavLink>
          <NavLink className="mobilemenu" to="/thisweek" replace>
            {({ isActive }) => (
              <li>
                <div className="d-flex align-items-center gap-2 text-nowrap ps-2">
                  <img
                    src={`https://img.icons8.com/fluency-systems-regular/28/${
                      isActive ? primaryColor : secondaryColor
                    }/crossed-out-date.svg`}
                    alt="Light Mode"
                  />
                  <p className="m-0">This Week</p>
                </div>
              </li>
            )}
          </NavLink>
          <NavLink className="mobilemenu" to="/pastweek" replace>
            {({ isActive }) => (
              <li>
                <div className="d-flex align-items-center gap-2 text-nowrap ps-2">
                  <img
                    src={`https://img.icons8.com/fluency-systems-regular/28/${
                      isActive ? primaryColor : secondaryColor
                    }/overtime.svg`}
                    alt="Light Mode"
                  />
                  <p className="m-0">Past Week</p>
                </div>
              </li>
            )}
          </NavLink>
        </ul>
      </div>
      <div className="d-flex align-items-center def-gap">
        <button
          className="nav-button"
          onClick={() => {
            setTheme((prevTheme) => {
              return prevTheme == "dark" ? "light" : "dark";
            });
          }}
        >
          <img
            src={`https://img.icons8.com/fluency-systems-regular/28/${primaryColor}/${
              theme == "dark" ? "sun" : "bright-moon"
            }.svg`}
            alt="Theme"
          />
        </button>
        <button
          onClick={() => {
            setWeatherUnit((prevUnit) => {
              return prevUnit == "celcius" ? "fahrenheit" : "celcius";
            });
          }}
          className="nav-button"
        >
          {weatherUnit == "celcius" ? "°C" : "°F"}
        </button>
      </div>
    </div>
  );
}
