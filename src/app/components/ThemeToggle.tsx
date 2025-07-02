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
      className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm text-lg transition-all hover:bg-gray-50 dark:hover:bg-gray-700"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle light/dark mode"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
} 