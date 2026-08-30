import React, { useEffect } from 'react';
import { Header } from '../components/Header';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';

export const ContactPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F2EFE7] text-[#1B2A4D] font-sans selection:bg-[#C9973F] selection:text-[#F2EFE7] pt-28 sm:pt-36">
      <Header />
      <ContactSection isStandalonePage={true} />
      <Footer />
    </div>
  );
};
