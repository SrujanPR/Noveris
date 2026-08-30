import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FloatingContactButtons } from './components/FloatingContactButtons';
import { AboutPage } from './pages/AboutPage';
import { TeamPage } from './pages/TeamPage';
import { CertificationsPage } from './pages/CertificationsPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ContactPage } from './pages/ContactPage';

import { scrollToContact } from './utils/scrollToContact';

// Component to handle route change scroll reset & smooth scroll to #contact
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash === '#contact') {
      const timer = setTimeout(() => {
        scrollToContact();
      }, 250);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0, { immediate: true });
      }
    }
  }, [pathname, hash]);

  return null;
}

export function App() {
  // Initialize Lenis smooth scroll engine
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Make lenis instance globally accessible for scroll listeners
    (window as any).lenis = lenis;

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F2EFE7] text-[#1B2A4D] selection:bg-[#C9973F] selection:text-[#F2EFE7] relative">
      {/* Scroll Reset & #contact Scroll Listener Component */}
      <ScrollToTop />

      {/* Navigation Header */}
      <Header />

      {/* Floating WhatsApp & Phone Contact Buttons (Bottom-Right) */}
      <FloatingContactButtons />

      {/* Page Routing */}
      <Routes>
        {/* Homepage Route */}
        <Route
          path="/"
          element={
            <main className="relative">
              {/* HeroSection renders WhiteContentSection internally, inside its
                  fixed/scroll-jacked overlay — it must NOT be rendered again
                  here, or the whole homepage content shows up twice. */}
              <HeroSection />
            </main>
          }
        />

        {/* Dedicated About Us Page Route */}
        <Route path="/about" element={<AboutPage />} />

        {/* Dedicated Team Page Route */}
        <Route path="/team" element={<TeamPage />} />

        {/* Legacy /associations link redirects to /team */}
        <Route path="/associations" element={<TeamPage />} />

        {/* Dedicated Products Main Page Route */}
        <Route path="/products" element={<ProductsPage />} />

        {/* Individual Product Detail Route */}
        <Route path="/products/:productId" element={<ProductDetailPage />} />

        {/* Dedicated Contact Page Route */}
        <Route path="/contact" element={<ContactPage />} />

        {/* Dedicated Certifications Page Route */}
        <Route path="/certifications" element={<CertificationsPage />} />
      </Routes>
    </div>
  );
}

export default App;
