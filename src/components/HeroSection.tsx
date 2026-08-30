import React, { useRef, useState, useEffect } from 'react';
import { CanvasFramePlayer } from './CanvasFramePlayer';
import { WhiteContentSection } from './WhiteContentSection';

interface HeroStage {
  eyebrow: string;
  headlineMain: string;
  headlineAccent: string;
  sub: string;
}

// 5 narrative beats across the 192-frame scrub. Swapped purely based on
// frameProgress (already computed below for the canvas), so it can never
// drift out of sync with the frame sequence, no matter how fast someone
// scrolls.
const HERO_STAGES: HeroStage[] = [
  {
    eyebrow: 'PRECISION BIOLOGICS | BANGALORE, INDIA',
    headlineMain: 'Cellular science,',
    headlineAccent: 'engineered into care.',
    sub: "Noveris Bio designs recombinant proteins and cellular therapeutics for two of medicine's most demanding fields.",
  },
  {
    eyebrow: 'PEDIATRICS SPECIALTY',
    headlineMain: 'Formulated for',
    headlineAccent: 'the smallest patients.',
    sub: 'Iron, magnesium and micronutrient therapeutics built for children navigating conditions with little room for error.',
  },
  {
    eyebrow: 'INFERTILITY SPECIALTY',
    headlineMain: 'Precision support,',
    headlineAccent: 'from conception onward.',
    sub: 'Reproductive science for fertility, ovarian health and maternal wellness, developed alongside clinical specialists.',
  },
  {
    eyebrow: 'WHO-GMP · ISO 9001',
    headlineMain: 'Engineered to',
    headlineAccent: 'the strictest standard.',
    sub: 'Every formulation clears rigorous compliance checkpoints before it reaches a single clinic.',
  },
  {
    eyebrow: 'BANGALORE, INDIA',
    headlineMain: 'This is',
    headlineAccent: 'Noveris Bio.',
    sub: 'Keep scrolling to see the science become eight formulations, in market today.',
  },
];

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [frameProgress, setFrameProgress] = useState<number>(0);
  const [overlayProgress, setOverlayProgress] = useState<number>(0);
  const [contentTranslateY, setContentTranslateY] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<string>('auto');

  useEffect(() => {
    const updateDimensionsAndScroll = () => {
      const containerEl = containerRef.current;
      const contentEl = contentRef.current;
      if (!containerEl || !contentEl) return;

      const vh = window.innerHeight;
      const phase1Dist = vh * 2.0; // 2.0 screens for frame scrubbing
      const phase2Dist = vh * 0.8; // 0.8 screen to slide up overlay

      // Measure exact content scroll height
      const contentHeight = contentEl.getBoundingClientRect().height;
      const maxScroll = Math.max(0, contentHeight - vh);

      const totalScrollable = phase1Dist + phase2Dist + maxScroll;
      const calculatedTotalHeight = totalScrollable + vh;

      setContainerHeight(`${calculatedTotalHeight}px`);

      // Current scroll position relative to container
      const currentScroll = Math.max(0, -containerEl.getBoundingClientRect().top);

      if (currentScroll <= phase1Dist) {
        setFrameProgress(Math.min(1, currentScroll / phase1Dist));
        setOverlayProgress(0);
        setContentTranslateY(0);
      } else if (currentScroll <= phase1Dist + phase2Dist) {
        setFrameProgress(1);
        setOverlayProgress(Math.min(1, (currentScroll - phase1Dist) / phase2Dist));
        setContentTranslateY(0);
      } else {
        setFrameProgress(1);
        setOverlayProgress(1);
        const p3Scroll = Math.min(maxScroll, currentScroll - phase1Dist - phase2Dist);
        setContentTranslateY(-p3Scroll);
      }
    };

    // Observe size changes of contentRef dynamically
    const contentEl = contentRef.current;
    let resizeObserver: ResizeObserver | null = null;
    if (contentEl) {
      resizeObserver = new ResizeObserver(() => {
        updateDimensionsAndScroll();
      });
      resizeObserver.observe(contentEl);
    }

    window.addEventListener('scroll', updateDimensionsAndScroll, { passive: true });
    window.addEventListener('resize', updateDimensionsAndScroll);

    const lenis = (window as any).lenis;
    let lenisUnsubscribe: (() => void) | null = null;
    if (lenis) {
      lenis.on('scroll', updateDimensionsAndScroll);
      lenisUnsubscribe = () => lenis.off('scroll', updateDimensionsAndScroll);
    }

    updateDimensionsAndScroll();

    return () => {
      window.removeEventListener('scroll', updateDimensionsAndScroll);
      window.removeEventListener('resize', updateDimensionsAndScroll);
      if (resizeObserver) resizeObserver.disconnect();
      if (lenisUnsubscribe) lenisUnsubscribe();
    };
  }, []);

  // ---- Hero copy: derive the active narrative beat straight from frameProgress ----
  const stageWidth = 1 / HERO_STAGES.length;
  const activeStageIdx = Math.min(HERO_STAGES.length - 1, Math.floor(frameProgress / stageWidth));
  const stage = HERO_STAGES[activeStageIdx];
  const localT = (frameProgress - activeStageIdx * stageWidth) / stageWidth;
  let copyOpacity = 1;
  if (localT < 0.2) copyOpacity = localT / 0.2;
  else if (localT > 0.8) copyOpacity = Math.max(0, (1 - localT) / 0.2);
  const cueOpacity = frameProgress < 0.05 ? 1 : Math.max(0, 1 - frameProgress * 6);

  return (
    <div
      ref={containerRef}
      id="hero"
      className="homepage-v2 relative w-full bg-[#050B14]"
      style={{ height: containerHeight }}
    >
      {/* FIXED Fullscreen Canvas Layer (z-0) — unchanged, your real frame sequence */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden flex items-center justify-center z-0 pointer-events-none">
        <CanvasFramePlayer
          scrollProgress={frameProgress}
          sequenceName="biologicals-macro"
        />
      </div>

      {/* hero copy overlay (z-10) — sits over the frames, gets covered
          naturally once the sliding content panel (z-20) arrives */}
      <div className="fixed inset-0 w-full h-screen z-10 pointer-events-none flex items-center justify-center overflow-hidden">
        {/* Rebalanced Scrim Gradient: radial dark center + linear floor for 0.4+ contrast floor */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at center, rgba(8,9,13,0.52) 0%, rgba(8,9,13,0.4) 50%, rgba(8,9,13,0.75) 100%), linear-gradient(180deg, rgba(8,9,13,0.35) 0%, rgba(8,9,13,0.42) 40%, rgba(8,9,13,0.68) 78%, rgba(8,9,13,0.85) 100%)',
          }}
        />

        <div
          className="relative z-10 text-center max-w-3xl px-6"
          style={{
            opacity: copyOpacity,
            transform: `translateY(${((1 - copyOpacity) * 14).toFixed(1)}px)`,
          }}
        >

          <h1
            className="font-display font-bold text-[clamp(2.3rem,6.2vw,5rem)] text-[#F2EFE7] leading-[1.02] tracking-tight"
            style={{
              textShadow: '0 1px 3px rgba(0,0,0,0.9), 0 4px 24px rgba(0,0,0,0.7)',
            }}
          >
            {stage.headlineMain}
            <br />
            <span
              className="text-[#B8862E]"
              style={{
                textShadow: '0 1px 3px rgba(0,0,0,0.9), 0 4px 24px rgba(0,0,0,0.7)',
                WebkitTextStroke: '0.5px rgba(8,9,13,0.6)',
              }}
            >
              {stage.headlineAccent}
            </span>
          </h1>
          <p
            className="mt-5 text-[clamp(.95rem,1.6vw,1.15rem)] text-[#C8D5E5] leading-relaxed max-w-md mx-auto font-light"
            style={{
              textShadow: '0 1px 3px rgba(0,0,0,0.9), 0 3px 18px rgba(0,0,0,0.7)',
            }}
          >
            {stage.sub}
          </p>
        </div>

        {/* Stage indicator dots */}
        <div className="hidden md:flex absolute right-7 top-1/2 -translate-y-1/2 z-10 flex-col gap-2.5">
          {HERO_STAGES.map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                background: i === activeStageIdx ? '#B8862E' : 'rgba(140,154,178,0.35)',
                transform: i === activeStageIdx ? 'scale(1.4)' : 'scale(1)',
                boxShadow: i === activeStageIdx ? '0 0 8px rgba(184,134,46,0.6)' : 'none',
              }}
            />
          ))}
        </div>
      </div>

      {/* OVERLAY Content Section (z-20) — unchanged */}
      <div
        className="fixed inset-0 w-full h-screen z-20 shadow-[0_-30px_60px_rgba(0,0,0,0.8)] pointer-events-auto overflow-hidden"
        style={{
          transform: `translateY(${(1 - overlayProgress) * 100}%)`,
          visibility: overlayProgress > 0 ? 'visible' : 'hidden',
        }}
      >
        <div
          ref={contentRef}
          className="w-full transition-transform duration-75 ease-out"
          style={{
            transform: `translateY(${contentTranslateY}px)`,
          }}
        >
          <WhiteContentSection />
        </div>
      </div>
    </div>
  );
};
