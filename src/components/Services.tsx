import { useState, useEffect, useRef } from "react";

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

function useInView(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── Icons ── */
const IconLaser = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);
const IconVascular = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);
const IconTattoo = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);
const IconAcne = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
const IconPigment = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
  </svg>
);
const IconHair = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>
);
const IconArrow = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

/* ── Types ── */
interface Service {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  tags: string[];
  sessions: string;
  desc: string;
}

/* ── Data ── */
const SERVICES: Service[] = [
  {
    icon: <IconLaser />,
    title: "Épilation permanente au laser",
    subtitle: "Laser Diode · Alexandrite · Nd:YAG",
    tags: ["Tous types de peau", "Longue durée"],
    sessions: "7 – 12 séances",
    desc: "Destruction définitive du follicule pileux par thermocoagulation. Résultats visibles dès la 3ème séance, avec 80–85 % de réduction permanente du poil.",
  },
  {
    icon: <IconVascular />,
    title: "Traitement vasculaire au laser",
    subtitle: "Varicosités · Couperose · Angiomes",
    tags: ["Visage & corps", "Non invasif"],
    sessions: "1 – 3 séances",
    desc: "Coagulation sélective des vaisseaux dilatés ou malformés sans altérer la peau environnante. Résultat net et durable.",
  },
  {
    icon: <IconTattoo />,
    title: "Détatouage au laser",
    subtitle: "Laser Q-switched · Picoseconde",
    tags: ["Toutes encres", "Progressive"],
    sessions: "6 – 12 séances",
    desc: "Fragmentation des pigments d'encre en micro-particules éliminées naturellement. Toutes couleurs et tous phototypes traités.",
  },
  {
    icon: <IconAcne />,
    title: "Acné, cicatrices & vergetures",
    subtitle: "Laser Fractionné · Peeling · RF",
    tags: ["Remodelage dermique", "Anti-âge"],
    sessions: "3 – 6 séances",
    desc: "Stimulation du collagène et resurfaçage de la peau pour atténuer séquelles d'acné, cicatrices et vergetures. Peau uniformisée.",
  },
  {
    icon: <IconPigment />,
    title: "Tâches pigmentaires",
    subtitle: "Mélasma · Lentigos · Hyperpigmentation",
    tags: ["Éclat & uniformité", "Précis"],
    sessions: "3 – 8 séances",
    desc: "Photolyse des agrégats de mélanine responsables des tâches. Teint unifié et lumineux avec un protocole personnalisé.",
  },
  {
    icon: <IconHair />,
    title: "Greffe de cheveux",
    subtitle: "Technique FUE · Micro-greffes",
    tags: ["Naturel", "Permanent"],
    sessions: "1 intervention",
    desc: "Transplantation folliculaire unité par unité pour un résultat indétectable. Repousse définitive et densité reconstituée.",
  },
];

/* ── Service Card ── */
function ServiceCard({ service, index, inView }: { service: Service; index: number; inView: boolean }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? C.white : C.offWhite,
        border: `1px solid ${hov ? C.accentLine + "60" : C.borderGray}`,
        borderRadius: "8px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        cursor: "default",
        transition: "all 0.22s ease",
        boxShadow: hov ? `0 8px 28px ${C.accent}12` : "none",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transitionProperty: "background, border, box-shadow, opacity, transform",
        transitionDuration: `0.22s, 0.22s, 0.22s, 0.5s, 0.5s`,
        transitionTimingFunction: "ease",
        transitionDelay: `0s, 0s, 0s, ${index * 75}ms, ${index * 75}ms`,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
        <div style={{
          width: "40px", height: "40px", borderRadius: "8px",
          background: hov ? C.accentLine + "18" : C.accentLt,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: C.accentMid, flexShrink: 0,
          transition: "background 0.22s",
        }}>
          {service.icon}
        </div>
        {/* Sessions badge */}
        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.6rem",
          letterSpacing: "0.08em",
          color: C.accentMid,
          background: C.accentLt,
          border: `1px solid ${C.accentLine}40`,
          borderRadius: "4px",
          padding: "3px 8px",
          whiteSpace: "nowrap",
        }}>
          {service.sessions}
        </div>
      </div>

      {/* Title & subtitle */}
      <div>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1rem",
          fontWeight: 600,
          color: C.textDark,
          margin: 0,
          lineHeight: 1.35,
        }}>
          {service.title}
        </p>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.72rem",
          color: C.textMid,
          marginTop: "3px",
          marginBottom: 0,
        }}>
          {service.subtitle}
        </p>
      </div>

      {/* Description */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.8rem",
        color: C.textMid,
        lineHeight: 1.7,
        margin: 0,
        flexGrow: 1,
      }}>
        {service.desc}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
        {service.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.65rem",
            fontWeight: 500,
            color: C.green,
            background: C.greenLt,
            border: `1px solid ${C.green}30`,
            borderRadius: "3px",
            padding: "2px 8px",
            letterSpacing: "0.02em",
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Footer link */}
      <div style={{
        borderTop: `1px solid ${C.borderGray}`,
        paddingTop: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <button style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.72rem",
          fontWeight: 500,
          color: hov ? C.accentMid : C.textMid,
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          transition: "color 0.18s",
        }}>
          En savoir plus
          <span style={{
            display: "inline-flex",
            transform: hov ? "translateX(3px)" : "translateX(0)",
            transition: "transform 0.18s ease",
          }}>
            <IconArrow />
          </span>
        </button>
        <button style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.7rem",
          fontWeight: 500,
          color: C.white,
          background: hov ? C.accentMid : C.accent,
          border: "none",
          borderRadius: "5px",
          padding: "6px 14px",
          cursor: "pointer",
          transition: "background 0.18s",
          whiteSpace: "nowrap",
        }}>
          Rendez-vous
        </button>
      </div>
    </div>
  );
}

/* ── Main Component ── */
export default function Services() {
  const { ref, inView } = useInView(0.05);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');

        .svc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 960px) {
          .svc-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 580px) {
          .svc-grid { grid-template-columns: 1fr; }
          .svc-section { padding: 48px 16px !important; }
        }
      `}</style>

      <section
        ref={ref}
        className="svc-section"
        style={{
          background: C.white,
          padding: "80px 24px",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* ── Top bar ── */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "48px",
            paddingBottom: "20px",
            borderBottom: `1px solid ${C.borderGray}`,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(-8px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "3px", height: "20px", background: C.accentLine, borderRadius: "2px" }} />
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.7rem",
                color: C.textMid,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}>
                Traitements & Soins
              </span>
            </div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: C.borderGray, letterSpacing: "0.1em" }}>
              REF-002
            </span>
          </div>

          {/* ── Heading ── */}
          <div style={{
            maxWidth: "600px",
            marginBottom: "40px",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.55s ease 0.1s, transform 0.55s ease 0.1s",
          }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              fontWeight: 400,
              color: C.textDark,
              lineHeight: 1.25,
              marginBottom: "12px",
              marginTop: 0,
            }}>
              Des soins{" "}
              <span style={{ fontStyle: "italic", color: C.accentMid }}>laser & esthétiques</span>
              <br />adaptés à chaque patient
            </h2>
            <p style={{
              fontSize: "0.88rem",
              color: C.textMid,
              lineHeight: 1.75,
              margin: 0,
            }}>
              Chaque protocole est établi lors d'une consultation médicale approfondie.
              Nos équipements laser de dernière génération permettent de traiter tous les phototypes en toute sécurité.
            </p>
          </div>

          {/* ── Grid ── */}
          <div className="svc-grid">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} inView={inView} />
            ))}
          </div>

          {/* ── Bottom CTA ── */}
          <div style={{
            marginTop: "40px",
            paddingTop: "32px",
            borderTop: `1px solid ${C.borderGray}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            opacity: inView ? 1 : 0,
            transition: "opacity 0.5s ease 0.6s",
          }}>
            <div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 500,
                color: C.textDark,
                margin: 0,
              }}>
                Vous ne savez pas quel traitement vous convient ?
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.78rem",
                color: C.textMid,
                marginTop: "3px",
                marginBottom: 0,
              }}>
                Le Dr. Mnaja vous oriente lors d'une consultation diagnostique personnalisée.
              </p>
            </div>
            <button style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.78rem",
              fontWeight: 500,
              letterSpacing: "0.04em",
              padding: "10px 22px",
              borderRadius: "6px",
              border: `1px solid ${C.accent}`,
              background: C.accent,
              color: C.white,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              whiteSpace: "nowrap",
            }}>
              Prendre rendez-vous
              <IconArrow />
            </button>
          </div>

        </div>
      </section>
    </>
  );
}