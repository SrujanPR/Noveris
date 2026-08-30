import React, { useCallback, useEffect, useRef, useState } from 'react';
import infertilityImg from '../assets/infertility_specialty.jpg';
import pediatricsImg from '../assets/pediatrics_specialty.jpg';

interface PillarContent {
  eyebrow: string;
  title: string;
  body: string;
  tags: string[];
}

const PILLARS: PillarContent[] = [
  {
    eyebrow: 'INFERTILITY',
    title: 'Infertility Specialty',
    body: 'Advanced fertility treatments grounded in the latest reproductive science, including pioneering work in ovarian rejuvenation and targeted clinical nutrition built for IVF and fertility clinics.',
    tags: ['Ovarian Rejuvenation', 'Clinical Nutrition'],
  },
  {
    eyebrow: 'PEDIATRICS',
    title: 'Pediatrics Specialty',
    body: 'Novel therapeutics for children navigating conditions with limited treatment options today, developed against rigorous clinical research and safety data at every stage.',
    tags: ['Rare Conditions', 'Safety-First R&D'],
  },
];

const RELAY_COUNT = PILLARS.length;
const RELAY_UNIT_MULT = 1.35;
const MOBILE_BREAKPOINT = 860;

// Must match HeroSection.tsx's own phase distances exactly, since this
// component needs to independently reconstruct HeroSection's current
// transform state instead of reading it back off a transformed ancestor.
const HERO_PHASE1_MULT = 2.0;
const HERO_PHASE2_MULT = 0.8;

interface Geom {
  x: number;
  y: number;
  sx: number;
  sy: number;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// offsetTop/offsetParent are computed from normal layout flow and are
// completely unaffected by CSS transforms on any ancestor — unlike
// getBoundingClientRect(), which reflects whatever transform happens to be
// painted at that instant. Walking this chain gives a stable position we
// can safely combine with our own independently-computed transform values,
// instead of racing against HeroSection's own (React-state-driven, and
// therefore one-paint-cycle-delayed) transform updates.
function getTotalOffsetTop(el: HTMLElement | null): number {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

const InfertilityImageCard: React.FC = () => (
  <div className="relative w-full h-full bg-[#0E1A30] overflow-hidden group">
    <img
      src={infertilityImg}
      alt="Infertility Specialty - Reproductive Health & Pregnancy"
      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#08090D]/80 via-transparent to-[#08090D]/20 pointer-events-none" />
  </div>
);

const PediatricsImageCard: React.FC = () => (
  <div className="relative w-full h-full bg-[#0E1A30] overflow-hidden group">
    <img
      src={pediatricsImg}
      alt="Pediatrics Specialty - Child Health & Development"
      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#08090D]/80 via-transparent to-[#08090D]/20 pointer-events-none" />
  </div>
);

export const TherapeuticPillars: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const dockSlotRef = useRef<HTMLDivElement | null>(null);
  const previewSlotRef = useRef<HTMLDivElement | null>(null);

  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT
  );
  const [wrapHeight, setWrapHeight] = useState<number>(0);
  const [geom, setGeom] = useState<{ dock: Geom; preview: Geom } | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [pinOffset, setPinOffset] = useState<number>(0);

  const measure = useCallback(() => {
    const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
    setIsMobile(mobile);
    if (mobile) return;

    const vh = window.innerHeight;
    const unit = vh * RELAY_UNIT_MULT;
    setWrapHeight((RELAY_COUNT - 1) * unit + vh);

    // Dock/preview slot geometry: LOCAL, relative measurements (dock/
    // preview/stage are all siblings sharing the exact same transform
    // ancestors), so any transform lag cancels out in the subtraction below
    // — this part was never the source of the jitter and doesn't change.
    const stageEl = stageRef.current;
    const dockEl = dockSlotRef.current;
    const previewEl = previewSlotRef.current;
    if (!stageEl || !dockEl || !previewEl) return;

    const stageRect = stageEl.getBoundingClientRect();
    const dockRect = dockEl.getBoundingClientRect();
    const previewRect = previewEl.getBoundingClientRect();

    setGeom({
      dock: {
        x: dockRect.left - stageRect.left,
        y: dockRect.top - stageRect.top,
        sx: dockRect.width / stageRect.width,
        sy: dockRect.height / stageRect.height,
      },
      preview: {
        x: previewRect.left - stageRect.left,
        y: previewRect.top - stageRect.top,
        sx: previewRect.width / stageRect.width,
        sy: previewRect.height / stageRect.height,
      },
    });
  }, []);

  const update = useCallback(() => {
    if (window.innerWidth <= MOBILE_BREAKPOINT) return;
    const wrapEl = wrapRef.current;
    if (!wrapEl) return;

    const vh = window.innerHeight;
    const phase1Dist = vh * HERO_PHASE1_MULT;
    const phase2Dist = vh * HERO_PHASE2_MULT;
    const currentScroll = window.scrollY;

    // Independently reconstruct HeroSection's current transform state from
    // the same authoritative input (window.scrollY) it uses, rather than
    // reading it back off the DOM via getBoundingClientRect() — that's what
    // removes the one-frame race that was causing the shaking.
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

    const unit = vh * RELAY_UNIT_MULT;
    const p = Math.max(0, Math.min(RELAY_COUNT - 1, scrolled / unit));

    const maxPin = Math.max(0, wrapEl.offsetHeight - vh);
    const pin = Math.max(0, Math.min(maxPin, scrolled));

    setProgress(p);
    setPinOffset(pin);
  }, []);

  useEffect(() => {
    measure();
    update();

    // rAF-throttled: batches multiple scroll events per frame into one
    // measurement/update instead of running on every raw scroll event.
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

  const activeIdx = Math.max(0, Math.min(RELAY_COUNT - 1, Math.round(progress)));
  const distFromInt = Math.abs(progress - activeIdx);
  const textOpacity = distFromInt < 0.3 ? 1 : Math.max(0, 1 - (distFromInt - 0.3) / 0.2);
  const activePillar = PILLARS[activeIdx];

  function getPanelStyle(idx: number): React.CSSProperties {
    if (!geom) {
      return { opacity: idx === 0 ? 1 : 0, transformOrigin: '0 0' };
    }
    const d = progress - idx;
    let x = 0,
      y = 0,
      sx = 1,
      sy = 1,
      op = 1;

    if (d >= 1) {
      x = geom.dock.x;
      y = geom.dock.y;
      sx = geom.dock.sx;
      sy = geom.dock.sy;
      op = 0.5;
    } else if (d >= 0) {
      const eased = Math.max(0, Math.min(1, (d - 0.15) / 0.7));
      x = lerp(0, geom.dock.x, eased);
      y = lerp(0, geom.dock.y, eased);
      sx = lerp(1, geom.dock.sx, eased);
      sy = lerp(1, geom.dock.sy, eased);
      op = lerp(1, 0.5, eased);
    } else if (d >= -1) {
      const raw = d + 1;
      const eased = Math.max(0, Math.min(1, (raw - 0.15) / 0.7));
      x = lerp(geom.preview.x, 0, eased);
      y = lerp(geom.preview.y, 0, eased);
      sx = lerp(geom.preview.sx, 1, eased);
      sy = lerp(geom.preview.sy, 1, eased);
      op = lerp(0.85, 1, eased);
    } else {
      x = geom.preview.x;
      y = geom.preview.y;
      sx = geom.preview.sx;
      sy = geom.preview.sy;
      op = 0;
    }

    return {
      transform: `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`,
      opacity: op,
      zIndex: 10 - Math.round(Math.abs(d) * 10),
      transformOrigin: '0 0',
    };
  }

  return (
    <section id="pillars" className="relative bg-[#08090D]">
      <div className="pt-24 sm:pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F2EFE7]">
              Specialized Biologics
            </h2>
          </div>
        </div>
      </div>

      {!isMobile ? (
        <div ref={wrapRef} className="relative" style={{ height: wrapHeight || undefined }}>
          <div
            ref={stickyRef}
            className="relative h-screen flex items-center will-change-transform"
            style={{ transform: `translateY(${pinOffset.toFixed(1)}px)` }}
          >
            <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full grid grid-cols-1 lg:grid-cols-[0.88fr_1fr] gap-12 lg:gap-16 items-center relative">
              <div className="relative mt-12 lg:mt-28">
                <div
                  ref={dockSlotRef}
                  className="absolute invisible pointer-events-none"
                  style={{ top: -96, left: 0, width: 76, height: 76 }}
                />

                <div ref={stageRef} className="relative w-full max-w-[390px] aspect-[1/0.88] mx-auto lg:mx-0">
                  {/* Panel 0 — Infertility Image Card */}
                  <div
                    className="absolute inset-0 rounded-[32px] overflow-hidden border border-[#C9973F]/30 shadow-[0_30px_70px_rgba(0,0,0,0.6)]"
                    style={{ ...getPanelStyle(0) }}
                  >
                    <InfertilityImageCard />
                  </div>

                  {/* Panel 1 — Pediatrics Image Card */}
                  <div
                    className="absolute inset-0 rounded-[32px] overflow-hidden border border-[#C9973F]/30 shadow-[0_30px_70px_rgba(0,0,0,0.6)]"
                    style={{ ...getPanelStyle(1) }}
                  >
                    <PediatricsImageCard />
                  </div>
                </div>
              </div>

              <div
                style={{
                  opacity: textOpacity,
                  transform: `translateY(${((1 - textOpacity) * 10).toFixed(1)}px)`,
                  transition: 'opacity .2s ease, transform .2s ease',
                }}
              >
                <span className="font-mono text-[11px] font-semibold tracking-[.16em] uppercase text-[#E7BE72] mb-4 block">
                  {activePillar.eyebrow}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F2EFE7] mb-4">
                  {activePillar.title}
                </h3>
                <p className="text-[#8C9AB2] leading-relaxed max-w-md font-light">{activePillar.body}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {activePillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10.5px] uppercase tracking-wide text-[#E7BE72] border border-[#C9973F]/30 rounded-full px-3 py-1.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div
                ref={previewSlotRef}
                className="absolute invisible pointer-events-none"
                style={{ bottom: -64, right: 0, width: 104, height: 104 }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 sm:px-12 pb-20">
          <div className="border-t border-white/10">
            {PILLARS.map((pillar, i) => (
              <div key={pillar.eyebrow} className="grid grid-cols-1 gap-4 py-10 border-b border-white/10">
                <div className="w-full max-w-[360px] h-48 sm:h-52 rounded-2xl overflow-hidden border border-[#C9973F]/30 relative shadow-lg mx-auto">
                  {i === 0 ? <InfertilityImageCard /> : <PediatricsImageCard />}
                </div>
                <span className="font-mono text-2xl font-bold text-white/25">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-mono text-[11px] font-semibold tracking-[.16em] uppercase text-[#C9973F]">
                  {pillar.eyebrow}
                </span>
                <h3 className="font-display text-xl font-semibold text-[#F2EFE7]">{pillar.title}</h3>
                <p className="text-[#8C9AB2] text-sm leading-relaxed font-light">{pillar.body}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10.5px] uppercase tracking-wide text-[#E7BE72] border border-[#C9973F]/30 rounded-full px-3 py-1.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};