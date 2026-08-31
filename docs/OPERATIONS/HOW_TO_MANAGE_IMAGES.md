# 🖼️ Cómo Gestionar Imágenes

Guía completa: upload, organización, DIRECCIÓN vs PRODUCCIÓN, optimización.

---

## 📸 Entender: DIRECCIÓN vs PRODUCCIÓN

### DIRECCIÓN (Stills Cinematográficos)

**Qué son**:
- Fotogramas de la película con máxima calidad visual
- Muestran composición, luz, encuadre
- **Trabajo del equipo creativo** en cinematografía

**Ejemplos**:
- Close-up de actor iluminado perfectamente
- Plano general con composición balanceada
- Detalle de propuesta visual

**En la web**:
- Miniatura principal (cover) en `/work`
- Grid de stills en página de proyecto
- Home grid si `featured=true`

**En content.json**:
```json
{
  "cover": "https://res.cloudinary.com/.../cover-especial.jpg",
  "stills": [
    "https://res.cloudinary.com/.../still_01.jpg",
    "https://res.cloudinary.com/.../still_02.jpg"
  ]
}
```

---

### PRODUCCIÓN (Behind-the-Scenes)

**Qué son**:
- Fotos del set durante rodaje
- Proceso creativo
- Equipo trabajando
- **Contexto** del proyecto

**Ejemplos**:
- Equipo en el set
- Cámara montada
- Proceso de iluminación
- Descanso entre tomas

**En la web**:
- Sección separada "Behind the Scenes"
- Toggle para ver/ocultar en página de proyecto
- Galería adicional

**En content.json**:
```json
{
  "bts": [
    "https://res.cloudinary.com/.../bts_01.jpg",
    "https://res.cloudinary.com/.../bts_02.jpg"
  ]
}
```

---

## 🚀 Método 1: Via Admin Panel (Recomendado)

**Ventajas**:
- ✅ Interfaz visual
- ✅ Upload automático a Cloudinary
- ✅ URLs se copian automáticamente
- ✅ No tocar código

### 1.1 Abrir Admin Panel

```
https://remarubi.com/admin
```

### 1.2 Crear o Editar Proyecto

1. Si es nuevo: "New Project"
2. Si es existente: Buscar en la lista, clickea "Edit"

### 1.3 Upload Cover Image

**Sección**: "Cover Image"

**Pasos**:
1. Drag & drop de imagen, O clickea "Browse"
2. Selecciona JPG/PNG (<5MB, recomendado 2400px mínimo)
3. Espera a que suba a Cloudinary (2-5 segundos)
4. ✅ URL se copia automáticamente en formulario

**Recomendaciones**:
- Usar **mejor** fotograma de la película
- Aspecto 16:9 (wide)
- Persona principal visible
- Luz/color impactante

---

### 1.4 Upload Stills (DIRECCIÓN)

**Sección**: "Stills (DIRECCIÓN)"

**Pasos**:
1. Drag & drop **múltiples imágenes** (0-20)
2. O clickea "Add Still" para una por una
3. Espera uploads
4. ✅ URLs se agregan a lista

**Recomendaciones**:
- 5-12 stills por proyecto (ideal)
- Ordenar visualmente: de más a menos impactante
- Mezclar planos: general, medio, close-up
- Mostrar composición visual

**¿Cómo ordenar**:
1. En sección "Stills", verás lista de URLs
2. Drag & drop para reordenar
3. O clickea ▲▼ para mover

---

### 1.5 Upload BTS (PRODUCCIÓN)

**Sección**: "Behind the Scenes (PRODUCCIÓN)"

**Pasos**:
1. Drag & drop fotos del set
2. Espera uploads
3. ✅ URLs se agregan

**Recomendaciones**:
- 3-8 fotos BTS (menos que stills)
- Mostrar proceso creativo
- Incluir equipo, iluminación, cámara
- Narrar visualmente el "making of"

---

### 1.6 Guardar y Exportar

1. Clickea "Save Project"
2. Cambios se guardan en localStorage
3. Clickea "Export JSON"
4. Se descarga `content-FECHA.json`

---

### 1.7 Hacer Permanente

```bash
cp ~/Downloads/content-FECHA.json frontend/src/data/content.json
git add frontend/src/data/content.json
git commit -m "Update: [proyecto] - agregar imágenes"
git push origin main
```

---

## 📤 Método 2: Upload Manual a Cloudinary

**Útil si**:
- Quieres organizar antes de incorporar
- Cloudinary está lento en admin panel
- Tienes muchas imágenes a la vez

### 2.1 Ir a Cloudinary

```
https://cloudinary.com/console/
```

### 2.2 Upload Manual

1. "Upload" botón (arriba a la derecha)
2. Selecciona carpeta: `ddp-portfolio/[proyecto-slug]/stills/`
   (o `/bts/` si son behind-the-scenes)
3. Drag & drop imágenes
4. Cloudinary procesa (2-5 seg por imagen)

### 2.3 Obtener URLs

Para cada imagen:
1. Hover sobre imagen
2. Clickea icono de link
3. Copia URL completa
   ```
   https://res.cloudinary.com/dsphxo7mx/image/upload/v1780760507/FRAME_5_nmj2z4.png
   ```

### 2.4 Pegar en content.json

Abrir `frontend/src/data/content.json`:

```json
{
  "slug": "mi-proyecto",
  "stills": [
    "https://res.cloudinary.com/.../still_01.png",
    "https://res.cloudinary.com/.../still_02.png"
  ]
}
```

---

## 🖼️ Optimización de Imágenes

### Tamaños Recomendados

| Uso | Ancho | Alto | Ratio | Tamaño |
|-----|-------|------|-------|--------|
| Cover (home) | 2400 | 1350 | 16:9 | <1MB |
| Cover (work) | 1600 | 900 | 16:9 | <800KB |
| Still detalle | 2400 | 1600 | 3:2 | <1MB |
| BTS | 1920 | 1280 | 3:2 | <800KB |
| Thumbnail | 400 | 225 | 16:9 | <200KB |

### Formato Recomendado

| Tipo | Mejor Formato |
|------|--------------|
| Fotografía | JPG (85-90% quality) |
| Con transparencia | PNG |
| Muchas imágenes (velocidad) | WebP (auto-convertido por Cloudinary) |

### Herramientas de Compresión

Antes de subir:

**Online**:
- https://tinypng.com (JPG/PNG)
- https://imageresizer.com (redimensionar)

**Terminal** (si tienes ImageMagick):
```bash
# Reducir tamaño a 2400px ancho
convert imagen.jpg -resize 2400x -quality 85 imagen-optimizada.jpg

# Comprimir
imagemin imagen.jpg --out-dir=output
```

---

## 📁 Organización en Cloudinary

**Estructura recomendada**:

```
ddp-portfolio/
├── heroes/                              # Covers principales
│   ├── que-comen-los-dragones-cover.jpg
│   └── la-espantada-cover.jpg
│
├── que-comen-los-dragones/              # Por proyecto
│   ├── stills/
│   │   ├── frame_01.jpg
│   │   ├── frame_02.jpg
│   │   └── frame_03.jpg
│   └── bts/
│       ├── set_01.jpg
│       └── set_02.jpg
│
├── la-espantada/
│   ├── stills/
│   └── bts/
│
└── recognitions/                        # Premios/badges
    ├── premio-fugaz.png
    └── festival-san-sebastian.png
```

**Beneficio**:
- Fácil de encontrar
- Escalable
- Fácil de auditar
- Fácil de actualizar por lotes

---

## ❌ Problemas Comunes

### Imagen No Carga en Web

```
Causa: URL de Cloudinary incorrecta

Solución:
  1. Copiar URL completa desde Cloudinary
  2. Probar URL en navegador
  3. Si no funciona, regenerar link en Cloudinary
  4. Verificar typos en content.json
```

### Upload Muy Lento

```
Causa: Archivo grande, internet lento

Solución:
  1. Reducir tamaño (<2400px ancho)
  2. Comprimir con TinyPNG
  3. Esperar a mejor conexión
  4. Usar Cloudinary dashboard (mejor uploader)
```

### Aspecto Ratio Mal (Imagen Cortada)

```
Causa: CroppedImage.jsx reajusta según crop

Solución:
  1. Subir imagen con ratio correcto
  2. O editar crop en admin panel (herramienta crop)
  3. Verificar home_still campo en content.json
```

### Archivo Demasiado Grande para Upload

```
Causa: Archivo > 5MB

Solución:
  1. Reducir con TinyPNG
  2. O redimensionar a 2400px
  3. Usar JPG en lugar de PNG
  4. Comprimir 85% quality en JPG
```

---

## 📊 Checklist de Imágenes

Antes de publicar proyecto:

| Item | ✅ |
|------|-----|
| Cover image optimizado (2400px, <1MB) | |
| Cover es fotograma impactante | |
| Stills 5-12 imágenes | |
| Stills URLs válidas (todas cargan) | |
| Stills ordenadas visualmente | |
| BTS 3-8 imágenes | |
| BTS URLs válidas | |
| Sin imágenes borrosas o mal compuestas | |
| Relación 16:9 o 3:2 consistente | |
| Nombres en Cloudinary organized | |
| JSON sin typos en URLs | |

---

## 🔄 Gestión Avanzada

### Actualizar Imagen (Reemplazar)

Si necesitas cambiar una imagen:

**Opción A** (Rápido):
1. Admin panel → Proyecto
2. Clickea ▲ en imagen que quieres cambiar
3. Upload nueva
4. Se reemplaza
5. Export JSON, git push

**Opción B** (Manual):
1. Cloudinary → Busca imagen antigua
2. Elimina
3. Upload nueva
4. Copia URL nueva
5. Edita content.json
6. Git push

### Batch Upload de Muchas Imágenes

Si tienes 50+ imágenes:

```bash
# Con Cloudinary CLI (avanzado)
npm install -g cloudinary-cli

cloudinary upload \
  --folder ddp-portfolio/proyecto-slug/stills/ \
  *.jpg *.png
```

O usar Cloudinary Web UI (más lento pero seguro).

### Análisis de Uso

En Cloudinary Dashboard:
1. "Media Library" → Tu carpeta
2. Puedes ver:
   - Cuántas imágenes usas
   - Bandwidth consumido
   - Transformaciones aplicadas
3. Eliminar imágenes no usadas para ahorrar espacio

---

## 🎨 Consejos Visuales

### Qué Hace Buena Cover

✅ **Sí**:
- Rostro visible (si hay personas)
- Luz clara y direccional
- Color impactante
- Composición balanceada
- Contraste suficiente

❌ **No**:
- Imagen oscura/borrosa
- Rostro cortado o de espaldas
- Colores opacos/apagados
- Demasiadochaos visual
- Texto o sobreposiciones

### Qué Hace Buen Still

✅ **Sí**:
- Muestra tu trabajo visual (luz, composición)
- Momento narrativo importante
- Distinta a otros stills
- Bien encuadrada

❌ **No**:
- Fotograma de trailer/tienda
- Fotograma con subtítulos/créditos
- 5 stills iguales
- Mal focus o exposed

### Qué Hace Buen BTS

✅ **Sí**:
- Cuenta historia del making
- Equipo visible
- Proceso creativo
- Energía/atmósfera

❌ **No**:
- Solo primeros planos sin contexto
- Equipo con caras raras
- Sin relación entre imágenes

---

## 🔗 Referencias

- **Cloudinary Dashboard**: https://cloudinary.com/console/
- **Herramienta Compresión**: https://tinypng.com
- **Validador JSON**: https://jsonlint.com/
- **Admin Panel**: https://remarubi.com/admin

---

**Último update**: 2026-08-27
