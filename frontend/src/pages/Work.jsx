import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContent, useLang } from "../lib/useContent";
import { T, tr } from "../lib/i18n";
import { getActiveCategories, getActiveRoles } from "../lib/contentStore";
import { ProjectCard } from "../components/ProjectCard";

export default function Work() {
  const content = useContent();
  const [lang] = useLang();
  const { category } = useParams();
  const navigate = useNavigate();

  // Estado local para el filtro activo — evita cambio de ruta y salto de scroll
  const [active, setActive] = useState(category || "all");
  // Filtro fino por rol, dentro del departamento activo (o de todos si "all")
  const [activeRole, setActiveRole] = useState("all");

  const handleFilter = (id) => {
    setActive(id);
    setActiveRole("all");
    const path = id === "all" ? "/work" : `/work/${id}`;
    navigate(path, { replace: true, preventScrollReset: true });
  };

  const allProjects = useMemo(() => content.projects || [], [content.projects]);

  const activeRoles = useMemo(
    () => getActiveRoles(allProjects, active === "all" ? null : active),
    [allProjects, active],
  );

  // Si cambia el departamento y el rol seleccionado ya no aplica, resetear
  useEffect(() => {
    if (activeRole !== "all" && !activeRoles.some((r) => r.id === activeRole)) {
      setActiveRole("all");
    }
  }, [activeRoles, activeRole]);

  const matchesFilters = (p) =>
    (active === "all" || p.category === active) &&
    (activeRole === "all" || p.role === activeRole);

  // Número de proyectos visibles según los filtros activos
  const visibleCount = useMemo(
    () => allProjects.filter(matchesFilters).length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [active, activeRole, allProjects],
  );

  const btnBase =
    "text-[11px] tracking-[0.28em] uppercase pb-1 transition-colors whitespace-nowrap cursor-pointer bg-transparent border-0 p-0 font-inherit";

  return (
    <div data-testid="work-page" className="bg-ivory-mist pt-24 sm:pt-32 md:pt-40 transition-colors duration-500">
      <div className="px-4 sm:px-6 md:px-12 lg:px-16">
        <p className="font-accent text-[11px] tracking-[0.32em] uppercase text-taupe mb-4">
          {String(allProjects.length).padStart(2, "0")} —{" "}
          {tr(T.work.title, lang)}
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-tight font-light max-w-4xl text-shadow-grey">
          {tr(T.work.title, lang)}
        </h1>

        {/* FILTROS */}
        <div className="mt-8 sm:mt-10 md:mt-14 flex flex-nowrap sm:flex-wrap gap-x-5 sm:gap-x-8 gap-y-3 border-t border-b border-olive/20 py-4 sm:py-5 -mx-1 px-1 overflow-x-auto">
          <button
            onClick={() => handleFilter("all")}
            data-testid="filter-all"
            className={`${btnBase} ${active === "all"
              ? "text-shadow-grey border-b border-shadow-grey"
              : "text-taupe hover:text-shadow-grey border-b border-transparent"
              }`}
          >
            {tr(T.work.all, lang)}
          </button>
          {getActiveCategories(content.projects).map((c) => (
            <button
              key={c.id}
              onClick={() => handleFilter(c.id)}
              data-testid={`filter-${c.id}`}
              className={`${btnBase} ${active === c.id
                ? "text-shadow-grey border-b border-shadow-grey"
                : "text-taupe hover:text-shadow-grey border-b border-transparent"
                }`}
            >
              {c[lang]}
            </button>
          ))}
        </div>

        {/* FILTRO POR ROL — dentro del departamento activo (o todos) */}
        {activeRoles.length > 0 && (
          <div className="mt-4 flex flex-nowrap sm:flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 -mx-1 px-1 overflow-x-auto">
            <button
              onClick={() => setActiveRole("all")}
              data-testid="filter-role-all"
              className={`${btnBase} text-[10px] ${activeRole === "all"
                ? "text-shadow-grey border-b border-shadow-grey"
                : "text-taupe/70 hover:text-shadow-grey border-b border-transparent"
                }`}
            >
              {tr(T.work.all, lang)}
            </button>
            {activeRoles.map((r) => (
              <button
                key={r.id}
                onClick={() => setActiveRole(r.id)}
                data-testid={`filter-role-${r.id}`}
                className={`${btnBase} text-[10px] ${activeRole === r.id
                  ? "text-shadow-grey border-b border-shadow-grey"
                  : "text-taupe/70 hover:text-shadow-grey border-b border-transparent"
                  }`}
              >
                {r[lang]}
              </button>
            ))}
          </div>
        )}

        {/* GRID — se renderizan todos los proyectos y se ocultan con CSS los que
            no coincidan con el filtro. Así los iframes de vídeo permanecen montados
            y la reproducción no se reinicia al cambiar de categoría. */}
        {visibleCount === 0 ? (
          <p className="py-32 text-taupe" data-testid="work-empty">
            {tr(T.work.none, lang)}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-2 md:gap-1 py-10 sm:py-12 md:py-16">
            {allProjects.map((p, i) => {
              const visible = matchesFilters(p);
              return (
                <div key={p.id} className={visible ? undefined : "hidden"} aria-hidden={!visible}>
                  <ProjectCard
                    project={p}
                    lang={lang}
                    cardSurface="work"
                    eager={i < 4}
                    index={i}
                    aspectClass="aspect-video"
                    alwaysPlay
                    fit="contain"
                    previewCrop={p.preview_crop ?? p.work_crop}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
