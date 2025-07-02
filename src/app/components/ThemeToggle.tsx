"use client";
import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" || "light";
    setTheme(savedTheme);
    
    // Apply theme immediately
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    
    // Explicitly add/remove the dark class
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    localStorage.setItem("theme", newTheme);
    
    // Force a re-render
    window.dispatchEvent(new Event('resize'));
  };

  if (!isClient) {
    return (
      <button
        className="p-2 rounded-lg border border-gray-300 bg-white shadow-sm text-lg transition-all hover:bg-gray-50"
        aria-label="Loading theme toggle"
      >
        ⚙️
      </button>
    );
  }

  return (
    <button
      className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm text-lg transition-all hover:bg-gray-50 dark:hover:bg-gray-700"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
} 