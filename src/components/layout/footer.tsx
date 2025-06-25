import { Link } from "react-router-dom";
import { Activity, Linkedin, Instagram } from "lucide-react";

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
            <div className="flex gap-3 mt-3">
              <a href="https://linkedin.com/in/docaravi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/docaravi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://discord.gg/ATGdY32s4q" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors" title="Join our Discord for personal consultations">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M18.942 5.556a16.299 16.299 0 0 0-4.126-1.297c-.178.321-.385.754-.529 1.097a15.175 15.175 0 0 0-4.573 0 11.583 11.583 0 0 0-.535-1.097 16.274 16.274 0 0 0-4.129 1.3c-2.611 3.946-3.319 7.794-2.965 11.587a16.494 16.494 0 0 0 5.061 2.593 12.65 12.65 0 0 0 1.084-1.785 10.689 10.689 0 0 1-1.707-.831c.143-.106.283-.217.418-.331 3.291 1.539 6.866 1.539 10.118 0 .137.114.277.225.418.331-.541.326-1.114.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595c.415-4.396-.709-8.209-2.973-11.589zM8.678 14.813c-.988 0-1.798-.922-1.798-2.045s.793-2.047 1.798-2.047 1.815.922 1.798 2.047c.001 1.123-.793 2.045-1.798 2.045zm6.644 0c-.988 0-1.798-.922-1.798-2.045s.793-2.047 1.798-2.047 1.815.922 1.798 2.047c0 1.123-.793 2.045-1.798 2.045z" fill="currentColor"/>
                </svg>
              </a>
            </div>
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
              <li>
                <a href="https://linkedin.com/in/YOUR_LINKEDIN" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </li>
              <li>
                <a href="https://instagram.com/YOUR_INSTAGRAM" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2">
                  <Instagram className="h-4 w-4" /> Instagram
                </a>
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
