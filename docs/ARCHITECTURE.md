# 🏗️ Arquitectura del Sistema

Overview completo de cómo funciona Remarubi: datos, flujos, deployments.

---

## 📊 Diagrama General

```
┌─────────────────────────────────────────────────────────────┐
│                     USUARIO / NAVEGADOR                      │
│  (ddanidiaz.com, localhost:3000, dispositivo móvil)        │
└─────────────────────────────────────────────────────────────┘
                             ↓
                    ┌─────────────────┐
                    │   REACT SPA     │
                    │   (Frontend)    │
                    │                 │
                    │  • 7 páginas    │
                    │  • React Router │
                    │  • Tailwind CSS │
                    │  • Shadcn/UI    │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ↓                    ↓                    ↓
    ┌─────────┐      ┌─────────────┐      ┌──────────────┐
    │localStorage    │ Vercel      │      │ Cloudinary   │
    │(JSON cache)    │ Serverless  │      │ (Images)     │
    │                │ API         │      │              │
    │ • content      │             │      │ • Hosting    │
    │ • language     │ • /api/     │      │ • Transform  │
    │ • theme        │   content   │      │ • CDN        │
    └─────────────────┘────────────────────┼──────────────┘
                             │
        ┌────────────────────┴────────────────────┐
        │                                          │
        ↓                                          ↓
    ┌────────────────────────────────┐    ┌──────────────────┐
    │      content.json / MongoDB    │    │  Vimeo Embed    │
    │      (Contenido principal)     │    │  (Video hosting) │
    │                                │    │                  │
    │ • site metadata                │    │ • Showreel      │
    │ • about biography              │    │ • Project videos│
    │ • 30+ projects array           │    │ • Preview URLs  │
    │ • admin sessions (JWT)         │    └──────────────────┘
    └────────────────────────────────┘
```

---

## 🔄 Flujos de Datos

### Flujo 1: Usuario navega la web (lectura)

```
Usuario abre https://remarubi.com/project/que-comen-los-dragones
                    ↓
    React Router detecta ruta (/project/:slug)
                    ↓
    App.js carga componente ProjectDetail
                    ↓
    useContent() hook → Intenta leer de localStorage
                    ↓
    ¿Caché válido? 
    SI → Renderizar desde cache (instantáneo)
    NO → fetch(/api/content) → MongoDB o content.json
                    ↓
    Obtener proyecto por slug
                    ↓
    Renderizar página:
    • Cover image desde Cloudinary
    • Video Vimeo embebido
    • Grid de stills desde Cloudinary
    • Metadata (director, año, etc.)
                    ↓
    Guardar en localStorage como caché
                    ↓
    Usuario ve página
```

### Flujo 2: Admin edita proyecto (escritura)

```
Dani abre https://remarubi.com/admin
                    ↓
    Login: escribe contraseña ADMIN_PASSWORD
                    ↓
    API /api/admin-login
    • Verifica contraseña
    • Genera JWT token
    • Guarda en localStorage
                    ↓
    Panel Admin carga (componente Admin.jsx)
                    ↓
    Dani clickea "Edit Project"
                    ↓
    Abre formulario con los campos del proyecto
                    ↓
    Dani modifica:
    • Título, descripción, año
    • Sube nuevas imágenes (→ Cloudinary)
    • Reordeña stills/BTS
                    ↓
    Clickea "Save"
                    ↓
    Admin panel actualiza content en localStorage
    (cambios temporales, no persistidos aún)
                    ↓
    Clickea "Export JSON"
                    ↓
    Descarga content-FECHA.json
                    ↓
    Git workflow:
    • Reemplaza src/data/content.json
    • git add, commit, push
    • GitHub webhook → Vercel deploy
                    ↓
    Build en Vercel:
    • npm run predeploy
    • Empaqueta React
    • Despliega en CDN Vercel
                    ↓
    Verificar en producción
    https://remarubi.com (muestra cambios)
```

### Flujo 3: Upload de imagen (Cloudinary)

```
Dani en /admin → "Upload new image"
                    ↓
    Drag & drop imagen a zona de carga
                    ↓
    ImageDropZone.jsx:
    • Valida: JPG/PNG, <5MB
    • Comprime/optimiza
    • Prepara con metadata
                    ↓
    POST /api/upload-sign
    • Genera firma Cloudinary firmada
    • Devuelve signature, timestamp, token
                    ↓
    POST https://api.cloudinary.com/upload
    • Sube con firma (seguro)
    • Cloudinary procesa: thumbnails, webp
    • Devuelve URL pública
                    ↓
    Admin panel copia URL a content.json
                    ↓
    Usuario ve imagen en ProjectDetail
```

---

## 📁 Estructura de Código (Frontend)

```
frontend/
├── public/                         # Estáticos servidos por Vercel
│   ├── index.html                 # Plantilla HTML
│   ├── favicon.ico, favicon.svg
│   └── robots.txt, sitemap.xml
│
├── src/
│   │
│   ├── index.js                   # Entrada React
│   ├── App.js                     # Rutas principales (React Router)
│   ├── App.css                    # Estilos globales
│   │
│   ├── pages/                     # 7 páginas/rutas
│   │   ├── Home.jsx               # / → Hero + showreel + grid destacados
│   │   ├── Work.jsx               # /work → Grid de todos los proyectos
│   │   ├── ProjectDetail.jsx      # /project/:slug → Detalle completo
│   │   ├── About.jsx              # /about → Biografía
│   │   ├── Showreel.jsx           # /showreel → Video dedicado
│   │   ├── Contact.jsx            # /contact → Email + redes
│   │   └── Admin.jsx              # /admin → Panel administrativo
│   │
│   ├── components/                # Componentes reutilizables
│   │   ├── Nav.jsx                # Navegación sticky
│   │   ├── Footer.jsx             # Footer con redes
│   │   ├── SeoHead.jsx            # Meta tags dinámicas
│   │   ├── ProjectCard.jsx        # Tarjeta de proyecto
│   │   ├── ImageLightbox.jsx      # Modal de imágenes
│   │   ├── VimeoEmbed.jsx         # Embed de video
│   │   └── ui/                    # ~60 componentes Shadcn/UI
│   │
│   ├── data/                      # Contenido
│   │   ├── content.json           # ⭐ Fuente única de verdad
│   │   ├── PROJECT_TEMPLATE.json  # Template para nuevos proyectos
│   │   └── CONTENT_GUIDE.md       # Documentación (DEPRECATED)
│   │
│   ├── lib/                       # Utilidades y lógica
│   │   ├── contentStore.js        # localStorage manager
│   │   ├── useContent.js          # Custom hook para contenido
│   │   ├── useTheme.js            # Dark/light mode
│   │   ├── i18n.js                # Traducciones ES/EN
│   │   ├── seo.js                 # Generador meta tags
│   │   ├── cloudinary.js          # Integ Cloudinary
│   │   ├── vimeo.js               # Helpers Vimeo
│   │   └── utils.js               # Utilidades comunes
│   │
│   └── hooks/
│       └── use-toast.js           # Notificaciones
│
├── api/                           # Serverless functions (Vercel)
│   ├── admin-login.js            # POST /api/admin-login → JWT
│   ├── content.js                # GET/POST /api/content
│   ├── upload.js                 # POST /api/upload → Cloudinary
│   ├── upload-sign.js            # GET /api/upload-sign → Firma
│   ├── og.js                     # GET /api/og → Imágenes OG dinámicas
│   ├── sitemap.js                # GET /api/sitemap → XML
│   └── _helpers/                 # Privadas (_*)
│       ├── _content.js           # Lógica de contenido
│       ├── _cloudinaryUpload.js  # Lógica de upload
│       ├── _verifyToken.js       # JWT verification
│       └── _cors.js              # CORS middleware
│
├── scripts/                       # Utilidades
│   ├── new-project.js            # Crear proyecto (interactivo)
│   ├── new-project.js --paste    # Crear desde clipboard
│   ├── check-videos.js           # Validar URLs Vimeo
│   ├── build-favicon.js          # Generar favicons
│   └── seed-mongodb.js           # (opcional) Llenar MongoDB
│
├── package.json                   # Dependencias (~90 librerías)
├── .env.example                   # Template de env vars
├── vercel.json                    # 🔑 Configuración Vercel
├── craco.config.js                # Extensión Create React App
├── tailwind.config.js             # Configuración Tailwind
├── tsconfig.json                  # TypeScript config
└── build/                         # Compilación (npm run build)
    └── ... (React empaquetado, ~500KB)
```

---

## 🔐 Seguridad: Flow de Autenticación

```
Usuario → /admin
             ↓
    ¿localStorage tiene JWT válido?
    SI → Mostrar panel
    NO → Pedir password
             ↓
    POST /api/admin-login
    {
      "password": "user-input"
    }
             ↓
    Servidor verifica:
    • Comparar contra ADMIN_PASSWORD env var
    • Si match: generar JWT firmado
    • Si no: 401 Unauthorized
             ↓
    JWT devuelto → localStorage
             ↓
    Todas las requests POST a /api/
    llevan header: Authorization: Bearer <JWT>
             ↓
    _verifyToken.js valida signature
    con JWT_SECRET
             ↓
    ¿Token válido y no expirado?
    SI → Procesar request
    NO → 401, limpiar localStorage
```

---

## 📡 APIs y Endpoints

### Serverless Functions (Vercel)

| Endpoint | Método | Autenticación | Propósito |
|----------|--------|---------------|-----------|
| `/api/admin-login` | POST | No | Generar JWT |
| `/api/content` | GET | No | Obtener content.json o MongoDB |
| `/api/content` | POST | JWT | Actualizar contenido |
| `/api/upload` | POST | JWT | Subir imagen a Cloudinary |
| `/api/upload-sign` | GET | JWT | Obtener firma Cloudinary |
| `/api/og` | GET | No | Generar imagen Open Graph |
| `/api/sitemap` | GET | No | Generar sitemap.xml |

### Flujo HTTP (GET /api/content)

```
Frontend: fetch('/api/content')
             ↓
    Vercel router → api/content.js
             ↓
    ¿Existe MONGO_URL en env?
    SI → Conectar MongoDB
         Query: db.content.findOne({})
         ↓
         ¿Documento existe?
         SI → Retornar doc
         NO → Crear default
    NO → Leer src/data/content.json (fallback)
             ↓
    Filtrar proyectos no publicados
    (published !== false)
             ↓
    Response: 200 OK
    {
      "site": { ... },
      "about": { ... },
      "projects": [ ... ]
    }
             ↓
    Frontend carga en localStorage
    Renderiza componentes
```

---

## 🌐 Deployments

### Frontend (Vercel)

```
git push origin main
    ↓
GitHub webhook → Vercel
    ↓
Vercel detects: frontend/package.json changed
    ↓
Build:
  npm ci              # Install deps (clean)
  npm run predeploy   # npm run build + copy SPA HTML
  
  Output: build/
  ├── index.html
  ├── static/js/*.js (React + libs)
  ├── static/css/*.css (Tailwind)
  └── favicon.ico
    ↓
Deploy to CDN (Vercel Edge Network)
    ↓
Cache headers:
  static/* → 1 año immutable
  /*.html → 0s (no cache)
  /api/* → serverless (cold start < 500ms)
    ↓
HTTPS automático
Custom domain: ddanidiaz.com
    ↓
Analytics automático: Vercel Insights + Clarity
```

### Contenido (content.json)

```
Opción A: Estático (Hoy)
  content.json bundled en React build
  Deploy con código
  
Opción B: MongoDB (Futuro)
  content.json → MongoDB Atlas
  API lee de DB
  Sin redeployed necesario
  
Migración path:
  1. Ambos en paralelo (read from both)
  2. Deprecate JSON
  3. Delete JSON fallback
```

### Imágenes (Cloudinary)

```
Admin upload
    ↓
POST /api/upload-sign (obtiene firma)
    ↓
POST api.cloudinary.com/upload
    ↓
Cloudinary procesa:
  • Validation
  • Thumbnail generation
  • Auto webp conversion
  • Resizing on-the-fly
    ↓
URL devuelto:
  https://res.cloudinary.com/dsphxo7mx/
          image/upload/v1780760507/
          FRAME_5_nmj2z4.png
    ↓
Guardado en content.json stills[] o bts[]
    ↓
Frontend renderiza <CroppedImage/>
    ↓
Cloudinary sirve desde CDN global
```

---

## 📊 Capas de la Aplicación

```
┌──────────────────────────────────────────────────────────┐
│ PRESENTACIÓN (Componentes React)                         │
│ ├─ Pages: Home, Work, ProjectDetail, About, Admin      │
│ ├─ Components: ProjectCard, ImageLightbox, etc.        │
│ └─ Styles: Tailwind CSS + Shadcn/UI                    │
└────────────────────┬─────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────┐
│ LÓGICA (Hooks + Utilidades)                             │
│ ├─ useContent() → Maneja estado de contenido           │
│ ├─ useTheme() → Dark/light mode                        │
│ ├─ lib/i18n.js → Multiidioma                          │
│ └─ lib/cloudinary.js, vimeo.js → Integraciones       │
└────────────────────┬─────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────┐
│ DATOS (APIs + Storage)                                   │
│ ├─ localStorage → Caché local                          │
│ ├─ /api/content → JSON o MongoDB                       │
│ ├─ /api/upload → Cloudinary                            │
│ └─ Vimeo API → Video embeds                            │
└────────────────────┬─────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────┐
│ PERSISTENCIA                                             │
│ ├─ content.json (versionado en Git)                    │
│ ├─ MongoDB Atlas (opcional, futuro)                    │
│ └─ Cloudinary (imágenes)                               │
└──────────────────────────────────────────────────────────┘
```

---

## 🔄 Ciclo de Vida: Agregar Nuevo Proyecto

```
1. Dani abre /admin
                ↓
2. Login con ADMIN_PASSWORD
                ↓
3. Clickea "New Project"
                ↓
4. Rellenar formulario:
   • Título, slug, año, categoría
   • Director, productora, formato
   • Sinopsis ES/EN
   • Home layout (featured, size, order)
                ↓
5. Upload cover image:
   • Drag & drop
   • POST /api/upload → Cloudinary
   • URL copiada al formulario
                ↓
6. Upload stills (DIRECCIÓN):
   • Múltiples imágenes
   • Cada una → Cloudinary
   • URLs agregadas a stills[]
                ↓
7. Upload BTS (PRODUCCIÓN):
   • Idem stills
   • URLs agregadas a bts[]
                ↓
8. Agregar preview_url:
   • Copiar embed URL de Vimeo
   • Paste en formulario
                ↓
9. Opcional: Agregar recognitions
   • URLs de premios/badges
   • showOnHome, showOnWork flags
                ↓
10. Clickea "Save"
    → Actualiza content en localStorage
    → Marca "dirty" para export
                ↓
11. Clickea "Export JSON"
    → Descarga content-2026-08-27.json
                ↓
12. Git workflow:
    cp content-2026-08-27.json src/data/content.json
    git add src/data/content.json
    git commit -m "Add: Mi Nuevo Proyecto (2026)"
    git push origin main
                ↓
13. GitHub webhook → Vercel
    → npm run predeploy
    → Deploy automático
                ↓
14. Verificar en producción:
    https://remarubi.com/work
    → Nuevo proyecto visible
    
    https://remarubi.com/project/mi-nuevo-proyecto
    → Página detallada funciona
                ↓
15. ¡Listo! Proyecto en vivo
```

---

## 🎯 Responsabilidades

| Componente | Responsabilidad | Owner |
|-----------|-----------------|-------|
| **Frontend (React)** | Renderizar páginas, manejar navegación, validar formularios | Frontend dev |
| **localStorage** | Caché de contenido, persistencia de preferencias locales | Browser |
| **Vercel Serverless** | Autenticación, upload, generación de OG tags, sitemap | Backend dev |
| **MongoDB** | Persistencia de contenido (opcional, futuro) | DBA |
| **Cloudinary** | Hosting de imágenes, CDN, transformaciones | Image ops |
| **Vimeo** | Hosting de videos, embeds, player | Video hosting |
| **Git/GitHub** | Control de versiones, versión canónica de content.json | DevOps |

---

## 📈 Escalabilidad

**Hoy** (JSON estático):
- ✅ Rápido: localStorage caché
- ✅ Simple: no necesita DB
- ❌ Limitado: requiere rebuild para cambios
- ❌ No multi-usuario

**Mañana** (MongoDB):
- ✅ Persistencia real
- ✅ Multi-usuario
- ✅ Sin redeployment
- ❌ Más caro: DB + API calls

**Path de migración**:
1. Añadir MONGO_URL a .env
2. Modificar `/api/content.js` para leer de ambas fuentes
3. Migrar histórico de content.json → MongoDB
4. Deprecar JSON fallback
5. Remover fallback cuando estés seguro

---

## 🚀 Performance

**Métricas objetivo**:
- Lighthouse: >90 en todas las categorías
- First Contentful Paint: <1s
- Time to Interactive: <2s
- Cumulative Layout Shift: <0.1

**Optimizaciones implementadas**:
- ✅ Code splitting (React lazy loading)
- ✅ Image optimization (Cloudinary transform)
- ✅ CSS critical (Tailwind purge)
- ✅ Lazy loading de images (IntersectionObserver)
- ✅ Caché agresivo de statics (1 año)
- ✅ No-fetch fallback (localStorage)

**Monitoreo**:
- Vercel Speed Insights
- Google Analytics 4
- Microsoft Clarity (session replay)

---

## 🔗 Referencias Internas

- **DEPLOYMENT_VERCEL.md** — Cómo deployar
- **ENVIRONMENT_VARIABLES.md** — Vars necesarias
- **API_CONTENT_ENDPOINTS.md** — Endpoints detallados
- **DATABASE_SCHEMA.md** — Estructura MongoDB
- **CONTENT_MAPPING.md** — Integración de datos

---

**Actualizado**: 2026-08-27
