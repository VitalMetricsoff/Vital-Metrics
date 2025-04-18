
import { ChangeEvent, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CalculatorSearchProps {
  onSearch: (term: string) => void;
}

export function CalculatorSearch({ onSearch }: CalculatorSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className="relative max-w-md mx-auto">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <Input
        type="search"
        placeholder="Search for calculators..."
        className="pl-10 pr-10 h-10 text-sm shadow-sm"
        value={searchTerm}
        onChange={handleSearch}
      />
      {searchTerm && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute inset-y-0 right-0 flex items-center pr-3 h-full"
          onClick={clearSearch}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
