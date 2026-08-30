import React, { useCallback, useEffect, useRef, useState } from 'react';

interface PipelineStage {
  title: string;
  body: string;
}

const STAGES: PipelineStage[] = [
  { title: 'Discovery & Research', body: 'Reproductive genetics and pediatric biology research shape every formulation before it reaches a bench.' },
  { title: 'Formulation & Design', body: 'Recombinant proteins and biologic compounds are engineered for stability, purity and dosing precision.' },
  { title: 'Clinical Validation', body: 'Rigorous testing protocols validate safety and efficacy against strict clinical benchmarks.' },
  { title: 'Regulatory Compliance', body: "Every product clears WHO-GMP and ISO 9001 checkpoints before it's cleared for distribution." },
  { title: 'Market Access', body: 'From our Bangalore facility to clinics and stockists across Karnataka and, from there, all of India.' },
];

// Must match HeroSection.tsx's own phase distances exactly, since this
// component needs to independently reconstruct HeroSection's current
// transform state instead of reading it back off a transformed ancestor
// (see TherapeuticPillars.tsx for the full explanation).
const HERO_PHASE1_MULT = 2.0;
const HERO_PHASE2_MULT = 0.8;

// How many screen-heights of scroll it takes to walk through all 5 stages
// while the section is pinned. Raise/lower to slow down or speed up the pace.
const PIPELINE_SCROLL_MULT = 2.5;
const MOBILE_BREAKPOINT = 860;

function getTotalOffsetTop(el: HTMLElement | null): number {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

export const Pipeline: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);

  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT
  );
  const [wrapHeight, setWrapHeight] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [pinOffset, setPinOffset] = useState<number>(0);

  const measure = useCallback(() => {
    const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
    setIsMobile(mobile);
    if (mobile) return;
    const vh = window.innerHeight;
    setWrapHeight(vh * PIPELINE_SCROLL_MULT + vh);
  }, []);

  const update = useCallback(() => {
    if (window.innerWidth <= MOBILE_BREAKPOINT) return;
    const wrapEl = wrapRef.current;
    if (!wrapEl) return;

    const vh = window.innerHeight;
    const phase1Dist = vh * HERO_PHASE1_MULT;
    const phase2Dist = vh * HERO_PHASE2_MULT;
    const currentScroll = window.scrollY;

    let overlayProgress = 0;
    let contentTranslateY = 0;
    if (currentScroll > phase1Dist && currentScroll <= phase1Dist + phase2Dist) {
      overlayProgress = Math.min(1, (currentScroll - phase1Dist) / phase2Dist);
    } else if (currentScroll > phase1Dist + phase2Dist) {
      overlayProgress = 1;
      contentTranslateY = -(currentScroll - phase1Dist - phase2Dist);
    }
    const heroOverlayOffsetPx = (1 - overlayProgress) * vh;

    const naturalTop = getTotalOffsetTop(wrapEl);
    const visualTop = heroOverlayOffsetPx + naturalTop + contentTranslateY;
    const scrolled = Math.max(0, -visualTop);

    const maxPin = Math.max(0, wrapEl.offsetHeight - vh);
    const pin = Math.max(0, Math.min(maxPin, scrolled));
    const p = maxPin > 0 ? Math.max(0, Math.min(1, scrolled / maxPin)) : 0;

    setPinOffset(pin);
    setProgress(p);
  }, []);

  useEffect(() => {
    measure();
    update();

    // Called synchronously on every scroll event, deliberately NOT
    // rAF-throttled — this must match HeroSection's own (un-throttled)
    // update pattern exactly. If this component's transform update were
    // deferred to the next animation frame while HeroSection's is applied
    // immediately, the two would land in different paints and the pin
    // would visibly shake relative to the content scrolling underneath it.
    const onScroll = () => update();
    const onResize = () => {
      measure();
      update();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    const lenis = (window as any).lenis;
    let lenisUnsub: (() => void) | null = null;
    if (lenis) {
      lenis.on('scroll', onScroll);
      lenisUnsub = () => lenis.off('scroll', onScroll);
    }

    const ro = new ResizeObserver(onResize);
    if (wrapRef.current) ro.observe(wrapRef.current);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (lenisUnsub) lenisUnsub();
      ro.disconnect();
    };
  }, [isMobile, measure, update]);

  const heading = (
    <div className="max-w-xl">
      <span className="font-mono text-[11px] font-semibold tracking-[.16em] uppercase text-[#C9973F] inline-flex items-center gap-2.5">
        <span className="w-[22px] h-px bg-[#C9973F] inline-block" />
        FROM BENCH TO BEDSIDE
      </span>
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F2EFE7] mt-5">
        How a biologic becomes a treatment.
      </h2>
    </div>
  );

  const track = (p: number) => (
    <div className="relative flex mt-16 overflow-x-auto pb-4">
      <div className="absolute left-0 right-0 top-[27px] h-px bg-white/10" />
      <div
        className="absolute left-0 top-[27px] h-px bg-[#C9973F]"
        style={{ width: `${p * 100}%` }}
      />

      {STAGES.map((stage, i) => {
        const active = p >= (i + 0.5) / STAGES.length;
        return (
          <div key={stage.title} className="flex-[1_0_220px] pr-6 relative">
            <div
              className="w-[54px] h-[54px] rounded-full flex items-center justify-center font-mono font-bold text-[12.5px] mb-5 relative z-[2] transition-all duration-300 border"
              style={{
                background: active ? '#C9973F' : '#08090D',
                borderColor: active ? '#C9973F' : 'rgba(140,154,178,0.35)',
                color: active ? '#08090D' : '#8C9AB2',
                boxShadow: active ? '0 0 0 6px rgba(201,151,63,0.14)' : 'none',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>
            <h4
              className="text-[1.02rem] font-semibold mb-2.5 transition-colors duration-300"
              style={{ color: active ? '#E7BE72' : '#F2EFE7' }}
            >
              {stage.title}
            </h4>
            <p className="text-[#8C9AB2] text-sm leading-relaxed pr-3 font-light">{stage.body}</p>
          </div>
        );
      })}
    </div>
  );

  return (
    <section id="pipeline" className="relative bg-[#08090D]">
      {!isMobile ? (
        <div ref={wrapRef} className="relative" style={{ height: wrapHeight || undefined }}>
          <div
            ref={stickyRef}
            className="relative h-screen flex flex-col justify-center will-change-transform"
            style={{ transform: `translateY(${pinOffset.toFixed(1)}px)` }}
          >
            <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full">
              {heading}
              {track(progress)}
            </div>
          </div>
        </div>
      ) : (
        <div className="py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            {heading}
            {track(1)}
          </div>
        </div>
      )}
    </section>
  );
};