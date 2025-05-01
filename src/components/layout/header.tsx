
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Search, Menu, X, Activity, Stethoscope } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <Activity
              className="h-5 w-5 text-primary"
              strokeWidth={2.5}
            />
            <span className="font-bold text-lg">Vital Metrics</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="block md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            to="/calculators"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Calculators
          </Link>
          <Link
            to="/symptom-checker"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
          >
            <Stethoscope className="h-4 w-4" />
            Symptom Checker
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/calculators">
              <Button variant="ghost" size="icon">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile navigation */}
        <div
          className={cn(
            "fixed inset-x-0 top-14 z-50 mt-px bg-background border-b border-border md:hidden",
            {
              "hidden": !isMenuOpen,
            }
          )}
        >
          <div className="container py-4">
            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/calculators"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Calculators
              </Link>
              <Link
                to="/symptom-checker"
                className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <Stethoscope className="h-4 w-4" />
                Symptom Checker
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="flex items-center justify-between pt-4 border-t">
                <Link to="/calculators" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="flex items-center gap-2 text-xs">
                    <Search className="h-3 w-3" />
                    <span>Search Calculators</span>
                  </Button>
                </Link>
                <ThemeToggle />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
