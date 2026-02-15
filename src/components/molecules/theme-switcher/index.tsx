"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Button from "../button";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button onClick={toggleTheme} className="fixed top-4 right-4">
      {theme === "dark" ? "🌞" : "🌙"}
    </Button>
  );
}
