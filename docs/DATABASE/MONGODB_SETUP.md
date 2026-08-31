# 🗄️ Cómo Montar MongoDB desde Cero

Guía paso a paso para crear un cluster MongoDB Atlas gratuito y conectarlo al proyecto.

---

## ✅ Requisitos

- ☑️ Cuenta de email (para MongoDB Atlas)
- ☑️ 10 minutos de tiempo
- ☑️ (Opcional) MongoDB Compass instalado localmente

---

## 🚀 Paso 1: Crear Cuenta en MongoDB Atlas

### 1.1 Ir a MongoDB Atlas

```
https://www.mongodb.com/cloud/atlas/register
```

### 1.2 Crear Cuenta

1. Clickea "Sign Up with Google" (o usa email)
2. Completa formulario:
   - **First Name**: Rebeca
   - **Last Name**: Márquez Rubio
   - **Email**: rebeca@remarubi.com (o tu email)
   - **Password**: Fuerte (mínimo 8 caracteres)
3. Acepta términos
4. Clickea "Create Your Account"

### 1.3 Verifica Email

1. Revisa inbox de email
2. Abre link de verificación de MongoDB
3. ✅ Cuenta creada y verificada

---

## 🔧 Paso 2: Crear Cluster MongoDB

### 2.1 Crear Primer Cluster

Después de verificar email, MongoDB te pide crear un cluster:

1. Selecciona **"Shared"** (gratis, suficiente para portfolio)
2. Provider: **AWS**
3. Region: **Europe (Frankfurt)** o la más cercana a ti
4. Cluster Name: `remarubi-prod`
5. Clickea **"Create Deployment"**

⏳ Espera 2-3 minutos a que se cree el cluster (estado: "Available")

### 2.2 Crear Usuario de Base de Datos

1. En la pantalla del cluster, ir a "Security" → **"Database Access"**
2. Clickea **"Add New Database User"**
3. Completa:
   - **Username**: `rebeca_admin`
   - **Password**: Genera automático o crea uno fuerte
   - **Built-in Role**: `Atlas admin`
4. Clickea **"Add User"**

⚠️ **Guarda la contraseña en un lugar seguro** (la usarás en connection string)

---

## 🔐 Paso 3: Configurar Acceso a Red

### 3.1 IP Whitelist

1. En MongoDB Atlas → "Security" → **"Network Access"**
2. Clickea **"Add IP Address"**
3. Selecciona **"Allow access from anywhere"** (0.0.0.0/0)
   - ⚠️ Menos seguro pero funcional para desarrollo
   - En producción: limitar a IPs específicas
4. Clickea **"Confirm"**

---

## 🔗 Paso 4: Obtener Connection String

### 4.1 Copiar Connection String

1. En MongoDB Atlas → Tu cluster → Clickea **"Connect"**
2. Selecciona **"Connect to your application"**
3. Driver: **Node.js**, Version: **5.x+**
4. Copiar connection string:

```
mongodb+srv://rebeca_admin:<password>@remarubi-prod.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=myapp
```

### 4.2 Reemplazar Password

En la string que copiaste, reemplaza `<password>` con la contraseña del usuario creado.

**Ejemplo completado**:
```
mongodb+srv://rebeca_admin:MySecurePassword123@remarubi-prod.abc123.mongodb.net/?retryWrites=true&w=majority&appName=myapp
```

---

## 🛠️ Paso 5: Configurar en el Proyecto

### 5.1 Crear `.env.local` (Desarrollo Local)

```bash
cd frontend
cat > .env.local << 'EOF'
# MongoDB
MONGO_URL=mongodb+srv://rebeca_admin:MySecurePassword123@remarubi-prod.abc123.mongodb.net/?retryWrites=true&w=majority&appName=myapp
DB_NAME=remarubi_production

# Admin
ADMIN_PASSWORD=TuContraseñaSegura2026
JWT_SECRET=generadoConNodeCrypto48BytesHex

# Cloudinary
CLOUDINARY_CLOUD_NAME=dsphxo7mx
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# CORS
CORS_ORIGINS=*
EOF
```

### 5.2 Configurar en Vercel (Producción)

1. Ir a [vercel.com](https://vercel.com)
2. Tu proyecto → **"Settings"** → **"Environment Variables"**
3. Agregar variable:
   - **Key**: `MONGO_URL`
   - **Value**: Tu connection string completa
   - **Scope**: Production, Preview, Development
   - Clickea **"Add"**
4. Redeploy: "Deployments" → "Redeploy"

---

## 📊 Paso 6: Crear Base de Datos y Colecciones

### 6.1 Con MongoDB Atlas UI (Recomendado para empezar)

1. En MongoDB Atlas → Tu cluster → **"Collections"**
2. Clickea **"Create Database"**
3. **Database Name**: `remarubi_production`
4. **Collection Name**: `content`
5. Clickea **"Create"**

✅ Base de datos y colección creadas.

### 6.2 Con MongoDB Compass (Avanzado)

Si tienes Compass instalado:

```bash
# En MongoDB Compass
1. Nueva conexión
2. Pegar tu MONGO_URL
3. Connect
4. Click derecho en lista de bases de datos
5. Create Database
6. Name: remarubi_production
7. Collection: content
8. Create
```

---

## ✔️ Paso 7: Probar Conexión

### 7.1 Test Local

```bash
cd frontend
npm install  # Asegurarse que mongodb driver esté instalado
npm start
```

En el navegador:
1. Abrir http://localhost:3000/admin
2. Login con `ADMIN_PASSWORD`
3. Si MongoDB está conectado, deberías ver un panel funcional

### 7.2 Test en Vercel

```bash
1. Ir a https://remarubi.com/admin
2. Debe cargar sin errores
3. Revisar logs si hay problemas: Vercel Dashboard → Deployments → Logs
```

---

## 📋 Información de Referencia

Guarda estos datos en un lugar seguro:

```
CLUSTER: remarubi-prod
REGION: Frankfurt (ou tu selección)
USERNAME: rebeca_admin
PASSWORD: [Tu contraseña]
DATABASE: remarubi_production
COLLECTION: content

MONGO_URL: mongodb+srv://rebeca_admin:PASSWORD@remarubi-prod.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=myapp
```

---

## 🚀 Paso 8: Migrar JSON a MongoDB

Una vez que la conexión funciona, migrar los datos:

```bash
npm run migrate:json-to-mongo
```

(Script creado en siguiente paso)

---

## 🆘 Troubleshooting

### "Connection refused"

```
Causas:
✗ MONGO_URL incorrecta
✗ Usuario/password mal copiados
✗ IP no whitelistada

Soluciones:
1. Copiar MONGO_URL nuevamente de MongoDB Atlas
2. Verificar usuario existe en Database Access
3. Verificar IP whitelist incluye 0.0.0.0/0
```

### "Authentication failed"

```
Causa: Contraseña incorrecta en MONGO_URL

Solución:
1. Ir a MongoDB Atlas → Database Access
2. Cambiar contraseña del usuario
3. Copiar nueva contraseña a MONGO_URL
4. Redeploy
```

### "Can't connect to Vercel"

```
Causa: MONGO_URL no configurada en Vercel Settings

Solución:
1. Settings → Environment Variables
2. Agregar MONGO_URL
3. Redeploy
4. Esperar 2-3 minutos
```

---

## 🔒 Buenas Prácticas de Seguridad

✅ **Hacer**:
- Usar contraseña fuerte (mínimo 12 caracteres)
- No commitear `.env.local` a Git
- Usar `.env.local` en `.gitignore`
- Cambiar contraseña MongoDB cada 3-6 meses
- Limitar IP whitelist en producción

❌ **No hacer**:
- Compartir MONGO_URL por email
- Usar contraseña simple ("password123")
- Commitear `.env.local`
- Usar 0.0.0.0/0 en producción real
- Mostrar MONGO_URL en screenshots

---

## 📚 Próximos Pasos

Una vez que MongoDB esté funcionando:

1. Lee [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) — Estructura de datos
2. Lee [DATABASE_MIGRATION.md](./DATABASE_MIGRATION.md) — Migrar JSON a MongoDB
3. Ejecuta scripts de migración
4. Verifica datos en MongoDB Atlas → Collections

---

## 🔗 Referencias Útiles

- **MongoDB Atlas Dashboard**: https://cloud.mongodb.com/
- **MongoDB Documentation**: https://docs.mongodb.com/
- **Connection String Reference**: https://docs.mongodb.com/manual/reference/connection-string/
- **MongoDB Compass Download**: https://www.mongodb.com/products/compass
- **Your Cluster**: https://cloud.mongodb.com/v2/[PROJECT_ID]#clusters

---

**Tiempo estimado**: 15-20 minutos  
**Costo**: GRATIS (tier M0 Shared)

---

**Último update**: 2026-08-27
