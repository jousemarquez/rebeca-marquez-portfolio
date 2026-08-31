# 🚀 Activar MongoDB en Remarubi

Guía rápida para activar tu cluster MongoDB ya creado en el proyecto Remarubi de Rebeca.

---

## ✅ Información de Conexión

```
Usuario: mquezflores_db_user
Cluster: remarubi-prod
Región: (verificar en MongoDB Atlas)
Base de datos: remarubi_production
Connection String: mongodb+srv://mquezflores_db_user:N76HVLEBhdjo9dsr@remarubi-prod.dadpzii.mongodb.net/
```

---

## 🔧 Paso 1: Configurar Desarrollo Local

### 1.1 Crear `.env.local`

```bash
cd frontend
cat > .env.local << 'EOF'
# MongoDB
MONGO_URL=mongodb+srv://mquezflores_db_user:N76HVLEBhdjo9dsr@remarubi-prod.dadpzii.mongodb.net/
DB_NAME=remarubi_production

# Admin Panel
ADMIN_PASSWORD=Rebeca2026Remarubi!

# JWT Secret (generar)
JWT_SECRET=generar-con-comando-abajo

# Cloudinary
CLOUDINARY_CLOUD_NAME=dsphxo7mx
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret

# CORS
CORS_ORIGINS=*
EOF
```

### 1.2 Generar JWT_SECRET

```bash
node -e "require('crypto').randomBytes(48).toString('hex')"
```

Copiar el output y reemplazar `JWT_SECRET=generar-con-comando-abajo` con el resultado.

### 1.3 Ejemplo completo `.env.local`

```env
MONGO_URL=mongodb+srv://mquezflores_db_user:N76HVLEBhdjo9dsr@remarubi-prod.dadpzii.mongodb.net/
DB_NAME=remarubi_production
ADMIN_PASSWORD=Rebeca2026Remarubi!
JWT_SECRET=abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
CLOUDINARY_CLOUD_NAME=dsphxo7mx
CLOUDINARY_API_KEY=abc123xyz
CLOUDINARY_API_SECRET=xyz789abc
CORS_ORIGINS=*
```

---

## 📊 Paso 2: Crear Estructura en MongoDB

Tu cluster `remarubi-prod` ya existe. Ahora asegúrate que tiene la base de datos y colección:

### Opción A: Via MongoDB Atlas (Recomendado)

1. Ir a https://cloud.mongodb.com/
2. Seleccionar cluster `remarubi-prod`
3. Clickea **"Collections"**
4. Clickea **"Create Database"**
   - Database name: `remarubi_production`
   - Collection name: `content`
5. Clickea **"Create"**

✅ Base de datos lista

### Opción B: Via MongoDB Compass

1. Abrir MongoDB Compass
2. New Connection
3. Pegar Connection String: `mongodb+srv://mquezflores_db_user:N76HVLEBhdjo9dsr@remarubi-prod.dadpzii.mongodb.net/`
4. Click **"Connect"**
5. Clickea "+" junto a "Databases"
6. Database name: `remarubi_production`
7. Collection name: `content`
8. Clickea **"Create Database"**

✅ Base de datos lista

---

## 📤 Paso 3: Migrar Datos a MongoDB

Una vez que `.env.local` está configurado y la base de datos existe:

### 3.1 Instalar Dependencia MongoDB

```bash
cd frontend
npm install mongodb
```

### 3.2 Ejecutar Migración

```bash
npm run migrate:json-to-mongo
```

**Salida esperada**:
```
🔗 Conectando a MongoDB...
   URL: mongodb+srv://mquezflores_db_user:...
✅ Conectado a MongoDB

📖 Leyendo content.json...
✅ Archivo leído (2 proyectos)

🔍 Verificando si documento existe...
✨ No existe documento previo
   Creando nuevo documento...

✅ Documento creado
   ID: ObjectId(...)

🔎 Verificando integridad de datos...

╔════════════════════════════════════════╗
║    ✅ MIGRACIÓN COMPLETADA CON ÉXITO   ║
╚════════════════════════════════════════╝

📊 Información de la Migración:
───────────────────────────────
Base de datos: remarubi_production
Colección: content
Sitio: Rebeca Márquez Rubio
Proyectos: 2
Último actualizado: 27/08/2026 15:30:45

🚀 Próximos pasos:
───────────────────────────────
1. npm start (para probar localmente)
2. Verificar que /admin funciona
3. Verificar que /work muestra proyectos
```

✅ **Datos migrados a MongoDB**

---

## ✅ Paso 4: Probar Localmente

### 4.1 Iniciar Servidor

```bash
npm start
```

Debe abrir http://localhost:3000 automáticamente.

### 4.2 Verificar que Funciona

1. **Home page** (`/`) 
   - ✅ Debe cargar
   - ✅ Debe mostrar nombre "Rebeca Márquez Rubio"

2. **Grid de proyectos** (`/work`)
   - ✅ Debe mostrar proyectos
   - ✅ Las imágenes deben cargar

3. **Admin panel** (`/admin`)
   - ✅ Va a `/admin`
   - ✅ Pide contraseña
   - ✅ Ingresa: `Rebeca2026Remarubi!`
   - ✅ Debe abrir panel
   - ✅ Debe mostrar proyectos existentes

4. **Logs de MongoDB** (verificar conexión)
   - Abrir Developer Tools (F12)
   - Ir a Console
   - No debe haber errores rojo sobre MongoDB

---

## 🌐 Paso 5: Configurar en Vercel

### 5.1 Agregar Variables de Entorno

1. Ir a https://vercel.com/
2. Tu proyecto → **Settings** → **Environment Variables**
3. Agregar 4 variables:

| Key | Value |
|-----|-------|
| `MONGO_URL` | `mongodb+srv://mquezflores_db_user:N76HVLEBhdjo9dsr@remarubi-prod.dadpzii.mongodb.net/` |
| `DB_NAME` | `remarubi_production` |
| `ADMIN_PASSWORD` | `Rebeca2026Remarubi!` |
| `JWT_SECRET` | (tu valor generado) |

Para cada variable:
- Seleccionar scopes: ✅ Production ✅ Preview ✅ Development
- Clickear **"Add"**

### 5.2 Redeploy

1. Vercel Dashboard → **Deployments**
2. Clickea el deployment más reciente
3. Opción (⋯) → **Redeploy**
4. Clickea **"Redeploy"**

⏳ Esperar 2-3 minutos a que compile y deploya.

---

## ✅ Verificación en Producción

Una vez que Vercel termine el deploy:

1. Abrir https://remarubi.com
2. Verificar que carga correctamente
3. Ir a https://remarubi.com/work
4. Verificar que se ven proyectos
5. Ir a https://remarubi.com/admin
6. Login con `Rebeca2026Remarubi!`
7. Debe funcionar igual que local

✅ **MongoDB en producción funcionando**

---

## 🔍 Verificar Datos en MongoDB

### Via MongoDB Atlas

1. https://cloud.mongodb.com/
2. Tu cluster `remarubi-prod` → **Collections**
3. Selecciona BD `remarubi_production`
4. Colección `content`
5. Deberías ver 1 documento
6. Expandirlo y verificar estructura

### Via MongoDB Compass

1. Abrir Compass
2. Conectar con tu connection string
3. Navega a `remarubi_production` → `content`
4. Verifica documento

---

## 🚀 Próximos Pasos

Una vez que MongoDB está activo:

1. **Agregar más proyectos**
   - Ir a `/admin`
   - Crear nuevos proyectos
   - Los cambios se guardan en MongoDB automáticamente

2. **Integrar los 30 proyectos del PDF**
   - Seguir [CONTENT_MAPPING.md](./CONTENT_MAPPING.md)
   - Agregar uno por uno via `/admin`
   - O actualizar `content.json` y migrar

3. **Subir imágenes**
   - Via `/admin` → Upload (sube a Cloudinary automáticamente)
   - O directamente a Cloudinary

---

## 🆘 Problemas

### "Connection refused"

```
Solución:
1. Verificar MONGO_URL en .env.local
2. Copiar nuevamente de:
   mongodb+srv://mquezflores_db_user:N76HVLEBhdjo9dsr@remarubi-prod.dadpzii.mongodb.net/
3. npm start
```

### "Authentication failed"

```
Solución:
1. Verificar usuario: mquezflores_db_user
2. Verificar password: N76HVLEBhdjo9dsr
3. Ambos en MONGO_URL
```

### "Database not found"

```
Solución:
1. En MongoDB Atlas: Collections → Create Database
2. Database name: remarubi_production
3. Collection name: content
```

### "No se ven proyectos en /work"

```
Soluciones:
1. npm run migrate:json-to-mongo (ejecutar migración)
2. Recargar página (Ctrl+Shift+Del)
3. Verificar en MongoDB Atlas que documento existe
```

---

## 📋 Checklist Final

- [ ] `.env.local` creado con MONGO_URL
- [ ] Base de datos `remarubi_production` creada
- [ ] Colección `content` creada
- [ ] `npm install mongodb` completado
- [ ] `npm run migrate:json-to-mongo` ejecutado exitosamente
- [ ] `npm start` funciona localmente
- [ ] `/admin` accessible con contraseña
- [ ] `/work` muestra proyectos
- [ ] MONGO_URL en Vercel Settings configurada
- [ ] Deploy en Vercel completado
- [ ] https://remarubi.com funciona en producción

---

## 📞 Referencia Rápida

```bash
# Crear .env.local
nano frontend/.env.local

# Generar JWT_SECRET
node -e "require('crypto').randomBytes(48).toString('hex')"

# Instalar dependencias
npm install mongodb

# Ejecutar migración
npm run migrate:json-to-mongo

# Iniciar local
npm start

# Deploy a Vercel
git add .
git commit -m "Activate MongoDB"
git push origin main
```

---

**MongoDB está 100% activo y listo para usar con Rebeca Márquez Rubio.**

---

**Actualizado**: 2026-08-27
