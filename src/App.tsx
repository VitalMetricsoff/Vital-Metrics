import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { MainLayout } from "./components/layout/main-layout";
import HomePage from "./pages/HomePage";
import CalculatorsPage from "./pages/CalculatorsPage";
import CalculatorPage from "./pages/CalculatorPage";
import AboutPage from "./pages/AboutPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ContactUsPage from "./pages/ContactUsPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import NotFoundPage from "./pages/NotFoundPage";
import FounderPage from "./pages/FounderPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import SymptomCheckerPage from "./pages/SymptomCheckerPage";
import ResourcesPage from "./pages/ResourcesPage";
import ResourceDetailPage from "./pages/ResourceDetailPage";

import { ScrollToTop } from "@/components/scroll-to-top";
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <MainLayout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/calculators" element={<CalculatorsPage />} />
                <Route path="/calculator/:slug" element={<CalculatorPage />} />

                <Route path="/about" element={<AboutPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/contact" element={<ContactUsPage />} />
                <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                <Route path="/founder" element={<FounderPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogPostPage />} />
                <Route path="/symptom-checker" element={<SymptomCheckerPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/resources/:slug" element={<ResourceDetailPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </MainLayout>
          </BrowserRouter>
          <Analytics />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
