import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Baby, Dna } from 'lucide-react';
import { Footer } from '../components/Footer';

import calmezyImg from '../assets/Calmezy.png';
import tetsuKidzImg from '../assets/Tetsu-Kids.png';
import tetsuMomImg from '../assets/Tetsu-Mom.png';
import konceevFImg from '../assets/Konceev-F.png';
import konceevMImg from '../assets/Konceev-M.png';
import maternovaImg from '../assets/Maternova.png';
import novolactOnImg from '../assets/Novolact-ON.png';

interface Product {
  id: string;
  name: string;
  category: string;
  tagline: string;
}

export const ProductsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pediatricProducts: Product[] = [
    {
      id: 'tetsu-kidz',
      name: 'TETSU-KIDZ',
      category: 'Pediatrics',
      tagline: 'Specialized Pediatric Bio-Nutritional Formulation',
    },
    {
      id: 'calmezy',
      name: 'CALMEZY',
      category: 'Pediatrics',
      tagline: 'Precision Pediatric Therapeutic Care',
    },
  ];

  const gynecologyProducts: Product[] = [
    {
      id: 'maternova',
      name: 'MATERNOVA',
      category: 'Gynecology & Infertility',
      tagline: 'Comprehensive Maternal Wellness & Prenatal Formulation',
    },
    {
      id: 'konceev-f',
      name: 'KONCEEV-F',
      category: 'Gynecology & Infertility',
      tagline: 'Advanced Female Reproductive Science & Fertility Support',
    },
    {
      id: 'konceev-m',
      name: 'KONCEEV-M',
      category: 'Gynecology & Infertility',
      tagline: 'Targeted Male Fertility & Cellular Vitality Formulation',
    },
    {
      id: 'novolact-on',
      name: 'NOVOLACT-ON',
      category: 'Gynecology & Infertility',
      tagline: 'Bio-Active Lactation & Maternal Wellness Solution',
    },
    {
      id: 'klin-ova',
      name: 'KLIN-OVA',
      category: 'Gynecology & Infertility',
      tagline: 'Ovarian Health & Follicular Rejuvenation Technology',
    },
    {
      id: 'tetsu-mom',
      name: 'TETSU-MOM',
      category: 'Gynecology & Infertility',
      tagline: 'Maternal Micronutrient & Hemoglobin Support',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F2EFE7] text-[#1B2A4D] font-sans selection:bg-[#1B2A4D] selection:text-[#F2EFE7]">
      {/* Top Banner Header */}
      <div className="bg-[#1B2A4D] text-[#F2EFE7] pt-36 sm:pt-40 pb-16 px-6 sm:px-12 border-b border-[#C9973F]/30 w-full text-center">
        <div className="max-w-7xl mx-auto space-y-4 flex flex-col items-center justify-center">
          <h1 className="font-sans text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F2EFE7]">
            SPECIALTY <span className="text-[#C9973F]">PRODUCTS</span>
          </h1>
          <p className="text-[#7C8AA0] font-light text-base sm:text-xl max-w-2xl text-center">
            Targeted biopharmaceutical formulations across Pediatrics and Reproductive Healthcare.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto py-16 px-6 sm:px-12 space-y-20">
        {/* PEDIATRICS DIVISION */}
        <section className="space-y-8">
          {/* Section Header */}
          <div className="border-b border-[#1B2A4D]/20 pb-4">
            <h2 className="font-display text-3xl font-extrabold text-[#1B2A4D]">
              Pediatrics
            </h2>
          </div>

          {/* 2 Product Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {pediatricProducts.map((prod) => {
              const imageMap: Record<string, string> = {
                'calmezy': calmezyImg,
                'tetsu-kidz': tetsuKidzImg,
              };
              const imgSrc = imageMap[prod.id];
              return (
                <Link
                  key={prod.id}
                  to={`/products/${prod.id}`}
                  className="flex flex-col justify-between group cursor-pointer p-5 rounded-3xl transition-all duration-300 hover:bg-[#1B2A4D]/15 text-center"
                >
                  {/* Complete Direct Image Display */}
                  <div className="w-full h-72 sm:h-80 flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-500">
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt={prod.name}
                        className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.15)] group-hover:drop-shadow-[0_20px_45px_rgba(0,0,0,0.25)] transition-all"
                      />
                    ) : (
                      <span className="font-mono text-xs text-[#1B2A4D] uppercase tracking-widest px-4 py-2 rounded-full border border-[#1B2A4D]/20">
                        {prod.name}
                      </span>
                    )}
                  </div>

                  {/* Center Aligned Product Name (Hyperlink) */}
                  <div className="pt-6 border-t border-[#1B2A4D]/20 flex items-center justify-center mt-4">
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1B2A4D] group-hover:text-white transition-colors text-center drop-shadow-sm">
                      {prod.name}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* GYNECOLOGY & INFERTILITY DIVISION */}
        <section className="space-y-8">
          {/* Section Header */}
          <div className="border-b border-[#1B2A4D]/20 pb-4">
            <h2 className="font-display text-3xl font-extrabold text-[#1B2A4D]">
              Gynecology &amp; Infertility
            </h2>
          </div>

          {/* 6 Product Cards Grid (2 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {gynecologyProducts.map((prod) => {
              const imageMap: Record<string, string> = {
                'maternova': maternovaImg,
                'novolact-on': novolactOnImg,
                'klin-ova': '/klin_extracted_1.jpg',
                'konceev-f': konceevFImg,
                'konceev-m': konceevMImg,
                'tetsu-mom': tetsuMomImg,
              };
              const imgSrc = imageMap[prod.id];
              return (
                <Link
                  key={prod.id}
                  to={`/products/${prod.id}`}
                  className="flex flex-col justify-between group cursor-pointer p-5 rounded-3xl transition-all duration-300 hover:bg-[#1B2A4D]/15 text-center"
                >
                  {/* Complete Direct Image Display */}
                  <div className="w-full h-72 sm:h-80 flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-500">
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt={prod.name}
                        className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.15)] group-hover:drop-shadow-[0_20px_45px_rgba(0,0,0,0.25)] transition-all"
                      />
                    ) : (
                      <span className="font-mono text-xs text-[#1B2A4D] uppercase tracking-widest px-4 py-2 rounded-full border border-[#1B2A4D]/20">
                        {prod.name}
                      </span>
                    )}
                  </div>

                  {/* Center Aligned Product Name (Hyperlink) */}
                  <div className="pt-6 border-t border-[#1B2A4D]/20 flex items-center justify-center mt-4">
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1B2A4D] group-hover:text-white transition-colors text-center drop-shadow-sm">
                      {prod.name}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
