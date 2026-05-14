import { useState } from "react";

export default function ServiceCard({ service, isFavorite, onToggleFavorite }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyNumber = (num) => {
    navigator.clipboard.writeText(num);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const tagColors = {
    CRITICAL: { bg: "rgba(232,25,44,0.1)", color: "#e8192c", border: "rgba(232,25,44,0.3)" },
    URGENT: { bg: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "rgba(245,158,11,0.3)" },
    SUPPORT: { bg: "rgba(168,85,247,0.1)", color: "#a855f7", border: "rgba(168,85,247,0.3)" },
  };

  const tc = tagColors[service.tag] || tagColors.URGENT;

  return (
    <article className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[12px] overflow-hidden transition-all duration-200 ease-in-out relative hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
      {/* Top accent bar */}
      <div className="h-[3px] w-full" style={{ background: service.color }} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3.5">
          <div className="w-[46px] h-[46px] rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: `${service.color}18`, border: `1px solid ${service.color}30` }}>
            <span className="text-[22px]">{service.icon}</span>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <div className="flex flex-wrap gap-2">
              <span className="inline-block font-[var(--font-mono)] text-[9px] font-medium tracking-wider px-2 py-[2px] rounded-[4px]" style={{ background: tc.bg, color: tc.color, border: `1px solid ${tc.border}` }}>
                {service.tag}
              </span>
              {service.verified && (
                <span className="inline-block font-[var(--font-mono)] text-[9px] font-medium tracking-wider px-2 py-[2px] rounded-[4px] bg-[rgba(34,197,94,0.1)] text-[#22c55e] border border-[rgba(34,197,94,0.25)]">
                  VERIFIED
                </span>
              )}
              {service.ownership && (
                <span className="inline-block font-[var(--font-mono)] text-[9px] font-medium tracking-wider px-2 py-[2px] rounded-[4px] bg-[rgba(255,255,255,0.04)] text-[var(--text-muted)] border border-[var(--border)]">
                  {service.ownership.toUpperCase()}
                </span>
              )}
            </div>
            <span className="text-[11px] text-[var(--text-muted)] uppercase tracking-[0.5px]">{service.category}</span>
          </div>
          <button
            className={`text-2xl text-[var(--text-muted)] transition-transform duration-200 leading-none p-[2px] flex-shrink-0 ${isFavorite ? 'text-[#f59e0b] scale-110' : ''}`}
            onClick={() => onToggleFavorite(service.id)}
            aria-label="Toggle favorite"
          >
            {isFavorite ? "★" : "☆"}
          </button>
        </div>

        {/* Name */}
        <h3 className="font-[var(--font-display)] text-[22px] mb-2 leading-[1.2]">{service.name}</h3>
        <p className="text-[13px] text-[var(--text-secondary)] leading-6 mb-4">{service.description}</p>

        {/* Stats row */}
        <div className="flex items-center gap-4 p-3 bg-[rgba(255,255,255,0.03)] rounded-md mb-4 border border-[var(--border)]">
          <div className="flex flex-col gap-1">
            <span className="font-[var(--font-mono)] text-[9px] text-[var(--text-muted)] tracking-wider">AVAILABLE</span>
            <span className="text-[12px] font-medium" style={{ color: "#22c55e" }}>{service.available}</span>
          </div>
          <div className="w-px h-7 bg-[var(--border)]" />
          <div className="flex flex-col gap-1">
            <span className="font-[var(--font-mono)] text-[9px] text-[var(--text-muted)] tracking-wider">RESPONSE</span>
            <span className="text-[12px] font-medium text-[var(--text-primary)]">{service.responseTime}</span>
          </div>
        </div>

        {typeof service.distanceKm === "number" && (
          <div className="mb-3 text-[12px] text-[var(--text-secondary)]">
            Approx. {service.distanceKm.toFixed(1)} km from your location
          </div>
        )}

        {/* Hotline */}
        <div className="mb-3.5">
          <div className="font-[var(--font-mono)] text-[9px] text-[var(--text-muted)] tracking-wider mb-1.5">EMERGENCY HOTLINE</div>
          <div className="flex items-center gap-2">
            <a href={`tel:${service.hotline}`} className="font-[var(--font-display)] text-[28px] text-[var(--text-primary)] transition-colors hover:text-[var(--accent-red)]">
              📞 {service.hotline}
            </a>
            <button
              className="px-2 py-1 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-md text-[var(--text-secondary)] text-base"
              onClick={() => copyNumber(service.hotline)}
            >
              {copied ? "✓" : "⎘"}
            </button>
          </div>
        </div>

        {/* Expand toggle */}
        <button
          className="font-[var(--font-mono)] text-[10px] text-[var(--text-muted)] transition-colors py-1"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "▲ Less info" : "▼ More info"}
        </button>

        {/* Expanded details */}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-[var(--border)] flex flex-col gap-2 fade-up">
            {service.altNumber && (
              <div className="flex items-start gap-3">
                <span className="font-[var(--font-mono)] text-[9px] text-[var(--text-muted)] tracking-wider flex-shrink-0 w-20 pt-0.5">ALT NUMBER</span>
                <a href={`tel:${service.altNumber}`} className="text-[12px] text-[var(--text-secondary)] text-[var(--accent-red)] hover:underline">{service.altNumber}</a>
              </div>
            )}
            <div className="flex items-start gap-3">
              <span className="font-[var(--font-mono)] text-[9px] text-[var(--text-muted)] tracking-wider flex-shrink-0 w-20 pt-0.5">ADDRESS</span>
              <span className="text-[12px] text-[var(--text-secondary)]">{service.address}</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-[var(--font-mono)] text-[9px] text-[var(--text-muted)] tracking-wider flex-shrink-0 w-20 pt-0.5">EMAIL</span>
              <a href={`mailto:${service.email}`} className="text-[12px] text-[var(--text-secondary)] text-[var(--accent-red)] hover:underline">{service.email}</a>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-[var(--font-mono)] text-[9px] text-[var(--text-muted)] tracking-wider flex-shrink-0 w-20 pt-0.5">WEBSITE</span>
              <a href={service.website} target="_blank" rel="noopener noreferrer" className="text-[12px] text-[var(--text-secondary)] text-[var(--accent-red)] hover:underline">↗ Visit site</a>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}