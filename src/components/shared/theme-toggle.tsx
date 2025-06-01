"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "../ui/switch";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4" />
      <Switch
        id="theme-toggle-switch"
        checked={theme === "dark"}
        onCheckedChange={(checked: boolean): void =>
          setTheme(checked ? "dark" : "light")
        }
        className="cursor-pointer"
        aria-labelledby="theme-toggle-label"
      />
      <Moon className="h-4 w-4" />
    </div>
  );
}
