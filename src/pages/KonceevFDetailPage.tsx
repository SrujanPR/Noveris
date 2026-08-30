import React, { useState, useEffect, useRef } from 'react';
import konceevFImg from '../assets/Konceev-F.png';
import fDosingImg from '../assets/f_dosing_science.jpg';
import fBioavailabilityImg from '../assets/f_bioavailability.jpg';
import fPurityQualityImg from '../assets/f_purity_quality.jpg';
import { Footer } from '../components/Footer';

const inlineStyles = `
/* ============================================================
   KONCEEV-F — Product Page
   Editorial clinical system built on magenta + indigo + blush.
   ============================================================ */

:root {
  --magenta: #c11f7a;
  --magenta-deep: #8f1760;
  --magenta-light: #e8629f;
  --indigo: #2e2a6e;
  --indigo-deep: #1c1944;
  --indigo-2: #423c8f;
  --blush: #fbdcec;
  --blush-2: #f6cadf;
  --paper: #ffffff;
  --paper-2: #fdf8fb;

  --ink: #2a2350;
  --ink-soft: rgba(42,35,80,.64);
  --ink-faint: rgba(42,35,80,.42);

  --grad-magenta: linear-gradient(135deg,var(--magenta-light),var(--magenta) 60%,var(--magenta-deep));
  --grad-indigo: linear-gradient(160deg,var(--indigo-2),var(--indigo) 55%,var(--indigo-deep));

  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'Instrument Sans', sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;

  --radius-pill: 999px;
  --radius-md: 20px;
  --shadow-card: 0 26px 60px -30px rgba(28,25,68,.36);
  --ease: cubic-bezier(.22,.9,.28,1);

  --rose: #e0808f;
  --rose-deep: #c15d6e;
  --wine: #5c2130;
  --cream: #fdf3f0;
  --cream-2: #fbe9e6;
}

.kf-root {
  font-family: var(--font-body);
  background: var(--paper);
  color: var(--ink);
  line-height: 1.65;
  overflow-x: clip;
  -webkit-font-smoothing: antialiased;
  position: relative;
  min-height: 100vh;
}

.kf-root .container { width: 100%; max-width: 1220px; margin: 0 auto; padding: 0 32px; position: relative; }
.kf-root .pad { padding-block: clamp(4.5rem, 11vh, 10rem); }

/* ---------- Typography ---------- */
.kf-root .h2 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(2rem, 4.2vw, 3.4rem);
  line-height: 1.1;
  color: var(--indigo);
  letter-spacing: -.01em;
}

.kf-root .lead {
  font-size: clamp(1.02rem, 1.5vw, 1.22rem);
  line-height: 1.6;
  color: var(--ink-soft);
  max-width: 52ch;
}

/* ---------- Progress bar ---------- */
.kf-root .progress {
  position: fixed; top: 0; left: 0; height: 3px; width: 0;
  background: var(--grad-magenta);
  z-index: 1000;
}

/* ============================================================
   HERO SECTION
   ============================================================ */
.kf-root .hero {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding-top: clamp(60px, 10vh, 120px);
  padding-bottom: clamp(60px, 8vh, 100px);
  background: linear-gradient(180deg, var(--blush), var(--blush-2));
}

.kf-root .hero-grid {
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  gap: 40px;
  align-items: center;
  width: 100%;
}

.kf-root .hero h1 {
  font-family: var(--font-display);
  font-size: clamp(3rem, 6.6vw, 5.4rem);
  letter-spacing: -.01em;
  font-weight: 600;
  line-height: 1.05;
  color: var(--indigo);
}
.kf-root .hero h1 .c1 { color: var(--magenta); }
.kf-root .hero h1 .c2 { color: var(--indigo); }

.kf-root .hero .lede {
  font-size: clamp(1.02rem, 1.5vw, 1.22rem);
  color: var(--ink-soft);
  max-width: 52ch;
  margin-top: 20px;
}

.kf-root .audience-toggle {
  display: flex;
  gap: 12px;
  margin-top: 34px;
  flex-wrap: wrap;
}

.kf-root .aud-btn {
  padding: 14px 24px;
  border-radius: var(--radius-pill);
  border: 1.5px solid rgba(46,42,110,.18);
  background: rgba(255,255,255,.5);
  font-weight: 700;
  font-size: .92rem;
  color: var(--indigo);
  transition: .35s var(--ease);
  cursor: pointer;
}

.kf-root .aud-btn.is-active {
  background: var(--grad-indigo);
  color: #fff;
  border-color: transparent;
  box-shadow: var(--shadow-card);
}

.kf-root .aud-copy {
  margin-top: 18px;
  font-size: .98rem;
  color: var(--ink-soft);
  max-width: 52ch;
  min-height: 48px;
  transition: opacity .4s ease;
}

.kf-root .dial-stage {
  position: relative;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 440px;
  margin: 0 auto;
  width: 100%;
}

.kf-root .dial-stage svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.kf-root .dial-spin {
  animation: dial-spin 26s linear infinite;
  transform-origin: 200px 200px;
}

@keyframes dial-spin {
  to { transform: rotate(360deg); }
}

@media(max-width:900px){
  .kf-root .hero-grid { grid-template-columns: 1fr; }
  .kf-root .dial-stage { max-width: 320px; margin: 40px auto 0; }
}

/* ============================================================
   MANIFESTO — word-by-word scroll scrub
   ============================================================ */
.kf-root .manifesto { background: var(--paper); }
.kf-root .manifesto .container { max-width: 1100px; }
.kf-root .manifesto p {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(1.7rem, 4.4vw, 3.6rem);
  line-height: 1.24;
  letter-spacing: -0.015em;
  color: var(--indigo);
}
.kf-root .manifesto .w { color: color-mix(in srgb, var(--indigo) 14%, var(--paper)); transition: color 0.1s linear; display: inline-block; }
.kf-root .manifesto .w.lit { color: var(--indigo); }
.kf-root .manifesto .w.accent.lit { color: var(--magenta); font-style: italic; }

/* ============================================================
   CYCLE — scroll-drawn ring
   ============================================================ */
.kf-root .cycle { background: linear-gradient(180deg, var(--paper), var(--paper-2)); position: relative; }
.kf-root .cycle__grid { display: grid; gap: 3rem; grid-template-columns: 1fr; align-items: center; }
@media (min-width: 900px) { .kf-root .cycle__grid { grid-template-columns: 0.85fr 1fr; gap: 4rem; } }

.kf-root .ring-wrap { position: relative; display: grid; place-items: center; aspect-ratio: 1; max-width: 460px; margin-inline: auto; width: 100%; }
.kf-root .ring-wrap svg { width: 100%; height: 100%; transform: rotate(-90deg); overflow: visible; }
.kf-root .ring-track { fill: none; stroke: color-mix(in srgb, var(--magenta) 22%, transparent); stroke-width: 2; }
.kf-root .ring-progress { fill: none; stroke: var(--magenta); stroke-width: 3; stroke-linecap: round; filter: drop-shadow(0 0 6px color-mix(in srgb, var(--magenta) 50%, transparent)); }
.kf-root .ring-dot { fill: var(--indigo); }
.kf-root .ring-center { position: absolute; text-align: center; }
.kf-root .ring-center .big { font-family: var(--font-display); font-size: clamp(2.4rem, 7vw, 4rem); color: var(--indigo); line-height: 1; font-weight: 600; }
.kf-root .ring-center .sub { font-size: 0.72rem; letter-spacing: 0.24em; text-transform: uppercase; color: var(--magenta); margin-top: 0.4rem; }

.kf-root .phase-list { display: grid; gap: 0.4rem; }
.kf-root .phase {
  display: grid; grid-template-columns: auto 1fr; gap: 1.1rem; align-items: start;
  padding: 1.15rem 0;
  border-top: 1px solid color-mix(in srgb, var(--indigo) 12%, transparent);
  opacity: 0.4; transition: opacity 0.5s var(--ease), transform 0.5s var(--ease);
  transform: translateX(-6px);
}
.kf-root .phase.active { opacity: 1; transform: none; }
.kf-root .phase:last-child { border-bottom: 1px solid color-mix(in srgb, var(--indigo) 12%, transparent); }
.kf-root .phase .ph-n {
  font-family: var(--font-display); font-size: 1.1rem; color: var(--magenta);
  width: 2.2rem; height: 2.2rem; display: grid; place-items: center;
  border-radius: 50%; border: 1px solid color-mix(in srgb, var(--magenta) 45%, transparent);
  transition: background 0.5s var(--ease), color 0.5s var(--ease);
}
.kf-root .phase.active .ph-n { background: var(--magenta); color: #fff; border-color: var(--magenta); }
.kf-root .phase h3 { font-size: 1.15rem; color: var(--indigo); font-weight: 600; margin-bottom: 0.15rem; }
.kf-root .phase p { font-size: 0.95rem; color: var(--ink-soft); }

/* ============================================================
   SCIENCE — pinned scrollytelling
   ============================================================ */
.kf-root .science { background: var(--indigo-deep); color: #fff; position: relative; }
.kf-root .sci-head { padding-top: clamp(4rem, 10vh, 8rem); }
.kf-root .sci-head .h2 { color: #fff; max-width: 20ch; }
.kf-root .sci-head .lead { color: rgba(248,244,251,.72); }

.kf-root .sci-stage { display: grid; gap: 2.5rem; grid-template-columns: 1fr; }
@media (min-width: 900px) { .kf-root .sci-stage { grid-template-columns: 1fr 1fr; gap: 4rem; } }

.kf-root .sci-sticky { position: sticky; top: 0; height: 100vh; display: grid; place-items: center; }
.kf-root .sci-visual {
  position: relative; width: 100%; aspect-ratio: 4/5; max-height: 76vh;
  border-radius: 20px; overflow: hidden;
  box-shadow: 0 40px 80px rgba(0,0,0,0.4);
}
.kf-root .sci-visual figure { position: absolute; inset: 0; opacity: 0; transition: opacity 0.7s var(--ease), transform 1.4s var(--ease); margin: 0; display: flex; align-items: center; justify-content: center; }
.kf-root .sci-visual figure.show { opacity: 1; }
.kf-root .sci-visual figure.bg1 { background: radial-gradient(120% 100% at 30% 15%, #423c8f, var(--indigo-deep) 55%, #100d2b 100%); }
.kf-root .sci-visual figure.bg2 { background: radial-gradient(120% 100% at 75% 20%, #c11f7a, var(--indigo-deep) 55%, #100d2b 100%); }
.kf-root .sci-visual figure.bg3 { background: radial-gradient(120% 100% at 50% 85%, #8f1760, var(--indigo-deep) 55%, #100d2b 100%); }
.kf-root .sci-icon { width: 32%; max-width: 150px; color: var(--magenta-light); }
.kf-root .sci-icon svg { width: 100%; height: 100%; }
.kf-root .sci-visual figcaption {
  position: absolute; left: 1.2rem; bottom: 1.2rem; right: 1.2rem;
  font-size: 0.78rem; letter-spacing: 0.04em;
  color: #fff; background: rgba(28,25,68,0.7);
  backdrop-filter: blur(6px); padding: 0.7rem 0.9rem; border-radius: 10px;
}

.kf-root .credential-band {
  display: grid; grid-template-columns: auto 1fr; align-items: center; gap: 1.6rem;
  background: rgba(255,255,255,.045); border: 1px solid rgba(255,255,255,.12);
  border-radius: 20px; padding: 1.7rem clamp(1.3rem, 3vw, 2.2rem);
  margin-top: clamp(2rem, 5vh, 3rem);
}
.kf-root .cred-seal {
  width: 84px; height: 84px; border-radius: 50%; flex-shrink: 0;
  border: 1.5px solid rgba(232,98,159,0.7);
  display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;
}
.kf-root .cred-seal svg { width: 22px; height: 22px; color: var(--magenta-light); margin-bottom: 4px; }
.kf-root .cred-seal span { font-family: var(--font-mono); font-size: 0.5rem; font-weight: 700; letter-spacing: 0.04em; line-height: 1.35; color: rgba(248,244,251,0.72); padding: 0 4px; }
.kf-root .cred-principles { display: flex; flex-wrap: wrap; gap: 0.7rem; }
.kf-root .cred-chip { display: flex; gap: 0.55rem; align-items: center; font-size: 0.85rem; color: rgba(248,244,251,0.88); background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); padding: 0.65rem 1rem; border-radius: 100px; }
.kf-root .cred-chip svg { width: 15px; height: 15px; color: var(--magenta-light); flex-shrink: 0; }
@media (max-width: 700px) { .kf-root .credential-band { grid-template-columns: 1fr; text-align: center; } .kf-root .cred-seal { margin-inline: auto; } .kf-root .cred-principles { justify-content: center; } }

.kf-root .sci-steps { display: grid; }
.kf-root .sci-step { min-height: 92vh; display: flex; flex-direction: column; justify-content: center; padding-block: 3rem; }
.kf-root .sci-step .num { font-family: var(--font-display); font-size: 3rem; color: var(--magenta-light); line-height: 1; }
.kf-root .sci-step h3 { font-family: var(--font-display); font-weight: 600; font-size: clamp(1.6rem, 3.4vw, 2.6rem); margin: 0.8rem 0 0.8rem; color: #fff; letter-spacing: -0.01em; }
.kf-root .sci-step p { color: rgba(248,244,251,0.8); max-width: 42ch; font-size: 1.05rem; }
.kf-root .sci-step .mini { display: flex; gap: 1.5rem; margin-top: 1.4rem; flex-wrap: wrap; }
.kf-root .sci-step .mini b { font-family: var(--font-display); font-size: 1.6rem; color: var(--magenta-light); font-weight: 600; display: block; }
.kf-root .sci-step .mini span { font-size: 0.78rem; color: rgba(248,244,251,0.65); }
@media (max-width: 899px) {
  .kf-root .sci-sticky { position: relative; height: auto; margin-bottom: 1.5rem; }
  .kf-root .sci-visual { aspect-ratio: 16/12; }
  .kf-root .sci-step { min-height: auto; padding-block: 1.5rem; }
}

/* ============================================================
   INGREDIENTS — horizontal pinned scroll
   ============================================================ */
.kf-root .ing { background: var(--paper); position: relative; }
.kf-root .ing__intro { display: flex; justify-content: space-between; align-items: flex-end; gap: 2rem; flex-wrap: wrap; margin-bottom: 2.5rem; padding-top: clamp(4.5rem, 12vh, 10rem); }
.kf-root .ing__pin { height: 320vh; position: relative; }
.kf-root .ing__sticky { position: sticky; top: 0; height: 100vh; display: flex; align-items: center; overflow: hidden; }
.kf-root .ing__track { display: flex; gap: 1.5rem; padding-inline: clamp(1.25rem, 6vw, 6rem); will-change: transform; }
.kf-root .ing-card {
  flex: 0 0 auto; width: min(78vw, 380px); height: 62vh; max-height: 520px;
  border-radius: 20px; padding: 2rem; display: flex; flex-direction: column; justify-content: space-between;
  background: var(--paper-2); border: 1px solid rgba(46,42,110,.1);
  position: relative; overflow: hidden;
}
.kf-root .ing-card:nth-child(odd) { background: var(--blush); }
.kf-root .ing-card .ic-n { font-family: var(--font-mono); font-size: 0.85rem; color: var(--magenta-deep); letter-spacing: 0.1em; }
.kf-root .ing-card h3 { font-family: var(--font-display); font-weight: 600; font-size: clamp(1.6rem, 3vw, 2.3rem); color: var(--indigo); line-height: 1.05; margin-bottom: 0.8rem; }
.kf-root .ing-card p { font-size: 0.98rem; color: var(--ink-soft); }
.kf-root .ing-card .tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: auto; }
.kf-root .ing-card .tags span { font-size: 0.72rem; font-weight: 600; padding: 0.35rem 0.7rem; border-radius: 100px; background: rgba(255,255,255,0.7); color: var(--indigo); }
.kf-root .ing-card .glyph { position: absolute; right: -10px; bottom: -20px; font-family: var(--font-display); font-size: 9rem; color: rgba(193,31,122,0.12); line-height: 1; pointer-events: none; }
.kf-root .ing-progress { position: absolute; left: clamp(1.25rem,6vw,6rem); right: clamp(1.25rem,6vw,6rem); bottom: 8vh; height: 2px; background: rgba(46,42,110,0.12); }
.kf-root .ing-progress i { display: block; height: 100%; width: 0; background: var(--magenta); }
@media (max-width: 700px) {
  .kf-root .ing__pin { height: auto; }
  .kf-root .ing__sticky { position: relative; height: auto; overflow: visible; padding-bottom: 3rem; }
  .kf-root .ing__track { flex-direction: column; transform: none !important; padding-inline: 0; }
  .kf-root .ing-card { width: 100%; height: auto; min-height: 260px; }
  .kf-root .ing-progress { display: none; }
}

/* ============================================================
   SUPPORT — preparation → conception journey
   ============================================================ */
.kf-root .support { background: linear-gradient(180deg, var(--paper), var(--paper-2)); }
.kf-root .journey { display: grid; grid-template-columns: 1fr 1fr; gap: 0; position: relative; margin-top: 2.6rem; }
.kf-root .journey .step { background: var(--paper-2); border: 1px solid rgba(46,42,110,.09); padding: 2.2rem 2.4rem; position: relative; }
.kf-root .journey .step:first-child { border-radius: 20px 0 0 20px; }
.kf-root .journey .step:last-child { border-radius: 0 20px 20px 0; border-left: none; }
.kf-root .journey .jn { font-family: var(--font-mono); font-weight: 700; color: var(--magenta-deep); font-size: 0.78rem; letter-spacing: 0.14em; }
.kf-root .journey .step h3 { font-family: var(--font-display); font-weight: 600; font-size: 1.6rem; color: var(--indigo); margin: 0.6rem 0 0.5rem; }
.kf-root .journey .step p { font-size: 0.96rem; color: var(--ink-soft); }
.kf-root .journey .arrow {
  position: absolute; right: -18px; top: 50%; translate: 0 -50%;
  width: 36px; height: 36px; border-radius: 50%; background: var(--grad-magenta);
  display: flex; align-items: center; justify-content: center; z-index: 2;
  box-shadow: 0 10px 24px -8px rgba(193,31,122,.5);
}
.kf-root .journey .arrow svg { width: 15px; height: 15px; color: #fff; }
@media (max-width: 700px) {
  .kf-root .journey { grid-template-columns: 1fr; }
  .kf-root .journey .step:first-child { border-radius: 20px 20px 0 0; }
  .kf-root .journey .step:last-child { border-radius: 0 0 20px 20px; border-left: 1px solid rgba(46,42,110,.09); border-top: none; }
  .kf-root .journey .arrow { right: auto; left: 50%; top: auto; bottom: -18px; translate: -50% 0; rotate: 90deg; }
}
.kf-root .checklist { display: flex; flex-direction: column; gap: 1rem; margin-top: 2.6rem; max-width: 640px; }
.kf-root .checklist .ci { display: flex; gap: 1rem; align-items: flex-start; }
.kf-root .checklist .mark { width: 30px; height: 30px; border-radius: 50%; background: var(--blush); color: var(--magenta-deep); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.kf-root .checklist .mark svg { width: 14px; height: 14px; }
.kf-root .checklist h4 { font-family: var(--font-display); font-weight: 600; font-size: 1.02rem; color: var(--indigo); margin-bottom: 0.2rem; }
.kf-root .checklist p { font-size: 0.9rem; color: var(--ink-soft); }

/* ============================================================
   BIOMARKERS
   ============================================================ */
.kf-root .bio { background: linear-gradient(180deg, var(--paper-2), var(--paper)); }
.kf-root .bio__head { max-width: 60ch; margin-bottom: 3rem; }
.kf-root .stat-grid { display: grid; gap: 1.2rem; grid-template-columns: 1fr; }
@media (min-width: 720px) { .kf-root .stat-grid { grid-template-columns: repeat(3, 1fr); } }
.kf-root .stat {
  background: var(--paper); border-radius: 18px; padding: 2rem 1.8rem;
  border: 1px solid rgba(46,42,110,.09);
  position: relative; overflow: hidden;
}
.kf-root .stat-ic { width: 38px; height: 38px; color: var(--magenta); margin-bottom: 0.9rem; }
.kf-root .stat-ic svg { width: 100%; height: 100%; }
.kf-root .stat .num { font-family: var(--font-display); font-weight: 600; font-size: clamp(2.6rem, 6vw, 4rem); color: var(--indigo); line-height: 1; letter-spacing: -0.02em; }
.kf-root .stat .num small { font-size: 0.4em; color: var(--magenta); }
.kf-root .stat .label { font-weight: 600; color: var(--magenta-deep); margin: 0.2rem 0 0.5rem; letter-spacing: 0.02em; }
.kf-root .stat p { font-size: 0.92rem; color: var(--ink-soft); }
.kf-root .stat::before { content: ""; position: absolute; top: 0; left: 0; height: 3px; width: 0; background: var(--magenta); transition: width 1s var(--ease); }
.kf-root .stat.in::before { width: 100%; }

/* ============================================================
   QUOTE
   ============================================================ */
.kf-root .quote { background: var(--magenta); color: #fff; text-align: center; }
.kf-root .quote blockquote {
  font-family: var(--font-display); font-weight: 500;
  font-size: clamp(1.7rem, 4.6vw, 3.4rem); line-height: 1.2; letter-spacing: -0.015em;
  max-width: 22ch; margin-inline: auto;
}
.kf-root .quote .hl { font-style: italic; color: var(--blush); }
.kf-root .quote cite { display: block; margin-top: 2rem; font-style: normal; font-size: 0.82rem; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.85); }

/* ============================================================
   AUDIENCE
   ============================================================ */
.kf-root .who__head { text-align: center; max-width: 900px; margin: 0 auto 3rem; }
.kf-root .aud-grid { display: grid; gap: 1.2rem; grid-template-columns: 1fr; align-items: stretch; }
@media (min-width: 820px) { .kf-root .aud-grid { grid-template-columns: repeat(3, 1fr); } }
.kf-root .aud {
  border-radius: 20px; padding: 2.5rem 2.2rem; height: 100%;
  display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;
  position: relative; overflow: hidden; color: var(--indigo);
  transition: transform 0.5s var(--ease);
}
.kf-root .aud:hover { transform: translateY(-6px); }
.kf-root .aud--1 { background: var(--blush); }
.kf-root .aud--2 { background: var(--blush-2); }
.kf-root .aud--3 { background: var(--indigo); color: #fff; }
.kf-root .aud .tag {
  font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--magenta-deep); font-weight: 700;
  margin-bottom: 1.2rem; height: 1.2rem; display: flex; align-items: center;
}
.kf-root .aud--3 .tag { color: var(--magenta-light); }
.kf-root .aud h3 {
  font-family: var(--font-display); font-weight: 600; font-size: 1.65rem;
  line-height: 1.18; min-height: 3.9rem; margin-bottom: 0.9rem;
  display: flex; align-items: flex-start;
}
.kf-root .aud p { font-size: 0.96rem; line-height: 1.55; color: inherit; opacity: 0.85; margin: 0; }

/* ============================================================
   TRUST
   ============================================================ */
.kf-root .trust { background: var(--paper-2); }
.kf-root .trust__grid { display: grid; gap: 1rem; grid-template-columns: 1fr; }
@media (min-width: 760px) { .kf-root .trust__grid { grid-template-columns: repeat(3, 1fr); } }
.kf-root .trust__item { padding: 1.6rem 0; border-top: 2px solid var(--magenta); }
.kf-root .trust__item h4 { font-family: var(--font-display); font-weight: 600; font-size: 1.2rem; color: var(--indigo); margin-bottom: 0.3rem; }
.kf-root .trust__item p { font-size: 0.9rem; color: var(--ink-soft); }

/* ============================================================
   CTA
   ============================================================ */
.kf-root .cta { text-align: center; position: relative; overflow: hidden; background: radial-gradient(70% 80% at 50% 20%, var(--blush), var(--paper) 75%); }
.kf-root .cta h2 { font-family: var(--font-display); font-weight: 600; font-size: clamp(2.6rem, 9vw, 7rem); line-height: 0.98; color: var(--indigo); letter-spacing: -0.03em; }
.kf-root .cta h2 em { font-style: italic; color: var(--magenta); }

/* ---------- Reveal (IntersectionObserver) ---------- */
.kf-root [data-reveal] { opacity: 0; transform: translateY(34px); transition: opacity 0.9s var(--ease), transform 0.9s var(--ease); }
.kf-root [data-reveal].in { opacity: 1; transform: none; }
.kf-root [data-reveal-delay="1"] { transition-delay: 0.08s; }
.kf-root [data-reveal-delay="2"] { transition-delay: 0.16s; }
.kf-root [data-reveal-delay="3"] { transition-delay: 0.24s; }

@media (prefers-reduced-motion: reduce) {
  .kf-root [data-reveal] { opacity: 1 !important; transform: none !important; }
  .kf-root .ing__pin { height: auto; } .kf-root .ing__sticky { position: relative; height: auto; } .kf-root .ing__track { flex-direction: column; transform: none !important; }
}
`;

export const KonceevFDetailPage: React.FC = () => {
  const [protocol, setProtocol] = useState<'natural' | 'ivf'>('natural');

  useEffect(() => {
    window.scrollTo(0, 0);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Cycle ring geometry ---------- */
    const arc = document.getElementById('ringArc');
    const dot = document.getElementById('ringDot');
    const pctEl = document.getElementById('ringPct');
    const ringWrap = document.getElementById('ringWrap');
    const phases = Array.from(document.querySelectorAll('.kf-root .phase'));
    const R = 88;
    const CIRC = 2 * Math.PI * R;
    if (arc) {
      arc.style.strokeDasharray = `${CIRC}`;
      arc.style.strokeDashoffset = `${CIRC}`;
    }

    /* ---------- Science pinned crossfade ---------- */
    const sciSteps = Array.from(document.querySelectorAll('.kf-root .sci-step'));
    const sciFigs = Array.from(document.querySelectorAll('.kf-root .sci-visual figure'));

    /* ---------- Ingredients horizontal ---------- */
    const ingPin = document.getElementById('ingPin');
    const ingTrack = document.getElementById('ingTrack');
    const ingBar = document.getElementById('ingBar');

    /* ---------- Progress ---------- */
    const progress = document.getElementById('progress');

    const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

    const frame = () => {
      const lenisScroll = (window as any).lenis?.scroll;
      const y = typeof lenisScroll === 'number' ? lenisScroll : (window.scrollY || document.documentElement.scrollTop);
      const vh = window.innerHeight;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;

      if (progress) progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';

      /* cycle ring draw */
      if (arc && ringWrap) {
        const rw = ringWrap.getBoundingClientRect();
        const rp = clamp((vh * 0.8 - rw.top) / (vh * 0.6), 0, 1);
        arc.style.strokeDashoffset = `${CIRC * (1 - rp)}`;
        const ang = rp * 2 * Math.PI - Math.PI / 2;
        if (dot) {
          dot.setAttribute('cx', `${100 + R * Math.cos(ang)}`);
          dot.setAttribute('cy', `${100 + R * Math.sin(ang)}`);
        }
        if (pctEl) pctEl.textContent = Math.round(rp * 100) + '%';
        const activeP = clamp(Math.floor(rp * phases.length), 0, phases.length - 1);
        phases.forEach((ph, idx) => ph.classList.toggle('active', idx <= activeP && rp > 0.05));
      }

      /* science steps -> active figure */
      if (sciSteps.length && sciFigs.length) {
        let best = 0;
        let bestD = Infinity;
        sciSteps.forEach((s, idx) => {
          const r = s.getBoundingClientRect();
          const d = Math.abs(r.top + r.height / 2 - vh / 2);
          if (d < bestD) {
            bestD = d;
            best = idx;
          }
        });
        sciFigs.forEach((f, idx) => f.classList.toggle('show', idx === best));
      }

      /* ingredients horizontal scroll */
      if (ingPin && ingTrack && window.innerWidth > 700) {
        const pr = ingPin.getBoundingClientRect();
        const total = pr.height - vh;
        const passed = clamp(-pr.top, 0, total);
        const pp = total > 0 ? passed / total : 0;
        const travel = ingTrack.scrollWidth - window.innerWidth;
        ingTrack.style.transform = 'translate3d(' + -pp * Math.max(travel, 0) + 'px,0,0)';
        if (ingBar) ingBar.style.width = pp * 100 + '%';
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          frame();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', frame);

    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.on('scroll', onScroll);
    }

    /* ---------- Reveal ---------- */
    const reveals = document.querySelectorAll('.kf-root [data-reveal]');
    let io: IntersectionObserver | null = null;
    if (!reduced && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in');
              io?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
      );
      reveals.forEach((el) => io?.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add('in'));
    }

    frame();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', frame);
      if (lenis) {
        lenis.off('scroll', onScroll);
      }
      if (io) io.disconnect();
    };
  }, []);

  return (
    <div className="kf-root">
      <style>{inlineStyles}</style>
      <div className="progress" id="progress"></div>

      {/* HERO SECTION */}
      <section className="hero" id="hero">
        <div className="container hero-grid">
          <div>
            <h1>
              KONC<span className="c2">EE</span><span className="c1">V-F</span>
            </h1>
            <p className="lede">
              A comprehensive pre-conception formula with clinically-dosed vitamins, minerals, amino acids, and advanced compounds, co-formulated with the Department of Reproductive Medicine at the University of Padova.
            </p>

            <div className="audience-toggle" id="audToggle">
              <button
                type="button"
                className={`aud-btn ${protocol === 'natural' ? 'is-active' : ''}`}
                onClick={() => setProtocol('natural')}
              >
                For Natural Conception
              </button>
              <button
                type="button"
                className={`aud-btn ${protocol === 'ivf' ? 'is-active' : ''}`}
                onClick={() => setProtocol('ivf')}
              >
                For IVF / ART
              </button>
            </div>
            <p className="aud-copy" id="audCopy">
              {protocol === 'ivf'
                ? 'Designed to support egg quality and overall readiness ahead of your IVF or assisted reproductive treatment.'
                : 'Supports egg health, balanced hormones, and regular cycles for women preparing to conceive naturally.'}
            </p>
          </div>

          <div className="flex justify-center items-center">
            <img
              src={konceevFImg}
              alt="KONCEEV-F Product"
              className="w-full max-w-[350px] h-auto object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-500 rounded-3xl"
            />
          </div>
        </div>
      </section>

      {/* CYCLE — scroll-drawn ring */}
      <section className="cycle pad" id="cycle">
        <div className="container cycle__grid">
          <div className="ring-wrap" id="ringWrap">
            <svg viewBox="0 0 200 200" aria-hidden="true">
              <circle className="ring-track" cx="100" cy="100" r="88"></circle>
              <circle className="ring-progress" id="ringArc" cx="100" cy="100" r="88"></circle>
              <circle className="ring-dot" id="ringDot" cx="100" cy="12" r="5"></circle>
            </svg>
            <div className="ring-center">
              <div className="big" id="ringPct">0%</div>
              <div className="sub">Cycle Support</div>
            </div>
          </div>
          <div>
            <h2 className="h2" data-reveal="true" style={{ margin: '0 0 2rem' }}>
              Four key pathways working in harmony with your body
            </h2>
            <div className="phase-list" id="phaseList">
              <div className="phase" data-phase="0">
                <span className="ph-n">01</span>
                <div>
                  <h3>Hormonal Balance</h3>
                  <p>Myo-Inositol and B-vitamins help nourish and balance the hormones that guide your monthly cycle.</p>
                </div>
              </div>
              <div className="phase" data-phase="1">
                <span className="ph-n">02</span>
                <div>
                  <h3>Cellular Protection</h3>
                  <p>Targeted antioxidants protect maturing egg cells against everyday oxidative stress.</p>
                </div>
              </div>
              <div className="phase" data-phase="2">
                <span className="ph-n">03</span>
                <div>
                  <h3>Enhanced Circulation</h3>
                  <p>L-Arginine and L-Citrulline promote healthy circulation and nutrient delivery to reproductive organs.</p>
                </div>
              </div>
              <div className="phase" data-phase="3">
                <span className="ph-n">04</span>
                <div>
                  <h3>Restorative Sleep</h3>
                  <p>Melatonin encourages the deep, restorative sleep your body needs for optimal hormone regulation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCIENCE — pinned scrollytelling */}
      <section className="science" id="science">
        <div className="container sci-head" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 className="h2" data-reveal="true" style={{ textAlign: 'center', maxWidth: '900px' }}>Evidence-based care. Every ingredient serves a purpose.</h2>
          <p className="lead" data-reveal="true" data-reveal-delay="1" style={{ textAlign: 'center', maxWidth: '800px', margin: '1rem auto 0' }}>
            Developed alongside reproductive medicine specialists using minimum effective doses based on peer-reviewed clinical research. Pure science with zero guesswork.
          </p>
        </div>
        <div className="container sci-stage">
          <div className="sci-sticky">
            <div className="sci-visual" id="sciVisual">
              <figure data-fig="0" className="show bg1 overflow-hidden">
                <img src={fDosingImg} alt="Optimal Dosing" className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700" />
              </figure>
              <figure data-fig="1" className="bg2 overflow-hidden">
                <img src={fBioavailabilityImg} alt="Superior Bioavailability" className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700" />
              </figure>
              <figure data-fig="2" className="bg3 overflow-hidden">
                <img src={fPurityQualityImg} alt="Safety & Purity" className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700" />
              </figure>
            </div>
          </div>
          <div className="sci-steps" id="sciSteps">
            <div className="sci-step" data-step="0">
              <span className="num">01</span>
              <h3>Optimal clinical dosing</h3>
              <p>We formulate based on published clinical trials to deliver the exact amount of each nutrient your body needs for maximum benefit.</p>
              <div className="mini">
                <div><b>Padova</b><span>Reproductive Medicine</span></div>
                <div><b>All 16</b><span>Evidence-backed ingredients</span></div>
              </div>
            </div>
            <div className="sci-step" data-step="1">
              <span className="num">02</span>
              <h3>Superior absorption</h3>
              <p>We choose active nutrient forms so your body can easily absorb and put every ingredient to work where it matters most.</p>
              <div className="mini">
                <div><b>CoQ10</b><span>Cellular energy</span></div>
                <div><b>Myo-Inositol</b><span>Hormonal balance</span></div>
              </div>
            </div>
            <div className="sci-step" data-step="2">
              <span className="num">03</span>
              <h3>Safety and purity</h3>
              <p>Every batch is crafted to strict quality standards in a USFDA-compliant facility, giving you complete peace of mind.</p>
              <div className="mini">
                <div><b>USFDA</b><span>Compliant facility</span></div>
                <div><b>Specialists</b><span>Co-formulated</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INGREDIENTS — horizontal pinned */}
      <section className="ing" id="formula">
        <div className="container ing__intro" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '2.5rem', paddingTop: 'clamp(4.5rem,12vh,10rem)' }}>
          <h2 className="h2" data-reveal="true" style={{ marginTop: '0', maxWidth: '800px', textAlign: 'center' }}>
            A thoughtful blend of reproductive nutrients
          </h2>
          <p className="lead" data-reveal="true" data-reveal-delay="1" style={{ maxWidth: '600px', margin: '0.8rem auto 0', textAlign: 'center' }}>
            Explore the complete formula. Each nutrient group works together to support your fertility.
          </p>
        </div>
        <div className="ing__pin" id="ingPin">
          <div className="ing__sticky">
            <div className="ing__track" id="ingTrack">
              <article className="ing-card">
                <div>
                  <span className="ic-n">01 / Vitamins</span>
                  <h3>Essential Vitamins</h3>
                  <p>Folic Acid, B12, B6, Vitamin E, and Vitamin D provide essential foundational support for healthy cells and hormones.</p>
                </div>
                <div className="tags">
                  <span>Folic Acid</span><span>B12</span><span>B6</span><span>Vit E</span><span>Vit D</span>
                </div>
                <span className="glyph">Ⅰ</span>
              </article>
              <article className="ing-card">
                <div>
                  <span className="ic-n">02 / Minerals</span>
                  <h3>Key Minerals</h3>
                  <p>Selenium, Iron, Magnesium, and Zinc act as vital cofactors to keep your body balanced and energized.</p>
                </div>
                <div className="tags">
                  <span>Selenium</span><span>Iron</span><span>Magnesium</span><span>Zinc</span>
                </div>
                <span className="glyph">Ⅱ</span>
              </article>
              <article className="ing-card">
                <div>
                  <span className="ic-n">03 / Amino</span>
                  <h3>Amino Support</h3>
                  <p>L-Arginine, L-Citrulline, and NAC help boost blood circulation and shield maturing cells.</p>
                </div>
                <div className="tags">
                  <span>L-Arginine</span><span>L-Citrulline</span><span>NAC</span>
                </div>
                <span className="glyph">Ⅲ</span>
              </article>
              <article className="ing-card">
                <div>
                  <span className="ic-n">04 / Advanced</span>
                  <h3>Advanced Compounds</h3>
                  <p>CoQ10, Astaxanthin, Melatonin, and Myo-Inositol work together to foster cellular energy and hormonal harmony.</p>
                </div>
                <div className="tags">
                  <span>CoQ10</span><span>Astaxanthin</span><span>Melatonin</span><span>Myo-Inositol</span>
                </div>
                <span className="glyph">Ⅳ</span>
              </article>
            </div>
            <div className="ing-progress"><i id="ingBar"></i></div>
          </div>
        </div>
      </section>

      {/* SUPPORT — preparation → conception */}
      <section className="support pad" id="support">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 className="h2" data-reveal="true" style={{ margin: '0 0 1rem', maxWidth: 'none', textAlign: 'center' }}>
              Guiding you from preparation to conception
            </h2>
            <p className="lead" data-reveal="true" data-reveal-delay="1" style={{ maxWidth: 'none', margin: '0 auto', textAlign: 'center' }}>
              Two thoughtful phases in one continuous formula, supporting your body before conception and during your key window.
            </p>
          </div>

          <div className="journey" data-reveal="true" data-reveal-delay="1">
            <div className="step">
              <span className="jn">PHASE 01</span>
              <h3>Preparation Phase</h3>
              <p>Prepares cellular health and builds up vital nutrient stores ahead of your conception window.</p>
              <span className="arrow">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <div className="step">
              <span className="jn">PHASE 02</span>
              <h3>Conception Support</h3>
              <p>Nurtures egg health and supports hormonal balance when you are actively trying to conceive.</p>
            </div>
          </div>

          <div className="checklist">
            <div className="ci" data-reveal="true">
              <span className="mark">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <h4>Enhanced Oocyte Quality</h4>
                <p>Supports healthy egg development and cellular vitality.</p>
              </div>
            </div>
            <div className="ci" data-reveal="true" data-reveal-delay="1">
              <span className="mark">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <h4>Superior Embryo Development</h4>
                <p>Helps create a favorable environment for early embryo development.</p>
              </div>
            </div>
            <div className="ci" data-reveal="true" data-reveal-delay="2">
              <span className="mark">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <h4>Increased Success Rates</h4>
                <p>Supports improved outcome potential as highlighted in clinical research.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BIOMARKERS */}
      <section className="bio pad" id="evidence">
        <div className="container">
          <div className="bio__head" style={{ textAlign: 'center', margin: '0 auto 3rem', maxWidth: '900px' }}>
            <h2 className="h2" data-reveal="true" style={{ margin: '0 0 1rem', textAlign: 'center' }}>
              Meaningful support for your reproductive health
            </h2>
            <p className="lead" data-reveal="true" data-reveal-delay="1" style={{ margin: '0 auto', textAlign: 'center', maxWidth: '800px' }}>
              Key markers like Anti-Müllerian Hormone offer insight into ovarian health. KONCEEV-F is crafted to nurture ovarian function and overall fertility potential.
            </p>
          </div>
          <div className="stat-grid">
            <div className="stat" data-reveal="true">
              <div className="stat-ic">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 2c3 4 6 8 6 12a6 6 0 01-12 0c0-4 3-8 6-12z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="label">AMH Support</div>
              <p>Vitamin D helps support healthy Anti-Müllerian Hormone levels, an important indicator of ovarian reserve.</p>
            </div>
            <div className="stat" data-reveal="true" data-reveal-delay="1">
              <div className="stat-ic">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 21s-7-4.35-9.33-8.9C.9 8.1 3 4.5 6.6 4.5c1.9 0 3.4 1 4.4 2.4 1-1.4 2.5-2.4 4.4-2.4 3.6 0 5.7 3.6 3.93 7.6C19 16.65 12 21 12 21z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="label">Progesterone Boost</div>
              <p>Promotes healthy progesterone levels during your mid-luteal phase to help support your implantation window.</p>
            </div>
            <div className="stat" data-reveal="true" data-reveal-delay="2">
              <div className="stat-ic">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </div>
              <div className="label">Cycle Regulation</div>
              <p>Myo-Inositol is widely studied for supporting regular cycle length and predictable timing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="pad" id="who">
        <div className="container">
          <div className="who__head">
            <h2 className="h2" data-reveal="true" style={{ marginTop: '0' }}>
              Science and care for your journey
            </h2>
          </div>
          <div className="aud-grid">
            <article className="aud aud--1" data-reveal="true">
              <span className="tag">For Women</span>
              <h3>Comprehensive Nutrition</h3>
              <p>Nourishes your egg health, balances your cycle, and supports your natural conception journey.</p>
            </article>
            <article className="aud aud--2" data-reveal="true" data-reveal-delay="1">
              <span className="tag">For Clinicians</span>
              <h3>Evidence-Based Support</h3>
              <p>A trusted, research-backed formulation you can confidently recommend to your patients.</p>
            </article>
            <article className="aud aud--3" data-reveal="true" data-reveal-delay="2">
              <span className="tag">For Families</span>
              <h3>A New Beginning</h3>
              <p>Combining clinical precision with warm, holistic care to help build the family you dream of.</p>
            </article>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="trust pad">
        <div className="container trust__grid">
          <div className="trust__item" data-reveal="true">
            <h4>Formulated by Specialists</h4>
            <p>Co-created with experienced reproductive endocrinologists and clinical specialists.</p>
          </div>
          <div className="trust__item" data-reveal="true" data-reveal-delay="1">
            <h4>University of Padova</h4>
            <p>Formulated in scientific collaboration with researchers in Padova, Italy.</p>
          </div>
          <div className="trust__item" data-reveal="true" data-reveal-delay="2">
            <h4>USFDA Compliant</h4>
            <p>Crafted under strict quality control standards in a USFDA-compliant facility.</p>
          </div>
        </div>
      </section>



      {/* ORIGINAL WEBSITE FOOTER */}
      <Footer />
    </div>
  );
};
