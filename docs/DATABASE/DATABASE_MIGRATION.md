# 🔄 Migración: JSON → MongoDB

Guía paso a paso para migrar de `content.json` estático a MongoDB persistente.

---

## 📋 Opciones de Migración

### Opción 1: Via MongoDB Atlas UI (Más Simple ⭐)
**Nivel**: Principiante  
**Tiempo**: 5 minutos

### Opción 2: Via Script Node.js (Recomendado)
**Nivel**: Intermedio  
**Tiempo**: 10 minutos

### Opción 3: Via MongoDB Compass (Visual)
**Nivel**: Intermedio  
**Tiempo**: 15 minutos

---

## 🎯 Opción 1: MongoDB Atlas UI (Recomendado para empezar)

### 1.1 Preparar JSON

1. Abrir `frontend/src/data/content.json`
2. Copiar **todo el contenido**
3. Guardarlo en un lugar temporal (copiar al portapapeles)

### 1.2 En MongoDB Atlas

1. Ir a https://cloud.mongodb.com/
2. Tu cluster → **"Collections"**
3. Base de datos: `remarubi_production`
4. Colección: `content`
5. Clickea **"Insert Document"** (botón verde)
6. **Reemplaza** el contenido por defecto con tu JSON
7. Clickea **"Insert"**

✅ **Documento insertado en MongoDB**

### 1.3 Verificar

1. Actualizar página
2. Deberías ver el documento en la colección
3. Expandir para verificar que los 30 proyectos están ahí

---

## 🔧 Opción 2: Script Node.js (Automático)

### 2.1 Crear Script de Migración

```bash
# En la raíz del proyecto
cat > migrate-to-mongo.js << 'EOF'
const fs = require('fs');
const { MongoClient } = require('mongodb');

// Cargar variables de entorno
require('dotenv').config({ path: 'frontend/.env.local' });

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME || 'remarubi_production';

async function migrate() {
  if (!MONGO_URL) {
    console.error('❌ Error: MONGO_URL no configurada en .env.local');
    process.exit(1);
  }

  const client = new MongoClient(MONGO_URL);

  try {
    console.log('🔗 Conectando a MongoDB...');
    await client.connect();

    const db = client.db(DB_NAME);
    const collection = db.collection('content');

    // Leer content.json
    console.log('📖 Leyendo content.json...');
    const contentJson = JSON.parse(
      fs.readFileSync('frontend/src/data/content.json', 'utf8')
    );

    // Agregar timestamps
    contentJson.createdAt = new Date();
    contentJson.updatedAt = new Date();

    // Verificar si documento existe
    const existing = await collection.findOne({});

    if (existing) {
      console.log('📝 Documento existente encontrado. Actualizando...');
      await collection.updateOne(
        {},
        { $set: contentJson }
      );
      console.log('✅ Documento actualizado');
    } else {
      console.log('✨ Creando nuevo documento...');
      await collection.insertOne(contentJson);
      console.log('✅ Documento creado');
    }

    // Verificación
    const count = await collection.countDocuments({});
    const projects = await collection.findOne({});
    const projectCount = projects?.projects?.length || 0;

    console.log(`
    ✅ MIGRACIÓN COMPLETADA
    
    Base de datos: ${DB_NAME}
    Colección: content
    Documentos: ${count}
    Proyectos en documento: ${projectCount}
    
    Conecta con MongoDB Atlas para verificar:
    https://cloud.mongodb.com/
    `);

  } catch (error) {
    console.error('❌ Error en migración:', error.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

migrate();
EOF
```

### 2.2 Instalar Dependencia

```bash
npm install --save mongodb dotenv
```

### 2.3 Ejecutar Script

```bash
node migrate-to-mongo.js
```

**Output esperado**:
```
🔗 Conectando a MongoDB...
📖 Leyendo content.json...
✨ Creando nuevo documento...
✅ Documento creado

✅ MIGRACIÓN COMPLETADA

Base de datos: remarubi_production
Colección: content
Documentos: 1
Proyectos en documento: 30

Conecta con MongoDB Atlas para verificar:
https://cloud.mongodb.com/
```

✅ **Migración completada**

---

## 🖥️ Opción 3: MongoDB Compass (Visual)

### 3.1 Descargar Compass

```
https://www.mongodb.com/products/compass
```

### 3.2 Conectar a MongoDB

1. Abrir MongoDB Compass
2. New Connection
3. Pegar tu MONGO_URL
4. Clickea "Connect"

### 3.3 Crear Base de Datos

1. Left panel → Clickea "+" junto a "Databases"
2. Database name: `remarubi_production`
3. Collection name: `content`
4. Clickea "Create Database"

### 3.4 Insertar Documento

1. Navega a: `remarubi_production` → `content`
2. Clickea botón verde **"Insert Document"**
3. Reemplaza `{ }` con tu JSON de `content.json`
4. Clickea **"Insert"**

✅ **Documento en MongoDB**

---

## ✅ Verificación Post-Migración

### En MongoDB Atlas UI

1. Collections → `content`
2. Deberías ver 1 documento
3. Expandir documento
4. Verificar:
   - ✅ `site.name` = "Rebeca Márquez Rubio"
   - ✅ `about` tiene contenido
   - ✅ `projects` es array con 2+ proyectos
   - ✅ Cada proyecto tiene `slug`, `title`, `year`

### En tu Aplicación

1. Asegúrate que `MONGO_URL` está en `.env.local`
2. `npm start` (dev local)
3. Abrir http://localhost:3000/
4. Verificar que la página carga contenido
5. `/admin` debe funcionar (login, edit, etc.)
6. `/work` debe mostrar los proyectos

---

## 🔄 Flujo Después de la Migración

```
Opción A: Dual Read (Recomendado)
  API intenta MongoDB primero
  Si falla, fallback a content.json
  Esto permite migración gradual

Opción B: MongoDB Only
  Eliminar fallback a JSON
  Más eficiente pero requiere confianza en MongoDB

Opción C: Mantener JSON
  Seguir usando content.json
  MongoDB como backup (no recomendado)
```

**Implementación en `/api/content.js`**:

```javascript
// GET /api/content
export default async function handler(req, res) {
  try {
    // Intentar MongoDB
    if (process.env.MONGO_URL) {
      const { MongoClient } = require('mongodb');
      const client = new MongoClient(process.env.MONGO_URL);
      
      try {
        await client.connect();
        const db = client.db(process.env.DB_NAME || 'remarubi_production');
        const content = await db.collection('content').findOne({});
        
        if (content) {
          return res.status(200).json(content);
        }
      } finally {
        await client.close();
      }
    }

    // Fallback a JSON
    const content = require('../src/data/content.json');
    return res.status(200).json(content);

  } catch (error) {
    console.error('Error fetching content:', error);
    
    // Último fallback: JSON
    const content = require('../src/data/content.json');
    return res.status(200).json(content);
  }
}
```

---

## 🚀 Deploy a Vercel Después de Migración

### 1. Verificar Localmente

```bash
# Asegúrese MONGO_URL funciona en .env.local
npm start
# Verificar que todo funciona
```

### 2. Configurar en Vercel

1. Dashboard → Settings → Environment Variables
2. Agregar `MONGO_URL` (si no está)
3. Agregar `DB_NAME` = `remarubi_production`
4. Redeploy

### 3. Verificar en Producción

```
https://remarubi.com/admin
```

Debe funcionar igual que local, pero leyendo de MongoDB.

---

## 🔄 Rollback (Volver a JSON)

Si algo falla:

```bash
# Git reset
git checkout frontend/src/data/content.json

# Eliminar MONGO_URL de .env.local o Vercel
# Redeploy
```

App volverá a funcionar con JSON.

---

## 📊 Checklist de Migración

- [ ] MongoDB Compass o Atlas setup completado
- [ ] MONGO_URL obtenida
- [ ] Base de datos `remarubi_production` creada
- [ ] Colección `content` creada
- [ ] Documento insertado en MongoDB
- [ ] Documento verificado (30 proyectos)
- [ ] `.env.local` tiene MONGO_URL
- [ ] `npm start` funciona localmente
- [ ] `/admin` accessible
- [ ] `MONGO_URL` configurada en Vercel
- [ ] Deploy en Vercel completado
- [ ] Producción funciona (https://remarubi.com)
- [ ] Proyectos cargan desde MongoDB (verificable en logs)

---

## 🆘 Problemas Comunes

### "MONGO_URL no está configurada"

```bash
# Solución:
cd frontend
cat > .env.local << 'EOF'
MONGO_URL=mongodb+srv://...
DB_NAME=remarubi_production
...
EOF
npm start
```

### "Connection refused"

```
Causa: IP no whitelistada en MongoDB

Solución:
1. MongoDB Atlas → Security → Network Access
2. Verificar 0.0.0.0/0 está habilitado
3. Esperar 1-2 minutos a propagación
```

### "Documento insertado pero no aparece en app"

```
Causa: App aún lee de content.json

Solución:
1. Verificar MONGO_URL en logs: Vercel Dashboard → Deployments
2. Redeploy: Deployments → Redeploy
3. Esperar 2-3 minutos
```

---

## 📚 Próximas Documentaciones

Después de migrar:
1. Lee [API_CONTENT_ENDPOINTS.md](./API_CONTENT_ENDPOINTS.md) — Usar API
2. Lee [MAINTENANCE_CHECKLIST.md](../OPERATIONS/MAINTENANCE_CHECKLIST.md) — Mantener
3. Lee [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) — Estructura avanzada

---

**Actualizado**: 2026-08-27
