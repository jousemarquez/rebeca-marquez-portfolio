# ⚡ Quick Start — 15 Minutos

Haz que Remarubi funcione en 15 minutos: desde setup local hasta deploy en Vercel.

---

## Paso 1: Setup Local (5 min)

```bash
# Clonar o descargar el repo
cd remarubi/frontend

# Instalar dependencias
npm install

# Crear archivo .env local (copiar de .env.example)
cp .env.example .env.local

# Editar .env.local con valores de prueba
ADMIN_PASSWORD=test2026         # Contraseña simple para pruebas
JWT_SECRET=test-secret-key-32x  # Mínimo 32 caracteres
```

**En .env.local**:
```env
# Básico (OBLIGATORIO para funcionar localmente)
ADMIN_PASSWORD=test2026
JWT_SECRET=test-secret-key-please-use-32-chars

# Cloudinary (OPCIONAL para pruebas - usa valores demo si no tienes)
CLOUDINARY_CLOUD_NAME=dsphxo7mx
CLOUDINARY_API_KEY=your-key-here
CLOUDINARY_API_SECRET=your-secret-here

# MongoDB (OPCIONAL - funciona sin él)
MONGO_URL=
DB_NAME=ddp_portfolio
```

---

## Paso 2: Ejecutar en Local (3 min)

```bash
# Desde /frontend
npm start
```

✅ Se abre automáticamente en http://localhost:3000

**Navega por**:
- `/` — Home
- `/work` — Listado de proyectos
- `/project/que-comen-los-dragones` — Detalle de proyecto
- `/about` — About page
- `/admin` — Panel administrativo

---

## Paso 3: Probar Admin Panel (3 min)

1. Ir a `/admin`
2. Login con contraseña: `test2026`
3. Explorar:
   - Ver proyectos existentes
   - Editar metadatos del sitio
   - Crear nuevo proyecto (sin publicar aún)
4. Logout

---

## Paso 4: Deploy a Vercel (4 min)

### 4.1 Push a GitHub

```bash
# Desde raíz del proyecto
git add .
git commit -m "Initial commit: Remarubi portfolio"
git push origin main
```

### 4.2 Conectar Vercel

1. Ir a [vercel.com](https://vercel.com)
2. Login / Sign up
3. "New Project" → Seleccionar repo
4. Framework: **Create React App** (auto-detecta)
5. Root Directory: `frontend`
6. Clickear "Deploy"

### 4.3 Configurar Variables de Entorno

Mientras Vercel deploya:

1. En Vercel Dashboard → "Settings" → "Environment Variables"
2. Agregar 8 variables:

```env
ADMIN_PASSWORD=your-secure-password-here
JWT_SECRET=<generar: node -e "require('crypto').randomBytes(48).toString('hex')">
DB_NAME=ddp_portfolio
MONGO_URL=mongodb+srv://... (opcional)
CLOUDINARY_CLOUD_NAME=dsphxo7mx
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CORS_ORIGINS=*
```

3. Clickear "Save"
4. Volver a deployar: "Deployments" → "Redeploy"

---

## Paso 5: Verificar en Producción (2 min)

Esperar a que el deploy termine (~3 min).

Cuando veas "Ready", clickear en la preview URL.

**Checklist**:
- [ ] Home carga correctamente
- [ ] /work muestra los 2 proyectos
- [ ] /admin te pide contraseña
- [ ] Login funciona
- [ ] Las imágenes cargan

---

## 🎉 ¡Listo!

Tu portfolio está **en vivo en Vercel**.

**URL**: https://your-vercel-domain.vercel.app

---

## 📚 Siguiente: Agregar Contenido

### Opción A: Vía Admin Panel (Recomendado)
1. Abrir `/admin`
2. Crear nuevo proyecto
3. Rellenar formulario
4. Exportar JSON
5. Guardar en `src/data/content.json`
6. Git push → Deploy automático

👉 Lee [**HOW_TO_ADD_PROJECTS.md**](./OPERATIONS/HOW_TO_ADD_PROJECTS.md) para detalles

### Opción B: Integrar 30 Proyectos del PDF
1. Revisar `/MEDIA/listing-proyectos.pdf`
2. Extraer metadata de proyectos
3. Usar guía [**CONTENT_MAPPING.md**](./CONTENT/CONTENT_MAPPING.md)
4. Importar en content.json
5. Deploy

---

## 🔍 Troubleshooting

### "npm install falla"
```bash
# Limpiar cache
rm -rf node_modules package-lock.json
npm install
```

### "localhost:3000 no carga"
```bash
# Verificar puerto
lsof -i :3000
# Si está ocupado, usar otro:
PORT=3001 npm start
```

### "Admin login no funciona"
- Verificar `ADMIN_PASSWORD` en `.env.local`
- Contraseña distingue mayúsculas
- Intentar con la contraseña simple `test2026`

### "Vercel deploy falla"
- Revisar logs en Vercel Dashboard → "Deployments"
- Verificar que el root directory sea `frontend`
- Comprobar variables de entorno

---

## 🚀 Próximos Pasos

- **Para operadores**: Lee [**HOW_TO_ADD_PROJECTS.md**](./OPERATIONS/HOW_TO_ADD_PROJECTS.md)
- **Para developers**: Lee [**ARCHITECTURE.md**](./ARCHITECTURE.md)
- **Para entender el flujo**: Lee [**DEPLOYMENT_VERCEL.md**](./DEPLOYMENT/DEPLOYMENT_VERCEL.md)

---

**Tiempo total**: ~15 minutos ⏱️
