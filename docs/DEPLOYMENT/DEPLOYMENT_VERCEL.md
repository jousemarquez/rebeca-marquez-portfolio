# 🚀 Deploy a Vercel — Guía Completa

Instrucciones paso a paso para subir Remarubi a producción en Vercel con MongoDB y Cloudinary.

---

## ✅ Requisitos Previos

Antes de empezar, necesitas:

- ☑️ **GitHub**: Repo con código (`frontend/` en root)
- ☑️ **Vercel**: Cuenta gratis en [vercel.com](https://vercel.com)
- ☑️ **MongoDB Atlas**: Cluster en [mongodb.com/atlas](https://mongodb.com/atlas) (gratis)
- ☑️ **Cloudinary**: Cuenta en [cloudinary.com](https://cloudinary.com) (gratis)
- ☑️ **Dominio**: (opcional, Vercel proporciona uno temporalmente)

**Tiempo estimado**: 30-45 minutos

---

## 📋 Paso 1: Preparar Código Local

### 1.1 Verificar estructura

```bash
tree -L 2
# Debe mostrar:
# ├── frontend/
# │   ├── public/
# │   ├── src/
# │   ├── api/
# │   ├── package.json
# │   ├── vercel.json
# │   └── .env.example
# ├── MEDIA/
# ├── README.md
# └── docs/
```

### 1.2 Crear `.env.example` (si falta)

Copiar de `.env.example` y asegurarse que tenga todas las variables:

```bash
cd frontend
cat > .env.example << 'EOF'
# MongoDB (opcional pero recomendado)
MONGO_URL=mongodb+srv://user:password@cluster.mongodb.net/?appName=myapp
DB_NAME=ddp_portfolio

# Admin (OBLIGATORIO)
ADMIN_PASSWORD=your-secure-password-here

# JWT (OBLIGATORIO)
JWT_SECRET=generate-with-node-command-below

# Cloudinary (OBLIGATORIO para /admin uploads)
CLOUDINARY_CLOUD_NAME=dsphxo7mx
CLOUDINARY_API_KEY=your-api-key-here
CLOUDINARY_API_SECRET=your-api-secret-here

# CORS (opcional)
CORS_ORIGINS=*
EOF
```

### 1.3 Commit y push

```bash
git add .env.example frontend/
git commit -m "chore: update env template and deployment config"
git push origin main
```

---

## 🔐 Paso 2: Configurar Secretos en Servicios Externos

### 2.1 MongoDB Atlas

**Si aún no tienes cluster**:

1. Ir a [mongodb.com/atlas](https://mongodb.com/atlas)
2. Crear cuenta / Login
3. "Create Deployment" → **M0 (Free)**
4. Seleccionar región más cercana
5. Crear usuario admin:
   - Username: `admin`
   - Password: Guardar (usarás abajo)
6. Agregar IP a whitelist: **0.0.0.0/0** (permitir todo, solo en desarrollo)
7. Copiar connection string:
   ```
   mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/?appName=myapp
   ```

**Guardar esta URL**, la usarás en Vercel como `MONGO_URL`.

### 2.2 Cloudinary

**Si aún no tienes cuenta**:

1. Ir a [cloudinary.com](https://cloudinary.com)
2. Signup (gratis)
3. Dashboard → Settings → API Keys
4. Copiar:
   - **Cloud Name**: `dsphxo7mx` (o tu nombre)
   - **API Key**: `abc123...`
   - **API Secret**: `xyz789...` ⚠️ Nunca commitear esto

**Guardar estas 3 claves**, las usarás en Vercel.

### 2.3 JWT Secret

Generar una clave segura de 48 caracteres:

```bash
node -e "require('crypto').randomBytes(48).toString('hex')"
# Output: 3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a0
```

Copiar el output.

---

## 🎯 Paso 3: Conectar GitHub a Vercel

### 3.1 Nuevo proyecto en Vercel

1. Ir a [vercel.com](https://vercel.com) → **New Project**
2. Seleccionar proveedor: **GitHub**
3. Autorizar Vercel para acceder a GitHub
4. Seleccionar repo: `remarubi`
5. Clickear **Import**

### 3.2 Configurar proyecto

En el diálogo "Configure Project":

1. **Framework Preset**: (Vercel auto-detecta) → **Create React App**
2. **Root Directory**: `frontend` ⚠️ Crítico
3. **Node.js Version**: 18.x (default está bien)
4. **Build command**: `npm run predeploy` (ya está en package.json)
5. **Output directory**: `build`
6. Clickear **Deploy**

⏳ Vercel empezará a compilar (esto tomará 2-5 minutos)

---

## ⚙️ Paso 4: Configurar Variables de Entorno

Mientras Vercel compila, configurar env vars:

### 4.1 En Vercel Dashboard

1. Tu proyecto → **Settings** → **Environment Variables**

### 4.2 Agregar 8 variables

```
ADMIN_PASSWORD = your-secure-password-here
JWT_SECRET = 3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a0
DB_NAME = ddp_portfolio
MONGO_URL = mongodb+srv://admin:password@cluster0.xxxxx.mongodb.net/?appName=myapp
CLOUDINARY_CLOUD_NAME = dsphxo7mx
CLOUDINARY_API_KEY = abc123xyz789...
CLOUDINARY_API_SECRET = xyz789abc123...
CORS_ORIGINS = *
```

⚠️ **Importante**:
- Seleccionar scope: **Production, Preview, Development**
- Copiar valores exactamente (sin comillas adicionales)
- `ADMIN_PASSWORD`: mínimo 8 caracteres, no usar "admin123"

### 4.3 Guardar variables

Clickear **Save** después de agregar cada variable.

---

## 🔄 Paso 5: Redeployed

Después de guardar env vars:

1. Vercel Dashboard → Tu proyecto → **Deployments**
2. Clickear el último deployment
3. Opción (⋯) → **Redeploy**
4. Confirm: **Redeploy**

⏳ Segundo deploy tomará 1-3 minutos (con vars ahora configuradas)

---

## ✅ Paso 6: Verificaciones Post-Deploy

### 6.1 Esperar "Ready"

En Deployments, esperar estado **Ready** (ícono verde).

### 6.2 Abrir preview

1. Clickear en el deployment
2. Copiar **Preview URL**:
   ```
   https://remarubi-xxxxx.vercel.app
   ```
3. Abrir en navegador

### 6.3 Checklist de verificación

| Verificación | ✅ / ❌ |
|-------------|--------|
| Home carga (/) | |
| Grid de proyectos (/work) | |
| Detalle de proyecto (/project/que-comen-los-dragones) | |
| About page (/about) | |
| Admin login (/admin) | |
| Login funciona con contraseña | |
| Proyecto se puede editar | |
| Las imágenes cargan desde Cloudinary | |
| Vimeo embed funciona | |

**Si alguno falla**:
- Revisar logs: Deployments → Logs
- Verificar env vars (Settings → Environment Variables)
- Comprobar que MongoDB URL sea correcta

---

## 🌐 Paso 7: Configurar Dominio Personalizado (Opcional)

Si tienes dominio `ddanidiaz.com`:

### 7.1 En Vercel

1. Settings → **Domains**
2. Agregar dominio: `ddanidiaz.com`
3. Vercel muestra instrucciones DNS

### 7.2 En tu proveedor de DNS

1. Ir a registrador de dominios (GoDaddy, Namecheap, etc.)
2. DNS settings del dominio
3. Agregar registros CNAME que Vercel proporciona:
   ```
   CNAME  ddanidiaz.com  cname.vercel-dns.com
   ALIAS  www.ddanidiaz.com  cname.vercel-dns.com
   ```
4. Esperar 5-30 min para propagación DNS

### 7.3 Verificar

```bash
nslookup ddanidiaz.com
# Debe mostrar: ddanidiaz.com points to cname.vercel-dns.com
```

---

## 🔒 Paso 8: Verificar Seguridad

### 8.1 HTTPS

Vercel proporciona SSL/TLS automáticamente.

Verificar en navegador:
- URL comienza con **https://** ✅
- Ícono de candado en navegador ✅

### 8.2 Permisos y Secretos

- ❌ No commitear `.env.local`
- ❌ No publicar API keys en logs
- ✅ Usar Vercel Environment Variables
- ✅ Verificar `.gitignore`:
  ```
  .env.local
  .env.*.local
  node_modules/
  build/
  ```

### 8.3 Headers de Seguridad

Vercel.json ya incluye:
- HSTS (SSL forzado)
- CSP (Content Security Policy)
- X-Frame-Options (clickjacking protection)

Verificar en DevTools → Network → Response Headers.

---

## 📊 Paso 9: Configurar Monitoreo

### 9.1 Vercel Analytics

Ya viene automático. Puedes ver:
- Core Web Vitals
- Latency
- Error rate

En Dashboard → Analytics.

### 9.2 Google Analytics (Opcional)

Si quieres tracking más detallado:

1. Crear propiedad en [analytics.google.com](https://analytics.google.com)
2. Copiar Measurement ID
3. Agregarlo al código en `src/components/SeoHead.jsx`:
   ```javascript
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXX"></script>
   ```

### 9.3 Microsoft Clarity (Opcional)

Para session replay (ver cómo interactúan usuarios):

1. Crear proyecto en [clarity.microsoft.com](https://clarity.microsoft.com)
2. Copiar script ID
3. Ya viene integrado en `vercel.json` CSP

---

## 🚀 Paso 10: Deploy Automático (Opcional)

Vercel auto-deploya cuando haces **git push main**.

Para deshabilitar auto-deploy:
1. Settings → **Git** → **Deploy on Push**
2. Toggle off
3. Deploy manual: Deployments → Redeploy

---

## 🆘 Troubleshooting

### Build falla: "npm ERR!"

```bash
# Limpiar caché Vercel
vercel env pull .env.local.prod  # (si tienes Vercel CLI)

# O en Vercel Dashboard:
# Settings → Deploy → Redeploy with Clear Cache
```

### Admin login no funciona

```
Error: "Invalid password"
→ Verificar ADMIN_PASSWORD en Settings → Environment Variables
→ Asegurarse que coincida exactamente (mayúsculas)
→ Redeploy si lo cambias
```

### Imágenes no cargan

```
Error: 403 Cloudinary
→ Verificar CLOUDINARY_CLOUD_NAME, API_KEY, API_SECRET
→ Comprobar que la URL en content.json sea de Cloudinary
→ Redeploy
```

### MongoDB conexión falla

```
Error: "MongoServerError: authentication failed"
→ Verificar MONGO_URL está correctamente copiada
→ Verificar usuario/password en MongoDB Atlas
→ Verificar que IP whitelist incluya 0.0.0.0/0
→ Redeploy
```

### Dominio personalizado no funciona

```
→ Esperar propagación DNS (5-30 min)
→ Verificar registros DNS en proveedor
→ Limpiar caché del navegador (Ctrl+Shift+Del)
→ Probar en incógnito
```

---

## 📝 Checklist Final

Antes de considerar el deploy **completado**:

- [ ] GitHub repo pusheado
- [ ] Vercel proyecto creado
- [ ] 8 env vars configuradas
- [ ] Deploy "Ready" (estado verde)
- [ ] Home carga en preview URL
- [ ] /admin accesible y login funciona
- [ ] Crear test project en /admin
- [ ] Upload imagen: Cloudinary funciona
- [ ] Exportar JSON: download funciona
- [ ] Dominio personalizado configurado (si aplica)
- [ ] HTTPS forzado
- [ ] Analytics habilitado

---

## 🎉 ¡Listo!

Tu portfolio está **en vivo** en Vercel.

**Próximos pasos**:
1. Agregar 30 proyectos desde `/MEDIA/listing-proyectos.pdf`
   → Lee [CONTENT_MAPPING.md](../CONTENT/CONTENT_MAPPING.md)
2. Subir imágenes
   → Lee [HOW_TO_MANAGE_IMAGES.md](../OPERATIONS/HOW_TO_MANAGE_IMAGES.md)
3. Configurar dominio personalizado (si no lo hiciste)
4. Revisar analytics regularmente

---

**Referencia rápida**:
- Dashboard: https://vercel.com/dashboard
- Documentación Vercel: https://vercel.com/docs
- Documentación MongoDB: https://docs.mongodb.com/manual/
- Documentación Cloudinary: https://cloudinary.com/documentation

---

**Último update**: 2026-08-27
