import { useState, useEffect, useRef } from "react";

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  white:      "#FFFFFF",
  offWhite:   "#F8F9FA",
  lightGray:  "#EEF0F2",
  borderGray: "#D6D9DD",
  textMid:    "#6B7380",
  textDark:   "#1A1F2E",
  accent:     "#1A3A5C",
  accentMid:  "#2D5986",
  accentLt:   "#EBF1F8",
  accentLine: "#4A90C4",
};

// ─── Data ────────────────────────────────────────────────────────────────────
type Service = {
  index: string;
  title: string;
  description: string;
  images: string[];
  subtitle: string;
  tag: string;
};

const services: Service[] = [
  {
    index: "01",
    title: "Greffe de cheveux",
    description:
      "La greffe de cheveux est une intervention médicale visant à restaurer la densité capillaire en transférant des follicules pileux d'une zone donneuse (généralement l'arrière de la tête) vers les zones clairsemées ou dégarnies.",
    images: ["/img/greffe1.jpeg", "/img/greffe2.jpeg", "/img/greffe3.jpeg", "/img/greffe11.jpeg"],
    subtitle: "Cette procédure permet d'obtenir un résultat naturel et durable.",
    tag: "Greffe de cheveux",
  },
  {
    index: "02",
    title: "Comblement des fesses",
    description:
      "Le comblement des fesses est une procédure esthétique visant à améliorer le volume et la forme des fesses. Il peut être réalisé par injection d'acide hyaluronique ou par lipofilling (transfert de graisse autologue). Cette technique permet de remodeler les contours, d'obtenir un galbe naturel et harmonieux, et d'augmenter la confiance en soi.",
    images: ["/img/fesse1.jpeg", "/img/fesse2.jpeg"],
    subtitle: "L'intervention se fait sous anesthésie locale ou générale, avec un suivi pour assurer un résultat durable et uniforme.",
    tag: "Comblement des fesses",
  },
  {
    index: "03",
    title: "Liposculture ventre",
    description:
      "La liposculture du ventre est une intervention esthétique qui permet de remodeler la silhouette en éliminant l'excès de graisse localisée. Elle consiste à aspirer les dépôts graisseux pour obtenir un ventre plus plat et des contours harmonieux.",
    images: ["/img/lipo.jpeg"],
    subtitle: "Cette technique offre un résultat naturel et durable, avec une reprise progressive des activités après quelques jours.",
    tag: "Liposculture",
  },
];

// ─── Responsive hook ──────────────────────────────────────────────────────────
function useIsMobile(bp = 768) {
  const [v, setV] = useState(
    typeof window !== "undefined" ? window.innerWidth < bp : false
  );
  useEffect(() => {
    const fn = () => setV(window.innerWidth < bp);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [bp]);
  return v;
}

// ─── Carousel ─────────────────────────────────────────────────────────────────
function Carousel({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  const go = (dir: number) => {
    setFading(true);
    setTimeout(() => {
      setIdx(p => (p + dir + images.length) % images.length);
      setFading(false);
    }, 220);
  };

  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => go(1), 3200);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div className="corps-carousel-wrap">
      <img
        src={images[idx]}
        alt="résultat traitement"
        className={`corps-carousel-img${fading ? " corps-carousel-img--fade" : ""}`}
      />
      <div className="corps-carousel-gradient" />

      {images.length > 1 && (
        <>
          <button className="corps-carousel-btn corps-carousel-btn--prev" onClick={() => go(-1)} aria-label="Précédent">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="corps-carousel-btn corps-carousel-btn--next" onClick={() => go(1)} aria-label="Suivant">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="corps-carousel-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`corps-carousel-dot${i === idx ? " corps-carousel-dot--active" : ""}`}
                onClick={() => { setFading(true); setTimeout(() => { setIdx(i); setFading(false); }, 220); }}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}

      <div className="corps-carousel-counter">
        {String(idx + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </div>
    </div>
  );
}

// ─── Service card ─────────────────────────────────────────────────────────────
function ServiceCard({ service, flipped, isMobile }: {
  service: Service;
  flipped: boolean;
  isMobile: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`corps-card${visible ? " corps-card--visible" : ""}${flipped && !isMobile ? " corps-card--flipped" : ""}`}
    >
      <div className="corps-image-col">
        <Carousel images={service.images} />
      </div>

      <div className="corps-text-col">
        <div className="corps-meta">
          <span className="corps-index">{service.index}</span>
          <div className="corps-meta-divider" />
          <span className="corps-tag">{service.tag}</span>
        </div>

        <h2 className="corps-title">{service.title}</h2>

        <div className="corps-subtitle-wrap">
          <div className="corps-accent-bar" />
          <p className="corps-subtitle">{service.subtitle}</p>
        </div>

        <p className="corps-desc">{service.description}</p>

        <a href="/contact" className="corps-cta">
          <span>Prendre rendez-vous</span>
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}

// ─── Banner Component ─────────────────────────────────────────────────────────
function Banner() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  return (
    <div className={`corps-banner${mounted ? " corps-banner--in" : ""}`}>
      {/* Ambient orb */}
      <div className="corps-banner-orb" />

      {/* Vertical rule left */}
      <div className="corps-banner-vline" />

      {/* Watermark text */}
      <div className="corps-banner-wm" aria-hidden="true">CORPS</div>

      {/* Service count strip — right side */}
      <div className="corps-banner-strip">
        {services.map((s, i) => (
          <div key={s.index} className="corps-banner-strip-item">
            <span className="corps-banner-strip-num">{s.index}</span>
            <span className="corps-banner-strip-label">{s.tag}</span>
          </div>
        ))}
      </div>

      <div className="corps-banner-inner">
        {/* Top row: eyebrow */}
        <div className="corps-banner-eyebrow">
          <span className="corps-banner-eyebrow-line" />
          <span>Médecine esthétique · Tunisie</span>
          <span className="corps-banner-eyebrow-dot" />
          <span>Soins premium</span>
        </div>

        {/* Heading block */}
        <div className="corps-banner-heading-block">
          <h1 className="corps-banner-h1">
            <span className="corps-banner-h1-top">Corps</span>
            <span className="corps-banner-h1-amp">&amp;</span>
            <span className="corps-banner-h1-bot">Cheveux</span>
          </h1>
        </div>

        {/* Bottom row */}
        <div className="corps-banner-bottom">
          <p className="corps-banner-sub">
            Des traitements sur mesure pour remodeler la silhouette,
            restaurer la densité capillaire et sublimer l'apparence
            de façon naturelle et durable.
          </p>

          <div className="corps-banner-stats">
            
         
        
          </div>
        </div>
      </div>

      {/* Bottom border accent */}
      <div className="corps-banner-bline" />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Corps() {
  const isMobile = useIsMobile();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Mono:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --corps-accent:      #1A3A5C;
          --corps-accent-mid:  #2D5986;
          --corps-accent-line: #4A90C4;
          --corps-accent-lt:   #EBF1F8;
          --corps-text-dark:   #1A1F2E;
          --corps-text-mid:    #6B7380;
          --corps-border:      #D6D9DD;
          --corps-off-white:   #F8F9FA;
        }

        /* ══════════════════════════════════════════
           BANNER — Editorial luxury redesign
        ══════════════════════════════════════════ */
        .corps-banner {
          position: relative;
          min-height: 520px;
          background: #192c48;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0;
        }

        /* Staggered reveal keyframes */
        @keyframes corps-fade-up {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes corps-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes corps-slide-right {
          from { opacity: 0; transform: translateX(-18px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes corps-line-grow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes corps-orb-pulse {
          0%, 100% { opacity: 0.18; transform: scale(1); }
          50%       { opacity: 0.28; transform: scale(1.06); }
        }

        /* Ambient orb */
        .corps-banner-orb {
          position: absolute;
          top: -120px;
          left: -80px;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(74,144,196,0.22) 0%, transparent 70%);
          animation: corps-orb-pulse 7s ease-in-out infinite;
          pointer-events: none;
        }

        /* Noise/grid texture overlay */
        .corps-banner::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
          z-index: 0;
        }

        /* Subtle right-side vignette */
        .corps-banner::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(6,14,26,0.7) 100%);
          pointer-events: none;
          z-index: 0;
        }

        /* Vertical rule — left edge accent */
        .corps-banner-vline {
          position: absolute;
          top: 0; bottom: 0;
          left: 0;
          width: 3px;
          background: linear-gradient(to bottom, transparent, #4A90C4 30%, #4A90C4 70%, transparent);
          z-index: 1;
        }

        /* Giant watermark */
        .corps-banner-wm {
          position: absolute;
          right: -0.08em;
          bottom: -0.25em;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(160px, 24vw, 340px);
          font-weight: 300;
          color: transparent;
          -webkit-text-stroke: 1px rgba(74,144,196,0.08);
          line-height: 1;
          letter-spacing: -0.04em;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }

        /* Services index strip — right column */
        .corps-banner-strip {
          position: absolute;
          right: 40px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 20px;
          z-index: 2;
          border-left: 1px solid rgba(255,255,255,0.07);
          padding-left: 20px;
        }
        .corps-banner-strip-item {
          display: flex;
          flex-direction: column;
          gap: 3px;
          opacity: 0;
        }
        .corps-banner--in .corps-banner-strip-item:nth-child(1) {
          animation: corps-fade-in 0.6s ease 0.7s forwards;
        }
        .corps-banner--in .corps-banner-strip-item:nth-child(2) {
          animation: corps-fade-in 0.6s ease 0.85s forwards;
        }
        .corps-banner--in .corps-banner-strip-item:nth-child(3) {
          animation: corps-fade-in 0.6s ease 1s forwards;
        }
        .corps-banner-strip-num {
          font-family: 'DM Mono', monospace;
          font-size: 0.55rem;
          color: #4A90C4;
          letter-spacing: 0.12em;
        }
        .corps-banner-strip-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.55rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          white-space: nowrap;
        }

        /* Inner content */
        .corps-banner-inner {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
          padding: 80px 180px 80px 52px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* Eyebrow */
        .corps-banner-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 36px;
          opacity: 0;
        }
        .corps-banner--in .corps-banner-eyebrow {
          animation: corps-slide-right 0.6s ease 0.1s forwards;
        }
        .corps-banner-eyebrow-line {
          display: block;
          width: 36px;
          height: 1px;
          background: #4A90C4;
          transform-origin: left;
          animation: corps-line-grow 0.5s ease 0.1s both;
        }
        .corps-banner-eyebrow-dot {
          display: block;
          width: 3px; height: 3px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
        }

        /* Main heading — stacked editorial style */
        .corps-banner-heading-block {
          margin-bottom: 44px;
          opacity: 0;
        }
        .corps-banner--in .corps-banner-heading-block {
          animation: corps-fade-up 0.75s ease 0.25s forwards;
        }
        .corps-banner-h1 {
          margin: 0;
          line-height: 0.88;
          display: flex;
          flex-direction: column;
        }
        .corps-banner-h1-top {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.2rem, 8vw, 7rem);
          font-weight: 300;
          color: #fff;
          letter-spacing: -0.02em;
          display: block;
        }
        .corps-banner-h1-amp {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.1rem, 2.5vw, 1.8rem);
          font-weight: 300;
          font-style: italic;
          color: #4A90C4;
          letter-spacing: 0.3em;
          display: block;
          margin: 8px 0 4px 4px;
        }
        .corps-banner-h1-bot {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.2rem, 8vw, 7rem);
          font-weight: 300;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.7);
          letter-spacing: -0.02em;
          display: block;
        }

        /* Bottom row */
        .corps-banner-bottom {
          display: flex;
          align-items: flex-start;
          gap: 64px;
          opacity: 0;
        }
        .corps-banner--in .corps-banner-bottom {
          animation: corps-fade-up 0.7s ease 0.45s forwards;
        }
        .corps-banner-sub {
          flex: 1;
          max-width: 380px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          line-height: 1.8;
          color: rgba(255,255,255,0.45);
          margin: 0;
          padding-top: 6px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        /* Stats */
        .corps-banner-stats {
          display: flex;
          align-items: center;
          gap: 28px;
          flex-shrink: 0;
        }
        .corps-banner-stat {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .corps-banner-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.9rem;
          font-weight: 300;
          color: #fff;
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .corps-banner-stat-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.52rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
        }
        .corps-banner-stat-divider {
          width: 1px;
          height: 32px;
          background: rgba(255,255,255,0.1);
        }

        /* Bottom border accent line */
        .corps-banner-bline {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, #4A90C4 0%, rgba(74,144,196,0.2) 50%, transparent 100%);
          z-index: 2;
        }

        /* Mobile banner adjustments */
        @media (max-width: 768px) {
          .corps-banner { min-height: auto; }
          .corps-banner-inner {
            padding: 64px 24px 56px 36px;
          }
          .corps-banner-strip { display: none; }
          .corps-banner-bottom { flex-direction: column; gap: 28px; }
          .corps-banner-stats { gap: 20px; }
          .corps-banner-h1-top,
          .corps-banner-h1-bot { font-size: clamp(2.8rem, 14vw, 4.5rem); }
          .corps-banner-wm { font-size: 38vw; }
        }

        /* ══════════════════════════════════════════
           REST OF COMPONENT STYLES (unchanged)
        ══════════════════════════════════════════ */

        .corps-list {
          max-width: 1100px;
          margin: 0 auto;
          padding: 72px 24px 80px;
        }
        @media (max-width: 768px) {
          .corps-list { padding: 48px 16px 60px; }
        }

        .corps-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
          margin-bottom: 100px;
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .corps-card:last-child { margin-bottom: 0; }
        .corps-card--visible { opacity: 1; transform: translateY(0); }
        .corps-card--flipped .corps-image-col { order: 2; }
        .corps-card--flipped .corps-text-col  { order: 1; }
        @media (max-width: 768px) {
          .corps-card { grid-template-columns: 1fr; gap: 28px; margin-bottom: 64px; }
        }

        .corps-carousel-wrap {
          position: relative;
          border-radius: 4px;
          overflow: hidden;
          background: var(--corps-accent-lt);
          box-shadow: 8px 8px 0px var(--corps-accent-lt), 10px 10px 0px var(--corps-border);
        }
        @media (max-width: 768px) {
          .corps-carousel-wrap { box-shadow: 4px 4px 0px var(--corps-accent-lt), 6px 6px 0px var(--corps-border); }
        }
        .corps-carousel-img { width: 100%; height: 380px; object-fit: cover; display: block; transition: opacity 0.22s ease; }
        .corps-carousel-img--fade { opacity: 0; }
        .corps-carousel-gradient { position: absolute; bottom: 0; left: 0; right: 0; height: 80px; background: linear-gradient(to top, rgba(26,31,46,0.4), transparent); pointer-events: none; }
        .corps-carousel-btn { position: absolute; top: 50%; transform: translateY(-50%); width: 36px; height: 36px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.12); backdrop-filter: blur(8px); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.18s ease, border-color 0.18s ease; z-index: 2; }
        .corps-carousel-btn:hover { background: rgba(255,255,255,0.25); border-color: rgba(255,255,255,0.6); }
        .corps-carousel-btn--prev { left: 12px; }
        .corps-carousel-btn--next { right: 12px; }
        .corps-carousel-dots { position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; z-index: 2; }
        .corps-carousel-dot { width: 5px; height: 5px; border-radius: 50%; border: none; background: rgba(255,255,255,0.4); cursor: pointer; padding: 0; transition: background 0.2s ease, transform 0.2s ease; }
        .corps-carousel-dot--active { background: #fff; transform: scale(1.4); }
        .corps-carousel-counter { position: absolute; bottom: 14px; right: 14px; font-family: 'DM Mono', monospace; font-size: 0.6rem; color: rgba(255,255,255,0.6); letter-spacing: 0.1em; z-index: 2; }
        @media (max-width: 768px) { .corps-carousel-img { height: 260px; } }

        .corps-text-col { display: flex; flex-direction: column; }
        .corps-meta { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
        .corps-index { font-family: 'DM Mono', monospace; font-size: 0.65rem; color: var(--corps-accent-line); letter-spacing: 0.12em; }
        .corps-meta-divider { flex: 1; max-width: 32px; height: 1px; background: var(--corps-border); }
        .corps-tag { font-family: 'DM Mono', monospace; font-size: 0.6rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--corps-accent-mid); border: 1px solid var(--corps-border); padding: 3px 10px; border-radius: 2px; }
        .corps-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.5rem, 3vw, 2.1rem); font-weight: 400; color: var(--corps-text-dark); margin: 0 0 24px; line-height: 1.2; }
        .corps-subtitle-wrap { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 20px; }
        .corps-accent-bar { width: 2px; min-height: 36px; background: var(--corps-accent-line); border-radius: 2px; flex-shrink: 0; margin-top: 2px; }
        .corps-subtitle { font-family: 'DM Sans', sans-serif; font-size: 0.88rem; color: var(--corps-accent-mid); font-style: italic; line-height: 1.6; margin: 0; }
        .corps-desc { font-family: 'DM Sans', sans-serif; font-size: 0.9rem; color: var(--corps-text-mid); line-height: 1.8; margin: 0 0 32px; }
        .corps-cta { display: inline-flex; align-items: center; gap: 10px; font-family: 'DM Sans', sans-serif; font-size: 0.78rem; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: var(--corps-accent); text-decoration: none; padding-bottom: 6px; border-bottom: 1px solid var(--corps-border); align-self: flex-start; transition: color 0.18s ease, border-color 0.18s ease, gap 0.18s ease; }
        .corps-cta:hover { color: var(--corps-accent-line); border-color: var(--corps-accent-line); gap: 16px; }
        .corps-cta svg { transition: transform 0.18s ease; }
        .corps-cta:hover svg { transform: translateX(4px); }

        .corps-separator { width: 100%; height: 1px; background: linear-gradient(to right, transparent, var(--corps-border) 30%, var(--corps-border) 70%, transparent); margin-bottom: 100px; }
        @media (max-width: 768px) { .corps-separator { margin-bottom: 64px; } }
      `}</style>

      <section style={{ background: C.offWhite, fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── Banner ── */}
        <Banner />

        {/* ── Services ── */}
        <div className="corps-list">
          {services.map((service, i) => (
            <div key={service.title}>
              <ServiceCard service={service} isMobile={false} flipped={i % 2 !== 0} />
              {i < services.length - 1 && <div className="corps-separator" />}
            </div>
          ))}
        </div>

      </section>
    </>
  );
}