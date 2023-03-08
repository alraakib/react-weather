import { createContext, useContext, useState, useEffect } from "react";
const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeColor(mode) {
  const { theme } = useTheme();
  switch (mode) {
    case "primary":
      return theme == "dark" ? "ffffff" : "404040";
    case "secondary":
      return theme == "dark" ? "404040" : "808080";
    default:
      return theme == "dark" ? "ffffff" : "404040";
  }
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"
  );

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
