import React, { useState, useEffect, useRef } from 'react';
import tetsuKidsImg from '../assets/Tetsu-Kids.png';
import tetsuEncapsulationImg from '../assets/tetsu_encapsulation.jpg';
import tetsuProtectionImg from '../assets/tetsu_protection.jpg';
import tetsuDeliveryImg from '../assets/tetsu_delivery.jpg';
import tetsuBioavailabilityImg from '../assets/tetsu_bioavailability.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, X, Sparkles, TrendingUp, ShieldCheck, Sun, ArrowUp, Plus, Shield } from 'lucide-react';
import { Footer } from '../components/Footer';
import { scrollToContact } from '../utils/scrollToContact';

// Absorbability Iron Data (15 Iron Salts)
const absorbData = [
  { name: 'Ferrous bis-glycinate (TETSU-KIDZ)', value: 199, hero: true },
  { name: 'Ferrous succinate', value: 123, hero: false },
  { name: 'Ferrous fumarate', value: 101, hero: false },
  { name: 'Ferrous glycine sulphate', value: 101, hero: false },
  { name: 'Ferrous sulfate (Standard)', value: 100, hero: false },
  { name: 'Ferrous glutamate', value: 97, hero: false },
  { name: 'Ferrous gluconate', value: 89, hero: false },
  { name: 'Ferrous citrate', value: 74, hero: false },
  { name: 'Carbonyl iron', value: 70, hero: false },
  { name: 'Ferrous tartrate', value: 62, hero: false },
  { name: 'Ferrous pyrophosphate', value: 59, hero: false },
  { name: 'Ferric sulphate', value: 39, hero: false },
  { name: 'Ferric cholinisocitrate', value: 38, hero: false },
  { name: 'Ferric citrate', value: 31, hero: false },
  { name: 'NaFeEDTA', value: 24, hero: false }
];

// Dosage options from tetsu.html
const dosageOptions = [
  { id: 'infant', ageLabel: '6–12 Months', subLabel: 'Infant', ml: 0.5, y: 135, height: 19 },
  { id: 'toddler', ageLabel: '1–3 Years', subLabel: 'Toddler', ml: 1.0, y: 116, height: 38 },
  { id: 'early', ageLabel: '4–6 Years', subLabel: 'Early Childhood', ml: 1.5, y: 97, height: 57 },
  { id: 'middle', ageLabel: '7–9 Years', subLabel: 'Middle Childhood', ml: 2.5, y: 58, height: 96 }
];

export const TetsuKidzDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeDose, setActiveDose] = useState(dosageOptions[0]);
  const [comparePercent, setComparePercent] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [animateChart, setAnimateChart] = useState(false);

  const chartRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const techWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Bioavailability chart observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimateChart(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    // 4-stage image switcher scrollytelling
    const wrap = techWrapRef.current;
    const steps = document.querySelectorAll('.tech-step');

    if (wrap && steps.length) {
      const updateStage = (stageStr: string) => {
        wrap.setAttribute('data-stage', stageStr);
        const stageNum = parseInt(stageStr, 10);
        const imgs = wrap.querySelectorAll('.tech-stage-img');
        imgs.forEach((img, idx) => {
          (img as HTMLElement).style.opacity = (idx + 1 === stageNum) ? '1' : '0';
        });
      };

      const techIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const stage = (entry.target as HTMLElement).dataset.step || '1';
              updateStage(stage);
              steps.forEach((s) => {
                s.classList.toggle('is-active', s === entry.target);
              });
            }
          });
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      );

      steps.forEach((s) => {
        techIO.observe(s);
        s.addEventListener('click', () => {
          const stage = (s as HTMLElement).dataset.step || '1';
          updateStage(stage);
          steps.forEach((st) => {
            st.classList.toggle('is-active', st === s);
          });
        });
      });
    }

    return () => observer.disconnect();
  }, []);

  // Drag Compare Slider Event Handlers with Full 0% - 100% Range
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updateSliderPct(e.clientX);
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch (err) {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      updateSliderPct(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (err) {}
  };

  const updateSliderPct = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const rawPct = ((clientX - rect.left) / rect.width) * 100;
    const clampedPct = Math.max(0, Math.min(100, rawPct));
    setComparePercent(clampedPct);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToContact(navigate);
  };

  return (
    <div className="tetsu-kidz-exact min-h-screen bg-[#F2EFE7] text-[#1B2A4D] font-sans selection:bg-[#C9973F] selection:text-[#F2EFE7]">
      {/* Scoped exact styles from tetsu.html */}
      <style>{`
        .tetsu-kidz-exact {
          --navy: #A61C24;
          --navy-deep: #5b0f13;
          --navy-2: #8a171e;
          --navy-3: #a61c24;
          --gold: #c9973f;
          --gold-light: #e5c07f;
          --gold-deep: #9c7530;
          --cream: #f2efe7;
          --cream-2: #e9e2d2;
          --paper: #fbf9f4;
          --slate: #a61c24;
          --rust: #93453e;
          --ink: #A61C24;
          --ink-soft: rgba(166,28,36,.66);
          --ink-faint: rgba(166,28,36,.42);
          --on-navy: #f6f3ec;
          --on-navy-soft: rgba(246,243,236,.72);
          --on-navy-faint: rgba(246,243,236,.46);
          --grad-gold: linear-gradient(135deg,#e5c07f,#c9973f 60%,#9c7530);
          --grad-navy: linear-gradient(155deg,#8a171e,#a61c24 55%,#5b0f13);
          --font-display: 'Space Grotesk', sans-serif;
          --font-body: 'Instrument Sans', sans-serif;
          --font-mono: 'IBM Plex Mono', monospace;
          --radius-lg: 32px;
          --radius-md: 20px;
          --radius-pill: 999px;
          --shadow-card: 0 26px 60px -30px rgba(91,15,19,.4);
          --shadow-gold: 0 14px 34px -10px rgba(201,151,63,.55);
        }

        /* ---------------- technology scrollytelling exact CSS ---------------- */
        .tech-intro { margin-top: 40px; }
        .tech-scroll { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 50px; margin-top: 48px; }
        .tech-visual-col { position: relative; }
        .tech-visual-wrap {
          position: sticky; top: 18vh; height: 52vh; min-height: 380px; max-height: 480px; border-radius: var(--radius-lg);
          background: #5b0f13; display: flex; align-items: center; justify-content: center;
          overflow: hidden; box-shadow: var(--shadow-card); border: 1px solid rgba(201,151,63,.3);
          padding: 8px;
        }
        .tech-stage-img { object-fit: contain !important; background-color: #5b0f13; padding: 4px; }
        .tech-stage-tag {
          position: absolute; left: 20px; bottom: 20px; font-family: var(--font-mono); color: var(--gold-light);
          font-size: .72rem; letter-spacing: .09em; text-transform: uppercase; display: flex; align-items: center; gap: 10px;
          background: rgba(166,28,36,.85); backdrop-filter: blur(8px); padding: 5px 14px; border-radius: 999px; border: 1px solid rgba(201,151,63,.4);
        }
        .tech-stage-tag b { font-size: 1.25rem; color: #C9973F; font-family: var(--font-mono); }
        
        .tech-steps { display: flex; flex-direction: column; }

        /* Clean unboxed scrollytelling steps with NO border lines */
        .tech-step {
          min-height: 35vh; display: flex; flex-direction: column; justify-content: center;
          padding: 20px 0; border: none; margin-bottom: 24px;
          cursor: pointer; opacity: .45; transition: opacity .4s ease;
        }
        .tech-step.is-active { opacity: 1; }
        .tech-step .step-num { font-family: var(--font-mono); color: var(--gold-deep); font-size: .82rem; letter-spacing: .1em; font-weight: 700; text-transform: uppercase; }
        .tech-step.is-active .step-num { color: #C9973F; }
        .tech-step h4 { font-size: clamp(1.35rem,2.4vw,1.9rem); margin-top: 8px; color: #1B2A4D; font-weight: 800; font-family: var(--font-display); line-height: 1.25; }
        .tech-step p { margin-top: 10px; font-size: .98rem; max-width: 44ch; color: #7C8AA0; font-weight: 350; line-height: 1.6; }
        .tech-step .step-stat { margin-top: 14px; font-family: var(--font-mono); font-size: .82rem; color: #C9973F; font-weight: 700; text-transform: uppercase; }

        /* Liposome Sunburst Keyframe Mechanics */
        .lipo-assembly { transition: transform 1.15s cubic-bezier(.16,.84,.44,1); }
        [data-stage="3"] .lipo-assembly, [data-stage="4"] .lipo-assembly { transform: translateX(26px); }
        .lipo-core { transition: r 1s cubic-bezier(.16,.84,.44,1); }
        .lipo-petal { transition: opacity .6s ease, transform .8s cubic-bezier(.16,.84,.44,1); transform-origin: center; }
        .lipo-shield { opacity: 0; transition: opacity .7s ease; }
        .lipo-membrane { opacity: 0; transition: opacity .7s ease, transform .9s cubic-bezier(.16,.84,.44,1); transform: translateX(30px); }
        .lipo-flow { opacity: 0; transition: opacity .7s ease; }
        .lipo-bignum { opacity: 0; transition: opacity .7s ease .2s; }

        [data-stage="2"] .lipo-shield { opacity: 1; }
        [data-stage="3"] .lipo-membrane { opacity: 1; transform: translateX(0); }
        [data-stage="3"] .lipo-petal.contact { opacity: .25; }
        [data-stage="4"] .lipo-flow { opacity: 1; }
        [data-stage="4"] .lipo-bignum { opacity: 1; }
        [data-stage="4"] .lipo-petal { opacity: .18; transform: scale(.82); }
        [data-stage="4"] .lipo-core { r: 26px; }

        @media (max-width: 900px) {
          .tech-scroll { grid-template-columns: 1fr; }
          .tech-visual-wrap { position: static; height: 50vh; min-height: 340px; margin-bottom: 24px; }
          .tech-step { min-height: 0; opacity: 1; }
        }
      `}</style>


      {/* 2. HERO SECTION — full-bleed deep red gradient, glow blobs, glass benefit cards */}
      <section
        id="overview"
        className="relative overflow-hidden py-20 sm:py-28 px-6 sm:px-12"
        style={{ background: 'linear-gradient(155deg,#8a171e,#a61c24 55%,#5b0f13)' }}
      >
        {/* Ambient glow blobs */}
        <div
          className="pointer-events-none absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full blur-[110px] opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(201,151,63,0.55), transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-40 -right-16 w-[460px] h-[460px] rounded-full blur-[110px] opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(229,192,127,0.35), transparent 70%)' }}
        />
        {/* Subtle grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(242,239,231,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(242,239,231,0.6) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 75%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Product Information */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-5">
              <h1 className="font-display text-5xl sm:text-7xl font-extrabold text-[#F2EFE7] tracking-tight leading-[0.95]">
                TETSU-<span className="text-[#E5C07F]">KIDZ</span>
              </h1>
              <p className="font-mono text-sm sm:text-base font-bold text-[#E5C07F]">
                Liposomal Ferrous Bis-Glycinate + Liposomal Vitamin C Syrup
              </p>
              <p className="text-[#F2EFE7]/70 font-light text-base sm:text-xl leading-relaxed max-w-xl">
                A breakthrough pediatric formulation delivering 199% bioavailability. Micro-encapsulated in dual-layer liposomes to eliminate metallic taste, stomach irritation, and tooth staining.
              </p>
            </div>
          </div>

          {/* Right Column: Product image with glow halo + floating stat badge */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div
              className="pointer-events-none absolute w-[380px] h-[380px] rounded-full blur-[90px] opacity-70"
              style={{ background: 'radial-gradient(circle, rgba(201,151,63,0.5), transparent 70%)' }}
            />
            <img
              src={tetsuKidsImg}
              alt="TETSU-KIDZ Product"
              className="relative w-full max-w-[440px] h-auto object-contain filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* 3. FOUR REASONS PEDIATRICIANS ARE SWITCHING SECTION */}
      <section id="reasons" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto border-b border-[#A61C24]/15 space-y-12">
        <div className="space-y-3">
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#A61C24] leading-tight">
            Four reasons pediatricians<br />are switching.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: First in India */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#FBF9F4] border border-[#A61C24]/10 shadow-lg space-y-6 hover:shadow-xl transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#A61C24] text-[#C9973F] flex items-center justify-center shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <h3 className="font-display text-2xl font-extrabold text-[#A61C24]">
                First in India
              </h3>
              <p className="text-[#7C8AA0] font-light text-base leading-relaxed">
                The pioneering combination of liposomal ferrous bis-glycinate and liposomal vitamin C, formulated specifically for pediatric use.
              </p>
            </div>
          </div>

          {/* Card 2: Highest Bioavailability */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#FBF9F4] border border-[#A61C24]/10 shadow-lg space-y-6 hover:shadow-xl transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#A61C24] text-[#C9973F] flex items-center justify-center shadow-md">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <h3 className="font-display text-2xl font-extrabold text-[#A61C24]">
                Highest Bioavailability
              </h3>
              <p className="text-[#7C8AA0] font-light text-base leading-relaxed">
                Ferrous bis-glycinate paired with nano-liposomal technology, engineered for maximum iron absorption at the cellular level.
              </p>
            </div>
          </div>

          {/* Card 3: Gentle on the Gut */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#FBF9F4] border border-[#A61C24]/10 shadow-lg space-y-6 hover:shadow-xl transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#A61C24] text-[#C9973F] flex items-center justify-center shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <h3 className="font-display text-2xl font-extrabold text-[#A61C24]">
                Gentle on the Gut
              </h3>
              <p className="text-[#7C8AA0] font-light text-base leading-relaxed">
                Superior tolerability reduces the GI side effects that are common when young children are put on standard iron therapy.
              </p>
            </div>
          </div>

          {/* Card 4: Enhanced Absorption */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#FBF9F4] border border-[#A61C24]/10 shadow-lg space-y-6 hover:shadow-xl transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#A61C24] text-[#C9973F] flex items-center justify-center shadow-md">
              <Sun className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <h3 className="font-display text-2xl font-extrabold text-[#A61C24]">
                Enhanced Absorption
              </h3>
              <p className="text-[#7C8AA0] font-light text-base leading-relaxed">
                Liposomal vitamin C works alongside the iron rather than just accompanying it, actively boosting uptake, molecule for molecule.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "Not all iron is absorbed equally." COMPARISON TABLE */}
      <section id="table" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto border-b border-[#A61C24]/15 space-y-12">
        <div className="space-y-3">
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#A61C24] leading-tight">
            Not all iron is<br />absorbed equally.
          </h2>
          <p className="text-[#7C8AA0] font-light text-base sm:text-lg max-w-3xl leading-relaxed">
            Understanding the differences between iron compounds is the difference between a supplement a child tolerates, and one a parent gives up on after a week.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="space-y-4 overflow-x-auto">
          {/* Table Header Row */}
          <div className="grid grid-cols-12 gap-4 px-8 py-3 font-mono text-xs font-bold text-[#7C8AA0] uppercase tracking-wider min-w-[840px]">
            <div className="col-span-4">IRON SALT</div>
            <div className="col-span-2">BIOAVAILABILITY</div>
            <div className="col-span-4">GI TOLERABILITY</div>
            <div className="col-span-2">DOSING FREQUENCY</div>
          </div>

          {/* Row 1: Ferrous Sulfate */}
          <div className="grid grid-cols-12 gap-4 items-center px-8 py-6 rounded-2xl bg-[#FBF9F4] border border-[#A61C24]/10 min-w-[840px]">
            <div className="col-span-4 font-display font-bold text-lg text-[#A61C24] whitespace-nowrap">
              Ferrous Sulfate
            </div>
            <div className="col-span-2">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#93453E]/10 text-[#93453E] font-sans font-medium text-sm whitespace-nowrap">
                Low &ndash; Moderate
              </span>
            </div>
            <div className="col-span-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#93453E]/10 text-[#93453E] font-sans font-medium text-sm whitespace-nowrap">
                Poor
              </span>
            </div>
            <div className="col-span-2 font-mono text-sm text-[#7C8AA0] whitespace-nowrap">
              2&ndash;3&times; daily
            </div>
          </div>

          {/* Row 2: Ferrous Fumarate */}
          <div className="grid grid-cols-12 gap-4 items-center px-8 py-6 rounded-2xl bg-[#FBF9F4] border border-[#A61C24]/10 min-w-[840px]">
            <div className="col-span-4 font-display font-bold text-lg text-[#A61C24] whitespace-nowrap">
              Ferrous Fumarate
            </div>
            <div className="col-span-2">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#3D6EA5]/15 text-[#3D6EA5] font-sans font-medium text-sm whitespace-nowrap">
                Moderate
              </span>
            </div>
            <div className="col-span-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#93453E]/10 text-[#93453E] font-sans font-medium text-sm whitespace-nowrap">
                Poor &ndash; constipation, nausea
              </span>
            </div>
            <div className="col-span-2 font-mono text-sm text-[#7C8AA0] whitespace-nowrap">
              2&ndash;3&times; daily
            </div>
          </div>

          {/* Row 3: Ferric Hydroxide */}
          <div className="grid grid-cols-12 gap-4 items-center px-8 py-6 rounded-2xl bg-[#FBF9F4] border border-[#A61C24]/10 min-w-[840px]">
            <div className="col-span-4 font-display font-bold text-lg text-[#A61C24] whitespace-nowrap">
              Ferric Hydroxide
            </div>
            <div className="col-span-2">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#93453E]/10 text-[#93453E] font-sans font-medium text-sm whitespace-nowrap">
                Low
              </span>
            </div>
            <div className="col-span-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#3D6EA5]/15 text-[#3D6EA5] font-sans font-medium text-sm whitespace-nowrap">
                Moderate
              </span>
            </div>
            <div className="col-span-2 font-mono text-sm text-[#7C8AA0] whitespace-nowrap">
              2&times; daily
            </div>
          </div>

          {/* Row 4: TETSU-KIDZ Hero Row */}
          <div className="grid grid-cols-12 gap-4 items-center px-8 py-6 rounded-2xl bg-[#A61C24] text-[#F2EFE7] border border-[#C9973F]/40 shadow-2xl min-w-[840px]">
            <div className="col-span-4 font-display font-bold text-lg flex items-center gap-3 text-[#C9973F] whitespace-nowrap">
              <span className="whitespace-nowrap">Ferrous Bis-Glycinate</span>
              <span className="px-2.5 py-0.5 rounded-md bg-[#08090D] text-[#C9973F] font-mono text-xs font-semibold border border-[#C9973F]/30 shrink-0 whitespace-nowrap">
                Tetsu-Kidz
              </span>
            </div>
            <div className="col-span-2">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#C9973F]/20 text-[#C9973F] font-sans font-semibold text-sm border border-[#C9973F]/40 whitespace-nowrap">
                Highest
              </span>
            </div>
            <div className="col-span-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#C9973F]/20 text-[#C9973F] font-sans font-semibold text-sm border border-[#C9973F]/40 whitespace-nowrap">
                Excellent &ndash; minimal side effects
              </span>
            </div>
            <div className="col-span-2 font-mono text-sm font-bold text-[#F2EFE7] whitespace-nowrap">
              Once daily
            </div>
          </div>
        </div>
      </section>

      {/* 5. "Why add vitamin C?" SECTION */}
      <section id="vitaminc" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto border-b border-[#A61C24]/15 space-y-12">
        <div className="space-y-3">
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#A61C24]">
            Why add vitamin C?
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Highlight Cards & 4 Bullets */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-2xl bg-[#A61C24] text-[#F2EFE7] border border-[#C9973F]/30 shadow-lg text-base sm:text-lg">
              Vitamin C (sodium ascorbate) is a <strong className="text-[#C9973F]">crucial cofactor</strong> for iron absorption.
            </div>

            <div className="p-6 rounded-2xl bg-[#A61C24] text-[#F2EFE7] border border-[#C9973F]/30 shadow-lg text-base sm:text-lg">
              The liposomal form ensures both nutrients are delivered <strong className="text-[#C9973F]">together, at the cellular level</strong>.
            </div>

            {/* List of 4 Benefit Bullets */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#A61C24] text-[#C9973F] flex items-center justify-center shrink-0 shadow-md">
                  <ArrowRight className="w-5 h-5" />
                </div>
                <p className="text-[#7C8AA0] font-light text-base pt-1.5">
                  Converts ferric iron (Fe³⁺) into its absorbable ferrous form (Fe²⁺)
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#A61C24] text-[#C9973F] flex items-center justify-center shrink-0 shadow-md">
                  <Plus className="w-5 h-5" />
                </div>
                <p className="text-[#7C8AA0] font-light text-base pt-1.5">
                  Forms soluble iron complexes directly in the intestine
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#A61C24] text-[#C9973F] flex items-center justify-center shrink-0 shadow-md">
                  <ArrowUp className="w-5 h-5" />
                </div>
                <p className="text-[#7C8AA0] font-light text-base pt-1.5">
                  Enhance transferrin binding and cellular uptake
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#A61C24] text-[#C9973F] flex items-center justify-center shrink-0 shadow-md">
                  <Shield className="w-5 h-5" />
                </div>
                <p className="text-[#7C8AA0] font-light text-base pt-1.5">
                  Protects against oxidative stress in the gut
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Iron Conversion Graphical Visual Card */}
          <div className="lg:col-span-6">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#FBF9F4] border border-[#A61C24]/10 shadow-2xl space-y-8 text-center flex flex-col items-center justify-center">
              <span className="font-mono text-xs font-bold text-[#C9973F] uppercase tracking-widest block">
                IRON CONVERSION
              </span>

              {/* Conversion Diagram */}
              <div className="flex items-center justify-center gap-4 sm:gap-8 py-4">
                {/* Fe3+ Ferric Circle */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#93453E]/10 border-2 border-dashed border-[#93453E]/40 flex flex-col items-center justify-center text-center">
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#93453E]">
                    Fe<sup>3+</sup>
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs font-bold text-[#93453E] uppercase tracking-wider mt-1">
                    FERRIC
                  </span>
                </div>

                {/* Arrow + Vitamin C text */}
                <div className="flex flex-col items-center justify-center space-y-1">
                  <ArrowRight className="w-8 h-8 text-[#A61C24]" />
                  <span className="font-mono text-[10px] sm:text-xs font-bold text-[#7C8AA0] uppercase tracking-widest">
                    + VITAMIN C
                  </span>
                </div>

                {/* Fe2+ Ferrous Solid Gold Sphere */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#E5C07F] via-[#C9973F] to-[#9C7530] flex flex-col items-center justify-center text-center shadow-2xl border border-[#C9973F]/40">
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#08090D]">
                    Fe<sup>2+</sup>
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs font-bold text-[#08090D] uppercase tracking-wider mt-1">
                    FERROUS
                  </span>
                </div>
              </div>

              {/* Caption */}
              <p className="text-[#7C8AA0] font-light text-sm sm:text-base max-w-md leading-relaxed">
                Only the ferrous form (Fe<sup>2+</sup>) can cross the intestinal wall, and vitamin C makes the conversion happen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BIOAVAILABILITY BAR CHART */}
      <section id="science" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto border-b border-[#A61C24]/15 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#A61C24]">
            Relative Bioavailability Comparison
          </h2>
          <p className="text-[#7C8AA0] font-light text-base sm:text-lg">
            Higher values indicate greater absorption into the bloodstream per milligram of elemental iron.
          </p>
        </div>

        {/* Bar Chart Container */}
        <div ref={chartRef} className="p-8 sm:p-12 rounded-3xl bg-[#A61C24] text-[#F2EFE7] border border-[#C9973F]/30 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#C9973F]/20 pb-4 font-mono text-xs text-[#C9973F]">
            <span>IRON FORMULATION</span>
            <span>RELATIVE BIOAVAILABILITY (% COMPARED TO FERROUS SULFATE)</span>
          </div>

          <div className="space-y-6 pt-2">
            {[
              { name: 'Ferrous Sulfate (Standard)', value: 100, hero: false },
              { name: 'Ferrous Fumarate', value: 110, hero: false },
              { name: 'Ferric Hydroxide Polymaltose', value: 115, hero: false },
              { name: 'Ferrous Bis-Glycinate (TETSU-KIDZ)', value: 199, hero: true },
            ].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between font-mono text-xs">
                  <span className={item.hero ? 'text-[#C9973F] font-bold text-sm' : 'text-[#F2EFE7]'}>
                    {item.name}
                  </span>
                  <span className={item.hero ? 'text-[#C9973F] font-bold text-sm' : 'text-[#7C8AA0]'}>
                    {item.value}%
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#08090D] overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                      item.hero ? 'bg-[#C9973F]' : 'bg-[#7C8AA0]/40'
                    }`}
                    style={{ width: animateChart ? `${(item.value / 200) * 100}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. DRAG-TO-COMPARE SLIDER SECTION */}
      <section id="compare" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto border-b border-[#A61C24]/15 space-y-12">
        <div className="space-y-3">
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#A61C24]">
            Traditional iron vs.<br />nano-liposomal iron.
          </h2>
          <p className="text-[#7C8AA0] font-light text-base sm:text-lg max-w-2xl leading-relaxed">
            Drag the divider to compare conventional oral iron syrups against TETSU-KIDZ's advanced liposomal formulation.
          </p>
        </div>

        {/* Interactive Comparison Slider */}
        <div className="space-y-4">
          <div
            ref={sliderRef}
            className="relative min-h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-[#A61C24]/10 select-none cursor-ew-resize touch-y-pan"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {/* Base Layer: Conventional Iron Syrups */}
            <div className="w-full p-8 sm:p-12 bg-[#E9E2D2] text-[#A61C24] space-y-6 min-h-[420px]">
              <span className="font-mono text-xs font-bold text-[#93453E] uppercase tracking-wider block">
                CONVENTIONAL IRON SYRUPS
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#A61C24]">
                Traditional Iron Salts
              </h3>
              <ul className="space-y-4 font-sans text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <span className="text-[#93453E] font-bold mt-0.5"><X className="w-4 h-4 text-[#93453E]" /></span>
                  <span><strong className="text-[#A61C24]">Poor absorption:</strong> Only 10% to 20% of iron is absorbed into the bloodstream.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#93453E] font-bold mt-0.5"><X className="w-4 h-4 text-[#93453E]" /></span>
                  <span><strong className="text-[#A61C24]">Gastric irritation:</strong> High risk of nausea, stomach pain, and severe constipation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#93453E] font-bold mt-0.5"><X className="w-4 h-4 text-[#93453E]" /></span>
                  <span><strong className="text-[#A61C24]">Teeth staining:</strong> Direct metallic contact causes teeth blackening in infants.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#93453E] font-bold mt-0.5"><X className="w-4 h-4 text-[#93453E]" /></span>
                  <span><strong className="text-[#A61C24]">Food interference:</strong> Blocked by phytates, calcium, and polyphenols in food.</span>
                </li>
              </ul>
            </div>

            {/* Overlay Layer: Nano-Liposomal Ferrous Bis-Glycinate */}
            <div
              className="absolute inset-0 w-full p-8 sm:p-12 bg-[#A61C24] text-[#F2EFE7] space-y-6 min-h-[420px]"
              style={{ clipPath: `inset(0 ${100 - comparePercent}% 0 0)` }}
            >
              <span className="font-mono text-xs font-bold text-[#C9973F] uppercase tracking-wider block">
                TETSU-KIDZ FORMULATION
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#F2EFE7]">
                Nano-Liposomal Ferrous Bis-Glycinate
              </h3>
              <ul className="space-y-4 font-sans text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <span className="text-[#C9973F] font-bold mt-0.5"><Check className="w-4 h-4 text-[#C9973F]" /></span>
                  <span><strong className="text-[#C9973F]">Superior absorption:</strong> up to 3x better absorption compared to other ferrous salts.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9973F] font-bold mt-0.5"><Check className="w-4 h-4 text-[#C9973F]" /></span>
                  <span><strong className="text-[#C9973F]">Gentle formulation:</strong> easy on the stomach, with minimal constipation risk.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9973F] font-bold mt-0.5"><Check className="w-4 h-4 text-[#C9973F]" /></span>
                  <span><strong className="text-[#C9973F]">Pleasant taste:</strong> no metallic taste, making it far easier for children to take daily.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9973F] font-bold mt-0.5"><Check className="w-4 h-4 text-[#C9973F]" /></span>
                  <span><strong className="text-[#C9973F]">Smart absorption:</strong> phytate-resistant, so uptake isn't blocked by certain foods.</span>
                </li>
              </ul>
            </div>

            {/* Slider Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-[#C9973F] z-20"
              style={{ left: `${comparePercent}%` }}
            >
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-[#C9973F] -translate-x-1/2" />
              <div className="w-11 h-11 rounded-full bg-[#C9973F] text-[#08090D] font-bold font-mono text-sm flex items-center justify-center shadow-2xl z-30">
                &lt;&gt;
              </div>
            </div>
          </div>

          <p className="text-center font-mono text-xs text-[#7C8AA0] uppercase tracking-widest">
            DRAG TO COMPARE
          </p>
        </div>
      </section>

      {/* 8. "One liposome, four-stage journey." SECTION */}
      <section id="technology" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto border-b border-[#A61C24]/15">
        <div className="tech-intro">
          <div className="space-y-3">
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#A61C24]">
              One liposome, four-stage journey.
            </h2>
            <p className="text-[#7C8AA0] font-light text-base sm:text-lg max-w-3xl leading-relaxed">
              Liposomes are microscopic spheres built from the same material as cell membranes. They encapsulate nutrients inside a protective phospholipid bilayer, mimicking the body's own natural delivery system to release them exactly where they're needed. Scroll to follow one liposome from syrup to bloodstream.
            </p>
          </div>

          <div className="tech-scroll">
            <div className="tech-visual-col">
              <div ref={techWrapRef} className="tech-visual-wrap relative overflow-hidden rounded-3xl w-full h-full shadow-2xl border border-[#C9973F]/30" id="techVisualWrap" data-stage="1">
                <img src={tetsuEncapsulationImg} alt="Encapsulation" className="tech-stage-img stage-1 absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-100" />
                <img src={tetsuProtectionImg} alt="Protection" className="tech-stage-img stage-2 absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-0" />
                <img src={tetsuDeliveryImg} alt="Enhanced Delivery" className="tech-stage-img stage-3 absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-0" />
                <img src={tetsuBioavailabilityImg} alt="Maximum Bioavailability" className="tech-stage-img stage-4 absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-0" />
              </div>
            </div>

            <div className="tech-steps">
              <div className="tech-step is-active" data-step="1">
                <span className="step-num">01: Encapsulation</span>
                <h4>Sealed inside a nano-sized sphere.</h4>
                <p>Iron and vitamin C molecules are enclosed within nano-sized liposomal vesicles, just 50 to 200 nanometers across.</p>
              </div>

              <div className="tech-step" data-step="2">
                <span className="step-num">02: Protection</span>
                <h4>Shielded from stomach acid.</h4>
                <p>The lipid bilayer shields its cargo from harsh stomach acid and digestive enzymes that would otherwise degrade it before it's ever absorbed.</p>
              </div>

              <div className="tech-step" data-step="3">
                <span className="step-num">03: Enhanced Delivery</span>
                <h4>Fusing with the intestinal wall.</h4>
                <p>On contact with the intestine, the liposome fuses directly with the cell membrane, releasing its cargo straight into the cell.</p>
              </div>

              <div className="tech-step" data-step="4">
                <span className="step-num">04: Maximum Bioavailability</span>
                <h4>Into the bloodstream.</h4>
                <p>The result: up to <strong>90% absorption</strong>, compared with just 10% to 20% for conventional supplements, leading to better outcomes at lower doses.</p>
                <span className="step-stat">90% vs 10% to 20% conventional</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. DOSAGE SECTION */}
      <section id="dosage" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#A61C24]">Simple, age-appropriate dosing.</h2>
          <p className="text-[#7C8AA0] font-light text-base sm:text-lg">Select an age group to see the daily dose. As with any supplement, always confirm with your pediatrician before starting.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Age Pills Buttons */}
          <div className="space-y-4">
            {dosageOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setActiveDose(opt)}
                className={`w-full flex items-center justify-between p-6 rounded-2xl border transition-all ${
                  activeDose.id === opt.id
                    ? 'bg-[#A61C24] text-[#F2EFE7] border-[#C9973F] shadow-xl scale-[1.02]'
                    : 'bg-[#F2EFE7] text-[#A61C24] border-[#A61C24]/20 hover:border-[#C9973F]/60'
                }`}
              >
                <div>
                  <span className="font-display font-bold text-lg block">{opt.ageLabel}</span>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#C9973F]">{opt.subLabel}</span>
                </div>
                <span className="font-mono font-bold text-lg text-[#C9973F]">{opt.ml} ml</span>
              </button>
            ))}
          </div>

          {/* Dosage Visual SVG Dropper */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#F2EFE7] text-[#A61C24] border border-[#A61C24]/20 shadow-2xl flex flex-col items-center text-center space-y-6">
            <svg className="w-36 h-56" viewBox="0 0 120 220" fill="none">
              <path d="M45 8h30l-4 34H49L45 8z" fill="#A61C24" />
              <rect x="52" y="40" width="16" height="14" fill="#A61C24" />
              <path d="M40 54h40l-6 90a14 14 0 01-14 12h0a14 14 0 01-14-12l-6-90z" fill="#FBF9F4" stroke="#A61C24" strokeWidth="2" />
              <clipPath id="fillClip"><path d="M40 54h40l-6 90a14 14 0 01-14 12h0a14 14 0 01-14-12l-6-90z" /></clipPath>
              <rect
                id="doseFillRect"
                x="34"
                y={activeDose.y}
                width="52"
                height={activeDose.height}
                fill="#C9973F"
                clipPath="url(#fillClip)"
                style={{ transition: 'y 0.8s ease-out, height 0.8s ease-out' }}
              />
              <line x1="46" y1="80" x2="52" y2="80" stroke="rgba(27,42,77,0.4)" strokeWidth="1.5" />
              <line x1="46" y1="110" x2="52" y2="110" stroke="rgba(27,42,77,0.4)" strokeWidth="1.5" />
              <line x1="46" y1="140" x2="52" y2="140" stroke="rgba(27,42,77,0.4)" strokeWidth="1.5" />
            </svg>

            <div className="font-mono text-4xl font-extrabold text-[#C9973F]">
              {activeDose.ml} <span className="text-sm text-[#7C8AA0] font-normal">ml</span>
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-[#A61C24] font-bold">
              {activeDose.ageLabel} ({activeDose.subLabel})
            </div>
            <p className="text-xs text-[#7C8AA0] font-mono max-w-xs">
              Always follow your pediatrician's guidance for exact dosing.
            </p>
          </div>
        </div>
      </section>

      {/* 10. GLOBAL SITE FOOTER */}
      <Footer />
    </div>
  );
};

export default TetsuKidzDetailPage;