# 💾 Esquema MongoDB — Estructura de Datos

Definición completa de la estructura de datos en MongoDB para Remarubi.

---

## 🗂️ Base de Datos

```
Nome de Base de Datos: remarubi_production
```

---

## 📋 Colecciones

### 1. Colección: `content`

**Propósito**: Contiene todo el contenido del sitio (metadata + proyectos)

**Cantidad de Documentos**: 1 único documento

**Índices Recomendados**:
```javascript
db.content.createIndex({ "projects.slug": 1 })
db.content.createIndex({ "projects.category": 1 })
db.content.createIndex({ "site.name": 1 })
```

---

## 📄 Estructura Completa: `content`

```javascript
{
  _id: ObjectId("..."),
  
  // ========================================
  // SITE METADATA
  // ========================================
  site: {
    name: "Rebeca Márquez Rubio",              // String: nombre de la productora
    
    title: {
      es: "Dirección y Producción",            // String: título en español
      en: "Audiovisual Producer"               // String: título en inglés
    },
    
    tagline: {
      es: "La producción es el arte...",       // String: tagline español
      en: "Production is the art..."           // String: tagline inglés
    },
    
    showreel_url: "https://vimeo.com/...",    // String: URL del showreel
    showreel_placement: "nav",                 // String: "nav" o "hero"
    
    home_max: 12,                              // Number: máx proyectos en home
    
    about_image: "https://res.cloudinary.com/...",  // String: imagen About
    about_photo_caption: "En la industria...",      // String: caption foto
    
    meta_description: {
      es: "Rebeca Márquez Rubio, Productora...",    // String: SEO
      en: "Rebeca Márquez Rubio, Producer..."       // String: SEO English
    },
    
    logo_white: "https://res.cloudinary.com/...",   // String: logo en blanco
    
    social: {
      phone: "+34665710596",                   // String: teléfono
      email: "rebeca@remarubi.com",            // String: email
      instagram: "https://instagram.com/...",  // String: URL Instagram
      vimeo: "https://vimeo.com/...",         // String: URL Vimeo
      linkedin: "https://linkedin.com/...",    // String: URL LinkedIn
      imdb: "https://imdb.com/..."            // String: URL IMDb
    }
  },
  
  // ========================================
  // ABOUT SECTION
  // ========================================
  about: {
    es: "Dirección y Producción con amplia...",    // String: biografía español
    en: "Audiovisual Producer with extensive..."   // String: biografía English
  },
  
  // ========================================
  // PROJECTS ARRAY
  // ========================================
  projects: [
    {
      // Identidad
      id: "p-proyecto-unico",                      // String: ID único
      slug: "proyecto-unico",                      // String: URL-safe, único
      
      // Clasificación
      category: "fiction",                         // Enum: fiction|documentary|commercial|music-video
      title: "Título del Proyecto",                // String: título principal
      year: 2026,                                  // Number: año de producción
      
      // Tipo de Contenido
      type: {
        es: "Cortometraje",                        // Enum: Cortometraje|Largometraje|Videoclip|Documental|Comercial
        en: "Short Film"                           // Enum: Short Film|Feature|Music Video|Documentary|Commercial
      },
      
      // Equipo Creativo
      director: "María García López",              // String: director/a
      production_company: "Saturno Films",         // String: productora
      format: "ARRI Alexa · Cooke S4",            // String: especificaciones técnicas (opcional)
      
      // Sinopsis
      synopsis: {
        es: "Una historia sobre...",               // String: sinopsis español (2-3 párrafos)
        en: "A story about..."                     // String: sinopsis inglés
      },
      
      // MEDIA PRINCIPAL
      cover: "https://res.cloudinary.com/.../cover.jpg",    // String: imagen principal
      poster: "https://res.cloudinary.com/.../poster.jpg",  // String: cartel (opcional)
      preview_url: "https://vimeo.com/123456789",           // String: URL de video
      
      // GALERÍAS
      stills: [                                    // Array[String]: DIRECCIÓN - stills cinematográficos
        "https://res.cloudinary.com/.../still_01.jpg",
        "https://res.cloudinary.com/.../still_02.jpg"
      ],
      
      bts: [                                       // Array[String]: PRODUCCIÓN - behind-the-scenes
        "https://res.cloudinary.com/.../bts_01.jpg",
        "https://res.cloudinary.com/.../bts_02.jpg"
      ],
      
      // RECONOCIMIENTOS
      recognitions: [                              // Array[Object]: premios/festivales
        {
          url: "https://res.cloudinary.com/.../award.png",  // String: imagen del premio
          showOnHome: true,                                  // Boolean: mostrar en home
          showOnWork: true                                   // Boolean: mostrar en /work
        }
      ],
      
      // HOME LAYOUT
      home_featured: true,                         // Boolean: destacado en home
      home_order: 1,                               // Number: orden en home (1-100)
      home_size: "large",                          // Enum: hero|large|wide|tall|medium|small
      home_still: "",                              // String: still alternativo para home (opcional)
      
      // CROP COORDINATES
      preview_crop: {                              // Object: recorte para preview (16:9)
        x: 0,                                      // Number: 0-1
        y: 0,                                      // Number: 0-1
        w: 1,                                      // Number: 0-1
        h: 1                                       // Number: 0-1
      },
      
      work_crop: {                                 // Object: recorte para work (legacy)
        x: 0,
        y: 0,
        w: 1,
        h: 1
      },
      
      // ENLACES EXTERNOS
      external_link: "https://imdb.com/...",      // String: enlace IMDb u otro (opcional)
      
      // PUBLICACIÓN
      published: true                              // Boolean: visible en web pública
    }
    // ... más proyectos en el array
  ],
  
  // TIMESTAMPS
  createdAt: ISODate("2026-08-27T10:00:00Z"),    // Date: creación documento
  updatedAt: ISODate("2026-08-27T15:30:00Z")     // Date: última actualización
}
```

---

## 📊 Tipos de Datos

| Campo | Tipo | Rango | Ejemplo |
|-------|------|-------|---------|
| `_id` | ObjectId | - | ObjectId("507f1f77bcf86cd799439011") |
| `site.name` | String | 1-100 | "Rebeca Márquez Rubio" |
| `year` | Number | 1900-2100 | 2026 |
| `category` | String | Enum | "fiction" |
| `home_order` | Number | 1-100 | 5 |
| `home_featured` | Boolean | true/false | true |
| `stills` | Array[String] | 0-50 URLs | ["url1", "url2"] |
| `createdAt` | Date | ISO 8601 | ISODate("2026-08-27T...") |

---

## 🔑 Índices Recomendados

Para optimizar queries:

```javascript
// Índice compuesto: buscar proyectos por categoría y año
db.content.createIndex({ 
  "projects.category": 1, 
  "projects.year": -1 
})

// Índice para búsqueda de slug (único)
db.content.createIndex({ 
  "projects.slug": 1 
}, { 
  unique: true 
})

// Índice para listar proyectos publicados
db.content.createIndex({ 
  "projects.published": 1, 
  "projects.home_order": 1 
})
```

---

## ✅ Validación de Esquema

MongoDB puede aplicar validación JSON Schema:

```javascript
db.createCollection("content", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["site", "about", "projects"],
      properties: {
        site: {
          bsonType: "object",
          required: ["name", "title", "social"],
          properties: {
            name: { bsonType: "string" },
            title: {
              bsonType: "object",
              properties: {
                es: { bsonType: "string" },
                en: { bsonType: "string" }
              }
            },
            social: {
              bsonType: "object",
              required: ["email"],
              properties: {
                email: { bsonType: "string" }
              }
            }
          }
        },
        projects: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["id", "slug", "title", "year", "category"],
            properties: {
              id: { bsonType: "string" },
              slug: { bsonType: "string" },
              title: { bsonType: "string" },
              year: { bsonType: "int" },
              category: { 
                enum: ["fiction", "documentary", "commercial", "music-video"] 
              },
              published: { bsonType: "bool" },
              stills: {
                bsonType: "array",
                items: { bsonType: "string" }
              }
            }
          }
        }
      }
    }
  }
})
```

---

## 📈 Tamaño Esperado

| Elemento | Tamaño |
|----------|--------|
| Documento site metadata | ~5KB |
| 1 proyecto completo | ~10-15KB |
| 30 proyectos | ~300-450KB |
| Índices | ~50KB |
| **Total documento `content`** | ~400-500KB |

---

## 🔄 Migración desde JSON

El documento JSON (`content.json`) se mapea 1:1 al documento MongoDB:

```javascript
// JSON
{
  "site": { ... },
  "about": { ... },
  "projects": [ ... ]
}

// MongoDB
db.content.insertOne({
  site: { ... },
  about: { ... },
  projects: [ ... ],
  createdAt: new Date(),
  updatedAt: new Date()
})
```

---

## 🛠️ Operaciones Comunes

### Obtener todos los proyectos

```javascript
db.content.findOne({})
// Retorna documento completo con todos los proyectos
```

### Buscar proyecto por slug

```javascript
db.content.aggregate([
  { $unwind: "$projects" },
  { $match: { "projects.slug": "proyecto-unico" } },
  { $project: { "projects": 1 } }
])
```

### Listar proyectos por categoría

```javascript
db.content.aggregate([
  { $unwind: "$projects" },
  { $match: { "projects.category": "fiction" } },
  { $sort: { "projects.year": -1 } }
])
```

### Actualizar proyecto

```javascript
db.content.updateOne(
  { "projects.slug": "proyecto-unico" },
  { 
    $set: { 
      "projects.$.title": "Nuevo Título",
      "updatedAt": new Date()
    }
  }
)
```

---

## 🔒 Seguridad

**MongoDB Atlas Security**:
- IP Whitelist: 0.0.0.0/0 (desarrollo) → IPs específicas (producción)
- Username/Password: almacenado en variables de entorno
- Encryption in Transit: TLS/SSL automático
- Encryption at Rest: disponible en planes pagados

---

## 📞 Referencias

- MongoDB Docs: https://docs.mongodb.com/manual/
- JSON Schema Validation: https://docs.mongodb.com/manual/core/schema-validation/
- Aggregation Framework: https://docs.mongodb.com/manual/aggregation/

---

**Actualizado**: 2026-08-27
