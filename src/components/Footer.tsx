import { useState, useEffect } from "react";
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

/* ───────────────────────── FooterLink ───────────────────────── */

function FooterLink({ label, href }: { label: string; href: string }) {
  const [hov, setHov] = useState(false);

  const isExternal = href.startsWith("http");

  const baseStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.82rem",
    color: hov ? C.accentLine : "rgba(255,255,255,0.5)",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "color 0.18s ease",
    padding: "2px 0",
  } as const;

  const content = (
    <>
      {hov && (
        <span
          style={{
            width: "12px",
            height: "1px",
            background: C.accentLine,
            display: "inline-block",
          }}
        />
      )}
      {label}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={baseStyle}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      to={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={baseStyle}
    >
      {content}
    </Link>
  );
}

/* ───────────────────────── SocialBtn ───────────────────────── */

function SocialBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "38px",
        height: "38px",
        borderRadius: "6px",
        border: `1px solid ${hov ? C.accentLine : "rgba(255,255,255,0.12)"}`,
        background: hov ? C.accentLine + "22" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: hov ? C.accentLine : "rgba(255,255,255,0.4)",
        transition: "all 0.18s ease",
      }}
    >
      {icon}
    </div>
  );
}

/* ───────────────────────── Accordion ───────────────────────── */

function AccordionSection({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 0",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          {heading}
        </span>

        <svg
          width="14"
          height="14"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          viewBox="0 0 24 24"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.2s",
            flexShrink: 0,
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div
          style={{
            paddingBottom: "14px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {links.map(link => (
            <FooterLink
              key={link.href}
              label={link.label}
              href={link.href}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── Footer ───────────────────────── */

export default function Footer() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const isDesktop = bp === "desktop";

  const [ctaHov, setCtaHov] = useState(false);

  const nav = [
    {
      heading: "Cabinet",
      links: [
        { label: "À propos", href: "/apropos" },
        { label: "Historique", href: "/apropos" },
      
      ],
    },
    {
      heading: "Services",
      links: [
        { label: "Laser et peau", href: "/services/laser" },
        { label: "Visage et  esthétiques", href: "/services/esthetiques" },
        { label: "Corps et cheveux", href: "/services/corps" },

      ],
    },
    {
      heading: "Patients",
      links: [
        { label: "Prendre rendez-vous", href: "/contact" },
        { label: "Tarifs & remboursements", href: "/contact" },
        { label: "FAQ", href: "/#faq"},
      ],
    },
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
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.45)" }}>
              {c.label}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <a href="https://www.instagram.com/dr.fathi.mnaja/" target="_blank" rel="noopener noreferrer">
          <SocialBtn
            label="Instagram"
            icon={
              <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={1.8} />
                <circle cx="12" cy="12" r="4" strokeWidth={1.8} />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
              </svg>
            }
          />
        </a>

        <a href="https://www.facebook.com/p/Cabinet-DrFethi-Mnaja-Center-Dermatologie-Laser-et-Esth%C3%A9tique-100067788265277/" target="_blank" rel="noopener noreferrer">
          <SocialBtn
            label="Facebook"
            icon={
              <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            }
          />
        </a>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;1,400&display=swap');
      `}</style>

      <footer style={{ background: C.textDark, color: C.white }}>

        {/* CTA */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: `${isMobile ? "24px" : "32px"} ${px}` }}>
          <div style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            gap: "16px",
          }}>
            <div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? "1.15rem" : "1.35rem" }}>
                Prêt(e) à prendre soin de votre peau ?
              </p>
              <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.38)" }}>
                Consultations disponibles du lundi au samedi.
              </p>
            </div>

            <Link
              to="/contact"
              onMouseEnter={() => setCtaHov(true)}
              onMouseLeave={() => setCtaHov(false)}
              style={{
                padding: "11px 22px",
                borderRadius: "6px",
                border: `1px solid ${ctaHov ? C.accentLine : "rgba(255,255,255,0.18)"}`,
                background: ctaHov ? C.accentLine : "transparent",
                color: C.white,
                textDecoration: "none",
              }}
            >
              Prendre rendez-vous
            </Link>
          </div>
        </div>

        {/* BODY */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: `44px ${px} 36px` }}>

          {isDesktop && (
            <div style={{ display: "grid", gridTemplateColumns: "220px 1fr 240px", gap: "48px" }}>
              <BrandBlock />

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }}>
                {nav.map(col => (
                  <div key={col.heading}>
                    <p style={{ marginBottom: "14px" }}>{col.heading}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                      {col.links.map(link => (
                        <FooterLink key={link.href} label={link.label} href={link.href} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isTablet && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }}>
              {nav.map(col => (
                <div key={col.heading}>
                  <p>{col.heading}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {col.links.map(link => (
                      <FooterLink key={link.href} label={link.label} href={link.href} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {isMobile && (
            <div>
              {nav.map(col => (
                <AccordionSection key={col.heading} heading={col.heading} links={col.links} />
              ))}
            </div>
          )}
        </div>
      </footer>
    </>
  );
}