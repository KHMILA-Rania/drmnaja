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

function useInView(threshold = 0.1) {
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

function StatCard({ value, label, delay, inView }: { value: string; label: string; delay: number; inView: boolean }) {
  return (
    <div style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(12px)",
      transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      borderLeft: `3px solid ${C.accentLine}`,
      paddingLeft: "16px",
    }}>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "1.75rem", fontWeight: 500, color: C.accent, lineHeight: 1, margin: 0 }}>
        {value}
      </p>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: C.textMid, marginTop: "4px", marginBottom: 0, textTransform: "uppercase", letterSpacing: "0.1em" }}>
        {label}
      </p>
    </div>
  );
}

function CredentialRow({ icon, text, sub,  inView }: { icon: React.ReactNode; text: string; sub: string; delay: number; inView: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "12px 16px",
        borderRadius: "6px",
        background: hov ? C.accentLt : "transparent",
        border: `1px solid ${hov ? C.accentLine + "50" : "transparent"}`,
        transition: "all 0.2s ease",
        cursor: "default",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-10px)",
      }}
    >
      <div style={{
        width: "36px", height: "36px", borderRadius: "6px",
        background: hov ? C.accentLine + "20" : C.lightGray,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: C.accentMid, flexShrink: 0, transition: "background 0.2s",
      }}>
        {icon}
      </div>
      <div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", fontWeight: 500, color: C.textDark, margin: 0 }}>{text}</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: C.textMid, marginTop: "1px", marginBottom: 0 }}>{sub}</p>
      </div>
    </div>
  );
}


function SpecialtyTag({ label, inView }: { label: string; index: number; inView: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.72rem",
        fontWeight: 500,
        padding: "5px 12px",
        borderRadius: "4px",
        border: `1px solid ${hov ? C.accentLine : C.borderGray}`,
        color: hov ? C.accentMid : C.textMid,
        background: hov ? C.accentLt : C.white,
        cursor: "default",
        transition: "all 0.18s ease",
        letterSpacing: "0.03em",
        opacity: inView ? 1 : 0,
        transform: inView ? "scale(1)" : "scale(0.95)",
      }}
    >
      {label}
    </span>
  );
}

function CTAButton({ primary, label }: { primary: boolean; label: string }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.78rem",
        fontWeight: 500,
        letterSpacing: "0.04em",
        padding: "10px 22px",
        borderRadius: "6px",
        border: `1px solid ${primary ? (hov ? C.accentMid : C.accent) : C.borderGray}`,
        background: primary ? (hov ? C.accentMid : C.accent) : (hov ? C.lightGray : C.white),
        color: primary ? C.white : hov ? C.textDark : C.textMid,
        cursor: "pointer",
        transition: "all 0.18s ease",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        boxShadow: primary && hov ? `0 4px 16px ${C.accent}30` : "none",
        whiteSpace: "nowrap",
      }}
    >
      {label}
      {primary && (
        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      )}
    </button>
  );
}

export default function About() {
  const { ref, inView } = useInView(0.08);

  const stats = [
    { value: "40+", label: "Années d'expérience" },
    { value: "8k+", label: "Patients traités" },
    { value: "N°1",   label: "Pionnier en Afrique du Nord" },
  ];

  const credentials = [
   
    {
      icon: <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>,
      text: "Faculté de Médecine de Tunis — Doctorat",
      sub: "  Mention très honorable",
    },
    {
      icon: <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      text: "Fellowship Esthétique — Hôpital Saint-Louis",
      sub: "Paris, France ",
    },
    {
      icon: <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
      text: "Fondateur — Mnajja Beauty Center",
      sub: "Tunis, Tunisie ",
    },
  ];



  const specialties = [
    "Dermatologie médicale", "Laser & photothérapie",
    "Esthétique avancée", "Trichologie", "Dermatoscopie", "Acné & cicatrices",
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');

        /* ── Layout grids ── */
        .abt-main-grid {
          display: grid;
          grid-template-columns: minmax(0,1fr) minmax(0,1.1fr);
          gap: 56px;
          align-items: start;
        }
        .abt-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 20px;
        }
        .abt-photo {
          width: 100%;
          aspect-ratio: 3/3.6;
        }
        .abt-cta-row {
          display: flex;
          gap: 12px;
          padding-top: 4px;
          flex-wrap: wrap;
        }

        /* tablet — stack columns */
        @media (max-width: 860px) {
          .abt-main-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          /* on tablet/mobile, make the photo a horizontal card instead of portrait */
          .abt-photo {
            aspect-ratio: 16/7;
            object-position: top;
          }
          .abt-photo-wrap {
            aspect-ratio: 16/7 !important;
          }
        }

        /* mobile */
        @media (max-width: 540px) {
          .abt-stats-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }
          .abt-section {
            padding: 48px 16px !important;
          }
          .abt-topbar {
            margin-bottom: 32px !important;
            padding-bottom: 16px !important;
          }
          .abt-cta-row {
            flex-direction: column;
          }
          .abt-cta-row button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <section
        ref={ref}
        className="abt-section"
        style={{
          background: C.offWhite,
          padding: "80px 24px",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* ── Top bar ── */}
          <div
            className="abt-topbar"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "48px",
              paddingBottom: "20px",
              borderBottom: `1px solid ${C.borderGray}`,
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(-8px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "3px", height: "20px", background: C.accentLine, borderRadius: "2px" }} />
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: C.textMid, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                À propos du médecin
              </span>
            </div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: C.borderGray, letterSpacing: "0.1em" }}>
              REF-001
            </span>
          </div>

          {/* ── Main grid ── */}
          <div className="abt-main-grid">

            {/* LEFT COLUMN */}
            <div style={{
              opacity: inView ? 1 : 0,
              transition: "opacity 0.6s ease 0.15s",
            }}>
              {/* Photo */}
              <div style={{ position: "relative", marginBottom: "20px" }}>
                <div
                  className="abt-photo-wrap"
                  style={{
                    width: "100%",
                    aspectRatio: "3/3.6",
                    background: `linear-gradient(145deg, ${C.accentLt} 0%, ${C.lightGray} 100%)`,
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: `1px solid ${C.borderGray}`,
                    position: "relative",
                  }}
                >
                  <img
                    src="/img/drmnaja.jpeg"
                    alt="Dr. Fathi Mnaja"
                    className="abt-photo"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                  />
                  {/* Status badge */}
                  <div style={{
                    position: "absolute", top: "12px", right: "12px",
                    background: C.white, border: `1px solid ${C.borderGray}`,
                    borderRadius: "4px", padding: "4px 10px",
                    display: "flex", alignItems: "center", gap: "6px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                  }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.green }} />
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: C.textDark, letterSpacing: "0.06em" }}>
                      DISPONIBLE
                    </span>
                  </div>
                </div>
              </div>

              {/* ID card */}
              <div style={{
                background: C.white,
                border: `1px solid ${C.borderGray}`,
                borderRadius: "8px",
                padding: "20px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                  <div>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 600, color: C.textDark, margin: 0 }}>
                      Dr. Fathi Mnajja
                    </p>
                    <p style={{ fontSize: "0.75rem", color: C.textMid, marginTop: "2px", marginBottom: 0 }}>
                      Dermatologue — Vénérologue
                    </p>
                  </div>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "6px",
                    background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <svg width="18" height="18" fill="none" stroke="white" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px", paddingTop: "14px", borderTop: `1px solid ${C.borderGray}` }}>
                  {[
                    { label: "Localisation",  value: "Mnajja Beauty Center a Tunis 23 Avenus de carthage| le cabinet de dr Manajja dermatologue a Gabes" },
                    { label: "Langues",        value: "Arabe · Français · Anglais" },
                    { label: "Consultations", value: "Lun – Sam, 09h – 17h" },
                  ].map(item => (
                    <div key={item.label} style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
                      <span style={{ fontSize: "0.7rem", color: C.textMid, fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap" }}>{item.label}</span>
                      <span style={{ fontSize: "0.72rem", color: C.textDark, fontWeight: 500, textAlign: "right" }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="abt-stats-grid">
                {stats.map((s, i) => (
                  <StatCard key={s.label} {...s} delay={200 + i * 80} inView={inView} />
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

              {/* Heading */}
              <div style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.55s ease 0.2s, transform 0.55s ease 0.2s",
              }}>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                  fontWeight: 400,
                  color: C.textDark,
                  lineHeight: 1.25,
                  marginBottom: "12px",
                  marginTop: 0,
                }}>
                  Une expertise médicale{" "}
                  <span style={{ fontStyle: "italic", color: C.accentMid }}>rigoureuse</span>
                  <br />au service de votre peau
                </h2>
                <p style={{ fontSize: "0.88rem", color: C.textMid, lineHeight: 1.75, maxWidth: "480px", margin: 0 }}>
                Spécialiste en Dermatologie et Vénéréologie
Maladies de cuir chevelu et des ongles
Greffe de Cheveux
Médecine Esthétique et Laser
Ancien Attaché des Hôpitaux de Paris
                </p>
              </div>

              {/* Specialties */}
              <div style={{ opacity: inView ? 1 : 0, transition: "opacity 0.5s ease 0.3s" }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: C.textMid, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px", marginTop: 0 }}>
                  Domaines de compétence
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {specialties.map((s, i) => (
                    <SpecialtyTag key={s} label={s} index={i} inView={inView} />
                  ))}
                </div>
              </div>

              {/* Credentials */}
              <div style={{ opacity: inView ? 1 : 0, transition: "opacity 0.5s ease 0.35s" }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: C.textMid, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "6px", marginTop: 0 }}>
                  Certifications & Affiliations
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {credentials.map((c, i) => (
                    <CredentialRow key={c.text} {...c} delay={380 + i * 70} inView={inView} />
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div style={{
                background: C.white,
                border: `1px solid ${C.borderGray}`,
                borderRadius: "8px",
                padding: "20px 20px 4px",
                opacity: inView ? 1 : 0,
                transition: "opacity 0.5s ease 0.5s",
              }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: C.textMid, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "16px", marginTop: 0 }}>
                  Parcours
                </p>
                {/*{timeline.map((item, i) => (
                  <TimelineRow key={item.year} {...item} index={i} inView={inView} />
                ))}*/ } 
              </div>

              {/* CTA */}
              <div
                className="abt-cta-row"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(10px)",
                  transition: "opacity 0.5s ease 0.75s, transform 0.5s ease 0.75s",
                }}
              >
             <Link to="/contact">   <CTAButton primary label="Prendre rendez-vous" /></Link>
              <Link to="/apropos">  <CTAButton primary={false} label="En savoir plus" /></Link>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}