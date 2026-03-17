import React, { useState, useEffect } from "react";
import "./ColorsStyle.css";

export default function LightOrDarkTheme() {
  // Light theme -> Default
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Apply theme and save preference
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  localStorage.setItem("theme", theme);
}, [theme]);

  // Toggle between light and dark
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="LightOrDarkTheme">
      <h1>React Theme Switcher</h1>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Theme
      </button>
    </div>
  );
}