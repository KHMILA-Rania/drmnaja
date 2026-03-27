import { useState, useEffect, useRef, useCallback } from "react";

const C = {
  white:     "#FFFFFF",
  offWhite:  "#F8F9FA",
  lightGray: "#EEF0F2",
  borderGray:"#D6D9DD",
  textMid:   "#6B7380",
  textDark:  "#1A1F2E",
  accent:    "#1A3A5C",
  accentMid: "#2D5986",
  accentLt:  "#EBF1F8",
  accentLine:"#4A90C4",
  green:     "#2A7A5A",
  greenLt:   "#EAF4EF",
};

function useInView(threshold = 0.06) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Image Carousel ──────────────────────────────────────────────
function ImageCarousel({ images, title, category, number }: {
  images: string[];
  title: string;
  category: string;
  number: string;
}) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasMany = images.length > 1;

  const goTo = useCallback((idx: number) => {
    setCurrent((idx + images.length) % images.length);
  }, [images.length]);

  // Auto-scroll
  useEffect(() => {
    if (!hasMany) return;
    timerRef.current = setTimeout(() => goTo(current + 1), 3000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, hasMany, goTo]);

  const handleDotClick = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (timerRef.current) clearTimeout(timerRef.current);
    goTo(idx);
  };

  const handleArrow = (dir: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (timerRef.current) clearTimeout(timerRef.current);
    goTo(current + dir);
  };

  return (
    <div style={{ position: "relative", height: "190px", overflow: "hidden", background: C.lightGray }}>
      {/* Slides */}
      {images.map((src, i) => (
        <img
          key={src + i}
          src={src}
          alt={`${title} ${i + 1}`}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%", objectFit: "cover",
            opacity: i === current ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(26,31,46,0.55) 0%, rgba(26,31,46,0.1) 55%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* Category tag */}
      <div style={{
        position: "absolute", top: "12px", left: "12px",
        background: C.white,
        border: `1px solid ${C.borderGray}`,
        borderRadius: "4px",
        padding: "3px 10px",
      }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: C.accentMid, letterSpacing: "0.08em" }}>
          {category.toUpperCase()}
        </span>
      </div>

      {/* Number */}
      <div style={{
        position: "absolute", top: "12px", right: "12px",
        fontFamily: "'DM Mono', monospace", fontSize: "0.65rem",
        color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em",
      }}>
        {number} / 03
      </div>

      {/* Arrow buttons — only if multiple images */}
      {hasMany && (
        <>
          <button
            onClick={(e) => handleArrow(-1, e)}
            aria-label="Image précédente"
            style={{
              position: "absolute", left: "8px", top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.20)",
              border: "1px solid rgba(255,255,255,0.35)",
              borderRadius: "50%",
              width: "26px", height: "26px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#fff", padding: 0,
              backdropFilter: "blur(4px)",
              transition: "background 0.18s",
            }}
          >
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => handleArrow(1, e)}
            aria-label="Image suivante"
            style={{
              position: "absolute", right: "8px", top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.20)",
              border: "1px solid rgba(255,255,255,0.35)",
              borderRadius: "50%",
              width: "26px", height: "26px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#fff", padding: 0,
              backdropFilter: "blur(4px)",
              transition: "background 0.18s",
            }}
          >
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {hasMany && (
        <div style={{
          position: "absolute", bottom: "44px", left: "50%",
          transform: "translateX(-50%)",
          display: "flex", gap: "5px",
        }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => handleDotClick(i, e)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === current ? "16px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === current ? "#fff" : "rgba(255,255,255,0.45)",
                border: "none", padding: 0, cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      )}

      {/* Title */}
      <h3 style={{
        position: "absolute", bottom: "14px", left: "16px", right: "16px",
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.15rem", fontWeight: 400,
        color: C.white, lineHeight: 1.25,
        margin: 0,
      }}>
        {title}
      </h3>
    </div>
  );
}

// ── Service type with images array ──────────────────────────────
type Service = {
  id: number;
  number: string;
  title: string;
  description: string;
  tags: string[];
  images: string[];   // ← array now; single image = array of one
  category: string;
};

const SERVICES: Service[] = [
  {
    id: 1,
    number: "01",
    title: "Laser détatouage",
    description: "Le détatouage au laser est une procédure médicale permettant l'élimination progressive et ciblée des pigments du tatouage, avec un suivi clinique rigoureux à chaque séance.",
    tags: ["Détatouage", "Laser Q-Switch"],
    images: ["/img/service1.jpeg", "/img/service11.jpeg", "/img/service111.jfif"],
    category: "Laser",
  },
  {
    id: 2,
    number: "02",
    title: "Traitements Esthétiques",
    description: "Botox, acide hyaluronique et mésothérapie administrés selon des protocoles validés pour un résultat naturel et sécurisé, sous supervision médicale stricte.",
    tags: ["Botox", "Fillers", "Peeling"],
    images: ["/img/service2.jpeg"],   // single image — no carousel shown
    category: "Esthétique",
  },
  {
    id: 3,
    number: "03",
    title: "Correction du sourire",
    description: "Traitement du sourire gingival par injection de toxine botulique — procédure rapide, non chirurgicale, aux résultats précis et durables.",
    tags: ["Sourire gingival", "Botox"],
    images: ["/img/service3.jpeg", "/img/service33.png"],
    category: "Esthétique",
  },
];

// ── ServiceCard ─────────────────────────────────────────────────
function ServiceCard({ service, index, inView }: {
  service: Service;
  index: number;
  inView: boolean;
}) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.white,
        border: `1px solid ${hov ? C.accentLine + "60" : C.borderGray}`,
        borderRadius: "8px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${index * 100}ms, transform 0.5s ease ${index * 100}ms, border-color 0.2s, box-shadow 0.2s`,
        boxShadow: hov ? `0 8px 32px rgba(26,58,92,0.10)` : "0 1px 4px rgba(0,0,0,0.05)",
        cursor: "default",
      }}
    >
      <ImageCarousel
        images={service.images}
        title={service.title}
        category={service.category}
        number={service.number}
      />

      {/* Body */}
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.82rem", lineHeight: 1.7,
          color: C.textMid, flex: 1, margin: 0,
        }}>
          {service.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {service.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.62rem", letterSpacing: "0.06em",
              padding: "4px 10px", borderRadius: "4px",
              background: hov ? C.accentLt : C.lightGray,
              color: hov ? C.accentMid : C.textMid,
              border: `1px solid ${hov ? C.accentLine + "40" : "transparent"}`,
              transition: "all 0.2s",
            }}>
              {tag}
            </span>
          ))}
        </div>

        <div style={{ height: "1px", background: hov ? C.accentLine + "30" : C.borderGray, transition: "background 0.2s" }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#" style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.72rem", fontWeight: 500,
            color: hov ? C.accentMid : C.textMid,
            textDecoration: "none",
            letterSpacing: "0.04em",
            transition: "color 0.2s",
            display: "flex", alignItems: "center", gap: "6px",
          }}>
            En savoir plus
            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              style={{ transform: hov ? "translateX(3px)" : "translateX(0)", transition: "transform 0.2s" }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: "0.6rem",
            color: C.borderGray,
          }}>
            SRV-{service.number}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── CTAButton ───────────────────────────────────────────────────
function CTAButton({ primary, label, icon }: { primary: boolean; label: string; icon?: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.78rem", fontWeight: 500,
        letterSpacing: "0.04em",
        padding: "10px 24px",
        borderRadius: "6px",
        border: `1px solid ${primary ? (hov ? C.accentMid : C.accent) : C.borderGray}`,
        background: primary ? (hov ? C.accentMid : C.accent) : (hov ? C.lightGray : C.white),
        color: primary ? C.white : (hov ? C.textDark : C.textMid),
        cursor: "pointer",
        transition: "all 0.18s ease",
        display: "flex", alignItems: "center", gap: "8px",
        boxShadow: primary && hov ? `0 4px 16px ${C.accent}30` : "none",
        whiteSpace: "nowrap",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

// ── Main Section ────────────────────────────────────────────────
export default function Services() {
  const { ref, inView } = useInView(0.05);

  const stats = [
    { value: "3",    label: "Spécialités" },
    { value: "15+",  label: "Ans d'expérience" },
    { value: "500+", label: "Patients traités" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');

        /* ── Responsive grid ── */
        .srv-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }
        .srv-header-grid {
          display: grid;
          grid-template-columns: minmax(0,1.1fr) minmax(0,1fr);
          gap: 48px;
          align-items: end;
          margin-bottom: 48px;
        }
        .srv-stats {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 20px;
          margin-bottom: 24px;
        }
        .srv-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 24px;
          border-top: 1px solid ${C.borderGray};
          flex-wrap: wrap;
          gap: 12px;
        }
        .srv-bottom-btns {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        /* tablet */
        @media (max-width: 900px) {
          .srv-cards {
            grid-template-columns: repeat(2, 1fr);
          }
          .srv-header-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        /* mobile */
        @media (max-width: 560px) {
          .srv-cards {
            grid-template-columns: 1fr;
          }
          .srv-stats {
            grid-template-columns: repeat(3,1fr);
            gap: 12px;
          }
          .srv-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <section
        ref={ref}
        style={{ background: C.offWhite, padding: "80px 24px" }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* Top bar */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: "48px", paddingBottom: "20px",
            borderBottom: `1px solid ${C.borderGray}`,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(-8px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "3px", height: "20px", background: C.accentLine, borderRadius: "2px" }} />
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: C.textMid, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Nos Services
              </span>
            </div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: C.borderGray, letterSpacing: "0.1em" }}>
              REF-002
            </span>
          </div>

          {/* Header grid */}
          <div className="srv-header-grid">
            <div style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
            }}>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.9rem, 3.2vw, 2.7rem)",
                fontWeight: 400, lineHeight: 1.2,
                color: C.textDark, marginBottom: "14px", marginTop: 0,
              }}>
                Des soins pensés{" "}
                <span style={{ fontStyle: "italic", color: C.accentMid }}>pour chaque peau</span>
              </h2>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.87rem", lineHeight: 1.75,
                color: C.textMid, maxWidth: "440px", margin: 0,
              }}>
                De la dermatologie médicale aux traitements esthétiques avancés — chaque protocole est personnalisé selon votre peau, avec un suivi médical structuré.
              </p>
            </div>

            <div style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s",
            }}>
              <div className="srv-stats">
                {stats.map((s) => (
                  <div key={s.label} style={{ borderLeft: `3px solid ${C.accentLine}`, paddingLeft: "12px" }}>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "1.5rem", fontWeight: 500, color: C.accent, lineHeight: 1, margin: 0 }}>
                      {s.value}
                    </p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.67rem", color: C.textMid, marginTop: "4px", marginBottom: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{
                background: C.accentLt,
                border: `1px solid ${C.accentLine}30`,
                borderRadius: "6px",
                padding: "12px 16px",
                display: "flex", gap: "10px", alignItems: "flex-start",
              }}>
                <svg width="15" height="15" fill="none" stroke={C.accentMid} viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: "1px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: C.accentMid, lineHeight: 1.6, margin: 0 }}>
                  Chaque traitement est précédé d'une consultation médicale approfondie.
                </p>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="srv-cards">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} inView={inView} />
            ))}
          </div>

          {/* Bottom bar */}
          <div className="srv-bottom" style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.5s ease 0.7s, transform 0.5s ease 0.7s",
          }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: C.textMid, margin: 0 }}>
              Besoin d'un conseil personnalisé ?
            </p>
            <div className="srv-bottom-btns">
              <CTAButton primary label="Prendre rendez-vous" icon={
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              } />
              <CTAButton primary={false} label="Tous les services" />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}