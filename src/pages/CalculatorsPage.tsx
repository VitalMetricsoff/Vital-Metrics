import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CalculatorGrid } from "@/components/calculator/calculator-grid";
import { CalculatorSearch } from "@/components/calculator/calculator-search";
import { CalculatorFilter } from "@/components/calculator/calculator-filter";
import { Category } from "@/types/calculator";
import { useIsMobile } from "@/hooks/use-mobile";
import { Helmet } from 'react-helmet-async';

export default function CalculatorsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    
    if (categoryParam) {
      setSelectedCategory(categoryParam as Category);
    }
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedCategory) {
      params.set("category", selectedCategory);
    }
    
    const newUrl = `${location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    navigate(newUrl, { replace: true });
  }, [selectedCategory, navigate, location.pathname]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category: Category | undefined) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Helmet>
        <title>Medical Calculators | VitalMetrics</title>
        <meta name="description" content="Browse our comprehensive collection of medical calculators and health tools. Find calculators for BMI, heart rate, nutrition, fitness, and more." />
      </Helmet>
      <div className="bg-background font-sans">
        <div className="container py-6 md:py-10 px-4 sm:px-6 md:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-3 gradient-heading">Health Calculators</h1>
            <p className="text-muted-foreground mx-auto max-w-[700px] text-sm md:text-base">
              Discover our collection of professional health and wellness calculators to help you monitor and improve your well-being.
            </p>
          </div>

          <div className="mb-6">
            <CalculatorSearch onSearch={handleSearch} />
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-4 md:p-6">
              <div className="mb-5">
                <h2 className="text-xl md:text-2xl font-heading font-semibold mb-3">
                  All Calculators
                </h2>
                <CalculatorFilter 
                  selectedCategory={selectedCategory} 
                  onCategoryChange={handleCategoryChange} 
                />
              </div>
              <CalculatorGrid 
                filter={selectedCategory} 
                search={searchTerm} 
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
