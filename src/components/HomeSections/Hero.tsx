import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ─── Cycling word ─────────────────────────────────────────────────────────────
const WORDS = ["éclatante", "saine", "protégée", "rayonnante"];

function CyclingWord() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      const t = setTimeout(() => {
        setIndex(i => (i + 1) % WORDS.length);
        setVisible(true);
      }, 350);
      return () => clearTimeout(t);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`hero-word ${visible ? "hero-word--in" : "hero-word--out"}`}>
      {WORDS[index]}
    </span>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/*
        ── PERFORMANCE NOTES ──────────────────────────────────────────────────
        1. All hover states handled with CSS :hover — zero JS re-renders.
        2. `loaded` state only flips once (false → true). After that, no re-renders
           from this component, ever.
        3. Google Fonts loaded via <link> in your HTML <head> instead of @import
           (avoids render-blocking). Add this to index.html:
           <link rel="preconnect" href="https://fonts.googleapis.com" />
           <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
           <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
        4. backdrop-filter removed from decorative elements — kept only where it matters.
        5. Grain overlay replaced with a static SVG (no animation).
        6. will-change: transform only on the two actually-animating leaves.
        7. Overlay layers merged from 3 divs → 1 div with a single composite gradient.
        ───────────────────────────────────────────────────────────────────────
      */}
      <style>{`
        /* ── Animations ─────────────────────────────── */
        @keyframes float-slow {
          0%, 100% { transform: translateY(0)   rotate(0deg); }
          50%       { transform: translateY(-14px) rotate(6deg); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0)  rotate(0deg); }
          50%       { transform: translateY(-8px) rotate(-4deg); }
        }
        @keyframes scrollDot {
          0%   { transform: translateY(0);    opacity: 1; }
          80%  { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0);    opacity: 0; }
        }
        @keyframes heroReveal {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Cycling word ───────────────────────────── */
        .hero-word {
          color: #fff;
          font-style: italic;
          display: inline-block;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .hero-word--in  { opacity: 1; transform: translateY(0); }
        .hero-word--out { opacity: 0; transform: translateY(-8px); }

        /* ── Section ────────────────────────────────── */
        .hero-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 120px 24px 100px;
          overflow: hidden;
        }

        /* ── Background image ───────────────────────── */
        /* Using CSS background with filter on a pseudo-element keeps the
           image layer separate from the content layer — GPU-composited. */
        .hero-bg {
          position: absolute;
          inset: 0;
          background-image: url('/img/bg.jpg');
          background-size: cover;
          background-position: center;
          filter: blur(3px);
          transform: scale(1.05);
          z-index: 0;
        }

        /* ── Overlay (3 divs → 1) ───────────────────── */
        /* Combined the navy base, gradient, and vignette into one layer.
           Fewer DOM nodes = fewer composite layers for the browser. */
        .hero-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at center, transparent 40%, rgba(26,31,46,0.45) 100%),
            linear-gradient(135deg, rgba(45,89,134,0.33) 0%, transparent 50%, rgba(74,144,196,0.19) 100%),
            rgba(45,89,134,0.69);
          z-index: 1;
        }

        /* ── Static grain (no animation = 0 CPU cost) ── */
        .hero-grain {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.028'/%3E%3C/svg%3E");
          opacity: 0.6;
          pointer-events: none;
          z-index: 3;
        }

        /* ── Floating leaves ─────────────────────────── */
        /* will-change only on the elements actually animating */
        .h-leaf-circle {
          position: absolute;
          top: 12%; right: 8%;
          z-index: 2;
          width: 100px; height: 100px;
          border-radius: 50%;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.20);
          display: flex; align-items: center; justify-content: center;
          animation: float-slow 6s ease-in-out infinite;
          will-change: transform;
        }
        .h-leaf-square {
          position: absolute;
          bottom: 18%; left: 7%;
          z-index: 2;
          width: 72px; height: 72px;
          border-radius: 10px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.18);
          display: flex; align-items: center; justify-content: center;
          transform: rotate(10deg);
          animation: float-slower 8s ease-in-out infinite 1.2s;
          will-change: transform;
        }
        /* Static decorative leaves — no animation, no will-change */
        .h-leaf-static-tl {
          position: absolute;
          top: 22%; left: 4%;
          z-index: 2;
          color: rgba(255,255,255,0.10);
          pointer-events: none;
        }
        .h-leaf-static-br {
          position: absolute;
          bottom: 22%; right: 5%;
          z-index: 2;
          color: rgba(255,255,255,0.10);
          transform: rotate(180deg);
          pointer-events: none;
        }

        /* ── Content ─────────────────────────────────── */
        .hero-content {
          position: relative;
          z-index: 4;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 760px;
          width: 100%;
        }

        /* ── Reveal animations (CSS, not JS style objects) ── */
        /* Each child gets animation-delay via a utility class.
           No JS style recalculation on every render. */
        .hero-reveal {
          opacity: 0;
          animation: heroReveal 0.7s ease forwards;
        }
        .hero-reveal.loaded { animation-play-state: running; }

        .hero-d1  { animation-delay: 80ms; }
        .hero-d2  { animation-delay: 180ms; }
        .hero-d3  { animation-delay: 260ms; }
        .hero-d4  { animation-delay: 320ms; }
        .hero-d5  { animation-delay: 400ms; }
        .hero-d6  { animation-delay: 480ms; }

        /* Pause all animations until loaded fires */
        .hero-reveal:not(.loaded) { animation-play-state: paused; }

        /* ── Label pill ──────────────────────────────── */
        .hero-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 14px;
          border-radius: 4px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.25);
          margin-bottom: 32px;
        }
        .hero-label span {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          color: rgba(255,255,255,0.85);
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        /* ── Headline ────────────────────────────────── */
        .hero-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 6.5vw, 5rem);
          font-weight: 400;
          color: #fff;
          line-height: 1.12;
          margin: 0 0 28px;
          text-shadow: 0 2px 24px rgba(26,31,46,0.3);
        }

        /* ── Ornament ────────────────────────────────── */
        .hero-ornament {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
        }
        .hero-ornament-line {
          width: 48px; height: 1px;
          background: rgba(255,255,255,0.3);
        }

        /* ── Subtitle ────────────────────────────────── */
        .hero-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem;
          line-height: 1.8;
          color: rgba(255,255,255,0.78);
          max-width: 500px;
          margin: 0 0 40px;
        }

        /* ── CTA row ─────────────────────────────────── */
        .hero-cta-row {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 48px;
          width: 100%;
        }

        /* Primary CTA — hover via CSS only */
        .hero-cta-primary {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          padding: 13px 30px;
          border-radius: 6px;
          border: 1px solid rgba(74,144,196,0.56);
          background: #2D5986;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(26,58,92,0.35);
          transition: background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
        }
        .hero-cta-primary:hover {
          background: #4A90C4;
          border-color: #4A90C4;
          box-shadow: 0 6px 28px rgba(74,144,196,0.45);
        }

        /* Ghost CTA */
        .hero-cta-ghost {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          padding: 13px 30px;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.10);
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
          text-decoration: none;
          transition: background 0.18s ease, border-color 0.18s ease;
        }
        .hero-cta-ghost:hover {
          background: rgba(255,255,255,0.18);
          border-color: rgba(255,255,255,0.5);
        }

        /* ── Trust strip ─────────────────────────────── */
        .hero-trust {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .hero-avatars {
          display: flex;
        }
        .hero-avatar {
          width: 28px; height: 28px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.25);
          display: flex; align-items: center; justify-content: center;
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem;
          color: #fff;
          font-weight: 500;
        }
        .hero-avatar:not(:first-child) { margin-left: -9px; }
        .hero-avatar:nth-child(odd)  { background: rgba(255,255,255,0.18); }
        .hero-avatar:nth-child(even) { background: rgba(255,255,255,0.10); }
        .hero-divider-v {
          width: 1px; height: 20px;
          background: rgba(255,255,255,0.25);
        }
        .hero-stars { display: flex; gap: 2px; }
        .hero-trust-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.75);
        }
        .hero-trust-text strong { color: #fff; font-weight: 500; }

        /* ── Scroll indicator ────────────────────────── */
        .hero-scroll {
          position: absolute;
          bottom: 32px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column;
          align-items: center; gap: 8px;
          opacity: 0;
          transition: opacity 0.6s ease 1.2s;
          z-index: 4;
        }
        .hero-scroll.loaded { opacity: 0.7; }
        .hero-scroll-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem;
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }
        .hero-scroll-track {
          width: 20px; height: 32px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.30);
          display: flex; align-items: flex-start;
          justify-content: center;
          padding-top: 5px;
        }
        .hero-scroll-dot {
          width: 4px; height: 8px;
          border-radius: 2px;
          background: #4A90C4;
          animation: scrollDot 1.8s ease-in-out infinite;
        }

        /* ── Responsive ──────────────────────────────── */
        @media (max-width: 540px) {
          .h-leaf-circle,
          .h-leaf-square,
          .h-leaf-static-tl,
          .h-leaf-static-br { display: none; }

          .hero-cta-row { flex-direction: column; align-items: stretch; }
          .hero-cta-primary,
          .hero-cta-ghost { justify-content: center; width: 100%; }
        }
      `}</style>

      <section className="hero-section">

        {/* Background image */}
        <div className="hero-bg" />

        {/* Single combined overlay */}
        <div className="hero-overlay" />

        {/* Static grain — no animation */}
        <div className="hero-grain" />

        {/* Floating leaves — will-change only here */}
        <div className="h-leaf-circle">
          <svg width="46" height="46" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-5 8Z"
              fill="rgba(255,255,255,0.65)" />
            <circle cx="8" cy="9" r="2.5" fill="rgba(255,255,255,0.2)" />
          </svg>
        </div>

        <div className="h-leaf-square">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-5 8Z"
              fill="rgba(255,255,255,0.55)" />
          </svg>
        </div>

        {/* Static decorative leaves */}
        <svg className="h-leaf-static-tl" width="80" height="80" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-5 8Z" />
        </svg>
        <svg className="h-leaf-static-br" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-5 8Z" />
        </svg>

        {/* ── Content ── */}
        <div className="hero-content">

          {/* Label */}
          <div className={`hero-label hero-reveal hero-d1${loaded ? " loaded" : ""}`}>
            <div style={{ width: "3px", height: "14px", background: "#4A90C4", borderRadius: "2px" }} />
            <span>Cabinet de Dermatologie · Tunis</span>
          </div>

          {/* Headline */}
          <h1 className={`hero-h1 hero-reveal hero-d2${loaded ? " loaded" : ""}`}>
            Votre peau mérite<br />d'être <CyclingWord />
          </h1>

          {/* Ornament */}
          <div className={`hero-ornament hero-reveal hero-d3${loaded ? " loaded" : ""}`}>
            <div className="hero-ornament-line" />
            <svg width="13" height="13" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)" aria-hidden="true">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-5 8Z" />
            </svg>
            <div className="hero-ornament-line" />
          </div>

          {/* Subtitle */}
          <p className={`hero-subtitle hero-reveal hero-d4${loaded ? " loaded" : ""}`}>
            Des soins dermatologiques personnalisés alliant expertise médicale
            et techniques esthétiques avancées — pour une peau saine, lumineuse
            et pleinement épanouie.
          </p>

          {/* CTAs */}
          <div className={`hero-cta-row hero-reveal hero-d5${loaded ? " loaded" : ""}`}>
            <Link to="/contact" className="hero-cta-primary">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Prendre rendez-vous
            </Link>

            <Link to="/apropos" className="hero-cta-ghost">
              Plus de détails
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Trust strip */}
          <div className={`hero-trust hero-reveal hero-d6${loaded ? " loaded" : ""}`}>
            <div className="hero-avatars">
              {["S","M","A","L"].map((l, i) => (
                <div key={i} className="hero-avatar">{l}</div>
              ))}
            </div>
            <div className="hero-divider-v" />
            <div className="hero-stars" aria-label="5 étoiles">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#4A90C4" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="hero-trust-text">
              <strong>+500</strong> patients satisfaits
            </p>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className={`hero-scroll${loaded ? " loaded" : ""}`} aria-hidden="true">
          <span className="hero-scroll-label">Défiler</span>
          <div className="hero-scroll-track">
            <div className="hero-scroll-dot" />
          </div>
        </div>

      </section>
    </>
  );
}