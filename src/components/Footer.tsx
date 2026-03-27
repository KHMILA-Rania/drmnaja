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
  green:     "#2A7A5A",
};

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

function FooterLink({ label }: { label: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href="#"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.82rem",
        color: hov ? C.accentLine : "rgba(255,255,255,0.5)",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        transition: "color 0.18s ease",
        padding: "2px 0",
      }}
    >
      {hov && <span style={{ width: "12px", height: "1px", background: C.accentLine, display: "inline-block" }} />}
      {label}
    </a>
  );
}

function SocialBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href="#"
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "38px", height: "38px",
        borderRadius: "6px",
        border: `1px solid ${hov ? C.accentLine : "rgba(255,255,255,0.12)"}`,
        background: hov ? C.accentLine + "22" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: hov ? C.accentLine : "rgba(255,255,255,0.4)",
        transition: "all 0.18s ease",
        textDecoration: "none",
      }}
    >
      {icon}
    </a>
  );
}

function AccordionSection({ heading, links }: { heading: string; links: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", background: "none", border: "none",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 0", cursor: "pointer",
        }}
      >
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
          {heading}
        </span>
        <svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.3)" viewBox="0 0 24 24"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", flexShrink: 0 }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div style={{ paddingBottom: "14px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {links.map(l => <FooterLink key={l} label={l} />)}
        </div>
      )}
    </div>
  );
}

export default function Footer() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const isDesktop = bp === "desktop";

  const [ctaHov, setCtaHov] = useState(false);

  const nav = [
    { heading: "Cabinet",  links: ["À propos", "Équipe médicale", "Installations", "Certifications"] },
    { heading: "Services", links: ["Laser détatouage", "Traitements esthétiques", "Correction du sourire", "Dermatologie médicale"] },
    { heading: "Patients", links: ["Prendre rendez-vous", "Tarifs & remboursements", "FAQ"] },
  ];

  const contacts = [
    {
      icon: <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      label: "Tunis, Tunisie",
    },
    {
      icon: <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
      label: "+216 94 645 686",
    },
    {
      icon: <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
      label: "mnajafathi@yahoo.fr",
    },
    {
      icon: <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      label: "Lun–Sam · 09h–17h",
    },
  ];

  const px = isMobile ? "20px" : isTablet ? "32px" : "40px";

 
  const BrandBlock = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 400, marginBottom: "3px" }}>Dr. Mnaja</p>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em" }}>CABINET DE DERMATOLOGIE</p>
      </div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", lineHeight: 1.7, color: "rgba(255,255,255,0.4)" }}>
        Expertise médicale et esthétique dermatologique au cœur de Tunis — depuis 2017.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
        {contacts.map(c => (
          <div key={c.label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ color: C.accentLine, flexShrink: 0 }}>{c.icon}</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.45)" }}>{c.label}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <SocialBtn label="Instagram" icon={<svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={1.8} /><circle cx="12" cy="12" r="4" strokeWidth={1.8} /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" /></svg>} />
        <SocialBtn label="Facebook" icon={<svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>} />
        <SocialBtn label="LinkedIn" icon={<svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" strokeWidth={1.8} /></svg>} />
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;1,400&display=swap');
        input::placeholder { color: rgba(255,255,255,0.25); }
        input:focus { outline: none; border-color: rgba(74,144,196,0.6) !important; }
      `}</style>

      <footer style={{ background: C.textDark, color: C.white }}>

        {/* ── CTA Band ── */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: `${isMobile ? "24px" : "32px"} ${px}` }}>
          <div style={{
            maxWidth: "1100px", margin: "0 auto",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            gap: "16px",
          }}>
            <div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? "1.15rem" : "1.35rem", fontWeight: 400, marginBottom: "4px" }}>
                Prêt(e) à prendre soin de votre peau ?
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.5 }}>
                Consultations disponibles du lundi au samedi.
              </p>
            </div>
            <a href="#"
              onMouseEnter={() => setCtaHov(true)}
              onMouseLeave={() => setCtaHov(false)}
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", fontWeight: 500,
                letterSpacing: "0.05em", padding: "11px 22px", borderRadius: "6px",
                border: `1px solid ${ctaHov ? C.accentLine : "rgba(255,255,255,0.18)"}`,
                background: ctaHov ? C.accentLine : "transparent",
                color: C.white, textDecoration: "none", transition: "all 0.18s ease",
                display: "inline-flex", alignItems: "center", gap: "8px",
                alignSelf: isMobile ? "stretch" : "auto",
                justifyContent: isMobile ? "center" : "flex-start",
                whiteSpace: "nowrap",
              }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Prendre rendez-vous
            </a>
          </div>
        </div>

        {/* ── Main body ── */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: `44px ${px} 36px` }}>

          {/* DESKTOP: 3-col grid */}
          {isDesktop && (
            <div style={{ display: "grid", gridTemplateColumns: "220px 1fr 240px", gap: "48px" }}>
              <BrandBlock />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }}>
                {nav.map(col => (
                  <div key={col.heading}>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "14px" }}>{col.heading}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                      {col.links.map(l => <FooterLink key={l} label={l} />)}
                    </div>
                  </div>
                ))}
              </div>
            
            </div>
          )}

          {/* TABLET: 2-col top, full-width nav below */}
          {isTablet && (
            <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "36px" }}>
                <BrandBlock />
              
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "28px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }}>
                {nav.map(col => (
                  <div key={col.heading}>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "14px" }}>{col.heading}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                      {col.links.map(l => <FooterLink key={l} label={l} />)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MOBILE: stacked single column */}
          {isMobile && (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              <BrandBlock />
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "4px" }}>
                {nav.map(col => <AccordionSection key={col.heading} heading={col.heading} links={col.links} />)}
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "28px" }}>
              
              </div>
            </div>
          )}
        </div>

        {/* ── Bottom bar ── */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: `16px ${px}` }}>
          <div style={{
            maxWidth: "1100px", margin: "0 auto",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            gap: isMobile ? "10px" : "0",
          }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>
              © {new Date().getFullYear()} — TOUS DROITS RÉSERVÉS
            </span>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {["Mentions légales", "Confidentialité"].map(l => (
                <a key={l} href="#" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.25)", textDecoration: "none", transition: "color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
                >{l}</a>
              ))}
            </div>
            {!isMobile && (
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", color: "rgba(255,255,255,0.12)", letterSpacing: "0.08em" }}>REF-FTR</span>
            )}
          </div>
        </div>

      </footer>
    </>
  );
}