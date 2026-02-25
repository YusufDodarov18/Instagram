"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export function Theme() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <span className="cursor-pointer" onClick={toggleTheme}>
      {resolvedTheme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </span>
  );
}
