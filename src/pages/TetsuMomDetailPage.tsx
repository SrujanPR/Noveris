// @ts-nocheck
import React, { useEffect } from 'react';
import tetsuMomImg from '../assets/Tetsu-Mom.png';
import tetsuMomHeroImg from '../assets/tetsu_mom_hero.webp';
import tetsuMomDetailImg from '../assets/tetsu_mom_detail.webp';
import tetsuMomLifestyleImg from '../assets/tetsu_mom_lifestyle.jpg';
import tetsuMomStickImg from '../assets/tetsu_mom_stick.webp';
import tetsuPowderImg from '../assets/tetsu_powder.png';
import tetsuMomBoxStickImg from '../assets/tetsu_mom_box_stick.webp';
import { Footer } from '../components/Footer';

export const TetsuMomDetailPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    let eventListeners: Array<{ target: EventTarget; type: string; listener: EventListenerOrEventListenerObject; opts?: any }> = [];

    try {
      
(function(){
  "use strict";
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var clamp = function(v,a,b){ return Math.max(a, Math.min(b, v)); };
  var lerp = function(a,b,t){ return a + (b-a)*t; };

  /* ---------------------------------------------------------
     Section registry + dot navigation
     --------------------------------------------------------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
  var dotnav = document.getElementById('dotnav');
  var dotItems = [];

  sections.forEach(function(sec){
    var label = sec.getAttribute('data-label');
    if(!label) return;
    var btn = document.createElement('button');
    btn.className = 'dot-item';
    btn.setAttribute('aria-label', 'Go to ' + label);
    btn.innerHTML = '<span class="dot-label">'+label+'</span><span class="dot"></span>';
    btn.addEventListener('click', function(){
      sec.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block:'start' });
    });
    if (dotnav) dotnav.appendChild(btn);
    dotItems.push({ el: sec, btn: btn });
  });

  /* ---------------------------------------------------------
     Top scroll-progress bar
     --------------------------------------------------------- */
  var progressBar = document.getElementById('progress-bar');

  /* ---------------------------------------------------------
     Reveal-on-scroll (IntersectionObserver, one-shot)
     --------------------------------------------------------- */
  var revealObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(function(el){ revealObserver.observe(el); });

  /* ---------------------------------------------------------
     Product section — sticky image callouts sync to scroll
     --------------------------------------------------------- */
  var featureBlocks = Array.prototype.slice.call(document.querySelectorAll('.feature-block'));
  var calloutDots = Array.prototype.slice.call(document.querySelectorAll('.callout-dot'));
  if(featureBlocks.length){
    var featureObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        var idx = entry.target.getAttribute('data-feature');
        if(entry.isIntersecting){
          featureBlocks.forEach(function(fb){ fb.classList.remove('active'); });
          calloutDots.forEach(function(cd){ cd.classList.remove('active'); });
          entry.target.classList.add('active');
          var dot = calloutDots.filter(function(d){ return d.getAttribute('data-feature') === idx; })[0];
          if(dot) dot.classList.add('active');
        }
      });
    }, { rootMargin: '-42% 0px -42% 0px', threshold: 0 });
    featureBlocks.forEach(function(fb){ featureObserver.observe(fb); });
  }

  /* ---------------------------------------------------------
     Count-up stat numbers (evidence section)
     --------------------------------------------------------- */
  var countEls = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
  function animateCount(el){
    var target = parseFloat(el.getAttribute('data-target'));
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1300;
    var start = null;
    function easeOutExpo(t){ return t === 1 ? 1 : 1 - Math.pow(2, -10*t); }
    function step(ts){
      if(start === null) start = ts;
      var p = clamp((ts-start)/dur, 0, 1);
      var val = target * easeOutExpo(p);
      el.textContent = prefix + val.toFixed(decimals) + suffix;
      if(p < 1) requestAnimationFrame(step);
      else el.textContent = prefix + target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(step);
  }
  if(countEls.length){
    var countObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    countEls.forEach(function(el){ countObserver.observe(el); });
  }

  /* ---------------------------------------------------------
     Hero — pointer-driven tilt (1:1 direct manipulation)
     --------------------------------------------------------- */
  var heroCard = document.getElementById('heroCard');
  var heroSection = document.getElementById('hero');
  if(heroCard && heroSection && !reduceMotion && window.matchMedia('(hover:hover)').matches){
    heroSection.addEventListener('pointermove', function(e){
      var r = heroCard.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width;
      var py = (e.clientY - r.top) / r.height;
      var rx = (0.5 - py) * 10;
      var ry = (px - 0.5) * 12;
      heroCard.style.transition = 'none';
      heroCard.style.transform = 'rotateX('+rx+'deg) rotateY('+ry+'deg)';
    });
    heroSection.addEventListener('pointerleave', function(){
      heroCard.style.transition = 'transform 0.7s cubic-bezier(.22,1.12,.36,1)';
      heroCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }

  /* ---------------------------------------------------------
     Advantage cards — subtle hover tilt
     --------------------------------------------------------- */
  var advCards = Array.prototype.slice.call(document.querySelectorAll('.adv-card'));
  if(!reduceMotion && window.matchMedia('(hover:hover)').matches){
    advCards.forEach(function(card){
      card.addEventListener('pointermove', function(e){
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        var rx = (0.5 - py) * 8;
        var ry = (px - 0.5) * 8;
        card.style.transition = 'none';
        card.style.transform = 'perspective(700px) rotateX('+rx+'deg) rotateY('+ry+'deg) translateY(-4px)';
      });
      card.addEventListener('pointerleave', function(){
        card.style.transition = 'transform 0.6s cubic-bezier(.22,1.12,.36,1)';
        card.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  /* ---------------------------------------------------------
     Technology — pinned scroll-scrubbed particle journey
     --------------------------------------------------------- */
  var techWrap = document.getElementById('techScrubWrap');
  var stageEls = ['stageRaw','stageMicron','stageCoat','stageCapsule'].map(function(id){ return document.getElementById(id); });
  var coatRing = document.getElementById('coatRing');
  var sachetTarget = document.getElementById('sachetTarget');
  var flowDots = Array.prototype.slice.call(document.querySelectorAll('.flow-dot'));
  var techSteps = Array.prototype.slice.call(document.querySelectorAll('.tech-step'));
  var techRailFill = document.getElementById('techRailFill');
  var techCaption = document.getElementById('techCaption');
  var captions = [
    'Fe · Ferric pyrophosphate',
    'Micronization · particle size < 10 µm',
    'Water-dispersible coating forms',
    'Microencapsulated iron, ready for the stick'
  ];
  var RING_CIRC = 2 * Math.PI * 52;

  function updateTech(){
    if(!techWrap) return;
    var rect = techWrap.getBoundingClientRect();
    var total = techWrap.offsetHeight - window.innerHeight;
    var progress = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;
    if(rect.bottom < 0 || rect.top > window.innerHeight){ return; } // out of view, skip work

    var segment = progress * 3; // 0..3 across 4 stages
    stageEls.forEach(function(el, i){
      if(!el) return;
      var op = clamp(1 - Math.abs(segment - i), 0, 1);
      el.setAttribute('opacity', op.toFixed(3));
    });

    var t2 = clamp(segment - 1, 0, 1); // coat ring draw, between stage1->stage2
    if(coatRing) coatRing.setAttribute('stroke-dashoffset', (RING_CIRC * (1 - t2)).toFixed(1));

    var t3 = clamp(segment - 2, 0, 1); // flow into sachet, stage2->stage3
    flowDots.forEach(function(dot, i){
      var dt = clamp(t3 - i*0.06, 0, 1);
      var tx = parseFloat(dot.getAttribute('data-tx'));
      var ty = parseFloat(dot.getAttribute('data-ty'));
      dot.setAttribute('cx', lerp(250, tx, dt).toFixed(1));
      dot.setAttribute('cy', lerp(330, ty, dt).toFixed(1));
    });
    if(sachetTarget) sachetTarget.setAttribute('opacity', t3.toFixed(3));

    var stageIndex = clamp(Math.round(segment), 0, 3);
    techSteps.forEach(function(step){
      step.classList.toggle('active', parseInt(step.getAttribute('data-stage'),10) === stageIndex);
    });
    if(techCaption) techCaption.textContent = captions[stageIndex];
    if(techRailFill) techRailFill.style.height = (progress*100).toFixed(1) + '%';
  }

  /* ---------------------------------------------------------
     Dialogue — pinned horizontal scroll
     --------------------------------------------------------- */
  var hzWrap = document.getElementById('hzWrap');
  var hzTrack = document.getElementById('hzTrack');
  var hzFill = document.getElementById('hzFill');

  function updateDialogue(){
    if(!hzWrap || !hzTrack) return;
    var rect = hzWrap.getBoundingClientRect();
    var total = hzWrap.offsetHeight - window.innerHeight;
    var progress = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;
    if(rect.bottom < 0 || rect.top > window.innerHeight){ return; }

    var gutter = window.innerWidth > 900 ? 150 : 0; // keep clear of the fixed dot-nav column
    var maxShift = hzTrack.scrollWidth - (window.innerWidth - gutter);
    maxShift = Math.max(0, maxShift);
    hzTrack.style.transform = 'translate3d(' + (-progress*maxShift).toFixed(1) + 'px,0,0)';
    if(hzFill) hzFill.style.width = (progress*100).toFixed(1) + '%';
  }

  /* ---------------------------------------------------------
     Science pipeline — connecting line fill
     --------------------------------------------------------- */
  var sciencePipeline = document.getElementById('sciencePipeline');
  var scienceLineFill = document.getElementById('scienceLineFill');

  function updateScience(){
    if(!sciencePipeline || !scienceLineFill) return;
    var rect = sciencePipeline.getBoundingClientRect();
    var vh = window.innerHeight;
    var span = rect.height + vh*0.6;
    var progress = clamp((vh*0.8 - rect.top) / span, 0, 1);
    scienceLineFill.style.height = (progress*100).toFixed(1) + '%';
  }

  /* ---------------------------------------------------------
     Active section tracking (progress bar + dot nav)
     --------------------------------------------------------- */
  function updateActiveSection(){
    var scrollY = window.scrollY || window.pageYOffset;
    var docH = document.documentElement.scrollHeight - window.innerHeight;
    if(progressBar) progressBar.style.width = (docH>0 ? clamp(scrollY/docH,0,1)*100 : 0) + '%';

    var mid = scrollY + window.innerHeight*0.4;
    var activeIdx = 0;
    dotItems.forEach(function(item, i){
      if(item.el.offsetTop <= mid) activeIdx = i;
    });
    dotItems.forEach(function(item, i){ item.btn.classList.toggle('active', i === activeIdx); });
    var activeSection = dotItems[activeIdx] ? dotItems[activeIdx].el : null;
    if(activeSection && dotnav){
      dotnav.classList.toggle('on-dark', activeSection.classList.contains('theme-dark'));
    }
  }

  /* ---------------------------------------------------------
     Main rAF loop
     --------------------------------------------------------- */
  var ticking = false;
  function onScroll(){
    if(!ticking){
      requestAnimationFrame(function(){
        updateActiveSection();
        updateTech();
        updateDialogue();
        updateScience();
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  window.addEventListener('resize', onScroll);
  onScroll();
})();

    } catch (err) {
      console.error("TetsuMom animation script error:", err);
    }

    return () => {
      eventListeners.forEach(({ target, type, listener, opts }) => {
        try { target.removeEventListener(type, listener, opts); } catch (e) {}
      });
    };
  }, []);

  return (
    <>
      <div className="tetsu-page">
        <style>{`
:root{
  --ink:#1B0A1A;
  --ink-2:#28111F;
  --ink-3:#33162E;
  --plum:#4B1657;
  --plum-l:#6C2A67;
  --magenta:#B0106B;
  --magenta-l:#DA4C93;
  --blush:#F5E7EF;
  --blush-2:#EEDAE8;
  --paper:#FBF7F5;
  --ink-text:#241021;
  --mute:#7C5D75;
  --line:rgba(36,16,33,0.13);
  --line-on-ink:rgba(255,255,255,0.15);
  --iron:#AD8347;
  --iron-l:#DFC084;

  --font-display:'Space Grotesk', sans-serif;
  --font-body:'Instrument Sans', sans-serif;
  --font-mono:'IBM Plex Mono', monospace;

  --ease-out: cubic-bezier(.16,.8,.24,1);
  --ease-spring: cubic-bezier(.22,1.12,.36,1);
}
.tetsu-page *, .tetsu-page *::before, .tetsu-page *::after{ box-sizing:border-box; }
html{ background:var(--ink); }
body{
  margin:0;
  background:var(--paper);
  color:var(--ink-text);
  font-family:var(--font-body);
  -webkit-font-smoothing:antialiased;
  overflow-x:hidden;
}
.tetsu-page img{ max-width:100%; display:block; }
.tetsu-page a{ color:inherit; }
.tetsu-page ::selection{ background:var(--magenta); color:#fff; }
.tetsu-page button{ font-family:inherit; }
.tetsu-page h1, .tetsu-page h2, .tetsu-page h3{
  font-family:var(--font-display);
  font-weight:600;
  margin:0;
  letter-spacing:-0.01em;
}
.tetsu-page p{ margin:0; }
.tetsu-page .eyebrow{
  font-family:var(--font-mono);
  font-size:0.72rem;
  letter-spacing:0.15em;
  text-transform:uppercase;
  font-weight:500;
  display:inline-flex;
  align-items:center;
  gap:0.6em;
  color:var(--magenta);
}
.tetsu-page .theme-dark .eyebrow{ color:var(--iron-l); }
.tetsu-page .eyebrow::before{
  content:"";
  width:22px; height:1px;
  background:currentColor;
  opacity:0.6;
  display:inline-block;
}
.tetsu-page .wrap{
  max-width:1280px;
  margin:0 auto;
  padding:0 6vw;
}
.tetsu-page section{ position:relative; }
.tetsu-page .theme-dark{ background:var(--ink); color:#F3E9EF; }
.tetsu-page .theme-blush{ background:var(--blush); }
.tetsu-page .theme-paper{ background:var(--paper); }
.tetsu-page .reveal{
  opacity:0;
  transform:translateY(38px);
  transition:opacity 0.9s var(--ease-out), transform 0.9s var(--ease-out);
}
.tetsu-page .reveal.in-view{ opacity:1; transform:translateY(0); }
.tetsu-page .stagger .reveal:nth-child(1){ transition-delay:0.02s; }
.tetsu-page .stagger .reveal:nth-child(2){ transition-delay:0.10s; }
.tetsu-page .stagger .reveal:nth-child(3){ transition-delay:0.18s; }
.tetsu-page .stagger .reveal:nth-child(4){ transition-delay:0.26s; }
.tetsu-page .stagger .reveal:nth-child(5){ transition-delay:0.34s; }


@media (prefers-reduced-motion: reduce){
.tetsu-page .reveal{ transition:opacity 0.4s ease !important; transform:none !important; }
.tetsu-page .reveal.in-view{ opacity:1; }
.tetsu-page .scroll-cue .line::after{ animation:none !important; }
.tetsu-page .callout-dot.active::after{ animation:none !important; }
.tetsu-page .hero-card{ transform:none !important; }

}
.tetsu-page #progress-bar{
  position:fixed; top:0; left:0; height:2px; width:0%;
  background:linear-gradient(90deg,var(--magenta),var(--iron-l));
  z-index:900;
}
.tetsu-page header{
  position:fixed; top:0; left:0; right:0;
  z-index:800;
  display:flex; align-items:center; justify-content:space-between;
  padding:1.7rem 6vw 0;
  pointer-events:none;
  mix-blend-mode:difference;
}
.tetsu-page header *{ pointer-events:auto; }
.tetsu-page .logo{
  font-family:var(--font-display);
  font-weight:600;
  font-size:1.05rem;
  color:#fff;
  letter-spacing:0.01em;
  text-decoration:none;
  display:flex;
  align-items:baseline;
  gap:0.3em;
}
.tetsu-page .logo sup{ font-size:0.5rem; font-weight:500; }
.tetsu-page .header-tag{
  font-family:var(--font-mono);
  font-size:0.66rem;
  color:#fff;
  letter-spacing:0.1em;
  text-transform:uppercase;
  opacity:0.85;
}
.tetsu-page #dotnav{
  position:fixed;
  right:28px; top:50%;
  transform:translateY(-50%);
  z-index:700;
  display:flex; flex-direction:column;
  gap:13px;
  align-items:flex-end;
}
.tetsu-page .dot-item{
  display:flex; align-items:center; gap:10px;
  cursor:pointer;
  background:none; border:none; padding:2px;
  color:var(--ink-text);
  transition:color 0.4s var(--ease-out);
}
.tetsu-page #dotnav.on-dark .dot-item{ color:#fff; }
.tetsu-page .dot-label{
  font-family:var(--font-mono);
  font-size:0.64rem;
  letter-spacing:0.07em;
  opacity:0;
  transform:translateX(6px);
  transition:opacity 0.3s var(--ease-out), transform 0.3s var(--ease-out);
  white-space:nowrap;
  background:rgba(27,10,26,0.55);
  backdrop-filter:blur(8px);
  -webkit-backdrop-filter:blur(8px);
  color:#F3E9EF;
  padding:0.35em 0.7em;
  border-radius:100px;
}
.tetsu-page #dotnav.on-dark .dot-label{ background:rgba(0,0,0,0.45); }
.tetsu-page .dot-item:hover .dot-label, .tetsu-page .dot-item.active .dot-label{ opacity:1; transform:translateX(0); }
.tetsu-page .dot{
  width:6px; height:6px; border-radius:50%;
  background:currentColor;
  opacity:0.32;
  transition:all 0.35s var(--ease-spring);
  flex-shrink:0;
}
.tetsu-page .dot-item.active .dot{
  opacity:1;
  background:var(--magenta);
  transform:scale(1.8);
  box-shadow:0 0 0 3px rgba(176,16,107,0.18);
}

@media (max-width:900px){
.tetsu-page #dotnav{ display:none; }

}
.tetsu-page .grain{
  position:absolute; inset:0;
  opacity:0.045;
  pointer-events:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  mix-blend-mode:overlay;
}
.tetsu-page #hero{
  min-height:100vh;
  display:flex;
  flex-direction:column;
  justify-content:center;
  overflow:hidden;
  background:
    radial-gradient(ellipse 60% 50% at 78% 28%, rgba(176,16,107,0.32), transparent 60%),
    radial-gradient(ellipse 50% 45% at 15% 85%, rgba(108,42,103,0.35), transparent 60%),
    linear-gradient(160deg, var(--ink) 0%, #24101F 55%, var(--ink) 100%);
  padding-top:9rem;
}
.tetsu-page .hero-grid{
  display:grid;
  grid-template-columns:1.05fr 0.95fr;
  gap:2vw;
  align-items:center;
  padding-bottom:3rem;
}
.tetsu-page .hero-eyebrow{ color:var(--iron-l); margin-bottom:1.6rem; }
.tetsu-page .hero-title{
  font-size:clamp(2.6rem, 5.6vw, 4.6rem);
  line-height:0.98;
  letter-spacing:-0.02em;
  color:#fff;
  font-weight:500;
}
.tetsu-page .hero-title em{
  font-style:italic;
  font-weight:400;
  background:linear-gradient(96deg, var(--magenta-l), var(--iron-l));
  -webkit-background-clip:text;
  background-clip:text;
  color:transparent;
}
.tetsu-page .hero-sub{
  margin-top:1.7rem;
  max-width:34ch;
  font-size:1.08rem;
  line-height:1.6;
  color:rgba(246,236,231,0.78);
}
.tetsu-page .hero-cta-row{
  margin-top:2.6rem;
  display:flex;
  align-items:center;
  gap:1.6rem;
  flex-wrap:wrap;
}
.tetsu-page .btn{
  display:inline-flex; align-items:center; gap:0.7em;
  background:linear-gradient(120deg,var(--magenta),#8A0C55);
  color:#fff;
  font-family:var(--font-mono);
  font-size:0.76rem;
  letter-spacing:0.08em;
  text-transform:uppercase;
  padding:0.95em 1.5em;
  border-radius:100px;
  text-decoration:none;
  box-shadow:0 10px 30px -8px rgba(176,16,107,0.55);
  transition:transform 0.35s var(--ease-spring), box-shadow 0.35s var(--ease-out);
}
.tetsu-page .btn:hover{ transform:translateY(-2px); box-shadow:0 14px 34px -6px rgba(176,16,107,0.7); }
.tetsu-page .btn-ghost{
  font-family:var(--font-mono);
  font-size:0.72rem;
  letter-spacing:0.08em;
  text-transform:uppercase;
  color:rgba(255,255,255,0.7);
  display:inline-flex; align-items:center; gap:0.6em;
}
.tetsu-page .btn-ghost .ring{
  width:34px; height:34px; border-radius:50%;
  border:1px solid rgba(255,255,255,0.35);
  display:flex; align-items:center; justify-content:center;
  font-size:0.9rem;
}
.tetsu-page .hero-visual{ position:relative; perspective:1400px; }
.tetsu-page .hero-card{
  position:relative;
  border-radius:28px;
  padding:6%;
  background:linear-gradient(150deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
  border:1px solid rgba(255,255,255,0.12);
  backdrop-filter:blur(6px);
  transform-style:preserve-3d;
  will-change:transform;
  box-shadow:0 40px 90px -20px rgba(0,0,0,0.6);
}
.tetsu-page .hero-card img{
  border-radius:16px;
  transform:translateZ(30px);
}
.tetsu-page .hero-glow{
  position:absolute; inset:-10%;
  background:radial-gradient(circle at 60% 35%, rgba(218,76,147,0.35), transparent 60%);
  filter:blur(30px);
  z-index:-1;
}
.tetsu-page .spec-strip{
  border-top:1px solid var(--line-on-ink);
  padding:1.6rem 0;
  display:flex;
  flex-wrap:wrap;
  gap:2.2rem 3rem;
  font-family:var(--font-mono);
}
.tetsu-page .spec-item{ display:flex; flex-direction:column; gap:0.3rem; }
.tetsu-page .spec-item .num{ font-size:1.05rem; color:#fff; }
.tetsu-page .spec-item .lbl{ font-size:0.66rem; letter-spacing:0.1em; text-transform:uppercase; color:rgba(246,236,231,0.55); }
.tetsu-page .scroll-cue{
  position:absolute; bottom:2.2rem; left:6vw;
  display:flex; align-items:center; gap:0.8rem;
  font-family:var(--font-mono); font-size:0.66rem;
  letter-spacing:0.12em; text-transform:uppercase;
  color:rgba(246,236,231,0.55);
}
.tetsu-page .scroll-cue .line{ width:1px; height:34px; background:rgba(246,236,231,0.3); position:relative; overflow:hidden; }
.tetsu-page .scroll-cue .line::after{
  content:""; position:absolute; top:-100%; left:0; width:100%; height:100%;
  background:var(--iron-l);
  animation:cue-fall 1.8s ease-in-out infinite;
}

@keyframes cue-fall{ 0%{top:-100%;} 60%{top:100%;} 100%{top:100%;} }


@media (max-width:900px){
.tetsu-page .hero-grid{ grid-template-columns:1fr; }
.tetsu-page .hero-visual{ order:-1; margin-bottom:1rem; max-width:340px; margin-inline:auto; }
.tetsu-page .scroll-cue{ display:none; }

}
.tetsu-page .sec-head{ max-width:640px; margin-bottom:3.6rem; }
.tetsu-page .sec-head h2{
  font-size:clamp(2.1rem, 4.4vw, 3.4rem);
  line-height:1.04;
  margin-top:0.9rem;
}
.tetsu-page .sec-head .sec-sub{
  margin-top:1.1rem;
  font-size:1.02rem;
  line-height:1.6;
  color:var(--mute);
  max-width:46ch;
}
.tetsu-page .theme-dark .sec-head .sec-sub{ color:rgba(246,236,231,0.68); }
.tetsu-page .sec-pad{ padding:8.5rem 0; }

@media (max-width:700px){
.tetsu-page .sec-pad{ padding:5.5rem 0; }

}
.tetsu-page .problem-grid{
  display:grid;
  grid-template-columns:repeat(2, 1fr);
  gap:1.4rem;
}
.tetsu-page .problem-card{
  background:var(--paper);
  border:1px solid var(--line);
  border-radius:20px;
  padding:2.4rem 2.2rem;
  transition:transform 0.5s var(--ease-spring), box-shadow 0.5s var(--ease-out), border-color 0.5s;
}
.tetsu-page .problem-card:hover{
  transform:translateY(-6px);
  box-shadow:0 24px 48px -22px rgba(75,22,87,0.28);
  border-color:rgba(176,16,107,0.3);
}
.tetsu-page .problem-top{ display:flex; align-items:center; justify-content:space-between; margin-bottom:1.5rem; }
.tetsu-page .problem-num{ font-family:var(--font-mono); font-size:0.75rem; color:var(--mute); }
.tetsu-page .problem-title{
  font-family:var(--font-display);
  font-size:1.5rem;
  font-weight:600;
  margin-bottom:1.1rem;
}
.tetsu-page .problem-issue{
  font-size:0.95rem;
  color:var(--mute);
  line-height:1.55;
  padding-left:1.1rem;
  border-left:2px solid var(--line);
  margin-bottom:1rem;
}
.tetsu-page .problem-answer{
  font-size:0.95rem;
  line-height:1.55;
  padding-left:1.1rem;
  border-left:2px solid var(--magenta);
  color:var(--ink-text);
  font-weight:500;
}

@media (max-width:800px){
.tetsu-page .problem-grid{ grid-template-columns:1fr; }

}
.tetsu-page .product-layout{
  display:grid;
  grid-template-columns:0.95fr 1.05fr;
  gap:5vw;
  align-items:start;
}
.tetsu-page .product-sticky{
  position:sticky;
  top:14vh;
  align-self:start;
}
.tetsu-page .product-photo-frame{
  position:relative;
  border-radius:24px;
  overflow:hidden;
  box-shadow:0 40px 70px -30px rgba(75,22,87,0.35);
}
.tetsu-page .product-photo-frame img{ width:100%; }
.tetsu-page .callout-dot{
  position:absolute;
  width:13px; height:13px;
  border-radius:50%;
  background:var(--magenta);
  box-shadow:0 0 0 4px rgba(176,16,107,0.22);
  transform:translate(-50%,-50%) scale(0.9);
  opacity:0.55;
  transition:all 0.4s var(--ease-spring);
}
.tetsu-page .callout-dot::after{
  content:"";
  position:absolute; inset:-8px;
  border-radius:50%;
  border:1px solid rgba(176,16,107,0.4);
  opacity:0;
  transition:opacity 0.4s;
}
.tetsu-page .callout-dot.active{
  opacity:1;
  transform:translate(-50%,-50%) scale(1.25);
  box-shadow:0 0 0 6px rgba(176,16,107,0.28);
}
.tetsu-page .callout-dot.active::after{ opacity:1; animation:ping 1.6s ease-out infinite; }

@keyframes ping{ 0%{ transform:scale(1); opacity:0.6;} 100%{ transform:scale(1.9); opacity:0;} }
.tetsu-page .feature-list{ display:flex; flex-direction:column; gap:0; }
.tetsu-page .feature-block{
  padding:3.4rem 0;
  border-top:1px solid var(--line);
  opacity:0.38;
  transition:opacity 0.5s var(--ease-out);
}
.tetsu-page .feature-block:last-child{ border-bottom:1px solid var(--line); }
.tetsu-page .feature-block.active{ opacity:1; }
.tetsu-page .feature-tag{ font-family:var(--font-mono); font-size:0.7rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--magenta); }
.tetsu-page .feature-name{ font-family:var(--font-display); font-size:1.9rem; margin-top:0.6rem; }
.tetsu-page .feature-desc{ margin-top:0.8rem; font-size:1rem; line-height:1.6; color:var(--mute); max-width:42ch; }


@media (max-width:900px){
.tetsu-page .product-layout{ grid-template-columns:1fr; }
.tetsu-page .product-sticky{ position:relative; top:0; margin-bottom:1rem; }

}
.tetsu-page #technology{
  background:
    radial-gradient(ellipse 55% 45% at 85% 15%, rgba(176,16,107,0.22), transparent 60%),
    radial-gradient(ellipse 50% 40% at 5% 90%, rgba(173,131,71,0.16), transparent 60%),
    var(--ink);
}
.tetsu-page .tech-top{ padding:8.5rem 0 2rem; }
.tetsu-page .tech-scrub-wrap{ position:relative; height:340vh; }
.tetsu-page .tech-sticky{
  position:sticky; top:0;
  height:100vh;
  display:flex; align-items:center;
  overflow:hidden;
}
.tetsu-page .tech-inner{
  display:grid;
  grid-template-columns:0.85fr 1.15fr;
  gap:5vw;
  align-items:center;
  width:100%;
}
.tetsu-page .tech-rail-row{ display:flex; gap:1.6rem; }
.tetsu-page .tech-rail{ width:2px; background:var(--line-on-ink); border-radius:2px; position:relative; flex-shrink:0; }
.tetsu-page .tech-rail-fill{ position:absolute; top:0; left:0; width:100%; height:0%; background:linear-gradient(var(--magenta-l),var(--iron-l)); border-radius:2px; }
.tetsu-page .tech-stepper{ display:flex; flex-direction:column; justify-content:space-between; gap:1.8rem; padding:0.3rem 0; }
.tetsu-page .tech-step{ opacity:0.3; transition:opacity 0.5s var(--ease-out), transform 0.5s var(--ease-out); transform:translateX(0); }
.tetsu-page .tech-step.active{ opacity:1; }
.tetsu-page .step-num{ font-family:var(--font-mono); font-size:0.7rem; color:var(--iron-l); letter-spacing:0.08em; }
.tetsu-page .step-name{ display:block; font-family:var(--font-display); font-size:clamp(1.2rem,2vw,1.6rem); margin-top:0.4rem; color:#fff; }
.tetsu-page .tech-step p{ margin-top:0.55rem; font-size:0.88rem; line-height:1.55; color:rgba(243,233,239,0.62); max-width:34ch; }
.tetsu-page .tech-visual{ position:relative; display:flex; justify-content:center; align-items:center; }
.tetsu-page #particleSvg{ width:100%; max-width:540px; height:auto; overflow:visible; }
.tetsu-page .p-stage{ transition:none; }
.tetsu-page .tech-caption-row{ position:absolute; bottom:2%; left:0; right:0; text-align:center; }
.tetsu-page .tech-caption{
  font-family:var(--font-mono); font-size:0.72rem; letter-spacing:0.06em;
  color:rgba(243,233,239,0.55); text-transform:uppercase;
}
.tetsu-page .tech-footnote{
  padding:3rem 0 8.5rem;
  font-size:1.15rem;
  line-height:1.6;
  max-width:52ch;
  color:rgba(243,233,239,0.82);
  font-family:var(--font-display);
  font-weight:400;
  font-style:italic;
}


@media (max-width:900px){
.tetsu-page .tech-inner{ grid-template-columns:1fr; }
.tetsu-page .tech-rail-row{ display:none; }
.tetsu-page .tech-scrub-wrap{ height:280vh; }
.tetsu-page .tech-visual{ order:-1; margin-bottom:2rem; }
.tetsu-page #particleSvg{ max-width:320px; }

}
.tetsu-page .stat-grid{
  display:grid;
  grid-template-columns:repeat(3, 1fr);
  gap:1.4rem;
  margin-bottom:3rem;
}
.tetsu-page .stat-card{
  background:linear-gradient(160deg, #fff, var(--paper));
  border:1px solid var(--line);
  border-radius:22px;
  padding:2.6rem 2rem;
  text-align:left;
}
.tetsu-page .stat-num{
  font-family:var(--font-display);
  font-size:clamp(2.6rem, 5.2vw, 3.8rem);
  font-weight:600;
  color:var(--plum);
  line-height:1;
  letter-spacing:-0.02em;
}
.tetsu-page .stat-vs{ margin-top:0.9rem; font-family:var(--font-mono); font-size:0.82rem; color:var(--ink-text); }
.tetsu-page .stat-src{ margin-top:0.3rem; font-family:var(--font-mono); font-size:0.68rem; letter-spacing:0.05em; text-transform:uppercase; color:var(--mute); }
.tetsu-page .evidence-lower{
  display:grid;
  grid-template-columns:1.1fr 0.9fr;
  gap:1.4rem;
  align-items:stretch;
}
.tetsu-page .evidence-card{
  border-radius:20px;
  padding:2.2rem 2.2rem;
  font-size:0.98rem;
  line-height:1.65;
}
.tetsu-page .evidence-card.human{ background:var(--blush); color:var(--ink-text); }
.tetsu-page .evidence-card.human .tag{ font-family:var(--font-mono); font-size:0.7rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--magenta); display:block; margin-bottom:0.8rem; }
.tetsu-page .evidence-card.warn{
  background:var(--ink);
  color:#F3E9EF;
  border:1px solid rgba(255,255,255,0.08);
}
.tetsu-page .evidence-card.warn .tag{ font-family:var(--font-mono); font-size:0.7rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--iron-l); display:block; margin-bottom:0.8rem; }
.tetsu-page .evidence-card.warn p{ color:rgba(243,233,239,0.82); }


@media (max-width:800px){
.tetsu-page .stat-grid{ grid-template-columns:1fr; }
.tetsu-page .evidence-lower{ grid-template-columns:1fr; }

}
.tetsu-page .adv-grid{
  display:grid;
  grid-template-columns:repeat(4, 1fr);
  gap:1.2rem;
}
.tetsu-page .adv-card{
  position:relative;
  background:#fff;
  border:1px solid var(--line);
  border-radius:20px;
  padding:2.2rem 1.7rem;
  transform-style:preserve-3d;
  will-change:transform;
  transition:transform 0.4s var(--ease-spring), box-shadow 0.4s var(--ease-out);
}
.tetsu-page .adv-card:hover{ box-shadow:0 30px 50px -24px rgba(75,22,87,0.32); }
.tetsu-page .adv-icon{
  width:44px; height:44px;
  border-radius:12px;
  background:var(--blush);
  display:flex; align-items:center; justify-content:center;
  margin-bottom:1.6rem;
  color:var(--magenta);
}
.tetsu-page .adv-num{ position:absolute; top:1.6rem; right:1.7rem; font-family:var(--font-mono); font-size:0.7rem; color:var(--mute); }
.tetsu-page .adv-title{ font-family:var(--font-display); font-size:1.32rem; font-weight:600; }
.tetsu-page .adv-kicker{ display:block; font-family:var(--font-mono); font-size:0.66rem; letter-spacing:0.08em; text-transform:uppercase; color:var(--magenta); margin-bottom:0.5rem; }
.tetsu-page .adv-desc{ margin-top:0.9rem; font-size:0.92rem; line-height:1.55; color:var(--mute); }


@media (max-width:1000px){
.tetsu-page .adv-grid{ grid-template-columns:repeat(2, 1fr); }

}

@media (max-width:560px){
.tetsu-page .adv-grid{ grid-template-columns:1fr; }

}
.tetsu-page #dialogue{ background:var(--paper); }
.tetsu-page .hz-wrap{ position:relative; height:320vh; }
.tetsu-page .hz-sticky{ position:sticky; top:0; height:100vh; overflow:hidden; display:flex; flex-direction:column; justify-content:center; }
.tetsu-page .hz-head{ padding:0 6vw; margin-bottom:3rem; }
.tetsu-page .hz-head h2{ font-size:clamp(2.1rem, 4.4vw, 3.4rem); line-height:1.04; }
.tetsu-page .hz-track{ display:flex; gap:2.2vw; padding-left:6vw; will-change:transform; }
.tetsu-page .hz-panel{
  width:min(74vw,700px); flex-shrink:0; min-height:52vh;
  border-radius:28px; padding:3rem;
  display:flex; flex-direction:column; justify-content:space-between;
  position:relative; overflow:hidden;
}
.tetsu-page .hz-panel .big-num{
  position:absolute; top:-4%; right:2%;
  font-family:var(--font-display); font-size:11rem; font-weight:600;
  opacity:0.08; line-height:1; user-select:none;
}
.tetsu-page .hz-panel.v1{ background:linear-gradient(160deg,#fff,var(--paper)); border:1px solid var(--line); color:var(--ink-text); }
.tetsu-page .hz-panel.v2{ background:linear-gradient(160deg,#3A1638,var(--ink)); color:#fff; }
.tetsu-page .hz-panel.v3{ background:linear-gradient(160deg,var(--blush),var(--blush-2)); color:var(--ink-text); }
.tetsu-page .hz-panel.v4{ background:linear-gradient(160deg,var(--plum),#3A0F44); color:#fff; }
.tetsu-page .hz-eyebrow{ font-family:var(--font-mono); font-size:0.72rem; letter-spacing:0.14em; text-transform:uppercase; opacity:0.65; }
.tetsu-page .hz-title{ font-family:var(--font-display); font-size:clamp(1.7rem,3vw,2.3rem); margin-top:0.7rem; max-width:16ch; }
.tetsu-page .hz-desc{ font-size:1.02rem; line-height:1.6; max-width:38ch; opacity:0.85; margin-top:1.4rem; }
.tetsu-page .hz-progress{ padding:0 6vw; margin-top:2.4rem; display:flex; align-items:center; gap:0.8rem; }
.tetsu-page .hz-progress-track{ height:2px; flex:1; max-width:220px; background:var(--line); border-radius:2px; overflow:hidden; }
.tetsu-page .hz-progress-fill{ height:100%; width:0%; background:var(--magenta); }
.tetsu-page .hz-progress-lbl{ font-family:var(--font-mono); font-size:0.68rem; color:var(--mute); white-space:nowrap; }


@media (max-width:700px){
.tetsu-page .hz-panel{ width:84vw; min-height:auto; padding:2.2rem; }
.tetsu-page .hz-panel .big-num{ font-size:7rem; }
.tetsu-page .hz-wrap{ height:280vh; }

}
.tetsu-page #science{
  background:
    radial-gradient(ellipse 50% 40% at 90% 80%, rgba(176,16,107,0.18), transparent 60%),
    var(--ink);
}
.tetsu-page .science-pipeline{ position:relative; padding-left:3.4rem; margin-top:1rem; }
.tetsu-page .science-line{ position:absolute; left:5px; top:10px; bottom:10px; width:2px; background:var(--line-on-ink); border-radius:2px; }
.tetsu-page .science-line-fill{ position:absolute; left:0; top:0; width:100%; height:0%; background:linear-gradient(var(--magenta-l),var(--iron-l)); border-radius:2px; }
.tetsu-page .science-row{ position:relative; padding:2.1rem 0; border-bottom:1px solid var(--line-on-ink); display:grid; grid-template-columns:1fr 1.6fr; gap:2rem; align-items:baseline; }
.tetsu-page .science-row:last-child{ border-bottom:none; }
.tetsu-page .science-dot{
  position:absolute; left:-3.4rem; top:2.5rem;
  width:12px; height:12px; border-radius:50%;
  background:var(--ink); border:2px solid var(--line-on-ink);
  transition:all 0.4s var(--ease-spring);
}
.tetsu-page .science-row.in-view .science-dot{ border-color:var(--magenta-l); background:var(--magenta-l); box-shadow:0 0 0 4px rgba(218,76,147,0.2); }
.tetsu-page .science-idx{ font-family:var(--font-mono); font-size:0.72rem; color:var(--iron-l); }
.tetsu-page .science-name{ font-family:var(--font-display); font-size:1.5rem; margin-top:0.4rem; color:#fff; }
.tetsu-page .science-desc{ font-size:0.98rem; line-height:1.6; color:rgba(243,233,239,0.68); }


@media (max-width:700px){
.tetsu-page .science-row{ grid-template-columns:1fr; gap:0.6rem; }

}
.tetsu-page #convenience{
  background:linear-gradient(155deg, var(--blush) 0%, var(--blush-2) 55%, #E6C9DE 100%);
  overflow:hidden;
}
.tetsu-page .conv-grid{
  display:grid;
  grid-template-columns:1.05fr 0.95fr;
  gap:4vw;
  align-items:center;
}
.tetsu-page .conv-stats{ display:flex; gap:2.6rem; margin-top:2.2rem; flex-wrap:wrap; }
.tetsu-page .conv-stat-num{ font-family:var(--font-display); font-size:clamp(2rem,4vw,2.8rem); color:var(--plum); font-weight:600; }
.tetsu-page .conv-stat-lbl{ display:block; margin-top:0.3rem; font-family:var(--font-mono); font-size:0.68rem; letter-spacing:0.08em; text-transform:uppercase; color:var(--mute); }
.tetsu-page .conv-caption{ margin-top:2.2rem; font-size:1rem; line-height:1.6; color:var(--ink-text); max-width:42ch; opacity:0.85; }
.tetsu-page .conv-visual{ position:relative; display:flex; justify-content:center; }
.tetsu-page .conv-visual img{ max-width:280px; filter:drop-shadow(0 30px 45px rgba(75,22,87,0.28)); }


@media (max-width:900px){
.tetsu-page .conv-grid{ grid-template-columns:1fr; }
.tetsu-page .conv-visual{ order:-1; margin-bottom:1rem; }

}
.tetsu-page #summary{ background:var(--ink); color:#F3E9EF; }
.tetsu-page .summary-grid{
  display:grid;
  grid-template-columns:1.1fr 0.9fr;
  gap:5vw;
  align-items:center;
  padding-bottom:5rem;
}
.tetsu-page .summary-head h2{ font-size:clamp(2rem,4vw,3.1rem); color:#fff; line-height:1.08; margin-top:0.9rem; }
.tetsu-page .checklist{ margin-top:2.4rem; display:flex; flex-direction:column; gap:1.1rem; }
.tetsu-page .check-item{ display:flex; align-items:flex-start; gap:0.9rem; font-size:1rem; line-height:1.5; color:rgba(243,233,239,0.88); }
.tetsu-page .check-mark{
  flex-shrink:0; width:22px; height:22px; border-radius:50%;
  background:rgba(218,76,147,0.16);
  display:flex; align-items:center; justify-content:center;
  margin-top:0.1rem;
}
.tetsu-page .check-mark svg{ width:12px; height:12px; }
.tetsu-page .summary-visual{ position:relative; }
.tetsu-page .summary-visual img{ border-radius:20px; box-shadow:0 40px 80px -20px rgba(0,0,0,0.55); }
.tetsu-page .disclaimer-block{
  border-top:1px solid var(--line-on-ink);
  padding:3rem 0;
  display:flex;
  flex-direction:column;
  gap:0.9rem;
}
.tetsu-page .disclaimer-tag{
  font-family:var(--font-mono); font-size:0.7rem; letter-spacing:0.12em; text-transform:uppercase;
  color:var(--iron-l);
}
.tetsu-page .disclaimer-text{ font-size:0.86rem; line-height:1.6; color:rgba(243,233,239,0.55); max-width:70ch; }
.tetsu-page .footer-bar{
  border-top:1px solid var(--line-on-ink);
  padding:2.2rem 0 3rem;
  display:flex; align-items:center; justify-content:space-between;
  flex-wrap:wrap; gap:1rem;
}
.tetsu-page .footer-brand{ font-family:var(--font-display); font-size:1.1rem; color:#fff; }
.tetsu-page .footer-meta{ font-family:var(--font-mono); font-size:0.68rem; letter-spacing:0.06em; color:rgba(243,233,239,0.45); text-transform:uppercase; }
.tetsu-page .back-top{
  font-family:var(--font-mono); font-size:0.68rem; letter-spacing:0.08em; text-transform:uppercase;
  color:rgba(243,233,239,0.6); text-decoration:none;
  display:inline-flex; align-items:center; gap:0.5em;
}


@media (max-width:900px){
.tetsu-page .summary-grid{ grid-template-columns:1fr; }
.tetsu-page .summary-visual{ order:-1; max-width:320px; margin-inline:auto; }

}

/* ── LEFT ALIGNMENT + 1.25× FONT SCALE ── */
.tetsu-page .sec-head{
  text-align:left;
}
.tetsu-page .sec-head h2{
  font-size:clamp(2.625rem, 5.5vw, 4.25rem);
}
.tetsu-page .sec-head .sec-sub{
  font-size:1.275rem;
}
/* ── UNIFIED LEFT ALIGNMENT & FULL-WIDTH GRID ── */
.tetsu-page .wrap{
  max-width: 100% !important;
  margin: 0 !important;
  padding-left: 3.5vw !important;
  padding-right: 3.5vw !important;
}

.tetsu-page .sec-head{
  text-align: left;
  max-width: 800px;
}

/* ── HERO EXTREME ALIGNMENT ── */
.tetsu-page .hero-grid{
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  width: 100% !important;
  gap: 4vw !important;
  align-items: center !important;
  text-align: left !important;
}
.tetsu-page .hero-copy{
  text-align: left !important;
  padding-left: 0 !important;
  margin-left: 0 !important;
}
.tetsu-page .hero-title{
  text-align: left !important;
}
.tetsu-page .hero-sub{
  font-size: 1.35rem;
  text-align: left !important;
  margin-left: 0 !important;
  margin-right: auto !important;
  max-width: 50ch;
}
.tetsu-page .hero-visual{
  display: flex !important;
  justify-content: flex-end !important;
  align-items: center !important;
  padding-right: 0 !important;
  width: 100% !important;
}
.tetsu-page .hero-visual img{
  max-width: 80%;
  max-height: 400px;
  height: auto;
  object-fit: contain;
  margin-left: auto;
  margin-right: auto;
}
.tetsu-page .spec-strip{
  justify-content: flex-start;
}
/* ── PRODUCT FEATURE TEXT (right of image) ── */
.tetsu-page .feature-block .feature-tag{
  font-size:0.95rem;
}
.tetsu-page .feature-block .feature-name{
  font-size:2.375rem;
}
.tetsu-page .feature-block .feature-desc{
  font-size:1.25rem;
}
.tetsu-page .problem-card .prob-title{
  font-size:1.375rem;
}
.tetsu-page .problem-card .prob-desc{
  font-size:1.0625rem;
}
.tetsu-page .spec-item .num{
  font-size:1.3125rem;
}
.tetsu-page .spec-item .lbl{
  font-size:0.825rem;
}
.tetsu-page .evi-card h3{
  font-size:1.5rem;
}
.tetsu-page .evi-card .evi-desc{
  font-size:1.0625rem;
}
.tetsu-page .evi-stat-val{
  font-size:2.5rem;
}
.tetsu-page .evi-stat-label{
  font-size:0.9rem;
}
.tetsu-page .adv-card h3{
  font-size:1.5rem;
}
.tetsu-page .adv-card p{
  font-size:1.0625rem;
}
.tetsu-page .hz-title{
  font-size:clamp(2.125rem, 3.75vw, 2.875rem) !important;
}
.tetsu-page .hz-desc{
  font-size:1.275rem !important;
}
.tetsu-page .science-name{
  font-size:1.375rem;
}
.tetsu-page .science-desc{
  font-size:1.0625rem;
}
.tetsu-page .conv-stat-num{
  font-size:1.625rem;
}
.tetsu-page .conv-stat-lbl{
  font-size:0.9rem;
}
.tetsu-page .conv-caption{
  font-size:1.125rem;
}
.tetsu-page .conv-visual{
  display: flex !important;
  justify-content: flex-end !important;
  align-items: center !important;
}
.tetsu-page .conv-visual img{
  max-width: 540px !important;
  width: 100% !important;
  height: auto !important;
  border-radius: 24px !important;
  box-shadow: 0 30px 60px -15px rgba(75, 22, 87, 0.28) !important;
  filter: none !important;
}
/* Hz section keeps its own padding/alignment */
.tetsu-page .hz-head{
  padding:0 6vw;
}
.tetsu-page .hz-head h2{
  font-size:clamp(2.625rem, 5.5vw, 4.25rem);
  line-height:1.04;
}

`}</style>
        




{/* ============================================================
     HERO
     ============================================================ */}
<section id="hero" className="theme-dark" data-label="Intro">
  <div className="grain"></div>
  <div className="wrap hero-grid">
    <div className="hero-copy">
      <h1 className="hero-title">TETSU-MOM</h1>
      <p className="hero-sub">TETSU-MOM is an easy-dissolving mouth-melt sachet formulated with LIPOFER microencapsulated iron. Take it anytime, anywhere with no water needed and zero metallic aftertaste.</p>
    </div>
    <div className="hero-visual">
      <img src={tetsuMomImg} alt="TETSU-MOM" />
    </div>
  </div>
</section>



      <section id="problem" className="theme-paper sec-pad" data-label="Clinical conversation">
  <div className="wrap">
    <div className="sec-head reveal">
      <h2>Why rethink oral iron?</h2>
      <p className="sec-sub">Daily iron intake often comes with everyday challenges like unpleasant taste and stomach discomfort, making consistency harder than it needs to be.</p>
    </div>

    <div className="problem-grid stagger">
      <div className="problem-card reveal">
        <div className="problem-top"><span className="problem-title">Taste</span><span className="problem-num">01</span></div>
        <p className="problem-issue">Traditional iron can leave an unpleasant metallic taste.</p>
        <p className="problem-answer">LIPOFER technology helps eliminate the metallic aftertaste.</p>
      </div>
      <div className="problem-card reveal">
        <div className="problem-top"><span className="problem-title">Tolerability</span><span className="problem-num">02</span></div>
        <p className="problem-issue">Stomach discomfort often causes people to skip doses.</p>
        <p className="problem-answer">Formulated to be gentle on the stomach and easy to digest.</p>
      </div>
      <div className="problem-card reveal">
        <div className="problem-top"><span className="problem-title">Convenience</span><span className="problem-num">03</span></div>
        <p className="problem-issue">Bulky tablets require water and can be hard to swallow.</p>
        <p className="problem-answer">Fast-melting stick format requires no water and fits seamlessly into your day.</p>
      </div>
      <div className="problem-card reveal">
        <div className="problem-top"><span className="problem-title">Formulation</span><span className="problem-num">04</span></div>
        <p className="problem-issue">Standard iron can easily interact with foods and nutrients.</p>
        <p className="problem-answer">Microencapsulation protects nutrient quality and prevents unwanted interactions.</p>
      </div>
    </div>
  </div>
</section>



      <section id="product" className="theme-blush sec-pad" data-label="Product">
  <div className="wrap">
    <div className="sec-head reveal">
      <h2>Designed for Maternal Wellness.</h2>
      <p className="sec-sub">A premium and easy-to-take iron melt designed specifically for women during pregnancy and lactation.</p>
    </div>

    <div className="product-layout">
      <div className="product-sticky">
        <div className="product-photo-frame">
          <img src={tetsuMomLifestyleImg} alt="Maternal wellness lifestyle" />
        </div>
      </div>

      <div className="feature-list" id="featureList">
        <div className="feature-block" data-feature="0">
          <span className="feature-tag">Fe · Daily Serving</span>
          <h3 className="feature-name">Iron, 29 mg</h3>
          <p className="feature-desc">High-quality LIPOFER iron sourced from Spain, serving as the gentle foundation of every stick.</p>
        </div>
        <div className="feature-block" data-feature="1">
          <span className="feature-tag">FA · Daily Serving</span>
          <h3 className="feature-name">Folic Acid, 129.41 mcg</h3>
          <p className="feature-desc">Essential folic acid thoughtfully paired with iron in a single convenient daily stick.</p>
        </div>
        <div className="feature-block" data-feature="2">
          <span className="feature-tag">Format</span>
          <h3 className="feature-name">Orodispersible powder</h3>
          <p className="feature-desc">Fine powder that melts smoothly on your tongue without chewing or swallowing pills.</p>
        </div>
        <div className="feature-block" data-feature="3">
          <span className="feature-tag">Administration</span>
          <h3 className="feature-name">No water required</h3>
          <p className="feature-desc">Compact stick sachets that fit in your bag, so gentle care is always within reach.</p>
        </div>
      </div>
    </div>
  </div>
</section>



      <section id="evidence" className="theme-paper sec-pad" data-label="Evidence">
  <div className="wrap">
    <div className="sec-head reveal">
      <h2>What the LIPOFER<br />evidence shows.</h2>
      <p className="sec-sub">Grounded in published research on LIPOFER ingredient bioavailability and absorption.</p>
    </div>

    <div className="stat-grid stagger">
      <div className="stat-card reveal">
        <span className="stat-num" data-count data-target="3.5" data-decimals="1" data-suffix="×">0×</span>
        <div className="stat-vs">vs ferric pyrophosphate</div>
        <div className="stat-src">Rat absorption study</div>
      </div>
      <div className="stat-card reveal">
        <span className="stat-num" data-count data-target="2.7" data-decimals="1" data-suffix="×">0×</span>
        <div className="stat-vs">vs control</div>
        <div className="stat-src">Rat absorption study</div>
      </div>
      <div className="stat-card reveal">
        <span className="stat-num" data-count data-target="80" data-decimals="0" data-prefix="~" data-suffix="%">~0%</span>
        <div className="stat-vs">higher ferritin at 16 weeks</div>
        <div className="stat-src">130 women, fortified fruit juice</div>
      </div>
    </div>

    <div className="evidence-lower">
      <div className="evidence-card human reveal">
        <span className="tag">Human data</span>
        <p>A 16-week randomized, double-blind, placebo-controlled study in 130 menstruating women with low iron stores reported improved iron status with LIPOFER-fortified fruit juice.</p>
      </div>
      <div className="evidence-card warn reveal">
        <span className="tag">Important</span>
        <p>These research insights reflect the proven performance of LIPOFER microencapsulated iron.</p>
      </div>
    </div>
  </div>
</section>



      <section id="advantages" className="theme-blush sec-pad" data-label="Advantages">
  <div className="wrap">
    <div className="sec-head reveal">
      <h2>Why TETSU-MOM?</h2>
      <p className="sec-sub">Combining advanced microencapsulation with an effortless, enjoyable daily experience.</p>
    </div>

    <div className="adv-grid stagger">
      <div className="adv-card reveal">
        <span className="adv-num">01</span>
        <div className="adv-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3s6 6.5 6 11a6 6 0 1 1-12 0c0-4.5 6-11 6-11Z"/></svg></div>
        <span className="adv-kicker">Orodispersible stick</span>
        <h3 className="adv-title">No water</h3>
        <p className="adv-desc">Effortlessly melts on your tongue so you never need a glass of water.</p>
      </div>
      <div className="adv-card reveal">
        <span className="adv-num">02</span>
        <div className="adv-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 21c4-2.5 7-6.2 7-10.5A7 7 0 0 0 5 10.5C5 14.8 8 18.5 12 21Z"/><path d="M9 11.5c1 1.4 2 1.4 3 0s2-1.4 3 0"/></svg></div>
        <span className="adv-kicker">Reduced metallic taste</span>
        <h3 className="adv-title">Palatability</h3>
        <p className="adv-desc">Microencapsulation locks away raw iron taste, keeping every dose smooth and pleasant.</p>
      </div>
      <div className="adv-card reveal">
        <span className="adv-num">03</span>
        <div className="adv-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/></svg></div>
        <span className="adv-kicker">LIPOFER technology</span>
        <h3 className="adv-title">Bioavailability</h3>
        <p className="adv-desc">Micronized particles allow your body to absorb iron more efficiently.</p>
      </div>
      <div className="adv-card reveal">
        <span className="adv-num">04</span>
        <div className="adv-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="7" y="3" width="10" height="18" rx="3"/><line x1="7" y1="7" x2="17" y2="7"/></svg></div>
        <span className="adv-kicker">Single-stick format</span>
        <h3 className="adv-title">Convenience</h3>
        <p className="adv-desc">Individually wrapped sticks ready whenever and wherever your day takes you.</p>
      </div>
    </div>
  </div>
</section>



      <section id="dialogue" data-label="Doctor dialogue">
  <div className="hz-wrap" id="hzWrap">
    <div className="hz-sticky">
      <div className="hz-head reveal">
        <h2>A simple but<br />effective story.</h2>
      </div>

      <div className="hz-track" id="hzTrack">
        <div className="hz-panel v1">
          <span className="big-num">01</span>
          <div><h3 className="hz-title">Where the conversation starts</h3></div>
          <p className="hz-desc">Iron supplementation can be limited by taste, tolerability and convenience.</p>
        </div>
        <div className="hz-panel v4">
          <span className="big-num">02</span>
          <div><h3 className="hz-title">What TETSU-MOM is built on</h3></div>
          <p className="hz-desc">TETSU-MOM uses LIPOFER microencapsulated ferric pyrophosphate.</p>
        </div>
        <div className="hz-panel v3">
          <span className="big-num">03</span>
          <div><h3 className="hz-title">What the patient actually does</h3></div>
          <p className="hz-desc">Orodispersible stick format; no water required.</p>
        </div>
        <div className="hz-panel v2">
          <span className="big-num">04</span>
          <div><h3 className="hz-title">What's behind the claims</h3></div>
          <p className="hz-desc">LIPOFER has ingredient-level bioavailability and human iron-status data.</p>
        </div>
      </div>

      <div className="hz-progress">
        <span className="hz-progress-lbl">01</span>
        <div className="hz-progress-track"><div className="hz-progress-fill" id="hzFill"></div></div>
        <span className="hz-progress-lbl">04</span>
      </div>
    </div>
  </div>
</section>



      <section id="science" className="theme-dark sec-pad" data-label="Science">
  <div className="grain"></div>
  <div className="wrap">
    <div className="sec-head reveal">
      <h2>From iron particle to<br />patient experience.</h2>
      <p className="sec-sub">How microencapsulation transforms raw iron into a gentle, highly bioavailable daily supplement.</p>
    </div>

    <div className="science-pipeline" id="sciencePipeline">
      <div className="science-line"><div className="science-line-fill" id="scienceLineFill"></div></div>

      <div className="science-row reveal" data-row>
        <div><span className="science-dot"></span><span className="science-idx">01</span><h3 className="science-name">Micronization</h3></div>
        <p className="science-desc">Ultra-fine particle size increases surface area for enhanced absorption.</p>
      </div>
      <div className="science-row reveal" data-row>
        <div><span className="science-dot"></span><span className="science-idx">02</span><h3 className="science-name">Microencapsulation</h3></div>
        <p className="science-desc">Protective micro-layers safeguard iron stability and prevent stomach irritation.</p>
      </div>
      <div className="science-row reveal" data-row>
        <div><span className="science-dot"></span><span className="science-idx">03</span><h3 className="science-name">Water dispersibility</h3></div>
        <p className="science-desc">Allows rapid, seamless dissolving directly on the tongue.</p>
      </div>
      <div className="science-row reveal" data-row>
        <div><span className="science-dot"></span><span className="science-idx">04</span><h3 className="science-name">Organoleptic benefit</h3></div>
        <p className="science-desc">Eliminates metallic flavor for a clean, palatable taste.</p>
      </div>
      <div className="science-row reveal" data-row>
        <div><span className="science-dot"></span><span className="science-idx">05</span><h3 className="science-name">GI profile</h3></div>
        <p className="science-desc">Gentle on your stomach for comfortable everyday use.</p>
      </div>
    </div>
  </div>
</section>



      <section id="convenience" className="sec-pad" data-label="Patient convenience">
  <div className="wrap conv-grid">
    <div>
      <h2 className="reveal" style={{"marginTop":"0.9rem","fontSize":"clamp(2rem,4.2vw,3rem)","color":"var(--plum)"} as any}>Iron, reimagined for two.</h2>
      <p className="reveal" style={{"marginTop":"1rem","fontSize":"1.05rem","color":"var(--ink-text)","opacity":"0.8","maxWidth":"38ch"} as any}>TETSU-MOM brings together advanced nutrition, great taste, and effortless daily convenience.</p>

      <div className="conv-stats reveal">
        <div><span className="conv-stat-num">29 mg</span><span className="conv-stat-lbl">Iron</span></div>
        <div><span className="conv-stat-num">129.41 mcg</span><span className="conv-stat-lbl">Folic acid</span></div>
        <div><span className="conv-stat-num">1 stick</span><span className="conv-stat-lbl">Orodispersible</span></div>
      </div>

      <p className="conv-caption reveal">A modern, delightful stick melt designed to fit seamlessly into your everyday wellness routine.</p>
    </div>
    <div className="conv-visual reveal">
      <img src={tetsuPowderImg} alt="TETSU-MOM powder dissolving" />
    </div>
  </div>
</section>

      {/* Website Original Footer */}
      <Footer />



      </div>
    </>
  );
};

export default TetsuMomDetailPage;