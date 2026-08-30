import React, { useState, useEffect, useRef } from 'react';
import calmezyImg from '../assets/Calmezy.png';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  Moon,
  Sun,
  ShieldCheck,
  Zap,
  Brain,
  Heart,
  Droplet,
  Flower2,
  Smile,
  Shield,
  Info,
  ChevronDown,
  Star,
  Activity,
  Layers,
} from 'lucide-react';
import { Footer } from '../components/Footer';

// Dosage options from calmezy.html with SVG dropper fill coordinates
const dosageOptions = [
  { id: 'toddler', ageLabel: '1–4 Years', subLabel: 'Toddler / Preschool', ml: 1, y: 116, height: 38 },
  { id: 'child', ageLabel: '5–11 Years', subLabel: 'Growing Child', ml: 2, y: 86, height: 68 },
  { id: 'teen', ageLabel: '12+ Years', subLabel: 'Teen', ml: 3, y: 56, height: 98 },
];

export const CalmEzyDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeDose, setActiveDose] = useState(dosageOptions[0]);
  const [activeSection, setActiveSection] = useState('overview');

  // Animation triggers via IntersectionObserver
  const [isBonded, setIsBonded] = useState(false);
  const [isBloomOpen, setIsBloomOpen] = useState(false);
  const [isWheelVisible, setIsWheelVisible] = useState(false);
  const [isRingsAnimated, setIsRingsAnimated] = useState(false);

  const bondRef = useRef<HTMLDivElement | null>(null);
  const bloomRef = useRef<HTMLDivElement | null>(null);
  const wheelRef = useRef<HTMLDivElement | null>(null);
  const ringsRef = useRef<HTMLDivElement | null>(null);
  const hzWrapRef = useRef<HTMLDivElement | null>(null);
  const hzTrackRef = useRef<HTMLDivElement | null>(null);
  const hzFillRef = useRef<HTMLDivElement | null>(null);

  // Scroll listener for active section & horizontal dialogue
  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {

      // Section tracker for side constellation nav & sub-navbar
      const sections = ['overview', 'science', 'advantage', 'kids', 'dosage', 'trust'];
      for (const secId of sections) {
        const el = document.getElementById(secId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 150) {
            setActiveSection(secId);
            break;
          }
        }
      }

      // Horizontal pinned track update for "One mineral, three hundred jobs"
      const hzWrap = hzWrapRef.current;
      const hzTrack = hzTrackRef.current;
      const hzFill = hzFillRef.current;
      if (hzWrap && hzTrack) {
        const rect = hzWrap.getBoundingClientRect();
        const total = hzWrap.offsetHeight - window.innerHeight;
        const progress = total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0;
        if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
          const gutter = window.innerWidth > 900 ? 120 : 0;
          const maxShift = Math.max(0, hzTrack.scrollWidth - (window.innerWidth - gutter));
          hzTrack.style.transform = `translate3d(${-progress * maxShift}px, 0, 0)`;
          if (hzFill) hzFill.style.width = `${progress * 100}%`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    const lenis = (window as any).lenis;
    let lenisUnsub: (() => void) | null = null;
    if (lenis) {
      lenis.on('scroll', handleScroll);
      lenisUnsub = () => lenis.off('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (lenisUnsub) lenisUnsub();
    };
  }, []);

  // Observers for interactive diagrams
  useEffect(() => {
    // Bond diagram observer
    const bondObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsBonded(true);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (bondRef.current) bondObs.observe(bondRef.current);

    // Bloom diagram observer
    const bloomObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsBloomOpen(true);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (bloomRef.current) bloomObs.observe(bloomRef.current);

    // Advantage Wheel observer
    const wheelObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsWheelVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );
    if (wheelRef.current) wheelObs.observe(wheelRef.current);

    // Ring stats observer
    const ringsObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRingsAnimated(true);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (ringsRef.current) ringsObs.observe(ringsRef.current);

    return () => {
      bondObs.disconnect();
      bloomObs.disconnect();
      wheelObs.disconnect();
      ringsObs.disconnect();
    };
  }, []);

  return (
    <div className="calmezy-page min-h-screen bg-[#fbf9f4] text-[#1b2a4d] font-sans selection:bg-[#c9973f] selection:text-[#0e1730] relative">
      {/* Dynamic Keyframe Styles */}
      <style>{`
        @keyframes moon-breathe {
          0%, 100% { transform: scale(1); }
          42%, 58% { transform: scale(1.045); }
        }
        @keyframes breathe-pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          42%, 58% { transform: scale(1.9); opacity: 1; }
        }
        @keyframes bounce-chevron {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(7px); opacity: 1; }
        }

        /* Horizontal Pinned Scroll Track (Tetsu Mom Style) */
        .calmezy-page .hz-wrap { position: relative; height: 320vh; }
        .calmezy-page .hz-sticky { position: sticky; top: 0; height: 100vh; overflow: hidden; display: flex; flex-direction: column; justify-content: center; }
        .calmezy-page .hz-head { padding: 0 6vw; margin-bottom: 2.8rem; }
        .calmezy-page .hz-head h2 { font-size: clamp(2.1rem, 4.4vw, 3.4rem); line-height: 1.05; font-family: var(--font-display, 'Space Grotesk', sans-serif); font-weight: 700; color: #1b2a4d; }
        .calmezy-page .hz-sub { font-size: 1.05rem; line-height: 1.6; color: rgba(27,42,77,0.7); max-width: 52ch; font-weight: 350; margin-top: 0.8rem; }
        .calmezy-page .hz-track { display: flex; gap: 2.2vw; padding-left: 6vw; will-change: transform; }
        .calmezy-page .hz-panel {
          width: min(74vw, 680px); flex-shrink: 0; min-height: 48vh;
          border-radius: 28px; padding: 3rem;
          display: flex; flex-direction: column; justify-content: space-between;
          position: relative; overflow: hidden;
          box-shadow: 0 20px 50px -20px rgba(14,23,48,0.2);
          transition: box-shadow 0.3s ease;
        }
        .calmezy-page .hz-panel:hover {
          box-shadow: 0 30px 60px -20px rgba(14,23,48,0.3);
        }
        .calmezy-page .hz-panel .big-num {
          position: absolute; top: -4%; right: 2%;
          font-family: var(--font-display, 'Space Grotesk', sans-serif);
          font-size: 11rem; font-weight: 700;
          opacity: 0.07; line-height: 1; user-select: none; pointer-events: none;
        }
        .calmezy-page .hz-panel.v1 { background: linear-gradient(160deg, #ffffff, #fbf9f4); border: 1px solid rgba(27,42,77,0.12); color: #1b2a4d; }
        .calmezy-page .hz-panel.v2 { background: linear-gradient(160deg, #25396a, #0e1730); border: 1px solid rgba(201,151,63,0.35); color: #ffffff; }
        .calmezy-page .hz-panel.v2 .hz-desc { color: rgba(242,239,231,0.85); }
        .calmezy-page .hz-panel.v3 { background: linear-gradient(160deg, #f2efe7, #e9e2d2); border: 1px solid rgba(201,151,63,0.25); color: #1b2a4d; }
        .calmezy-page .hz-panel.v4 { background: linear-gradient(160deg, #1b2a4d, #0e1730); border: 1px solid rgba(201,151,63,0.35); color: #ffffff; }
        .calmezy-page .hz-panel.v4 .hz-desc { color: rgba(242,239,231,0.85); }

        .calmezy-page .hz-eyebrow { font-family: var(--font-mono, monospace); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: #c9973f; font-weight: 700; display: block; }
        .calmezy-page .hz-title { font-family: var(--font-display, 'Space Grotesk', sans-serif); font-size: clamp(1.7rem, 3vw, 2.3rem); margin-top: 0.7rem; max-width: 18ch; font-weight: 700; line-height: 1.2; }
        .calmezy-page .hz-desc { font-size: 1.05rem; line-height: 1.65; max-width: 42ch; margin-top: 1.4rem; font-weight: 350; }

        .calmezy-page .hz-progress { padding: 0 6vw; margin-top: 2.4rem; display: flex; align-items: center; gap: 0.8rem; }
        .calmezy-page .hz-progress-track { height: 3px; flex: 1; max-width: 240px; background: rgba(27,42,77,0.12); border-radius: 999px; overflow: hidden; }
        .calmezy-page .hz-progress-fill { height: 100%; width: 0%; background: linear-gradient(90deg, #e5c07f, #c9973f); border-radius: 999px; }
        .calmezy-page .hz-progress-lbl { font-family: var(--font-mono, monospace); font-size: 0.72rem; color: rgba(27,42,77,0.55); white-space: nowrap; font-weight: 700; }

        @media (max-width: 700px) {
          .calmezy-page .hz-panel { width: 84vw; min-height: auto; padding: 2.2rem; }
          .calmezy-page .hz-panel .big-num { font-size: 7rem; }
          .calmezy-page .hz-wrap { height: 280vh; }
        }
      `}</style>






      {/* 2. HERO SECTION */}
      <section className="relative min-h-[90vh] bg-gradient-to-b from-[#25396a] via-[#1b2a4d] to-[#0e1730] text-[#f2efe7] pt-24 pb-20 px-6 sm:px-12 flex items-center overflow-hidden">
        {/* Hero Content */}
        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            {/* Title */}
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight text-[#f2efe7] leading-none">
              CALM<em className="not-italic text-[#e5c07f]">EZY</em>
            </h1>

            {/* Subtitle / Lede */}
            <p className="text-lg sm:text-xl text-[#f6f3ec]/80 max-w-2xl font-light leading-relaxed">
              A gentle nightly syrup combining Liposomal Magnesium Bisglycinate and Chamomile. Designed to help children unwind naturally, focus comfortably, and enjoy peaceful sleep.
            </p>



            {/* Hero Feature Chips */}
            <div className="flex flex-wrap gap-3 pt-6">
              <div className="flex items-center gap-2 bg-[#f6f3ec]/10 border border-[#f6f3ec]/15 px-4 py-2 rounded-full font-mono text-xs text-[#f6f3ec]/90">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e5c07f]" />
                <span><b className="text-[#e5c07f]">20mg</b> Liposomal Magnesium</span>
              </div>
              <div className="flex items-center gap-2 bg-[#f6f3ec]/10 border border-[#f6f3ec]/15 px-4 py-2 rounded-full font-mono text-xs text-[#f6f3ec]/90">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e5c07f]" />
                <span><b className="text-[#e5c07f]">3mg</b> Chamomile Extract</span>
              </div>
              <div className="flex items-center gap-2 bg-[#f6f3ec]/10 border border-[#f6f3ec]/15 px-4 py-2 rounded-full font-mono text-xs text-[#f6f3ec]/90">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e5c07f]" />
                <span><b className="text-[#e5c07f]">1ml</b> Once Daily</span>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Calmezy Product Image */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <img
              src={calmezyImg}
              alt="Calmezy Product"
              className="w-full max-w-[460px] h-auto object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-500 rounded-3xl"
            />
          </div>
        </div>
      </section>

      {/* 3. OVERVIEW SECTION (`#overview`) */}
      <section id="overview" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#1b2a4d] tracking-tight leading-tight">
            A gentle path to<br />restful nights.
          </h2>
          <p className="text-lg text-[#1b2a4d]/70 leading-relaxed font-light">
            Bedtime shouldn't feel like a struggle. Calmezy was created with one simple goal: giving children gentle, effective support for calm evenings and restful sleep in a taste they actually enjoy.
          </p>
        </div>

        {/* Story Trail Timeline */}
        <div className="space-y-2 max-w-3xl">
          {/* Node 1 */}
          <div className="flex gap-5 sm:gap-6 items-start">
            <div className="flex flex-col items-center shrink-0 self-stretch pt-0.5">
              <div className="w-5 h-5 rounded-full bg-[#fbf9f4] border-2 border-[#c9973f] flex items-center justify-center shadow-sm shrink-0 z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c9973f]" />
              </div>
              <div className="w-0.5 bg-[#c9973f]/40 flex-1 my-1" />
            </div>
            <div className="space-y-2 pb-8">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#9c7530] block">
                The Challenge
              </span>
              <h3 className="font-display text-2xl font-semibold text-[#1b2a4d]">
                Every parent knows the struggle.
              </h3>
              <p className="text-base text-[#1b2a4d]/70 leading-relaxed">
                Restless nights and wound-up evenings are among the most frequent concerns parents share with pediatricians, and finding a gentle daily solution isn't always easy.
              </p>
            </div>
          </div>

          {/* Node 2 */}
          <div className="flex gap-5 sm:gap-6 items-start">
            <div className="flex flex-col items-center shrink-0 self-stretch pt-0.5">
              <div className="w-5 h-5 rounded-full bg-[#fbf9f4] border-2 border-[#c9973f] flex items-center justify-center shadow-sm shrink-0 z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c9973f]" />
              </div>
              <div className="w-0.5 bg-[#c9973f]/40 flex-1 my-1" />
            </div>
            <div className="space-y-2 pb-8">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#9c7530] block">
                The Approach
              </span>
              <h3 className="font-display text-2xl font-semibold text-[#1b2a4d]">
                Calm the body can actually use.
              </h3>
              <p className="text-base text-[#1b2a4d]/70 leading-relaxed">
                Calmezy supports your child's natural sleep rhythms using two well-studied ingredients, delivered in a form designed for optimal absorption.
              </p>
            </div>
          </div>

          {/* Node 3 */}
          <div className="flex gap-5 sm:gap-6 items-start">
            <div className="flex flex-col items-center shrink-0 pt-0.5">
              <div className="w-5 h-5 rounded-full bg-[#fbf9f4] border-2 border-[#c9973f] flex items-center justify-center shadow-sm shrink-0 z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c9973f]" />
              </div>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#9c7530] block">
                The Formula
              </span>
              <h3 className="font-display text-2xl font-semibold text-[#1b2a4d]">
                One syrup, two trusted allies.
              </h3>
              <p className="text-base text-[#1b2a4d]/70 leading-relaxed">
                Every 30 ml bottle pairs liposomal magnesium with soothing chamomile, working together naturally for balanced bedtime care.
              </p>
            </div>
          </div>
        </div>

        {/* Four Things Pediatricians Notice First */}
        <div className="space-y-10 pt-12 border-t border-[#1b2a4d]/10">
          <div className="space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1b2a4d]">
              Four things pediatricians notice first.
            </h2>
          </div>

          {/* 4 Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {/* Card 1 */}
            <div className="p-8 rounded-3xl bg-[#fbf9f4] border border-[#1b2a4d]/10 hover:border-[#c9973f]/50 shadow-md hover:shadow-xl transition-all duration-300 space-y-5 flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-[#1b2a4d] text-[#e5c07f] flex items-center justify-center shadow-md shrink-0">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="font-display text-xl font-bold text-[#1b2a4d]">
                  Liposomal Delivery
                </h3>
                <p className="text-sm text-[#1b2a4d]/70 leading-relaxed font-light">
                  Nutrients wrapped for absorption, not left to be broken down before they ever reach the bloodstream.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-3xl bg-[#fbf9f4] border border-[#1b2a4d]/10 hover:border-[#c9973f]/50 shadow-md hover:shadow-xl transition-all duration-300 space-y-5 flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-[#1b2a4d] text-[#e5c07f] flex items-center justify-center shadow-md shrink-0">
                <Moon className="w-7 h-7" />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="font-display text-xl font-bold text-[#1b2a4d]">
                  Calm, Not Sedation
                </h3>
                <p className="text-sm text-[#1b2a4d]/70 leading-relaxed font-light">
                  Supports relaxation without harsh sedatives, so children stay alert and themselves during the day.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-3xl bg-[#fbf9f4] border border-[#1b2a4d]/10 hover:border-[#c9973f]/50 shadow-md hover:shadow-xl transition-all duration-300 space-y-5 flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-[#1b2a4d] text-[#e5c07f] flex items-center justify-center shadow-md shrink-0">
                <Brain className="w-7 h-7" />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="font-display text-xl font-bold text-[#1b2a4d]">
                  Science-Backed Pair
                </h3>
                <p className="text-sm text-[#1b2a4d]/70 leading-relaxed font-light">
                  Magnesium bisglycinate and chamomile are two of the most studied gentle-calm ingredients available.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-8 rounded-3xl bg-[#fbf9f4] border border-[#1b2a4d]/10 hover:border-[#c9973f]/50 shadow-md hover:shadow-xl transition-all duration-300 space-y-5 flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-[#1b2a4d] text-[#e5c07f] flex items-center justify-center shadow-md shrink-0">
                <Heart className="w-7 h-7" />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="font-display text-xl font-bold text-[#1b2a4d]">
                  Kids Actually Take It
                </h3>
                <p className="text-sm text-[#1b2a4d]/70 leading-relaxed font-light">
                  A pleasant-tasting syrup, allergen-free and additive-free, that fits easily into a nightly routine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SCIENCE SECTION (`#science`) */}
      <section id="science" className="py-24 bg-[#e9e2d2]/60 border-t border-b border-[#1b2a4d]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-20">
          {/* Section Head */}
          <div className="max-w-3xl space-y-4">
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#1b2a4d] tracking-tight leading-tight">
              What's inside<br />every drop.
            </h2>
            <p className="text-lg text-[#1b2a4d]/70 leading-relaxed font-light">
              Two ingredients chosen for real bodily absorption, ensuring children get true benefits rather than unabsorbed nutrients.
            </p>
          </div>

          {/* Constellation Ingredient Diagram */}
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#25396a] via-[#1b2a4d] to-[#0e1730] text-[#f2efe7] shadow-2xl relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-center">
              {/* Node 1: Magnesium */}
              <div className="md:col-span-5 space-y-4 flex flex-col items-center">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#e5c07f] via-[#c9973f] to-[#9c7530] text-[#0e1730] flex items-center justify-center shadow-[0_0_40px_rgba(201,151,63,0.5)]">
                  <Droplet className="w-12 h-12" />
                </div>
                <h4 className="font-display text-2xl font-bold text-[#f2efe7]">
                  Liposomal Magnesium
                </h4>
                <span className="font-mono text-xs font-bold text-[#e5c07f] block">
                  20mg per 1ml serving
                </span>
                <p className="text-sm text-[#f6f3ec]/80 max-w-xs font-light">
                  Enhanced absorption technology helps deliver more of every dose right where it is needed.
                </p>
              </div>

              {/* Connecting Bridge */}
              <div className="md:col-span-2 flex flex-col items-center justify-center my-4 md:my-0">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#e5c07f] mb-2 font-semibold">
                  Work Together
                </span>
                <div className="w-full h-0.5 bg-gradient-to-r from-[#c9973f] to-[#f6f3ec]/50 relative flex items-center justify-between px-1">
                  <span className="w-2 h-2 rounded-full bg-[#e5c07f]" />
                  <span className="w-2 h-2 rounded-full bg-[#e5c07f]" />
                </div>
              </div>

              {/* Node 2: Chamomile */}
              <div className="md:col-span-5 space-y-4 flex flex-col items-center">
                <div className="w-28 h-28 rounded-full bg-[#f6f3ec]/10 border-2 border-[#f6f3ec]/30 text-[#f2efe7] flex items-center justify-center">
                  <Flower2 className="w-12 h-12 text-[#e5c07f]" />
                </div>
                <h4 className="font-display text-2xl font-bold text-[#f2efe7]">
                  Chamomile Extract
                </h4>
                <span className="font-mono text-xs font-bold text-[#e5c07f] block">
                  3mg per 1ml serving
                </span>
                <p className="text-sm text-[#f6f3ec]/80 max-w-xs font-light">
                  A gentle botanical with a long history of helping children rest comfortably.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ONE MINERAL, THREE HUNDRED JOBS (Pinned Horizontal Scroll Section - Tetsu Mom Style) */}
      <section id="roles-dialogue" className="relative bg-[#f2efe7]">
        <div ref={hzWrapRef} className="hz-wrap" id="hzWrap">
          <div className="hz-sticky">
            <div className="hz-head">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#c9973f] block mb-2">
                DEVELOPMENTAL ROLES
              </span>
              <h2 className="font-display font-bold text-[#1b2a4d]">
                One mineral,<br />three hundred jobs.
              </h2>
              <p className="hz-sub">
                Magnesium supports more than 300 vital processes in the body, yet many children fall short through regular meals alone.
              </p>
            </div>

            <div ref={hzTrackRef} className="hz-track" id="hzTrack">
              {/* Panel 1 */}
              <div className="hz-panel v1">
                <span className="big-num">01</span>
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#e5c07f] via-[#c9973f] to-[#9c7530] text-[#0e1730] flex items-center justify-center shadow-md mb-6">
                    <Brain className="w-6 h-6" />
                  </div>
                  <span className="hz-eyebrow">COGNITIVE SUPPORT</span>
                  <h3 className="hz-title">Brain Development</h3>
                </div>
                <p className="hz-desc">
                  Supports optimal cognitive function, healthy learning capacity, and calm neural pathway communication during critical growth years.
                </p>
              </div>

              {/* Panel 2 */}
              <div className="hz-panel v2">
                <span className="big-num">02</span>
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#c9973f] text-[#0e1730] flex items-center justify-center shadow-md mb-6">
                    <Zap className="w-6 h-6" />
                  </div>
                  <span className="hz-eyebrow">NEUROMUSCULAR CARE</span>
                  <h3 className="hz-title">Muscle &amp; Nerve Function</h3>
                </div>
                <p className="hz-desc">
                  Essential for soothing muscular tension, preventing nighttime restlessness, and ensuring smooth, healthy nerve signal transmission.
                </p>
              </div>

              {/* Panel 3 */}
              <div className="hz-panel v3">
                <span className="big-num">03</span>
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#e5c07f] via-[#c9973f] to-[#9c7530] text-[#0e1730] flex items-center justify-center shadow-md mb-6">
                    <Activity className="w-6 h-6" />
                  </div>
                  <span className="hz-eyebrow">CELLULAR METABOLISM</span>
                  <h3 className="hz-title">Energy Production</h3>
                </div>
                <p className="hz-desc">
                  Helps convert dietary nutrients into clean, steady daily energy for active days without overtired, irritable evenings.
                </p>
              </div>

              {/* Panel 4 */}
              <div className="hz-panel v4">
                <span className="big-num">04</span>
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#c9973f] text-[#0e1730] flex items-center justify-center shadow-md mb-6">
                    <Smile className="w-6 h-6" />
                  </div>
                  <span className="hz-eyebrow">EMOTIONAL RESILIENCE</span>
                  <h3 className="hz-title">Psychological Balance</h3>
                </div>
                <p className="hz-desc">
                  Contributes to balanced neurotransmitter synthesis, natural emotional composure, and effortless bedtime wind-down.
                </p>
              </div>
            </div>

            <div className="hz-progress">
              <span className="hz-progress-lbl">01</span>
              <div className="hz-progress-track">
                <div ref={hzFillRef} className="hz-progress-fill" id="hzFill"></div>
              </div>
              <span className="hz-progress-lbl">04</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ADVANCED FORMULATION & RESEARCH (`#science-details`) */}
      <section id="science-details" className="py-24 bg-[#e9e2d2]/60 border-b border-[#1b2a4d]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-20">

          {/* Bisglycinate Bond Diagram */}
          <div ref={bondRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
            <div className="lg:col-span-6 space-y-4">
              <h3 className="font-display text-3xl font-bold text-[#1b2a4d]">
                Not all magnesium<br />is created equal.
              </h3>
              <p className="text-base text-[#1b2a4d]/70 leading-relaxed font-light">
                Calmezy uses <strong className="text-[#1b2a4d]">magnesium bisglycinate</strong>, where magnesium is bound to glycine to encourage natural relaxation. Pediatricians appreciate this form because it is exceptionally gentle on young stomachs.
              </p>
              <p className="text-base text-[#1b2a4d]/70 leading-relaxed font-light">
                It works alongside your child's natural rhythm without stomach upset, delivering smooth and dependable support.
              </p>
            </div>

            {/* Interactive Bond Visual */}
            <div className="lg:col-span-6 p-10 rounded-3xl bg-[#fbf9f4] border border-[#1b2a4d]/10 shadow-lg text-center space-y-6">
              <div className="relative h-40 w-full max-w-sm mx-auto flex items-center justify-between px-4">
                {/* Magnesium Ion */}
                <div
                  className={`w-24 h-24 rounded-full bg-gradient-to-br from-[#e5c07f] via-[#c9973f] to-[#9c7530] text-[#0e1730] font-mono font-bold flex flex-col items-center justify-center shadow-lg transition-all duration-1000 ${
                    isBonded ? 'translate-x-6' : 'translate-x-0'
                  }`}
                >
                  <span className="text-lg">Mg²⁺</span>
                  <span className="text-[10px] uppercase opacity-75">Magnesium</span>
                </div>

                {/* Plus Sign */}
                <div
                  className={`w-8 h-8 rounded-full bg-[#1b2a4d] text-[#e5c07f] font-mono font-bold flex items-center justify-center transition-all duration-500 ${
                    isBonded ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                  }`}
                >
                  +
                </div>

                {/* Glycine Ion */}
                <div
                  className={`w-24 h-24 rounded-full bg-[#3d6ea5]/10 border-2 border-dashed border-[#3d6ea5]/40 text-[#3d6ea5] font-mono font-bold flex flex-col items-center justify-center transition-all duration-1000 ${
                    isBonded ? '-translate-x-6' : 'translate-x-0'
                  }`}
                >
                  <span className="text-lg">Gly</span>
                  <span className="text-[10px] uppercase opacity-75">Glycine ×2</span>
                </div>
              </div>
              <p
                className={`font-mono text-xs text-[#1b2a4d]/70 transition-all duration-700 ${
                  isBonded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
              >
                = <b>Magnesium Bisglycinate</b>: Gentle, easy to absorb, and effective
              </p>
            </div>
          </div>

          {/* Chamomile Bloom Section */}
          <div ref={bloomRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
            {/* SVG Chamomile Flower Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-72 h-72 sm:w-80 sm:h-80 relative">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  <defs>
                    <radialGradient id="bloomCenterGrad" cx="35%" cy="30%" r="75%">
                      <stop offset="0%" stopColor="#e5c07f" />
                      <stop offset="100%" stopColor="#9c7530" />
                    </radialGradient>
                  </defs>

                  {/* 10 Petals blooming open */}
                  <g>
                    {Array.from({ length: 10 }).map((_, i) => {
                      const angle = (360 / 10) * i;
                      return (
                        <ellipse
                          key={i}
                          cx="200"
                          cy="122"
                          rx="26"
                          ry="60"
                          fill="#fbf9f4"
                          stroke="rgba(27,42,77,0.12)"
                          strokeWidth="1"
                          style={{
                            transformOrigin: '200px 200px',
                            transform: isBloomOpen
                              ? `rotate(${angle}deg) scale(1)`
                              : `rotate(${angle - 40}deg) scale(0)`,
                            transition: `transform 1s cubic-bezier(.16,.84,.44,1) ${i * 45}ms`,
                          }}
                        />
                      );
                    })}
                  </g>

                  {/* Flower Center */}
                  <circle
                    cx="200"
                    cy="200"
                    r="34"
                    fill="url(#bloomCenterGrad)"
                    style={{
                      transformOrigin: '200px 200px',
                      transform: isBloomOpen ? 'scale(1)' : 'scale(0)',
                      transition: 'transform 0.6s cubic-bezier(.16,.84,.44,1) 0.5s',
                    }}
                  />
                </svg>
              </div>
            </div>

            {/* Chamomile Callouts */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="font-display text-3xl font-bold text-[#1b2a4d]">
                A flower with a<br />centuries-old job.
              </h3>

              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-[#fbf9f4] border border-[#1b2a4d]/10 space-y-2 shadow-sm">
                  <h4 className="font-display text-lg font-bold text-[#1b2a4d]">
                    Gentle &amp; Natural
                  </h4>
                  <p className="text-sm text-[#1b2a4d]/70 font-light">
                    Families have relied on chamomile for generations to ease evening restlessness without causing daytime grogginess or dependency.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#fbf9f4] border border-[#1b2a4d]/10 space-y-2 shadow-sm">
                  <h4 className="font-display text-lg font-bold text-[#1b2a4d]">
                    Scientifically Validated
                  </h4>
                  <p className="text-sm text-[#1b2a4d]/70 font-light">
                    Studies show chamomile can improve sleep quality and ease nervousness in children, working with the body's own calming mechanisms.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#fbf9f4] border border-[#1b2a4d]/10 space-y-2 shadow-sm">
                  <h4 className="font-display text-lg font-bold text-[#1b2a4d]">
                    Synergistic Effect
                  </h4>
                  <p className="text-sm text-[#1b2a4d]/70 font-light">
                    Combined with liposomal magnesium, it helps kids unwind gently at night while staying clear and focused during daytime hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Beyond Sleep Tags Cloud */}
          <div className="text-center space-y-6 pt-10 border-t border-[#1b2a4d]/10">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1b2a4d]">
              Comprehensive health benefits.
            </h3>
            <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
              <div className="px-6 py-3 rounded-full bg-[#fbf9f4] border border-[#1b2a4d]/15 font-semibold text-sm text-[#1b2a4d] shadow-sm flex items-center gap-2">
                <span>⚡</span> Energy Metabolism
              </div>
              <div className="px-6 py-3 rounded-full bg-[#fbf9f4] border border-[#1b2a4d]/15 font-semibold text-sm text-[#1b2a4d] shadow-sm flex items-center gap-2">
                <span>🧬</span> Protein Synthesis
              </div>
              <div className="px-6 py-3 rounded-full bg-[#fbf9f4] border border-[#1b2a4d]/15 font-semibold text-sm text-[#1b2a4d] shadow-sm flex items-center gap-2">
                <span>🌱</span> Healthy Development
              </div>
              <div className="px-6 py-3 rounded-full bg-[#fbf9f4] border border-[#1b2a4d]/15 font-semibold text-sm text-[#1b2a4d] shadow-sm flex items-center gap-2">
                <span>⚖️</span> Body Balance
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ADVANTAGE SECTION (`#advantage`) */}
      <section id="advantage" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto space-y-20">
        {/* Section Head */}
        <div className="max-w-3xl space-y-4">
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#1b2a4d] tracking-tight leading-tight">
            Six ways it supports<br />growing bodies.
          </h2>
          <p className="text-lg text-[#1b2a4d]/70 leading-relaxed font-light">
            Everything magnesium touches, arranged around what matters most: a calm mind in a healthy body.
          </p>
        </div>

        {/* 6-Way Advantage Grid / Wheel */}
        <div ref={wheelRef} className="space-y-12">
          {/* Hub Badge */}
          <div className="flex justify-center">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#25396a] via-[#1b2a4d] to-[#0e1730] text-[#f2efe7] flex flex-col items-center justify-center text-center p-4 shadow-xl border border-[#c9973f]/30">
              <Moon className="w-8 h-8 text-[#e5c07f] mb-1" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#f6f3ec]/70">
                The Advantage
              </span>
              <b className="font-display text-lg text-[#f2efe7]">6 Ways</b>
            </div>
          </div>

          {/* 6 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Psychological Well-being',
                desc: 'Supports normal psychological function and emotional balance during developmental years.',
              },
              {
                title: 'Nervous System Support',
                desc: 'Contributes to healthy nervous system function and helps regulate stress responses.',
              },
              {
                title: 'Reduces Tiredness',
                desc: 'Helps combat fatigue and supports consistent energy levels throughout the day.',
              },
              {
                title: 'Electrolyte Balance',
                desc: 'Maintains proper electrolyte balance essential for hydration and cellular function.',
              },
              {
                title: 'Bone & Teeth Health',
                desc: 'Supports the development and maintenance of strong bones and healthy teeth.',
              },
              {
                title: 'Muscle Function',
                desc: 'Promotes normal muscle function and helps prevent nighttime cramping or restlessness.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-3xl bg-[#fbf9f4] border border-[#1b2a4d]/10 hover:border-[#c9973f]/50 shadow-sm hover:shadow-xl transition-all duration-500 space-y-3 ${
                  isWheelVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <h4 className="font-display text-xl font-bold text-[#1b2a4d]">
                  {item.title}
                </h4>
                <p className="text-sm text-[#1b2a4d]/70 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Challenge Ring Stats */}
        <div ref={ringsRef} className="pt-12 border-t border-[#1b2a4d]/10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 3 Circular Ring Stats */}
          <div className="lg:col-span-6 grid grid-cols-3 gap-4 text-center">
            {/* Stat 1 */}
            <div className="flex flex-col items-center space-y-3">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="rgba(27,42,77,0.08)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="#c9973f"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="326"
                    style={{
                      strokeDashoffset: isRingsAnimated ? 326 - 0.08 * 326 : 326,
                      transition: 'stroke-dashoffset 1.4s cubic-bezier(.16,.84,.44,1)',
                    }}
                  />
                </svg>
                <span className="absolute font-mono font-bold text-sm sm:text-base text-[#1b2a4d]">
                  6–9%
                </span>
              </div>
              <h5 className="font-sans text-xs font-bold text-[#1b2a4d]">
                Global ADHD Prevalence
              </h5>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center space-y-3">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="rgba(27,42,77,0.08)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="#c9973f"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="326"
                    style={{
                      strokeDashoffset: isRingsAnimated ? 326 - 0.95 * 326 : 326,
                      transition: 'stroke-dashoffset 1.4s cubic-bezier(.16,.84,.44,1) 200ms',
                    }}
                  />
                </svg>
                <span className="absolute font-mono font-bold text-sm sm:text-base text-[#1b2a4d]">
                  300+
                </span>
              </div>
              <h5 className="font-sans text-xs font-bold text-[#1b2a4d]">
                Biochemical Processes
              </h5>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center space-y-3">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="rgba(27,42,77,0.08)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="#c9973f"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="326"
                    style={{
                      strokeDashoffset: isRingsAnimated ? 326 - 0.9 * 326 : 326,
                      transition: 'stroke-dashoffset 1.4s cubic-bezier(.16,.84,.44,1) 400ms',
                    }}
                  />
                </svg>
                <span className="absolute font-mono font-bold text-sm sm:text-base text-[#1b2a4d]">
                  5×
                </span>
              </div>
              <h5 className="font-sans text-xs font-bold text-[#1b2a4d]">
                Liposomal Absorption Edge
              </h5>
            </div>
          </div>

          {/* Copy Side */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <h4 className="font-display text-xl font-bold text-[#1b2a4d]">
                The growing need
              </h4>
              <p className="text-sm text-[#1b2a4d]/70 leading-relaxed font-light">
                Hyperactivity and attention challenges affect millions of children worldwide, touching focus, behavior, and sleep alike. Parents are increasingly looking for support that's both effective and gentle.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-display text-xl font-bold text-[#1b2a4d]">
                What parents are asking for
              </h4>
              <p className="text-sm text-[#1b2a4d]/70 leading-relaxed font-light">
                Families want natural options that support healthy growth without harsh chemicals, yet standard supplements often struggle with poor absorption or low-quality ingredients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BUILT FOR KIDS SECTION (`#kids`) */}
      <section id="kids" className="py-24 bg-[#e9e2d2]/60 border-t border-b border-[#1b2a4d]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-16">
          {/* Head */}
          <div className="max-w-3xl space-y-4">
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#1b2a4d] tracking-tight leading-tight">
              Made for busy minds<br />and small hands.
            </h2>
            <p className="text-lg text-[#1b2a4d]/70 leading-relaxed font-light">
              Calmezy is designed for real childhood schedules, including active days, energetic evenings, and a simple nightly routine.
            </p>
          </div>

          {/* 4 Feature Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-[#1b2a4d] text-[#e5c07f] flex items-center justify-center shrink-0 shadow-sm">
                <Brain className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-xl font-bold text-[#1b2a4d]">
                  Support for Active Minds
                </h4>
                <p className="text-sm text-[#1b2a4d]/70 font-light leading-relaxed">
                  Formulated for hyperactive and easily distracted children using gentle, natural botanicals rather than harsh alternatives.
                </p>
              </div>
            </div>

            <div className="flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-[#1b2a4d] text-[#e5c07f] flex items-center justify-center shrink-0 shadow-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-xl font-bold text-[#1b2a4d]">
                  Brain Development
                </h4>
                <p className="text-sm text-[#1b2a4d]/70 font-light leading-relaxed">
                  Supports healthy cognitive growth during important childhood years, complementing a balanced diet.
                </p>
              </div>
            </div>

            <div className="flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-[#1b2a4d] text-[#e5c07f] flex items-center justify-center shrink-0 shadow-sm">
                <Droplet className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-xl font-bold text-[#1b2a4d]">
                  Easy Administration
                </h4>
                <p className="text-sm text-[#1b2a4d]/70 font-light leading-relaxed">
                  A pleasant syrup that makes daily care effortless, with just one measured milliliter and no pills to negotiate.
                </p>
              </div>
            </div>

            <div className="flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-[#1b2a4d] text-[#e5c07f] flex items-center justify-center shrink-0 shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-xl font-bold text-[#1b2a4d]">
                  Clean Formula
                </h4>
                <p className="text-sm text-[#1b2a4d]/70 font-light leading-relaxed">
                  Allergen-free with no artificial colors or synthetic preservatives, ideal for confident daily use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. DOSAGE SECTION (`#dosage`) */}
      <section id="dosage" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto space-y-20">
        {/* Head */}
        <div className="max-w-3xl space-y-4">
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#1b2a4d] tracking-tight leading-tight">
            Simple, age-appropriate<br />dosing.
          </h2>
          <p className="text-lg text-[#1b2a4d]/70 leading-relaxed font-light">
            Select an age group to view the recommended daily dose on the calibrated dropper.
          </p>
        </div>

        {/* Interactive Dosage Meter Panel with SVG Dropper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Age Selection Buttons */}
          <div className="lg:col-span-6 space-y-4">
            {dosageOptions.map((opt) => {
              const isSelected = activeDose.id === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setActiveDose(opt)}
                  className={`w-full p-6 rounded-2xl border-2 text-left flex items-center justify-between transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#25396a] via-[#1b2a4d] to-[#0e1730] border-[#1b2a4d] text-[#f2efe7] shadow-xl translate-x-2'
                      : 'bg-[#fbf9f4] border-[#1b2a4d]/10 hover:border-[#c9973f]/50 text-[#1b2a4d]'
                  }`}
                >
                  <div>
                    <span className="font-display text-lg font-bold block">
                      {opt.ageLabel}
                    </span>
                    <span
                      className={`font-mono text-xs uppercase tracking-wider block mt-1 ${
                        isSelected ? 'text-[#f6f3ec]/70' : 'text-[#1b2a4d]/50'
                      }`}
                    >
                      {opt.subLabel}
                    </span>
                  </div>
                  <span
                    className={`font-mono font-bold text-xl ${
                      isSelected ? 'text-[#e5c07f]' : 'text-[#9c7530]'
                    }`}
                  >
                    {opt.ml} ml
                  </span>
                </button>
              );
            })}
          </div>

          {/* Meter Readout Box - SVG Dropper */}
          <div className="lg:col-span-6 p-10 rounded-3xl bg-[#fbf9f4] border border-[#1b2a4d]/10 shadow-lg text-center space-y-6 flex flex-col items-center">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#9c7530] block">
              Daily Dose
            </span>

            {/* Dosage Visual SVG Dropper */}
            <svg className="w-36 h-56" viewBox="0 0 120 220" fill="none">
              <path d="M45 8h30l-4 34H49L45 8z" fill="#1b2a4d" />
              <rect x="52" y="40" width="16" height="14" fill="#1b2a4d" />
              <path
                d="M40 54h40l-6 90a14 14 0 01-14 12h0a14 14 0 01-14-12l-6-90z"
                fill="#fbf9f4"
                stroke="#1b2a4d"
                strokeWidth="2"
              />
              <clipPath id="doseFillClipCalm">
                <path d="M40 54h40l-6 90a14 14 0 01-14 12h0a14 14 0 01-14-12l-6-90z" />
              </clipPath>
              <rect
                id="doseFillRectCalm"
                x="34"
                y={activeDose.y}
                width="52"
                height={activeDose.height}
                fill="#c9973f"
                clipPath="url(#doseFillClipCalm)"
                style={{ transition: 'y 0.8s ease-out, height 0.8s ease-out' }}
              />
              <line x1="46" y1="80" x2="52" y2="80" stroke="rgba(27,42,77,0.4)" strokeWidth="1.5" />
              <line x1="46" y1="110" x2="52" y2="110" stroke="rgba(27,42,77,0.4)" strokeWidth="1.5" />
              <line x1="46" y1="140" x2="52" y2="140" stroke="rgba(27,42,77,0.4)" strokeWidth="1.5" />
            </svg>

            {/* Readout Number */}
            <div className="font-mono font-extrabold text-5xl sm:text-6xl text-[#1b2a4d]">
              {activeDose.ml} <span className="text-xl font-semibold text-[#1b2a4d]/50">ml</span>
            </div>

            {/* Echo Selected Age */}
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#9c7530]">
              {activeDose.ageLabel} ({activeDose.subLabel})
            </div>

            <p className="text-xs text-[#1b2a4d]/60 font-mono max-w-xs leading-relaxed">
              Always follow your pediatrician's guidance for exact dosing.
            </p>
          </div>
        </div>

        {/* The Nightly Ritual Steps */}
        <div className="space-y-10 pt-12 border-t border-[#1b2a4d]/10">
          <div className="space-y-2">
            <h3 className="font-display text-3xl font-bold text-[#1b2a4d]">
              How to use Calmezy.
            </h3>
          </div>

          <div className="space-y-6">
            <div className="flex gap-6 pb-6 border-b border-[#1b2a4d]/10 items-start">
              <span className="font-mono text-sm font-bold text-[#9c7530] pt-1">
                01
              </span>
              <div className="space-y-1">
                <h4 className="font-display text-xl font-bold text-[#1b2a4d]">
                  Measure the daily dose
                </h4>
                <p className="text-sm text-[#1b2a4d]/70 font-light leading-relaxed">
                  Each serving provides 20mg of liposomal magnesium and 3mg of chamomile, carefully measured for children ages 1 and up.
                </p>
              </div>
            </div>

            <div className="flex gap-6 pb-6 border-b border-[#1b2a4d]/10 items-start">
              <span className="font-mono text-sm font-bold text-[#9c7530] pt-1">
                02
              </span>
              <div className="space-y-1">
                <h4 className="font-display text-xl font-bold text-[#1b2a4d]">
                  Give it your way
                </h4>
                <p className="text-sm text-[#1b2a4d]/70 font-light leading-relaxed">
                  Take it directly from the dropper, or mix 1ml of Calmezy into 5ml of water or fruit juice for easier sipping.
                </p>
              </div>
            </div>

            <div className="flex gap-6 pb-6 border-b border-[#1b2a4d]/10 items-start">
              <span className="font-mono text-sm font-bold text-[#9c7530] pt-1">
                03
              </span>
              <div className="space-y-1">
                <h4 className="font-display text-xl font-bold text-[#1b2a4d]">
                  Keep it consistent
                </h4>
                <p className="text-sm text-[#1b2a4d]/70 font-light leading-relaxed">
                  Best results come from daily use. A steady routine supports improved focus, calm, and more restful sleep over time.
                </p>
              </div>
            </div>
          </div>

          {/* Pro Tip Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#1b2a4d] text-[#f2efe7] flex items-start gap-4 shadow-lg">
            <Info className="w-6 h-6 text-[#e5c07f] shrink-0 mt-0.5" />
            <p className="text-sm font-light text-[#f6f3ec]/90 leading-relaxed">
              <strong className="text-[#e5c07f] font-semibold">Pro tip:</strong> give Calmezy at the same time each evening to build a healthy bedtime routine. Many parents find it works best given shortly before the wind-down begins.
            </p>
          </div>
        </div>
      </section>

      {/* 8. TRUST SECTION (`#trust`) */}
      <section id="trust" className="py-24 bg-[#e9e2d2]/60 border-t border-b border-[#1b2a4d]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-16">
          {/* Head */}
          <div className="max-w-3xl space-y-4">
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#1b2a4d] tracking-tight leading-tight">
              Three reasons it earns<br />a place on the nightstand.
            </h2>
          </div>

          {/* 3 Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#fbf9f4] border border-[#1b2a4d]/10 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#e5c07f] via-[#c9973f] to-[#9c7530] text-[#0e1730] flex items-center justify-center shadow-md">
                <Moon className="w-7 h-7" />
              </div>
              <h4 className="font-display text-xl font-bold text-[#1b2a4d]">
                Better Sleep Quality
              </h4>
              <p className="text-sm text-[#1b2a4d]/70 font-light leading-relaxed">
                Gentle support for natural sleep patterns, without harsh sedatives.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#fbf9f4] border border-[#1b2a4d]/10 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#e5c07f] via-[#c9973f] to-[#9c7530] text-[#0e1730] flex items-center justify-center shadow-md">
                <Sparkles className="w-7 h-7" />
              </div>
              <h4 className="font-display text-xl font-bold text-[#1b2a4d]">
                Superior Absorption
              </h4>
              <p className="text-sm text-[#1b2a4d]/70 font-light leading-relaxed">
                Liposomal technology means maximum benefit from every measured dose.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#fbf9f4] border border-[#1b2a4d]/10 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#e5c07f] via-[#c9973f] to-[#9c7530] text-[#0e1730] flex items-center justify-center shadow-md">
                <Flower2 className="w-7 h-7" />
              </div>
              <h4 className="font-display text-xl font-bold text-[#1b2a4d]">
                Natural Ingredients
              </h4>
              <p className="text-sm text-[#1b2a4d]/70 font-light leading-relaxed">
                Trusted botanicals, combined thoughtfully with essential minerals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
