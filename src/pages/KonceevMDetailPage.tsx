import React, { useState, useEffect } from 'react';
import konceevMImg from '../assets/Konceev-M.png';
import mDosingImg from '../assets/m_dosing_science.jpg';
import mBioavailabilityImg from '../assets/m_bioavailability.jpg';
import mPurityQualityImg from '../assets/m_purity_quality.jpg';
import { Footer } from '../components/Footer';

interface DoseItem {
  group: string;
  name: string;
  tablet: number;
  tabletUnit: string;
  med: number;
  medUnit: string;
}

const doseData: DoseItem[] = [
  { group: 'Vitamins', name: 'Folic Acid', tablet: 200, tabletUnit: 'mcg', med: 400, medUnit: 'mcg' },
  { group: 'Vitamins', name: 'Vitamin B12', tablet: 12.5, tabletUnit: 'mcg', med: 25, medUnit: 'mcg' },
  { group: 'Vitamins', name: 'Vitamin E', tablet: 5, tabletUnit: 'mg', med: 20, medUnit: 'mg' },
  { group: 'Minerals', name: 'Zinc', tablet: 25, tabletUnit: 'mg', med: 50, medUnit: 'mg' },
  { group: 'Minerals', name: 'Selenium', tablet: 25, tabletUnit: 'mcg', med: 50, medUnit: 'mcg' },
  { group: 'Amino & Antioxidants', name: 'L-Carnitine', tablet: 500, tabletUnit: 'mg', med: 1000, medUnit: 'mg' },
  { group: 'Amino & Antioxidants', name: 'L-Taurine', tablet: 50, tabletUnit: 'mg', med: 100, medUnit: 'mg' },
  { group: 'Amino & Antioxidants', name: 'N-Acetyl Cysteine', tablet: 50, tabletUnit: 'mg', med: 600, medUnit: 'mg' },
  { group: 'Advanced', name: 'Coenzyme Q10', tablet: 100, tabletUnit: 'mg', med: 200, medUnit: 'mg' },
  { group: 'Advanced', name: 'Astaxanthin', tablet: 8, tabletUnit: 'mg', med: 16, medUnit: 'mg' },
  { group: 'Advanced', name: 'Lycopene', tablet: 2, tabletUnit: 'mg', med: 4, medUnit: 'mg' },
  { group: 'Advanced', name: 'L-Arginine', tablet: 300, tabletUnit: 'mg', med: 1400, medUnit: 'mg' },
  { group: 'Advanced', name: 'L-Citrulline', tablet: 200, tabletUnit: 'mg', med: 1200, medUnit: 'mg' }
];

const inlineStyles = `
/* ============================================================
   KONCEEV-M — Product Page
   Precision-instrument clinical system: graphite + cobalt + brass.
   ============================================================ */

:root{
  --graphite:#12162c;
  --graphite-deep:#0a0d1c;
  --indigo:#2b2f6e;
  --indigo-2:#3d3f8f;
  --cobalt:#2f6fed;
  --cobalt-deep:#1c4fc0;
  --cobalt-light:#7fb0ff;
  --brass:#caa15a;
  --brass-deep:#a9803c;
  --brass-light:#e8cd94;
  --paper:#ffffff;
  --paper-2:#f7f8fc;
  --mist:#eef1f8;
  --mist-2:#e3e9f7;

  --ink:#171a33;
  --ink-soft:rgba(23,26,51,.64);
  --ink-faint:rgba(23,26,51,.42);

  --grad-cobalt:linear-gradient(135deg,var(--cobalt-light),var(--cobalt) 60%,var(--cobalt-deep));
  --grad-navy:linear-gradient(160deg,var(--indigo-2),var(--indigo) 55%,var(--graphite-deep));
  --grad-brass:linear-gradient(135deg,var(--brass-light),var(--brass) 60%,var(--brass-deep));

  --font-display:'Space Grotesk',sans-serif;
  --font-body:'Instrument Sans',sans-serif;
  --font-mono:'IBM Plex Mono',monospace;

  --radius-pill:999px;
  --radius-md:20px;
  --shadow-card:0 26px 60px -30px rgba(10,13,28,.4);
  --ease:cubic-bezier(.22,.9,.28,1);
}

.km-root{
  font-family:var(--font-body);
  background:var(--paper);
  color:var(--ink);
  line-height:1.65;
  overflow-x:clip;
  -webkit-font-smoothing:antialiased;
  position:relative;
  min-height:100vh;
}

.km-root .container{width:100%;max-width:1220px;margin:0 auto;padding:0 32px;position:relative;}
.km-root .pad{padding-block:clamp(4.5rem,11vh,10rem);}

/* ---------- Typography ---------- */
.km-root .h2{
  font-family:var(--font-display);
  font-weight:600;
  font-size:clamp(2rem,4.2vw,3.4rem);
  line-height:1.1;
  color:var(--indigo);
  letter-spacing:-.01em;
}
.km-root .lead{
  font-size:clamp(1.02rem,1.5vw,1.22rem);
  line-height:1.6;
  color:var(--ink-soft);
  max-width:52ch;
}
.km-root .eyebrow{
  font-family:var(--font-mono);
  font-size:.72rem;
  font-weight:700;
  letter-spacing:.22em;
  text-transform:uppercase;
  color:var(--brass-deep);
  display:block;
  margin-bottom:.9rem;
}

/* ---------- Progress bar ---------- */
.km-root .progress{position:fixed;top:0;left:0;height:3px;width:0;background:var(--grad-cobalt);z-index:1000;}

/* ---------- Blueprint grid texture ---------- */
.km-root .blueprint{
  background-image:
    linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);
  background-size:44px 44px;
  background-position:center;
}
.km-root .corner{position:absolute;width:22px;height:22px;pointer-events:none;opacity:.55;}
.km-root .corner svg{width:100%;height:100%;}
.km-root .corner.tl{top:14px;left:14px;}
.km-root .corner.tr{top:14px;right:14px;transform:scaleX(-1);}
.km-root .corner.bl{bottom:14px;left:14px;transform:scaleY(-1);}
.km-root .corner.br{bottom:14px;right:14px;transform:scale(-1,-1);}

/* ============================================================
   HERO
   ============================================================ */
.km-root .hero{
  min-height:100vh;position:relative;overflow:hidden;
  display:flex;align-items:center;
  padding-top:clamp(60px,10vh,120px);
  padding-bottom:clamp(60px,8vh,100px);
  background:radial-gradient(120% 90% at 20% -10%,#1c2350 0%,var(--graphite) 45%,var(--graphite-deep) 100%);
  color:#fff;
}
.km-root .hero::after{
  content:"";position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(50% 60% at 82% 30%,rgba(47,111,237,.22),transparent 70%);
}
.km-root .hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:40px;align-items:center;width:100%;position:relative;z-index:1;}

.km-root .fig-label{
  font-family:var(--font-mono);font-size:.68rem;letter-spacing:.18em;text-transform:uppercase;
  color:var(--cobalt-light);opacity:.85;margin-bottom:1rem;display:flex;align-items:center;gap:.6rem;
}
.km-root .fig-label::before{content:"";width:22px;height:1px;background:var(--cobalt-light);}

.km-root .hero h1{
  font-family:var(--font-display);font-size:clamp(3rem,6.6vw,5.4rem);
  letter-spacing:-.01em;font-weight:600;line-height:1.05;color:#fff;
}
.km-root .hero h1 .c1{color:var(--cobalt-light);}
.km-root .hero h1 .c2{color:#fff;}

.km-root .hero .lede{font-size:clamp(1.02rem,1.5vw,1.22rem);color:rgba(255,255,255,.72);max-width:52ch;margin-top:20px;}

.km-root .audience-toggle{display:flex;gap:12px;margin-top:34px;flex-wrap:wrap;}
.km-root .aud-btn{
  padding:14px 24px;border-radius:var(--radius-pill);
  border:1.5px solid rgba(255,255,255,.22);background:rgba(255,255,255,.06);
  font-weight:700;font-size:.92rem;color:#fff;transition:.35s var(--ease);cursor:pointer;
}
.km-root .aud-btn.is-active{background:var(--grad-cobalt);border-color:transparent;box-shadow:var(--shadow-card);}
.km-root .aud-copy{margin-top:18px;font-size:.98rem;color:rgba(255,255,255,.68);max-width:52ch;min-height:48px;transition:opacity .4s ease;}

.km-root .dial-stage{position:relative;aspect-ratio:1;display:flex;align-items:center;justify-content:center;max-width:440px;margin:0 auto;width:100%;}
.km-root .dial-stage svg{width:100%;height:100%;overflow:visible;}
.km-root .dial-spin{animation:dial-spin 26s linear infinite;transform-origin:200px 200px;}
@keyframes dial-spin{to{transform:rotate(360deg);}}
.km-root .dial-tick{stroke:rgba(255,255,255,.25);stroke-width:1;}
.km-root .dial-tick.major{stroke:rgba(255,255,255,.5);stroke-width:1.6;}

@media(max-width:900px){
  .km-root .hero-grid{grid-template-columns:1fr;}
  .km-root .dial-stage{max-width:320px;margin:40px auto 0;}
}

/* ============================================================
   MANIFESTO
   ============================================================ */
.km-root .manifesto{background:var(--paper);}
.km-root .manifesto .container{max-width:1100px;}
.km-root .manifesto p{
  font-family:var(--font-display);font-weight:500;
  font-size:clamp(1.7rem,4.4vw,3.6rem);line-height:1.24;letter-spacing:-.015em;color:var(--indigo);
}
.km-root .manifesto .w{color:color-mix(in srgb,var(--indigo) 14%,var(--paper));transition:color .1s linear;display:inline-block;}
.km-root .manifesto .w.lit{color:var(--indigo);}
.km-root .manifesto .w.accent.lit{color:var(--cobalt-deep);font-style:italic;}

/* ============================================================
   CYCLE
   ============================================================ */
.km-root .cycle{background:linear-gradient(180deg,var(--paper),var(--paper-2));position:relative;}
.km-root .cycle__grid{display:grid;gap:3rem;grid-template-columns:1fr;align-items:center;}
@media(min-width:900px){.km-root .cycle__grid{grid-template-columns:.85fr 1fr;gap:4rem;}}

.km-root .ring-wrap{position:relative;display:grid;place-items:center;aspect-ratio:1;max-width:460px;margin-inline:auto;width:100%;}
.km-root .ring-wrap svg{width:100%;height:100%;transform:rotate(-90deg);overflow:visible;}
.km-root .ring-track{fill:none;stroke:color-mix(in srgb,var(--cobalt) 20%,transparent);stroke-width:2;}
.km-root .ring-progress{fill:none;stroke:var(--cobalt);stroke-width:3;stroke-linecap:round;filter:drop-shadow(0 0 6px color-mix(in srgb,var(--cobalt) 50%,transparent));}
.km-root .ring-dot{fill:var(--indigo);}
.km-root .ring-center{position:absolute;text-align:center;}
.km-root .ring-center .big{font-family:var(--font-display);font-size:clamp(2.4rem,7vw,4rem);color:var(--indigo);line-height:1;font-weight:600;}
.km-root .ring-center .sub{font-size:.72rem;letter-spacing:.24em;text-transform:uppercase;color:var(--brass-deep);margin-top:.4rem;}

.km-root .phase-list{display:grid;gap:.4rem;}
.km-root .phase{
  display:grid;grid-template-columns:auto 1fr;gap:1.1rem;align-items:start;padding:1.15rem 0;
  border-top:1px solid color-mix(in srgb,var(--indigo) 12%,transparent);
  opacity:.4;transition:opacity .5s var(--ease),transform .5s var(--ease);transform:translateX(-6px);
}
.km-root .phase.active{opacity:1;transform:none;}
.km-root .phase:last-child{border-bottom:1px solid color-mix(in srgb,var(--indigo) 12%,transparent);}
.km-root .phase .ph-n{
  font-family:var(--font-display);font-size:1.1rem;color:var(--cobalt-deep);
  width:2.2rem;height:2.2rem;display:grid;place-items:center;border-radius:50%;
  border:1px solid color-mix(in srgb,var(--cobalt) 45%,transparent);
  transition:background .5s var(--ease),color .5s var(--ease);
}
.km-root .phase.active .ph-n{background:var(--cobalt);color:#fff;border-color:var(--cobalt);}
.km-root .phase h3{font-size:1.15rem;color:var(--indigo);font-weight:600;margin-bottom:.15rem;}
.km-root .phase p{font-size:.95rem;color:var(--ink-soft);}

/* ============================================================
   SCIENCE
   ============================================================ */
.km-root .science{background:var(--graphite-deep);color:#fff;position:relative;}
.km-root .sci-head{padding-top:clamp(4rem,10vh,8rem);}
.km-root .sci-head .h2{color:#fff;max-width:22ch;}
.km-root .sci-head .lead{color:rgba(255,255,255,.72);}

.km-root .sci-stage{display:grid;gap:2.5rem;grid-template-columns:1fr;}
@media(min-width:900px){.km-root .sci-stage{grid-template-columns:1fr 1fr;gap:4rem;}}

.km-root .sci-sticky{position:sticky;top:0;height:100vh;display:grid;place-items:center;}
.km-root .sci-visual{position:relative;width:100%;aspect-ratio:4/5;max-height:76vh;border-radius:20px;overflow:hidden;box-shadow:0 40px 80px rgba(0,0,0,.45);}
.km-root .sci-visual figure{position:absolute;inset:0;opacity:0;transition:opacity .7s var(--ease),transform 1.4s var(--ease);margin:0;display:flex;align-items:center;justify-content:center;}
.km-root .sci-visual figure.show{opacity:1;}
.km-root .sci-visual figure.bg1{background:radial-gradient(120% 100% at 30% 15%,var(--indigo-2),var(--graphite-deep) 55%,#050611 100%);}
.km-root .sci-visual figure.bg2{background:radial-gradient(120% 100% at 75% 20%,var(--cobalt-deep),var(--graphite-deep) 55%,#050611 100%);}
.km-root .sci-visual figure.bg3{background:radial-gradient(120% 100% at 50% 85%,var(--brass-deep),var(--graphite-deep) 55%,#050611 100%);}
.km-root .sci-icon{width:32%;max-width:150px;color:var(--cobalt-light);}
.km-root .sci-icon svg{width:100%;height:100%;}
.km-root .sci-visual figcaption{
  position:absolute;left:1.2rem;bottom:1.2rem;right:1.2rem;font-size:.78rem;letter-spacing:.04em;
  color:#fff;background:rgba(10,13,28,.7);backdrop-filter:blur(6px);padding:.7rem .9rem;border-radius:10px;
}

.km-root .credential-band{
  display:grid;grid-template-columns:auto 1fr;align-items:center;gap:1.6rem;
  background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.12);border-radius:20px;
  padding:1.7rem clamp(1.3rem,3vw,2.2rem);margin-top:clamp(2rem,5vh,3rem);
}
.km-root .cred-seal{
  width:84px;height:84px;border-radius:50%;flex-shrink:0;border:1.5px solid rgba(202,161,90,.7);
  display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;
}
.km-root .cred-seal svg{width:22px;height:22px;color:var(--brass-light);margin-bottom:4px;}
.km-root .cred-seal span{font-family:var(--font-mono);font-size:.5rem;font-weight:700;letter-spacing:.04em;line-height:1.35;color:rgba(255,255,255,.72);padding:0 4px;}
.km-root .cred-principles{display:flex;flex-wrap:wrap;gap:.7rem;}
.km-root .cred-chip{display:flex;gap:.55rem;align-items:center;font-size:.85rem;color:rgba(255,255,255,.88);background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);padding:.65rem 1rem;border-radius:100px;}
.km-root .cred-chip svg{width:15px;height:15px;color:var(--cobalt-light);flex-shrink:0;}
@media(max-width:700px){.km-root .credential-band{grid-template-columns:1fr;text-align:center;}.km-root .cred-seal{margin-inline:auto;}.km-root .cred-principles{justify-content:center;}}

.km-root .sci-steps{display:grid;}
.km-root .sci-step{min-height:92vh;display:flex;flex-direction:column;justify-content:center;padding-block:3rem;}
.km-root .sci-step .num{font-family:var(--font-display);font-size:3rem;color:var(--brass-light);line-height:1;}
.km-root .sci-step h3{font-family:var(--font-display);font-weight:600;font-size:clamp(1.6rem,3.4vw,2.6rem);margin:.8rem 0;color:#fff;letter-spacing:-.01em;}
.km-root .sci-step p{color:rgba(255,255,255,.8);max-width:42ch;font-size:1.05rem;}
.km-root .sci-step .mini{display:flex;gap:1.5rem;margin-top:1.4rem;flex-wrap:wrap;}
.km-root .sci-step .mini b{font-family:var(--font-display);font-size:1.6rem;color:var(--cobalt-light);font-weight:600;display:block;}
.km-root .sci-step .mini span{font-size:.78rem;color:rgba(255,255,255,.65);}
@media(max-width:899px){
  .km-root .sci-sticky{position:relative;height:auto;margin-bottom:1.5rem;}
  .km-root .sci-visual{aspect-ratio:16/12;}
  .km-root .sci-step{min-height:auto;padding-block:1.5rem;}
}

/* ============================================================
   INGREDIENTS
   ============================================================ */
.km-root .ing{background:var(--paper);position:relative;}
.km-root .ing__intro{display:flex;justify-content:space-between;align-items:flex-end;gap:2rem;flex-wrap:wrap;margin-bottom:2.5rem;padding-top:clamp(4.5rem,12vh,10rem);}
.km-root .ing__pin{height:320vh;position:relative;}
.km-root .ing__sticky{position:sticky;top:0;height:100vh;display:flex;align-items:center;overflow:hidden;}
.km-root .ing__track{display:flex;gap:1.5rem;padding-inline:clamp(1.25rem,6vw,6rem);will-change:transform;}
.km-root .ing-card{
  flex:0 0 auto;width:min(78vw,380px);height:62vh;max-height:520px;border-radius:20px;padding:2rem;
  display:flex;flex-direction:column;justify-content:space-between;background:var(--paper-2);
  border:1px solid rgba(43,47,110,.1);position:relative;overflow:hidden;
}
.km-root .ing-card:nth-child(odd){background:var(--mist);}
.km-root .ing-card .ic-n{font-family:var(--font-mono);font-size:.85rem;color:var(--cobalt-deep);letter-spacing:.1em;}
.km-root .ing-card h3{font-family:var(--font-display);font-weight:600;font-size:clamp(1.6rem,3vw,2.3rem);color:var(--indigo);line-height:1.05;margin-bottom:.8rem;}
.km-root .ing-card p{font-size:.98rem;color:var(--ink-soft);}
.km-root .ing-card .tags{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:auto;}
.km-root .ing-card .tags span{font-size:.72rem;font-weight:600;padding:.35rem .7rem;border-radius:100px;background:rgba(255,255,255,.7);color:var(--indigo);}
.km-root .ing-card .glyph{position:absolute;right:-10px;bottom:-20px;font-family:var(--font-display);font-size:9rem;color:rgba(47,111,237,.1);line-height:1;pointer-events:none;}
.km-root .ing-progress{position:absolute;left:clamp(1.25rem,6vw,6rem);right:clamp(1.25rem,6vw,6rem);bottom:8vh;height:2px;background:rgba(43,47,110,.12);}
.km-root .ing-progress i{display:block;height:100%;width:0;background:var(--cobalt);}
@media(max-width:700px){
  .km-root .ing__pin{height:auto;}
  .km-root .ing__sticky{position:relative;height:auto;overflow:visible;padding-bottom:3rem;}
  .km-root .ing__track{flex-direction:column;transform:none!important;padding-inline:0;}
  .km-root .ing-card{width:100%;height:auto;min-height:260px;}
  .km-root .ing-progress{display:none;}
}

/* ============================================================
   DOSE TABLE
   ============================================================ */
.km-root .dose{background:linear-gradient(180deg,var(--paper-2),var(--paper));}
.km-root .dose__head{display:flex;justify-content:space-between;align-items:flex-end;gap:2rem;flex-wrap:wrap;margin-bottom:2.6rem;}
.km-root .dose__legend{display:flex;gap:1.4rem;flex-wrap:wrap;font-size:.82rem;color:var(--ink-soft);}
.km-root .dose__legend span{display:flex;align-items:center;gap:.5rem;}
.km-root .dose__legend i{width:12px;height:12px;border-radius:3px;display:inline-block;}
.km-root .dose__legend i.a{background:var(--cobalt);}
.km-root .dose__legend i.b{background:color-mix(in srgb,var(--indigo) 18%,transparent);}

.km-root .dose-table{border-top:1px solid rgba(23,26,51,.1);}
.km-root .dose-row{
  display:grid;grid-template-columns:1.1fr .7fr 2fr .9fr;gap:1.2rem;align-items:center;
  padding:1.1rem 0;border-bottom:1px solid rgba(23,26,51,.08);
}
.km-root .dose-row .group-tag{font-family:var(--font-mono);font-size:.68rem;letter-spacing:.1em;color:var(--brass-deep);text-transform:uppercase;}
.km-root .dose-row .name{font-weight:700;color:var(--indigo);font-size:1rem;}
.km-root .dose-row .bar-track{position:relative;height:8px;border-radius:6px;background:var(--mist-2);overflow:hidden;}
.km-root .dose-row .bar-fill{position:absolute;left:0;top:0;bottom:0;width:0;border-radius:6px;background:var(--grad-cobalt);transition:width 1.1s var(--ease);}
.km-root .dose-row.in .bar-fill{width:var(--pct);}
.km-root .dose-row .amounts{font-family:var(--font-mono);font-size:.78rem;color:var(--ink-soft);text-align:right;white-space:nowrap;}
.km-root .dose-row .amounts b{color:var(--ink);}
.km-root .dose__foot{margin-top:1.8rem;font-size:.82rem;color:var(--ink-faint);max-width:64ch;}
@media(max-width:760px){
  .km-root .dose-row{grid-template-columns:1fr;gap:.5rem;padding:1.3rem 0;}
  .km-root .dose-row .amounts{text-align:left;}
}

/* ============================================================
   SUPPORT / JOURNEY
   ============================================================ */
.km-root .support{background:linear-gradient(180deg,var(--paper),var(--paper-2));}
.km-root .journey{display:grid;grid-template-columns:1fr 1fr;gap:0;position:relative;margin-top:2.6rem;}
.km-root .journey .step{background:var(--paper-2);border:1px solid rgba(43,47,110,.09);padding:2.2rem 2.4rem;position:relative;}
.km-root .journey .step:first-child{border-radius:20px 0 0 20px;}
.km-root .journey .step:last-child{border-radius:0 20px 20px 0;border-left:none;}
.km-root .journey .jn{font-family:var(--font-mono);font-weight:700;color:var(--brass-deep);font-size:.78rem;letter-spacing:.14em;}
.km-root .journey .step h3{font-family:var(--font-display);font-weight:600;font-size:1.6rem;color:var(--indigo);margin:.6rem 0 .5rem;}
.km-root .journey .step p{font-size:.96rem;color:var(--ink-soft);}
.km-root .journey .arrow{
  position:absolute;right:-18px;top:50%;translate:0 -50%;width:36px;height:36px;border-radius:50%;
  background:var(--grad-cobalt);display:flex;align-items:center;justify-content:center;z-index:2;
  box-shadow:0 10px 24px -8px rgba(47,111,237,.5);
}
.km-root .journey .arrow svg{width:15px;height:15px;color:#fff;}
@media(max-width:700px){
  .km-root .journey{grid-template-columns:1fr;}
  .km-root .journey .step:first-child{border-radius:20px 20px 0 0;}
  .km-root .journey .step:last-child{border-radius:0 0 20px 20px;border-left:1px solid rgba(43,47,110,.09);border-top:none;}
  .km-root .journey .arrow{right:auto;left:50%;top:auto;bottom:-18px;translate:-50% 0;rotate:90deg;}
}
.km-root .checklist{display:flex;flex-direction:column;gap:1rem;margin-top:2.6rem;max-width:640px;}
.km-root .checklist .ci{display:flex;gap:1rem;align-items:flex-start;}
.km-root .checklist .mark{width:30px;height:30px;border-radius:50%;background:var(--mist);color:var(--cobalt-deep);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.km-root .checklist .mark svg{width:14px;height:14px;}
.km-root .checklist h4{font-family:var(--font-display);font-weight:600;font-size:1.02rem;color:var(--indigo);margin-bottom:.2rem;}
.km-root .checklist p{font-size:.9rem;color:var(--ink-soft);}

/* ============================================================
   STATS
   ============================================================ */
.km-root .bio{background:linear-gradient(180deg,var(--paper-2),var(--paper));}
.km-root .bio__head{max-width:900px;margin-bottom:3rem;}
.km-root .stat-grid{display:grid;gap:1.2rem;grid-template-columns:1fr;}
@media(min-width:720px){.km-root .stat-grid{grid-template-columns:repeat(3,1fr);}}
.km-root .stat{background:var(--paper);border-radius:18px;padding:2rem 1.8rem;border:1px solid rgba(43,47,110,.09);position:relative;overflow:hidden;}
.km-root .stat-ic{width:38px;height:38px;color:var(--cobalt);margin-bottom:.9rem;}
.km-root .stat-ic svg{width:100%;height:100%;}
.km-root .stat .num{font-family:var(--font-display);font-weight:600;font-size:clamp(2.6rem,6vw,4rem);color:var(--indigo);line-height:1;letter-spacing:-.02em;}
.km-root .stat .num small{font-size:.4em;color:var(--cobalt);}
.km-root .stat .label{font-weight:600;color:var(--brass-deep);margin:.2rem 0 .5rem;letter-spacing:.02em;}
.km-root .stat p{font-size:.92rem;color:var(--ink-soft);}
.km-root .stat::before{content:"";position:absolute;top:0;left:0;height:3px;width:0;background:var(--cobalt);transition:width 1s var(--ease);}
.km-root .stat.in::before{width:100%;}

/* ============================================================
   QUOTE
   ============================================================ */
.km-root .quote{background:var(--graphite-deep);color:#fff;text-align:center;}
.km-root .quote blockquote{
  font-family:var(--font-display);font-weight:500;font-size:clamp(1.7rem,4.6vw,3.4rem);
  line-height:1.2;letter-spacing:-.015em;max-width:24ch;margin-inline:auto;
}
.km-root .quote .hl{font-style:italic;color:var(--brass-light);}
.km-root .quote cite{display:block;margin-top:2rem;font-style:normal;font-size:.8rem;letter-spacing:.08em;color:rgba(255,255,255,.62);}

/* ============================================================
   AUDIENCE
   ============================================================ */
.km-root .who__head{text-align:center;max-width:900px;margin:0 auto 3rem;}
.km-root .aud-grid{display:grid;gap:1.2rem;grid-template-columns:1fr;align-items:stretch;}
@media(min-width:820px){.km-root .aud-grid{grid-template-columns:repeat(3,1fr);}}
.km-root .aud{
  border-radius:20px;padding:2.5rem 2.2rem;height:100%;display:flex;flex-direction:column;
  justify-content:flex-start;align-items:flex-start;position:relative;overflow:hidden;color:var(--indigo);
  transition:transform .5s var(--ease);
}
.km-root .aud:hover{transform:translateY(-6px);}
.km-root .aud--1{background:var(--mist);}
.km-root .aud--2{background:var(--mist-2);}
.km-root .aud--3{background:var(--graphite-deep);color:#fff;}
.km-root .aud .tag{font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;color:var(--brass-deep);font-weight:700;margin-bottom:1.2rem;height:1.2rem;display:flex;align-items:center;}
.km-root .aud--3 .tag{color:var(--cobalt-light);}
.km-root .aud h3{font-family:var(--font-display);font-weight:600;font-size:1.65rem;line-height:1.18;min-height:3.9rem;margin-bottom:.9rem;display:flex;align-items:flex-start;}
.km-root .aud p{font-size:.96rem;line-height:1.55;color:inherit;opacity:.85;margin:0;}

/* ============================================================
   TRUST
   ============================================================ */
.km-root .trust{background:var(--paper-2);}
.km-root .trust__grid{display:grid;gap:1rem;grid-template-columns:1fr;}
@media(min-width:760px){.km-root .trust__grid{grid-template-columns:repeat(3,1fr);}}
.km-root .trust__item{padding:1.6rem 0;border-top:2px solid var(--cobalt);}
.km-root .trust__item h4{font-family:var(--font-display);font-weight:600;font-size:1.2rem;color:var(--indigo);margin-bottom:.3rem;}
.km-root .trust__item p{font-size:.9rem;color:var(--ink-soft);}

/* ============================================================
   CTA
   ============================================================ */
.km-root .cta{text-align:center;position:relative;overflow:hidden;background:radial-gradient(70% 80% at 50% 20%,var(--mist),var(--paper) 75%);}
.km-root .cta h2{font-family:var(--font-display);font-weight:600;font-size:clamp(2.6rem,9vw,7rem);line-height:.98;color:var(--indigo);letter-spacing:-.03em;}
.km-root .cta h2 em{font-style:italic;color:var(--cobalt-deep);}
.km-root .cta .cta-btn{
  display:inline-flex;align-items:center;gap:.6rem;margin-top:2.4rem;padding:1rem 2rem;
  background:var(--grad-navy);color:#fff;font-weight:700;font-size:.95rem;border-radius:var(--radius-pill);
  box-shadow:var(--shadow-card);border:none;cursor:pointer;
}

/* ---------- Reveal ---------- */
.km-root [data-reveal]{opacity:0;transform:translateY(34px);transition:opacity .9s var(--ease),transform .9s var(--ease);}
.km-root [data-reveal].in{opacity:1;transform:none;}
.km-root [data-reveal-delay="1"]{transition-delay:.08s;}
.km-root [data-reveal-delay="2"]{transition-delay:.16s;}
.km-root [data-reveal-delay="3"]{transition-delay:.24s;}

@media(prefers-reduced-motion:reduce){
  .km-root [data-reveal]{opacity:1!important;transform:none!important;}
  .km-root .ing__pin{height:auto;}.km-root .ing__sticky{position:relative;height:auto;}.km-root .ing__track{flex-direction:column;transform:none!important;}
  .km-root .dial-spin{animation:none;}
}
`;

export const KonceevMDetailPage: React.FC = () => {
  const [protocol, setProtocol] = useState<'natural' | 'ivf'>('natural');

  useEffect(() => {
    window.scrollTo(0, 0);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Cycle ring geometry ---------- */
    const arc = document.getElementById('ringArc');
    const dot = document.getElementById('ringDot');
    const pctEl = document.getElementById('ringPct');
    const ringWrap = document.getElementById('ringWrap');
    const phases = Array.from(document.querySelectorAll('.km-root .phase'));
    const R = 88;
    const CIRC = 2 * Math.PI * R;
    if (arc) {
      arc.style.strokeDasharray = `${CIRC}`;
      arc.style.strokeDashoffset = `${CIRC}`;
    }

    /* ---------- Science pinned crossfade ---------- */
    const sciSteps = Array.from(document.querySelectorAll('.km-root .sci-step'));
    const sciFigs = Array.from(document.querySelectorAll('.km-root .sci-visual figure'));

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
    const reveals = document.querySelectorAll('.km-root [data-reveal]');
    let io: IntersectionObserver | null = null;
    let io2: IntersectionObserver | null = null;
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

      const stats = document.querySelectorAll('.km-root .stat, .km-root .dose-row');
      io2 = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in');
              io2?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      stats.forEach((el) => io2?.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add('in'));
      document.querySelectorAll('.km-root .stat, .km-root .dose-row').forEach((el) => el.classList.add('in'));
    }

    frame();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', frame);
      if (lenis) {
        lenis.off('scroll', onScroll);
      }
      if (io) io.disconnect();
      if (io2) io2.disconnect();
    };
  }, []);

  let lastGroup: string | null = null;

  return (
    <div className="km-root">
      <style>{inlineStyles}</style>
      <div className="progress" id="progress"></div>

      {/* HERO */}
      <section className="hero blueprint" id="hero">
        <div className="container hero-grid">
          <div>
            <h1>
              <span className="c2">KONC</span>
              <span className="c2">EE</span>
              <span className="c1">V-M</span>
            </h1>
            <p className="lede">
              A comprehensive male fertility formula co-formulated with the University of Padova, blending clinically-dosed vitamins, essential minerals, amino acids, and key antioxidants to support your pre-conception journey.
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
                ? "Designed to support sperm quality and readiness ahead of your partner's IVF or assisted reproductive treatment."
                : 'Supports sperm concentration, motility, and DNA integrity for men preparing to conceive naturally.'}
            </p>
          </div>

          <div className="flex justify-center items-center">
            <img
              src={konceevMImg}
              alt="KONCEEV-M Product"
              className="w-full max-w-[350px] h-auto object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform duration-500 rounded-3xl"
            />
          </div>
        </div>
      </section>

      {/* CYCLE */}
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
              <div className="sub">Sperm Health</div>
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
                  <h3>Cellular Protection</h3>
                  <p>CoQ10, Astaxanthin, Lycopene, and Vitamin E shield maturing sperm cells from everyday oxidative stress.</p>
                </div>
              </div>
              <div className="phase" data-phase="1">
                <span className="ph-n">02</span>
                <div>
                  <h3>DNA Integrity</h3>
                  <p>Folic Acid, Vitamin B12, and N-Acetyl Cysteine help protect genetic material during sperm development.</p>
                </div>
              </div>
              <div className="phase" data-phase="2">
                <span className="ph-n">03</span>
                <div>
                  <h3>Circulation &amp; Energy</h3>
                  <p>L-Arginine, L-Citrulline, L-Carnitine, and L-Taurine support healthy blood flow and cellular energy for stronger motility.</p>
                </div>
              </div>
              <div className="phase" data-phase="3">
                <span className="ph-n">04</span>
                <div>
                  <h3>Foundational Minerals</h3>
                  <p>Zinc and Selenium act as essential cofactors for healthy concentration and morphology.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCIENCE */}
      <section className="science blueprint" id="science">
        <div className="container sci-head" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 className="h2" data-reveal="true" style={{ textAlign: 'center', maxWidth: '900px' }}>Evidence-based care. Every ingredient serves a purpose.</h2>
          <p className="lead" data-reveal="true" data-reveal-delay="1" style={{ textAlign: 'center', maxWidth: '800px', margin: '1rem auto 0' }}>
            Developed alongside andrology and reproductive medicine specialists using minimum effective doses based on peer-reviewed clinical research. Pure science with zero guesswork.
          </p>
        </div>

        <div className="container sci-stage">
          <div className="sci-sticky">
            <div className="sci-visual" id="sciVisual">
              <span className="corner tl">
                <svg viewBox="0 0 22 22" fill="none">
                  <path d="M1 9V1H9" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
              <span className="corner br">
                <svg viewBox="0 0 22 22" fill="none">
                  <path d="M1 9V1H9" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
              <figure data-fig="0" className="show bg1 overflow-hidden">
                <img src={mDosingImg} alt="Optimal Dosing" className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700" />
              </figure>
              <figure data-fig="1" className="bg2 overflow-hidden">
                <img src={mBioavailabilityImg} alt="Superior Bioavailability" className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700" />
              </figure>
              <figure data-fig="2" className="bg3 overflow-hidden">
                <img src={mPurityQualityImg} alt="Safety & Purity" className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700" />
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
                <div><b>All 13</b><span>Evidence-backed ingredients</span></div>
              </div>
            </div>
            <div className="sci-step" data-step="1">
              <span className="num">02</span>
              <h3>Superior absorption</h3>
              <p>We choose active nutrient forms so your body can easily absorb and put every ingredient to work where it matters most.</p>
              <div className="mini">
                <div><b>CoQ10</b><span>Cellular energy</span></div>
                <div><b>L-Carnitine</b><span>Sperm motility</span></div>
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

      {/* INGREDIENTS */}
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
                  <p>Folic Acid, Vitamin B12, and Vitamin E provide foundational support for healthy cell division and sperm development.</p>
                </div>
                <div className="tags">
                  <span>Folic Acid</span><span>B12</span><span>Vit E</span>
                </div>
                <span className="glyph">Ⅰ</span>
              </article>
              <article className="ing-card">
                <div>
                  <span className="ic-n">02 / Minerals</span>
                  <h3>Key Minerals</h3>
                  <p>Zinc and Selenium act as vital cofactors for healthy concentration, morphology, and motility.</p>
                </div>
                <div className="tags">
                  <span>Zinc</span><span>Selenium</span>
                </div>
                <span className="glyph">Ⅱ</span>
              </article>
              <article className="ing-card">
                <div>
                  <span className="ic-n">03 / Amino &amp; Antioxidants</span>
                  <h3>Amino Support</h3>
                  <p>L-Carnitine, L-Taurine, and N-Acetyl Cysteine help fuel motility and shield maturing cells from oxidative stress.</p>
                </div>
                <div className="tags">
                  <span>L-Carnitine</span><span>L-Taurine</span><span>NAC</span>
                </div>
                <span className="glyph">Ⅲ</span>
              </article>
              <article className="ing-card">
                <div>
                  <span className="ic-n">04 / Advanced</span>
                  <h3>Advanced Compounds</h3>
                  <p>CoQ10, Astaxanthin, Lycopene, L-Arginine, and L-Citrulline work together to support cellular energy and circulation.</p>
                </div>
                <div className="tags">
                  <span>CoQ10</span><span>Astaxanthin</span><span>Lycopene</span><span>L-Arginine</span><span>L-Citrulline</span>
                </div>
                <span className="glyph">Ⅳ</span>
              </article>
            </div>
            <div className="ing-progress"><i id="ingBar"></i></div>
          </div>
        </div>
      </section>

      {/* DOSE TABLE */}
      <section className="dose pad" id="doses">
        <div className="container">
          <div className="dose__head" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '2.6rem' }}>
            <h2 className="h2" data-reveal="true" style={{ margin: '0 auto', maxWidth: '800px', textAlign: 'center' }}>
              Formulated at clinically effective doses
            </h2>
            <p className="lead" data-reveal="true" data-reveal-delay="1" style={{ maxWidth: '650px', margin: '0.8rem auto 0', textAlign: 'center' }}>
              No proprietary blends. Every nutrient below is benchmarked against the minimum effective dose identified in peer-reviewed male fertility research.
            </p>
          </div>

          <div className="dose__legend" data-reveal="true">
            <span><i className="a"></i>Per tablet</span>
            <span><i className="b"></i>Minimum effective dose (published research)</span>
          </div>

          <div className="dose-table" id="doseTable">
            {doseData.map((d, idx) => {
              const pct = Math.min(100, (d.tablet / d.med) * 100);
              const showGroup = d.group !== lastGroup;
              if (showGroup) lastGroup = d.group;

              return (
                <div
                  key={idx}
                  className="dose-row"
                  data-reveal="true"
                  style={{ '--pct': `${pct}%` } as React.CSSProperties}
                >
                  <span className="group-tag">{showGroup ? d.group : ''}</span>
                  <span className="name">{d.name}</span>
                  <span className="bar-track">
                    <span className="bar-fill"></span>
                  </span>
                  <span className="amounts">
                    <b>{d.tablet} {d.tabletUnit}</b> / {d.med} {d.medUnit}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SUPPORT */}
      <section className="support pad" id="support">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 className="h2" data-reveal="true" style={{ margin: '0 0 1rem', maxWidth: 'none', textAlign: 'center' }}>
              Guiding you from preparation to peak performance
            </h2>
            <p className="lead" data-reveal="true" data-reveal-delay="1" style={{ maxWidth: 'none', margin: '0 auto', textAlign: 'center' }}>
              One continuous formula, supporting your body through the full ~74-day sperm maturation cycle.
            </p>
          </div>

          <div className="journey" data-reveal="true" data-reveal-delay="1">
            <div className="step">
              <span className="jn">PHASE 01</span>
              <h3>Foundation Phase</h3>
              <p>Builds antioxidant reserves and supports the early stages of sperm cell development.</p>
              <span className="arrow">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <div className="step">
              <span className="jn">PHASE 02</span>
              <h3>Maturation Support</h3>
              <p>Nurtures motility, morphology, and DNA integrity as sperm cells complete their maturation cycle.</p>
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
                <h4>Enhanced Conception</h4>
                <p>Improved sperm parameters can support higher natural conception rates.</p>
              </div>
            </div>
            <div className="ci" data-reveal="true" data-reveal-delay="1">
              <span className="mark">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <h4>ART Success</h4>
                <p>Supports better outcomes for assisted reproductive technologies.</p>
              </div>
            </div>
            <div className="ci" data-reveal="true" data-reveal-delay="2">
              <span className="mark">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <h4>Broader Reproductive Health</h4>
                <p>Supports overall male reproductive health, not just count.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bio pad" id="evidence">
        <div className="container">
          <div className="bio__head" style={{ textAlign: 'center', margin: '0 auto 3rem', maxWidth: '900px' }}>
            <h2 className="h2" data-reveal="true" style={{ margin: '0 0 1rem', textAlign: 'center' }}>
              Meaningful support for your reproductive health
            </h2>
            <p className="lead" data-reveal="true" data-reveal-delay="1" style={{ margin: '0 auto', textAlign: 'center', maxWidth: '800px' }}>
              Key parameters like concentration, motility, and DNA integrity offer insight into male fertility. KONCEEV-M is crafted to nurture each one.
            </p>
          </div>
          <div className="stat-grid">
            <div className="stat" data-reveal="true">
              <div className="stat-ic">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="7" cy="7" r="2.3" stroke="currentColor" strokeWidth="1.4" />
                  <circle cx="17" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.4" />
                  <circle cx="10" cy="17" r="2.3" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </div>
              <div className="label">Concentration &amp; Count</div>
              <p>Zinc, Folic Acid, and L-Carnitine act as key cofactors supporting healthy sperm concentration and count.</p>
            </div>
            <div className="stat" data-reveal="true" data-reveal-delay="1">
              <div className="stat-ic">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M3 12h4l2-7 4 14 2-7h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="label">Motility &amp; Progression</div>
              <p>Selenium, CoQ10, L-Arginine, and L-Citrulline support the circulation and energy sperm need for healthy motility.</p>
            </div>
            <div className="stat" data-reveal="true" data-reveal-delay="2">
              <div className="stat-ic">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M9 3v5c0 2-2 3-2 6s2 4 2 6M15 3v5c0 2 2 3 2 6s-2 4-2 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </div>
              <div className="label">DNA Integrity</div>
              <p>N-Acetyl Cysteine, Folic Acid, and Vitamin E help protect genetic material from oxidative damage.</p>
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
              <span className="tag">For Men</span>
              <h3>Comprehensive Nutrition</h3>
              <p>Nourishes sperm health, protects DNA integrity, and supports your natural conception journey.</p>
            </article>
            <article className="aud aud--2" data-reveal="true" data-reveal-delay="1">
              <span className="tag">For Clinicians</span>
              <h3>Evidence-Based Support</h3>
              <p>A trusted, research-backed formulation you can confidently recommend to your patients.</p>
            </article>
            <article className="aud aud--3" data-reveal="true" data-reveal-delay="2">
              <span className="tag">For Couples &amp; Families</span>
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
            <p>Co-created with experienced reproductive endocrinologists and andrology specialists.</p>
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
