import React, { useEffect } from 'react';
import { Footer } from '../components/Footer';

export const MaternovaDetailPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

    /* ---------------- Custom cursor dot (desktop pointer only) ---------------- */
    const cursorDot = document.getElementById('cursor-dot');
    let cursorAnimId: number | null = null;
    if (canHover && cursorDot) {
      let cx = window.innerWidth / 2, cy = window.innerHeight / 2, tx = cx, ty = cy;
      const handlePointerMove = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; };
      window.addEventListener('pointermove', handlePointerMove);

      const cursorLoop = () => {
        cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
        if (cursorDot) {
          cursorDot.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
        }
        cursorAnimId = requestAnimationFrame(cursorLoop);
      };
      cursorLoop();

      document.querySelectorAll('.btn, .ing-card, .indi-card, .compare-row, .why-card').forEach(el => {
        el.addEventListener('mouseenter', () => { if (cursorDot) { cursorDot.style.width = '26px'; cursorDot.style.height = '26px'; } });
        el.addEventListener('mouseleave', () => { if (cursorDot) { cursorDot.style.width = '10px'; cursorDot.style.height = '10px'; } });
      });
    }

    /* ---------------- Magnetic buttons spring-follow ---------------- */
    if (canHover && !reduceMotion) {
      document.querySelectorAll('.btn').forEach(btn => {
        let tx = 0, ty = 0, cx = 0, cy = 0, running = false;
        function loop() {
          cx += (tx - cx) * 0.22; cy += (ty - cy) * 0.22;
          (btn as HTMLElement).style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`;
          if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
            requestAnimationFrame(loop);
          } else { running = false; }
        }
        btn.addEventListener('mousemove', (e: Event) => {
          const mouseEvent = e as MouseEvent;
          const r = btn.getBoundingClientRect();
          tx = (mouseEvent.clientX - r.left - r.width / 2) * 0.28;
          ty = (mouseEvent.clientY - r.top - r.height / 2) * 0.55;
          if (!running) { running = true; requestAnimationFrame(loop); }
        });
        btn.addEventListener('mouseleave', () => {
          tx = 0; ty = 0;
          if (!running) { running = true; requestAnimationFrame(loop); }
        });
      });
    }

    /* ---------------- Hero: scroll parallax + mouse tilt on product ---------------- */
    const heroEl = document.getElementById('hero');
    const heroProduct = document.getElementById('hero-product');
    if (heroEl && heroProduct) {
      let parY = 0, tiltX = 0, tiltY = 0;
      const applyHeroTransform = () => {
        heroProduct.style.transform = `translateY(${parY}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      };

      if (!reduceMotion) {
        const handleHeroScroll = () => {
          const r = heroEl.getBoundingClientRect();
          const progress = Math.min(1, Math.max(0, -r.top / (r.height || 1)));
          parY = progress * 70;
          applyHeroTransform();
        };
        window.addEventListener('scroll', handleHeroScroll, { passive: true });

        if (canHover) {
          const handleHeroMouseMove = (e: MouseEvent) => {
            const r = heroEl.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            tiltX = -py * 10;
            tiltY = px * 14;
            applyHeroTransform();
          };
          const handleHeroMouseLeave = () => { tiltX = 0; tiltY = 0; applyHeroTransform(); };
          heroEl.addEventListener('mousemove', handleHeroMouseMove);
          heroEl.addEventListener('mouseleave', handleHeroMouseLeave);
        }
      }
    }

    /* ---------------- Stagger setup for grid items ---------------- */
    [
      ['.ingredient-grid', '.ing-card'],
      ['.indications-grid', '.indi-card'],
      ['.why-grid', '.why-card'],
      ['.compare', '.compare-row']
    ].forEach(([wrapSel, itemSel]) => {
      document.querySelectorAll(wrapSel).forEach(wrap => {
        wrap.querySelectorAll(itemSel).forEach((el, i) => {
          (el as HTMLElement).style.transitionDelay = (i * 0.12) + 's';
        });
      });
    });

    /* stagger pathway nodes/connectors so they light up in sequence */
    document.querySelectorAll('.pathway .node').forEach((el, i) => { (el as HTMLElement).style.transitionDelay = (i * 0.15) + 's'; });
    document.querySelectorAll('.pathway .connector path').forEach((el, i) => { (el as HTMLElement).style.transitionDelay = (i * 0.15 + 0.1) + 's'; });

    /* ---------------- Generic reveal via IntersectionObserver ---------------- */
    let revealObserver: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
      document.querySelectorAll('.reveal').forEach(el => revealObserver?.observe(el));

      /* comparison bars fill when their row becomes visible */
      document.querySelectorAll('.compare-row').forEach(row => {
        const barObserver = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.querySelectorAll('.bar-fill').forEach((bar, i) => {
                setTimeout(() => {
                  const targetW = (bar as HTMLElement).dataset.w;
                  if (targetW) (bar as HTMLElement).style.width = targetW + '%';
                }, i * 90);
              });
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.35 });
        barObserver.observe(row);
      });
    } else {
      /* No IntersectionObserver support: show everything immediately */
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
      document.querySelectorAll('.bar-fill').forEach(bar => {
        const targetW = (bar as HTMLElement).dataset.w;
        if (targetW) (bar as HTMLElement).style.width = targetW + '%';
      });
    }

    /* ---------------- Branch fork line length setup ---------------- */
    const forkPath = document.querySelector('.branch-fork path') as SVGPathElement | null;
    if (forkPath) {
      const len = forkPath.getTotalLength();
      forkPath.style.strokeDasharray = `${len}`;
      forkPath.style.strokeDashoffset = `${len}`;
      if ('IntersectionObserver' in window) {
        new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).style.strokeDashoffset = '0';
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5 }).observe(forkPath);
      } else {
        forkPath.style.strokeDashoffset = '0';
      }
    }

    return () => {
      
      
      if (revealObserver) revealObserver.disconnect();
      
      if (cursorAnimId) cancelAnimationFrame(cursorAnimId);
    };
  }, []);

  return (
    <>
      <div className="maternova-page">
        <style>{`
/* ============================================================
   MATERNOVA Design tokens
   ============================================================ */
:root{
  --plum-950:#180A1F;
  --plum-900:#26102F;
  --plum-800:#3B1548;
  --plum-700:#511C60;
  --magenta-600:#C81E6E;
  --magenta-500:#E0338A;
  --magenta-400:#EF5DA8;
  --coral-500:#FF6F4F;
  --coral-400:#FF8F6B;
  --mint-400:#7FE7C4;
  --mint-300:#A6F0D6;
  --cream-50:#FBF4EA;
  --cream-100:#F3E7D6;
  --ink-900:#170F1A;
  --ink-700:#3B2E3E;
  --ink-500:#6B5B6E;

  --display: 'Space Grotesk', sans-serif;
  --body: 'Instrument Sans', sans-serif;
  --mono: 'IBM Plex Mono', monospace;

  --container: 1240px;
  --edge: clamp(24px, 6vw, 96px);
} .maternova-page *, .maternova-page *::before, .maternova-page *::after { box-sizing:border-box; } .maternova-page img { max-width:100%; display:block; } .maternova-page a { color:inherit; } .maternova-page section { position:relative; } .maternova-page ::selection { background:var(--magenta-600); color:var(--cream-50); }

.wrap{
  max-width:var(--container);
  margin:0 auto;
  padding-left:var(--edge);
  padding-right:var(--edge);
}

.eyebrow{
  font-family:var(--mono);
  font-size:12.5px;
  letter-spacing:.14em;
  text-transform:uppercase;
  display:inline-flex;
  align-items:center;
  gap:10px;
  font-weight:500;
}
.eyebrow::before{
  content:'';
  width:7px; height:7px;
  border-radius:50%;
  background:currentColor;
  flex:none;
} .maternova-page h1, .maternova-page h2, .maternova-page h3, .maternova-page h4 {
  font-family:var(--display);
  margin:0;
  font-weight:600;
  letter-spacing:-0.01em;
}

.lead{
  font-family:var(--body);
  font-weight:400;
  line-height:1.6;
  color:var(--ink-700);
}

.btn{
  font-family:var(--mono);
  font-size:13px;
  letter-spacing:.06em;
  text-transform:uppercase;
  font-weight:500;
  display:inline-flex;
  align-items:center;
  gap:10px;
  padding:15px 26px;
  border-radius:100px;
  border:1px solid currentColor;
  background:transparent;
  cursor:pointer;
  text-decoration:none;
  position:relative;
  overflow:hidden;
  white-space:nowrap;
}
.btn-solid{
  background:var(--magenta-600);
  border-color:var(--magenta-600);
  color:var(--cream-50);
}
.btn-ghost-light{ color:var(--cream-50); }
.btn-ghost-dark{ color:var(--ink-900); }
.btn svg{ width:14px; height:14px; transition:transform .3s; }
.btn:hover svg{ transform:translateX(3px); }

.reveal{
  opacity:0; transform:translateY(28px);
  transition:opacity .9s cubic-bezier(.16,.8,.24,1), transform .9s cubic-bezier(.16,.8,.24,1);
  will-change:opacity, transform;
}
.reveal.is-visible{ opacity:1; transform:translateY(0); }



/* ---------- nav ---------- */
#nav{
  position:fixed; top:0; left:0; right:0; z-index:70;
  padding:18px var(--edge);
  display:flex; align-items:center; justify-content:space-between;
  transition:background .4s ease, backdrop-filter .4s ease, padding .4s ease, border-color .4s ease;
  border-bottom:1px solid transparent;
}
#nav.scrolled{
  background:rgba(24,10,31,.62);
  backdrop-filter:blur(18px) saturate(160%);
  -webkit-backdrop-filter:blur(18px) saturate(160%);
  border-bottom:1px solid rgba(255,255,255,.08);
  padding-top:12px; padding-bottom:12px;
}
.brand{
  display:flex; align-items:center; gap:10px;
  text-decoration:none;
  font-family:var(--display);
  font-size:20px;
  font-weight:600;
  color:var(--cream-50);
  letter-spacing:.01em;
}
.brand img{ width:28px; height:28px; object-fit:contain; }
.navlinks{ display:flex; gap:34px; list-style:none; margin:0; padding:0; }
.navlinks a{
  text-decoration:none; color:rgba(251,244,234,.72);
  font-family:var(--mono); font-size:12.5px; letter-spacing:.08em; text-transform:uppercase;
  position:relative; padding-bottom:4px;
}
.navlinks a::after{
  content:''; position:absolute; left:0; bottom:0; width:0; height:1px; background:var(--mint-400);
  transition:width .35s ease;
}
.navlinks a:hover::after, .navlinks a.active::after{ width:100%; }
.navlinks a.active{ color:var(--cream-50); }
@media (max-width: 780px){ .navlinks{ display:none; } }

/* ============================================================
   HERO
   ============================================================ */
#hero{
  min-height:100svh;
  background:
    radial-gradient(60% 50% at 18% 8%, rgba(200,30,110,.35), transparent 60%),
    radial-gradient(55% 45% at 85% 85%, rgba(127,231,196,.14), transparent 60%),
    linear-gradient(160deg, var(--plum-950) 0%, var(--plum-900) 45%, var(--plum-800) 100%);
  color:var(--cream-50);
  display:flex; flex-direction:column;
  justify-content:center;
  padding-top:120px; padding-bottom:70px;
  overflow:hidden;
}
#hero-orbs{ position:absolute; inset:0; z-index:0; pointer-events:none; }
#hero-orbs span{
  position:absolute; border-radius:50%;
  filter:blur(60px); opacity:.5;
  animation:orbfloat 8s ease-in-out infinite;
}
#hero-orbs span:nth-child(2){ animation-duration:11s; animation-direction:alternate-reverse; }
@keyframes orbfloat{
  0%{ transform:translate(0,0); }
  50%{ transform:translate(-18px, 26px); }
  100%{ transform:translate(0,0); }
}
.hero-grid{
  position:relative; z-index:2;
  display:grid; grid-template-columns:1.15fr .85fr; gap:40px; align-items:center;
}
@media (max-width: 940px){ .hero-grid{ grid-template-columns:1fr; } }

.hero-copy .eyebrow{ color:var(--mint-300); margin-bottom:22px; }
#hero h1{
  font-size:clamp(3.4rem, 9vw, 7.6rem);
  line-height:.92;
  color:var(--cream-50);
  letter-spacing:-0.025em;
}
#hero .tagline{
  font-family:var(--display);
  font-style:italic;
  font-weight:400;
  font-size:clamp(1.25rem, 2.4vw, 1.7rem);
  color:var(--mint-300);
  margin-top:18px;
}
#hero .desc{
  margin-top:26px;
  max-width:520px;
  color:rgba(251,244,234,.78);
  font-size:1.05rem;
  line-height:1.7;
}
.hero-ctas{ display:flex; gap:16px; margin-top:40px; flex-wrap:wrap; }

.hero-stats{
  display:flex; gap:34px; margin-top:56px; flex-wrap:wrap;
}
.hero-stats div{ font-family:var(--mono); }
.hero-stats .n{ font-family:var(--display); font-size:2rem; color:var(--cream-50); font-weight:600; display:block; }
.hero-stats .l{ font-size:11px; letter-spacing:.08em; text-transform:uppercase; color:rgba(251,244,234,.55); }

.hero-visual{ position:relative; display:flex; justify-content:center; align-items:center; }
.hero-visual .glow{
  position:absolute; width:340px; height:340px; border-radius:50%;
  background:radial-gradient(circle, rgba(224,51,138,.45), transparent 70%);
  filter:blur(30px);
}
.float-wrap{
  position:relative; z-index:2;
  animation:idlebob 3.6s ease-in-out infinite;
}
@keyframes idlebob{
  0%,100%{ transform:translateY(0); }
  50%{ transform:translateY(-14px); }
}
.hero-visual img{
  width:min(320px, 70vw);
  filter:drop-shadow(0 30px 60px rgba(0,0,0,.55));
  transition:transform .5s cubic-bezier(.16,.8,.24,1);
  transform-style:preserve-3d;
  will-change:transform;
}
.scroll-cue{
  position:relative; z-index:2;
  margin-top:64px;
  display:flex; align-items:center; gap:12px;
  font-family:var(--mono); font-size:11px; letter-spacing:.1em; text-transform:uppercase;
  color:rgba(251,244,234,.5);
}
.scroll-cue .line{ width:34px; height:1px; background:currentColor; position:relative; overflow:hidden; }
.scroll-cue .line::after{
  content:''; position:absolute; left:-100%; top:0; bottom:0; width:100%;
  background:var(--mint-400);
  animation:cue 2.2s ease-in-out infinite;
}
@keyframes cue{ 0%{left:-100%;} 50%{left:0;} 100%{left:100%;} }

/* ============================================================
   MARQUEE
   ============================================================ */
.marquee{
  background:var(--magenta-600);
  color:var(--cream-50);
  overflow:hidden;
  padding:16px 0;
  white-space:nowrap;
  position:relative;
  border-top:1px solid rgba(0,0,0,.08);
  border-bottom:1px solid rgba(0,0,0,.08);
}
.marquee .track{
  display:inline-flex;
  animation:scrollmq 32s linear infinite;
}
.marquee span{
  font-family:var(--mono);
  font-size:13px;
  letter-spacing:.1em;
  text-transform:uppercase;
  padding:0 22px;
  display:inline-flex; align-items:center; gap:22px;
}
.marquee span::after{ content:'✦'; opacity:.7; font-size:11px; }
@keyframes scrollmq{ from{ transform:translateX(0); } to{ transform:translateX(-50%); } }

/* ============================================================
   SECTION shells
   ============================================================ */
.section{ padding:120px 0; }
@media (max-width: 780px){ .section{ padding:80px 0; } }
.section-dark{ background:var(--plum-950); color:var(--cream-50); }
.section-cream{ background:var(--cream-50); color:var(--ink-900); }
.section-head{ max-width:720px; margin-bottom:64px; }
.section-dark .eyebrow{ color:var(--mint-300); }
.section-cream .eyebrow{ color:var(--magenta-600); }
.section-head h2{
  font-size:clamp(2.1rem, 4.4vw, 3.4rem);
  line-height:1.06;
  margin-top:18px;
  letter-spacing:-0.02em;
}
.section-dark .lead{ color:rgba(251,244,234,.72); }

/* ============================================================
   PRODUCT / FORMAT SECTION
   ============================================================ */
#format .format-grid{
  display:grid; grid-template-columns:1fr 1fr; gap:70px; align-items:center;
}
@media (max-width: 900px){ #format .format-grid{ grid-template-columns:1fr; gap:50px; } }

.spec-card{
  background:var(--ink-900);
  color:var(--cream-50);
  border-radius:26px;
  padding:38px;
  position:relative;
  overflow:hidden;
}
.spec-card::before{
  content:''; position:absolute; inset:0;
  background:radial-gradient(120% 100% at 100% 0%, rgba(224,51,138,.25), transparent 60%);
}
.spec-row{
  position:relative;
  display:flex; justify-content:space-between; gap:20px;
  padding:16px 0;
  border-bottom:1px solid rgba(255,255,255,.1);
  font-family:var(--mono); font-size:13.5px;
}
.spec-row:last-child{ border-bottom:none; }
.spec-row .k{ color:rgba(251,244,234,.5); letter-spacing:.04em; text-transform:uppercase; font-size:11.5px; }
.spec-row .v{ text-align:right; max-width:60%; color:var(--cream-50); }

.format-copy .pillars{ margin-top:34px; display:grid; gap:22px; }
.pillar{ display:flex; gap:16px; }
.pillar .num{ font-family:var(--mono); color:var(--magenta-600); font-size:13px; padding-top:4px; }
.pillar h4{ font-family:var(--body); font-weight:700; font-size:1.02rem; margin-bottom:4px; }
.pillar p{ margin:0; color:var(--ink-700); font-size:.95rem; line-height:1.6; }

/* ============================================================
   SCIENCE SECTION
   ============================================================ */
.ingredient-grid{
  display:grid; grid-template-columns:repeat(3,1fr); gap:26px;
  margin-top:20px;
}
@media (max-width: 900px){ .ingredient-grid{ grid-template-columns:1fr; } }
.ing-card{
  background:rgba(255,255,255,.035);
  border:1px solid rgba(255,255,255,.09);
  border-radius:24px;
  padding:28px 26px 32px;
  position:relative;
  overflow:hidden;
}
.ing-card .photo{
  width:100%; aspect-ratio:1/1; border-radius:16px; overflow:hidden; margin-bottom:22px;
  position:relative;
}
.ing-card .photo img{ width:100%; height:100%; object-fit:cover; transform:scale(1.08); transition:transform .7s cubic-bezier(.16,.8,.24,1); }
.ing-card:hover .photo img{ transform:scale(1.16); }
.ing-card .photo::after{
  content:''; position:absolute; inset:0;
  background:linear-gradient(180deg, transparent 40%, rgba(24,10,31,.75));
}
.ing-card .tag{
  font-family:var(--mono); font-size:11px; letter-spacing:.1em; color:var(--mint-300);
  text-transform:uppercase; margin-bottom:10px; display:block;
}
.ing-card h3{ font-size:1.5rem; color:var(--cream-50); margin-bottom:14px; }
.ing-card ul{ list-style:none; margin:0; padding:0; display:grid; gap:10px; }
.ing-card li{
  font-size:.92rem; color:rgba(251,244,234,.75); line-height:1.5;
  padding-left:18px; position:relative;
}
.ing-card li::before{
  content:''; position:absolute; left:0; top:.55em; width:6px; height:6px; border-radius:50%;
  background:var(--coral-500);
}

/* pathway flow */
.pathway{
  margin-top:100px;
  display:flex; align-items:center; justify-content:space-between; gap:6px;
  flex-wrap:wrap;
}
.pathway .node{
  flex:1; min-width:130px;
  text-align:center;
  padding:22px 14px;
  border-radius:18px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.1);
  opacity:0; transform:translateY(16px);
  transition:opacity .6s ease, transform .6s ease;
}
.pathway.is-visible .node{ opacity:1; transform:translateY(0); }
.pathway .node .ic{
  width:42px; height:42px; margin:0 auto 12px;
  display:flex; align-items:center; justify-content:center;
  border-radius:50%;
  background:rgba(127,231,196,.12);
  color:var(--mint-300);
}
.pathway .node .ic svg{ width:20px; height:20px; }
.pathway .node p{ margin:0; font-family:var(--mono); font-size:11.5px; letter-spacing:.03em; color:var(--cream-50); line-height:1.4; }
.pathway .connector{ flex:0 0 40px; height:2px; position:relative; overflow:hidden; }
.pathway .connector svg{ width:100%; height:20px; display:block; overflow:visible; }
.pathway .connector path{
  stroke:var(--mint-400); stroke-width:2; fill:none;
  transition:stroke-dashoffset .7s ease;
}
.pathway.is-visible .connector path{ stroke-dashoffset:0 !important; }
@media (max-width: 860px){
  .pathway{ flex-direction:column; }
  .pathway .connector{ transform:rotate(90deg); flex:0 0 40px; width:20px; margin:2px auto; }
}

/* chart */
.chart-wrap{
  margin-top:90px;
  background:rgba(255,255,255,.03);
  border:1px solid rgba(255,255,255,.09);
  border-radius:26px;
  padding:44px clamp(20px,4vw,52px) 36px;
}
.chart-wrap .chart-head{ display:flex; justify-content:space-between; align-items:flex-end; gap:20px; margin-bottom:18px; flex-wrap:wrap; }
.chart-wrap h3{ color:var(--cream-50); font-size:1.5rem; }
.chart-legend{ display:flex; gap:22px; flex-wrap:wrap; }
.chart-legend span{ display:flex; align-items:center; gap:8px; font-family:var(--mono); font-size:11.5px; color:rgba(251,244,234,.7); text-transform:uppercase; letter-spacing:.05em; }
.chart-legend i{ width:16px; height:3px; border-radius:2px; display:inline-block; }
.chart-svg{ width:100%; height:auto; display:block; }
.chart-line{ transition:stroke-dashoffset 1.1s cubic-bezier(.16,.8,.24,1); }
#line-citrulline{ transition-delay:0s; }
#line-beetroot{ transition-delay:.1s; }
#line-combo{ transition-delay:.2s; }
#area-combo{ transition:opacity .7s ease; transition-delay:.5s; }
.chart-wrap.is-visible .chart-line{ stroke-dashoffset:0 !important; }
.chart-wrap.is-visible #area-combo{ opacity:1 !important; }
.chart-caption{ margin-top:18px; color:rgba(251,244,234,.6); font-size:.92rem; max-width:640px; line-height:1.6; }

/* ============================================================
   EFFERVESCENT ADVANTAGE
   ============================================================ */
.compare{
  margin-top:20px;
  display:grid; gap:16px;
}
.compare-row{
  display:grid;
  grid-template-columns:160px 1fr;
  gap:28px;
  align-items:center;
  padding:24px 28px;
  border-radius:20px;
  background:#fff;
  border:1px solid rgba(23,15,26,.08);
}
.compare-row.hero-row{
  background:var(--ink-900);
  color:var(--cream-50);
  border-color:transparent;
  box-shadow:0 30px 60px -20px rgba(200,30,110,.35);
}
.compare-row .form-name{ font-family:var(--display); font-size:1.3rem; }
.compare-row.hero-row .form-name{ color:var(--cream-50); }
.metric-list{ display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
@media (max-width: 820px){
  .compare-row{ grid-template-columns:1fr; gap:14px; }
  .metric-list{ grid-template-columns:1fr 1fr; }
}
.metric{ min-width:0; }
.metric .m-label{ font-family:var(--mono); font-size:10px; letter-spacing:.08em; text-transform:uppercase; opacity:.55; margin-bottom:8px; display:block; }
.metric .bar-track{ height:6px; border-radius:4px; background:rgba(23,15,26,.08); overflow:hidden; }
.hero-row .metric .bar-track{ background:rgba(255,255,255,.12); }
.metric .bar-fill{ height:100%; width:0%; border-radius:4px; background:var(--ink-700); transition:width 1.3s cubic-bezier(.16,.8,.24,1); }
.hero-row .metric .bar-fill{ background:linear-gradient(90deg, var(--mint-400), var(--magenta-500)); }
.metric .m-val{ font-size:.86rem; margin-top:8px; display:block; font-weight:500; }

/* ============================================================
   INDICATIONS
   ============================================================ */
.branch-fork{ display:flex; justify-content:center; margin-bottom:10px; }
.branch-fork svg{ width:220px; height:60px; }
.branch-fork path{
  stroke:rgba(251,244,234,.35); stroke-width:1.5; fill:none;
  transition:stroke-dashoffset 1.4s ease;
}

.indications-grid{
  display:grid; grid-template-columns:repeat(3, 1fr); gap:26px;
}
@media (max-width: 980px){ .indications-grid{ grid-template-columns:1fr; } }

.indi-card{
  border-radius:26px;
  padding:34px 30px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.1);
  display:flex; flex-direction:column;
  min-height:100%;
}
.indi-card .icon{
  width:52px; height:52px; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  margin-bottom:22px;
}
.indi-card .icon svg{ width:24px; height:24px; }
.indi-card.female .icon{ background:rgba(224,51,138,.18); color:var(--magenta-400); }
.indi-card.male .icon{ background:rgba(127,231,196,.16); color:var(--mint-300); }
.indi-card.pregnancy .icon{ background:rgba(255,111,79,.18); color:var(--coral-400); }
.indi-card h3{ color:var(--cream-50); font-size:1.55rem; margin-bottom:6px; }
.indi-card .sub{ font-family:var(--mono); font-size:11px; letter-spacing:.06em; text-transform:uppercase; color:rgba(251,244,234,.45); margin-bottom:20px; }

.indi-block{ margin-bottom:20px; }
.indi-block .ib-title{ font-weight:600; font-size:.94rem; color:var(--cream-50); margin-bottom:4px; }
.indi-block p{ margin:0; font-size:.88rem; line-height:1.55; color:rgba(251,244,234,.65); }

.indi-card ul.benefits{ list-style:none; margin:auto 0 0; padding:16px 0 0; border-top:1px solid rgba(255,255,255,.1); display:grid; gap:9px; }
.indi-card ul.benefits li{ font-size:.87rem; color:rgba(251,244,234,.8); padding-left:18px; position:relative; }
.indi-card ul.benefits li::before{ content:'→'; position:absolute; left:0; color:var(--mint-300); font-size:.8em; top:1px; }

.clinical-note{
  margin-top:30px;
  display:flex; gap:16px;
  padding:22px 26px;
  border-radius:18px;
  background:rgba(255,111,79,.08);
  border:1px solid rgba(255,111,79,.28);
}
.clinical-note svg{ width:22px; height:22px; flex:none; color:var(--coral-400); margin-top:2px; }
.clinical-note p{ margin:0; font-size:.88rem; line-height:1.6; color:rgba(251,244,234,.82); }
.clinical-note strong{ color:var(--cream-50); }

/* ============================================================
   IVF STATS
   ============================================================ */
.ivf-grid{
  display:grid; grid-template-columns:1.1fr .9fr; gap:60px; align-items:center;
}
@media (max-width: 900px){ .ivf-grid{ grid-template-columns:1fr; gap:40px; } }
.ivf-targets{ display:flex; gap:14px; flex-wrap:wrap; margin:26px 0 34px; }
.ivf-targets span{
  font-family:var(--mono); font-size:12px; letter-spacing:.06em; text-transform:uppercase;
  padding:9px 16px; border-radius:100px; border:1px solid rgba(23,15,26,.15);
}
.ivf-out{ display:grid; gap:18px; }
.ivf-out .row{ display:flex; gap:16px; align-items:flex-start; }
.ivf-out .row .dot{ width:10px; height:10px; border-radius:50%; background:var(--magenta-600); margin-top:7px; flex:none; }
.ivf-out .row p{ margin:0; line-height:1.6; }
.ivf-photo{ position:relative; border-radius:28px; overflow:hidden; }
.ivf-photo img{ width:100%; }
.ivf-photo .cap{
  position:absolute; left:20px; bottom:20px; right:20px;
  background:rgba(23,15,26,.75); backdrop-filter:blur(10px);
  color:var(--cream-50); padding:14px 18px; border-radius:14px;
  font-family:var(--mono); font-size:11.5px; letter-spacing:.03em; line-height:1.5;
}

/* ============================================================
   WHY / PILLARS
   ============================================================ */
.why-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:rgba(23,15,26,.1); border-radius:26px; overflow:hidden; margin-top:10px; }
@media (max-width: 860px){ .why-grid{ grid-template-columns:1fr; } }
.why-card{ background:var(--cream-50); padding:44px 36px; }
.why-card .idx{ font-family:var(--mono); font-size:12px; color:var(--magenta-600); margin-bottom:20px; display:block; }
.why-card h3{ font-size:1.4rem; margin-bottom:12px; }
.why-card p{ margin:0; color:var(--ink-700); font-size:.94rem; line-height:1.65; }

/* ============================================================
   PIPELINE
   ============================================================ */
#pipeline{
  background:linear-gradient(120deg, var(--magenta-600), var(--plum-800) 70%);
  color:var(--cream-50);
  padding:100px 0;
}
.pipe-grid{ display:grid; grid-template-columns:1fr auto auto; gap:40px; align-items:center; }
@media (max-width: 900px){ .pipe-grid{ grid-template-columns:1fr; text-align:left; } }
.pipe-copy .eyebrow{ color:var(--mint-300); margin-bottom:18px; }
.pipe-copy h2{ font-size:clamp(1.9rem,3.6vw,2.9rem); line-height:1.08; }
.pipe-copy p{ margin-top:16px; max-width:480px; color:rgba(251,244,234,.82); line-height:1.65; }
.pipe-date{ font-family:var(--mono); font-size:12px; letter-spacing:.08em; text-transform:uppercase; color:rgba(251,244,234,.6); margin-top:20px; display:inline-block; border:1px solid rgba(251,244,234,.3); padding:8px 16px; border-radius:100px; }
.pipe-chip{
  width:170px; height:170px; border-radius:50%;
  display:flex; align-items:center; justify-content:center; flex-direction:column;
  background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.25);
  backdrop-filter:blur(6px);
  text-align:center;
  animation:chipfloat 4.5s ease-in-out infinite;
}
.pipe-chip:nth-child(3){ animation-duration:5.6s; animation-direction:alternate-reverse; }
@keyframes chipfloat{
  0%,100%{ transform:translateY(0); }
  50%{ transform:translateY(-12px); }
}
.pipe-chip .k{ font-family:var(--display); font-size:1.5rem; font-weight:600; }
.pipe-chip .l{ font-family:var(--mono); font-size:10px; letter-spacing:.08em; text-transform:uppercase; margin-top:6px; opacity:.75; }

/* ============================================================
   CLOSING
   ============================================================ */
#closing{
  background:var(--plum-950); color:var(--cream-50);
  padding:140px 0 90px;
  text-align:center;
}
#closing .mark{ display:flex; justify-content:center; margin-bottom:34px; }
#closing .mark img{ width:64px; height:64px; object-fit:contain; }
#closing h2{
  font-size:clamp(2.2rem, 6vw, 4.4rem);
  line-height:1.08;
  max-width:820px; margin:0 auto;
}
#closing h2 em{ color:var(--mint-300); font-style:italic; }
#closing .sub{ margin-top:22px; color:rgba(251,244,234,.6); font-family:var(--mono); font-size:12.5px; letter-spacing:.1em; text-transform:uppercase; }
#closing .cta-row{ margin-top:46px; display:flex; justify-content:center; gap:16px; flex-wrap:wrap; }

.disclaimer{
  max-width:720px; margin:70px auto 0;
  padding-top:34px; border-top:1px solid rgba(255,255,255,.1);
  font-size:.8rem; line-height:1.7; color:rgba(251,244,234,.42);
}

/* removed global footer style */
/* removed footer .fbrand style */

/* magnetic cursor dot (desktop only) */
#cursor-dot{
  position:fixed; top:0; left:0; width:10px; height:10px; border-radius:50%;
  background:var(--mint-400); pointer-events:none; z-index:200;
  transform:translate(-50%,-50%);
  mix-blend-mode:difference;
  transition:width .25s, height .25s;
}
@media (hover:none), (pointer:coarse){ #cursor-dot{ display:none; } }

@media (prefers-reduced-motion: reduce){
  
  .reveal{ opacity:1 !important; transform:none !important; transition:none !important; }
  #hero-orbs span, .float-wrap, .pipe-chip, .marquee .track, .scroll-cue .line::after{
    animation:none !important;
  }
  .hero-visual img{ transition:none !important; }
}
`}</style>
        







{/* ============================================================ HERO ============================================================ */}
<section id="hero">
  <div id="hero-orbs">
    <span style={{"width":"420px","height":"420px","background":"var(--magenta-600)","top":"-8%","left":"6%"}}></span>
    <span style={{"width":"320px","height":"320px","background":"var(--mint-400)","bottom":"2%","right":"8%","opacity":".22"}}></span>
  </div>
  <div className="wrap hero-grid">
    <div className="hero-copy">
      
      <h1>MATERNOVA</h1>
      <p className="tagline">Fuelling health, fostering life.</p>
      <p className="desc">A first-in-class effervescent formulation combining L-Arginine, L-Citrulline, and Beetroot Powder. Together, these three complementary pathways work in harmony to support sustained nitric-oxide-driven blood flow where healthy circulation is needed most for fertility and pregnancy.</p>


    </div>
    <div className="hero-visual">
      <div className="glow"></div>
      <div className="float-wrap">
        <img id="hero-product" src="/maternova_extracted_2.png" alt="Maternova effervescent tube and box, orange flavour, with beetroot and orange fruit" />
      </div>
    </div>
  </div>
  
</section>



{/* ============================================================ FORMAT ============================================================ */}
<section id="format" className="section section-cream">
  <div className="wrap">
    <div className="format-grid">
      <div className="format-copy reveal">
        
        <h2>Effervescent by Design, Created for Comfort</h2>
        <p className="lead" style={{"marginTop":"20px","maxWidth":"480px"}}>Most nutraceuticals ask the gut to break down a hard tablet before anything reaches circulation. Maternova skips that step: each tablet dissolves fully in water before it's taken, so the active ingredients arrive ready to absorb.</p>
        <div className="pillars">
          <div className="pillar">
            <span className="num">01</span>
            <div><h4>20 effervescent tablets per tube</h4><p>A full course of L-Arginine, L-Citrulline and Beetroot Powder in one clean format.</p></div>
          </div>
          <div className="pillar">
            <span className="num">02</span>
            <div><h4>Natural orange flavour</h4><p>Natural orange flavor with no added sugars or artificial sweeteners, thoughtfully crafted to fit comfortably into your daily routine.</p></div>
          </div>
          <div className="pillar">
            <span className="num">03</span>
            <div><h4>Dissolve. Sip. Absorb.</h4><p>Liquid-form delivery for faster, more complete uptake than powder or standard tablets.</p></div>
          </div>
        </div>
      </div>
      <div className="spec-card reveal">
        <div className="spec-row"><span className="k">Category</span><span className="v">Nutraceutical</span></div>
        <div className="spec-row"><span className="k">Technology</span><span className="v">First-in-class effervescent</span></div>
        <div className="spec-row"><span className="k">Per tube</span><span className="v">20 effervescent tablets</span></div>
        <div className="spec-row"><span className="k">Active per tablet</span><span className="v">L-Arginine · L-Citrulline · Beetroot Powder</span></div>
        <div className="spec-row"><span className="k">Flavour</span><span className="v">Natural orange</span></div>
        <div className="spec-row"><span className="k">Sugar</span><span className="v">No added sugars</span></div>
        <div className="spec-row"><span className="k">Sweeteners</span><span className="v">None listed</span></div>
        <div className="spec-row"><span className="k">Made by</span><span className="v">Noveris Bio</span></div>
      </div>
    </div>
  </div>
</section>

{/* ============================================================ SCIENCE ============================================================ */}
<section id="science" className="section section-dark">
  <div className="wrap">
    <div className="section-head reveal">
      
      <h2>Three pathways, one destination: nitric oxide</h2>
      <p className="lead" style={{"marginTop":"20px"}}>Arginine becomes nitric oxide. Nitric oxide relaxes and widens blood vessels. Wider vessels move more blood, more oxygen, more nutrients, to the uterus, the ovaries, the testes, the placenta. Maternova combines three ingredients that feed that single chain from different angles, so the effect builds instead of fading.</p>
    </div>

    <div className="ingredient-grid">
      <div className="ing-card reveal">
        <div className="photo"><img src="/maternova_extracted_3.jpg" alt="L-Arginine capsule" /></div>
        <span className="tag">Pathway 01</span>
        <h3>L-Arginine</h3>
        <ul>
          <li>Precursor to nitric oxide</li>
          <li>Supports endothelial function</li>
          <li>Microvascular dilation in pelvic and uterine circulation</li>
        </ul>
      </div>
      <div className="ing-card reveal">
        <div className="photo"><img src="/maternova_extracted_4.jpg" alt="L-Citrulline powder" /></div>
        <span className="tag">Pathway 02</span>
        <h3>L-Citrulline</h3>
        <ul>
          <li>Prolongs and stabilises nitric oxide production</li>
          <li>Escapes hepatic metabolism, converts to arginine in the kidneys</li>
          <li>Recycles L-Arginine for sustained blood flow</li>
        </ul>
      </div>
      <div className="ing-card reveal">
        <div className="photo"><img src="/maternova_extracted_5.jpg" alt="Beetroot powder" /></div>
        <span className="tag">Pathway 03</span>
        <h3>Beetroot Powder</h3>
        <ul>
          <li>Converts dietary nitrates to nitric oxide via the entero-salivary pathway</li>
          <li>Operates through a complementary pathway independent of the standard arginine route</li>
          <li>Promotes vasodilation and improves oxygen delivery</li>
        </ul>
      </div>
    </div>

    {/* pathway flow diagram */}
    <div className="pathway reveal" id="pathway-flow">
      <div className="node"><div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 21c9 0 14-5 14-14V5h-2C8 5 3 10 3 19v2Z"/><path d="M9 15c3-3 5-5 10-9"/></svg></div><p>L-ARGININE</p></div>
      <div className="connector"><svg viewBox="0 0 40 20" preserveAspectRatio="none"><path className="pconn" d="M0 10 L40 10" pathLength="100" strokeDasharray="100" strokeDashoffset="100"/></svg></div>
      <div className="node"><div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/></svg></div><p>eNOS / nNOS / iNOS</p></div>
      <div className="connector"><svg viewBox="0 0 40 20" preserveAspectRatio="none"><path className="pconn" d="M0 10 L40 10" pathLength="100" strokeDasharray="100" strokeDashoffset="100"/></svg></div>
      <div className="node"><div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/></svg></div><p>NITRIC OXIDE</p></div>
      <div className="connector"><svg viewBox="0 0 40 20" preserveAspectRatio="none"><path className="pconn" d="M0 10 L40 10" pathLength="100" strokeDasharray="100" strokeDashoffset="100"/></svg></div>
      <div className="node"><div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12h4l2-7 4 14 2-7h6"/></svg></div><p>VASODILATION</p></div>
      <div className="connector"><svg viewBox="0 0 40 20" preserveAspectRatio="none"><path className="pconn" d="M0 10 L40 10" pathLength="100" strokeDasharray="100" strokeDashoffset="100"/></svg></div>
      <div className="node"><div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2s7 8 7 13a7 7 0 0 1-14 0c0-5 7-13 7-13Z"/></svg></div><p>IMPROVED BLOOD FLOW</p></div>
    </div>

    {/* chart */}
    <div className="chart-wrap reveal">
      <div className="chart-head">
        <h3>Sustained vasodilation over time</h3>
        <div className="chart-legend">
          <span><i style={{"background":"var(--mint-400)"}}></i>L-Citrulline alone</span>
          <span><i style={{"background":"var(--coral-500)"}}></i>Beetroot alone</span>
          <span><i style={{"background":"var(--magenta-500)"}}></i>Combination</span>
        </div>
      </div>
      <svg className="chart-svg" viewBox="0 0 900 300" id="no-chart">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--magenta-500)" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="var(--magenta-500)" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <line x1="40" y1="250" x2="870" y2="250" stroke="rgba(251,244,234,.25)" strokeWidth="1"/>
        <line x1="40" y1="20" x2="40" y2="250" stroke="rgba(251,244,234,.25)" strokeWidth="1"/>
        <text x="10" y="30" fill="rgba(251,244,234,.5)" font-family="IBM Plex Mono" font-size="11">NO</text>
        <text x="800" y="272" fill="rgba(251,244,234,.5)" font-family="IBM Plex Mono" font-size="11">TIME</text>

        <path id="area-combo" d="M40,250 C160,250 190,60 320,55 C480,48 560,110 680,190 C760,235 820,248 870,250 L870,250 L40,250 Z" fill="url(#areaGrad)" opacity="0"/>

        <path className="chart-line" id="line-citrulline" d="M40,250 C160,250 210,150 320,140 C440,130 540,175 650,220 C720,244 800,250 870,250"
          fill="none" stroke="var(--mint-400)" strokeWidth="2.5" strokeDasharray="1000" strokeDashoffset="1000"/>

        <path className="chart-line" id="line-beetroot" d="M40,250 C170,250 200,175 300,165 C420,152 520,190 630,225 C710,247 810,250 870,250"
          fill="none" stroke="var(--coral-500)" strokeWidth="2.5" strokeDasharray="1000" strokeDashoffset="1000"/>

        <path className="chart-line" id="line-combo" d="M40,250 C160,250 190,60 320,55 C480,48 560,110 680,190 C760,235 820,248 870,250"
          fill="none" stroke="var(--magenta-500)" strokeWidth="3.5" strokeDasharray="1000" strokeDashoffset="1000"/>
      </svg>
      <p className="chart-caption">Combining L-Citrulline and Beetroot Powder promotes effective, sustained vasodilation by increasing and prolonging nitric oxide (NO) levels, well beyond what either ingredient sustains alone.</p>
    </div>
  </div>
</section>

{/* ============================================================ EFFERVESCENT ADVANTAGE ============================================================ */}
<section id="advantage" className="section section-cream">
  <div className="wrap">
    <div className="section-head reveal">
      
      <h2>Why effervescent wins</h2>
      <p className="lead" style={{"marginTop":"20px"}}>Same actives, different outcomes. The delivery format changes how much of the dose the body actually gets to use, and how consistently someone will keep taking it.</p>
    </div>

    <div className="compare">
      <div className="compare-row hero-row reveal">
        <span className="form-name">Effervescent</span>
        <div className="metric-list">
          <div className="metric"><span className="m-label">Bioavailability</span><div className="bar-track"><div className="bar-fill" data-w="96"></div></div><span className="m-val">High · quick dissolution</span></div>
          <div className="metric"><span className="m-label">Onset of action</span><div className="bar-track"><div className="bar-fill" data-w="94"></div></div><span className="m-val">Fast</span></div>
          <div className="metric"><span className="m-label">GI tolerance</span><div className="bar-track"><div className="bar-fill" data-w="92"></div></div><span className="m-val">No GI irritation</span></div>
          <div className="metric"><span className="m-label">Taste</span><div className="bar-track"><div className="bar-fill" data-w="90"></div></div><span className="m-val">Better</span></div>
        </div>
      </div>
      <div className="compare-row reveal">
        <span className="form-name">Powder</span>
        <div className="metric-list">
          <div className="metric"><span className="m-label">Bioavailability</span><div className="bar-track"><div className="bar-fill" data-w="58"></div></div><span className="m-val">Moderate</span></div>
          <div className="metric"><span className="m-label">Onset of action</span><div className="bar-track"><div className="bar-fill" data-w="55"></div></div><span className="m-val">Moderate</span></div>
          <div className="metric"><span className="m-label">GI tolerance</span><div className="bar-track"><div className="bar-fill" data-w="48"></div></div><span className="m-val">Grittiness</span></div>
          <div className="metric"><span className="m-label">Taste</span><div className="bar-track"><div className="bar-fill" data-w="42"></div></div><span className="m-val">Chalky</span></div>
        </div>
      </div>
      <div className="compare-row reveal">
        <span className="form-name">Tablet</span>
        <div className="metric-list">
          <div className="metric"><span className="m-label">Bioavailability</span><div className="bar-track"><div className="bar-fill" data-w="28"></div></div><span className="m-val">Low</span></div>
          <div className="metric"><span className="m-label">Onset of action</span><div className="bar-track"><div className="bar-fill" data-w="24"></div></div><span className="m-val">Slow</span></div>
          <div className="metric"><span className="m-label">GI tolerance</span><div className="bar-track"><div className="bar-fill" data-w="20"></div></div><span className="m-val">Gastric irritation</span></div>
          <div className="metric"><span className="m-label">Taste</span><div className="bar-track"><div className="bar-fill" data-w="18"></div></div><span className="m-val">Unpleasant</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ============================================================ INDICATIONS ============================================================ */}
<section id="indications" className="section section-dark">
  <div className="wrap">
    <div className="section-head reveal">
      
      <h2>Built around three points where circulation changes everything</h2>
      <p className="lead" style={{"marginTop":"20px"}}>Maternova is positioned as an adjunct, supportive circulation alongside the care a fertility specialist or obstetrics team is already providing, not a replacement for it.</p>
    </div>

    

    <div className="indications-grid">
      <div className="indi-card female reveal">
        <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="9" r="5"/><path d="M12 14v7M9 18h6"/></svg></div>
        <h3>Female infertility</h3>
        <span className="sub">Two indication contexts</span>
        <div className="indi-block">
          <div className="ib-title">Thin endometrium</div>
          <p>Adjunct to optimise uterine perfusion prior to implantation.</p>
        </div>
        <div className="indi-block">
          <div className="ib-title">Low ovarian reserve</div>
          <p>Supportive circulation to potentially improve the follicular microenvironment.</p>
        </div>
        <ul className="benefits">
          <li>Improves blood flow to ovary and uterus</li>
          <li>Supports egg quality</li>
          <li>Enhances sexual health</li>
          <li>Relieves stress and fatigue</li>
        </ul>
      </div>

      <div className="indi-card male reveal">
        <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="10" cy="14" r="5"/><path d="M14 10l6-6M14 4h6v6"/></svg></div>
        <h3>Male infertility</h3>
        <span className="sub">One indication context</span>
        <div className="indi-block">
          <div className="ib-title">Vascular erectile dysfunction</div>
          <p>Related to vascular causes and suboptimal testicular blood supply.</p>
        </div>
        <ul className="benefits">
          <li>Improves blood flow to the testes</li>
          <li>Enhances spermatogenesis</li>
          <li>Improves libido</li>
          <li>Enhances stamina and performance</li>
        </ul>
      </div>

      <div className="indi-card pregnancy reveal">
        <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 4a5 5 0 0 1 5 5c0 3-2 4-2 7a3 3 0 0 1-6 0"/><path d="M9 4a3 3 0 0 0-3 3"/></svg></div>
        <h3>Pregnancy support</h3>
        <span className="sub">Two indication contexts</span>
        <div className="indi-block">
          <div className="ib-title">IUGR</div>
          <p>Adjunctive vasodilatory support aiming to improve placental perfusion, where clinically appropriate.</p>
        </div>
        <div className="indi-block">
          <div className="ib-title">Pregnancy-induced hypertension</div>
          <p>May support endothelial function within multidisciplinary management.</p>
        </div>
        <ul className="benefits">
          <li>Supports healthy blood flow to the placenta</li>
          <li>Helps reduce blood pressure</li>
          <li>Enhances endothelial function</li>
          <li>May help reduce oxidative stress</li>
        </ul>
      </div>
    </div>

    <div className="clinical-note reveal">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 9v4M12 17h.01M10.3 3.9L2.7 17.5a1.8 1.8 0 0 0 1.6 2.7h15.4a1.8 1.8 0 0 0 1.6-2.7L13.7 3.9a1.8 1.8 0 0 0-3.4 0Z"/></svg>
      <p><strong>For pregnancy-induced hypertension, Maternova is not a replacement for antihypertensive therapy.</strong> It should be used only under the supervision of an obstetrics team, as a complementary therapy within evidence-based care.</p>
    </div>
  </div>
</section>

{/* ============================================================ IVF ============================================================ */}
<section id="ivf" className="section section-cream">
  <div className="wrap">
    <div className="ivf-grid">
      <div className="reveal">
        
        <h2 style={{"marginTop":"18px","fontSize":"clamp(2rem,3.8vw,2.9rem)","lineHeight":"1.1"}}>Arginine in IVF</h2>
        <p className="lead" style={{"marginTop":"18px","maxWidth":"460px"}}>Improved blood flow reaches three specific targets in women, with a parallel benefit in men.</p>
        <div className="ivf-targets">
          <span>Uterus</span><span>Genital</span><span>Ovaries</span>
        </div>
        <div className="ivf-out">
          <div className="row"><span className="dot"></span><p>Thereby increasing <strong>endometrial thickness</strong> and <strong>egg quality</strong> in women.</p></div>
          <div className="row"><span className="dot"></span><p>Increases <strong>sperm quality</strong> and <strong>libido</strong> in men.</p></div>
        </div>
      </div>
      <div className="ivf-photo reveal">
        <img src="/maternova_extracted_6.jpg" alt="Illustration of prenatal ultrasound monitoring in a clinical setting" />
        <div className="cap">Supportive circulation, alongside your fertility team's protocol, not in place of it.</div>
      </div>
    </div>
  </div>
</section>

{/* ============================================================ WHY CHOOSE ============================================================ */}
<section id="why" className="section section-cream" style={{"paddingTop":"0"}}>
  <div className="wrap">
    <div className="section-head reveal">
      
      <h2>Why choose Maternova</h2>
    </div>
    <div className="why-grid">
      <div className="why-card reveal">
        <span className="idx">01</span>
        <h3>High-quality L-Arginine formulation</h3>
        <p>Built on a precursor with the clearest evidence base for nitric-oxide-driven vasodilation, paired with two ingredients chosen specifically to extend its effect.</p>
      </div>
      <div className="why-card reveal">
        <span className="idx">02</span>
        <h3>Backed by clinical evidence</h3>
        <p>Every core mechanism behind Maternova, including endothelial support and the natural nitrate pathway, is rooted in established vascular science.</p>
      </div>
      <div className="why-card reveal">
        <span className="idx">03</span>
        <h3>Convenient dosage format</h3>
        <p>A single refreshing effervescent drink fits effortlessly into your day, making daily consistency simple and enjoyable over time.</p>
      </div>
    </div>
  </div>
</section>








      </div>
      <Footer />
    </>
  );
};

export default MaternovaDetailPage;
