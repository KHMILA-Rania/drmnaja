import { useState, useEffect, useRef } from "react";

// ── Design tokens (identical to Footer & Services) ──────────────
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
  green:      "#2A7A5A",
  greenLt:    "#EAF4EF",
};

// ── Breakpoint hook ─────────────────────────────────────────────
function useBreakpoint() {
  const [bp, setBp] = useState<"mobile" | "tablet" | "desktop">("desktop");
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setBp(w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return bp;
}

// ── InView hook ─────────────────────────────────────────────────
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

// ── InfoCard ────────────────────────────────────────────────────
function InfoCard({
  icon, label, value, sub, delay = 0, inView,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  delay?: number;
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
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, border-color 0.2s, box-shadow 0.2s`,
        boxShadow: hov ? `0 8px 28px rgba(26,58,92,0.08)` : "0 1px 4px rgba(0,0,0,0.04)",
        cursor: "default",
      }}
    >
      <div style={{
        width: "38px", height: "38px", borderRadius: "8px",
        background: hov ? C.accentLt : C.lightGray,
        border: `1px solid ${hov ? C.accentLine + "40" : "transparent"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: hov ? C.accentMid : C.textMid,
        transition: "all 0.2s",
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <p style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase",
          color: C.textMid, margin: "0 0 4px",
        }}>
          {label}
        </p>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.88rem", fontWeight: 500,
          color: C.textDark, margin: 0,
        }}>
          {value}
        </p>
        {sub && (
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.72rem", color: C.textMid,
            margin: "2px 0 0",
          }}>
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}

// ── FormField ───────────────────────────────────────────────────
function FormField({
  label, id, type = "text", placeholder, value, onChange, error, required,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const isTextarea = type === "textarea";

  const sharedStyle: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.84rem",
    color: C.textDark,
    background: C.white,
    border: `1px solid ${error ? "#C0392B" : focused ? C.accentLine : C.borderGray}`,
    borderRadius: "6px",
    padding: "11px 14px",
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
    transition: "border-color 0.18s",
    lineHeight: 1.6,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label htmlFor={id} style={{
        fontFamily: "'DM Mono', monospace",
       fontSize: "clamp(0.7rem, 1vw, 0.85rem)", letterSpacing: "0.12em", textTransform: "uppercase",
        color: C.textMid,
        display: "flex", alignItems: "center", gap: "4px",
      }}>
        {label}
        {required && <span style={{ color: C.accentLine }}>*</span>}
      </label>

      {isTextarea ? (
        <textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={5}
          style={{ ...sharedStyle, resize: "vertical", minHeight: "120px" }}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={sharedStyle}
        />
      )}

      {error && (
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.7rem", color: "#C0392B",
          display: "flex", alignItems: "center", gap: "5px",
        }}>
          <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
}

// ── SubmitButton ────────────────────────────────────────────────
function SubmitButton({ loading }: { loading: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      type="submit"
      disabled={loading}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.82rem", fontWeight: 500,
        letterSpacing: "0.05em",
        padding: "12px 28px",
        borderRadius: "6px",
        border: `1px solid ${hov && !loading ? C.accentMid : C.accent}`,
        background: loading ? C.textMid : hov ? C.accentMid : C.accent,
        color: C.white,
        cursor: loading ? "not-allowed" : "pointer",
        transition: "all 0.18s ease",
        display: "inline-flex", alignItems: "center", gap: "8px",
        boxShadow: hov && !loading ? `0 4px 16px ${C.accent}30` : "none",
        alignSelf: "flex-start",
      }}
    >
      {loading ? (
        <>
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            style={{ animation: "spin 1s linear infinite" }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Envoi en cours…
        </>
      ) : (
        <>
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          Envoyer le message
        </>
      )}
    </button>
  );
}

// ── HoraireRow ──────────────────────────────────────────────────
function HoraireRow({ day, hours, isToday }: { day: string; hours: string; isToday: boolean }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "8px 0",
      borderBottom: `1px solid ${C.lightGray}`,
    }}>
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.8rem",
        color: isToday ? C.accentMid : C.textMid,
        fontWeight: isToday ? 500 : 400,
        display: "flex", alignItems: "center", gap: "6px",
      }}>
        {isToday && (
          <span style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: C.accentLine, display: "inline-block",
          }} />
        )}
        {day}
      </span>
      <span style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.7rem", color: isToday ? C.accentMid : C.textMid,
        letterSpacing: "0.04em",
      }}>
        {hours}
      </span>
    </div>
  );
}

// ── Main Page ───────────────────────────────────────────────────
export default function ContactPage() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";


  const { ref: heroRef, inView: heroIn } = useInView(0.01);
  const { ref: cardsRef, inView: cardsIn } = useInView(0.05);
  const { ref: formRef, inView: formIn } = useInView(0.05);

  // Form state
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", sujet: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const today = new Date().getDay(); // 0=Sun, 1=Mon...6=Sat

  const horaires = [
    { day: "Lundi",    hours: "09h00 – 17h00", dayNum: 1 },
    { day: "Mardi",    hours: "09h00 – 17h00", dayNum: 2 },
    { day: "Mercredi", hours: "09h00 – 17h00", dayNum: 3 },
    { day: "Jeudi",    hours: "09h00 – 17h00", dayNum: 4 },
    { day: "Vendredi", hours: "09h00 – 17h00", dayNum: 5 },
    { day: "Samedi",   hours: "09h00 – 14h00", dayNum: 6 },
    { day: "Dimanche", hours: "Fermé",          dayNum: 0 },
  ];

  const contacts = [
    {
      icon: <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
      label: "Adresse",
      value: "Tunis ",
      sub: "Mnajja Beauty Center - Tunis 23 Avenus de carthage ",
    },
      {
      icon: <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
      label: "Adresse",
      value: "Gabes ",
      sub: "Cabinet de dermatologie -dr Manajja ",
    },
    {
      icon: <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>,
      label: "Téléphone",
      value: "+216 94 645 686",
      sub: "Lun – Sam · 09h – 17h",
    },
    {
      icon: <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
      label: "E-mail",
      value: "mnajafathi@yahoo.fr",
      sub: "Réponse sous 24–48h",
    },
  
  ];

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nom.trim()) e.nom = "Le nom est requis.";
    if (!form.email.trim()) e.email = "L'e-mail est requis.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Format d'e-mail invalide.";
    if (!form.message.trim()) e.message = "Le message est requis.";
    return e;
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const errs = validate();
  if (Object.keys(errs).length) {
    setErrors(errs);
    return;
  }

  setErrors({});
  setLoading(true);

  try {
    const res = await fetch("https://formsubmit.co/ajax/rania.khmila@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        nom: form.nom,
        email: form.email,
        telephone: form.telephone,
        sujet: form.sujet,
        message: form.message,
      }),
    });

    if (res.ok) {
      setSuccess(true);
      setForm({ nom: "", email: "", telephone: "", sujet: "", message: "" });
    } else {
      alert("Erreur lors de l'envoi.");
    }
  } catch (err) {
    console.error(err);
    alert("Erreur réseau.");
  } finally {
    setLoading(false);
  }
};
  const px = isMobile ? "20px" : isTablet ? "32px" : "40px";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; }
        input, textarea, select { font-family: inherit; }
        input::placeholder, textarea::placeholder { color: ${C.borderGray}; }
        input:focus, textarea:focus { outline: none; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 40px;
          align-items: start;
        }
        .info-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 1023px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 639px) {
          .info-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* ── Hero / Header Band ── */}
      <section
        ref={heroRef}
        style={{
          background: C.textDark,
          color: C.white,
          padding: `${isMobile ? "52px" : "72px"} ${px} ${isMobile ? "44px" : "60px"}`,
        }}
      >
        <div style={{ maxWidth: "1100px",width:"100%", margin: "0 auto" }}>

          {/* Top label row */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: "36px",
            paddingBottom: "18px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            opacity: heroIn ? 1 : 0,
            transform: heroIn ? "translateY(0)" : "translateY(-8px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "3px", height: "20px", background: C.accentLine, borderRadius: "2px" }} />
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
              }}>
                Nous contacter
              </span>
            </div>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.58rem", letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.15)",
            }}>
              REF-003
            </span>
          </div>

          {/* Heading + subtext */}
          <div style={{
            maxWidth: "680px",
            opacity: heroIn ? 1 : 0,
            transform: heroIn ? "translateY(0)" : "translateY(18px)",
            transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
          }}>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: `clamp(2rem, 4vw, 3rem)`,
              fontWeight: 400, lineHeight: 1.15,
              color: C.white, margin: "0 0 16px",
            }}>
              Prenons soin{" "}
              <span style={{ fontStyle: "italic", color: C.accentLine }}>
                de vous
              </span>
            </h1>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.88rem", lineHeight: 1.8,
              color: "rgba(255,255,255,0.45)",
              margin: "0 0 28px",
              maxWidth: "480px",
            }}>
              Notre équipe est disponible pour répondre à vos questions, vous orienter vers le traitement adapté, et planifier votre consultation.
            </p>

            {/* CTA strip */}
            <div style={{
              display: "flex", flexWrap: "wrap", gap: "10px",
              alignItems: "center",
            }}>
              {[
                {
                  icon: <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>,
                  label: "+216 94 645 686",
                  href: "tel:+21694645686",
                },
                {
                  icon: <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
                  label: "mnajafathi@yahoo.fr",
                  href: "mailto:mnajafathi@yahoo.fr",
                },
              ].map((c) => {
                const [hov, setHov] = useState(false);
                return (
                  <a
                    key={c.label}
                    href={c.href}
                    onMouseEnter={() => setHov(true)}
                    onMouseLeave={() => setHov(false)}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.78rem", fontWeight: 500,
                      padding: "9px 18px", borderRadius: "6px",
                      border: `1px solid ${hov ? C.accentLine : "rgba(255,255,255,0.14)"}`,
                      background: hov ? C.accentLine + "22" : "transparent",
                      color: hov ? C.accentLine : "rgba(255,255,255,0.6)",
                      textDecoration: "none",
                      transition: "all 0.18s ease",
                      display: "inline-flex", alignItems: "center", gap: "8px",
                    }}
                  >
                    {c.icon}
                    {c.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Info Cards ── */}
      <section
        ref={cardsRef}
        style={{
          background: C.offWhite,
          padding: `${isMobile ? "40px" : "52px"} ${px}`,
          borderBottom: `1px solid ${C.borderGray}`,
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="info-cards-grid">
            {contacts.map((c, i) => (
              <InfoCard
                key={c.label}
                icon={c.icon}
                label={c.label}
                value={c.value}
                sub={c.sub}
                delay={i * 80}
                inView={cardsIn}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Body: Form + Sidebar ── */}
      <section
        ref={formRef}
        style={{
          background: C.offWhite,
          padding: `${isMobile ? "40px" : "60px"} ${px} ${isMobile ? "60px" : "80px"}`,
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="contact-grid">

            {/* ── LEFT: Sidebar (Horaires + Note) ── */}
            <div style={{
              display: "flex", flexDirection: "column", gap: "20px",
              opacity: formIn ? 1 : 0,
              transform: formIn ? "translateX(0)" : "translateX(-16px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}>

              {/* Horaires card */}
              <div style={{
                background: C.white,
                border: `1px solid ${C.borderGray}`,
                borderRadius: "8px",
                overflow: "hidden",
              }}>
                <div style={{
                  padding: "16px 20px",
                  borderBottom: `1px solid ${C.borderGray}`,
                  display: "flex", alignItems: "center", gap: "10px",
                }}>
                  <svg width="14" height="14" fill="none" stroke={C.accentMid} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.6rem", letterSpacing: "0.12em",
                    textTransform: "uppercase", color: C.textMid,
                  }}>
                    Horaires d'ouverture
                  </span>
                </div>
                <div style={{ padding: "8px 20px 16px" }}>
                  {horaires.map(h => (
                    <HoraireRow
                      key={h.day}
                      day={h.day}
                      hours={h.hours}
                      isToday={h.dayNum === today}
                    />
                  ))}
                </div>
              </div>

              {/* Info note */}
              <div style={{
                background: C.accentLt,
                border: `1px solid ${C.accentLine}30`,
                borderRadius: "8px",
                padding: "16px 18px",
                display: "flex", gap: "12px", alignItems: "flex-start",
              }}>
                <svg width="16" height="16" fill="none" stroke={C.accentMid} viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: "1px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem", color: C.accentMid,
                  lineHeight: 1.65, margin: 0,
                }}>
                  Chaque consultation est précédée d'une évaluation clinique personnalisée. Les rendez-vous sont confirmés par e-mail ou téléphone sous 24h.
                </p>
              </div>

              {/* Map placeholder */}
             <div style={{
  background: C.white,
  border: `1px solid ${C.borderGray}`,
  borderRadius: "8px",
  overflow: "hidden",
}}>
  {/* Embedded map */}
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.1911065032405!2d10.100733382532916!3d33.88473170417151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12556fb8f8c664e5%3A0x2aabc26f7e8fca95!2sMNAJA%20FATHI!5e0!3m2!1sfr!2stn!4v1777222554547!5m2!1sfr!2stn" width="600" height="450" style={{
    border: 0,
    width: "100%",
    height: isMobile ? "250px" : "350px",
  }}  loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

  {/* Link to open full Google Maps */}
  <div style={{
    padding: "12px 16px",
    borderTop: `1px solid ${C.borderGray}`,
  }}>
    
   <a   href="https://www.google.com/maps/place/MNAJA+FATHI/@33.8847317,10.1007334,17z/data=!3m1!4b1!4m6!3m5!1s0x12556fb8f8c664e5:0x2aabc26f7e8fca95!8m2!3d33.8847318!4d10.1056043!16s%2Fg%2F11ggyz8945?entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D"
      target="_blank"
      rel="noreferrer"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.74rem",
        color: C.accentMid,
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
      onMouseEnter={e => (e.currentTarget.style.color = C.accent)}
      onMouseLeave={e => (e.currentTarget.style.color = C.accentMid)}
    >
      <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
      Ouvrir dans Google Maps
    </a>
  </div>
</div>
            </div>

            {/* ── RIGHT: Contact Form ── */}
            <div style={{
              background: C.white,
              border: `1px solid ${C.borderGray}`,
              borderRadius: "8px",
              overflow: "hidden",
              opacity: formIn ? 1 : 0,
              transform: formIn ? "translateX(0)" : "translateX(16px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}>
              {/* Form header */}
              <div style={{
                padding: "22px 28px",
                borderBottom: `1px solid ${C.borderGray}`,
                background: C.offWhite,
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div>
                  <h2 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.3rem", fontWeight: 400,
                    color: C.textDark, margin: "0 0 4px",
                  }}>
                    Envoyer un message
                  </h2>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.75rem", color: C.textMid,
                    margin: 0,
                  }}>
                    Nous vous répondons dans les 24–48h ouvrées.
                  </p>
                </div>
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.55rem", color: C.borderGray,
                  letterSpacing: "0.08em",
                }}>
                  CTF-001
                </span>
              </div>

              {/* Form body */}
              <div style={{ padding: "28px" }}>
                {success ? (
                  /* Success state */
                  <div style={{
                    textAlign: "center",
                    padding: "40px 20px",
                    animation: "fadeSlideUp 0.4s ease",
                  }}>
                    <div style={{
                      width: "52px", height: "52px", borderRadius: "50%",
                      background: C.greenLt,
                      border: `1px solid ${C.green}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 16px",
                    }}>
                      <svg width="22" height="22" fill="none" stroke={C.green} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.2rem", fontWeight: 400,
                      color: C.textDark, margin: "0 0 8px",
                    }}>
                      Message envoyé !
                    </h3>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.82rem", color: C.textMid,
                      lineHeight: 1.7, margin: "0 0 24px",
                    }}>
                      Merci pour votre message. Notre équipe vous contactera dans les meilleurs délais.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.76rem", fontWeight: 500,
                        padding: "9px 20px", borderRadius: "6px",
                        border: `1px solid ${C.borderGray}`,
                        background: C.white, color: C.textMid,
                        cursor: "pointer", transition: "all 0.15s",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = C.lightGray; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = C.white; }}
                    >
                      Nouveau message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

                      {/* Row: Nom + Email */}
                      <div style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                        gap: "14px",
                      }}>
                        <FormField
                          label="Nom complet"
                          id="nom"
                          placeholder="Dr. Prénom Nom"
                          value={form.nom}
                          onChange={v => setForm(f => ({ ...f, nom: v }))}
                          error={errors.nom}
                          required
                        />
                        <FormField
                          label="Adresse e-mail"
                          id="email"
                          type="email"
                          placeholder="exemple@email.com"
                          value={form.email}
                          onChange={v => setForm(f => ({ ...f, email: v }))}
                          error={errors.email}
                          required
                        />
                      </div>

                      {/* Row: Téléphone + Sujet */}
                      <div style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                        gap: "14px",
                      }}>
                        <FormField
                          label="Téléphone"
                          id="telephone"
                          type="tel"
                          placeholder="+216 XX XXX XXX"
                          value={form.telephone}
                          onChange={v => setForm(f => ({ ...f, telephone: v }))}
                        />
                        {/* Sujet select */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          <label htmlFor="sujet" style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase",
                            color: C.textMid,
                          }}>
                            Sujet
                          </label>
                          <select
                            id="sujet"
                            value={form.sujet}
                            onChange={e => setForm(f => ({ ...f, sujet: e.target.value }))}
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.84rem",
                              color: form.sujet ? C.textDark : C.borderGray,
                              background: C.white,
                              border: `1px solid ${C.borderGray}`,
                              borderRadius: "6px",
                              padding: "11px 14px",
                              width: "100%",
                              outline: "none",
                              cursor: "pointer",
                              appearance: "none",
                              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' fill='none' stroke='%236B7380' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 12px center",
                            }}
                          >
                            <option value="">Choisir un sujet</option>
                            <option value="rdv">Prise de rendez-vous</option>
                            <option value="laser">Laser détatouage</option>
                            <option value="esthetique">Traitement esthétique</option>
                            <option value="sourire">Correction du sourire</option>
                            <option value="info">Informations générales</option>
                            <option value="autre">Autre</option>
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <FormField
                        label="Message"
                        id="message"
                        type="textarea"
                        placeholder="Décrivez votre demande, vos questions ou la zone à traiter…"
                        value={form.message}
                        onChange={v => setForm(f => ({ ...f, message: v }))}
                        error={errors.message}
                        required
                      />

                      {/* RGPD note */}
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.68rem", color: C.textMid,
                        lineHeight: 1.6, margin: 0,
                        paddingTop: "4px",
                        borderTop: `1px solid ${C.lightGray}`,
                      }}>
                        En soumettant ce formulaire, vous acceptez que vos données soient utilisées exclusivement dans le cadre de votre demande médicale, conformément à notre{" "}
                        <a href="#" style={{ color: C.accentMid, textDecoration: "none" }}>politique de confidentialité</a>.
                      </p>

                      {/* Submit */}
                      <div style={{ paddingTop: "4px" }}>
                        <SubmitButton loading={loading} />
                      </div>

                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Appointment CTA Band (mirrors footer CTA) ── */}
   

    </>
  );
}