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
    title: "Détatouage",
    description:
      "Le détatouage laser est une technique non invasive qui utilise des impulsions lumineuses à haute intensité pour fragmenter les pigments d'encre dans la peau. Au fil des séances, l'organisme élimine naturellement ces particules, permettant d'estomper puis de faire disparaître le tatouage. Cette méthode est précise, efficace sur la plupart des couleurs et vise à minimiser les risques de cicatrices lorsqu'elle est réalisée par des professionnels qualifiés.",
    images: ["/img/laser1.jpeg", "/img/laser2.jpeg"],
    subtitle:
      "Effacez vos tatouages en toute sécurité grâce à la technologie laser avancée",
    tag: "Laser",
  },
  {
    title: "FOTODERMA Laser Co2 Fractolite Multifonction",
    description:
      "Cette plateforme laser CO₂ multifonction offre une solution complète regroupant des traitements esthétiques, dermatologiques et gynécologiques. Grâce à ses différents modes (fractionné, ablatif et gynécologique), elle permet de rajeunir la peau, traiter les imperfections cutanées et améliorer le bien-être intime. Polyvalente et performante, elle agit en profondeur pour stimuler la régénération des tissus, tout en garantissant précision, sécurité et résultats durables.",
    images: [
      "/img/fracto7.jpeg",
      "/img/fracto1.png",
      "/img/fracto2.png",
      "/img/fracto3.png",
    ],
    subtitle:
      "Une technologie complète pour l'esthétique, la dermatologie et le bien-être intime",
    tag: "Laser",
  },
  {
    title: "Epilation",
    description:
      "L'épilation laser est une méthode durable qui utilise un faisceau lumineux pour cibler et détruire le follicule pileux à la racine. Au fil des séances, la repousse des poils est fortement réduite, laissant la peau plus lisse et nette. Cette technique est précise, adaptée à différentes zones du corps et offre des résultats durables lorsqu'elle est réalisée par des professionnels qualifiés.",
    images: ["/img/epilation1.jpeg", "/img/epilation2.jpeg"],
    subtitle: "Une peau douce durablement grâce à l'épilation laser.",
    tag: "Laser-épilation",
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

export default function Laser() {
  const isMobile = useIsMobile();

  return (
    <section
      style={{ background: C.offWhite, fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Banner ── */}
      <div
        style={{
          background: `linear-gradient(120deg, ${C.accent} 0%, ${C.accentMid} 100%)`,
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
            {/* Image side — on mobile always on top; on desktop alternate */}
            <div
              style={{
                order: isMobile ? 0 : idx % 2 !== 0 ? 1 : 0,
              }}
            >
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