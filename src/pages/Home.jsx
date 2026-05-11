import { Link } from "react-router-dom";
import { services } from "../data/services";

const criticalServices = services.filter((s) => s.tag === "CRITICAL").slice(0, 3);

export default function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero__bg-grid" />
        <div className="hero__scan" />

        <div className="hero__inner">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            <span>BANGLADESH EMERGENCY SERVICES</span>
          </div>

          <h1 className="hero__title">
            FIND HELP
            <span className="hero__title-break">
              <span className="hero__title-accent">FAST.</span>
            </span>
          </h1>

          <p className="hero__subtitle">
            Instant access to critical emergency contacts across Bangladesh —
            police, fire, medical, disaster relief, and more.
            Every second matters.
          </p>

          <div className="hero__ctas">
            <Link to="/services" className="hero__cta-primary">
              Browse All Services →
            </Link>
            <a href="tel:999" className="hero__cta-emergency">
              <span className="hero__cta-dot" />
              CALL 999 NOW
            </a>
          </div>

          {/* Stats */}
          <div className="hero__stats">
            {[
              { val: "9", label: "Services Listed" },
              { val: "24/7", label: "Always Available" },
              { val: "< 10m", label: "Avg Response" },
              { val: "Free", label: "All Hotlines" },
            ].map((s) => (
              <div key={s.label} className="hero__stat">
                <div className="hero__stat-val">{s.val}</div>
                <div className="hero__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Critical Hotlines */}
      <section className="quick-dial">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-label">CRITICAL HOTLINES</div>
            <h2 className="section-title">Dial Immediately</h2>
          </div>

          <div className="quick-dial__grid">
            {criticalServices.map((svc) => (
              <a key={svc.id} href={`tel:${svc.hotline}`} className="quick-dial__card">
                <div className="quick-dial__icon">{svc.icon}</div>
                <div className="quick-dial__info">
                  <div className="quick-dial__name">{svc.name}</div>
                  <div className="quick-dial__num">{svc.hotline}</div>
                </div>
                <div className="quick-dial__arrow">→</div>
                <div className="quick-dial__bar" style={{ background: svc.color }} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-label">HOW IT WORKS</div>
            <h2 className="section-title">3 Steps to Safety</h2>
          </div>
          <div className="how__grid">
            {[
              { step: "01", title: "Identify the Emergency", desc: "Select the type of emergency you're facing — medical, fire, security, or disaster." },
              { step: "02", title: "Find the Right Service", desc: "Browse filtered service cards with response times, hotlines, and contact details." },
              { step: "03", title: "Call Immediately", desc: "Tap the hotline to dial directly. Save favorites for instant access anytime." },
            ].map((item) => (
              <div key={item.step} className="how__card">
                <div className="how__step">{item.step}</div>
                <h3 className="how__title">{item.title}</h3>
                <p className="how__desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="section-inner">
          <div className="cta-banner__inner">
            <div>
              <h2 className="cta-banner__title">Save Services. Be Ready.</h2>
              <p className="cta-banner__desc">Bookmark critical contacts before an emergency happens.</p>
            </div>
            <Link to="/services" className="cta-banner__btn">
              Explore All Services →
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .home { padding-top: 64px; }

        /* Hero */
        .hero {
          position: relative;
          min-height: 88vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          border-bottom: 1px solid var(--border);
        }
        .hero__bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 0%, black 40%, transparent 100%);
        }
        .hero__scan {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--accent-red), transparent);
          animation: scan 4s linear infinite;
          opacity: 0.4;
        }
        .hero__inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 80px 24px;
          position: relative;
          z-index: 1;
        }
        .hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: rgba(232,25,44,0.08);
          border: 1px solid rgba(232,25,44,0.25);
          border-radius: 20px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 1.5px;
          color: var(--accent-red);
          margin-bottom: 32px;
          animation: fadeUp 0.5s ease both;
        }
        .hero__badge-dot {
          width: 6px; height: 6px;
          background: var(--accent-red);
          border-radius: 50%;
          animation: blink 1.5s infinite;
        }
        .hero__title {
          font-family: var(--font-display);
          font-size: clamp(72px, 14vw, 160px);
          line-height: 0.88;
          letter-spacing: -1px;
          margin-bottom: 28px;
          animation: fadeUp 0.5s 0.1s ease both;
        }
        .hero__title-break {
          display: block;
        }
        .hero__title-accent {
          color: var(--accent-red);
          text-shadow: 0 0 80px rgba(232,25,44,0.4);
        }
        .hero__subtitle {
          max-width: 560px;
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 40px;
          animation: fadeUp 0.5s 0.2s ease both;
        }
        .hero__ctas {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 64px;
          animation: fadeUp 0.5s 0.3s ease both;
        }
        .hero__cta-primary {
          padding: 14px 28px;
          background: var(--text-primary);
          color: var(--bg-primary);
          font-weight: 600;
          font-size: 14px;
          border-radius: 8px;
          transition: all 0.2s;
          letter-spacing: 0.3px;
        }
        .hero__cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255,255,255,0.1);
        }
        .hero__cta-emergency {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          background: var(--accent-red);
          color: white;
          font-family: var(--font-display);
          font-size: 20px;
          letter-spacing: 1px;
          border-radius: 8px;
          transition: all 0.2s;
          animation: pulse-red 2s infinite;
        }
        .hero__cta-emergency:hover {
          background: #ff2a3d;
          transform: translateY(-2px);
        }
        .hero__cta-dot {
          width: 8px; height: 8px;
          background: white;
          border-radius: 50%;
          animation: blink 1s infinite;
        }
        .hero__stats {
          display: flex;
          gap: 40px;
          flex-wrap: wrap;
          animation: fadeUp 0.5s 0.4s ease both;
        }
        .hero__stat-val {
          font-family: var(--font-display);
          font-size: 32px;
          letter-spacing: 1px;
          color: var(--text-primary);
          margin-bottom: 2px;
        }
        .hero__stat-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        /* Section layout */
        .section-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .section-header {
          margin-bottom: 32px;
        }
        .section-label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 2px;
          color: var(--accent-red);
          margin-bottom: 8px;
        }
        .section-title {
          font-family: var(--font-display);
          font-size: 42px;
          letter-spacing: 0.5px;
        }

        /* Quick Dial */
        .quick-dial {
          padding: 80px 0;
          border-bottom: 1px solid var(--border);
        }
        .quick-dial__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }
        .quick-dial__card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 10px;
          position: relative;
          overflow: hidden;
          transition: all 0.2s;
        }
        .quick-dial__card:hover {
          border-color: var(--border-active);
          transform: translateX(4px);
        }
        .quick-dial__bar {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
        }
        .quick-dial__icon { font-size: 28px; }
        .quick-dial__info { flex: 1; }
        .quick-dial__name {
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 2px;
        }
        .quick-dial__num {
          font-family: var(--font-display);
          font-size: 24px;
          color: var(--accent-red);
          letter-spacing: 1px;
        }
        .quick-dial__arrow {
          font-size: 18px;
          color: var(--text-muted);
          transition: transform 0.2s;
        }
        .quick-dial__card:hover .quick-dial__arrow {
          transform: translateX(4px);
          color: var(--text-primary);
        }

        /* How it works */
        .how {
          padding: 80px 0;
          border-bottom: 1px solid var(--border);
        }
        .how__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2px;
        }
        .how__card {
          padding: 32px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          position: relative;
          transition: background 0.2s;
        }
        .how__card:hover { background: var(--bg-card-hover); }
        .how__step {
          font-family: var(--font-display);
          font-size: 64px;
          color: var(--text-muted);
          line-height: 1;
          margin-bottom: 16px;
          opacity: 0.3;
        }
        .how__title {
          font-family: var(--font-display);
          font-size: 24px;
          margin-bottom: 12px;
          letter-spacing: 0.3px;
        }
        .how__desc {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        /* CTA Banner */
        .cta-banner {
          padding: 80px 0;
        }
        .cta-banner__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          padding: 48px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          flex-wrap: wrap;
          position: relative;
          overflow: hidden;
        }
        .cta-banner__inner::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 200px; height: 200px;
          background: var(--accent-red);
          border-radius: 50%;
          opacity: 0.04;
          filter: blur(40px);
        }
        .cta-banner__title {
          font-family: var(--font-display);
          font-size: 36px;
          margin-bottom: 8px;
          letter-spacing: 0.5px;
        }
        .cta-banner__desc {
          font-size: 14px;
          color: var(--text-secondary);
        }
        .cta-banner__btn {
          padding: 14px 28px;
          background: var(--accent-red);
          color: white;
          font-weight: 600;
          font-size: 14px;
          border-radius: 8px;
          transition: all 0.2s;
          flex-shrink: 0;
          white-space: nowrap;
        }
        .cta-banner__btn:hover {
          background: #ff2a3d;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}