import { useMemo, useState } from "react";
import { formatDistance, getDistanceKm, sortByDistance } from "../utils/location";

const EMERGENCY_HOTLINES = [
  { label: "Police", number: "999", icon: "🚔" },
  { label: "Fire", number: "999", icon: "🚒" },
  { label: "Ambulance", number: "999", icon: "🚑" },
];

export default function NearbyServicesPanel({
  services,
  title = "Nearest services",
  subtitle = "Use GPS to sort the closest verified emergency options around you.",
  categories = [],
  limit = 4,
}) {
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setStatus("error");
      setError("GPS is not available in this browser.");
      return;
    }

    setStatus("loading");
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setStatus("ready");
      },
      () => {
        setStatus("error");
        setError("Location access was blocked. Enable GPS to sort by distance.");
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 }
    );
  };

  const focusServices = useMemo(() => {
    const pool = categories.length > 0 ? services.filter((service) => categories.includes(service.category)) : services;

    if (!location) {
      return pool.slice(0, limit).map((service) => ({ ...service, distanceKm: null }));
    }

    return sortByDistance(pool, location)
      .slice(0, limit)
      .map((service) => ({ ...service, distanceKm: getDistanceKm(location, service.location) }));
  }, [categories, limit, location, services]);

  return (
    <section className="nearest-panel">
      <div className="nearest-panel__header">
        <div>
          <div className="nearest-panel__label">GPS DIRECTORY</div>
          <h2 className="nearest-panel__title">{title}</h2>
          <p className="nearest-panel__subtitle">{subtitle}</p>
        </div>
        <button className="nearest-panel__button" onClick={requestLocation}>
          {status === "loading" ? "Finding you..." : "Use my location"}
        </button>
      </div>

      <div className="nearest-panel__hotlines">
        {EMERGENCY_HOTLINES.map((hotline) => (
          <a key={hotline.label} href="tel:999" className="nearest-panel__hotline">
            <span className="nearest-panel__hotline-icon">{hotline.icon}</span>
            <span className="nearest-panel__hotline-copy">
              <span>{hotline.label}</span>
              <strong>Call 999</strong>
            </span>
          </a>
        ))}
      </div>

      <div className="nearest-panel__status-row">
        <span className="nearest-panel__status">
          {location ? `GPS active: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : "GPS not enabled yet"}
        </span>
        {error && <span className="nearest-panel__error">{error}</span>}
      </div>

      <div className="nearest-panel__grid">
        {focusServices.map((service) => {
          const distanceLabel = formatDistance(service.distanceKm);

          return (
            <article key={service.id} className="nearest-panel__card">
              <div className="nearest-panel__card-top">
                <div className="nearest-panel__icon" style={{ background: `${service.color}18`, borderColor: `${service.color}40` }}>
                  {service.icon}
                </div>
                <div className="nearest-panel__meta">
                  <div className="nearest-panel__badges">
                    {service.verified && <span className="nearest-panel__badge nearest-panel__badge--verified">Verified</span>}
                    <span className="nearest-panel__badge">{service.ownership}</span>
                  </div>
                  <h3 className="nearest-panel__name">{service.name}</h3>
                  <p className="nearest-panel__desc">{service.description}</p>
                </div>
              </div>

              <div className="nearest-panel__info">
                <span>{service.category}</span>
                <span>{distanceLabel || service.area || "GPS needed"}</span>
              </div>

              <div className="nearest-panel__actions">
                <a href={`tel:${service.hotline}`} className="nearest-panel__call">
                  Call {service.hotline}
                </a>
                {service.location && (
                  <span className="nearest-panel__distance">
                    {distanceLabel || "Open GPS to rank nearby options"}
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <style>{`
        .nearest-panel {
          max-width: 1280px;
          margin: 0 auto;
          padding: 32px 24px 0;
        }
        .nearest-panel__header {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: flex-start;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .nearest-panel__label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 2px;
          color: var(--accent-red);
          margin-bottom: 8px;
        }
        .nearest-panel__title {
          font-family: var(--font-display);
          font-size: clamp(28px, 4vw, 44px);
          line-height: 1;
          margin-bottom: 8px;
        }
        .nearest-panel__subtitle {
          max-width: 640px;
          color: var(--text-secondary);
          font-size: 14px;
        }
        .nearest-panel__button {
          padding: 12px 18px;
          border-radius: 10px;
          background: var(--accent-red);
          color: white;
          font-family: var(--font-display);
          letter-spacing: 1px;
          font-size: 16px;
          transition: transform 0.2s ease, background 0.2s ease;
          white-space: nowrap;
        }
        .nearest-panel__button:hover {
          transform: translateY(-1px);
          background: #ff2a3d;
        }
        .nearest-panel__hotlines {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          margin-bottom: 16px;
        }
        .nearest-panel__hotline {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border: 1px solid var(--border);
          background: var(--bg-card);
          border-radius: 12px;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .nearest-panel__hotline:hover {
          transform: translateY(-2px);
          border-color: var(--border-active);
        }
        .nearest-panel__hotline-icon {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: rgba(232, 25, 44, 0.12);
          font-size: 20px;
        }
        .nearest-panel__hotline-copy {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .nearest-panel__hotline-copy span {
          color: var(--text-secondary);
          font-size: 12px;
        }
        .nearest-panel__hotline-copy strong {
          font-family: var(--font-display);
          font-size: 20px;
          color: var(--text-primary);
          letter-spacing: 1px;
        }
        .nearest-panel__status-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 16px;
          font-size: 12px;
        }
        .nearest-panel__status {
          color: var(--text-muted);
        }
        .nearest-panel__error {
          color: var(--warning);
        }
        .nearest-panel__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 14px;
        }
        .nearest-panel__card {
          padding: 18px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
        }
        .nearest-panel__card-top {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          margin-bottom: 14px;
        }
        .nearest-panel__icon {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          border: 1px solid;
          border-radius: 12px;
          font-size: 24px;
          flex-shrink: 0;
        }
        .nearest-panel__meta {
          min-width: 0;
          flex: 1;
        }
        .nearest-panel__badges {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }
        .nearest-panel__badge {
          display: inline-flex;
          align-items: center;
          padding: 3px 8px;
          border-radius: 999px;
          border: 1px solid var(--border);
          font-size: 10px;
          color: var(--text-secondary);
          letter-spacing: 0.4px;
        }
        .nearest-panel__badge--verified {
          color: #22c55e;
          border-color: rgba(34, 197, 94, 0.3);
          background: rgba(34, 197, 94, 0.08);
        }
        .nearest-panel__name {
          font-family: var(--font-display);
          font-size: 26px;
          line-height: 1;
          margin-bottom: 6px;
        }
        .nearest-panel__desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .nearest-panel__info {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          font-size: 11px;
          color: var(--text-muted);
          border-top: 1px solid var(--border);
          padding-top: 12px;
          margin-bottom: 12px;
        }
        .nearest-panel__actions {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
        }
        .nearest-panel__call {
          padding: 10px 14px;
          border-radius: 10px;
          background: var(--text-primary);
          color: var(--bg-primary);
          font-weight: 600;
          font-size: 13px;
        }
        .nearest-panel__distance {
          color: var(--accent-red);
          font-size: 12px;
        }
        @media (max-width: 760px) {
          .nearest-panel__hotlines {
            grid-template-columns: 1fr;
          }
          .nearest-panel__button {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
