import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "40+", label: "Années d'expérience" },
  { value: "1000s", label: "Interventions laser" },
  { value: "Paris", label: "Ancien Attaché des Hôpitaux" },
  { value: "N°1", label: "Pionnier en Afrique du Nord" },
];

export default function APropos() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        .apropos-section {
          background: #f9f6f1;
          padding: 120px 0;
          font-family: 'Jost', sans-serif;
          overflow: hidden;
          position: relative;
        }

        .apropos-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background:
            radial-gradient(ellipse 60% 40% at 10% 20%, rgba(198,168,124,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 50% 60% at 90% 80%, rgba(139,110,80,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .apropos-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
          position: relative;
        }

        /* ─── Header ─── */
        .apropos-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 80px;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .apropos-header.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .header-line {
          flex: 0 0 60px;
          height: 1px;
          background: #2D5986;
        }

        .header-text {
          display: flex;
          flex-direction: column;
        }

        .header-eyebrow {
          font-family: 'Jost', sans-serif;
          font-weight: 500;
          font-size: 11px;
          letter-spacing: 0.35em;
          color: #2D5986;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .header-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(42px, 5vw, 64px);
          font-weight: 300;
          color: #1a1410;
          line-height: 1;
          letter-spacing: -0.01em;
        }

        .header-title em {
          font-style: italic;
          color: #4A90C4;
        }

        /* ─── Main Layout ─── */
        .apropos-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }

        /* ─── Left: Images ─── */
        .images-col {
          position: relative;
          height: 640px;
        }

        .img-card {
          position: absolute;
          overflow: hidden;
          box-shadow: 0 24px 64px rgba(0,0,0,0.12);
          opacity: 0;
          transition: opacity 0.9s ease, transform 0.9s ease, box-shadow 0.4s ease;
        }

        .img-card:hover {
          box-shadow: 0 32px 80px rgba(0,0,0,0.18);
          z-index: 10;
        }

        .img-card.visible {
          opacity: 1;
        }

        .img-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }

        .img-card:hover img {
          transform: scale(1.04);
        }

        /* Doctor photo – main, left side */
        .img-doctor {
          width: 72%;
          height: 500px;
          top: 0;
          left: 0;
          transform: translateX(-40px);
        }
        .img-doctor.visible {
          transform: translateX(0);
          transition-delay: 0.2s;
        }

        /* Office photo – smaller, overlapping bottom-right */
        .img-office {
          width: 52%;
          height: 300px;
          bottom: 0;
          right: 0;
          transform: translateX(40px);
          border: 6px solid #f9f6f1;
        }
        .img-office.visible {
          transform: translateX(0);
          transition-delay: 0.5s;
        }

        /* Gold accent tag on doctor photo */
        .img-badge {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: #1a1410;
          color: #2D5986;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          padding: 10px 16px;
          z-index: 5;
        }

        /* Decorative corner element */
        .corner-ornament {
          position: absolute;
          top: -16px;
          right: 28%;
          width: 48px;
          height: 48px;
          border-top: 2px solid #4A90C4;
          border-right: 2px solid #2D5986;
          opacity: 0;
          transition: opacity 0.8s ease 0.8s;
        }
        .corner-ornament.visible { opacity: 1; }

        /* ─── Right: Text ─── */
        .text-col {
          padding-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .text-block {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .text-block.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .text-block:nth-child(1) { transition-delay: 0.15s; }
        .text-block:nth-child(2) { transition-delay: 0.3s; }
        .text-block:nth-child(3) { transition-delay: 0.45s; }

        .dr-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 3vw, 40px);
          font-weight: 400;
          color: #1a1410;
          margin: 0 0 4px 0;
          line-height: 1.1;
        }

        .dr-title {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.3em;
          color: #1A3A5C;
          text-transform: uppercase;
          margin-bottom: 32px;
        }

        .divider {
          width: 48px;
          height: 1px;
          background: linear-gradient(90deg, #2D5986, transparent);
          margin-bottom: 32px;
        }

        .bio-text {
          font-family: 'Jost', sans-serif;
          font-size: 15px;
          font-weight: 300;
          line-height: 1.85;
          color: #1A3A5C;
          margin-bottom: 24px;
        }

        .bio-highlight {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-style: italic;
          font-weight: 400;
          color: #1A3A5C;
          line-height: 1.7;
          border-left: 2px solid #2D5986;
          padding-left: 20px;
          margin: 28px 0;
        }

        /* ─── Stats ─── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          margin-top: 64px;
          border-top: 1px solid rgba(198,168,124,0.3);
          border-bottom: 1px solid rgba(198,168,124,0.3);
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s;
        }
        .stats-grid.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .stat-item {
          padding: 32px 24px;
          text-align: center;
          border-right: 1px solid rgba(198,168,124,0.3);
          position: relative;
          transition: background 0.3s ease;
        }
        .stat-item:last-child { border-right: none; }

        .stat-item:hover {
          background: rgba(198,168,124,0.05);
        }

        .stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 300;
          color: #4A90C4;
          line-height: 1;
          display: block;
          margin-bottom: 8px;
        }

        .stat-label {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.2em;
          color: #2D5986;
          text-transform: uppercase;
          display: block;
          line-height: 1.4;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .apropos-grid {
            grid-template-columns: 1fr;
            gap: 60px;
          }
          .images-col {
            height: 480px;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .stat-item:nth-child(2) { border-right: none; }
          .stat-item:nth-child(3) { border-top: 1px solid rgba(198,168,124,0.3); }
          .stat-item:nth-child(4) { border-top: 1px solid rgba(198,168,124,0.3); }
        }

        @media (max-width: 640px) {
          .apropos-section { padding: 80px 0; }
          .apropos-inner { padding: 0 24px; }
          .images-col { height: 380px; }
          .img-doctor { height: 360px; }
          .img-office { height: 220px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .apropos-header { margin-bottom: 48px; }
        }
      `}</style>

      <section className="apropos-section" ref={sectionRef}>
        <div className="apropos-inner">

          {/* Header */}
          <div className={`apropos-header ${visible ? "visible" : ""}`}>
            <div className="header-line" />
            <div className="header-text">
              <span className="header-eyebrow">À propos</span>
              <h2 className="header-title">Dr. <em>Fathi</em> Mnajja</h2>
            </div>
          </div>

          {/* Main 2-col grid */}
          <div className="apropos-grid">

            {/* ── Images Column ── */}
            <div className="images-col">
              {/* Doctor photo */}
              <div className={`img-card img-doctor ${visible ? "visible" : ""}`}>
                <img
                  src="/img/drmnaja.jpeg"
                  alt="Dr. Fathi Mnajja – Dermatologue"
                  onError={(e) => {
                    const t = e.currentTarget;
                    t.style.display = "none";
                    const parent = t.parentElement!;
                    parent.style.background =
                      "linear-gradient(160deg, #d4bfa0 0%, #a08060 100%)";
                    parent.innerHTML = `
                      <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#f9f6f1;gap:12px;padding:24px;box-sizing:border-box;">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="24" cy="16" r="10" stroke="#f9f6f1" stroke-width="1.5"/>
                          <path d="M8 44c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="#f9f6f1" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                        <span style="font-family:'Jost',sans-serif;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;opacity:0.8">Dr. Fathi Mnajja</span>
                      </div>
                    `;
                  }}
                />
                <div className="img-badge">Dermatologue · Médecin Esthétique</div>
              </div>

              {/* Office photo */}
              <div className={`img-card img-office ${visible ? "visible" : ""}`}>
                <img
                  src="/img/cabinet.jpeg"
                  alt="Cabinet du Dr. Mnajja"
                  onError={(e) => {
                    const t = e.currentTarget;
                    t.style.display = "none";
                    const parent = t.parentElement!;
                    parent.style.background =
                      "linear-gradient(160deg, #2a2018 0%, #4a3828 100%)";
                    parent.innerHTML = `
                      <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#c6a87c;gap:10px;padding:20px;box-sizing:border-box;">
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="8" width="30" height="22" rx="2" stroke="#c6a87c" stroke-width="1.5"/>
                          <path d="M12 8V6a6 6 0 0 1 12 0v2" stroke="#c6a87c" stroke-width="1.5"/>
                          <path d="M18 18v4M16 20h4" stroke="#c6a87c" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                        <span style="font-family:'Jost',sans-serif;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;opacity:0.7">Notre Cabinet</span>
                      </div>
                    `;
                  }}
                />
              </div>

              {/* Corner ornament */}
              <div className={`corner-ornament ${visible ? "visible" : ""}`} />
            </div>

            {/* ── Text Column ── */}
            <div className="text-col">

              <div className={`text-block ${visible ? "visible" : ""}`}>
                <h3 className="dr-name">Dr. Fathi Mnajja</h3>
                <p className="dr-title">Dermatologue & Médecin Esthétique · Pionnier du Laser</p>
                <div className="divider" />
              </div>

              <div className={`text-block ${visible ? "visible" : ""}`}>
                <p className="bio-text">
                  Le Dr Fathi Mnajja incarne l'excellence absolue en dermatologie et en médecine esthétique,
                  avec plus de 40 années d'expérience dédiées à l'innovation et à la prise en charge de milliers
                  de patients. Ancien Attaché des Hôpitaux de Paris, il s'est imposé comme un véritable pionnier
                  non seulement en Tunisie, mais aussi en Afrique du Nord, en étant parmi les tout premiers à
                  introduire et maîtriser les technologies laser dès leurs débuts.
                </p>

                <blockquote className="bio-highlight">
                  Visionnaire et précurseur à l'échelle internationale, il a eu l'honneur de côtoyer et de
                  collaborer avec les plus grandes sommités mondiales du domaine.
                </blockquote>

                <p className="bio-text">
                  Au cours de sa carrière exceptionnelle, le Dr Mnajja a réalisé des milliers d'interventions
                  laser avec une précision remarquable, faisant de lui une référence incontournable pour des
                  résultats fiables, naturels et durables. Spécialiste des maladies du cuir chevelu et des ongles,
                  expert en greffe capillaire et en médecine esthétique, il allie rigueur médicale, sens du détail
                  et technologies de pointe pour offrir à chaque patient une prise en charge sur mesure.
                </p>

                <p className="bio-text">
                  Choisir le Dr Mnajja, c'est accéder à un niveau d'expertise rare, reconnu bien au-delà des
                  frontières, et bénéficier d'un savoir-faire d'exception au service de votre peau, de votre image
                  et de votre confiance.
                </p>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className={`stats-grid ${visible ? "visible" : ""}`}>
            {stats.map((s) => (
              <div className="stat-item" key={s.label}>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}