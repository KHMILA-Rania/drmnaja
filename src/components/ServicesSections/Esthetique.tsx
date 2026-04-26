import { useState, useEffect } from "react";

const C = {
  white: "#FFFFFF",
  offWhite: "#F8F9FA",
  lightGray: "#EEF0F2",
  borderGray: "#D6D9DD",
  textMid: "#6B7380",
  textDark: "#1A1F2E",
  accent: "#1A3A5C",
  accentMid: "#2D5986",
  accentLt: "#EBF1F8",
  accentLine: "#4A90C4",
};

type Service = {
  title: string;
  description: string;
  images: string[];
  subtitle: string;
  tag: string;
};

const services: Service[] = [
  {
    title: "Lip Filler",
    description:
      "Les lip fillers sont des injections esthétiques destinées à augmenter le volume des lèvres, à en améliorer la forme et à lisser les rides superficielles autour de la bouche. Réalisées avec de l'acide hyaluronique, elles offrent un résultat naturel et temporaire, permettant de redessiner les contours et de sublimer le sourire en toute sécurité, avec un temps de récupération minimal.",
    images: ["/img/lipfiller1.jpeg", "/img/lipfiller2.jpeg"],
    subtitle:
      "Augmentation du volume des lèvres avec un rendu naturel et harmonieux",
    tag: "Lip filler",
  },
  {
    title: "Botox Front",
    description:
      "Le Botox du front est un traitement esthétique visant à lisser les rides horizontales et à prévenir leur apparition. Grâce à de petites injections de toxine botulinique, les muscles responsables des rides se relâchent, offrant un front plus lisse et un regard rajeuni. Le geste est rapide, sûr, et le résultat naturel apparaît en quelques jours avec un effet temporaire généralement de 3 à 6 mois.",
    images: ["/img/botoxf1.jpeg", "/img/botoxf2.jpeg"],
    subtitle: "Atténuation des rides du front pour un visage reposé et rajeuni.",
    tag: "Botox",
  },
  {
    title: "Correction Ovale du Visage",
    description:
      "La correction de l'ovale du visage est une intervention ou un traitement esthétique visant à redéfinir les contours du visage et à harmoniser la mâchoire, les joues et le menton. Elle peut être réalisée par injections (acide hyaluronique, Botox) ou par chirurgie légère pour lifter et restructurer la zone. Le résultat apporte un visage plus ferme, symétrique et rajeuni, avec un aspect naturel.",
    images: ["/img/correction1.jpeg"],
    subtitle:
      "Redéfinition des contours du visage pour un effet lifté sans chirurgie.",
    tag: "Correction de visage",
  },
];

// ─── RESPONSIVE HOOK ────────────────────────────────────
function useIsMobile(breakpoint = 700) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

export default function Esthetique() {
  const isMobile = useIsMobile();

  return (
    <section
      style={{ background: C.offWhite, fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Banner ── */}
      <div
        style={{
          background: `linear-gradient(120deg, ${C.accentLine} 0%, ${C.accentMid} 100%)`,
          padding: isMobile ? "52px 20px" : "80px 24px",
          color: "white",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              opacity: 0.7,
            }}
          >
            Médecine esthétique
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.6rem, 5vw, 3rem)",
              fontWeight: 400,
              margin: "8px 0 12px",
            }}
          >
            Visage & Esthétique
          </h1>
          <p style={{ maxWidth: "500px", opacity: 0.85, margin: 0 }}>
            Des traitements sur mesure pour sublimer les traits du visage avec
            précision et naturel.
          </p>
        </div>
      </div>

      {/* ── Services List ── */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: isMobile ? "36px 16px" : "60px 24px",
        }}
      >
        {services.map((service, idx) => (
          <div
            key={service.title}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "24px" : "48px",
              alignItems: "center",
              marginBottom: isMobile ? "52px" : "72px",
            }}
          >
            {/* Image side — always on top on mobile; alternates on desktop */}
            <div style={{ order: isMobile ? 0 : idx % 2 !== 0 ? 1 : 0 }}>
              <ImageCard images={service.images} isMobile={isMobile} />
            </div>

            {/* Text side */}
            <div style={{ order: isMobile ? 1 : idx % 2 !== 0 ? 0 : 1 }}>
              <span
                style={{
                  fontSize: "0.65rem",
                  border: `1px solid ${C.accentLine}`,
                  color: C.accentMid,
                  padding: "3px 10px",
                  borderRadius: "20px",
                  fontFamily: "monospace",
                  letterSpacing: "0.1em",
                }}
              >
                {service.tag}
              </span>

              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: isMobile ? "1.35rem" : "1.6rem",
                  color: C.textDark,
                  margin: "12px 0 8px",
                  fontWeight: 400,
                }}
              >
                {service.title}
              </h2>

              <p
                style={{
                  color: C.accentLine,
                  fontStyle: "italic",
                  fontSize: "0.88rem",
                  marginBottom: "14px",
                }}
              >
                {service.subtitle}
              </p>

              <p
                style={{
                  color: C.textMid,
                  lineHeight: 1.75,
                  fontSize: "0.92rem",
                  marginBottom: "24px",
                }}
              >
                {service.description}
              </p>

              {/* ── CTA Button ── */}
              <a
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: C.accent,
                  color: "white",
                  textDecoration: "none",
                  padding: isMobile ? "12px 20px" : "13px 24px",
                  borderRadius: "6px",
                  fontSize: "0.88rem",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  transition: "background 0.2s ease",
                  width: isMobile ? "100%" : "auto",
                  justifyContent: isMobile ? "center" : "flex-start",
                  boxSizing: "border-box",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.background =
                    C.accentMid)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.background =
                    C.accent)
                }
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z" />
                </svg>
                Prendre rendez-vous
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── IMAGE CARD ─────────────────────────────────────────
function ImageCard({
  images,
  isMobile,
}: {
  images: string[];
  isMobile: boolean;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [images.length]);

  const go = (dir: number) =>
    setIndex((prev) => (prev + dir + images.length) % images.length);

  const btnStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(255,255,255,0.85)",
    border: "none",
    borderRadius: "50%",
    width: isMobile ? "36px" : "32px",
    height: isMobile ? "36px" : "32px",
    cursor: "pointer",
    fontSize: "1.1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#1A1F2E",
    boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
  };

  return (
    <div
      style={{
        borderRadius: "8px",
        overflow: "hidden",
        border: `1px solid ${C.borderGray}`,
        position: "relative",
      }}
    >
      <img
        src={images[index]}
        alt="résultat"
        style={{
          width: "100%",
          height: isMobile ? "240px" : "300px",
          objectFit: "cover",
          transition: "opacity 0.4s ease",
          display: "block",
        }}
      />

      {images.length > 1 && (
        <>
          <button onClick={() => go(-1)} style={{ ...btnStyle, left: 10 }}>
            ‹
          </button>
          <button onClick={() => go(1)} style={{ ...btnStyle, right: 10 }}>
            ›
          </button>

          <div
            style={{
              position: "absolute",
              bottom: 10,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 6,
            }}
          >
            {images.map((_, i) => (
              <span
                key={i}
                onClick={() => setIndex(i)}
                style={{
                  width: isMobile ? 8 : 6,
                  height: isMobile ? 8 : 6,
                  borderRadius: "50%",
                  background:
                    i === index ? "white" : "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  display: "block",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}