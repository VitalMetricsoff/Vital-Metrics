
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Switch } from "@/components/ui/switch";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex items-center">
      <Switch 
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        aria-label="Toggle theme"
        className="data-[state=checked]:bg-primary"
      />
      <span className="sr-only">Toggle theme</span>
    </div>
  );
}
