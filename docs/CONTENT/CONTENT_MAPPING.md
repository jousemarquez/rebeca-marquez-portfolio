# 📊 Integración de 30 Proyectos desde PDF

Guía para mapear los 30 proyectos del `listing-proyectos.pdf` a la estructura `content.json` y MongoDB.

---

## 📋 Paso 1: Extraer Metadata del PDF

El archivo `/MEDIA/listing-proyectos.pdf` contiene 30 proyectos audiovisuales divididos en:

### DIRECCIÓN (15 proyectos)
- **Ayudante de Dirección**: 10 proyectos
- **Dirección**: 4 proyectos
- **Script Supervisor**: 1 proyecto

### PRODUCCIÓN (15 proyectos)
- **Auxiliar de Producción**: 5 proyectos
- **Jefa de Producción**: 2 proyectos
- **Directora de Producción**: 5 proyectos
- **Coordinadora de Transporte**: 3 proyectos

---

## 🗂️ Estructura de Datos

### Campo por Campo

| Campo JSON | Fuente PDF | Tipo | Obligatorio | Ejemplo |
|-----------|-----------|------|-----------|---------|
| `id` | Auto-generar | String | ✅ | `p-amapolas-ladrillo-asfalto` |
| `slug` | De título | String | ✅ | `amapolas-ladrillo-asfalto` |
| `category` | Tipo proyecto | String | ✅ | `fiction` \| `documentary` |
| `title` | Nombre proyecto | String | ✅ | `Amapolas entre Ladrillo y Asfalto` |
| `year` | Año producción | Number | ✅ | 2025 |
| `type.es` | Tipo documento | String | ✅ | `Cortometraje` \| `Videoclip` |
| `type.en` | Traducción tipo | String | ✅ | `Short Film` \| `Music Video` |
| `director` | Director/Directora | String | ✅ | `María García López` |
| `production_company` | Productora | String | ✅ | `Saturno Films` |
| `format` | Especificaciones técnicas | String | ⚠️ Opcional | `ARRI Alexa · Cooke S4` |
| `synopsis.es` | Descripción/argumento | String | ✅ | `Una historia sobre...` |
| `synopsis.en` | Traducción sinopsis | String | ✅ | `A story about...` |
| `cover` | Cloudinary URL | String | ✅ | `https://res.cloudinary.com/.../cover.jpg` |
| `stills[]` | DIRECCIÓN (Cloudinary) | Array | ⚠️ 2+ recomendado | `[url1, url2, ...]` |
| `bts[]` | PRODUCCIÓN (Cloudinary) | Array | ⚠️ 1+ recomendado | `[url1, url2, ...]` |
| `preview_url` | Vimeo/YouTube | String | ⚠️ Recomendado | `https://vimeo.com/123456789` |
| `recognitions[]` | Premios/festivales | Array | ⚠️ Opcional | `[{url, showOnHome, showOnWork}]` |
| `home_featured` | Tu decisión | Boolean | ⚠️ | `true` \| `false` |
| `home_order` | Tu decisión | Number | ⚠️ | 1-12 |
| `home_size` | Tu decisión | String | ⚠️ | `hero` \| `large` \| `medium` |
| `external_link` | Links externos | String | ⚠️ Opcional | `https://imdb.com/...` |

---

## 📑 Lista de 30 Proyectos a Integrar

### DIRECCIÓN (15)

#### Ayudante de Dirección (10)

| # | Título | Año | Categoría | Estado |
|---|--------|-----|----------|--------|
| 1 | Amapolas entre Ladrillo y Asfalto | 2025 | fiction | ⏳ |
| 2 | Dante | 2024 | music-video | ⏳ |
| 3 | Modest | 2024 | music-video | ⏳ |
| 4 | El Rey de Enoc | 2024 | fiction | ⏳ |
| 5 | Malleus Maleficarum | 2023 | music-video | ⏳ |
| 6 | Presa | 2023 | fiction | ⏳ |
| 7 | A la Vejez Viruela | 2024 | fiction | ⏳ |
| 8 | Magia Blancaonegra Negraoblanca | 2024 | music-video | ⏳ |
| 9 | La Fiesta de los Locos | 2023 | fiction | ⏳ |
| 10 | La Noche de las Bestias | 2023 | fiction | ⏳ |

#### Dirección (4)

| # | Título | Año | Categoría | Estado |
|---|--------|-----|----------|--------|
| 11 | Así Son | 2026 | fiction | ⏳ |
| 12 | Do You Wanna Vogue | 2024 | music-video | ⏳ |
| 13 | Simbiosis | 2024 | fiction | ⏳ |
| 14 | Si Me Escuchas | 2025 | fiction | ⏳ |

#### Script Supervisor (1)

| # | Título | Año | Categoría | Estado |
|---|--------|-----|----------|--------|
| 15 | Estrellas / L'Últim Desig | 2023 | fiction | ⏳ |

---

### PRODUCCIÓN (15)

#### Auxiliar de Producción (5)

| # | Título | Año | Categoría | Estado |
|---|--------|-----|----------|--------|
| 16 | El Nazareno | 2022 | fiction | ⏳ |
| 17 | Gloria Fuertes | 2024 | documentary | ⏳ |
| 18 | La Niña Tatuada | 2024 | fiction | ⏳ |
| 19 | Macarena | 2025 | fiction | ⏳ |
| 20 | Sabbat Andaluz | 2023 | fiction | ⏳ |

#### Jefa de Producción (2)

| # | Título | Año | Categoría | Estado |
|---|--------|-----|----------|--------|
| 21 | Entre la Playa y el Cielo | 2025 | fiction | ⏳ |
| 22 | Inkslinger | 2024 | commercial | ⏳ |

#### Directora de Producción (5)

| # | Título | Año | Categoría | Estado |
|---|--------|-----|----------|--------|
| 23 | Exiliado en Tijuana | 2024 | music-video | ⏳ |
| 24 | Glory Hole | 2025 | fiction | ⏳ |
| 25 | Graveyard of Consciousness | 2024 | music-video | ⏳ |
| 26 | Martirio | 2024 | music-video | ⏳ |
| 27 | Volvemos en 15 minutos | 2026 | commercial | ⏳ |

#### Coordinadora de Transporte (3)

| # | Título | Año | Categoría | Estado |
|---|--------|-----|----------|--------|
| 28 | O'Romeo (Pt. 1) | 2026 | fiction | ⏳ |
| 29 | Allí Donde Nada | 2027 | fiction | ⏳ |
| 30 | [Proyecto pendiente] | TBD | TBD | ⏳ |

---

## 🚀 Flujo de Importación

### Fase 1: Preparación (2-3 horas)

1. **Extraer metadata del PDF**
   - Abrir `/MEDIA/listing-proyectos.pdf`
   - Por cada proyecto, copiar:
     - Título exacto
     - Año de realización
     - Rol (DIRECCIÓN/PRODUCCIÓN)
     - Director/Directora
     - Productora
     - Cualquier meta información

2. **Crear spreadsheet**
   - Google Sheets o Excel
   - Columnas: ID, Slug, Title, Year, Category, Director, Production Co.
   - Llenar los 30 proyectos

### Fase 2: Organizar Imágenes (2-3 horas)

1. **En Cloudinary**
   - Crear carpeta: `ddp-portfolio/[proyecto-slug]/`
   - Subcarpetas: `stills/` (DIRECCIÓN), `bts/` (PRODUCCIÓN)
   - Subir imágenes desde `/MEDIA/DIRECCIÓN/` y `/MEDIA/PRODUCCIÓN/`

2. **Obtener URLs**
   - Por cada imagen, copiar URL Cloudinary completa
   - Organizarlas en el mismo spreadsheet

### Fase 3: Crear JSON (2-3 horas)

**Opción A**: Vía Admin Panel
1. Abrir https://remarubi.com/admin
2. Login
3. "New Project" × 30
4. Rellenar campos del spreadsheet
5. Upload imágenes
6. Export JSON

**Opción B**: JSON Manual
1. Copiar `PROJECT_TEMPLATE.json`
2. Rellenar para cada proyecto
3. Validar sintaxis JSON
4. Agregar al array `projects[]` de `content.json`

**Opción C**: Script (Avanzado)
```bash
npm run import:projects spreadsheet.csv
```

### Fase 4: Validación (1 hora)

1. Verificar JSON válido: https://jsonlint.com/
2. Comprobar:
   - Todos los slugs únicos
   - Categorías válidas
   - URLs Cloudinary funcionan
   - Sinopsis bilingüe presente

### Fase 5: Deploy (5 min)

```bash
git add frontend/src/data/content.json
git commit -m "Import: 30 proyectos audiovisuales"
git push origin main
# Vercel auto-deploya
```

### Fase 6: Verificación (10 min)

1. Esperar deploy en Vercel (2-3 min)
2. Abrir https://remarubi.com/work
3. Verificar que aparecen todos los 30 proyectos
4. Clickear algunos para verificar detalles
5. Comprobar imágenes cargan correctamente

---

## 📋 Checklist de Importación

- [ ] PDF descargado y revisado
- [ ] 30 proyectos identificados
- [ ] Spreadsheet con metadata completo
- [ ] Imágenes uploadadas a Cloudinary
- [ ] URLs Cloudinary organizadas
- [ ] JSON creado (admin panel o manual)
- [ ] JSON validado en jsonlint.com
- [ ] Todos los slugs únicos
- [ ] Todas las URLs funcionales
- [ ] Content.json actualizado
- [ ] Git push completado
- [ ] Deploy exitoso en Vercel
- [ ] Todos los 30 proyectos visibles en /work
- [ ] Home page muestra proyectos destacados
- [ ] Páginas detalladas funcionan

---

## 🔗 Archivos de Referencia

- Template: `frontend/src/data/PROJECT_TEMPLATE.json`
- Actual: `frontend/src/data/content.json`
- PDF: `MEDIA/listing-proyectos.pdf`
- Imágenes DIRECCIÓN: `MEDIA/DIRECCIÓN/`
- Imágenes PRODUCCIÓN: `MEDIA/PRODUCCIÓN/`

---

## ⏱️ Tiempo Estimado Total

- Extracción de datos: 2-3 horas
- Organización de imágenes: 2-3 horas
- Creación de JSON: 2-3 horas
- Validación: 1 hora
- Deploy y verificación: 0.5 horas

**Total: 8-11 horas de trabajo**

**Recomendación**: Hacerlo en 2-3 sesiones de 3-4 horas cada una.

---

**Próximo paso**: Una vez completado, leer [HOW_TO_MANAGE_IMAGES.md](./HOW_TO_MANAGE_IMAGES.md) para organizar imágenes en Cloudinary.

---

**Actualizado**: 2026-08-27
