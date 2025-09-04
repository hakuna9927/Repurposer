import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="rounded-full p-2 bg-background/70 hover:bg-background/90 border border-border shadow transition-colors"
      style={{ position: "fixed", top: 20, right: 20, zIndex: 100 }}
    >
      {theme === "dark" ? (
        <Sun className="h-6 w-6 text-yellow-400 animate-spin" />
      ) : (
        <Moon className="h-6 w-6 text-blue-900 animate-pulse" />
      )}
    </button>
  );
};

export default ThemeToggle;
