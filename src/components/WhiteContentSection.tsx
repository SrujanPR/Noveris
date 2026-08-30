import React from 'react';
import { AboutHomeSection } from './AboutHomeSection';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';

export const WhiteContentSection: React.FC = () => {
  return (
    <div className="white-content-inner w-full bg-[#F2EFE7] text-[#1B2A4D] flex flex-col justify-between shadow-[0_-30px_60px_rgba(0,0,0,0.8)]">
      {/* About Us Preview Section on Homepage */}
      <AboutHomeSection />

      {/* Contact Us Section with Interactive Form */}
      <ContactSection />

      {/* Footer with Logo 3 at complete end */}
      <Footer />
    </div>
  );
};
