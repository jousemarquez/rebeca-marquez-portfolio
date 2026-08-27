# Remarubi — Portfolio Audiovisual

> Productora Audiovisual | Producción Integral de Contenidos

Remarubi es un portfolio profesional para **Rebeca Márquez Rubio**, Productora Audiovisual especializada en ficción, documental, publicidad y videoclips.

**Website**: [remarubi.com](https://remarubi.com)  
**Vimeo**: [vimeo.com/user210469437](https://vimeo.com/user210469437)  
**Instagram**: [@rebecamarquezrubio](https://instagram.com/rebecamarquezrubio)  

---

## 🚀 Quick Start

**¿Quieres empezar en 15 minutos?** → Lee [**QUICK_START.md**](./docs/QUICK_START.md)

**¿Quieres entender la arquitectura?** → Lee [**ARCHITECTURE.md**](./docs/ARCHITECTURE.md)

---

## 📚 Documentación Completa

### Para Operadores (Rebeca + equipo)
- **[Cómo agregar proyectos](./docs/OPERATIONS/HOW_TO_ADD_PROJECTS.md)** — 3 métodos para subir nuevos proyectos
- **[Cómo gestionar imágenes](./docs/OPERATIONS/HOW_TO_MANAGE_IMAGES.md)** — Upload, linking, optimización
- **[DIRECCIÓN vs PRODUCCIÓN](./docs/OPERATIONS/ROLES_DIRECCION_PRODUCCION.md)** — Diferenciación de roles en la página
- **[Mantenimiento regular](./docs/OPERATIONS/MAINTENANCE_CHECKLIST.md)** — Tareas semanal/mensual/trimestral

### Para Desarrolladores
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** — Overview del sistema completo
- **[DEPLOYMENT_VERCEL.md](./docs/DEPLOYMENT/DEPLOYMENT_VERCEL.md)** — Deploy a producción en Vercel
- **[ENVIRONMENT_VARIABLES.md](./docs/DEPLOYMENT/ENVIRONMENT_VARIABLES.md)** — Configuración de variables de entorno
- **[CONTENT_MAPPING.md](./docs/CONTENT/CONTENT_MAPPING.md)** — Integración de 30 proyectos desde PDF
- **[PROJECT_FIELDS_REFERENCE.md](./docs/CONTENT/PROJECT_FIELDS_REFERENCE.md)** — Referencia de campos de proyecto
- **[IMAGE_MANAGEMENT.md](./docs/CONTENT/IMAGE_MANAGEMENT.md)** — Workflow de imágenes

### Para Escalabilidad & Avanzado
- **[DATABASE_SCHEMA.md](./docs/DATABASE/DATABASE_SCHEMA.md)** — Esquema MongoDB
- **[DATABASE_MIGRATION.md](./docs/DATABASE/DATABASE_MIGRATION.md)** — JSON → MongoDB
- **[API_CONTENT_ENDPOINTS.md](./docs/DATABASE/API_CONTENT_ENDPOINTS.md)** — Documentación de endpoints

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| **Frontend** | React 19 + React Router 7 + Tailwind CSS + Shadcn/UI |
| **Hosting** | Vercel (serverless functions) |
| **Contenido** | JSON (localStorage) + MongoDB opcional |
| **Imágenes** | Cloudinary CDN |
| **Video** | Vimeo embeds |
| **Analytics** | Vercel Analytics + Microsoft Clarity |

---

## 📊 Características Principales

✅ **Portfolio completamente funcional**
- 7 páginas (Home, Work, Project Detail, About, Showreel, Contact, Admin)
- Grid asimétrico responsivo
- Reproducción de video Vimeo integrada

✅ **Panel administrativo sin código**
- Login protegido en `/admin`
- Crear/editar/eliminar proyectos
- Upload de imágenes (Cloudinary)
- Herramienta de recorte de imágenes
- Exportar/importar JSON

✅ **Multiidioma (ES/EN)**
- Toggle en navegación
- Todo contenido bilingüe
- Persistencia en localStorage

✅ **SEO optimizado**
- Meta tags dinámicas por página
- Open Graph + Twitter Cards
- JSON-LD structured data
- Sitemap XML automático
- Google Analytics 4 + Clarity

✅ **Diferenciación DIRECCIÓN vs PRODUCCIÓN**
- Stills cinematográficos (DIRECCIÓN)
- Behind-the-scenes (PRODUCCIÓN)
- Roles diferenciados en admin panel

---

## 📂 Estructura del Proyecto

```
remarubi/
├── docs/                          # 📚 Documentación integral
│   ├── README.md                  # Índice de documentación
│   ├── QUICK_START.md             # 15-min onboarding
│   ├── ARCHITECTURE.md            # Overview técnico
│   │
│   ├── CONTENT/
│   │   ├── CONTENT_MAPPING.md     # Integración PDF → JSON
│   │   ├── PROJECT_FIELDS_REFERENCE.md
│   │   ├── IMAGE_MANAGEMENT.md
│   │   └── examples/              # Proyectos de ejemplo
│   │
│   ├── DEPLOYMENT/
│   │   ├── DEPLOYMENT_VERCEL.md   # Deploy paso a paso
│   │   ├── ENVIRONMENT_VARIABLES.md
│   │   └── VERCEL_CONFIG_REFERENCE.md
│   │
│   ├── DATABASE/
│   │   ├── DATABASE_SCHEMA.md
│   │   ├── DATABASE_MIGRATION.md
│   │   ├── API_CONTENT_ENDPOINTS.md
│   │   └── scripts/               # Scripts de migración
│   │
│   └── OPERATIONS/
│       ├── HOW_TO_ADD_PROJECTS.md
│       ├── HOW_TO_MANAGE_IMAGES.md
│       ├── ROLES_DIRECCION_PRODUCCION.md
│       ├── MAINTENANCE_CHECKLIST.md
│       └── TROUBLESHOOTING.md
│
├── MEDIA/                         # 📸 Imágenes y documentos
│   ├── listing-proyectos.pdf      # 30 proyectos para integrar
│   ├── DIRECCIÓN/                 # Stills cinematográficos
│   └── PRODUCCIÓN/                # Behind-the-scenes
│
├── frontend/                      # 💻 Aplicación React
│   ├── public/
│   ├── src/
│   │   ├── pages/                 # 7 rutas principales
│   │   ├── components/            # Componentes reutilizables
│   │   ├── data/
│   │   │   ├── content.json       # Contenido principal
│   │   │   └── PROJECT_TEMPLATE.json
│   │   ├── lib/                   # Utilidades y hooks
│   │   └── api/                   # Serverless functions Vercel
│   ├── package.json
│   ├── vercel.json                # Configuración Vercel
│   └── .env.example
│
├── backend/ (opcional)            # 🔧 FastAPI
│   ├── server.py
│   └── requirements.txt
│
└── package.json (root)
```

---

## ⚡ Comandos Principales

```bash
# Desarrollo local
cd frontend
npm install
npm start                    # Dev server en http://localhost:3000

# Producción
npm run build               # Compilar para Vercel
npm run predeploy           # Pre-deploy checks

# Gestión de contenido
npm run new-project         # Asistente para nuevo proyecto
npm run check:videos        # Validar URLs Vimeo
```

---

## 🚢 Despliegue a Vercel

**¿Primer deploy?** → Lee [DEPLOYMENT_VERCEL.md](./docs/DEPLOYMENT/DEPLOYMENT_VERCEL.md)

**Pasos rápidos:**
1. Push a GitHub
2. Conectar repo en Vercel
3. Configurar 8 variables de entorno (ver `.env.example`)
4. Deploy automático
5. Verificar en `https://ddanidiaz.com`

---

## 📝 Contenido: 30 Proyectos

El archivo **`/MEDIA/listing-proyectos.pdf`** contiene 30 proyectos audiovisuales documentados:

- **DIRECCIÓN**: 15 proyectos (AD, Dirección, Script Supervisor)
- **PRODUCCIÓN**: 15 proyectos (Auxiliar, Jefa, Directora, Coordinadora de Transporte)

Cada proyecto incluye:
- Título, año, tipo (cortometraje, videoclip, documental, etc.)
- Rol (DIRECCIÓN o PRODUCCIÓN)
- ~6-14 imágenes en `/MEDIA/`
- Premios y festivales

**¿Cómo importar?** → Lee [CONTENT_MAPPING.md](./docs/CONTENT/CONTENT_MAPPING.md)

---

## 🖼️ Imágenes: ~199 Archivos

Organizados en carpetas temáticas:

```
MEDIA/
├── DIRECCIÓN/                           # Stills cinematográficos
│   ├── AD/                              # Ayudante de Dirección (69 imágenes)
│   ├── DIRECCIÓN/                       # Dirección (26 imágenes)
│   └── Script Supervisor/ + Auxiliar/   # (14 imágenes)
│
└── PRODUCCIÓN/                          # Behind-the-scenes & set
    ├── AUXILIAR/                        # (17 imágenes)
    ├── JEFA/                            # Jefa de Producción (6 imágenes)
    ├── DIRECTORA/                       # (27 imágenes)
    └── COORDINADORA DE TRANSPORTE/      # (7 imágenes)
```

**¿Cómo organizarlas?** → Lee [IMAGE_MANAGEMENT.md](./docs/CONTENT/IMAGE_MANAGEMENT.md)

---

## 🔐 Admin Panel

Accede en `/admin` (una vez deployado):
- **URL**: `https://ddanidiaz.com/admin`
- **Contraseña**: Definida en `.env` (`ADMIN_PASSWORD`)

**Funciones**:
- Crear/editar/eliminar proyectos
- Subir imágenes (Cloudinary)
- Reordenar proyectos
- Exportar JSON
- Cambiar metadatos del sitio

---

## 📞 Contacto & Créditos

**Productora**: Rebeca Márquez Rubio  
**Email**: rebeca@remarubi.com  
**Teléfono**: +34 647 005 955  

**Redes Sociales**:
- Instagram: [@rebecamarquezrubio](https://instagram.com/rebecamarquezrubio)
- Vimeo: [vimeo.com/user210469437](https://vimeo.com/user210469437)
- LinkedIn: [linkedin.com/in/rebeca-marquez-rubio](https://linkedin.com/in/rebeca-marquez-rubio)

---

## 📖 Documentación Completa

Toda la documentación está en la carpeta **`/docs/`**.

Índice principal: **[docs/README.md](./docs/README.md)**

---

**Última actualización**: 2026-08-27  
**Versión del proyecto**: 2.0 (Fase 1 Foundation)
