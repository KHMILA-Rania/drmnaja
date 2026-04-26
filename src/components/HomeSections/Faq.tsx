import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

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

type FAQItem = {
  id: number;
  number: string;
  question: string;
  answer: string;
  category: string;
};

const FAQS: FAQItem[] = [
  {
    id: 1,
    number: "01",
    question: "Comment se déroule une première consultation ?",
    answer: "La première consultation est une étape essentielle. Le médecin effectue un bilan cutané complet, évalue vos attentes et vous propose un protocole personnalisé. Elle dure environ 30 à 45 minutes et ne comporte aucun engagement thérapeutique.",
    category: "Consultation",
  },
  {
    id: 2,
    number: "02",
    question: "Le détatouage au laser est-il douloureux ?",
    answer: "La sensation est comparable à un léger claquement d'élastique sur la peau. Un gel anesthésiant topique est appliqué avant chaque séance pour maximiser votre confort. La durée d'une séance varie de 5 à 20 minutes selon la taille du tatouage.",
    category: "Laser",
  },
  {
    id: 3,
    number: "03",
    question: "Combien de séances sont nécessaires pour un détatouage ?",
    answer: "Le nombre de séances dépend de plusieurs facteurs : la taille, les couleurs, l'ancienneté du tatouage et le type de peau. En moyenne, il faut entre 6 et 12 séances espacées de 6 à 8 semaines pour obtenir une élimination satisfaisante.",
    category: "Laser",
  },
  {
    id: 4,
    number: "04",
    question: "Quels sont les effets du botox et combien de temps durent-ils ?",
    answer: "Le botox détend les muscles responsables des rides d'expression. Les résultats apparaissent en 3 à 7 jours et durent généralement 4 à 6 mois. La procédure est rapide (15 à 20 minutes) et ne nécessite aucune période de récupération.",
    category: "Esthétique",
  },
  {
    id: 5,
    number: "05",
    question: "Y a-t-il des contre-indications aux traitements esthétiques ?",
    answer: "Certaines conditions médicales, grossesses ou traitements en cours peuvent représenter des contre-indications. C'est précisément pourquoi une consultation médicale préalable est systématiquement requise avant tout traitement.",
    category: "Sécurité",
  },
  {
    id: 6,
    number: "06",
    question: "Comment prendre rendez-vous ?",
    answer: "Vous pouvez prendre rendez-vous directement via notre formulaire en ligne, par téléphone ou en vous présentant à la clinique. Nous vous recontacterons dans les 24 heures pour confirmer votre créneau.",
    category: "Pratique",
  },
];

// Category color accent map
const CATEGORY_STYLE: Record<string, { bg: string; color: string }> = {
  Consultation: { bg: C.accentLt,                 color: C.accentMid },
  Laser:        { bg: "#EFF6FF",                   color: "#1D4ED8"   },
  Esthétique:   { bg: C.greenLt,                   color: C.green     },
  Sécurité:     { bg: "#FEF9EC",                   color: "#92620A"   },
  Pratique:     { bg: C.lightGray,                 color: C.textMid   },
};

function FAQAccordion({ item, index, inView }: {
  item: FAQItem;
  index: number;
  inView: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [hov, setHov] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(open ? bodyRef.current.scrollHeight : 0);
    }
  }, [open]);

  const catStyle = CATEGORY_STYLE[item.category] ?? { bg: C.lightGray, color: C.textMid };

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.white,
        border: `1px solid ${open ? C.accentLine + "80" : hov ? C.accentLine + "40" : C.borderGray}`,
        borderRadius: "8px",
        overflow: "hidden",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms, border-color 0.2s, box-shadow 0.2s`,
        boxShadow: open
          ? `0 8px 32px rgba(26,58,92,0.10)`
          : hov
          ? `0 4px 16px rgba(26,58,92,0.06)`
          : "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      {/* Header row */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          padding: "20px 24px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        {/* Number */}
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.62rem",
          color: open ? C.accentLine : C.borderGray,
          letterSpacing: "0.1em",
          flexShrink: 0,
          transition: "color 0.2s",
        }}>
          {item.number}
        </span>

        {/* Question */}
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
          fontWeight: 400,
          color: open ? C.textDark : hov ? C.textDark : C.textDark,
          lineHeight: 1.35,
          flex: 1,
        }}>
          {item.question}
        </span>

        {/* Category tag */}
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.58rem",
          letterSpacing: "0.07em",
          padding: "3px 9px",
          borderRadius: "4px",
          background: catStyle.bg,
          color: catStyle.color,
          border: `1px solid ${catStyle.color}25`,
          flexShrink: 0,
          display: "none", // shown via CSS on wider screens
        }}
          className="faq-tag"
        >
          {item.category.toUpperCase()}
        </span>

        {/* Chevron */}
        <div style={{
          flexShrink: 0,
          width: "28px", height: "28px",
          borderRadius: "50%",
          background: open ? C.accent : hov ? C.lightGray : "transparent",
          border: `1px solid ${open ? C.accent : C.borderGray}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.25s ease",
        }}>
          <svg
            width="12" height="12" fill="none" stroke={open ? C.white : C.textMid}
            viewBox="0 0 24 24"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Animated body */}
      <div style={{
        height: `${height}px`,
        overflow: "hidden",
        transition: "height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
        <div ref={bodyRef}>
          <div style={{
            padding: "0 24px 24px 24px",
            paddingLeft: "calc(24px + 28px + 16px)", // align with question text
          }}>
            <div style={{ height: "1px", background: C.lightGray, marginBottom: "16px" }} />
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.83rem",
              lineHeight: 1.75,
              color: C.textMid,
              margin: 0,
            }}>
              {item.answer}
            </p>

            {/* Bottom tag + ref row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "16px" }}>
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.07em",
                padding: "3px 9px",
                borderRadius: "4px",
                background: catStyle.bg,
                color: catStyle.color,
                border: `1px solid ${catStyle.color}25`,
              }}>
                {item.category.toUpperCase()}
              </span>
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.6rem",
                color: C.borderGray,
              }}>
                FAQ-{item.number}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CTAButton (copied from Services) ───────────────────────────
function CTAButton({ primary, label, icon }: { primary: boolean; label: string; icon?: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <Link 
    to="contact"
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
    </Link>
  );
}

// ── Main Component ──────────────────────────────────────────────
export default function FAQ() {
  const { ref, inView } = useInView(0.05);

  const stats = [
    { value: "6",    label: "Questions fréquentes" },
    { value: "24h",  label: "Délai de réponse" },
    { value: "100%", label: "Suivi médical" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');

        .faq-header-grid {
          display: grid;
          grid-template-columns: minmax(0,1.1fr) minmax(0,1fr);
          gap: 48px;
          align-items: end;
          margin-bottom: 48px;
        }
        .faq-stats {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 20px;
          margin-bottom: 24px;
        }
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 40px;
        }
        .faq-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 24px;
          border-top: 1px solid ${C.borderGray};
          flex-wrap: wrap;
          gap: 12px;
        }
        .faq-bottom-btns {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        @media (min-width: 700px) {
          .faq-tag { display: inline-block !important; }
        }
        @media (max-width: 900px) {
          .faq-header-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
        @media (max-width: 560px) {
          .faq-stats {
            grid-template-columns: repeat(3,1fr);
            gap: 12px;
          }
          .faq-bottom {
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
                Questions Fréquentes
              </span>
            </div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: C.borderGray, letterSpacing: "0.1em" }}>
              REF-003
            </span>
          </div>

          {/* Header grid */}
          <div className="faq-header-grid">
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
                Vos questions,{" "}
                <span style={{ fontStyle: "italic", color: C.accentMid }}>nos réponses claires</span>
              </h2>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.87rem", lineHeight: 1.75,
                color: C.textMid, maxWidth: "440px", margin: 0,
              }}>
                Retrouvez les réponses aux interrogations les plus fréquentes sur nos traitements, nos protocoles et notre prise en charge médicale.
              </p>
            </div>

            <div style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s",
            }}>
              <div className="faq-stats">
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: C.accentMid, lineHeight: 1.6, margin: 0 }}>
                  Vous ne trouvez pas votre réponse ? Contactez-nous directement pour un conseil personnalisé.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ accordion list */}
          <div className="faq-list">
            {FAQS.map((item, i) => (
              <FAQAccordion key={item.id} item={item} index={i} inView={inView} />
            ))}
          </div>

          {/* Bottom bar */}
          <div className="faq-bottom" style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.5s ease 0.7s, transform 0.5s ease 0.7s",
          }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: C.textMid, margin: 0 }}>
              Une question non listée ? Nous sommes disponibles.
            </p>
            <div className="faq-bottom-btns">
              <CTAButton primary label="Nous contacter" icon={
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              } />
              <CTAButton primary={false} label="Prendre rendez-vous" />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}