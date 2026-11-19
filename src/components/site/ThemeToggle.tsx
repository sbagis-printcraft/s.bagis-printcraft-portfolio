import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { applyTheme, readTheme, type Theme } from "@/lib/theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <Button
      variant="ghost"
      size="iconLg"
      onClick={() => {
        applyTheme(next);
        setTheme(next);
      }}
      aria-label={theme ? `Switch to ${next} mode` : "Toggle colour theme"}
      aria-pressed={theme === "dark"}
      title={theme ? `Switch to ${next} mode` : "Toggle colour theme"}
    >
      {theme === "dark" ? (
        <Sun key="sun" aria-hidden className="animate-in fade-in spin-in-90 duration-300" />
      ) : (
        <Moon key="moon" aria-hidden className="animate-in fade-in spin-in-90 duration-300" />
      )}
    </Button>
  );
}
