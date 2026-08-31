export const T = {
  nav: {
    work: { es: "Portfolio", en: "Work", ca: "Portfolio" },
    showreel: { es: "Showreel", en: "Showreel", ca: "Showreel" },
    about: { es: "Sobre mí", en: "About", ca: "Sobre mi" },
    contact: { es: "Contacto", en: "Contact", ca: "Contacte" },
    home: { es: "Inicio", en: "Home", ca: "Inici" },
  },
  hero: {
    showreel: { es: "Showreel", en: "Showreel", ca: "Showreel" },
    scroll: { es: "Desplázate", en: "Scroll", ca: "Desplaça't" },
  },
  work: {
    title: { es: "Portfolio", en: "Selected work", ca: "Portfolio" },
    all: { es: "Todo", en: "All", ca: "Tot" },
    viewAll: { es: "Ver toda la obra", en: "View all work", ca: "Veure tota l'obra" },
    seeMore: { es: "Ver más", en: "See more", ca: "Veure més" },
    none: {
      es: "Sin proyectos en esta categoría todavía.",
      en: "No projects in this category yet.",
      ca: "Encara no hi ha projectes en aquesta categoria.",
    },
  },
  project: {
    director: { es: "Dirección", en: "Director", ca: "Direcció" },
    productionCompany: { es: "Productora", en: "Production Company", ca: "Productora" },
    year: { es: "Año", en: "Year", ca: "Any" },
    type: { es: "Formato", en: "Type", ca: "Format" },
    format: { es: "Captura", en: "Format", ca: "Captura" },
    synopsis: { es: "Sinopsis", en: "Synopsis", ca: "Sinopsi" },
    stills: { es: "Fotogramas", en: "Stills", ca: "Fotogrames" },
    bts: { es: "Detrás de cámara", en: "Behind the scenes", ca: "Darrere les càmeres" },
    recognitions: { es: "Reconocimientos", en: "Recognition", ca: "Reconeixements" },
    showBts: { es: "Ver BTS", en: "Show BTS", ca: "Veure BTS" },
    hideBts: { es: "Ocultar BTS", en: "Hide BTS", ca: "Amagar BTS" },
    external: { es: "Ver proyecto", en: "View project", ca: "Veure projecte" },
    back: { es: "Volver", en: "Back", ca: "Tornar" },
    next: { es: "Siguiente proyecto", en: "Next project", ca: "Següent projecte" },
    notFound: { es: "Proyecto no encontrado.", en: "Project not found.", ca: "Projecte no trobat." },
  },
  about: {
    title: { es: "Sobre mí", en: "About", ca: "Sobre mi" },
  },
  contact: {
    title: { es: "Contacto", en: "Contact", ca: "Contacte" },
    intro: {
      es: "Para nuevos proyectos, colaboraciones o referencias técnicas.",
      en: "For new projects, collaborations or technical references.",
      ca: "Per a nous projectes, col·laboracions o referències tècniques.",
    },
    email: { es: "Correo", en: "Email", ca: "Correu" },
    phone: { es: "Teléfono", en: "Phone", ca: "Telèfon" },
    follow: { es: "Encuéntrame en", en: "Find me on", ca: "Troba'm a" },
  },
  footer: {
    rights: { es: "Todos los derechos reservados.", en: "All rights reserved.", ca: "Tots els drets reservats." },
  },
  admin: {
    title: { es: "Panel de administración", en: "Admin Panel", ca: "Panell d'administració" },
    login: { es: "Acceder", en: "Sign in", ca: "Accedir" },
    logout: { es: "Salir", en: "Sign out", ca: "Sortir" },
    password: { es: "Contraseña", en: "Password", ca: "Contrasenya" },
    invalid: { es: "Contraseña incorrecta", en: "Invalid password", ca: "Contrasenya incorrecta" },
    site: { es: "Información del sitio", en: "Site information", ca: "Informació del lloc" },
    projects: { es: "Proyectos", en: "Projects", ca: "Projectes" },
    addProject: { es: "Añadir proyecto", en: "Add project", ca: "Afegir projecte" },
    save: { es: "Guardar", en: "Save", ca: "Desar" },
    cancel: { es: "Cancelar", en: "Cancel", ca: "Cancel·lar" },
    delete: { es: "Eliminar", en: "Delete", ca: "Eliminar" },
    edit: { es: "Editar", en: "Edit", ca: "Editar" },
    moveUp: { es: "Subir", en: "Move up", ca: "Pujar" },
    moveDown: { es: "Bajar", en: "Move down", ca: "Baixar" },
    export: { es: "Exportar JSON", en: "Export JSON", ca: "Exportar JSON" },
    import: { es: "Importar JSON", en: "Import JSON", ca: "Importar JSON" },
    reset: { es: "Restablecer por defecto", en: "Reset to default", ca: "Restablir per defecte" },
    saved: { es: "Guardado", en: "Saved", ca: "Desat" },
    confirmDelete: { es: "¿Eliminar este proyecto?", en: "Delete this project?", ca: "Eliminar aquest projecte?" },
    confirmReset: {
      es: "¿Restablecer al contenido original? Se perderán los cambios locales.",
      en: "Reset to original content? Local changes will be lost.",
      ca: "Restablir al contingut original? Es perdran els canvis locals.",
    },
  },
};

export const tr = (entry, lang) => {
  if (entry == null) return "";
  if (typeof entry === "string") return entry;
  return entry[lang] || entry.es || entry.en || "";
};
