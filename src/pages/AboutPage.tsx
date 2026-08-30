import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Users,
  ChevronRight,
  Microscope,
  FlaskConical,
  TestTube2,
  Layers,
  HeartHandshake,
  TrendingUp,
} from 'lucide-react';
import { Footer } from '../components/Footer';
import { Reveal } from '../components/Reveal';



const devSteps = [
  {
    num: '01',
    title: 'Peer-Reviewed Research',
    desc: "Every formulation begins with a review of clinical literature, not a competitor's label.",
  },
  {
    num: '02',
    title: 'Formulation Optimization',
    desc: 'Recombinant proteins and biologic compounds engineered for purity, stability and dosing precision.',
  },
  {
    num: '03',
    title: 'Stability Evaluation',
    desc: 'Shelf-life and stress testing under real-world storage and transport conditions across India.',
  },
  {
    num: '04',
    title: 'Quality Assurance',
    desc: 'WHO-GMP and ISO 9001 checkpoints clear every batch before it leaves the facility.',
  },
  {
    num: '05',
    title: 'Physician Feedback',
    desc: 'Clinical advisory review closes the loop, feeding real-world outcomes back into the next formulation.',
  },
];

export const AboutPage: React.FC = () => {
  const processListRef = useRef<HTMLDivElement | null>(null);
  const [fillPercent, setFillPercent] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(-1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll-linked fill line for the development process list — same
  // mechanic as the homepage's ProcessSection.
  useEffect(() => {
    const update = () => {
      const el = processListRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height;
      const traveled = vh * 0.7 - rect.top;
      let progress = total > 0 ? traveled / total : 0;
      progress = Math.max(0, Math.min(1, progress));
      setFillPercent(progress * 100);

      let active = -1;
      devSteps.forEach((_, i) => {
        const threshold = (i + 0.4) / devSteps.length;
        if (progress >= threshold) active = i;
      });
      setActiveStepIndex(active);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    const lenis = (window as any).lenis;
    if (lenis) lenis.on('scroll', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      if (lenis) lenis.off('scroll', update);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F2EFE7] text-[#1B2A4D] font-sans selection:bg-[#C9973F] selection:text-[#F2EFE7]">
      {/* 1. Full-width Top Banner — unchanged */}
      <div className="bg-[#1B2A4D] text-[#F2EFE7] pt-36 sm:pt-40 pb-16 px-6 sm:px-12 border-b border-[#C9973F]/30 w-full text-center">
        <div className="max-w-7xl mx-auto space-y-6 flex flex-col items-center justify-center">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#C9973F] block">
            ABOUT NOVERIS BIO
          </span>
          <h1 className="font-sans text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#F2EFE7]">
            INNOVATING <span className="text-[#C9973F]">BIOPHARMACEUTICALS</span>
          </h1>
          <p className="text-[#7C8AA0] font-light text-base sm:text-xl max-w-3xl leading-relaxed text-center">
            Advancing healthcare through innovative, science-driven formulations in Pediatrics and Infertility.
          </p>
        </div>
      </div>

      {/* 2. CHAPTER 01: OUR GLOBAL ROOTS & EXPERTISE — unchanged */}
      <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto border-b border-[#1B2A4D]/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 sticky top-28 space-y-2">
            <span className="font-sans text-8xl sm:text-9xl font-black text-[#1B2A4D]/20 block leading-none select-none">
              01
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#C9973F] block">
              GLOBAL ROOTS &amp; EXPERTISE
            </span>
          </div>

          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-3 border-l-2 border-[#C9973F] pl-6 sm:pl-8">
              <span className="font-mono text-xs font-bold text-[#C9973F] uppercase tracking-wider block">
                CHAPTER 01.01
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#1B2A4D]">
                Global Origins
              </h2>
              <p className="text-[#7C8AA0] font-light text-base sm:text-lg leading-relaxed">
                Drawing expertise from Europe and the USA in biopharmaceutical innovation, Noveris Bio combines global scientific rigor with tailored healthcare solutions.
              </p>
            </div>

            <div className="space-y-3 border-l-2 border-[#C9973F] pl-6 sm:pl-8">
              <span className="font-mono text-xs font-bold text-[#C9973F] uppercase tracking-wider block">
                CHAPTER 01.02
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#1B2A4D]">
                R&amp;D Prowess
              </h2>
              <p className="text-[#7C8AA0] font-light text-base sm:text-lg leading-relaxed">
                Built on a team of formulation experts, research physicians, and clinicians working together to develop high-purity, evidence-based biopharmaceuticals.
              </p>
            </div>

            <div className="space-y-3 border-l-2 border-[#C9973F] pl-6 sm:pl-8">
              <span className="font-mono text-xs font-bold text-[#C9973F] uppercase tracking-wider block">
                CHAPTER 01.03
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#1B2A4D]">
                India Initiation
              </h2>
              <p className="text-[#7C8AA0] font-light text-base sm:text-lg leading-relaxed">
                Bridging the critical gap between laboratory discoveries and real-world patient care, establishing India as our strategic launchpad for specialty biopharma.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CHAPTER 02: SPECIALTY-FOCUSED TEAM & CORE THERAPEUTIC AREAS — unchanged */}
      <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto border-b border-[#1B2A4D]/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 sticky top-28 space-y-2">
            <span className="font-sans text-8xl sm:text-9xl font-black text-[#1B2A4D]/20 block leading-none select-none">
              02
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#C9973F] block">
              SPECIALTY FOCUS &amp; TEAM
            </span>
          </div>

          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-3 border-l-2 border-[#C9973F] pl-6 sm:pl-8">
              <span className="font-mono text-xs font-bold text-[#C9973F] uppercase tracking-wider block">
                CHAPTER 02.01
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#1B2A4D]">
                Multinational Medical &amp; Research Team
              </h2>
              <p className="text-[#7C8AA0] font-light text-base sm:text-lg leading-relaxed">
                Noveris Bio is built on the strength of a dedicated specialty team, ensuring focused execution and deep market penetration. Our founders bring together diverse expertise from leading academic and clinical institutions in the USA and Europe.
              </p>
            </div>

            <div className="space-y-3 border-l-2 border-[#C9973F] pl-6 sm:pl-8">
              <span className="font-mono text-xs font-bold text-[#C9973F] uppercase tracking-wider block">
                CHAPTER 02.02
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#1B2A4D]">
                Core Focus: Infertility Specialty
              </h2>
              <p className="text-[#7C8AA0] font-light text-base sm:text-lg leading-relaxed">
                Developing advanced fertility treatments based on the latest reproductive science and technologies. Incorporating groundbreaking innovations including ovarian rejuvenation techniques and advanced targeted clinical nutrition to improve reproductive outcomes.
              </p>
            </div>

            <div className="space-y-3 border-l-2 border-[#C9973F] pl-6 sm:pl-8">
              <span className="font-mono text-xs font-bold text-[#C9973F] uppercase tracking-wider block">
                CHAPTER 02.03
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#1B2A4D]">
                Core Focus: Pediatrics Specialty
              </h2>
              <p className="text-[#7C8AA0] font-light text-base sm:text-lg leading-relaxed">
                Addressing unmet medical needs by developing novel therapeutics for children, focusing on conditions with limited treatment options. Backed by extensive clinical research and stringent safety data, we target high prevalence diseases impacting pediatric populations in India and around the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CHAPTER 03: WHY INDIA? WHY KARNATAKA? & SCIENCE-BACKED APPROACH — unchanged */}
      <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto border-b border-[#1B2A4D]/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 sticky top-28 space-y-2">
            <span className="font-sans text-8xl sm:text-9xl font-black text-[#1B2A4D]/20 block leading-none select-none">
              03
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#C9973F] block">
              LAUNCHPAD &amp; INNOVATION
            </span>
          </div>

          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-3 border-l-2 border-[#C9973F] pl-6 sm:pl-8">
              <span className="font-mono text-xs font-bold text-[#C9973F] uppercase tracking-wider block">
                CHAPTER 03.01
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#1B2A4D]">
                Why India? Why Karnataka?
              </h2>
              <p className="text-[#7C8AA0] font-light text-base sm:text-lg leading-relaxed">
                Karnataka was chosen as our strategic launchpad for its robust healthcare infrastructure, premier clinical centers, and vibrant scientific community. Our initial focus centers on Karnataka, followed by a phased nationwide expansion across India to address critical needs in growing pediatric and infertility sectors.
              </p>
            </div>

            <div className="space-y-3 border-l-2 border-[#C9973F] pl-6 sm:pl-8">
              <span className="font-mono text-xs font-bold text-[#C9973F] uppercase tracking-wider block">
                CHAPTER 03.02
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#1B2A4D]">
                Science-Backed &amp; Research-Driven Approach
              </h2>
              <p className="text-[#7C8AA0] font-light text-base sm:text-lg leading-relaxed">
                Leveraging advances in reproductive genetics and molecular biology. Partnering with academic institutions and clinical centers for collaborative trials to ensure product efficacy, safety, and regulatory compliance through a rigorous evidence-based process.
              </p>
            </div>

            <div className="space-y-3 border-l-2 border-[#C9973F] pl-6 sm:pl-8">
              <span className="font-mono text-xs font-bold text-[#C9973F] uppercase tracking-wider block">
                CHAPTER 03.03
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#1B2A4D]">
                Innovation &amp; Product Pipeline
              </h2>
              <p className="text-[#7C8AA0] font-light text-base sm:text-lg leading-relaxed">
                Our diverse pipeline includes regenerative therapies, precision fertility solutions, and specialized pediatric formulations. Utilizing novel technology approaches with a patient-centric commitment to improving quality of life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          EVERYTHING BELOW THIS LINE IS REDESIGNED to match the
          homepage — hp-display (Fraunces) headline moments, scroll
          reveals, and the same scroll-linked fill-line mechanic used
          in the homepage's ProcessSection.
         ============================================================ */}
      {/* 5. SCIENCE BEHIND OUR PRODUCTS */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto border-b border-[#1B2A4D]/20 space-y-20">


        {/* Development process — scroll-linked fill line, same mechanic as the homepage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-4">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-28 self-start space-y-4">
            <h3 className="hp-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1B2A4D] tracking-tight leading-[1.1]">
              Our formulative development process.
            </h3>
            <p className="text-[#1B2A4D]/60 font-light text-lg sm:text-xl leading-relaxed max-w-md mt-4">
              The same five-step sequence runs for every Noveris formulation, in this order, with no step skipped.
            </p>
          </Reveal>

          <div className="lg:col-span-7 lg:pl-12 xl:pl-20">
            <div ref={processListRef} className="relative">
              <div className="absolute left-5 top-2 bottom-2 w-px bg-[#1B2A4D]/15" />
              <div
                className="absolute left-5 top-2 w-px bg-[#C9973F] transition-[height] duration-100 ease-linear"
                style={{ height: `${fillPercent}%` }}
              />
              <div className="space-y-14 sm:space-y-16">
                {devSteps.map((step, i) => {
                  const active = i <= activeStepIndex;
                  return (
                    <div key={step.num} className="relative pl-14 sm:pl-16">
                      <span
                        className={`absolute left-5 -translate-x-1/2 -top-1 w-10 h-10 rounded-full border flex items-center justify-center font-mono text-xs sm:text-sm font-bold transition-colors duration-300 ${
                          active
                            ? 'bg-[#C9973F] border-[#C9973F] text-[#08090D]'
                            : 'bg-[#1B2A4D] border-[#C9973F]/30 text-[#F2EFE7]'
                        }`}
                      >
                        {step.num}
                      </span>
                      <h4
                        className={`hp-display text-2xl sm:text-3xl font-bold mb-2 transition-colors duration-300 ${
                          active ? 'text-[#C9973F]' : 'text-[#1B2A4D]'
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p className="text-[#1B2A4D]/70 font-light text-base sm:text-lg leading-relaxed max-w-lg">
                        {step.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Scientific Partners */}
        <div className="pt-24 sm:pt-32 mt-20 sm:mt-28 border-t border-[#1B2A4D]/15">
          <Reveal className="text-center max-w-none mx-auto mb-16">
            <h3 className="hp-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1B2A4D] tracking-tight whitespace-normal sm:whitespace-nowrap">
              International Research Alliances.
            </h3>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-[#1B2A4D]/15">
            <Reveal className="py-12 md:pr-14 border-b md:border-b-0 md:border-r border-[#1B2A4D]/15">
              <span className="inline-block font-mono text-xs sm:text-sm font-bold text-[#C9973F] uppercase tracking-wider border border-[#C9973F]/30 rounded-full px-4 py-1.5 mb-6">
                Italy
              </span>
              <h4 className="hp-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B2A4D] mb-5">University of Padova</h4>
              <p className="text-[#1B2A4D]/70 font-light text-lg sm:text-xl leading-relaxed max-w-xl">
                Recognized internationally for excellence in reproductive medicine. Scientific concepts behind the{' '}
                <strong className="text-[#1B2A4D] font-semibold">KONCEEV range</strong> are inspired by research from the
                Department of Reproductive Medicine.
              </p>
            </Reveal>

            <Reveal delay={100} className="py-12 md:pl-14">
              <span className="inline-block font-mono text-xs sm:text-sm font-bold text-[#C9973F] uppercase tracking-wider border border-[#C9973F]/30 rounded-full px-4 py-1.5 mb-6">
                Global Specialty Ingredients
              </span>
              <h4 className="hp-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B2A4D] mb-5">Lubrizol</h4>
              <p className="text-[#1B2A4D]/70 font-light text-lg sm:text-xl leading-relaxed max-w-xl">
                A global leader in specialty ingredient technologies. Patented{' '}
                <strong className="text-[#1B2A4D] font-semibold">Lipofer&reg; Iron</strong> and{' '}
                <strong className="text-[#1B2A4D] font-semibold">Lipocal&reg; Calcium</strong> technologies form the basis of{' '}
                <strong className="text-[#1B2A4D] font-semibold">TETSU-MOM</strong> and{' '}
                <strong className="text-[#1B2A4D] font-semibold">TETSU-CAL</strong>, providing improved bioavailability,
                palatability, and patient compliance.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. Vision & Mission 2x2 Checkerboard Grid */}
      <section className="w-full border-b border-[#1B2A4D]/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[450px]">
          <Reveal className="bg-[#1B2A4D] p-8 sm:p-12 flex items-center justify-center min-h-[250px] overflow-hidden">
            <span className="hp-display italic text-5xl sm:text-7xl font-bold text-[#F2EFE7] uppercase text-center tracking-widest">
              Vision
            </span>
          </Reveal>

          <Reveal
            delay={100}
            className="bg-[#F2EFE7] p-10 sm:p-14 flex flex-col justify-center space-y-4 border-b md:border-b-0 md:border-l border-[#1B2A4D]/20 min-h-[250px]"
          >
            <h3 className="hp-display text-2xl sm:text-3xl font-semibold text-[#1B2A4D] leading-snug tracking-tight">
              To become a global leader in specialty biopharma, establishing a strong and impactful presence in emerging markets through ethical research, patient safety, and sustainable healthcare solutions.
            </h3>
          </Reveal>

          <Reveal
            delay={100}
            className="bg-[#F2EFE7] p-10 sm:p-14 flex flex-col justify-center space-y-4 border-t border-[#1B2A4D]/20 min-h-[250px]"
          >
            <h3 className="hp-display text-2xl sm:text-3xl font-semibold text-[#1B2A4D] leading-snug tracking-tight">
              To deliver innovative, evidence-based therapies that significantly improve outcomes in pediatric care and infertility treatments, addressing critical unmet medical needs globally.
            </h3>
          </Reveal>

          <Reveal className="bg-[#1B2A4D] p-8 sm:p-12 flex items-center justify-center min-h-[250px] overflow-hidden">
            <span className="hp-display italic text-5xl sm:text-7xl font-bold text-[#F2EFE7] uppercase text-center tracking-widest">
              Mission
            </span>
          </Reveal>
        </div>
      </section>

      {/* 7. NOVERIS BIO: A FUTURE OF HEALTH */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto">
        <Reveal className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="hp-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1B2A4D] tracking-tight leading-tight">
            Innovating for a <span className="text-[#C9973F]">healthier future.</span>
          </h2>
        </Reveal>

        {/* Three pillars — a divided row instead of stacked cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-[#1B2A4D]/15">
          <Reveal className="py-14 md:pr-12 border-b md:border-b-0 md:border-r border-[#1B2A4D]/15">
            <div className="flex items-center justify-between mb-8">
              <Microscope className="w-8 h-8 text-[#C9973F]" />
              <span className="font-mono text-4xl sm:text-5xl font-black text-[#1B2A4D]/15">01</span>
            </div>
            <span className="font-mono text-xs sm:text-sm font-bold text-[#C9973F] uppercase tracking-widest block mb-3">
              PILLAR 01
            </span>
            <h3 className="hp-display text-3xl sm:text-4xl font-bold text-[#1B2A4D] mb-4">Innovation</h3>
            <p className="text-[#1B2A4D]/70 font-light text-base sm:text-lg leading-relaxed mb-8">
              <strong className="text-[#1B2A4D] font-bold block text-lg sm:text-xl mb-2">Driven by R&amp;D Excellence</strong>
              Leveraging peer-reviewed research, advanced delivery systems, and continuous formulation enhancement to redefine biopharmaceutical standards.
            </p>
            <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#1B2A4D]/60 font-medium">R&amp;D Driven</span>
          </Reveal>

          <Reveal delay={90} className="py-14 md:px-12 border-b md:border-b-0 md:border-r border-[#1B2A4D]/15">
            <div className="flex items-center justify-between mb-8">
              <HeartHandshake className="w-8 h-8 text-[#C9973F]" />
              <span className="font-mono text-4xl sm:text-5xl font-black text-[#1B2A4D]/15">02</span>
            </div>
            <span className="font-mono text-xs sm:text-sm font-bold text-[#C9973F] uppercase tracking-widest block mb-3">
              PILLAR 02
            </span>
            <h3 className="hp-display text-3xl sm:text-4xl font-bold text-[#1B2A4D] mb-4">Impact</h3>
            <p className="text-[#1B2A4D]/70 font-light text-base sm:text-lg leading-relaxed mb-8">
              <strong className="text-[#1B2A4D] font-bold block text-lg sm:text-xl mb-2">Transforming Patient Lives</strong>
              Delivering high-purity, evidence-based therapies in Pediatrics and Infertility that directly improve clinical outcomes and patient well-being.
            </p>
            <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#1B2A4D]/60 font-medium">Patient Outcomes</span>
          </Reveal>

          <Reveal delay={180} className="py-14 md:pl-12">
            <div className="flex items-center justify-between mb-8">
              <TrendingUp className="w-8 h-8 text-[#C9973F]" />
              <span className="font-mono text-4xl sm:text-5xl font-black text-[#1B2A4D]/15">03</span>
            </div>
            <span className="font-mono text-xs sm:text-sm font-bold text-[#C9973F] uppercase tracking-widest block mb-3">
              PILLAR 03
            </span>
            <h3 className="hp-display text-3xl sm:text-4xl font-bold text-[#1B2A4D] mb-4">Expansion</h3>
            <p className="text-[#1B2A4D]/70 font-light text-base sm:text-lg leading-relaxed mb-8">
              <strong className="text-[#1B2A4D] font-bold block text-lg sm:text-xl mb-2">Growing Across Karnataka &amp; India</strong>
              Executing a focused, phased market penetration strategy starting from Karnataka and scaling nationwide to reach patients across India.
            </p>
            <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#1B2A4D]/60 font-medium">Pan-India Footprint</span>
          </Reveal>
        </div>


      </section>

      {/* 8. Footer */}
      <Footer />
    </div>
  );
};