"use client";
import { useState } from "react";

export default function ThemeToggle() {
  // ✅ Read DOM directly (no useEffect)
  const [dark, setDark] = useState(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });

  const toggleTheme = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setDark(!dark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="ml-3 px-3 py-1 border border-white/20 rounded-full text-sm"
    >
      {dark ? "🌙" : "☀️"}
    </button>
  );
}