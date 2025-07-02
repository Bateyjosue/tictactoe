"use client";
import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light" | "dark") || "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      className="fixed top-4 right-4 z-50 p-2 rounded-full border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md text-2xl transition-all"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle light/dark mode"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
} 