import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContent, useLang } from "../lib/useContent";
import { T, tr } from "../lib/i18n";
import { SITE_NAV_LOGO } from "../lib/siteAssets";
import { showreelInNav } from "../lib/crop";

export const Nav = () => {
  const content = useContent();
  const [lang, setLang] = useLang();
  const location = useLocation();

  const [overHero, setOverHero] = useState(false);
  const [open, setOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    setOverHero(false);
  }, [location.pathname]);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  if (location.pathname.startsWith("/admin")) return null;
  if (location.pathname === "/showreel") return null;

  const navShowreel =
    showreelInNav(content.site?.showreel_placement) && content.site?.showreel_url;

  // El nav es siempre visible. Transparente sobre el hero, glass al hacer scroll.
  const isTransparent = overHero && !open;
  const isHidden = isFullscreen;

  const logoUrl = SITE_NAV_LOGO;

  const linkClass = ({ isActive }) =>
    `text-[12px] tracking-[0.22em] uppercase transition-all duration-300 px-3.5 py-2 rounded-full ${isTransparent
      ? isActive
        ? "text-ivory-mist bg-ivory-mist/12"
        : "text-ivory-mist/60 hover:text-ivory-mist hover:bg-ivory-mist/8"
      : isActive
        ? "text-shadow-grey bg-carrot-orange"
        : "text-shadow-grey/60 hover:text-shadow-grey hover:bg-olive/10"
    }`;

  const navFg = isTransparent ? "text-ivory-mist" : "text-shadow-grey";
  const navFgMuted = isTransparent ? "text-ivory-mist/55" : "text-shadow-grey/55";
  const navPillBg = isTransparent
    ? "bg-ivory-mist/8 border border-ivory-mist/10"
    : "bg-shadow-grey/8 border border-shadow-grey/10";
  const navHamburgerHover = isTransparent ? "hover:bg-ivory-mist/8" : "hover:bg-shadow-grey/8";
  const navBarColor = isTransparent ? "bg-ivory-mist" : "bg-shadow-grey";
  const navPillInactive = isTransparent
    ? "text-ivory-mist/55 hover:text-ivory-mist"
    : "text-shadow-grey/55 hover:text-shadow-grey";

  return (
    <header
      data-testid="site-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isHidden ? "opacity-0 pointer-events-none" : isTransparent ? "bg-transparent" : ""} backdrop-blur-3xl`}
      style={(!isHidden && !isTransparent) ? { backgroundColor: "var(--ivory-mist)" } : {}}
    >
      <div className="px-4 sm:px-6 md:px-10 lg:px-14 py-4 md:py-5 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" data-testid="nav-logo" className="flex items-center gap-2.5 leading-none shrink-0">
          {logoUrl && (
            <img
              src={logoUrl}
              alt="Remarubi"
              width={300}
              height={140}
              decoding="async"
              className={`h-16 w-auto md:h-24 transition-all duration-500 ${isTransparent ? "invert" : ""}`}
            />
          )}
          <span className="flex flex-col">
            <span className={`font-display text-lg md:text-xl leading-none mb-2 ${navFg}`}>
              {content.site.name}
            </span>
            <span className={`font-accent text-[9px] md:text-[10px] tracking-[0.32em] uppercase mt-0.5 ${navFgMuted}`}>
              {tr(content.site.title, lang)}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/work" className={linkClass} data-testid="nav-work">
            {tr(T.nav.work, lang)}
          </NavLink>
          {navShowreel && (
            <NavLink to="/showreel" className={linkClass} data-testid="nav-showreel">
              {tr(T.nav.showreel, lang)}
            </NavLink>
          )}
          <NavLink to="/about" className={linkClass} data-testid="nav-about">
            {tr(T.nav.about, lang)}
          </NavLink>
          <NavLink to="/contact" className={linkClass} data-testid="nav-contact">
            {tr(T.nav.contact, lang)}
          </NavLink>

          {/* Idioma — pill compacta */}
          <div className={`ml-3 flex items-center gap-0.5 rounded-full p-1 ${navPillBg}`}>
            <button
              data-testid="lang-es"
              onClick={() => setLang("es")}
              className={`px-2.5 py-1 rounded-full text-[10px] tracking-[0.18em] uppercase transition-all duration-300 ${lang === "es"
                ? isTransparent ? "bg-ivory-mist/15 text-ivory-mist" : "bg-carrot-orange text-shadow-grey"
                : navPillInactive
                }`}
            >
              ES
            </button>
            <button
              data-testid="lang-en"
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 rounded-full text-[10px] tracking-[0.18em] uppercase transition-all duration-300 ${lang === "en"
                ? isTransparent ? "bg-ivory-mist/15 text-ivory-mist" : "bg-carrot-orange text-shadow-grey"
                : navPillInactive
                }`}
            >
              EN
            </button>
            <button
              data-testid="lang-ca"
              onClick={() => setLang("ca")}
              className={`px-2.5 py-1 rounded-full text-[10px] tracking-[0.18em] uppercase transition-all duration-300 ${lang === "ca"
                ? isTransparent ? "bg-ivory-mist/15 text-ivory-mist" : "bg-carrot-orange text-shadow-grey"
                : navPillInactive
                }`}
            >
              CA
            </button>
          </div>
        </nav>

        {/* Hamburguesa móvil */}
        <button
          data-testid="nav-mobile-toggle"
          className={`md:hidden flex flex-col gap-[5px] p-2 rounded-full transition ${navHamburgerHover}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <span className={`block w-5 h-px transition-all ${navBarColor} ${open ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`block w-5 h-px transition-all ${navBarColor} ${open ? "opacity-0" : "opacity-100"}`} />
          <span className={`block w-5 h-px transition-all ${navBarColor} ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Menú móvil — glass panel */}
      {open && (
        <div
          className="md:hidden mx-2 mb-2 rounded-2xl bg-shadow-grey/90 backdrop-blur-2xl border border-ivory-mist/10 overflow-hidden"
          data-testid="nav-mobile-menu"
        >
          <div className="px-5 py-6 flex flex-col gap-1">
            <NavLink
              to="/work"
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl text-[12px] tracking-[0.24em] uppercase transition-all ${isActive ? "text-ivory-mist bg-ivory-mist/10" : "text-ivory-mist/65 hover:text-ivory-mist hover:bg-ivory-mist/8"
                }`
              }
            >
              {tr(T.nav.work, lang)}
            </NavLink>
            {navShowreel && (
              <NavLink
                to="/showreel"
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-xl text-[12px] tracking-[0.24em] uppercase transition-all ${isActive ? "text-ivory-mist bg-ivory-mist/10" : "text-ivory-mist/65 hover:text-ivory-mist hover:bg-ivory-mist/8"
                  }`
                }
              >
                {tr(T.nav.showreel, lang)}
              </NavLink>
            )}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl text-[12px] tracking-[0.24em] uppercase transition-all ${isActive ? "text-ivory-mist bg-ivory-mist/10" : "text-ivory-mist/65 hover:text-ivory-mist hover:bg-ivory-mist/8"
                }`
              }
            >
              {tr(T.nav.about, lang)}
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl text-[12px] tracking-[0.24em] uppercase transition-all ${isActive ? "text-ivory-mist bg-ivory-mist/10" : "text-ivory-mist/65 hover:text-ivory-mist hover:bg-ivory-mist/8"
                }`
              }
            >
              {tr(T.nav.contact, lang)}
            </NavLink>

            <div className="mt-3 pt-4 border-t border-ivory-mist/8 flex items-center gap-2">
              <button
                onClick={() => setLang("es")}
                className={`flex-1 py-2 rounded-xl text-[11px] tracking-[0.2em] uppercase transition-all ${lang === "es" ? "bg-carrot-orange text-ivory-mist" : "text-ivory-mist/45 hover:bg-ivory-mist/6 hover:text-ivory-mist"
                  }`}
              >
                ES
              </button>
              <button
                onClick={() => setLang("en")}
                className={`flex-1 py-2 rounded-xl text-[11px] tracking-[0.2em] uppercase transition-all ${lang === "en" ? "bg-carrot-orange text-ivory-mist" : "text-ivory-mist/45 hover:bg-ivory-mist/6 hover:text-ivory-mist"
                  }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("ca")}
                className={`flex-1 py-2 rounded-xl text-[11px] tracking-[0.2em] uppercase transition-all ${lang === "ca" ? "bg-carrot-orange text-ivory-mist" : "text-ivory-mist/45 hover:bg-ivory-mist/6 hover:text-ivory-mist"
                  }`}
              >
                CA
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
