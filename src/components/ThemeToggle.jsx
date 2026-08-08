
"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !dark;

    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    setDark(newDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="
        px-3 py-2
        rounded-xl
        border
        border-gray-200
        bg-gray-100
        text-gray-800
        hover:bg-gray-200
        dark:border-gray-700
        dark:bg-gray-800
        dark:text-yellow-300
        dark:hover:bg-gray-700
        transition-all duration-300
        font-medium
        text-sm
      "
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}

