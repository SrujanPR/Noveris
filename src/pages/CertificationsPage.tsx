import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';
import { Reveal } from '../components/Reveal';

const certBadges = [
  {
    id: 'gmp',
    name: 'WHO-GMP',
    title: 'Good Manufacturing Practice',
    image: '/GMP.png',
    issuer: 'CDSCO / WHO Compliance',
  },
  {
    id: 'iso',
    name: 'ISO Certification',
    title: 'ISO 9001 & ISO 13485',
    image: '/ISO.jpg',
    issuer: 'International Quality Systems',
  },
  {
    id: 'fssai',
    name: 'FSSAI',
    title: 'Food Safety & Standards',
    image: '/FSSAI.png',
    issuer: 'Government of India',
  },
  {
    id: 'msme',
    name: 'MSME',
    title: 'Registered Enterprise',
    image: '/MSME.webp',
    issuer: 'Ministry of MSME',
  },
  {
    id: 'startupindia',
    name: 'Startup India',
    title: 'DPIIT Recognized',
    image: '/Startupindia.png',
    issuer: 'Government of India Initiative',
  },
  {
    id: 'iaf',
    name: 'IAF Member',
    title: 'Accreditation Forum',
    image: '/IAF.jpg',
    issuer: 'International Accreditation Forum',
  },
  {
    id: 'euas',
    name: 'EUAS Accreditation',
    title: 'European Standards',
    image: '/EUAS.png',
    issuer: 'European Accreditation Service',
  },
  {
    id: 'uaf',
    name: 'UAF Accreditation',
    title: 'Global Compliance',
    image: '/UAF.png',
    issuer: 'United Accreditation Foundation',
  },
];

export const CertificationsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F2EFE7] text-[#1B2A4D] font-sans">
      {/* Full-width Top Banner */}
      <div className="bg-[#1B2A4D] text-[#F2EFE7] pt-28 sm:pt-36 pb-20 px-6 sm:px-12 border-b border-[#C9973F]/30 w-full relative">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center flex flex-col items-center justify-center space-y-5 pt-2">
            <h1 className="hp-display text-5xl sm:text-7xl font-extrabold tracking-tight text-[#F2EFE7]">
              Company <span className="text-[#C9973F]">Certifications.</span>
            </h1>
            <p className="text-[#F2EFE7]/70 font-light text-lg sm:text-2xl max-w-3xl text-center leading-relaxed">
              Noveris Bio operates under strict national and international regulatory frameworks ensuring bio-purity, safety, and quality assurance.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Badge matrix */}
      <div className="max-w-7xl mx-auto py-24 sm:py-32 px-6 sm:px-12">
        <Reveal className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="hp-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1B2A4D] tracking-tight">
            Verified quality &amp; compliance.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-t border-l border-[#1B2A4D]/15">
          {certBadges.map((cert, i) => (
            <Reveal key={cert.id} delay={(i % 4) * 70}>
              <div className="group h-full p-8 sm:p-10 md:p-12 border-r border-b border-[#1B2A4D]/15 flex flex-col items-center text-center gap-6 hover:bg-[#1B2A4D]/[0.03] transition-colors duration-300">
                <div className="w-full h-28 sm:h-36 flex items-center justify-center">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="max-h-full max-w-[90%] object-contain grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold text-[#C9973F] uppercase tracking-wider block">
                    {cert.name}
                  </span>
                  <h3 className="hp-display text-lg sm:text-xl font-bold text-[#1B2A4D] leading-snug">
                    {cert.title}
                  </h3>
                  <p className="font-mono text-xs sm:text-sm text-[#1B2A4D]/60 mt-1 font-medium">{cert.issuer}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};