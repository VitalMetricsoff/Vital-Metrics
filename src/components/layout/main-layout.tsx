
import { ThemeToggle } from "@/components/theme-toggle";
import { Footer } from "./footer";
import { Header } from "./header";
import { ScrollToTop } from "./scroll-to-top";
import { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type MainLayoutProps = {
  children: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
