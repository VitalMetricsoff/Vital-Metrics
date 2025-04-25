
import { ThemeToggle } from "@/components/theme-toggle";
import { Footer } from "./footer";
import { Header } from "./header";
import { ScrollToTop } from "./scroll-to-top";
import { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { SEO } from "@/components/seo/seo";
import { useLocation } from "react-router-dom";

type MainLayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  type?: 'website' | 'article';
  hideHeader?: boolean;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    tags?: string[];
  };
};

export function MainLayout({ 
  children,
  title,
  description,
  keywords,
  ogImage,
  type,
  hideHeader,
  article
}: MainLayoutProps) {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title={title}
        description={description}
        keywords={keywords}
        ogImage={ogImage}
        canonical={location.pathname}
        type={type}
        article={article}
      />
      {!hideHeader && <Header />}
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
