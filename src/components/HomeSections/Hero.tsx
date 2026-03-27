import { useState, useEffect } from "react";

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
};

// ─── Cycling word ─────────────────────────────────────────────────────────────
const WORDS = ["éclatante", "saine", "protégée", "rayonnante"];

function CyclingWord() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(i => (i + 1) % WORDS.length);
        setVisible(true);
      }, 350);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <span style={{
      color: C.white,
      fontStyle: "italic",
      display: "inline-block",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(-8px)",
      transition: "opacity 0.35s ease, transform 0.35s ease",
    }}>
      {WORDS[index]}
    </span>
  );
}

// ─── Decorative leaf ──────────────────────────────────────────────────────────
function Leaf({ size, style }: { size: number; style: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"
      style={{ position: "absolute", pointerEvents: "none", ...style }}>
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-5 8Z" />
    </svg>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [hovBook, setHovBook] = useState(false);
  const [hovDiscover, setHovDiscover] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const reveal = (delay: number): React.CSSProperties => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  });

  // ── Replace "/img/hero-placeholder.jpg" with your real image path ──
  const BG_IMAGE = "/img/bg.jpg";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');

        @keyframes float-slow {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-14px) rotate(6deg); }
        }
        @keyframes float-slower {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-8px) rotate(-4deg); }
        }
        @keyframes scrollDot {
          0%   { transform: translateY(0);    opacity: 1; }
          80%  { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0);    opacity: 0; }
        }
        @keyframes grain {
          0%,100% { transform: translate(0,0);    }
          10%      { transform: translate(-2%,-3%); }
          30%      { transform: translate(3%,-1%);  }
          50%      { transform: translate(-1%,2%);  }
          70%      { transform: translate(2%,3%);   }
          90%      { transform: translate(-3%,1%);  }
        }

        .h-leaf-1 { animation: float-slow   6s ease-in-out infinite; }
        .h-leaf-2 { animation: float-slower 8s ease-in-out infinite 1.2s; }

        /* Grain texture on top of everything */
        .hero-wrap::before {
          content: '';
          position: absolute; inset: -50%;
          width: 200%; height: 200%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.028'/%3E%3C/svg%3E");
          animation: grain 8s steps(10) infinite;
          pointer-events: none;
          z-index: 3;
        }

        .hero-cta-row {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        @media (max-width: 540px) {
          .h-float { display: none; }
          .hero-cta-row { flex-direction: column; align-items: stretch; }
          .hero-cta-row button { width: 100%; justify-content: center; }
        }
      `}</style>

      <section
        className="hero-wrap"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "120px 24px 100px",
          overflow: "hidden",
        }}
      >

        {/* ── Background image with blur ── */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${BG_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(3px)",
          transform: "scale(1.05)", // prevents blur edge bleed
          zIndex: 0,
        }} />

        {/* ── Blue overlay: two layers for depth ── */}
        {/* Base navy layer */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: `${C.accentMid}B0`,  // ~69% opacity navy
          zIndex: 1,
        }} />
        {/* Accent blue gradient on top */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(
            135deg,
            ${C.accentMid}55 0%,
            ${C.accent}00 50%,
            ${C.accentLine}30 100%
          )`,
          zIndex: 1,
        }} />
        {/* Vignette for depth */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(26,31,46,0.45) 100%)",
          zIndex: 1,
        }} />

        {/* ── Floating botanical illustrations ── */}
        <div className="h-leaf-1 h-float" style={{ position: "absolute", top: "12%", right: "8%", zIndex: 2 }}>
          <div style={{
            width: "100px", height: "100px", borderRadius: "50%",
            background: "rgba(255,255,255,0.10)",
            border: "1px solid rgba(255,255,255,0.20)",
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(6px)",
          }}>
            <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-5 8Z"
                fill="rgba(255,255,255,0.65)" />
              <circle cx="8" cy="9" r="2.5" fill="rgba(255,255,255,0.2)" />
            </svg>
          </div>
        </div>

        <div className="h-leaf-2 h-float" style={{ position: "absolute", bottom: "18%", left: "7%", zIndex: 2 }}>
          <div style={{
            width: "72px", height: "72px", borderRadius: "10px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.18)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transform: "rotate(10deg)",
            backdropFilter: "blur(6px)",
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-5 8Z"
                fill="rgba(255,255,255,0.55)" />
            </svg>
          </div>
        </div>

        <Leaf size={80} style={{ top: "22%",   left: "4%",   color: "rgba(255,255,255,0.10)", opacity: 1, zIndex: 2 }} />
        <Leaf size={48} style={{ bottom: "22%", right: "5%",  color: "rgba(255,255,255,0.10)", opacity: 1, transform: "rotate(180deg)", zIndex: 2 }} />

        {/* ── Content ── */}
        <div style={{
          position: "relative", zIndex: 4,
          display: "flex", flexDirection: "column", alignItems: "center",
          textAlign: "center", maxWidth: "760px", width: "100%",
        }}>

          {/* Label */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "5px 14px", borderRadius: "4px",
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.25)",
            backdropFilter: "blur(8px)",
            marginBottom: "32px",
            ...reveal(80),
          }}>
            <div style={{ width: "3px", height: "14px", background: C.accentLine, borderRadius: "2px" }} />
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.65rem", color: "rgba(255,255,255,0.85)",
              letterSpacing: "0.18em", textTransform: "uppercase",
            }}>
              Cabinet de Dermatologie · Tunis
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.8rem, 6.5vw, 5rem)",
            fontWeight: 400,
            color: C.white,
            lineHeight: 1.12,
            margin: "0 0 28px",
            textShadow: "0 2px 24px rgba(26,31,46,0.3)",
            ...reveal(180),
          }}>
            Votre peau mérite<br />d'être <CyclingWord />
          </h1>

          {/* Ornament */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px", ...reveal(260) }}>
            <div style={{ width: "48px", height: "1px", background: "rgba(255,255,255,0.3)" }} />
            <svg width="13" height="13" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-5 8Z" />
            </svg>
            <div style={{ width: "48px", height: "1px", background: "rgba(255,255,255,0.3)" }} />
          </div>

          {/* Subtitle */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.92rem", lineHeight: 1.8,
            color: "rgba(255,255,255,0.78)", maxWidth: "500px", margin: "0 0 40px",
            ...reveal(320),
          }}>
            Des soins dermatologiques personnalisés alliant expertise médicale
            et techniques esthétiques avancées — pour une peau saine, lumineuse
            et pleinement épanouie.
          </p>

          {/* CTAs */}
          <div className="hero-cta-row" style={{ marginBottom: "48px", width: "100%", ...reveal(400) }}>
            <button
              onMouseEnter={() => setHovBook(true)}
              onMouseLeave={() => setHovBook(false)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.78rem", fontWeight: 500,
                letterSpacing: "0.05em",
                padding: "13px 30px", borderRadius: "6px",
                border: `1px solid ${hovBook ? C.accentLine : C.accentLine + "90"}`,
                background: hovBook ? C.accentLine : C.accentMid,
                color: C.white, cursor: "pointer",
                transition: "all 0.18s ease",
                display: "flex", alignItems: "center", gap: "8px",
                boxShadow: hovBook ? `0 6px 28px rgba(74,144,196,0.45)` : `0 4px 16px rgba(26,58,92,0.35)`,
                whiteSpace: "nowrap",
              }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Prendre rendez-vous
            </button>

            <button
              onMouseEnter={() => setHovDiscover(true)}
              onMouseLeave={() => setHovDiscover(false)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.78rem", fontWeight: 500,
                letterSpacing: "0.05em",
                padding: "13px 30px", borderRadius: "6px",
                border: `1px solid ${hovDiscover ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)"}`,
                background: hovDiscover ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.10)",
                color: C.white,
                backdropFilter: "blur(8px)",
                cursor: "pointer", transition: "all 0.18s ease",
                display: "flex", alignItems: "center", gap: "8px",
                whiteSpace: "nowrap",
              }}
            >
              Découvrir nos soins
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {/* Trust line */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", ...reveal(480) }}>
            <div style={{ display: "flex" }}>
              {["S","M","A","L"].map((l, i) => (
                <div key={i} style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  background: i % 2 === 0 ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.10)",
                  border: "2px solid rgba(255,255,255,0.25)",
                  marginLeft: i === 0 ? 0 : "-9px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'DM Mono', monospace", fontSize: "0.58rem",
                  color: C.white, fontWeight: 500,
                  backdropFilter: "blur(4px)",
                }}>
                  {l}
                </div>
              ))}
            </div>
            <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.25)" }} />
            <div style={{ display: "flex", gap: "2px" }}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={C.accentLine}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.75)" }}>
              <span style={{ color: C.white, fontWeight: 500 }}>+500</span> patients satisfaits
            </span>
          </div>

        </div>

        {/* ── Scroll indicator ── */}
        <div style={{
          position: "absolute", bottom: "32px", left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
          opacity: loaded ? 0.7 : 0,
          transition: "opacity 0.6s ease 1.2s",
          zIndex: 4,
        }}>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.58rem", color: "rgba(255,255,255,0.7)",
            letterSpacing: "0.22em", textTransform: "uppercase",
          }}>
            Défiler
          </span>
          <div style={{
            width: "20px", height: "32px", borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.30)",
            display: "flex", alignItems: "flex-start", justifyContent: "center",
            paddingTop: "5px",
          }}>
            <div style={{
              width: "4px", height: "8px", borderRadius: "2px",
              background: C.accentLine,
              animation: "scrollDot 1.8s ease-in-out infinite",
            }} />
          </div>
        </div>

      </section>
    </>
  );
}