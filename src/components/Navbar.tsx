import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ─── Types ───────────────────────────────────────────────────────────────────
interface ServiceItem {
  label: string;
  desc: string;
  icon: React.ReactNode;
  path:string
}

// ─── Palette (matches About / Services / Hero) ────────────────────────────────
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

// ─── Data ────────────────────────────────────────────────────────────────────
const SERVICES: ServiceItem[] = [
  {
    label: "Laser & Peau",
    desc: "Détatouage laser, Épilation laser,Cicatrices",
    icon: (
      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    path:"/services/laser"
  },
  {
    label: "Visage & Esthétique",
    desc: "Botox, fillers, Ovale du visage",
    icon: (
      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
     path:"/services/esthetiques"
  },
  {
    label: "Corps & Cheveux",
    desc: "Liposculture , fesses ,Greffes de cheveux",
    icon: (
      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
     path:"/services/corps"
  },

];

// ─── Logo ─────────────────────────────────────────────────────────────────────
function Logo() {
  return (
    <Link to="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
      {/* Icon mark */}
      <div style={{
        width: "40px", height: "40px", borderRadius: "8px",
        background: C.accent,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", flexShrink: 0,
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-5 8Z"
            fill="white" opacity="0.9" />
          <circle cx="8" cy="9" r="2.5" fill="white" opacity="0.3" />
        </svg>
        {/* Status dot */}
        <span style={{
          position: "absolute", top: "-3px", right: "-3px",
          width: "10px", height: "10px", borderRadius: "50%",
          background: C.accentLine,
          border: `2px solid ${C.offWhite}`,
        }} />
      </div>

      {/* Wordmark */}
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.15rem", fontWeight: 400,
          color: C.textDark, fontStyle: "italic",
          letterSpacing: "0.01em",
        }}>
          Dermatologie
          <span style={{ fontStyle: "normal", fontWeight: 600, color: C.accentMid }}> Esthétique</span>
        </span>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.58rem", color: C.textMid,
          letterSpacing: "0.18em", textTransform: "uppercase",
          marginTop: "3px",
        }}>
         By Dr.Mnaja
        </span>
      </div>
    </Link>
  );
}

// ─── Desktop nav link ─────────────────────────────────────────────────────────
function NavLink({ label, to }: { label: string; to: string }) {
  const [hov, setHov] = useState(false);

  return (
    <Link
      to={to}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.82rem",
        fontWeight: 500,
        color: hov ? C.accentMid : C.textDark,
        textDecoration: "none",
        letterSpacing: "0.02em",
        position: "relative",
        paddingBottom: "2px",
      }}
    >
      {label}
      <span style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        height: "1px",
        background: C.accentLine,
        width: hov ? "100%" : "0%",
        transition: "width 0.25s ease",
      }} />
    </Link>
  );
}

// ─── Services dropdown ────────────────────────────────────────────────────────
function ServicesDropdown({ open }: { open: boolean }) {
  return (
    <div style={{
      position: "absolute", top: "calc(100% + 12px)", left: "50%",
      transform: open ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-8px)",
      width: "90vw",
      maxWidth: "280px",
      background: C.white,
      border: `1px solid ${C.borderGray}`,
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 12px 40px rgba(26,31,46,0.10)",
      opacity: open ? 1 : 0,
      pointerEvents: open ? "auto" : "none",
      transition: "opacity 0.22s ease, transform 0.22s ease",
    }}>
      {/* Header */}
      <div style={{
        padding: "10px 16px",
        background: C.accentLt,
        borderBottom: `1px solid ${C.borderGray}`,
      }}>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.6rem", color: C.accentMid,
          letterSpacing: "0.18em", textTransform: "uppercase",
        }}>
          Nos Spécialités
        </span>
      </div>

      {/* Items */}
      <ul style={{ listStyle: "none", margin: 0, padding: "6px 0" }}>
        {SERVICES.map((s) => (
          <DropdownItem key={s.label} service={s} />
        ))}
      </ul>

      {/* Footer */}
      <div style={{ padding: "8px 16px 12px" }}>
        <ViewAllLink />
      </div>
    </div>
  );
}

function DropdownItem({ service }: { service: ServiceItem }) {
  const [hov, setHov] = useState(false);
  return (
    <li>
      <Link
        to={service.path}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "flex", alignItems: "center", gap: "12px",
          padding: "10px 16px",
          background: hov ? C.accentLt : "transparent",
          textDecoration: "none",
          transition: "background 0.15s ease",
        }}
      >
        <span style={{
          width: "30px", height: "30px", borderRadius: "6px", flexShrink: 0,
          background: hov ? C.accentLine + "20" : C.lightGray,
          color: hov ? C.accentMid : C.textMid,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.15s ease",
        }}>
          {service.icon}
        </span>
        <div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 500, color: C.textDark, margin: 0 }}>
            {service.label}
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", color: C.textMid, margin: "1px 0 0" }}>
            {service.desc}
          </p>
        </div>
      </Link>
    </li>
  );
}

function ViewAllLink() {
  const [hov, setHov] = useState(false);
  return (
    <a
      href="#"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
        padding: "8px",
        borderRadius: "6px",
        border: `1px solid ${hov ? C.accentLine + "80" : C.borderGray}`,
        background: hov ? C.accentLt : "transparent",
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase",
        color: hov ? C.accentMid : C.textMid,
        textDecoration: "none",
        transition: "all 0.18s ease",
      }}
    >
      Voir tous les services
      <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  );
}

// ─── Book button ──────────────────────────────────────────────────────────────
function BookButton({ mobile = false }: { mobile?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <Link to="/contact"><button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.75rem", fontWeight: 500,
        letterSpacing: "0.04em",
        padding: mobile ? "13px 0" : "9px 20px",
        width: mobile ? "100%" : "auto",
        borderRadius: "6px",
        border: `1px solid ${hov ? C.accentMid : C.accent}`,
        background: hov ? C.accentMid : C.accent,
        color: C.white,
        cursor: "pointer",
        transition: "all 0.18s ease",
        display: "flex", alignItems: "center",
        justifyContent: "center", gap: "7px",
        boxShadow: hov ? `0 4px 16px ${C.accent}35` : "none",
        whiteSpace: "nowrap",
      }}
    >
      <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      Prendre rendez-vous
    </button>
    </Link>
  );
}

// ─── Hamburger ────────────────────────────────────────────────────────────────
function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Toggle menu"
      style={{
        width: "36px", height: "36px",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: "5px",
        borderRadius: "6px",
        background: open ? C.accentLt : "transparent",
        border: `1px solid ${open ? C.accentLine + "40" : "transparent"}`,
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      {[
        { transform: open ? "translateY(6px) rotate(45deg)" : "none" },
        { opacity: open ? 0 : 1 },
        { transform: open ? "translateY(-6px) rotate(-45deg)" : "none" },
      ].map((s, i) => (
        <span key={i} style={{
          display: "block", width: "18px", height: "1.5px",
          background: C.textDark, borderRadius: "1px",
          transition: "all 0.3s ease",
          transformOrigin: "center",
          ...s,
        }} />
      ))}
    </button>
  );
}

// ─── Mobile menu ──────────────────────────────────────────────────────────────
function MobileMenu({ open }: { open: boolean }) {
  const [accOpen, setAccOpen] = useState(false);
  const accRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{
      overflow: "hidden",
      maxHeight: open ? "600px" : "0px",
      opacity: open ? 1 : 0,
      borderTop: `1px solid ${C.borderGray}`,
      background: C.white,
      transition: "max-height 0.4s ease, opacity 0.3s ease",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: "2px" }}>

        {[
  { label: "Accueil", to: "/" },
  { label: "À propos", to: "/apropos" }
].map(l => (
  <Link
    key={l.label}
    to={l.to}
    style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "0.85rem",
      fontWeight: 500,
      color: C.textDark,
      padding: "12px 0",
      borderBottom: `1px solid ${C.borderGray}`,
      textDecoration: "none",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    {l.label}
  </Link>
))}
           {["Contact"].map(l => (
          <Link key={l} to="/contact" style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.85rem", fontWeight: 500, color: C.textDark,
            padding: "12px 0",
            borderBottom: `1px solid ${C.borderGray}`,
            textDecoration: "none",
            display: "flex", justifyContent: "space-between",
          }}>
            {l}
          </Link>
        ))}


        {/* Accordion */}
        <div>
          <button
            onClick={() => setAccOpen(v => !v)}
            style={{
              width: "100%", background: "none", border: "none", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem", fontWeight: 500, color: C.textDark,
              padding: "12px 0",
              borderBottom: `1px solid ${C.borderGray}`,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}
          >
            Services
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              style={{ transform: accOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease", color: C.textMid }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div ref={accRef} style={{
            overflow: "hidden",
            maxHeight: accOpen ? `${accRef.current?.scrollHeight ?? 300}px` : "0px",
            transition: "max-height 0.3s ease",
          }}>
            <div style={{ padding: "8px 0 4px 16px", display: "flex", flexDirection: "column", gap: "2px" }}>
              {SERVICES.map(s => (
            <Link
  key={s.label}
  to={s.path}
  onClick={() => {
    setAccOpen(false);     // close accordion
  }}
  style={{
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.78rem",
    color: C.accentMid,
    padding: "8px 0",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }}
>
                  <span style={{ color: C.accentLine, display: "flex" }}>{s.icon}</span>
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

      

        <div style={{ marginTop: "12px" }}>
          <BookButton mobile />
        </div>
      </div>
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  const timeoutRef = useRef<number | null>(null);

const openMenu = () => {
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }
  setServicesOpen(true);
};

const closeMenu = () => {
  timeoutRef.current = window.setTimeout(() => {
    setServicesOpen(false);
  }, 150); // delay = smoother UX
};
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node))
        setServicesOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
        .nb-srv-btn::after {
          content: '';
          position: absolute; bottom: 0; left: 0;
          height: 1px; width: 0;
          background: ${C.accentLine};
          transition: width 0.25s ease;
          border-radius: 1px;
        }
        .nb-srv-btn:hover::after { width: 100%; }
        .nb-srv-btn:hover { color: ${C.accentMid} !important; }

        @media (min-width: 1024px) { .nb-hamburger { display: none !important; } }
        @media (max-width: 1023px) { .nb-desktop-links { display: none !important; } .nb-book-desktop { display: none !important; } }
      `}</style>

      {/* ── Top info bar ── */}
      <div style={{
        width: "100%", background: C.accent,
        padding: "7px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.6rem", color: "rgba(255,255,255,0.55)",
          letterSpacing: "0.14em", textTransform: "uppercase",
        }}>
          Lun – Sam · 09h00 – 19h00
        </span>
        <div style={{ display: "flex", gap: "24px" }}>
          {[
            {
              href: "tel:+21694645686", label: "+216 94 645 686",
              d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
            },
            {
              href: "mailto:mnajafathi@yahoo.fr", label: "mnajafathi@yahoo.fr",
              d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
            },
          ].map(({ href, label, d }) => (
            <TopBarLink key={href} href={href} label={label} d={d} />
          ))}
        </div>
      </div>

      {/* ── Main nav ── */}
      <nav style={{
        width: "100%", position: "sticky", top: 0, zIndex: 50,
        background: scrolled ? C.borderGray : C.lightGray,
        borderBottom: `1px solid ${C.borderGray}`,
        boxShadow: scrolled ? "0 1px 24px rgba(26,31,46,0.07)" : "none",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        transition: "all 0.3s ease",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>

            <Logo />

            {/* Desktop links */}
            <div className="nb-desktop-links" style={{ display: "flex", alignItems: "center", gap: "32px" }}>
              <NavLink label="Accueil"to="/" />
              <NavLink label="À propos" to="/apropos"/>

              {/* Services with dropdown */}
            <div
                  ref={servicesRef}
                  style={{ position: "relative" }}
                  onMouseEnter={openMenu}
                  onMouseLeave={closeMenu}
                >
                <button
                  className="nb-srv-btn"
                  onClick={() => setServicesOpen(v => !v)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem", fontWeight: 500,
                    color: servicesOpen ? C.accentMid : C.textDark,
                    background: "none", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: "4px",
                    letterSpacing: "0.02em",
                    padding: "2px 0",
                    position: "relative",
                    transition: "color 0.18s ease",
                  }}
                >
                  Services
                  <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    style={{ transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <ServicesDropdown open={servicesOpen} />
              </div>

              <NavLink label="Contact" to="/contact" />
            </div>

            {/* Right side */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div className="nb-book-desktop">
                <BookButton />
              </div>
              <div className="nb-hamburger">
                <Hamburger open={mobileOpen} onClick={() => setMobileOpen(v => !v)} />
              </div>
            </div>

          </div>
        </div>

        <MobileMenu open={mobileOpen} />
      </nav>
    </>
  );
}

function TopBarLink({ href, label, d }: { href: string; label: string; d: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: "6px",
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.6rem", letterSpacing: "0.1em",
        color: hov ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.6)",
        textDecoration: "none",
        transition: "color 0.18s ease",
      }}
    >
      <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
      </svg>
      {label}
    </a>
  );
}