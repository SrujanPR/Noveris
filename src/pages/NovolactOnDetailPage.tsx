// @ts-nocheck
import React, { useEffect } from 'react';
import { Footer } from '../components/Footer';

export const NovolactOnDetailPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    let isDisposed = false;
    let animFrames: number[] = [];
    let eventListeners: Array<{ target: EventTarget; type: string; listener: EventListenerOrEventListenerObject; opts?: any }> = [];

    function safeAddEventListener(target: EventTarget, type: string, listener: EventListenerOrEventListenerObject, opts?: any) {
      target.addEventListener(type, listener, opts);
      eventListeners.push({ target, type, listener, opts });
    }

    try {
      
(function(){
  "use strict";

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isDesktop = window.matchMedia('(min-width: 861px)').matches;
  var clamp = function(v,a,b){ return Math.max(a, Math.min(b, v)); };
  var lerp = function(a,b,t){ return a + (b-a)*t; };
  var smoothstep = function(edge0, edge1, x){
    var t = clamp((x-edge0)/(edge1-edge0), 0, 1);
    return t*t*(3-2*t);
  };

  /* ============================================================
     Apple-style Spring engine (critically-damped by default,
     damping-ratio + response parameterisation)
     ============================================================ */
  function Spring(opts){
    opts = opts || {};
    this.mass = opts.mass || 1;
    this.setResponse(opts.dampingRatio != null ? opts.dampingRatio : 1, opts.response != null ? opts.response : 0.35);
    this.value = opts.value || 0;
    this.target = this.value;
    this.velocity = 0;
    this._raf = null;
    this.onUpdate = opts.onUpdate || null;
    this.onSettle = opts.onSettle || null;
  }
  Spring.prototype.setResponse = function(dampingRatio, response){
    var angFreq = 2*Math.PI / Math.max(response, 0.001);
    this.stiffness = angFreq*angFreq*this.mass;
    this.damping = 2*dampingRatio*angFreq*this.mass;
  };
  Spring.prototype.set = function(value){
    this.value = value; this.target = value; this.velocity = 0;
    this._stop();
    if(this.onUpdate) this.onUpdate(this.value);
  };
  Spring.prototype.to = function(target, velocity){
    this.target = target;
    if(velocity !== undefined) this.velocity = velocity;
    this._start();
  };
  Spring.prototype._start = function(){
    if(this._raf) return;
    var self = this;
    var last = performance.now();
    function step(now){
      var dt = Math.min((now-last)/1000, 1/30);
      last = now;
      var springForce = -self.stiffness * (self.value - self.target);
      var dampingForce = -self.damping * self.velocity;
      var accel = (springForce + dampingForce) / self.mass;
      self.velocity += accel*dt;
      self.value += self.velocity*dt;
      if(self.onUpdate) self.onUpdate(self.value);
      var atRest = Math.abs(self.velocity) < 4 && Math.abs(self.target-self.value) < 0.4;
      if(atRest){
        self.value = self.target; self.velocity = 0;
        if(self.onUpdate) self.onUpdate(self.value);
        self._stop();
        if(self.onSettle) self.onSettle();
        return;
      }
      self._raf = requestAnimationFrame(step);
    }
    self._raf = requestAnimationFrame(step);
  };
  Spring.prototype._stop = function(){
    if(this._raf){ cancelAnimationFrame(this._raf); this._raf = null; }
  };

  // exact momentum-projection function from the design reference
  function project(initialVelocity, decelerationRate){
    decelerationRate = decelerationRate || 0.997;
    return (initialVelocity/1000) * decelerationRate / (1 - decelerationRate);
  }
  // exact rubber-band resistance function from the design reference
  function rubberband(overshoot, dimension, constant){
    constant = constant || 0.55;
    return (overshoot*dimension*constant) / (dimension + constant*Math.abs(overshoot));
  }

  /* ============================================================
     Scroll progress bar + nav state (single rAF-throttled loop)
     ============================================================ */
  var progressBar = document.getElementById('progressBar');
  var nav = document.getElementById('nav');
  var ticking = false;

  function onScroll(){
    if(!ticking){
      requestAnimationFrame(update);
      ticking = true;
    }
  }
  function update(){
    ticking = false;
    var doc = document.documentElement;
    var scrollTop = window.scrollY || doc.scrollTop;
    var max = doc.scrollHeight - window.innerHeight;
    var pct = max > 0 ? clamp(scrollTop/max, 0, 1) : 0;
    if (progressBar) if (progressBar) progressBar.style.width = (pct*100) + '%';
    if (nav) if (nav) nav.classList.toggle('is-scrolled', scrollTop > 30);

    updatePinned();
    updateParallax(scrollTop);
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', function(){
    isDesktop = window.matchMedia('(min-width: 861px)').matches;
    setupPinClasses();
    update();
  });

  /* ============================================================
     Reveal-on-scroll (IntersectionObserver)
     ============================================================ */
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.16, rootMargin:'0px 0px -6% 0px'});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  /* ============================================================
     Counters
     ============================================================ */
  var counters = document.querySelectorAll('[data-count]');
  if('IntersectionObserver' in window){
    var cio = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          animateCount(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, {threshold:0.5});
    counters.forEach(function(el){ cio.observe(el); });
  }
  function animateCount(el){
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    if(reduceMotion){ el.textContent = target + suffix; return; }
    var spring = new Spring({dampingRatio:1, response:1.1, value:0});
    spring.onUpdate = function(v){
      el.textContent = Math.round(v) + suffix;
    };
    spring.to(target);
  }

  /* ============================================================
     Ambient rising bubbles
     ============================================================ */
  function makeBubbles(containerId, count){
    var container = document.getElementById(containerId);
    if(!container || reduceMotion) return;
    for(var i=0;i<count;i++){
      var b = document.createElement('span');
      b.className = 'bubble';
      var size = 4 + Math.random()*14;
      b.style.width = size+'px';
      b.style.height = size+'px';
      b.style.left = (Math.random()*100)+'%';
      b.style.setProperty('--drift', (Math.random()*60-30)+'px');
      var duration = 7 + Math.random()*9;
      b.style.animationDuration = duration+'s';
      b.style.animationDelay = (Math.random()*duration)+'s';
      container.appendChild(b);
    }
  }
  makeBubbles('heroBubbles', 16);
  makeBubbles('deliveryBubbles', 20);

  /* ============================================================
     Magnetic buttons + press feedback
     ============================================================ */
  document.querySelectorAll('.magnetic-wrap').forEach(function(wrap){
    var el = wrap.querySelector('.magnetic');
    if(!el || reduceMotion) return;
    var sx = new Spring({dampingRatio:1, response:0.3, value:0});
    var sy = new Spring({dampingRatio:1, response:0.3, value:0});
    sx.onUpdate = function(v){ applyMagnetic(el, v, sy.value); };
    sy.onUpdate = function(v){ applyMagnetic(el, sx.value, v); };
    wrap.addEventListener('mousemove', function(e){
      var r = el.getBoundingClientRect();
      var dx = (e.clientX - (r.left+r.width/2)) * 0.35;
      var dy = (e.clientY - (r.top+r.height/2)) * 0.35;
      sx.to(clamp(dx,-14,14));
      sy.to(clamp(dy,-10,10));
    });
    wrap.addEventListener('mouseleave', function(){
      sx.to(0); sy.to(0);
    });
  });
  function applyMagnetic(el, x, y){
    el.style.transform = 'translate('+x.toFixed(1)+'px,'+y.toFixed(1)+'px)';
  }

  /* ============================================================
     Smooth anchor scrolling (respects reduced motion)
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = a.getAttribute('href');
      if(id.length < 2) return;
      var target = document.querySelector(id);
      if(!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({top:top, behavior: reduceMotion ? 'auto' : 'smooth'});
    });
  });

  /* ============================================================
     Pinned scrollytelling: Formulation + Mechanism
     ============================================================ */
  var formPin = document.getElementById('formPin');
  var mechPin = document.getElementById('mechPin');

  function setupPinClasses(){
    [formPin, mechPin].forEach(function(el){
      if(!el) return;
      el.classList.toggle('is-pinned', isDesktop);
    });
  }
  setupPinClasses();

  function getProgress(wrapper){
    if(!wrapper || !wrapper.classList.contains('is-pinned')) return null;
    var rect = wrapper.getBoundingClientRect();
    var total = wrapper.offsetHeight - window.innerHeight;
    if(total <= 0) return 0;
    var scrolled = -rect.top;
    return clamp(scrolled/total, 0, 1);
  }

  var orbs = Array.prototype.slice.call(document.querySelectorAll('.orb'));
  var formBar = document.getElementById('formBar');
  var formPct = document.getElementById('formPct');
  var orbRadius = function(){ return window.innerWidth < 860 ? 130 : 175; };

  function renderFormulation(p){
    if(p === null){
      // static fallback (mobile): show fully assembled state
      p = 1;
    }
    var pct = Math.round(p*100);
    formBar.style.width = pct+'%';
    formPct.textContent = pct+'%';

    var R = orbRadius();
    orbs.forEach(function(orb, i){
      var start = 0.06 + i*0.09;
      var end = 0.55 + i*0.09;
      var t = smoothstep(start, end, p);
      var angle = parseFloat(orb.getAttribute('data-angle')) * Math.PI/180;
      var dx = Math.cos(angle) * R * t;
      var dy = Math.sin(angle) * R * t;
      var scale = lerp(0.55, 1, t);
      orb.style.opacity = t;
      orb.style.transform = 'translate('+dx.toFixed(1)+'px,'+dy.toFixed(1)+'px) scale('+scale.toFixed(3)+')';
    });

    var core = document.querySelector('.tablet-core');
    if(core){
      var coreScale = lerp(1, 0.82, smoothstep(0.1,0.7,p));
      core.style.transform = 'scale('+coreScale.toFixed(3)+') rotate('+(p*18).toFixed(1)+'deg)';
    }
  }

  var mechPaths = {
    prolactin: document.getElementById('pathProlactin'),
    oxytocin: document.getElementById('pathOxytocin'),
    mammary: document.getElementById('pathMammary')
  };
  var mechNodes = {
    prolactin: document.getElementById('nodeProlactin'),
    oxytocin: document.getElementById('nodeOxytocin'),
    mammary: document.getElementById('nodeMammary')
  };
  Object.keys(mechPaths).forEach(function(k){
    var p = mechPaths[k];
    if(p){ p.style.strokeDasharray = '1'; p.style.strokeDashoffset = '1'; }
  });

  function renderMechanism(p){
    if(p === null) p = 1;
    var windows = {
      prolactin: [0.02, 0.42],
      oxytocin: [0.14, 0.54],
      mammary: [0.26, 0.66]
    };
    Object.keys(mechPaths).forEach(function(k){
      var w = windows[k];
      var t = smoothstep(w[0], w[1], p);
      if(mechPaths[k]) mechPaths[k].style.strokeDashoffset = (1-t);
      if(mechNodes[k]){
        var nodeT = smoothstep(w[0]+0.06, w[1]+0.1, p);
        mechNodes[k].style.opacity = nodeT;
        mechNodes[k].style.transform = 'translateY('+lerp(14,0,nodeT).toFixed(1)+'px) scale('+lerp(0.92,1,nodeT).toFixed(3)+')';
      }
    });
  }

  function updatePinned(){
    renderFormulation(getProgress(formPin));
    renderMechanism(getProgress(mechPin));
  }

  /* ============================================================
     Parallax (hero product, challenge photo, delivery bg)
     ============================================================ */
  var heroProduct = document.getElementById('heroProduct');
  var babyImg = document.getElementById('babyImg');
  var glassImg = document.getElementById('glassImg');

  function updateParallax(scrollTop){
    if(reduceMotion) return;

    if(heroProduct){
      var heroRect = heroProduct.closest('.hero').getBoundingClientRect();
      var hp = clamp(-heroRect.top / (window.innerHeight||1), -1, 1);
      heroProduct.style.transform = 'translateY('+(hp*40).toFixed(1)+'px) rotate('+(hp*3).toFixed(2)+'deg)';
    }
    if(babyImg){
      var bRect = babyImg.parentElement.getBoundingClientRect();
      var bp = clamp(1 - (bRect.top / (window.innerHeight||1)), 0, 2) - 1;
      babyImg.style.transform = 'translateY('+(bp*-24).toFixed(1)+'px) scale(1.08)';
    }
    if(glassImg){
      var gRect = glassImg.closest('.delivery').getBoundingClientRect();
      var gp = clamp(1 - (gRect.top / (window.innerHeight||1)), -1, 2);
      glassImg.style.transform = 'translateY('+(gp*-30).toFixed(1)+'px) scale(1.06)';
    }
  }

  /* ============================================================
     Ingredient carousel, Apple-fluid direct manipulation:
     1:1 tracking, rubber-band bounds, velocity handoff,
     momentum projection, spring snap.
     ============================================================ */
  (function initCarousel(){
    var viewport = document.getElementById('carViewport');
    var track = document.getElementById('carTrack');
    var cards = Array.prototype.slice.call(track.querySelectorAll('.ing-card'));
    var dotsWrap = document.getElementById('carDots');
    var prevBtn = document.getElementById('carPrev');
    var nextBtn = document.getElementById('carNext');
    if(!viewport || !track || cards.length === 0) return;

    var activeIndex = 0;
    var snapPoints = [];
    var minX = 0, maxX = 0;

    dotsWrap.innerHTML = '';
    cards.forEach(function(c, i){
      var d = document.createElement('button');
      d.setAttribute('aria-label', 'Go to ingredient '+(i+1));
      if(i===0) d.classList.add('active');
      d.addEventListener('click', function(){ goTo(i); });
      dotsWrap.appendChild(d);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    function measure(){
      snapPoints = cards.map(function(c){ return -c.offsetLeft; });
      var trackWidth = track.scrollWidth;
      var viewportWidth = viewport.clientWidth;
      minX = Math.min(0, viewportWidth - trackWidth);
      maxX = 0;
    }
    measure();
    window.addEventListener('resize', debounce(function(){
      measure();
      goTo(activeIndex, true);
    }, 150));

    var spring = new Spring({dampingRatio:0.82, response:0.44, value:0});
    spring.onUpdate = function(v){
      track.style.transform = 'translateX('+v.toFixed(1)+'px)';
      updateActiveFromValue(v);
    };

    function updateActiveFromValue(v){
      var nearest = 0, best = Infinity;
      snapPoints.forEach(function(sp, i){
        var d = Math.abs(sp - v);
        if(d < best){ best = d; nearest = i; }
      });
      if(nearest !== activeIndex){
        activeIndex = nearest;
        dots.forEach(function(d,i){ d.classList.toggle('active', i===activeIndex); });
      }
    }

    function nearestSnap(x){
      var clampedX = clamp(x, minX, maxX);
      var nearest = snapPoints[0], best = Infinity, idx=0;
      snapPoints.forEach(function(sp,i){
        var d = Math.abs(sp - clampedX);
        if(d < best){ best = d; nearest = sp; idx=i; }
      });
      return {x:nearest, idx:idx};
    }

    function goTo(i, instant){
      i = clamp(i, 0, cards.length-1);
      var target = clamp(snapPoints[i], minX, maxX);
      activeIndex = i;
      dots.forEach(function(d,k){ d.classList.toggle('active', k===i); });
      if(instant || reduceMotion){ spring.set(target); }
      else{ spring.to(target); }
    }

    prevBtn.addEventListener('click', function(){ goTo(activeIndex-1); });
    nextBtn.addEventListener('click', function(){ goTo(activeIndex+1); });

    viewport.tabIndex = 0;
    viewport.addEventListener('keydown', function(e){
      if(e.key === 'ArrowRight'){ goTo(activeIndex+1); }
      if(e.key === 'ArrowLeft'){ goTo(activeIndex-1); }
    });

    /* --- pointer drag: 1:1 tracking, rubber-band, momentum --- */
    var dragging = false;
    var startX = 0, startTranslate = 0;
    var history = [];

    viewport.addEventListener('pointerdown', function(e){
      dragging = true;
      viewport.classList.add('grabbing');
      spring._stop();
      startX = e.clientX;
      startTranslate = currentTranslateX();
      history = [{x:e.clientX, t:performance.now()}];
      viewport.setPointerCapture(e.pointerId);
    });

    viewport.addEventListener('pointermove', function(e){
      if(!dragging) return;
      var raw = startTranslate + (e.clientX - startX);
      var constrained = raw;
      var dim = viewport.clientWidth;
      if(raw > maxX){
        constrained = maxX + rubberband(raw-maxX, dim);
      } else if(raw < minX){
        constrained = minX - rubberband(minX-raw, dim);
      }
      track.style.transform = 'translateX('+constrained.toFixed(1)+'px)';
      updateActiveFromValue(constrained);
      history.push({x:e.clientX, t:performance.now()});
      if(history.length > 6) history.shift();
    });

    function endDrag(e){
      if(!dragging) return;
      dragging = false;
      viewport.classList.remove('grabbing');
      var current = currentTranslateX();

      var velocity = 0;
      if(history.length >= 2){
        var a = history[0], b = history[history.length-1];
        var dt = (b.t - a.t) / 1000;
        if(dt > 0) velocity = (b.x - a.x) / dt;
      }

      if(current > maxX || current < minX){
        var target = clamp(current, minX, maxX);
        spring.to(target, velocity);
        updateActiveFromValue(target);
      } else {
        var projected = current + project(velocity);
        var snap = nearestSnap(projected);
        spring.to(snap.x, velocity);
      }
    }
    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointercancel', endDrag);
    viewport.addEventListener('pointerleave', function(e){ if(dragging) endDrag(e); });

    function currentTranslateX(){
      var style = window.getComputedStyle(track);
      var matrix = style.transform;
      if(matrix && matrix !== 'none'){
        var match = matrix.match(/matrix\(([^)]+)\)/);
        if(match){
          var parts = match[1].split(',').map(parseFloat);
          return parts[4] || 0;
        }
      }
      return 0;
    }

    /* trackpad horizontal wheel support */
    var wheelTimeout = null;
    viewport.addEventListener('wheel', function(e){
      if(Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
      e.preventDefault();
      spring._stop();
      var raw = currentTranslateX() - e.deltaX;
      var dim = viewport.clientWidth;
      var constrained = raw;
      if(raw > maxX) constrained = maxX + rubberband(raw-maxX, dim);
      else if(raw < minX) constrained = minX - rubberband(minX-raw, dim);
      track.style.transform = 'translateX('+constrained.toFixed(1)+'px)';
      updateActiveFromValue(constrained);
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(function(){
        var snap = nearestSnap(constrained);
        spring.set(constrained);
        spring.to(snap.x, 0);
      }, 110);
    }, {passive:false});

  })();

  function debounce(fn, wait){
    var t;
    return function(){
      clearTimeout(t);
      var args = arguments;
      t = setTimeout(function(){ fn.apply(null, args); }, wait);
    };
  }

  /* initial paint */
  update();
})();

    } catch (err) {
      console.error("Novolact animation script error:", err);
    }

    return () => {
      isDisposed = true;
      eventListeners.forEach(({ target, type, listener, opts }) => {
        try { target.removeEventListener(type, listener, opts); } catch (e) {}
      });
    };
  }, []);

  return (
    <>
      <div className="novolact-page">
        <style>{`
/* ============================================================
   NOVOLACT-ON, token system
   ============================================================ */
:root{
  --ink:#1B2340;
  --ink-soft:#535A78;
  --wine:#8A2846;
  --wine-deep:#4C1226;
  --wine-tint:#F3E3E7;
  --sage-bg:#CFE8DE;
  --sage-deep:#3F8F6C;
  --blush:#F5EAE6;
  --paper:#FCFAF7;
  --paper-2:#F1EBE3;
  --citrus:#B96A16;
  --citrus-light:#E0A94D;
  --taupe:#8C8375;
  --white:#FFFFFF;
  --line:rgba(27,35,64,0.13);
  --line-soft:rgba(27,35,64,0.07);

  --font-display:'Space Grotesk',sans-serif;
  --font-body:'Instrument Sans',sans-serif;
  --font-mono:'IBM Plex Mono',ui-monospace,monospace;

  --container:1240px;
  --edge: clamp(20px, 5vw, 64px);

  --ease-out: cubic-bezier(.16,.84,.44,1);
  --ease-in-out: cubic-bezier(.65,0,.35,1);
} .novolact-page *, .novolact-page *::before, .novolact-page *::after { box-sizing:border-box; }

html,

img{ max-width:100%; display:block; } .novolact-page a { color:inherit; }
button{ font-family:inherit; } .novolact-page ::selection { background:var(--wine); color:var(--white); }

:focus-visible{
  outline: 2px solid var(--wine);
  outline-offset: 3px;
  border-radius: 2px;
}

.sr-only{
  position:absolute; width:1px; height:1px; padding:0; margin:-1px;
  overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0;
}

/* ============================================================
   Typography helpers
   ============================================================ */
.eyebrow{
  font-family:var(--font-mono);
  font-size:0.72rem;
  letter-spacing:0.14em;
  text-transform:uppercase;
  font-weight:500;
  color:var(--wine);
  display:inline-flex;
  align-items:center;
  gap:0.55em;
}
.eyebrow::before{
  content:'';
  width:6px; height:6px; border-radius:50%;
  background:var(--wine);
  display:inline-block;
}
.eyebrow.on-dark{ color:var(--sage-bg); }
.eyebrow.on-dark::before{ background:var(--sage-bg); }

.h-display{
  font-family:var(--font-display);
  font-weight:600;
  letter-spacing:-0.02em;
  line-height:0.98;
  margin:0;
}
.h-section{
  font-family:var(--font-display);
  font-weight:560;
  font-size:clamp(2rem,4vw,3.35rem);
  letter-spacing:-0.015em;
  line-height:1.04;
  margin:0;
}
.lede{
  font-size:clamp(1.02rem,1.4vw,1.2rem);
  color:var(--ink-soft);
  max-width:46ch;
  line-height:1.65;
}
.mono-tag{
  font-family:var(--font-mono);
  font-size:0.7rem;
  letter-spacing:0.08em;
  text-transform:uppercase;
  color:var(--ink-soft);
}

.wrap{
  max-width:var(--container);
  margin:0 auto;
  padding-left:var(--edge);
  padding-right:var(--edge);
}

/* ============================================================
   Reveal utility (JS toggles .is-visible)
   ============================================================ */
.reveal{
  opacity:0;
  transform:translateY(28px);
  transition:opacity .8s var(--ease-out), transform .8s var(--ease-out);
}
.reveal.is-visible{ opacity:1; transform:translateY(0); }
.reveal-fade{ opacity:0; transition:opacity .9s var(--ease-out); }
.reveal-fade.is-visible{ opacity:1; }

.stagger > *{ transition-delay:calc(var(--i,0) * 90ms); }

/* ============================================================
   Progress bar + Nav
   ============================================================ */
#progressBar{
  position:fixed; top:0; left:0; height:2px; width:0%;
  background:var(--wine);
  z-index:999;
  transform-origin:left;
}

.nav{
  position:fixed; top:0; left:0; right:0; z-index:900;
  padding:18px var(--edge);
  display:flex; align-items:center; justify-content:space-between;
  transition:background .4s var(--ease-out), backdrop-filter .4s var(--ease-out), padding .4s var(--ease-out), border-color .4s var(--ease-out);
  border-bottom:1px solid transparent;
}
.nav.is-scrolled{
  background:rgba(252,250,247,0.72);
  backdrop-filter:blur(16px) saturate(160%);
  -webkit-backdrop-filter:blur(16px) saturate(160%);
  border-bottom:1px solid var(--line-soft);
  padding-top:12px; padding-bottom:12px;
}
.nav-mark{
  font-family:var(--font-display);
  font-weight:600;
  font-size:1.05rem;
  letter-spacing:-0.01em;
  text-decoration:none;
  display:flex; align-items:baseline; gap:6px;
}
.nav-mark .reg{ font-size:0.55em; color:var(--wine); font-family:var(--font-mono); }
.nav-links{
  display:flex; gap:28px; list-style:none; margin:0; padding:0;
}
.nav-links a{
  font-family:var(--font-mono);
  font-size:0.72rem;
  letter-spacing:0.06em;
  text-transform:uppercase;
  text-decoration:none;
  color:var(--ink-soft);
  position:relative;
  padding-bottom:3px;
}
.nav-links a::after{
  content:'';
  position:absolute; left:0; right:100%; bottom:0; height:1px;
  background:var(--wine);
  transition:right .35s var(--ease-out);
}
.nav-links a:hover::after{ right:0; }
.nav-cta{
  font-family:var(--font-mono);
  font-size:0.7rem;
  letter-spacing:0.06em;
  text-transform:uppercase;
  text-decoration:none;
  border:1px solid var(--ink);
  color:var(--ink);
  padding:9px 16px;
  border-radius:100px;
  transition:background .25s var(--ease-out), color .25s var(--ease-out), transform .1s var(--ease-out);
}
.nav-cta:hover{ background:var(--ink); color:var(--paper); }
.nav-cta:active{ transform:scale(0.96); }

@media (max-width: 860px){
  .nav-links{ display:none; }
}

/* ============================================================
   Buttons
   ============================================================ */
.btn{
  font-family:var(--font-mono);
  font-size:0.76rem;
  letter-spacing:0.06em;
  text-transform:uppercase;
  text-decoration:none;
  display:inline-flex; align-items:center; gap:10px;
  padding:15px 26px;
  border-radius:100px;
  cursor:pointer;
  border:1px solid transparent;
  transition:background .25s var(--ease-out), color .25s var(--ease-out), border-color .25s var(--ease-out), transform .1s ease-out;
  will-change:transform;
}
.btn:active{ transform:scale(0.96); transition:transform .1s ease-out; }
.btn-primary{ background:var(--wine); color:var(--paper); }
.btn-primary:hover{ background:var(--wine-deep); }
.btn-ghost{ background:transparent; color:var(--ink); border-color:var(--ink); }
.btn-ghost:hover{ background:var(--ink); color:var(--paper); }
.btn-arrow{ transition:transform .3s var(--ease-out); }
.btn:hover .btn-arrow{ transform:translateX(4px); }
.magnetic-wrap{ display:inline-block; }

/* ============================================================
   HERO
   ============================================================ */
.hero{
  position:relative;
  min-height:100svh;
  display:flex; flex-direction:column; justify-content:center;
  overflow:hidden;
  padding-top:96px;
  background:
    radial-gradient(ellipse 60% 50% at 78% 30%, rgba(207,232,222,0.55), transparent 60%),
    radial-gradient(ellipse 50% 45% at 15% 85%, rgba(138,40,70,0.08), transparent 60%),
    linear-gradient(180deg, var(--blush) 0%, var(--paper) 100%);
}
.hero-grid{
  position:relative; z-index:2;
  display:grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items:center;
  gap:2vw;
  width:100%;
}
.hero-copy{ max-width:640px; }
.hero-copy .eyebrow{ margin-bottom:22px; }
.hero-title{
  font-size:clamp(2.7rem, 5.6vw, 4.85rem);
}
.hero-title .line2{
  display:block;
  font-style:italic;
  font-weight:440;
  color:var(--wine);
}
.hero-copy .lede{ margin:26px 0 0; max-width:48ch; }
.hero-ctas{
  display:flex; align-items:center; gap:18px; flex-wrap:wrap;
  margin-top:38px;
}
.hero-meta{
  display:flex; gap:22px; flex-wrap:wrap;
  margin-top:46px;
  padding-top:22px;
  border-top:1px solid var(--line);
}
.hero-meta span{
  font-family:var(--font-mono);
  font-size:0.72rem;
  letter-spacing:0.05em;
  color:var(--ink-soft);
  display:flex; align-items:center; gap:8px;
}
.hero-meta span::before{
  content:'';
  width:5px; height:5px; border-radius:50%;
  background:var(--sage-deep);
}

.hero-visual{
  position:relative;
  height:min(72vh, 640px);
  display:flex; align-items:center; justify-content:center;
}
.hero-visual .halo{
  position:absolute; inset:0;
  background: radial-gradient(circle at 50% 48%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 62%);
  z-index:0;
}
.hero-product{
  position:relative; z-index:2;
  max-width:86%;
  max-height:100%;
  width:auto;
  filter: drop-shadow(0 40px 60px rgba(76,18,38,0.22));
  -webkit-mask-image: radial-gradient(ellipse 78% 82% at 50% 50%, #000 62%, transparent 100%);
          mask-image: radial-gradient(ellipse 78% 82% at 50% 50%, #000 62%, transparent 100%);
  will-change:transform;
}
.bubble-field{
  position:absolute; inset:0; z-index:1; overflow:hidden; pointer-events:none;
}
.bubble{
  position:absolute;
  bottom:-40px;
  border-radius:50%;
  background:radial-gradient(circle at 32% 28%, rgba(255,255,255,0.9), rgba(255,255,255,0.08) 70%);
  border:1px solid rgba(255,255,255,0.5);
  opacity:0;
  animation:rise linear infinite;
}
@keyframes rise{
  0%{ opacity:0; transform:translateY(0) translateX(0) scale(0.6); }
  8%{ opacity:0.85; }
  92%{ opacity:0.5; }
  100%{ opacity:0; transform:translateY(-115vh) translateX(var(--drift,10px)) scale(1); }
}

.scroll-cue{
  position:absolute; bottom:34px; left:50%; transform:translateX(-50%);
  display:flex; flex-direction:column; align-items:center; gap:10px;
  z-index:3;
}
.scroll-cue .track{
  width:1px; height:44px;
  background:var(--line);
  position:relative; overflow:hidden;
}
.scroll-cue .track::after{
  content:'';
  position:absolute; left:0; top:-40%; width:100%; height:40%;
  background:var(--wine);
  animation:cue-drop 1.8s var(--ease-in-out) infinite;
}
@keyframes cue-drop{
  0%{ top:-40%; }
  60%{ top:100%; }
  100%{ top:100%; }
}
.scroll-cue span{
  font-family:var(--font-mono); font-size:0.65rem; letter-spacing:0.14em;
  text-transform:uppercase; color:var(--ink-soft);
}

@media (max-width:960px){
  .hero-grid{ grid-template-columns:1fr; }
  .hero-visual{ order:-1; height:46vh; margin-bottom:8px; }
  .hero{ padding-top:110px; }
}

/* ============================================================
   Section shell
   ============================================================ */
.section{ position:relative; padding:min(14vh,120px) 0; }
.section-head{
  display:flex; justify-content:space-between; align-items:flex-end; gap:40px;
  margin-bottom:64px;
  flex-wrap:wrap;
}
.section-head .h-section{ max-width:14ch; }
.section-head .lede{ margin:0; padding-bottom:6px; }
.section-num{
  font-family:var(--font-mono);
  font-size:0.72rem; color:var(--ink-soft);
}

/* ============================================================
   §01 Challenge
   ============================================================ */
.challenge{ background:var(--paper); }
.challenge-grid{
  display:grid; grid-template-columns: 0.85fr 1.15fr; gap:6vw; align-items:center;
}
.challenge-photo{
  position:relative;
  border-radius:22px;
  overflow:hidden;
  aspect-ratio:4/5;
  box-shadow:0 30px 60px -20px rgba(27,35,64,0.28);
}
.challenge-photo img{
  width:100%; height:100%; object-fit:cover;
  transform:scale(1.08);
  will-change:transform;
}
.challenge-photo .frame-tag{
  position:absolute; left:16px; bottom:16px;
  background:rgba(252,250,247,0.88);
  backdrop-filter:blur(8px);
  padding:8px 14px; border-radius:100px;
  font-family:var(--font-mono); font-size:0.65rem; letter-spacing:0.06em;
  color:var(--ink);
}
.challenge-copy .lede{ max-width:52ch; margin-top:20px; }
.stat-row{
  display:grid; grid-template-columns:repeat(3,1fr); gap:18px;
  margin-top:48px;
}
.stat-card{
  background:var(--paper-2);
  border:1px solid var(--line-soft);
  border-radius:16px;
  padding:22px 20px;
}
.stat-card .num{
  font-family:var(--font-display); font-weight:600; font-size:clamp(2.1rem,3.4vw,2.8rem);
  color:var(--wine); letter-spacing:-0.02em; line-height:1;
}
.stat-card .label{
  font-family:var(--font-mono); font-size:0.66rem; letter-spacing:0.07em; text-transform:uppercase;
  color:var(--ink); margin-top:12px; font-weight:500;
}
.stat-card .desc{
  font-size:0.88rem; color:var(--ink-soft); margin-top:8px; line-height:1.5;
}
@media (max-width:860px){
  .challenge-grid{ grid-template-columns:1fr; }
  .challenge-photo{ aspect-ratio:16/10; }
  .stat-row{ grid-template-columns:1fr; }
}

/* ============================================================
   §02 Formulation (pinned scrollytelling)
   ============================================================ */
.formulation{ background:var(--blush); }
.pin-wrapper{ position:relative; }
.pin-wrapper.is-pinned{ height:320vh; }
.pin-inner{
  display:flex; flex-direction:column; justify-content:center;
}
.pin-wrapper.is-pinned .pin-inner{
  position:sticky; top:0; height:100svh; min-height:640px;
}
.form-grid{
  display:grid; grid-template-columns:0.85fr 1.15fr; gap:4vw; align-items:center;
  width:100%;
}
.form-copy .lede{ margin-top:20px; }
.form-copy .mono-readout{
  margin-top:34px;
  font-family:var(--font-mono); font-size:0.78rem; color:var(--ink-soft);
  display:flex; align-items:center; gap:14px;
}
.form-copy .mono-readout .bar{
  width:120px; height:4px; background:var(--line); border-radius:4px; overflow:hidden;
}
.form-copy .mono-readout .bar > i{
  display:block; height:100%; width:0%; background:var(--wine); border-radius:4px;
}
.tablet-stage{
  position:relative;
  height:min(60vh,520px);
  display:flex; align-items:center; justify-content:center;
}
.tablet-core{
  position:relative; z-index:3;
  width:132px; height:132px; border-radius:50%;
  background:radial-gradient(circle at 34% 28%, #fff 0%, #f4eee6 45%, #e7ddd0 100%);
  box-shadow:0 24px 50px -14px rgba(76,18,38,0.35), inset 0 0 0 1px rgba(27,35,64,0.06);
  display:flex; align-items:center; justify-content:center;
  text-align:center;
  will-change:transform;
}
.tablet-core .inner{
  font-family:var(--font-mono); font-size:0.62rem; letter-spacing:0.05em; color:var(--wine);
  line-height:1.35; padding:10px;
}
.tablet-core .inner b{ display:block; font-size:1rem; color:var(--ink); font-family:var(--font-display); font-weight:600; }
.orbit-ring{
  position:absolute; z-index:1;
  width:min(72vw,440px); height:min(72vw,440px);
  border:1px dashed var(--line);
  border-radius:50%;
}
.orb{
  position:absolute; top:50%; left:50%; z-index:2;
  width:96px; margin:-48px 0 0 -48px;
  display:flex; flex-direction:column; align-items:center; gap:8px;
  opacity:0;
  will-change:transform, opacity;
}
.orb .dot{
  width:58px; height:58px; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  color:#fff; font-family:var(--font-display); font-weight:600; font-size:0.62rem; text-align:center;
  box-shadow:0 14px 26px -8px rgba(27,35,64,0.4);
  border:1px solid rgba(255,255,255,0.5);
}
.orb .name{ font-family:var(--font-mono); font-size:0.62rem; letter-spacing:0.04em; color:var(--ink); text-align:center; }
.orb .dose{ font-family:var(--font-mono); font-size:0.6rem; color:var(--ink-soft); }

@media (max-width:960px){
  .form-grid{ grid-template-columns:1fr; }
  .tablet-stage{ height:380px; margin-top:20px; }
  .form-copy .lede{max-width:none;}
}

/* ============================================================
   §03 Mechanism
   ============================================================ */
.mechanism{ background:var(--paper); }
.mech-head{ max-width:640px; margin:0 auto 20px; text-align:center; }
.mech-head .h-section{ max-width:none; margin:18px auto 0; }
.mech-stage{
  position:relative;
  height:min(78vh, 620px);
  display:flex; align-items:center; justify-content:center;
}
.mech-stage svg{ width:min(92vw,640px); height:auto; overflow:visible; }
.mech-path{ fill:none; stroke-width:1.6; stroke-linecap:round; }
.mech-node{
  position:absolute;
  left:calc(50% + var(--nx,0px));
  top:calc(50% + var(--ny,0px));
  width:198px;
  padding:16px 18px;
  background:var(--white);
  border:1px solid var(--line);
  border-radius:16px;
  box-shadow:0 20px 40px -18px rgba(27,35,64,0.25);
  opacity:0;
  transform:translateY(14px) scale(0.92);
  will-change:transform,opacity;
}
.mech-node .axis-dot{
  width:8px; height:8px; border-radius:50%; display:inline-block; margin-right:7px;
}
.mech-node .axis-name{
  font-family:var(--font-mono); font-size:0.66rem; letter-spacing:0.05em; text-transform:uppercase;
  display:flex; align-items:center; color:var(--ink);
}
.mech-node p{
  font-size:0.82rem; color:var(--ink-soft); margin:9px 0 0; line-height:1.5;
}
.mech-core{
  position:absolute; z-index:4;
  left:50%; top:50%;
  transform:translate(-50%,-50%);
  width:150px; height:150px; border-radius:50%;
  background:var(--ink);
  color:var(--paper);
  display:flex; align-items:center; justify-content:center; text-align:center;
  padding:14px;
}
.mech-core span{
  font-family:var(--font-mono); font-size:0.62rem; letter-spacing:0.05em; line-height:1.4;
}
.mech-para{
  max-width:640px; margin:44px auto 0; text-align:center;
}
.mech-legend{
  display:flex; justify-content:center; gap:26px; margin-top:8px; flex-wrap:wrap;
}
.mech-legend span{
  font-family:var(--font-mono); font-size:0.68rem; letter-spacing:0.04em; color:var(--ink-soft);
  display:flex; align-items:center; gap:7px;
}
.mech-legend i{ width:8px; height:8px; border-radius:50%; display:inline-block; }

@media (max-width:760px){
  .mech-stage{
    height:auto; min-height:0;
    flex-direction:column; align-items:stretch; gap:14px;
    padding:8px 0 4px;
  }
  .mech-stage svg{ display:none; }
  .mech-core{
    position:static; transform:none;
    width:130px; height:130px; margin:0 auto 4px;
  }
  .mech-node{
    position:static;
    width:100%; max-width:400px; margin:0 auto;
    opacity:1; transform:none;
  }
}

/* ============================================================
   §04 Ingredient carousel
   ============================================================ */
.ingredients{ background:var(--blush); }
.carousel{ margin-top:8px; }
.carousel-viewport{
  overflow:hidden;
  cursor:grab;
  padding:0 var(--edge);
}
.carousel-viewport.grabbing{ cursor:grabbing; }
.carousel-track{
  display:flex;
  gap:22px;
  will-change:transform;
  padding-bottom:6px;
}
.ing-card{
  flex:0 0 340px;
  background:var(--paper);
  border:1px solid var(--line);
  border-radius:20px;
  padding:28px 26px 26px;
  user-select:none;
  -webkit-user-select:none;
  display:flex; flex-direction:column;
}
.ing-card .top-row{
  display:flex; align-items:center; justify-content:space-between;
}
.ing-card .axis-chip{
  display:inline-flex; align-items:center; gap:7px;
  font-family:var(--font-mono); font-size:0.62rem; letter-spacing:0.05em; text-transform:uppercase;
  padding:6px 11px; border-radius:100px; background:var(--paper-2); color:var(--ink);
}
.ing-card .axis-chip i{ width:7px; height:7px; border-radius:50%; display:inline-block; }
.ing-card .dose{
  font-family:var(--font-mono); font-size:0.72rem; color:var(--ink-soft);
}
.ing-card h3{
  font-family:var(--font-display); font-weight:600; font-size:1.7rem; letter-spacing:-0.01em;
  margin:20px 0 0;
}
.ing-card .field{ margin-top:16px; }
.ing-card .field .k{
  font-family:var(--font-mono); font-size:0.6rem; letter-spacing:0.08em; text-transform:uppercase; color:var(--taupe);
}
.ing-card .field .v{
  font-size:0.86rem; color:var(--ink); margin-top:4px; line-height:1.5;
}
.ing-card .mech-text{
  font-size:0.88rem; color:var(--ink-soft); line-height:1.55; margin-top:16px;
  padding-top:16px; border-top:1px solid var(--line-soft);
}
.ing-card .evidence{
  margin-top:auto;
  padding-top:16px;
  font-size:0.78rem; color:var(--sage-deep);
  display:flex; gap:8px;
}

.carousel-controls{
  display:flex; align-items:center; justify-content:space-between;
  margin-top:30px;
}
.car-btn{
  width:46px; height:46px; border-radius:50%;
  border:1px solid var(--ink);
  background:transparent;
  display:flex; align-items:center; justify-content:center;
  cursor:pointer;
  transition:background .2s ease-out, color .2s ease-out, transform .1s ease-out;
}
.car-btn:hover{ background:var(--ink); color:var(--paper); }
.car-btn:active{ transform:scale(0.9); }
.car-btn svg{ width:16px; height:16px; }
.car-dots{ display:flex; gap:9px; }
.car-dots button{
  width:7px; height:7px; border-radius:50%; border:none; padding:0;
  background:var(--line);
  cursor:pointer;
  transition:background .25s ease-out, width .25s ease-out;
}
.car-dots button.active{ background:var(--wine); width:22px; border-radius:5px; }

/* ============================================================
   §05 Differentiator
   ============================================================ */
.difference{ background:var(--ink); color:var(--paper); overflow:hidden; }
.diff-grid{
  display:grid; grid-template-columns:1fr 1fr; gap:6vw; align-items:center;
}
.difference .lede{ color:rgba(252,250,247,0.68); }
.diff-copy .h-section{ color:var(--paper); margin-top:16px; }
.receptor-art{
  position:relative; height:380px;
}
.receptor-art .cap{
  position:absolute;
  border-radius:100px;
  transform-origin:50% 100%;
  opacity:0;
  transform:scaleY(0.15);
  transition:opacity .6s var(--ease-out), transform .7s var(--ease-out), filter .3s var(--ease-out);
  will-change:transform;
}
.receptor-art.is-visible .cap{ opacity:1; transform:scaleY(1); }
.receptor-art.is-visible .cap-gpcr{ transition-delay:.05s; }
.receptor-art.is-visible .cap-ion{ transition-delay:.22s; }
.receptor-art.is-visible .cap-rtk{ transition-delay:.39s; }
.receptor-art .cap:hover{ filter:brightness(1.16); }
.receptor-art .cap:hover .ligand{ transform:translateY(-9px) scale(1.25); }

.cap-gpcr{
  width:56px; height:170px; left:14%; top:18%;
  background:linear-gradient(180deg,#5B8DEF,#3C63C7);
  box-shadow:0 30px 50px -18px rgba(60,99,199,0.55);
}
.cap-ion{
  width:44px; height:150px; left:48%; top:8%;
  background:linear-gradient(180deg,#E85D6B,#B8324A);
  box-shadow:0 30px 50px -18px rgba(184,50,74,0.5);
}
.cap-rtk{
  width:40px; height:130px; left:74%; top:26%;
  background:linear-gradient(180deg,#E0A94D,#B96A16);
  box-shadow:0 30px 50px -18px rgba(185,106,22,0.5);
}

/* ligand dot docked at each receptor tip, idle bob, so the scene stays alive after entrance */
.cap .ligand{
  position:absolute; left:50%; top:-13px;
  width:15px; height:15px; margin-left:-7.5px;
  border-radius:50%;
  box-shadow:0 0 0 5px rgba(252,250,247,0.07);
  opacity:0;
  animation:ligand-float 3.2s ease-in-out infinite;
  animation-play-state:paused;
  transition:transform .3s var(--ease-out);
}
.receptor-art.is-visible .cap .ligand{ opacity:1; animation-play-state:running; }
.cap-gpcr .ligand{ background:#A6C2FF; animation-delay:.5s; }
.cap-ion .ligand{ background:#FFB6BE; animation-delay:1.1s; }
.cap-rtk .ligand{ background:#F7D592; animation-delay:1.7s; }
@keyframes ligand-float{
  0%,100%{ transform:translateY(0); }
  50%{ transform:translateY(-7px); }
}

/* downstream signal pulsing into the cell each time a receptor fires */
.cap .signal{
  position:absolute; left:50%; bottom:-5px;
  width:11px; height:11px; margin-left:-5.5px;
  border-radius:50%;
  opacity:0;
  animation:signal-pulse 2.8s ease-out infinite;
  animation-play-state:paused;
}
.receptor-art.is-visible .cap .signal{ animation-play-state:running; }
.cap-gpcr .signal{ background:#5B8DEF; animation-delay:1s; }
.cap-ion .signal{ background:#E85D6B; animation-delay:1.6s; }
.cap-rtk .signal{ background:#E0A94D; animation-delay:2.2s; }
@keyframes signal-pulse{
  0%{ opacity:0; transform:scale(0.4) translateY(0); }
  28%{ opacity:0.6; }
  100%{ opacity:0; transform:scale(2.4) translateY(12px); }
}

.receptor-art .lbl{
  position:absolute;
  font-family:var(--font-mono); font-size:0.62rem; letter-spacing:0.08em; text-transform:uppercase;
  color:rgba(252,250,247,0.55);
  opacity:0;
  transition:opacity .5s var(--ease-out) .55s;
}
.receptor-art.is-visible .lbl{ opacity:1; }
.receptor-art .membrane{
  position:absolute; left:0; right:0; bottom:64px; height:2px;
  background:repeating-linear-gradient(90deg, rgba(252,250,247,0.3) 0 6px, transparent 6px 12px);
  transform:scaleX(0);
  transform-origin:0 50%;
  transition:transform .8s var(--ease-out);
}
.receptor-art.is-visible .membrane{ transform:scaleX(1); }
.diff-metrics{
  display:grid; gap:14px; margin-top:40px;
}
.diff-metric{
  display:flex; align-items:center; gap:18px;
  padding:18px 20px;
  border:1px solid rgba(252,250,247,0.14);
  border-radius:14px;
  background:rgba(252,250,247,0.03);
}
.diff-metric .arrow{
  font-family:var(--font-display); font-size:1.6rem; font-weight:600;
  color:var(--sage-bg);
  width:34px; text-align:center; flex-shrink:0;
}
.diff-metric.up .arrow{ color:var(--citrus-light); }
.diff-metric h4{ margin:0; font-family:var(--font-body); font-weight:600; font-size:0.96rem; }
.diff-metric p{ margin:4px 0 0; font-size:0.85rem; color:rgba(252,250,247,0.6); }

@media (max-width:900px){
  .diff-grid{ grid-template-columns:1fr; }
  .receptor-art{ order:-1; height:260px; }
}

/* ============================================================
   §06 Delivery (full bleed image)
   ============================================================ */
.delivery{
  position:relative;
  color:var(--paper);
  padding:0;
  overflow:hidden;
  min-height:100vh;
  display:flex; align-items:center;
}
.delivery-bg{
  position:absolute; inset:-8% -2%;
  z-index:0;
}
.delivery-bg img{
  width:100%; height:100%; object-fit:cover;
  will-change:transform;
}
.delivery-scrim{
  position:absolute; inset:0; z-index:1;
  background:
    linear-gradient(90deg, rgba(20,10,16,0.82) 0%, rgba(20,10,16,0.55) 46%, rgba(20,10,16,0.28) 75%, rgba(20,10,16,0.15) 100%),
    linear-gradient(180deg, rgba(20,10,16,0.25), rgba(20,10,16,0.55));
}
.delivery-content{
  position:relative; z-index:2;
  padding-top:min(16vh,140px); padding-bottom:min(16vh,140px);
  width:100%;
}
.delivery .eyebrow{ color:var(--sage-bg); }
.delivery .eyebrow::before{ background:var(--sage-bg); }
.delivery .h-section{ color:var(--white); margin-top:16px; max-width:15ch; }
.delivery-sub{
  font-family:var(--font-mono); font-size:0.75rem; letter-spacing:0.06em; text-transform:uppercase;
  color:rgba(252,250,247,0.6); margin-top:28px;
}
.delivery-list{
  list-style:none; margin:18px 0 0; padding:0;
  display:grid; gap:20px;
  max-width:520px;
}
.delivery-list li{
  display:flex; gap:16px; align-items:flex-start;
  padding-bottom:18px; border-bottom:1px solid rgba(252,250,247,0.16);
}
.delivery-list li:last-child{ border-bottom:none; padding-bottom:0; }
.delivery-list .check{
  width:22px; height:22px; border-radius:50%; flex-shrink:0; margin-top:2px;
  background:rgba(207,232,222,0.16); border:1px solid rgba(207,232,222,0.5);
  display:flex; align-items:center; justify-content:center;
}
.delivery-list .check svg{ width:11px; height:11px; }
.delivery-list h4{ margin:0; font-size:1.02rem; font-weight:600; }
.delivery-list p{ margin:5px 0 0; font-size:0.88rem; color:rgba(252,250,247,0.7); max-width:44ch; }

.delivery .bubble-field .bubble{
  border-color:rgba(255,255,255,0.35);
}

/* ============================================================
   §07 Summary
   ============================================================ */
.summary{ background:var(--paper); }
.summary-grid{
  display:grid; grid-template-columns:repeat(4,1fr); gap:1px;
  background:var(--line);
  border:1px solid var(--line);
  border-radius:20px;
  overflow:hidden;
  margin-top:64px;
}
.summary-cell{
  background:var(--paper);
  padding:40px 26px;
  text-align:left;
}
.summary-cell .num{
  font-family:var(--font-display); font-weight:600;
  font-size:clamp(2.6rem,4.6vw,3.6rem);
  color:var(--wine);
  letter-spacing:-0.02em; line-height:1;
}
.summary-cell .label{
  font-family:var(--font-mono); font-size:0.68rem; letter-spacing:0.06em; text-transform:uppercase;
  margin-top:14px; color:var(--ink);
}
.summary-cell .desc{
  font-size:0.82rem; color:var(--ink-soft); margin-top:6px;
}
.footnote{
  margin-top:52px; padding-top:26px; border-top:1px solid var(--line);
  font-family:var(--font-mono); font-size:0.78rem; color:var(--ink-soft); max-width:70ch; line-height:1.7;
}
@media (max-width:860px){
  .summary-grid{ grid-template-columns:repeat(2,1fr); }
}

/* ============================================================
   Footer
   ============================================================ */
./* footer removed */
.footer-top{
  display:flex; justify-content:space-between; align-items:flex-end; gap:40px; flex-wrap:wrap;
  padding-bottom:56px; border-bottom:1px solid rgba(252,250,247,0.14);
}
.footer-mark{
  font-family:var(--font-display); font-style:italic; font-weight:440;
  font-size:clamp(2.2rem,5vw,3.6rem);
  letter-spacing:-0.01em;
}
.footer-tag{
  font-family:var(--font-mono); font-size:0.75rem; letter-spacing:0.05em; text-transform:uppercase;
  color:rgba(252,250,247,0.55); margin-top:10px;
}
.footer-links{
  display:flex; gap:26px; list-style:none; margin:0; padding:0; flex-wrap:wrap;
}
.footer-links a{
  font-family:var(--font-mono); font-size:0.72rem; letter-spacing:0.05em; text-transform:uppercase;
  text-decoration:none; color:rgba(252,250,247,0.72);
}
.footer-links a:hover{ color:var(--white); }
.footer-bottom{
  display:flex; justify-content:space-between; gap:20px; flex-wrap:wrap;
  padding-top:28px;
  font-family:var(--font-mono); font-size:0.7rem; color:rgba(252,250,247,0.45);
}
.footer-bottom p{ max-width:62ch; margin:0; line-height:1.6; }

/* ============================================================
   Reduced motion
   ============================================================ */
@media (prefers-reduced-motion: reduce){
  *{ animation-duration:0.001ms !important; animation-iteration-count:1 !important; transition-duration:0.001ms !important; }
  
}
`}</style>
        

<div id="progressBar"></div>



<main>

  {/* ============ HERO ============ */}
  <section className="hero" id="hero">
    <div className="wrap hero-grid">
      <div className="hero-copy">
        
        <h1 className="h-display hero-title">
          NOVOLACT ON
        </h1>
        <p className="lede">A scientifically formulated effervescent tablet combining five evidence-backed galactagogues. Each ingredient acts through a distinct receptor pathway to support prolactin, oxytocin, and healthy mammary tissue function.</p>
        
        <div className="hero-meta">
          <span>15 Effervescent Tablets</span>
          <span>Ginger · Lemon · Mint</span>
          <span>One Tablet Daily</span>
        </div>
      </div>
      <div className="hero-visual">
        <div className="halo"></div>
        <div className="bubble-field" id="heroBubbles"></div>
        <img className="hero-product" id="heroProduct" src="/Novolact-ON.png" alt="NOVOLACT-ON effervescent tablet tube and carton, for breastfeeding mothers, 15 effervescent tablets, ginger lemon and mint flavor" />
      </div>
    </div>
    
  </section>

  {/* ============ 01 CHALLENGE ============ */}
  <section className="section challenge" id="challenge">
    <div className="wrap">
      <div className="section-head reveal">
        <div>
          
          <h2 className="h-section" style={{"marginTop":"16px","maxWidth":"16ch"}}>Lactation Insufficiency: A Persistent Clinical Gap</h2>
        </div>
      </div>

      <div className="challenge-grid">
        <div className="challenge-photo reveal">
          <img id="babyImg" src="/novolact_extracted_2.jpg" alt="Sleeping newborn resting against a parent, close up" />
          <span className="frame-tag">For breastfeeding mothers</span>
        </div>
        <div className="challenge-copy">
          <p className="lede reveal">Despite strong intent to breastfeed, many postpartum mothers experience inadequate milk supply, driven by complex physiological, psychological, and lifestyle factors.</p>
          <div className="stat-row">
            <div className="stat-card reveal">
              <div className="num" data-count="25" data-suffix="%">0%</div>
              <div className="label">Delayed Lactogenesis</div>
              <div className="desc">Affects up to 25% of postpartum patients.</div>
            </div>
            <div className="stat-card reveal">
              <div className="num">#1</div>
              <div className="label">Early Cessation</div>
              <div className="desc">Perceived low supply is the leading reason for discontinuation.</div>
            </div>
            <div className="stat-card reveal">
              <div className="num" style={{"fontSize":"clamp(1.6rem,2.6vw,2.1rem)"}}>Few</div>
              <div className="label">Limited Options</div>
              <div className="desc">Few clinically validated, well‑tolerated galactagogues exist.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* ============ 02 FORMULATION (pinned) ============ */}
  <section className="section formulation" id="formulation">
    <div className="pin-wrapper" id="formPin">
      <div className="pin-inner">
        <div className="wrap form-grid">
          <div className="form-copy">
            
            <h2 className="h-section" style={{"marginTop":"16px"}}>Five Ingredients. One Tablet. One Purpose.</h2>
            <p className="lede">NOVOLACT-ON delivers a precise, standardized dose of five galactagogues in a single effervescent tablet, flavored with ginger, lemon and mint.</p>
            <div className="mono-readout">
              <span>Assembling formula</span>
              <span className="bar"><i id="formBar"></i></span>
              <span id="formPct">0%</span>
            </div>
          </div>
          <div className="tablet-stage" id="tabletStage">
            <div className="orbit-ring"></div>
            <div className="tablet-core">
              <div className="inner"><b>1,200 mg</b>standardized actives</div>
            </div>
            <div className="orb" data-angle="-90" data-color="wine"><span className="dot" style={{"background":"var(--wine)"}}>SILY</span><span className="name">Silymarin</span><span className="dose">250 mg</span></div>
            <div className="orb" data-angle="-18" data-color="wine2"><span className="dot" style={{"background":"#B5566E"}}>SHAT</span><span className="name">Shatavari</span><span className="dose">200 mg</span></div>
            <div className="orb" data-angle="54" data-color="citrus"><span className="dot" style={{"background":"var(--citrus)"}}>FENU</span><span className="name">Fenugreek</span><span className="dose">250 mg</span></div>
            <div className="orb" data-angle="126" data-color="citrus2"><span className="dot" style={{"background":"#E0A94D"}}>FENN</span><span className="name">Fennel</span><span className="dose">250 mg</span></div>
            <div className="orb" data-angle="198" data-color="sage"><span className="dot" style={{"background":"var(--sage-deep)"}}>MOR</span><span className="name">Moringa</span><span className="dose">250 mg</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* ============ 03 MECHANISM (pinned) ============ */}
  <section className="section mechanism" id="mechanism">
    <div className="wrap mech-head">
      
      <h2 className="h-section">The Prolactin–Oxytocin–Mammary Axis</h2>
    </div>
    <div className="pin-wrapper" id="mechPin">
      <div className="pin-inner">
        <div className="wrap">
          <div className="mech-stage" id="mechStage">
            <svg viewBox="0 0 600 560" preserveAspectRatio="xMidYMid meet" aria-hidden={true}>
              <path id="pathProlactin" className="mech-path" d="M300,290 Q190,220 130,150" stroke="#8A2846" pathLength="1"  />
              <path id="pathOxytocin" className="mech-path" d="M300,290 Q410,220 470,150" stroke="#B96A16" pathLength="1"  />
              <path id="pathMammary" className="mech-path" d="M300,290 Q300,390 300,460" stroke="#3F8F6C" pathLength="1"  />
            </svg>
            <div className="mech-core"><span>Three‑Axis<br />Galactagogue<br />Mechanism</span></div>
            <div className="mech-node" id="nodeProlactin" style={{"left": "calc(50% - 320px)", "top": "calc(50% - 220px)"} as any}>
              <div className="axis-name"><i className="axis-dot" style={{"background":"#8A2846"}}></i>Prolactin Axis</div>
              <p>Silymarin &amp; Shatavari stimulate pituitary prolactin release via dopaminergic and phytoestrogen pathways.</p>
            </div>
            <div className="mech-node" id="nodeOxytocin" style={{"left": "calc(50% + 122px)", "top": "calc(50% - 220px)"} as any}>
              <div className="axis-name"><i className="axis-dot" style={{"background":"#B96A16"}}></i>Oxytocin Axis</div>
              <p>Fenugreek &amp; Fennel enhance the oxytocin-mediated milk ejection reflex.</p>
            </div>
            <div className="mech-node" id="nodeMammary" style={{"left": "calc(50% - 99px)", "top": "calc(50% + 116px)"} as any}>
              <div className="axis-name"><i className="axis-dot" style={{"background":"#3F8F6C"}}></i>Mammary Tissue Axis</div>
              <p>Moringa supports alveolar cell proliferation and milk synthesis.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="wrap">
      <div className="mech-para reveal">
        <p className="lede" style={{"margin":"0 auto","textAlign":"center"}}>Each ingredient in NOVOLACT-ON maps to a distinct axis, creating complementary, non-redundant pharmacological coverage. Targeting all three systems simultaneously instead of a single pathway creates a more comprehensive and meaningful clinical outcome across diverse patient profiles.</p>
        
      </div>
    </div>
  </section>

  {/* ============ 04 INGREDIENTS (carousel) ============ */}
  <section className="section ingredients" id="ingredients">
    <div className="wrap">
      <div className="section-head reveal">
        <div>
          
          <h2 className="h-section" style={{"marginTop":"16px","maxWidth":"14ch"}}>Five Actives, Five Pathways</h2>
        </div>
        <p className="lede">Drag, swipe, or use the controls, each card is a spec sheet for a single active, mapped to its receptor pathway and clinical evidence.</p>
      </div>
    </div>

    <div className="carousel reveal">
      <div className="carousel-viewport" id="carViewport">
        <div className="carousel-track" id="carTrack">

          <article className="ing-card" data-index="0">
            <div className="top-row"><span className="axis-chip"><i style={{"background":"#8A2846"}}></i>Prolactin</span><span className="dose">250 mg</span></div>
            <h3>Silymarin</h3>
            <div className="field"><div className="k">Receptor / Pathway</div><div className="v">Hepatic hormone metabolism support + mild estrogenic activity</div></div>
            <div className="field"><div className="k">Physiological Target</div><div className="v">Systemic hormone clearance/balance; antioxidant protection of mammary tissue</div></div>
            <p className="mech-text">Phytoestrogen-rich adaptogen that stimulates prolactin secretion via estrogen receptor modulation.</p>
            <div className="evidence">Supported by clinical literature and modern trials on galactagogue efficacy and safety.</div>
          </article>

          <article className="ing-card" data-index="1">
            <div className="top-row"><span className="axis-chip"><i style={{"background":"#B5566E"}}></i>Prolactin</span><span className="dose">200 mg</span></div>
            <h3>Shatavari</h3>
            <div className="field"><div className="k">Receptor / Pathway</div><div className="v">Steroidal saponins (shatavarin) → estrogen receptor binding</div></div>
            <div className="field"><div className="k">Physiological Target</div><div className="v">Direct mammary ductal / alveolar tissue proliferation</div></div>
            <p className="mech-text">Modulates dopaminergic tone at the pituitary, indirectly elevating serum prolactin; hepatoprotective properties support metabolic clearance.</p>
            <div className="evidence">Multiple RCTs show significant milk-volume increases vs. placebo in postpartum women.</div>
          </article>

          <article className="ing-card" data-index="2">
            <div className="top-row"><span className="axis-chip"><i style={{"background":"#3F8F6C"}}></i>Mammary Tissue</span><span className="dose">250 mg</span></div>
            <h3>Moringa</h3>
            <div className="field"><div className="k">Receptor / Pathway</div><div className="v">Phytosterols → mammary secretory cell activation</div></div>
            <div className="field"><div className="k">Physiological Target</div><div className="v">Direct alveolar epithelial stimulation</div></div>
            <p className="mech-text">Rich in iron, calcium and amino acids; supports alveolar cell proliferation and supplies micronutrients critical for milk synthesis.</p>
            <div className="evidence">Clinical trials show earlier onset of lactogenesis II.</div>
          </article>

          <article className="ing-card" data-index="3">
            <div className="top-row"><span className="axis-chip"><i style={{"background":"#B96A16"}}></i>Oxytocin</span><span className="dose">250 mg</span></div>
            <h3>Fenugreek</h3>
            <div className="field"><div className="k">Receptor / Pathway</div><div className="v">Diosgenin (phytoestrogen) + insulin/IGF-1 axis modulation</div></div>
            <div className="field"><div className="k">Physiological Target</div><div className="v">Metabolic support for milk-synthesis substrate availability</div></div>
            <p className="mech-text">Trigonelline-rich seed acts via cholinergic pathways to enhance the oxytocin-mediated milk ejection reflex.</p>
            <div className="evidence">The most extensively studied herbal galactagogue, with consistent volume outcomes.</div>
          </article>

          <article className="ing-card" data-index="4">
            <div className="top-row"><span className="axis-chip"><i style={{"background":"#E0A94D"}}></i>Oxytocin</span><span className="dose">250 mg</span></div>
            <h3>Fennel</h3>
            <div className="field"><div className="k">Receptor / Pathway</div><div className="v">Trans-anethole → dopamine receptor antagonism</div></div>
            <div className="field"><div className="k">Physiological Target</div><div className="v">Prolactin disinhibition; smooth-muscle contraction in the mammary ductal system</div></div>
            <p className="mech-text">Anethole-rich phytoestrogen that potentiates prolactin release and facilitates milk flow.</p>
            <div className="evidence">Dopamine antagonism relieves the natural suppression of prolactin.</div>
          </article>

          <article className="ing-card" data-index="5">
            <div className="top-row"><span className="axis-chip"><i style={{"background":"#8C8375"}}></i>Flavor Layer</span><span className="dose">Trace</span></div>
            <h3>Ginger</h3>
            <div className="field"><div className="k">Receptor / Pathway</div><div className="v">Gingerols → vasodilation + mild prolactin elevation</div></div>
            <div className="field"><div className="k">Physiological Target</div><div className="v">Enhanced mammary blood flow; supports nutrient delivery to secretory tissue</div></div>
            <p className="mech-text">Included as part of the ginger, lemon &amp; mint flavor system, masking herbal bitterness while contributing its own mild galactagogic effect.</p>
            <div className="evidence">Complements the five-active core without adding receptor redundancy.</div>
          </article>

        </div>
      </div>
      <div className="wrap carousel-controls">
        <button className="car-btn" id="carPrev" aria-label="Previous ingredient"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg></button>
        <div className="car-dots" id="carDots"></div>
        <button className="car-btn" id="carNext" aria-label="Next ingredient"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></button>
      </div>
    </div>
  </section>

  

  {/* ============ 06 DELIVERY ============ */}
  <section className="section delivery" id="delivery">
    <div className="delivery-bg"><img id="glassImg" src="/novolact_extracted_3.jpg" alt="Effervescent tablet dissolving in a glass of water with lemon" /></div>
    <div className="delivery-scrim"></div>
    <div className="bubble-field" id="deliveryBubbles"></div>
    <div className="wrap delivery-content">
      
      <h2 className="h-section reveal">Effervescent Delivery: Designed for Adherence</h2>
      <p className="delivery-sub reveal">Why effervescent?</p>
      <ul className="delivery-list stagger">
        <li className="reveal" style={{"-I":"0".replace("-I", "--I")} as any}>
          <span className="check"><svg viewBox="0 0 24 24" fill="none" stroke="#CFE8DE" strokeWidth="2.4"><path d="M20 6L9 17l-5-5"/></svg></span>
          <div><h4>Rapid dissolution</h4><p>Faster absorption vs. conventional tablets.</p></div>
        </li>
        <li className="reveal" style={{"-I":"1".replace("-I", "--I")} as any}>
          <span className="check"><svg viewBox="0 0 24 24" fill="none" stroke="#CFE8DE" strokeWidth="2.4"><path d="M20 6L9 17l-5-5"/></svg></span>
          <div><h4>Improved palatability</h4><p>Ginger, lemon &amp; mint flavor mask herbal bitterness.</p></div>
        </li>
        <li className="reveal" style={{"-I":"2".replace("-I", "--I")} as any}>
          <span className="check"><svg viewBox="0 0 24 24" fill="none" stroke="#CFE8DE" strokeWidth="2.4"><path d="M20 6L9 17l-5-5"/></svg></span>
          <div><h4>Reduced GI burden</h4><p>Pre-dissolved form is gentler on the postpartum digestive system.</p></div>
        </li>
        <li className="reveal" style={{"-I":"3".replace("-I", "--I")} as any}>
          <span className="check"><svg viewBox="0 0 24 24" fill="none" stroke="#CFE8DE" strokeWidth="2.4"><path d="M20 6L9 17l-5-5"/></svg></span>
          <div><h4>Dosing simplicity</h4><p>One tablet daily supports consistent adherence.</p></div>
        </li>
      </ul>
    </div>
  </section>

  {/* ============ 07 SUMMARY ============ */}
  <section className="section summary" id="summary">
    <div className="wrap">
      <div className="section-head reveal">
        <div>
          
          <h2 className="h-section" style={{"marginTop":"16px","maxWidth":"16ch"}}>The Multi-Mechanistic Choice</h2>
        </div>
      </div>
      <div className="summary-grid stagger">
        <div className="summary-cell reveal" style={{"-I":"0".replace("-I", "--I")} as any}><div className="num" data-count="5">0</div><div className="label">Active Ingredients</div><div className="desc">Standardized, evidence-backed doses.</div></div>
        <div className="summary-cell reveal" style={{"-I":"1".replace("-I", "--I")} as any}><div className="num" data-count="3">0</div><div className="label">Axes Covered</div><div className="desc">Prolactin · Oxytocin · Mammary Tissue.</div></div>
        <div className="summary-cell reveal" style={{"-I":"2".replace("-I", "--I")} as any}><div className="num" data-count="0">0</div><div className="label">Receptor Overlap</div><div className="desc">Minimizes additive toxicity risk.</div></div>
        <div className="summary-cell reveal" style={{"-I":"3".replace("-I", "--I")} as any}><div className="num" data-count="1">0</div><div className="label">Tablet Daily</div><div className="desc">Effervescent, palatable, adherent.</div></div>
      </div>
      
    </div>
  </section>

</main>




      </div>
      <Footer />
    </>
  );
};

export default NovolactOnDetailPage;
