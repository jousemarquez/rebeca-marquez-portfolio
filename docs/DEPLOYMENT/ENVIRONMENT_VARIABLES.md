# 🔑 Variables de Entorno — Referencia Completa

Guía detallada de qué son, dónde ponerlas, y cómo obtenerlas.

---

## 📋 Tabla Rápida

| Variable | Requerida | Local | Vercel | Origen | Ejemplo |
|----------|-----------|-------|--------|--------|---------|
| `ADMIN_PASSWORD` | ✅ Sí | .env.local | Settings | Tú | `MySecurePass2026` |
| `JWT_SECRET` | ✅ Sí | .env.local | Settings | Generar | `3a4b5c6d...` (48 chars) |
| `MONGO_URL` | ⚠️ Opcional | .env.local | Settings | MongoDB Atlas | `mongodb+srv://...` |
| `DB_NAME` | ⚠️ Opcional | .env.local | Settings | Tú | `ddp_portfolio` |
| `CLOUDINARY_CLOUD_NAME` | ✅ Sí | .env.local | Settings | Cloudinary | `dsphxo7mx` |
| `CLOUDINARY_API_KEY` | ✅ Sí | .env.local | Settings | Cloudinary | `abc123...` |
| `CLOUDINARY_API_SECRET` | ✅ Sí | .env.local | Settings | Cloudinary | `xyz789...` |
| `CORS_ORIGINS` | ⚠️ Opcional | .env.local | Settings | Tú | `*` o `https://example.com` |

---

## 🔍 Detalle de Cada Variable

### 1. ADMIN_PASSWORD

**Qué es**: Contraseña para acceder a `/admin` panel.

**Requerida**: ✅ **Sí** (sin ella, `/admin` no funciona)

**Dónde ponerla**:
- Desarrollo: `.env.local` en root de `frontend/`
- Producción: Vercel Settings → Environment Variables

**Cómo elegir**:
```
✅ Buenas:
  - MySecurePass2026
  - DaniDiaz!PortfolioAdmin
  - SuperSecret@2026
  - qwerty123456 (mínimo 8 chars)

❌ Malas:
  - admin (muy corta)
  - 123456 (muy simple)
  - password (común)
  - "" (vacía)
```

**Requisitos**:
- Mínimo 8 caracteres
- Distingue mayúsculas/minúsculas
- No usar espacios

**Ejemplo en .env.local**:
```env
ADMIN_PASSWORD=DaniDiaz!PortfolioAdmin2026
```

**Cómo usarla**:
- Abrir: `https://remarubi.com/admin`
- Pedir password
- Escribir el valor de `ADMIN_PASSWORD`
- Clickear "Login"

**⚠️ IMPORTANTE**: No commitear esta variable en `.gitignore`.

---

### 2. JWT_SECRET

**Qué es**: Clave para firmar tokens de autenticación JWT.

**Requerida**: ✅ **Sí** (sin ella, /admin no puede generar tokens)

**Dónde ponerla**:
- Desarrollo: `.env.local`
- Producción: Vercel Settings

**Cómo generar**:

```bash
# Opción 1: Con Node.js
node -e "require('crypto').randomBytes(48).toString('hex')"
# Output: 3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a0

# Opción 2: Con Python
python3 -c "import secrets; print(secrets.token_hex(48))"

# Opción 3: Con OpenSSL
openssl rand -hex 48
```

Copiar el output completo (debería ser ~96 caracteres hexadecimales).

**Ejemplo en .env.local**:
```env
JWT_SECRET=3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a0b1c2d3e4f5g6h7i8j9k0l
```

**¿Qué pasa si la cambio?**
- Todos los JWT anteriores se invalidan
- Admin tendrá que re-loguearse
- Usar solo si sospechas compromiso de seguridad

**⚠️ IMPORTANTE**: 
- No commitear en `.gitignore`
- Cambiarla regularmente (ej: anual)

---

### 3. MONGO_URL

**Qué es**: Connection string a MongoDB Atlas.

**Requerida**: ⚠️ **Opcional**
- Sin ella: app funciona con `content.json` (fallback)
- Con ella: app lee/escribe en MongoDB

**Dónde ponerla**:
- Desarrollo: `.env.local`
- Producción: Vercel Settings

**Cómo obtenerla**:

1. Ir a [mongodb.com/atlas](https://mongodb.com/atlas)
2. Login
3. Clusters → Tu cluster → "Connect"
4. Seleccionar "Connect your application"
5. Driver: Node.js, Version: 5.x+
6. Copiar connection string:
   ```
   mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/?appName=myapp
   ```

**Reemplazar**:
- `admin` → tu usuario MongoDB
- `PASSWORD` → tu contraseña MongoDB
- `cluster0.xxxxx` → ID del cluster (copiar de Vercel si no sabes)

**Ejemplo en .env.local**:
```env
MONGO_URL=mongodb+srv://admin:MyPassword123@cluster0.abc123.mongodb.net/?appName=myapp
```

**Verificar que funciona**:
```bash
# Con Vercel CLI (opcional)
vercel env pull .env.local
npm run check:videos  # Valida conexión indirectamente
```

**⚠️ IMPORTANTE**:
- Contiene contraseña → no commitear
- Whitelist IP en MongoDB Atlas: **0.0.0.0/0**
- Cambiar solo si cambias contraseña en MongoDB

---

### 4. DB_NAME

**Qué es**: Nombre de la base de datos en MongoDB.

**Requerida**: ⚠️ **Opcional** (default: `ddp_portfolio`)

**Dónde ponerla**:
- Desarrollo: `.env.local`
- Producción: Vercel Settings

**Valor recomendado**: `ddp_portfolio`

**Ejemplo en .env.local**:
```env
DB_NAME=ddp_portfolio
```

**¿Qué pasa si cambio el nombre?**
- Crea nueva DB con ese nombre
- Perderás datos de la anterior (a menos que migres)
- Usar solo si necesitas múltiples entornos (dev, staging, prod)

---

### 5. CLOUDINARY_CLOUD_NAME

**Qué es**: ID público de tu cuenta Cloudinary.

**Requerida**: ✅ **Sí** (para subir imágenes en /admin)

**Dónde ponerla**:
- Desarrollo: `.env.local`
- Producción: Vercel Settings

**Cómo obtenerla**:

1. Ir a [cloudinary.com](https://cloudinary.com)
2. Login
3. Dashboard → Copia el "Cloud Name"
   ```
   dsphxo7mx  (o tu nombre de cuenta)
   ```

**Ejemplo en .env.local**:
```env
CLOUDINARY_CLOUD_NAME=dsphxo7mx
```

**⚠️ IMPORTANTE**: 
- Es pública (no es secreto)
- Puedes compartirla
- Aparece en las URLs de las imágenes

---

### 6. CLOUDINARY_API_KEY

**Qué es**: Clave pública de API para autenticación con Cloudinary.

**Requerida**: ✅ **Sí** (para /admin uploads)

**Dónde ponerla**:
- Desarrollo: `.env.local`
- Producción: Vercel Settings

**Cómo obtenerla**:

1. Ir a [cloudinary.com](https://cloudinary.com)
2. Icono de cuenta (arriba a la derecha) → Settings
3. API Keys (sección "Security")
4. Copiar el "API Key"

**Ejemplo en .env.local**:
```env
CLOUDINARY_API_KEY=123456789012345
```

**⚠️ IMPORTANTE**: 
- Es semi-pública (se envía en requests)
- Nunca commitear
- Si se expone, regenerar en Cloudinary Settings

---

### 7. CLOUDINARY_API_SECRET

**Qué es**: Clave privada para firmar requests a Cloudinary.

**Requerida**: ✅ **Sí** (para /admin uploads seguros)

**Dónde ponerla**:
- Desarrollo: `.env.local` ✅
- **NO** commitear ❌
- Producción: Vercel Settings (solo)

**Cómo obtenerla**:

1. Ir a [cloudinary.com](https://cloudinary.com)
2. Icono de cuenta → Settings
3. API Keys
4. Copiar "API Secret"

**Ejemplo en .env.local**:
```env
CLOUDINARY_API_SECRET=abcdef1234567890ghijklmnop
```

**⚠️ CRÍTICO**: 
- **NUNCA** commitear a Git
- **NUNCA** publicar públicamente
- **NUNCA** enviar por email
- Si se expone: Regenerar inmediatamente en Cloudinary Settings → Regenerate

**Dónde se usa**:
- Solo en servidor (`/api/upload-sign.js`)
- Nunca en frontend

---

### 8. CORS_ORIGINS

**Qué es**: Dominios permitidos para requests CORS.

**Requerida**: ⚠️ **Opcional** (default: `*`)

**Dónde ponerla**:
- Desarrollo: `.env.local`
- Producción: Vercel Settings

**Valores posibles**:
```env
# Permitir todos (desarrollo)
CORS_ORIGINS=*

# Permitir solo tu dominio (producción recomendado)
CORS_ORIGINS=https://remarubi.com

# Permitir múltiples
CORS_ORIGINS=https://remarubi.com,https://www.ddanidiaz.com,http://localhost:3000

# Permitir cualquier subdominio
CORS_ORIGINS=https://*.ddanidiaz.com
```

**Recomendación**:
- Desarrollo: `*` (permite localhost:3000, etc.)
- Producción: `https://remarubi.com` (más seguro)

---

## 📍 Dónde Ponerlas

### Opción A: Desarrollo Local

**Archivo**: `frontend/.env.local` (no committear)

**Crear archivo**:
```bash
cd frontend
cat > .env.local << 'EOF'
# Básico
ADMIN_PASSWORD=DaniDiaz!PortfolioAdmin2026
JWT_SECRET=3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a0

# MongoDB (opcional)
MONGO_URL=mongodb+srv://admin:password@cluster.mongodb.net/?appName=myapp
DB_NAME=ddp_portfolio

# Cloudinary
CLOUDINARY_CLOUD_NAME=dsphxo7mx
CLOUDINARY_API_KEY=abc123
CLOUDINARY_API_SECRET=xyz789

# CORS
CORS_ORIGINS=*
EOF
```

**Luego**:
```bash
npm start
```

### Opción B: Vercel Producción

**En navegador**:
1. Dashboard de Vercel
2. Tu proyecto → "Settings"
3. "Environment Variables"
4. Agregar cada variable:
   - Key: `ADMIN_PASSWORD`
   - Value: `DaniDiaz!PortfolioAdmin2026`
   - Seleccionar scopes: ✅ Production ✅ Preview ✅ Development
   - Clickear "Add"
5. Repetir para las 8 variables
6. Redeploy: "Deployments" → "Redeploy"

**⚠️ IMPORTANTE**:
- Vercel **no** muestra el valor completo (por seguridad)
- Si necesitas verificar: clickear "Show"
- Cambios toman efecto con redeploy

---

## ✅ Checklist Post-Configuración

### Desarrollo

- [ ] `.env.local` creado
- [ ] 8 variables en `.env.local`
- [ ] `.env.local` en `.gitignore`
- [ ] `npm start` funciona
- [ ] `/admin` login funciona
- [ ] Upload de imagen funciona

### Vercel

- [ ] 8 variables en Settings → Environment Variables
- [ ] Scopes seleccionados: Production + Preview + Development
- [ ] Deployment redeployado
- [ ] `/admin` login funciona en preview
- [ ] Upload de imagen funciona
- [ ] MongoDB conecta (si MONGO_URL está configurado)

---

## 🔒 Seguridad: Buenas Prácticas

✅ **Hacer**:
- Usar contraseña fuerte (8+ chars, mayús, números, símbolos)
- Regenerar JWT_SECRET anualmente
- Regenerar Cloudinary API Secret si se expone
- Cambiar ADMIN_PASSWORD regularmente
- Usar Vercel Settings (no `.env.local` en producción)
- Revisar logs si sospechas compromiso

❌ **No hacer**:
- Commitear `.env.local`
- Usar password simple ("admin123")
- Compartir variables en email
- Usar misma contraseña en múltiples sitios
- Publicar secrets en GitHub Issues
- Revisar `.env.local` en screenshots

---

## 🆘 Troubleshooting

### "ADMIN_PASSWORD no funciona"
- Verificar que esté en `.env.local` o Vercel Settings
- Asegurarse que coincida exactamente (mayúsculas)
- Redeploy si está en Vercel

### "Upload a Cloudinary falla"
- Verificar `CLOUDINARY_API_SECRET` es correcto
- Regenerar en Cloudinary Settings si está expirado
- Verificar que `CLOUDINARY_CLOUD_NAME` sea correcto

### "MongoDB conexión rechazada"
- Verificar `MONGO_URL` está completa y correcta
- Comprobar usuario/password en MongoDB Atlas
- Verificar IP whitelist: **0.0.0.0/0** en MongoDB Security → Network Access

### "app funciona sin MongoDB"
- Esto es normal: usa fallback `content.json`
- Verificar en logs que intenta MongoDB pero no falla gracefully

---

## 📝 Referencia `.env.local` Completa

```bash
# Frontend Environment (.env.local)
# NUNCA commitear este archivo
# Ver .env.example para template

# Admin Panel
ADMIN_PASSWORD=YourSecurePasswordHere123

# JWT Signing
JWT_SECRET=generateWithNode-e-require-crypto-randomBytes48-toString-hex

# MongoDB (opcional)
MONGO_URL=mongodb+srv://admin:password@cluster.mongodb.net/?appName=myapp
DB_NAME=ddp_portfolio

# Cloudinary Image Hosting
CLOUDINARY_CLOUD_NAME=dsphxo7mx
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_keep_private

# CORS
CORS_ORIGINS=*
```

---

**Actualizado**: 2026-08-27
