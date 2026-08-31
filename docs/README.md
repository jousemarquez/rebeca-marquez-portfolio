# 📚 Documentación de Remarubi

Índice completo de documentación para el portfolio cinematográfico de Rebeca Márquez Rubio.

---

## 🚀 Comienza Aquí

**¿Primera vez?** → [**QUICK_START.md**](./QUICK_START.md) (15 minutos)

**¿Quieres entender cómo funciona?** → [**ARCHITECTURE.md**](./ARCHITECTURE.md)

**¿Necesitas desplegar a Vercel?** → [**DEPLOYMENT_VERCEL.md**](./DEPLOYMENT/DEPLOYMENT_VERCEL.md)

---

## 📑 Estructura de Documentación

### 📂 CONTENT/ — Gestión de Contenido

Cómo agregar, organizar y estructurar proyectos e imágenes.

| Documento | Para Quién | Descripción |
|-----------|-----------|-----------|
| [CONTENT_MAPPING.md](./CONTENT/CONTENT_MAPPING.md) | Developers | Cómo importar 30 proyectos del PDF a JSON |
| [PROJECT_FIELDS_REFERENCE.md](./CONTENT/PROJECT_FIELDS_REFERENCE.md) | Developers | Referencia exhaustiva de todos los campos |
| [IMAGE_MANAGEMENT.md](./CONTENT/IMAGE_MANAGEMENT.md) | Developers | Workflow de imágenes, DIRECCIÓN vs PRODUCCIÓN |
| [examples/](./CONTENT/examples/) | Todos | Proyectos de ejemplo (minimal, complete, real) |

**Para operadores**, ver → **OPERATIONS/** abajo.

---

### 🚀 DEPLOYMENT/ — Despliegue y Configuración

Cómo deployar a Vercel, configurar variables de entorno, y mantener en vivo.

| Documento | Para Quién | Descripción |
|-----------|-----------|-----------|
| [DEPLOYMENT_VERCEL.md](./DEPLOYMENT/DEPLOYMENT_VERCEL.md) | Developers | Guía paso a paso de deploy a Vercel |
| [ENVIRONMENT_VARIABLES.md](./DEPLOYMENT/ENVIRONMENT_VARIABLES.md) | Todos | Referencia de variables de entorno (8 vars) |
| [VERCEL_CONFIG_REFERENCE.md](./DEPLOYMENT/VERCEL_CONFIG_REFERENCE.md) | Developers | Explicación detallada de vercel.json |

---

### 💾 DATABASE/ — Base de Datos (Avanzado)

Cómo usar MongoDB, migración de datos, APIs de contenido.

| Documento | Para Quién | Descripción |
|-----------|-----------|-----------|
| [DATABASE_SCHEMA.md](./DATABASE/DATABASE_SCHEMA.md) | Developers | Esquema de MongoDB y estructura de datos |
| [DATABASE_MIGRATION.md](./DATABASE/DATABASE_MIGRATION.md) | Developers | Cómo migrar de JSON estático a MongoDB |
| [API_CONTENT_ENDPOINTS.md](./DATABASE/API_CONTENT_ENDPOINTS.md) | Developers | Documentación de endpoints HTTP |
| [scripts/](./DATABASE/scripts/) | Developers | Scripts Node.js para automatizar |

---

### ⚙️ OPERATIONS/ — Cómo Operar (Para Dani & Equipo)

Instrucciones prácticas para agregar contenido, imágenes, mantenimiento diario.

| Documento | Para Quién | Descripción |
|-----------|-----------|-----------|
| [HOW_TO_ADD_PROJECTS.md](./OPERATIONS/HOW_TO_ADD_PROJECTS.md) | Dani, Operadores | Cómo agregar nuevos proyectos (3 métodos) |
| [HOW_TO_MANAGE_IMAGES.md](./OPERATIONS/HOW_TO_MANAGE_IMAGES.md) | Dani, Operadores | Upload, organización, DIRECCIÓN vs PRODUCCIÓN |
| [ROLES_DIRECCION_PRODUCCION.md](./OPERATIONS/ROLES_DIRECCION_PRODUCCION.md) | Todos | Diferenciación clara de roles |
| [MAINTENANCE_CHECKLIST.md](./OPERATIONS/MAINTENANCE_CHECKLIST.md) | Dani | Tareas semanal/mensual/trimestral |
| [TROUBLESHOOTING.md](./OPERATIONS/TROUBLESHOOTING.md) | Todos | Resolver problemas comunes |

---

### 🏗️ ARCHITECTURE.md

Vista general completa:
- Diagrama del sistema (Frontend → API → MongoDB/JSON → Cloudinary)
- Flujos de datos
- Stack tecnológico
- Seguridad y autenticación
- Performance

👉 **Lee esto si quieres entender cómo funciona todo.**

---

## 🎯 Por Rol

### Para **Dani** (Operador)

1. [QUICK_START.md](./QUICK_START.md) — Setup (15 min)
2. [HOW_TO_ADD_PROJECTS.md](./OPERATIONS/HOW_TO_ADD_PROJECTS.md) — Agregar proyectos
3. [HOW_TO_MANAGE_IMAGES.md](./OPERATIONS/HOW_TO_MANAGE_IMAGES.md) — Gestionar imágenes
4. [MAINTENANCE_CHECKLIST.md](./OPERATIONS/MAINTENANCE_CHECKLIST.md) — Tareas recurrentes
5. [TROUBLESHOOTING.md](./OPERATIONS/TROUBLESHOOTING.md) — Cuando algo falla

---

### Para **Developers**

1. [QUICK_START.md](./QUICK_START.md) — Setup local (15 min)
2. [ARCHITECTURE.md](./ARCHITECTURE.md) — Cómo funciona todo
3. [DEPLOYMENT_VERCEL.md](./DEPLOYMENT/DEPLOYMENT_VERCEL.md) — Deploy a producción
4. [ENVIRONMENT_VARIABLES.md](./DEPLOYMENT/ENVIRONMENT_VARIABLES.md) — Vars de entorno
5. Según necesites:
   - Content: [CONTENT_MAPPING.md](./CONTENT/CONTENT_MAPPING.md)
   - Database: [DATABASE_MIGRATION.md](./DATABASE/DATABASE_MIGRATION.md)
   - API: [API_CONTENT_ENDPOINTS.md](./DATABASE/API_CONTENT_ENDPOINTS.md)

---

### Para **Nuevos Integrantes**

1. [QUICK_START.md](./QUICK_START.md) — Empezar en 15 min
2. [ARCHITECTURE.md](./ARCHITECTURE.md) — Entender la arquitectura
3. Luego, según tu rol:
   - ¿Operador? → [OPERATIONS/](./OPERATIONS/)
   - ¿Developer? → [DEPLOYMENT/](./DEPLOYMENT/) + [DATABASE/](./DATABASE/)

---

## 📋 Fase 1: Foundation (✅ Completada)

Documentos críticos para que el proyecto funcione:

- ✅ README (raíz) — Presentación general
- ✅ QUICK_START.md — 15 min setup
- ✅ ARCHITECTURE.md — Cómo funciona
- ✅ DEPLOYMENT_VERCEL.md — Deploy paso a paso
- ✅ ENVIRONMENT_VARIABLES.md — Vars requeridas
- ✅ HOW_TO_ADD_PROJECTS.md — Agregar proyectos
- ✅ HOW_TO_MANAGE_IMAGES.md — Gestionar imágenes

**Resultado**: Portfolio funcional en Vercel, Dani puede operar sin código.

---

## 📋 Fase 2: Content Integration (Próxima)

Documentos para integrar 30 proyectos del PDF:

- ⏳ CONTENT_MAPPING.md — Mapeo PDF → JSON
- ⏳ PROJECT_FIELDS_REFERENCE.md — Referencia de campos
- ⏳ ROLES_DIRECCION_PRODUCCION.md — DIRECCIÓN vs PRODUCCIÓN
- ⏳ Ejemplos JSON (3 proyectos reales)

**Resultado**: 30 proyectos importados, imágenes organizadas, portfolio poblado.

---

## 📋 Fase 3: Advanced (Futuro)

Documentos para escalabilidad:

- ⏳ DATABASE_SCHEMA.md — Esquema MongoDB
- ⏳ DATABASE_MIGRATION.md — JSON → MongoDB
- ⏳ API_CONTENT_ENDPOINTS.md — Documentación endpoints
- ⏳ Scripts de migración

**Resultado**: Path claro a MongoDB, automatización, documentación completa.

---

## 🔍 Búsqueda Rápida

**Quiero...**

- ✏️ Agregar nuevo proyecto → [HOW_TO_ADD_PROJECTS.md](./OPERATIONS/HOW_TO_ADD_PROJECTS.md)
- 🖼️ Subir imágenes → [HOW_TO_MANAGE_IMAGES.md](./OPERATIONS/HOW_TO_MANAGE_IMAGES.md)
- 🚀 Desplegar a Vercel → [DEPLOYMENT_VERCEL.md](./DEPLOYMENT/DEPLOYMENT_VERCEL.md)
- 🔑 Configurar env vars → [ENVIRONMENT_VARIABLES.md](./DEPLOYMENT/ENVIRONMENT_VARIABLES.md)
- 🏗️ Entender arquitectura → [ARCHITECTURE.md](./ARCHITECTURE.md)
- 📊 Entender base de datos → [DATABASE_SCHEMA.md](./DATABASE/DATABASE_SCHEMA.md)
- 🐛 Resolver problema → [TROUBLESHOOTING.md](./OPERATIONS/TROUBLESHOOTING.md)
- 📝 Importar 30 proyectos → [CONTENT_MAPPING.md](./CONTENT/CONTENT_MAPPING.md)
- 📚 Referencia de campos → [PROJECT_FIELDS_REFERENCE.md](./CONTENT/PROJECT_FIELDS_REFERENCE.md)
- 🛠️ Ver ejemplo proyecto → [CONTENT/examples/](./CONTENT/examples/)

---

## 🚦 Estado de la Documentación

| Fase | Estado | Documentos | Descripción |
|------|--------|-----------|-----------|
| **P0 Foundation** | ✅ Completada | 7 docs | Básico funcional |
| **P1 Integration** | ⏳ Próxima | 7 docs | Importar 30 proyectos |
| **P2 Advanced** | ⏳ Futuro | 6 docs | MongoDB + Scripts |

**Total Planeado**: 20 documentos  
**Total Completado**: 7 documentos  
**Completitud**: 35% ✓

---

## 📞 Ayuda y Contacto

**Documentación incompleta o confusa?**
- Revisar ejemplos en [CONTENT/examples/](./CONTENT/examples/)
- Leer [TROUBLESHOOTING.md](./OPERATIONS/TROUBLESHOOTING.md)
- Contactar a Dani: remarubi.av@gmail.com

**Contribuir documentación?**
- Editar archivos .md en esta carpeta `/docs/`
- Hacer git push a main
- Vercel auto-publica (sin deploy needed para docs)

---

## 📖 Convenciones en la Documentación

- **Comandos**: Bloques de código `bash`
- **Variables**: `ADMIN_PASSWORD` (mayúsculas)
- **Rutas**: `/admin`, `/work`, `/project/:slug`
- **Archivos**: `/frontend/src/data/content.json`
- **URLs**: https://remarubi.com
- **Emojis**: Usados para escaneo visual (P0=🚀, P1=⏳, etc.)

---

## 🎓 Recursos Externos

- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Docs**: https://docs.mongodb.com/
- **Cloudinary Docs**: https://cloudinary.com/documentation
- **React Docs**: https://react.dev
- **Tailwind Docs**: https://tailwindcss.com/docs

---

## 📄 Historial de Cambios

| Fecha | Cambio |
|-------|--------|
| 2026-08-27 | Fase 1 Foundation completada (7 docs) |
| 2026-08-27 | Creado índice principal (este archivo) |
| TBD | Fase 2 Integration planeada |
| TBD | Fase 3 Advanced planeada |

---

**Última actualización**: 2026-08-27  
**Versión**: 1.0 (Phase 1 Foundation)  
**Mantenedor**: Claude Code  
**Licencia**: Remarubi Project

---

## 🎯 Roadmap Futuro

- [ ] Integración con CMS externo (Contentful, Sanity)
- [ ] E-commerce para venta de filmografía
- [ ] Sistema de comentarios en proyectos
- [ ] Analytics avanzados
- [ ] Integración con redes sociales (auto-posting)
- [ ] Versión móvil app (React Native)
- [ ] Multi-idioma extendido (FR, IT, PT)

---

🚀 **¡Listo para comenzar?** → [QUICK_START.md](./QUICK_START.md)
