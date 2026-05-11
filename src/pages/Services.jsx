import { useState, useMemo } from "react";
import { services, categories } from "../data/services";
import ServiceCard from "../components/ServiceCard";

export default function Services({ favorites, onToggleFavorite }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [tagFilter, setTagFilter] = useState("All");

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase()) ||
        s.hotline.includes(search);
      const matchCategory =
        activeCategory === "All" || s.category === activeCategory;
      const matchTag = tagFilter === "All" || s.tag === tagFilter;
      return matchSearch && matchCategory && matchTag;
    });
  }, [search, activeCategory, tagFilter]);

  return (
    <div className="services-page">
      {/* Page header */}
      <div className="services-header">
        <div className="services-header__inner">
          <div className="services-header__meta">
            <span className="services-header__label">DIRECTORY</span>
            <span className="services-header__count">{services.length} SERVICES</span>
          </div>
          <h1 className="services-header__title">Emergency Services</h1>
          <p className="services-header__sub">
            Complete directory of emergency contacts. Filter by category, priority, or search by name and number.
          </p>
        </div>
      </div>

      <div className="services-body">
        {/* Sidebar */}
        <aside className="services-sidebar">
          {/* Search */}
          <div className="filter-group">
            <div className="filter-group__label">SEARCH</div>
            <div className="search-input-wrap">
              <span className="search-input-icon">⌕</span>
              <input
                type="text"
                className="search-input"
                placeholder="Name, number, keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button className="search-clear" onClick={() => setSearch("")}>✕</button>
              )}
            </div>
          </div>

          {/* Category filter */}
          <div className="filter-group">
            <div className="filter-group__label">CATEGORY</div>
            <div className="filter-list">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Priority filter */}
          <div className="filter-group">
            <div className="filter-group__label">PRIORITY</div>
            <div className="filter-list">
              {["All", "CRITICAL", "URGENT", "SUPPORT"].map((tag) => {
                const colors = {
                  CRITICAL: "#e8192c",
                  URGENT: "#f59e0b",
                  SUPPORT: "#a855f7",
                  All: "var(--text-secondary)",
                };
                return (
                  <button
                    key={tag}
                    className={`filter-btn ${tagFilter === tag ? "active" : ""}`}
                    onClick={() => setTagFilter(tag)}
                    style={tagFilter === tag ? { borderColor: colors[tag], color: colors[tag] } : {}}
                  >
                    {tag !== "All" && (
                      <span style={{ color: colors[tag], fontSize: 10 }}>●</span>
                    )}
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active filters summary */}
          {(search || activeCategory !== "All" || tagFilter !== "All") && (
            <div className="active-filters">
              <div className="filter-group__label">ACTIVE FILTERS</div>
              <div className="active-filters__list">
                {search && (
                  <span className="active-filter-chip">
                    "{search}"
                    <button onClick={() => setSearch("")}>✕</button>
                  </span>
                )}
                {activeCategory !== "All" && (
                  <span className="active-filter-chip">
                    {activeCategory}
                    <button onClick={() => setActiveCategory("All")}>✕</button>
                  </span>
                )}
                {tagFilter !== "All" && (
                  <span className="active-filter-chip">
                    {tagFilter}
                    <button onClick={() => setTagFilter("All")}>✕</button>
                  </span>
                )}
              </div>
              <button
                className="clear-all-btn"
                onClick={() => { setSearch(""); setActiveCategory("All"); setTagFilter("All"); }}
              >
                Clear all
              </button>
            </div>
          )}
        </aside>

        {/* Cards grid */}
        <main className="services-grid-wrap">
          <div className="services-grid-top">
            <span className="services-grid-result">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {filtered.length > 0 ? (
            <div className="services-grid">
              {filtered.map((svc, i) => (
                <div key={svc.id} style={{ animationDelay: `${i * 0.05}s` }} className="fade-up">
                  <ServiceCard
                    service={svc}
                    isFavorite={favorites.includes(svc.id)}
                    onToggleFavorite={onToggleFavorite}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="services-empty">
              <div className="services-empty__icon">🔍</div>
              <h3 className="services-empty__title">No services found</h3>
              <p className="services-empty__sub">Try adjusting your search or filters.</p>
            </div>
          )}
        </main>
      </div>

      <style>{`
        .services-page {
          padding-top: 64px;
          min-height: 100vh;
        }
        .services-header {
          border-bottom: 1px solid var(--border);
          background: var(--bg-secondary);
          padding: 48px 0 40px;
        }
        .services-header__inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .services-header__meta {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 12px;
        }
        .services-header__label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 2px;
          color: var(--accent-red);
        }
        .services-header__count {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 1px;
          color: var(--text-muted);
          padding: 2px 8px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 4px;
        }
        .services-header__title {
          font-family: var(--font-display);
          font-size: clamp(36px, 6vw, 60px);
          letter-spacing: 0.5px;
          margin-bottom: 10px;
        }
        .services-header__sub {
          font-size: 14px;
          color: var(--text-secondary);
          max-width: 500px;
        }
        .services-body {
          max-width: 1280px;
          margin: 0 auto;
          padding: 40px 24px;
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 40px;
          align-items: start;
        }
        .services-sidebar {
          position: sticky;
          top: 84px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .filter-group__label {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 1.5px;
          color: var(--text-muted);
          margin-bottom: 10px;
        }
        .search-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-input-icon {
          position: absolute;
          left: 10px;
          font-size: 16px;
          color: var(--text-muted);
          pointer-events: none;
        }
        .search-input {
          width: 100%;
          padding: 9px 32px 9px 30px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--text-primary);
          font-size: 13px;
          transition: border-color 0.2s;
          outline: none;
        }
        .search-input::placeholder { color: var(--text-muted); }
        .search-input:focus { border-color: var(--accent-red); }
        .search-clear {
          position: absolute;
          right: 8px;
          color: var(--text-muted);
          font-size: 11px;
          transition: color 0.2s;
        }
        .search-clear:hover { color: var(--text-primary); }
        .filter-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .filter-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          text-align: left;
          font-size: 13px;
          color: var(--text-secondary);
          border-radius: 6px;
          border: 1px solid transparent;
          transition: all 0.15s;
        }
        .filter-btn:hover {
          background: var(--bg-card);
          color: var(--text-primary);
        }
        .filter-btn.active {
          background: var(--bg-card);
          color: var(--text-primary);
          border-color: var(--border-active);
        }
        .active-filters {
          padding: 16px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 8px;
        }
        .active-filters__list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 10px;
        }
        .active-filter-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 3px 8px;
          background: rgba(232,25,44,0.1);
          border: 1px solid rgba(232,25,44,0.25);
          color: var(--accent-red);
          font-size: 11px;
          border-radius: 4px;
        }
        .active-filter-chip button {
          color: var(--accent-red);
          font-size: 10px;
        }
        .clear-all-btn {
          font-size: 11px;
          color: var(--text-muted);
          text-decoration: underline;
        }
        .clear-all-btn:hover { color: var(--text-secondary); }
        .services-grid-wrap { min-width: 0; }
        .services-grid-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .services-grid-result {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.5px;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
        }
        .services-empty {
          text-align: center;
          padding: 80px 24px;
        }
        .services-empty__icon { font-size: 48px; margin-bottom: 16px; }
        .services-empty__title {
          font-family: var(--font-display);
          font-size: 28px;
          margin-bottom: 8px;
        }
        .services-empty__sub { font-size: 14px; color: var(--text-secondary); }
        @media (max-width: 900px) {
          .services-body {
            grid-template-columns: 1fr;
          }
          .services-sidebar {
            position: static;
          }
          .filter-list {
            flex-direction: row;
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
}