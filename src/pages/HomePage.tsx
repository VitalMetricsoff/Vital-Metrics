import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Activity, HeartPulse, Scale, Apple, Brain, Calculator, ChevronRight, GraduationCap, Stethoscope, Users, Clock, ArrowUpRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { calculators } from "@/data/calculators";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Helmet } from 'react-helmet-async';
import type { Category } from '@/types/calculator';

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "Understanding BMI: Beyond the Numbers",
    excerpt: "Discover why BMI is just one piece of the health puzzle and how to interpret your results effectively.",
    category: "Health Insights",
    readTime: "5 min read",
    imageUrl: import.meta.env.BASE_URL + 'blog/bmi-understanding.jpg'
  },
  {
    id: 2,
    title: "The Science of Heart Rate Zones",
    excerpt: "Learn how to optimize your workouts by understanding and utilizing different heart rate zones.",
    category: "Fitness",
    readTime: "7 min read",
    imageUrl: import.meta.env.BASE_URL + 'blog/heart-rate-zones.jpg'
  },
  {
    id: 3,
    title: "Nutrition Myths Debunked",
    excerpt: "Expert analysis of common nutrition myths and the science behind healthy eating habits.",
    category: "Nutrition",
    readTime: "6 min read",
    imageUrl: import.meta.env.BASE_URL + 'blog/nutrition-myths.jpg'
  }
];

export default function HomePage() {
  const isMobile = useIsMobile();
  const [imageError, setImageError] = useState(false);
  
  // Get most popular calculators (first 8)
  const popularCalculators = calculators.slice(0, 8);

  const getCategoryIcon = (category: Category) => {
    switch (category) {
      case "body-metrics": return <Scale className="h-5 w-5" />;
      case "fitness-metabolism": return <Activity className="h-5 w-5" />;
      case "cardio-vitals": return <HeartPulse className="h-5 w-5" />;
      case "nutrition-metabolic": return <Apple className="h-5 w-5" />;
      case "mental-sleep": return <Brain className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: Category): string => {
    switch (category) {
      case "body-metrics": return "bg-blue-100 text-blue-600";
      case "fitness-metabolism": return "bg-green-100 text-green-600";
      case "cardio-vitals": return "bg-red-100 text-red-600";
      case "nutrition-metabolic": return "bg-orange-100 text-orange-600";
      case "mental-sleep": return "bg-purple-100 text-purple-600";
      case "diabetes-blood-sugar": return "bg-yellow-100 text-yellow-600";
      case "pregnancy-fertility": return "bg-pink-100 text-pink-600";
      case "lungs-life-expectancy": return "bg-indigo-100 text-indigo-600";
      case "other-tools": return "bg-gray-100 text-gray-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <>
      <Helmet>
        <title>VitalMetrics | Professional Medical Calculator Suite</title>
        <meta name="description" content="Evidence-based medical calculators for healthcare professionals. Quick, accurate clinical calculations for patient care, research, and medical education." />
      </Helmet>
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-20 lg:py-24 hero-gradient text-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm">
                <span className="animate-pulse-slow mr-2">●</span> Trusted by 10,000+ Healthcare Professionals
              </div>
              <h1 className="font-heading font-bold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                Your Complete Health <br className="hidden md:inline" /> Calculator Suite
              </h1>
              <p className="text-lg text-white/80 max-w-[600px]">
                From BMI and body fat percentage to heart rate zones and nutrition planning — all the health calculators you need in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/calculators">
                  <Button size={isMobile ? "default" : "lg"} className="w-full sm:w-auto bg-white text-primary hover:bg-white/90">
                    Browse All Calculators
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/calculator/bmi-calculator">
                  <Button size={isMobile ? "default" : "lg"} variant="outline" className="w-full sm:w-auto border-white/30 bg-white/10 text-white hover:bg-white/20">
                    Try BMI Calculator
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="relative">
                <div className="absolute -top-6 -left-6">
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                    <HeartPulse className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-white/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-white/60 text-sm">Body Mass Index</p>
                      <p className="text-2xl font-bold">23.4</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-white/60 text-sm">Heart Rate</p>
                      <p className="text-2xl font-bold">72 bpm</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-white/60 text-sm">Body Fat</p>
                      <p className="text-2xl font-bold">18%</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-white/60 text-sm">Daily Calories</p>
                      <p className="text-2xl font-bold">2,345</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6">
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                    <Activity className="h-12 w-12 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">50+</p>
              <p className="text-sm md:text-base text-muted-foreground">Health Calculators</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">7</p>
              <p className="text-sm md:text-base text-muted-foreground">Health Categories</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">100%</p>
              <p className="text-sm md:text-base text-muted-foreground">Free Access</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">24/7</p>
              <p className="text-sm md:text-base text-muted-foreground">Available Online</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Calculators */}
      <section className="py-14 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-10">
            <Badge className="px-3.5 py-1.5" variant="outline">Most Used Tools</Badge>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
              Popular Health Calculators
            </h2>
            <p className="text-muted-foreground text-lg max-w-[700px]">
              Our most frequently used calculators to help you monitor, analyze, and improve your health.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularCalculators.map((calculator) => (
              <Link 
                key={calculator.id} 
                to={`/calculator/${calculator.slug}`}
                className="group"
              >
                <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/30 overflow-hidden group-hover:translate-y-[-3px]">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryColor(calculator.category)}`}>
                        {getCategoryIcon(calculator.category)}
                      </div>
                    </div>
                    <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">{calculator.name}</h3>
                    <p className="text-sm text-muted-foreground">{calculator.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/calculators">
              <Button className="gap-2">
                View All Calculators <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
        <div className="container px-4 md:px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Image Column */}
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-white dark:bg-slate-900 p-1 shadow-lg">
                  {!imageError ? (
                    <div className="relative w-full h-full">
                      <img
                        src={import.meta.env.BASE_URL + 'founder.jpg'}
                        alt="Dr. Aravind Kumar"
                        className="w-full h-full object-cover rounded-2xl"
                        onError={(e) => {
                          console.error('Image failed to load:', e);
                          setImageError(true);
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-900 dark:text-white">
                      Image loading error. Path: {import.meta.env.BASE_URL + 'founder.jpg'}
                    </div>
                  )}
                </div>
              </div>

              {/* Content Column */}
              <div className="space-y-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white backdrop-blur-sm">
                  <Users className="h-4 w-4 mr-2" />
                  Built by a Doctor, for Healthcare Professionals
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Meet Dr. Aravind Kumar
                </h2>
                
                <div className="space-y-4">
                  <p className="text-lg text-slate-700 dark:text-slate-300">
                    From the challenging days of medical school to pioneering VitalMetrics, 
                    Dr. Aravind's journey reflects a deep commitment to improving healthcare 
                    through technology.
                  </p>
                  <p className="text-lg text-slate-700 dark:text-slate-300">
                    His vision has transformed into a comprehensive platform that serves 
                    healthcare professionals worldwide with precise, reliable medical calculations.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/founder">
                    <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-white/90">
                      Read Full Story
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/calculators">
                    <Button size="lg" variant="outline" className="border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10">
                      Explore Tools
                      <Calculator className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200 dark:border-white/10">
                  <div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">50+</p>
                    <p className="text-slate-600 dark:text-slate-400">Medical Calculators</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">7+</p>
                    <p className="text-slate-600 dark:text-slate-400">Health Categories</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">24/7</p>
                    <p className="text-slate-600 dark:text-slate-400">Online Access</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-14 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="px-3.5 py-1.5" variant="outline">Why Choose Us</Badge>
              <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
                Accurate, Easy-to-Use Health Tools
              </h2>
              <p className="text-muted-foreground text-lg">
                Vital Metrics provides reliable health calculators based on medical formulas and industry standards to help you make informed decisions.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400 rounded-full p-1 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-base dark:text-white">Evidence-Based Calculations</h3>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">All our health calculators are based on scientific formulas used by healthcare professionals.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400 rounded-full p-1 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-base dark:text-white">User-Friendly Interface</h3>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">Simple, intuitive design makes it easy to get accurate results quickly.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400 rounded-full p-1 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-base dark:text-white">Comprehensive Coverage</h3>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">From basic body metrics to complex medical calculations, we've got you covered.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="feature-card feature-blue-card bg-blue-50 p-6 rounded-xl shadow-sm dark:shadow-blue-900/10">
                  <Calculator className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <h3 className="font-medium text-lg mb-2">Body Metrics</h3>
                  <p className="text-sm text-muted-foreground">Calculate and track key body measurements and ratios.</p>
                </div>
                <div className="feature-card feature-orange-card bg-orange-50 p-6 rounded-xl shadow-sm dark:shadow-orange-900/10">
                  <Apple className="h-8 w-8 text-orange-600 dark:text-orange-400 mb-4" />
                  <h3 className="font-medium text-lg mb-2">Nutrition Tools</h3>
                  <p className="text-sm text-muted-foreground">Plan your diet and track nutritional needs.</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="feature-card feature-green-card bg-green-50 p-6 rounded-xl shadow-sm dark:shadow-green-900/10">
                  <Activity className="h-8 w-8 text-green-600 dark:text-green-400 mb-4" />
                  <h3 className="font-medium text-lg mb-2">Fitness Calculators</h3>
                  <p className="text-sm text-muted-foreground">Optimize your workouts and monitor progress.</p>
                </div>
                <div className="feature-card feature-purple-card bg-purple-50 p-6 rounded-xl shadow-sm dark:shadow-purple-900/10">
                  <HeartPulse className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-4" />
                  <h3 className="font-medium text-lg mb-2">Heart Health</h3>
                  <p className="text-sm text-muted-foreground">Monitor vital cardiovascular metrics.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 md:py-20 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm">
              <span className="animate-pulse-slow mr-2">●</span> Start Your Health Journey
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Track, Monitor, and Improve Your Wellness
            </h2>
            <p className="text-lg text-white/80 max-w-[700px]">
              Access all 50+ health calculators to gain valuable insights into your health metrics and make informed decisions.
            </p>
            <Link to="/calculators">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Explore All Calculators
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Why Healthcare Professionals Choose VitalMetrics</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Our comprehensive suite of medical calculators is designed to streamline your clinical workflow and enhance patient care.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border bg-card">
              <div className="mb-4 text-primary"><Activity className="h-8 w-8" /></div>
              <h3 className="text-xl font-semibold mb-2">Evidence-Based Calculations</h3>
              <p className="text-muted-foreground">All our calculators are based on the latest medical research and guidelines, ensuring accurate and reliable results for clinical decision-making.</p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <div className="mb-4 text-primary"><Clock className="h-8 w-8" /></div>
              <h3 className="text-xl font-semibold mb-2">Time-Saving Efficiency</h3>
              <p className="text-muted-foreground">Quick access to 50+ specialized calculators helps you make faster, more informed decisions during patient consultations.</p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <div className="mb-4 text-primary"><Users className="h-8 w-8" /></div>
              <h3 className="text-xl font-semibold mb-2">Patient Education</h3>
              <p className="text-muted-foreground">Clear visualizations and explanations help you communicate health metrics and treatment plans effectively to patients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Comprehensive Health Metrics Coverage</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Access specialized calculators across all major medical fields to support your clinical practice.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="p-6 rounded-lg border bg-card hover:shadow-md transition-all">
              <Scale className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Body Metrics</h3>
              <p className="text-muted-foreground mb-4">BMI, BSA, Ideal Weight calculations for accurate patient assessment.</p>
              <Badge className="bg-blue-100 text-blue-600">12 Calculators</Badge>
            </div>
            <div className="p-6 rounded-lg border bg-card hover:shadow-md transition-all">
              <HeartPulse className="h-8 w-8 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Cardiovascular</h3>
              <p className="text-muted-foreground mb-4">Heart rate, blood pressure, and cardiac function assessments.</p>
              <Badge className="bg-red-100 text-red-600">15 Calculators</Badge>
            </div>
            <div className="p-6 rounded-lg border bg-card hover:shadow-md transition-all">
              <Apple className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nutrition & Metabolism</h3>
              <p className="text-muted-foreground mb-4">Caloric needs, metabolic rate, and nutritional assessments.</p>
              <Badge className="bg-green-100 text-green-600">10 Calculators</Badge>
            </div>
            <div className="p-6 rounded-lg border bg-card hover:shadow-md transition-all">
              <Brain className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mental Health</h3>
              <p className="text-muted-foreground mb-4">Stress levels, sleep quality, and cognitive assessments.</p>
              <Badge className="bg-purple-100 text-purple-600">8 Calculators</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <Badge className="px-3.5 py-1.5" variant="outline">Testimonials</Badge>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mt-4 mb-4">Trusted by Medical Professionals</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Here's what healthcare providers say about VitalMetrics</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border bg-card">
              <p className="text-muted-foreground mb-4">"VitalMetrics has become an indispensable tool in my daily practice. The cardiovascular calculators are particularly helpful for patient risk assessments."</p>
              <div className="flex items-center">
                <div>
                  <p className="font-semibold">Dr. Sarah Chen</p>
                  <p className="text-sm text-muted-foreground">Cardiologist</p>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <p className="text-muted-foreground mb-4">"The nutrition calculators have greatly improved my ability to provide precise dietary recommendations to my patients. Excellent resource!"</p>
              <div className="flex items-center">
                <div>
                  <p className="font-semibold">Dr. Michael Rodriguez</p>
                  <p className="text-sm text-muted-foreground">Nutritionist</p>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <p className="text-muted-foreground mb-4">"As a primary care physician, I appreciate having access to such a wide range of evidence-based calculators. It saves time and improves accuracy."</p>
              <div className="flex items-center">
                <div>
                  <p className="font-semibold">Dr. Emily Thompson</p>
                  <p className="text-sm text-muted-foreground">Family Medicine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-14 md:py-20 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-10">
            <Badge className="px-3.5 py-1.5" variant="outline">Latest Insights</Badge>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
              Medical Blog & Resources
            </h2>
            <p className="text-muted-foreground text-lg max-w-[700px]">
              Stay informed with the latest health insights, research updates, and medical knowledge.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="group">
                <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-200 group-hover:border-primary/30">
                  <div className="aspect-[16/9] overflow-hidden bg-slate-50 dark:bg-slate-900">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = import.meta.env.BASE_URL + 'placeholder.jpg';
                      }}
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="font-medium">
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <h3 className="font-medium text-xl mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-sm font-medium text-primary gap-1">
                      Read More <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/blog">
              <Button className="gap-2">
                View All Articles <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
