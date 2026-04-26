import { useState, useEffect, useRef, useCallback } from "react";

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
  title: string;
  description: string;
  images: string[];
  subtitle: string;
  tag: string;
  index: string;
};

const services: Service[] = [
  {
    index: "01",
    title: "Détatouage",
    description:
      "Le détatouage laser est une technique non invasive qui utilise des impulsions lumineuses à haute intensité pour fragmenter les pigments d'encre dans la peau. Au fil des séances, l'organisme élimine naturellement ces particules, permettant d'estomper puis de faire disparaître le tatouage.",
    images: ["/img/laser1.jpeg", "/img/laser2.jpeg"],
    subtitle: "Effacez vos tatouages en toute sécurité",
    tag: "Laser",
  },
  {
    index: "02",
    title: "FOTODERMA Laser CO₂ Fractolite",
    description:
      "Cette plateforme laser CO₂ multifonction offre une solution complète regroupant des traitements esthétiques, dermatologiques et gynécologiques. Grâce à ses différents modes, elle permet de rajeunir la peau, traiter les imperfections cutanées et stimuler la régénération des tissus.",
    images: ["/img/fracto7.jpeg", "/img/fracto1.png", "/img/fracto2.png", "/img/fracto3.png"],
    subtitle: "Technologie complète pour l'esthétique & le bien-être",
    tag: "Multifonction",
  },
  {
    index: "03",
    title: "Épilation Laser",
    description:
      "L'épilation laser est une méthode durable qui utilise un faisceau lumineux pour cibler et détruire le follicule pileux à la racine. Au fil des séances, la repousse des poils est fortement réduite, laissant la peau plus lisse et nette durablement.",
    images: ["/img/epilation1.jpeg", "/img/epilation2.jpeg"],
    subtitle: "Une peau douce et nette, durablement",
    tag: "Épilation",
  },
];

// ─── Banner slides data ───────────────────────────────────────────────────────
const bannerSlides = [
  {
    index: "01",
    label: "Détatouage",
    title: ["Effacez vos", "tatouages au laser"],
    desc: "Technique non invasive. Résultats progressifs et durables en toute sécurité.",
    cta: "Prendre RDV",
    bg: "dark" as const,
  },
  {
    index: "02",
    label: "CO₂ Fractolite",
    title: ["CO₂ Fractolite —", "rajeunissement peau"],
    desc: "Plateforme laser CO₂ multifonction. Esthétique, dermatologie & bien-être.",
    cta: "En savoir plus",
    bg: "blue" as const,
  },
  {
    index: "03",
    label: "Épilation Laser",
    title: ["Épilation laser —", "peau douce, durée"],
    desc: "Résultats durables dès les premières séances. Technologie certifiée.",
    cta: "Découvrir",
    bg: "navy" as const,
  },
];

// ─── Responsive hook ─────────────────────────────────────────────────────────
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

// ─── Banner SVG visuals ───────────────────────────────────────────────────────
function LaserVisual() {
  return (
    <svg width="140" height="108" viewBox="0 0 140 108" fill="none">
      <ellipse cx="92" cy="54" rx="40" ry="40" fill="url(#bv1)" opacity="0.28"/>
      <rect x="14" y="36" width="50" height="17" rx="8.5" fill="#0d1a2e" stroke="rgba(74,144,196,0.5)" strokeWidth="0.8"/>
      <rect x="56" y="40" width="9" height="9" rx="2" fill="#4A90C4" opacity="0.9"/>
      <line x1="65" y1="44" x2="100" y2="44" stroke="#4A90C4" strokeWidth="1.5" strokeDasharray="3 2"/>
      <ellipse cx="102" cy="44" rx="5" ry="5" fill="#4A90C4" opacity="0.7"/>
      <circle cx="112" cy="28" r="1.5" fill="#7dc8f4" opacity="0.8"/>
      <circle cx="105" cy="20" r="1" fill="#4A90C4"/>
      <circle cx="120" cy="36" r="1" fill="#7dc8f4" opacity="0.6"/>
      <circle cx="98" cy="62" r="1.5" fill="#4A90C4" opacity="0.7"/>
      <ellipse cx="104" cy="68" rx="18" ry="9" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.09)" strokeWidth="0.6"/>
      <path d="M96 68q4-5 8 0q4 5 8 0" stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none"/>
      <defs>
        <radialGradient id="bv1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4A90C4"/>
          <stop offset="100%" stopColor="#4A90C4" stopOpacity="0"/>
        </radialGradient>
      </defs>
    </svg>
  );
}

function FractoliteVisual() {
  return (
    <svg width="140" height="108" viewBox="0 0 140 108" fill="none">
      <ellipse cx="85" cy="54" rx="44" ry="44" fill="url(#bv2)" opacity="0.22"/>
      <g opacity="0.65">
        {[72,82,92,102].map(x =>
          [34,44,54,64].map(y => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={x===82&&y===44||x===92&&y===54 ? 3 : 2}
              fill={x===82&&y===44||x===92&&y===54 ? "#7dc8f4" : "#4A90C4"}
              opacity={x===102&&y===34||x===72&&y===64 ? 0.5 : 1}/>
          ))
        )}
      </g>
      <rect x="18" y="42" width="46" height="14" rx="7" fill="#0d1a2e" stroke="rgba(74,144,196,0.4)" strokeWidth="0.8"/>
      <rect x="56" y="46" width="8" height="6" rx="1.5" fill="#2D5986" opacity="0.9"/>
      <line x1="64" y1="49" x2="80" y2="49" stroke="#4A90C4" strokeWidth="1.5" strokeDasharray="2 2"/>
      <circle cx="118" cy="30" r="2" fill="#7dc8f4" opacity="0.6"/>
      <circle cx="125" cy="50" r="1.5" fill="#4A90C4" opacity="0.5"/>
      <defs>
        <radialGradient id="bv2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2D5986"/>
          <stop offset="100%" stopColor="#2D5986" stopOpacity="0"/>
        </radialGradient>
      </defs>
    </svg>
  );
}

function EpilationVisual() {
  return (
    <svg width="140" height="108" viewBox="0 0 140 108" fill="none">
      <ellipse cx="88" cy="54" rx="42" ry="42" fill="url(#bv3)" opacity="0.22"/>
      {/* Two coin-like circles */}
      <circle cx="72" cy="42" r="24" fill="url(#coin1)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
      <circle cx="98" cy="62" r="28" fill="url(#coin2)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
      {/* Inner icons */}
      <circle cx="72" cy="42" r="10" fill="rgba(255,255,255,0.12)"/>
      <path d="M68 42h8M72 38v8" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="98" cy="62" r="12" fill="rgba(255,255,255,0.1)"/>
      <path d="M94 62h8M98 58v8" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round"/>
      {/* Swap arrows */}
      <path d="M84 36 Q92 28 100 40" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M86 72 Q78 80 70 68" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <defs>
        <radialGradient id="bv3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1A3A5C"/>
          <stop offset="100%" stopColor="#1A3A5C" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="coin1" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#2D5986"/>
          <stop offset="100%" stopColor="#1A3A5C"/>
        </radialGradient>
        <radialGradient id="coin2" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#4A90C4"/>
          <stop offset="100%" stopColor="#2D5986"/>
        </radialGradient>
      </defs>
    </svg>
  );
}

const BannerVisuals = [LaserVisual, FractoliteVisual, EpilationVisual];

// ─── Banner Slider ────────────────────────────────────────────────────────────
const SLIDE_DURATION = 4000;

function BannerSlider() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const goTo = useCallback((i: number) => {
    setCurrent(((i % 3) + 3) % 3);
    setProgress(0);
    startRef.current = null;
  }, []);

  useEffect(() => {
    if (paused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);
      if (elapsed >= SLIDE_DURATION) {
        setCurrent(c => (c + 1) % 3);
        setProgress(0);
        startRef.current = null;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [paused, current]);

  const bgMap = {
    dark: "linear-gradient(135deg, #060d18 0%, #0d1a2e 100%)",
    blue: "linear-gradient(135deg, #0d1f3c 0%, #1a3a6e 50%, #1e5090 100%)",
    navy: "linear-gradient(135deg, #080f1e 0%, #0f2240 50%, #1a3a5c 100%)",
  };

  const glowMap = {
    dark: "rgba(74,144,196,0.18)",
    blue: "rgba(74,144,196,0.22)",
    navy: "rgba(45,89,134,0.25)",
  };

  const slide = bannerSlides[current];
  const Visual = BannerVisuals[current];

  return (
    <div
      style={{ position: "relative", borderRadius: 0, overflow: "hidden", fontFamily: "'DM Sans', sans-serif" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide */}
      <div
        style={{
          background: bgMap[slide.bg],
          position: "relative",
          padding: "clamp(52px,8vw,88px) clamp(20px,5vw,48px) clamp(60px,8vw,80px)",
          overflow: "hidden",
          minHeight: 220,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.5s ease",
        }}
      >
        {/* Background glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse 70% 80% at 80% 50%, ${glowMap[slide.bg]} 0%, transparent 70%)`,
        }}/>

        {/* Decorative large letter */}
        <div style={{
          position: "absolute", right: -16, bottom: -40,
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(140px,20vw,240px)",
          fontWeight: 600,
          color: "rgba(255,255,255,0.03)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
          letterSpacing: "-0.04em",
        }}>L</div>

        {/* Text */}
        <div style={{ position: "relative", zIndex: 2, flex: 1, maxWidth: 480 }}>
          {/* Eyebrow */}
          <p style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#4A90C4",
            margin: "0 0 14px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: "#4A90C4" }}/>
            Médecine esthétique — {slide.label}
          </p>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem,4.5vw,3rem)",
            fontWeight: 400,
            color: "#fff",
            margin: "0 0 14px",
            lineHeight: 1.15,
          }}>
            {slide.title[0]}<br/>{slide.title[1]}
          </h1>

          {/* Desc row */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 24 }}>
            <div style={{
              width: 20, height: 20, borderRadius: "50%",
              background: "rgba(74,144,196,0.2)",
              border: "1px solid rgba(74,144,196,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, marginTop: 2,
            }}>
              <svg width="10" height="10" fill="none" stroke="rgba(255,255,255,0.8)" viewBox="0 0 10 10">
                <circle cx="5" cy="5" r="4" strokeWidth="1.1"/>
                <path d="M3 5l1.5 1.5L7 3.5" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.88rem",
              color: "rgba(255,255,255,0.62)",
              margin: 0,
              lineHeight: 1.6,
              maxWidth: 380,
            }}>{slide.desc}</p>
          </div>

          {/* CTA */}
          <a href="/contact" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#fff",
            textDecoration: "none",
            border: "1.5px solid rgba(255,255,255,0.4)",
            borderRadius: 100,
            padding: "10px 24px",
            transition: "border-color 0.2s, background 0.2s",
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.8)";
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.4)";
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            }}
          >
            {slide.cta}
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>

        {/* Visual */}
        <div style={{ position: "relative", zIndex: 2, flexShrink: 0, width: 160 }}>
          <Visual/>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0,
        height: 2,
        width: `${progress}%`,
        background: "#4A90C4",
        borderRadius: "0 2px 2px 0",
        transition: "width 0.1s linear",
        zIndex: 10,
      }}/>

      {/* Prev / Next */}
      {(["prev", "next"] as const).map(dir => (
        <button
          key={dir}
          onClick={() => goTo(current + (dir === "next" ? 1 : -1))}
          aria-label={dir === "prev" ? "Précédent" : "Suivant"}
          style={{
            position: "absolute",
            top: "50%", transform: "translateY(-50%)",
            [dir === "prev" ? "left" : "right"]: 14,
            width: 34, height: 34, borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.08)",
            color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", zIndex: 10,
          }}
        >
          <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
              d={dir === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}/>
          </svg>
        </button>
      ))}

      {/* Dots */}
      <div style={{
        position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: 6, zIndex: 10,
      }}>
        {bannerSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === current ? 18 : 5,
              height: 5,
              borderRadius: 3,
              border: "none",
              background: i === current ? "#4A90C4" : "rgba(255,255,255,0.3)",
              cursor: "pointer",
              padding: 0,
              transition: "width 0.3s ease, background 0.3s ease",
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Image carousel ──────────────────────────────────────────────────────────
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
    <div className="carousel-wrap">
      <img
        src={images[idx]}
        alt="résultat traitement"
        className={`carousel-img ${fading ? "carousel-img--fade" : ""}`}
      />
      <div className="carousel-gradient"/>
      {images.length > 1 && (
        <>
          <button className="carousel-btn carousel-btn--prev" onClick={() => go(-1)} aria-label="Précédent">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button className="carousel-btn carousel-btn--next" onClick={() => go(1)} aria-label="Suivant">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </button>
          <div className="carousel-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot ${i === idx ? "carousel-dot--active" : ""}`}
                onClick={() => { setFading(true); setTimeout(() => { setIdx(i); setFading(false); }, 220); }}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
      <div className="carousel-counter">
        {String(idx + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </div>
    </div>
  );
}

// ─── Service card ─────────────────────────────────────────────────────────────
function ServiceCard({ service, isMobile, flipped }: {
  service: Service;
  isMobile: boolean;
  flipped: boolean;
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
      className={`service-card ${visible ? "service-card--visible" : ""} ${flipped && !isMobile ? "service-card--flipped" : ""}`}
    >
      <div className="service-image-col">
        <Carousel images={service.images}/>
      </div>
      <div className="service-text-col">
        <div className="service-meta">
          <span className="service-index">{service.index}</span>
          <div className="service-divider-h"/>
          <span className="service-tag">{service.tag}</span>
        </div>
        <h2 className="service-title">{service.title}</h2>
        <div className="service-subtitle-wrap">
          <div className="service-accent-bar"/>
          <p className="service-subtitle">{service.subtitle}</p>
        </div>
        <p className="service-desc">{service.description}</p>
        <a href="/contact" className="service-cta">
          <span>Prendre rendez-vous</span>
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Laser() {
  const isMobile = useIsMobile();

  return (
    <>
      <style>{`
        :root {
          --accent:      #1A3A5C;
          --accent-mid:  #2D5986;
          --accent-line: #4A90C4;
          --accent-lt:   #EBF1F8;
          --text-dark:   #1A1F2E;
          --text-mid:    #6B7380;
          --border:      #D6D9DD;
          --off-white:   #F8F9FA;
          --white:       #FFFFFF;
        }

        /* ── Services list ── */
        .laser-list {
          max-width: 1100px;
          margin: 0 auto;
          padding: 72px 24px 80px;
        }

        /* ── Service card ── */
        .service-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
          margin-bottom: 100px;
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .service-card:last-child { margin-bottom: 0; }
        .service-card--visible { opacity: 1; transform: translateY(0); }
        .service-card--flipped .service-image-col { order: 2; }
        .service-card--flipped .service-text-col  { order: 1; }

        @media (max-width: 768px) {
          .service-card { grid-template-columns: 1fr; gap: 28px; margin-bottom: 64px; }
          .laser-list { padding: 48px 16px 60px; }
        }

        .service-image-col { position: relative; }

        /* ── Carousel ── */
        .carousel-wrap {
          position: relative;
          border-radius: 4px;
          overflow: hidden;
          background: var(--accent-lt);
          box-shadow: 8px 8px 0px var(--accent-lt), 10px 10px 0px var(--border);
        }
        .carousel-img {
          width: 100%; height: 380px; object-fit: cover; display: block;
          transition: opacity 0.22s ease;
        }
        .carousel-img--fade { opacity: 0; }
        .carousel-gradient {
          position: absolute; bottom: 0; left: 0; right: 0; height: 80px;
          background: linear-gradient(to top, rgba(26,31,46,0.45), transparent);
          pointer-events: none;
        }
        .carousel-btn {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 36px; height: 36px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.12); backdrop-filter: blur(8px);
          color: #fff; display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background 0.18s ease, border-color 0.18s ease; z-index: 2;
        }
        .carousel-btn:hover { background: rgba(255,255,255,0.25); border-color: rgba(255,255,255,0.6); }
        .carousel-btn--prev { left: 12px; }
        .carousel-btn--next { right: 12px; }
        .carousel-dots {
          position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%);
          display: flex; gap: 6px; z-index: 2;
        }
        .carousel-dot {
          width: 5px; height: 5px; border-radius: 50%; border: none;
          background: rgba(255,255,255,0.4); cursor: pointer; padding: 0;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .carousel-dot--active { background: #fff; transform: scale(1.4); }
        .carousel-counter {
          position: absolute; bottom: 14px; right: 14px;
          font-family: 'DM Mono', monospace; font-size: 0.6rem;
          color: rgba(255,255,255,0.6); letter-spacing: 0.1em; z-index: 2;
        }
        @media (max-width: 768px) {
          .carousel-img { height: 260px; }
          .carousel-wrap { box-shadow: 4px 4px 0px var(--accent-lt), 6px 6px 0px var(--border); }
        }

        /* ── Text column ── */
        .service-text-col { display: flex; flex-direction: column; gap: 0; }
        .service-meta { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
        .service-index { font-family: 'DM Mono', monospace; font-size: 0.65rem; color: var(--accent-line); letter-spacing: 0.12em; }
        .service-divider-h { flex: 1; max-width: 32px; height: 1px; background: var(--border); }
        .service-tag {
          font-family: 'DM Mono', monospace; font-size: 0.6rem;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--accent-mid); border: 1px solid var(--border);
          padding: 3px 10px; border-radius: 2px;
        }
        .service-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 400;
          color: var(--text-dark); margin: 0 0 24px; line-height: 1.2;
        }
        .service-subtitle-wrap { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 20px; }
        .service-accent-bar { width: 2px; min-height: 36px; background: var(--accent-line); border-radius: 2px; flex-shrink: 0; margin-top: 2px; }
        .service-subtitle { font-family: 'DM Sans', sans-serif; font-size: 0.88rem; color: var(--accent-mid); font-style: italic; line-height: 1.6; margin: 0; }
        .service-desc { font-family: 'DM Sans', sans-serif; font-size: 0.9rem; color: var(--text-mid); line-height: 1.8; margin: 0 0 32px; }
        .service-cta {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 0.78rem; font-weight: 500;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--accent); text-decoration: none;
          padding-bottom: 6px; border-bottom: 1px solid var(--border);
          align-self: flex-start;
          transition: color 0.18s ease, border-color 0.18s ease, gap 0.18s ease;
        }
        .service-cta:hover { color: var(--accent-line); border-color: var(--accent-line); gap: 16px; }
        .service-cta svg { transition: transform 0.18s ease; }
        .service-cta:hover svg { transform: translateX(4px); }

        .service-separator {
          width: 100%; height: 1px;
          background: linear-gradient(to right, transparent, var(--border) 30%, var(--border) 70%, transparent);
          margin-bottom: 100px;
        }
        @media (max-width: 768px) { .service-separator { margin-bottom: 64px; } }
      `}</style>

      <section style={{ background: C.offWhite, fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── Autoscrolling Banner Slider ── */}
        <BannerSlider/>

        {/* ── Services ── */}
        <div className="laser-list">
          {services.map((service, i) => (
            <div key={service.title}>
              <ServiceCard service={service} isMobile={isMobile} flipped={i % 2 !== 0}/>
              {i < services.length - 1 && <div className="service-separator"/>}
            </div>
          ))}
        </div>

      </section>
    </>
  );
}