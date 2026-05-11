import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ favCount }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/favorites", label: "Saved", badge: favCount },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[rgba(10,10,10,0.92)] backdrop-blur-md border-b border-[var(--border)]' : 'border-b border-transparent'}`}>
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center gap-10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-[var(--font-display)] text-[22px] tracking-[2px] flex-shrink-0">
          <span className="text-[20px]">⚡</span>
          <span>
            EMERG<span className="text-[var(--accent-red)]">FIND</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1 flex-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative px-4 py-1.5 text-[13px] font-medium tracking-[0.5px] text-[var(--text-secondary)] rounded-md uppercase flex items-center gap-1.5 ${location.pathname === link.to ? 'text-[var(--text-primary)] bg-[var(--bg-card)]' : 'hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'}`}
            >
              {link.label}
              {link.badge > 0 && (
                <span className="ml-2 bg-[var(--accent-red)] text-white text-[10px] font-semibold px-2 rounded-full font-[var(--font-mono)]">{link.badge}</span>
              )}
              {location.pathname === link.to && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-[var(--accent-red)] rounded-sm" />
              )}
            </Link>
          ))}
        </div>

        {/* Emergency pill */}
        <a href="tel:999" className="hidden md:flex items-center gap-2 px-5 py-2 bg-[var(--accent-red)] text-white font-[var(--font-display)] text-[16px] tracking-[1.5px] rounded-md transition-transform duration-200 flex-shrink-0 hover:bg-[#ff2a3d] hover:-translate-y-0.5">
          <span className="w-[7px] h-[7px] bg-white rounded-full animate-pulse" />
          CALL 999
        </a>

        {/* Mobile hamburger */}
        <button
          className={`flex md:hidden flex-col gap-1 p-1 ml-auto ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-[2px] bg-[var(--text-primary)] transition-all origin-center ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block w-5 h-[2px] bg-[var(--text-primary)] transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[2px] bg-[var(--text-primary)] transition-all origin-center ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`flex flex-col md:hidden px-6 pb-5 bg-[rgba(10,10,10,0.98)] backdrop-blur-md border-b border-[var(--border)] overflow-hidden transition-[max-height] ${menuOpen ? 'max-h-[300px]' : 'max-h-0'}`}>
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`py-3 text-[14px] font-medium text-[var(--text-secondary)] border-b border-[var(--border)] uppercase tracking-[0.5px] flex items-center gap-2 ${location.pathname === link.to ? 'text-[var(--text-primary)]' : ''}`}
          >
            {link.label}
            {link.badge > 0 && <span className="ml-2 bg-[var(--accent-red)] text-white text-[10px] font-semibold px-2 rounded-full font-[var(--font-mono)]">{link.badge}</span>}
          </Link>
        ))}
        <a href="tel:999" className="mt-4 py-3 bg-[var(--accent-red)] text-white font-[var(--font-display)] text-[18px] tracking-[1px] rounded-md text-center">⚡ CALL 999 NOW</a>
      </div>
    </nav>
  );
}