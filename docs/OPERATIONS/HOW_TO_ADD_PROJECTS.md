# ➕ Cómo Agregar Nuevos Proyectos

Guía práctica para Dani y el equipo: 3 métodos para agregar proyectos al portfolio.

---

## 🎯 Método 1: Via Admin Panel (Recomendado ⭐)

**Ventajas**:
- ✅ Sin usar código
- ✅ Interfaz visual
- ✅ Upload de imágenes incluido
- ✅ Preview antes de publicar

**Paso a paso**:

### 1.1 Abrir Admin Panel

```
Ir a: https://remarubi.com/admin
      (o http://localhost:3000/admin en desarrollo)
```

### 1.2 Login

1. Te pide contraseña
2. Escribe el valor de `ADMIN_PASSWORD` (ej: `DaniDiaz!PortfolioAdmin2026`)
3. Clickea "Login"

✅ Verás el panel de administración.

### 1.3 Crear Nuevo Proyecto

1. Botón "New Project" (arriba a la derecha)
2. Se abre formulario vacío

### 1.4 Rellenar Campos Obligatorios

```
Título:         Mi Nuevo Proyecto
Slug:           mi-nuevo-proyecto  (auto-genera desde título)
Categoría:      fiction / documentary / commercial / music-video
Año:            2026
Tipo (ES):      Cortometraje
Tipo (EN):      Short Film
```

### 1.5 Agregar Metadatos

```
Director:           Juan Pérez, María García
Productora:         Saturno Films
Formato:            ARRI Alexa Mini · Cooke S4
Duración:           12 min (opcional)
```

### 1.6 Sinopsis

```
Sinopsis (ES):  Lorem ipsum dolor sit amet, consectetur...
Sinopsis (EN):  Lorem ipsum dolor sit amet, consectetur...
```

### 1.7 Subir Cover Image

1. Sección "Cover Image"
2. Drag & drop de imagen O clickea "Browse"
3. Selecciona JPG/PNG (<5MB)
4. Espera carga a Cloudinary (2-5 seg)
5. ✅ URL se copia automáticamente

### 1.8 Preview URL (Vimeo/YouTube)

```
Ir a Vimeo.com → tu video
Copiar el ID de la URL o usar "Share" → "Embed"
Pegar URL completa en "preview_url"

Ejemplo:
https://vimeo.com/1199033747
```

### 1.9 Subir Stills (DIRECCIÓN - Cinematografía)

1. Sección "Stills (DIRECCIÓN)"
2. Drag & drop múltiples imágenes
3. Espera que suban a Cloudinary
4. ✅ URLs se agregan automáticamente

Recomendación: 5-12 imágenes por proyecto.

### 1.10 Subir BTS (PRODUCCIÓN - Behind the Scenes)

1. Sección "Behind the Scenes (PRODUCCIÓN)"
2. Drag & drop fotos del set
3. Espera que suban
4. ✅ URLs se agregan

Recomendación: 3-8 imágenes.

### 1.11 Configurar Home Layout (Opcional)

```
☑ Featured on home?     (¿mostrar en home?)
  Posición:             1-100 (orden en grid)
  Tamaño:               hero / large / wide / tall / medium / small

hero    → Imagen grande en la portada
large   → Bloque grande en grid
wide    → Bloque ancho
tall    → Bloque alto
medium  → Tamaño normal
small   → Pequeño
```

### 1.12 Agregar Premios/Reconocimientos (Opcional)

1. Sección "Recognitions"
2. Clickea "Add Recognition"
3. Pega URL de badge/logo del premio
4. Checkboxes:
   - ☑ Mostrar en home
   - ☑ Mostrar en /work

### 1.13 Enlace Externo (Opcional)

```
IMDb:       https://www.imdb.com/es-es/title/tt38190250/
Festival:   https://example.com/festival/project
Página web: https://proyecto-web.com
```

### 1.14 Guardar Cambios

1. Clickea botón "Save Project"
2. Proyecto se guarda en localStorage (cambios locales)

⚠️ **Aún no está en vivo**. Necesitas exportar.

### 1.15 Exportar JSON

1. Panel → Botón "Export JSON"
2. Se descarga: `content-FECHA.json`
3. **Guardar archivo** (lo usarás en paso 1.16)

### 1.16 Hacerlo Permanente (Git)

1. Abrir terminal en la carpeta `remarubi/`
2. Copiar el archivo descargado:
   ```bash
   cp ~/Downloads/content-2026-08-27.json \
      frontend/src/data/content.json
   ```

3. Verificar cambios:
   ```bash
   git status
   # Debe mostrar: frontend/src/data/content.json
   ```

4. Commitear:
   ```bash
   git add frontend/src/data/content.json
   git commit -m "Add: Mi Nuevo Proyecto (2026)"
   # Ej: "Add: ¿Qué Comen los Dragones? (2025)"
   ```

5. Push a GitHub:
   ```bash
   git push origin main
   ```

6. ✅ **Vercel auto-deploya** (esperar 2-3 min)

### 1.17 Verificar en Producción

1. Abrir: https://remarubi.com/work
2. Buscar tu nuevo proyecto en la lista
3. Clickea en la tarjeta
4. ✅ Verificar página detallada:
   - Título, año, director
   - Imagen de cover carga
   - Video Vimeo embebido
   - Stills cargan correctamente
   - BTS funciona con toggle
   - Premios muestran (si los agregaste)

---

## 📋 Método 2: Edición Manual de JSON

**Ventajas**:
- Rápido para cambios puntuales
- Control total

**Desventajas**:
- Requiere acceso al código
- Riesgo de errores sintácticos

### 2.1 Abrir archivo

```bash
cd frontend/src/data
nano content.json   # O abrir en tu editor favorito
```

### 2.2 Copiar plantilla

Busca `PROJECT_TEMPLATE.json` en la misma carpeta y copia la estructura de un proyecto.

### 2.3 Rellenar campos

```json
{
  "id": "p-mi-nuevo-proyecto",
  "slug": "mi-nuevo-proyecto",
  "category": "fiction",
  "title": "Mi Nuevo Proyecto",
  "year": 2026,
  "type": {
    "es": "Cortometraje",
    "en": "Short Film"
  },
  "director": "Juan Pérez",
  "production_company": "Saturno Films",
  "format": "ARRI Alexa · Cooke S4",
  "synopsis": {
    "es": "Sinopsis en español...",
    "en": "Synopsis in English..."
  },
  "cover": "https://res.cloudinary.com/.../cover.jpg",
  "preview_url": "https://vimeo.com/1199033747",
  "stills": [
    "https://res.cloudinary.com/.../still_01.jpg",
    "https://res.cloudinary.com/.../still_02.jpg"
  ],
  "bts": [
    "https://res.cloudinary.com/.../bts_01.jpg"
  ],
  "home_featured": true,
  "home_order": 1,
  "home_size": "large"
}
```

### 2.4 Validar JSON

Asegúrate que:
- ✅ Todas las comillas estén cerradas
- ✅ Todas las llaves estén balanceadas
- ✅ Las URLs sean válidas
- ✅ No haya comas sobrantes

### 2.5 Guardar y commitear

```bash
git add frontend/src/data/content.json
git commit -m "Add: Mi Nuevo Proyecto"
git push origin main
```

---

## 🚀 Método 3: Script Automático

**Para usuarios avanzados**.

### 3.1 Interactivo

```bash
cd frontend
npm run new-project
```

Te hace preguntas:
- Título
- Slug
- Categoría
- Año
- etc.

Crea el proyecto automáticamente.

### 3.2 Desde Clipboard

Si tienes JSON copiado:

```bash
cd frontend
npm run new-project:paste
# Pega el JSON y presiona Ctrl+D
```

---

## ✅ Checklist Pre-Publicación

Antes de hacer git push, verificar:

| Item | ✅ |
|------|-----|
| Título rellenado | |
| Slug único (sin duplicados) | |
| Categoría válida (fiction/doc/commercial/music-video) | |
| Año >= 2020 | |
| Director no vacío | |
| Cover image URL válida | |
| Vimeo URL pública y embebible | |
| Stills URLs válidas (2-12 imágenes) | |
| Sinopsis ES/EN no vacía | |
| Categoría en minúsculas | |
| Sin caracteres especiales en slug | |
| JSON sin errores sintácticos | |

---

## 🔍 Verificaciones Post-Deploy

Después de git push, esperar 2-3 min y verificar:

```
https://remarubi.com/work
  → Proyecto aparece en lista
  → Thumbnail carga correctamente

https://remarubi.com/project/mi-nuevo-proyecto
  → Cover image carga
  → Video Vimeo embebido
  → Stills gallery funciona
  → BTS toggle funciona
  → Metadatos correctos

https://remarubi.com/
  → Si featured=true, aparece en home grid
```

---

## 🆘 Troubleshooting

### "Admin panel no carga"

```
→ Verificar que estés logueado
→ Limpiar caché del navegador (Ctrl+Shift+Del)
→ Probar en incógnito
→ Verificar ADMIN_PASSWORD en .env
```

### "Upload de imagen lento"

```
→ Comprobar velocidad de internet
→ Reducir tamaño de imagen (<5MB)
→ Esperar a que suba completamente antes de continuar
```

### "Git push falla"

```bash
→ Verificar que estés en rama main
  git branch
  
→ Actualizar desde GitHub
  git pull origin main
  
→ Si hay conflictos, resolverlos manualmente
```

### "Proyecto no aparece en web después de deploy"

```
→ Esperar 2-3 min (tiempo de build)
→ Recargar página (Ctrl+F5)
→ Verificar en Vercel Deployments que sea "Ready"
→ Si sigue sin aparecer, revisar content.json tiene el proyecto
```

### "JSON tiene error sintáctico"

```
→ Abrir en https://jsonlint.com/
→ Copiar contenido de content.json
→ Pegar en el validador
→ Corregir errores que muestre
```

---

## 📝 Template Mínimo

Si quieres crear rápido, mínimo necesitas:

```json
{
  "id": "p-proyectos-slug-unico",
  "slug": "proyecto-slug",
  "category": "fiction",
  "title": "Título del Proyecto",
  "year": 2026,
  "type": { "es": "Cortometraje", "en": "Short Film" },
  "director": "Nombre Director",
  "format": "ARRI Alexa",
  "synopsis": { "es": "Sinopsis...", "en": "Synopsis..." },
  "cover": "https://res.cloudinary.com/.../cover.jpg",
  "preview_url": "https://vimeo.com/123456789",
  "stills": ["https://res.cloudinary.com/.../still.jpg"],
  "bts": []
}
```

---

## 🎁 Acciones Post-Proyecto

Una vez creado, puedes:

1. **Modificar**: Abrir en /admin, cambiar, exportar, git push
2. **Duplicar**: Copiar proyecto, cambiar slug, rellenar nuevos datos
3. **Eliminar**: Borrar entrada de content.json, git push
4. **Reordenar**: Cambiar `home_order`, git push
5. **Destacar**: `home_featured: true`, `home_size: "hero"`

---

**Referencia rápida**: 
- Admin Panel: https://remarubi.com/admin
- Validador JSON: https://jsonlint.com/
- Estructura Proyecto: `/frontend/src/data/PROJECT_TEMPLATE.json`

---

**Último update**: 2026-08-27
