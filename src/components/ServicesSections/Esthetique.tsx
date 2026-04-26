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
  // Gold palette
  gold:       "#C09E64",
  goldLight:  "#D4B87A",
  goldDark:   "#8A6F3E",
  cream:      "#FAF7F2",
  creamDark:  "#F0EAE0",
  inkDark:    "#1A150F",
  inkMid:     "#4A3F32",
  inkLight:   "#7A6E62",
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
    title: "Lip Filler",
    description:
      "Les lip fillers sont des injections esthétiques destinées à augmenter le volume des lèvres, à en améliorer la forme et à lisser les rides superficielles autour de la bouche. Réalisées avec de l'acide hyaluronique, elles offrent un résultat naturel et temporaire, permettant de redessiner les contours et de sublimer le sourire en toute sécurité, avec un temps de récupération minimal.",
    images: ["/img/lipfiller1.jpeg", "/img/lipfiller2.jpeg"],
    subtitle: "Augmentation du volume des lèvres avec un rendu naturel et harmonieux",
    tag: "Lip filler",
  },
  {
    index: "02",
    title: "Botox Front",
    description:
      "Le Botox du front est un traitement esthétique visant à lisser les rides horizontales et à prévenir leur apparition. Grâce à de petites injections de toxine botulinique, les muscles responsables des rides se relâchent, offrant un front plus lisse et un regard rajeuni. Le geste est rapide, sûr, et le résultat naturel apparaît en quelques jours avec un effet temporaire généralement de 3 à 6 mois.",
    images: ["/img/botoxf1.jpeg", "/img/botoxf2.jpeg"],
    subtitle: "Atténuation des rides du front pour un visage reposé et rajeuni.",
    tag: "Botox",
  },
  {
    index: "03",
    title: "Correction Ovale du Visage",
    description:
      "La correction de l'ovale du visage est une intervention ou un traitement esthétique visant à redéfinir les contours du visage et à harmoniser la mâchoire, les joues et le menton. Elle peut être réalisée par injections (acide hyaluronique, Botox) ou par chirurgie légère pour lifter et restructurer la zone. Le résultat apporte un visage plus ferme, symétrique et rajeuni, avec un aspect naturel.",
    images: ["/img/correction1.jpeg"],
    subtitle: "Redéfinition des contours du visage pour un effet lifté sans chirurgie.",
    tag: "Correction de visage",
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

// ─── Gold Banner ──────────────────────────────────────────────────────────────
function GoldBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        /* ── Gold banner tokens ── */
        .esth-gold-banner {
          position: relative;
          background: #FAF7F2;
          border-bottom: 1px solid #E8E0D4;
          padding: 88px clamp(20px, 5vw, 48px) 72px;
          overflow: hidden;
        }

        /* Subtle warm radial atmosphere */
        .esth-gold-banner::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 55% 80% at 88% 50%, rgba(192,158,100,0.11) 0%, transparent 65%),
            radial-gradient(ellipse 35% 55% at 5% 85%, rgba(192,158,100,0.06) 0%, transparent 60%);
          pointer-events: none;
        }

        /* Fine diagonal line texture */
        .esth-gold-banner::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 28px,
            rgba(192,158,100,0.025) 28px,
            rgba(192,158,100,0.025) 29px
          );
          pointer-events: none;
        }

        /* Large serif deco letter */
        .esth-gold-deco {
          position: absolute;
          right: -12px;
          bottom: -52px;
          font-family: 'Playfair Display', serif;
          font-size: clamp(180px, 26vw, 320px);
          font-weight: 600;
          color: rgba(192,158,100,0.07);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.04em;
          z-index: 0;
        }

        /* Thin gold top border accent */
        .esth-gold-topline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(
            to right,
            transparent 0%,
            #C09E64 25%,
            #D4B87A 50%,
            #C09E64 75%,
            transparent 100%
          );
        }

        .esth-gold-inner {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }

        /* Eyebrow line */
        .esth-gold-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #C09E64;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s;
        }
        .esth-gold-eyebrow.visible {
          opacity: 1; transform: translateY(0);
        }
        .esth-gold-eyebrow::before {
          content: '';
          display: block;
          width: 28px; height: 1px;
          background: linear-gradient(to right, #C09E64, #D4B87A);
        }
        .esth-gold-eyebrow::after {
          content: '';
          display: block;
          width: 28px; height: 1px;
          background: linear-gradient(to left, #C09E64, #D4B87A);
        }

        /* Main title */
        .esth-gold-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 5.5vw, 3.8rem);
          font-weight: 400;
          color: #1A150F;
          margin: 0 0 6px;
          line-height: 1.1;
          letter-spacing: -0.01em;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease 0.22s, transform 0.7s ease 0.22s;
        }
        .esth-gold-title.visible { opacity: 1; transform: translateY(0); }
        .esth-gold-title em {
          font-style: italic;
          color: #8A6F3E;
        }

        /* Gold rule under title */
        .esth-gold-rule {
          width: 56px; height: 1px;
          background: linear-gradient(to right, #C09E64, transparent);
          margin: 16px 0 20px;
          opacity: 0;
          transition: opacity 0.6s ease 0.36s, width 0.8s ease 0.36s;
        }
        .esth-gold-rule.visible { opacity: 1; width: 80px; }

        /* Subtitle */
        .esth-gold-sub {
          max-width: 420px;
          color: #7A6E62;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          line-height: 1.75;
          margin: 0 0 28px;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s;
        }
        .esth-gold-sub.visible { opacity: 1; transform: translateY(0); }

        /* CTA row */
        .esth-gold-cta-row {
          display: flex;
          align-items: center;
          gap: 24px;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.6s ease 0.52s, transform 0.6s ease 0.52s;
        }
        .esth-gold-cta-row.visible { opacity: 1; transform: translateY(0); }

        /* Primary CTA button */
        .esth-gold-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #FAF7F2;
          background: #1A150F;
          border: 1px solid #1A150F;
          border-radius: 100px;
          padding: 11px 26px;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.22s ease, border-color 0.22s ease, color 0.22s ease;
        }
        .esth-gold-cta:hover {
          background: #8A6F3E;
          border-color: #8A6F3E;
        }
        .esth-gold-cta svg { transition: transform 0.18s ease; }
        .esth-gold-cta:hover svg { transform: translateX(3px); }

        /* Secondary ghost CTA */
        .esth-gold-cta-ghost {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 400;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #8A6F3E;
          text-decoration: none;
          border-bottom: 1px solid rgba(192,158,100,0.4);
          padding-bottom: 2px;
          transition: color 0.18s ease, border-color 0.18s ease;
        }
        .esth-gold-cta-ghost:hover {
          color: #C09E64;
          border-color: #C09E64;
        }

        /* Right: decorative SVG illustration */
        .esth-gold-visual {
          flex-shrink: 0;
          opacity: 0;
          transform: translateX(20px);
          transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
        }
        .esth-gold-visual.visible { opacity: 1; transform: translateX(0); }

        /* Badge chips */
        .esth-gold-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 22px;
          opacity: 0;
          transition: opacity 0.6s ease 0.34s;
        }
        .esth-gold-chips.visible { opacity: 1; }
        .esth-gold-chip {
          font-family: 'DM Mono', monospace;
          font-size: 0.55rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #8A6F3E;
          border: 1px solid rgba(192,158,100,0.35);
          padding: 4px 10px;
          border-radius: 2px;
          background: rgba(192,158,100,0.06);
        }

        @media (max-width: 768px) {
          .esth-gold-banner { padding: 60px 20px 52px; }
          .esth-gold-inner { flex-direction: column; gap: 24px; }
          .esth-gold-visual { display: none; }
        }
      `}</style>

      <div className="esth-gold-banner">
        {/* Top gold accent line */}
        <div className="esth-gold-topline" />

        {/* Large background deco letter */}
        <div className="esth-gold-deco">E</div>

        <div className="esth-gold-inner">
          {/* ── Left: text ── */}
          <div>
            {/* Eyebrow */}
            <p className={`esth-gold-eyebrow ${visible ? "visible" : ""}`}>
              Médecine esthétique
            </p>

            {/* Title */}
            <h1 className={`esth-gold-title ${visible ? "visible" : ""}`}>
              Visage &amp; <em>Esthétique</em>
            </h1>

            {/* Gold rule */}
            <div className={`esth-gold-rule ${visible ? "visible" : ""}`} />

            {/* Sub */}
            <p className={`esth-gold-sub ${visible ? "visible" : ""}`}>
              Des traitements sur mesure pour sublimer les traits du visage
              avec précision et naturel.
            </p>

            {/* Treatment chips */}
            <div className={`esth-gold-chips ${visible ? "visible" : ""}`}>
              {["Lip Filler", "Botox", "Correction du visage"].map(t => (
                <span key={t} className="esth-gold-chip">{t}</span>
              ))}
            </div>

            {/* CTAs */}
            <div className={`esth-gold-cta-row ${visible ? "visible" : ""}`}>
              <a href="/contact" className="esth-gold-cta">
                Prendre rendez-vous
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#services" className="esth-gold-cta-ghost">
                Nos soins
              </a>
            </div>
          </div>

          {/* ── Right: decorative illustration ── */}
          <div className={`esth-gold-visual ${visible ? "visible" : ""}`}>
            <svg width="260" height="220" viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Outer ring */}
              <circle cx="130" cy="110" r="96" stroke="rgba(192,158,100,0.15)" strokeWidth="1"/>
              {/* Mid ring */}
              <circle cx="130" cy="110" r="70" stroke="rgba(192,158,100,0.1)" strokeWidth="0.8"/>
              {/* Inner fill */}
              <circle cx="130" cy="110" r="52" fill="rgba(192,158,100,0.05)" stroke="rgba(192,158,100,0.18)" strokeWidth="0.8"/>

              {/* Abstract face — elegant oval */}
              <ellipse cx="130" cy="100" rx="30" ry="38" fill="rgba(250,247,242,0.8)" stroke="rgba(192,158,100,0.4)" strokeWidth="1"/>

              {/* Brow lines */}
              <path d="M116 86 Q121 83 126 86" stroke="rgba(138,111,62,0.5)" strokeWidth="1" fill="none" strokeLinecap="round"/>
              <path d="M134 86 Q139 83 144 86" stroke="rgba(138,111,62,0.5)" strokeWidth="1" fill="none" strokeLinecap="round"/>

              {/* Eyes */}
              <ellipse cx="121" cy="93" rx="4.5" ry="2.5" fill="none" stroke="rgba(138,111,62,0.6)" strokeWidth="0.9"/>
              <ellipse cx="139" cy="93" rx="4.5" ry="2.5" fill="none" stroke="rgba(138,111,62,0.6)" strokeWidth="0.9"/>
              <circle cx="121" cy="93" r="1.5" fill="rgba(138,111,62,0.4)"/>
              <circle cx="139" cy="93" r="1.5" fill="rgba(138,111,62,0.4)"/>

              {/* Nose bridge */}
              <path d="M130 98 L127 108 Q130 110 133 108 L130 98" stroke="rgba(192,158,100,0.3)" strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>

              {/* Lips */}
              <path d="M120 116 Q125 113 130 115 Q135 113 140 116" stroke="#C09E64" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
              <path d="M120 116 Q130 122 140 116" stroke="rgba(192,158,100,0.5)" strokeWidth="1" fill="rgba(192,158,100,0.08)" strokeLinecap="round"/>

              {/* Jaw/chin */}
              <path d="M100 108 Q102 132 130 138 Q158 132 160 108" stroke="rgba(192,158,100,0.2)" strokeWidth="0.8" fill="none"/>

              {/* Needle — lip filler suggestion */}
              <line x1="170" y1="68" x2="146" y2="112" stroke="rgba(192,158,100,0.45)" strokeWidth="0.9" strokeDasharray="3 2"/>
              <circle cx="170" cy="67" r="3" fill="#C09E64" opacity="0.6"/>
              <rect x="168" y="56" width="4" height="12" rx="2" fill="rgba(192,158,100,0.3)" stroke="rgba(192,158,100,0.5)" strokeWidth="0.6"/>

              {/* Second needle — brow/forehead */}
              <line x1="90" y1="60" x2="114" y2="88" stroke="rgba(192,158,100,0.35)" strokeWidth="0.9" strokeDasharray="3 2"/>
              <circle cx="90" cy="59" r="2.5" fill="#C09E64" opacity="0.5"/>
              <rect x="88" y="49" width="4" height="11" rx="2" fill="rgba(192,158,100,0.25)" stroke="rgba(192,158,100,0.45)" strokeWidth="0.6"/>

              {/* Sparkle dots */}
              <circle cx="60"  cy="55"  r="1.8" fill="#C09E64" opacity="0.3"/>
              <circle cx="195" cy="80"  r="1.4" fill="#C09E64" opacity="0.35"/>
              <circle cx="50"  cy="145" r="1.2" fill="#C09E64" opacity="0.25"/>
              <circle cx="205" cy="150" r="1.8" fill="#C09E64" opacity="0.3"/>
              <circle cx="80"  cy="175" r="1"   fill="#C09E64" opacity="0.2"/>
              <circle cx="175" cy="40"  r="1"   fill="#C09E64" opacity="0.25"/>

              {/* Small diamond accents at ring intersections */}
              <path d="M130 14 L133 17 L130 20 L127 17 Z" fill="rgba(192,158,100,0.35)"/>
              <path d="M130 200 L133 203 L130 206 L127 203 Z" fill="rgba(192,158,100,0.25)"/>
              <path d="M34 110 L37 113 L34 116 L31 113 Z" fill="rgba(192,158,100,0.2)"/>
              <path d="M226 110 L229 113 L226 116 L223 113 Z" fill="rgba(192,158,100,0.2)"/>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
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
    <div className="esth-carousel-wrap">
      <img
        src={images[idx]}
        alt="résultat traitement"
        className={`esth-carousel-img${fading ? " esth-carousel-img--fade" : ""}`}
      />

      <div className="esth-carousel-gradient" />

      {images.length > 1 && (
        <>
          <button className="esth-carousel-btn esth-carousel-btn--prev" onClick={() => go(-1)} aria-label="Précédent">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="esth-carousel-btn esth-carousel-btn--next" onClick={() => go(1)} aria-label="Suivant">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="esth-carousel-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`esth-carousel-dot${i === idx ? " esth-carousel-dot--active" : ""}`}
                onClick={() => { setFading(true); setTimeout(() => { setIdx(i); setFading(false); }, 220); }}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}

      <div className="esth-carousel-counter">
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
      className={`esth-card${visible ? " esth-card--visible" : ""}${flipped && !isMobile ? " esth-card--flipped" : ""}`}
    >
      <div className="esth-image-col">
        <Carousel images={service.images} />
      </div>

      <div className="esth-text-col">
        <div className="esth-meta">
          <span className="esth-index">{service.index}</span>
          <div className="esth-meta-divider" />
          <span className="esth-tag">{service.tag}</span>
        </div>

        <h2 className="esth-title">{service.title}</h2>

        <div className="esth-subtitle-wrap">
          <div className="esth-accent-bar" />
          <p className="esth-subtitle">{service.subtitle}</p>
        </div>

        <p className="esth-desc">{service.description}</p>

        <a href="/contact" className="esth-cta">
          <span>Prendre rendez-vous</span>
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Esthetique() {
  const isMobile = useIsMobile();

  return (
    <>
      <style>{`
        :root {
          --esth-accent:      #1A3A5C;
          --esth-accent-mid:  #2D5986;
          --esth-accent-line: #4A90C4;
          --esth-accent-lt:   #EBF1F8;
          --esth-text-dark:   #1A1F2E;
          --esth-text-mid:    #6B7380;
          --esth-border:      #D6D9DD;
          --esth-off-white:   #F8F9FA;
        }

        /* ── List wrapper ── */
        .esth-list {
          max-width: 1100px;
          margin: 0 auto;
          padding: 72px 24px 80px;
        }
        @media (max-width: 768px) {
          .esth-list { padding: 48px 16px 60px; }
        }

        /* ── Card ── */
        .esth-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
          margin-bottom: 100px;
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .esth-card:last-child { margin-bottom: 0; }
        .esth-card--visible { opacity: 1; transform: translateY(0); }
        .esth-card--flipped .esth-image-col { order: 2; }
        .esth-card--flipped .esth-text-col  { order: 1; }

        @media (max-width: 768px) {
          .esth-card { grid-template-columns: 1fr; gap: 28px; margin-bottom: 64px; }
        }

        /* ── Carousel ── */
        .esth-carousel-wrap {
          position: relative;
          border-radius: 4px;
          overflow: hidden;
          background: var(--esth-accent-lt);
          box-shadow: 8px 8px 0px var(--esth-accent-lt), 10px 10px 0px var(--esth-border);
        }
        @media (max-width: 768px) {
          .esth-carousel-wrap { box-shadow: 4px 4px 0px var(--esth-accent-lt), 6px 6px 0px var(--esth-border); }
        }
        .esth-carousel-img {
          width: 100%; height: 380px; object-fit: cover; display: block;
          transition: opacity 0.22s ease;
        }
        .esth-carousel-img--fade { opacity: 0; }
        .esth-carousel-gradient {
          position: absolute; bottom: 0; left: 0; right: 0; height: 80px;
          background: linear-gradient(to top, rgba(26,31,46,0.4), transparent);
          pointer-events: none;
        }
        .esth-carousel-btn {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 36px; height: 36px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.12); backdrop-filter: blur(8px);
          color: #fff; display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background 0.18s ease, border-color 0.18s ease; z-index: 2;
        }
        .esth-carousel-btn:hover { background: rgba(255,255,255,0.25); border-color: rgba(255,255,255,0.6); }
        .esth-carousel-btn--prev { left: 12px; }
        .esth-carousel-btn--next { right: 12px; }
        .esth-carousel-dots {
          position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%);
          display: flex; gap: 6px; z-index: 2;
        }
        .esth-carousel-dot {
          width: 5px; height: 5px; border-radius: 50%; border: none;
          background: rgba(255,255,255,0.4); cursor: pointer; padding: 0;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .esth-carousel-dot--active { background: #fff; transform: scale(1.4); }
        .esth-carousel-counter {
          position: absolute; bottom: 14px; right: 14px;
          font-family: 'DM Mono', monospace; font-size: 0.6rem;
          color: rgba(255,255,255,0.6); letter-spacing: 0.1em; z-index: 2;
        }
        @media (max-width: 768px) { .esth-carousel-img { height: 260px; } }

        /* ── Text column ── */
        .esth-text-col { display: flex; flex-direction: column; }
        .esth-meta { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
        .esth-index { font-family: 'DM Mono', monospace; font-size: 0.65rem; color: var(--esth-accent-line); letter-spacing: 0.12em; }
        .esth-meta-divider { flex: 1; max-width: 32px; height: 1px; background: var(--esth-border); }
        .esth-tag {
          font-family: 'DM Mono', monospace; font-size: 0.6rem;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--esth-accent-mid); border: 1px solid var(--esth-border);
          padding: 3px 10px; border-radius: 2px;
        }
        .esth-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 400;
          color: var(--esth-text-dark); margin: 0 0 24px; line-height: 1.2;
        }
        .esth-subtitle-wrap { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 20px; }
        .esth-accent-bar { width: 2px; min-height: 36px; background: var(--esth-accent-line); border-radius: 2px; flex-shrink: 0; margin-top: 2px; }
        .esth-subtitle { font-family: 'DM Sans', sans-serif; font-size: 0.88rem; color: var(--esth-accent-mid); font-style: italic; line-height: 1.6; margin: 0; }
        .esth-desc { font-family: 'DM Sans', sans-serif; font-size: 0.9rem; color: var(--esth-text-mid); line-height: 1.8; margin: 0 0 32px; }
        .esth-cta {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 0.78rem; font-weight: 500;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--esth-accent); text-decoration: none;
          padding-bottom: 6px; border-bottom: 1px solid var(--esth-border);
          align-self: flex-start;
          transition: color 0.18s ease, border-color 0.18s ease, gap 0.18s ease;
        }
        .esth-cta:hover { color: var(--esth-accent-line); border-color: var(--esth-accent-line); gap: 16px; }
        .esth-cta svg { transition: transform 0.18s ease; }
        .esth-cta:hover svg { transform: translateX(4px); }

        /* ── Separator ── */
        .esth-separator {
          width: 100%; height: 1px;
          background: linear-gradient(to right, transparent, var(--esth-border) 30%, var(--esth-border) 70%, transparent);
          margin-bottom: 100px;
        }
        @media (max-width: 768px) { .esth-separator { margin-bottom: 64px; } }
      `}</style>

      <section style={{ background: C.offWhite, fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── Gold Banner ── */}
        <GoldBanner />

        {/* ── Services ── */}
        <div className="esth-list" id="services">
          {services.map((service, i) => (
            <div key={service.title}>
              <ServiceCard
                service={service}
                isMobile={isMobile}
                flipped={i % 2 !== 0}
              />
              {i < services.length - 1 && <div className="esth-separator" />}
            </div>
          ))}
        </div>

      </section>
    </>
  );
}