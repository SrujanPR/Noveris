import React from 'react';
import { Link } from 'react-router-dom';

export const MissionSection: React.FC = () => {
  return (
    <section id="mission" className="bg-[#08090D] py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-end">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F2EFE7] leading-tight tracking-tight">
            Where reproductive science meets childhood <span className="text-[#C9973F]">medicine.</span>
          </h2>
        </div>

        <div className="border-t lg:border-t-0 lg:border-l border-white/10 pt-7 lg:pt-0 lg:pl-8">
          <p className="text-[#8C9AB2] leading-relaxed font-light">
            Noveris Bio designs biologics for two fields where the margin for error is smallest.
            Drawing on research from Europe and the United States, we translate laboratory
            breakthroughs into therapies built for Indian clinics, right from our Bangalore
            headquarters outward.
          </p>
          <Link
            to="/about"
            className="mt-6 inline-flex items-center gap-2.5 font-mono text-[11.5px] font-bold tracking-wider uppercase text-[#E7BE72] border-b border-[#E7BE72] pb-1 hover:gap-4 hover:text-[#F2EFE7] transition-all"
          >
            Read the Full Story &amp; R&amp;D Mission →
          </Link>
        </div>
      </div>
    </section>
  );
};
