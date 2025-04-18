
import { Link } from "react-router-dom";
import { Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background py-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col gap-2">
            <Link to="/" className="flex items-center space-x-2">
              <Activity
                className="h-5 w-5 text-primary"
                strokeWidth={2.5}
              />
              <span className="font-bold text-lg">Vital Metrics</span>
            </Link>
            <p className="text-xs text-muted-foreground mt-2">
              Comprehensive health and wellness calculators to help you monitor,
              analyze, and improve your health.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-2">Categories</h3>
            <ul className="space-y-1.5">
              <li>
                <Link to="/calculators?category=body-metrics" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Body Metrics
                </Link>
              </li>
              <li>
                <Link to="/calculators?category=fitness-metabolism" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Fitness & Metabolism
                </Link>
              </li>
              <li>
                <Link to="/calculators?category=cardio-vitals" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Cardio & Vitals
                </Link>
              </li>
              <li>
                <Link to="/calculators?category=nutrition-metabolic" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Nutrition & Metabolic
                </Link>
              </li>
              <li>
                <Link to="/calculators?category=diabetes-blood-sugar" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Diabetes & Blood Sugar
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-2">More Categories</h3>
            <ul className="space-y-1.5">
              <li>
                <Link to="/calculators?category=pregnancy-fertility" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Pregnancy & Fertility
                </Link>
              </li>
              <li>
                <Link to="/calculators?category=lungs-life-expectancy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Lungs & Life Expectancy
                </Link>
              </li>
              <li>
                <Link to="/calculators?category=mental-sleep" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Mental & Sleep
                </Link>
              </li>
              <li>
                <Link to="/calculators?category=other-tools" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Other Essential Tools
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-2">Links</h3>
            <ul className="space-y-1.5">
              <li>
                <Link to="/about" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Vital Metrics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
