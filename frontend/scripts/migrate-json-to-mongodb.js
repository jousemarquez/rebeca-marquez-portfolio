#!/usr/bin/env node

/**
 * Script de Migración: content.json → MongoDB
 *
 * Uso:
 *   npm run migrate:json-to-mongo
 *
 * Requiere:
 *   - .env.local con MONGO_URL configurada
 *   - src/data/content.json presente
 *
 * Resultado:
 *   - Crea/Actualiza colección 'content' en MongoDB
 *   - Inserta documento con todos los proyectos
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME || 'remarubi_production';
const COLLECTION_NAME = 'content';

async function migrate() {
  // Validaciones
  if (!MONGO_URL) {
    console.error('❌ Error: MONGO_URL no configurada');
    console.error('   Asegúrate de que .env.local existe y tiene MONGO_URL');
    process.exit(1);
  }

  // Dinámico import para MongoDB
  let MongoClient;
  try {
    ({ MongoClient } = require('mongodb'));
  } catch (err) {
    console.error('❌ Error: mongodb no está instalado');
    console.error('   Ejecuta: npm install mongodb');
    process.exit(1);
  }

  const client = new MongoClient(MONGO_URL);

  try {
    console.log('🔗 Conectando a MongoDB...');
    console.log(`   URL: ${MONGO_URL.substring(0, 50)}...`);
    await client.connect();
    console.log('✅ Conectado a MongoDB\n');

    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Leer content.json
    const contentPath = path.join(__dirname, '../src/data/content.json');
    console.log('📖 Leyendo content.json...');

    if (!fs.existsSync(contentPath)) {
      console.error(`❌ Error: No se encuentra ${contentPath}`);
      process.exit(1);
    }

    const contentJson = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
    console.log(`✅ Archivo leído (${contentJson.projects?.length || 0} proyectos)\n`);

    // Agregar timestamps
    contentJson.createdAt = new Date();
    contentJson.updatedAt = new Date();

    // Verificar si documento existe
    console.log('🔍 Verificando si documento existe...');
    const existing = await collection.findOne({});

    let result;
    if (existing) {
      console.log('📝 Documento existente encontrado');
      console.log('   Actualizando con nuevos datos...\n');

      result = await collection.updateOne(
        { _id: existing._id },
        {
          $set: {
            site: contentJson.site,
            about: contentJson.about,
            projects: contentJson.projects,
            updatedAt: new Date()
          }
        }
      );

      console.log(`✅ Documento actualizado`);
      console.log(`   Documentos modificados: ${result.modifiedCount}`);
    } else {
      console.log('✨ No existe documento previo');
      console.log('   Creando nuevo documento...\n');

      result = await collection.insertOne(contentJson);

      console.log(`✅ Documento creado`);
      console.log(`   ID: ${result.insertedId}`);
    }

    // Verificación final
    console.log('\n🔎 Verificando integridad de datos...');
    const doc = await collection.findOne({});
    const projectCount = doc?.projects?.length || 0;
    const siteName = doc?.site?.name;

    console.log(`
    ╔════════════════════════════════════════╗
    ║    ✅ MIGRACIÓN COMPLETADA CON ÉXITO   ║
    ╚════════════════════════════════════════╝

    📊 Información de la Migración:
    ───────────────────────────────
    Base de datos: ${DB_NAME}
    Colección: ${COLLECTION_NAME}
    Sitio: ${siteName}
    Proyectos: ${projectCount}
    Último actualizado: ${new Date().toLocaleString()}

    🔗 Próximos pasos:
    ───────────────────────────────
    1. npm start (para probar localmente)
    2. Verificar que /admin funciona
    3. Verificar que /work muestra proyectos

    🚀 Deploy a Vercel:
    ───────────────────────────────
    1. Asegúrate que MONGO_URL está en Vercel Settings
    2. Vercel → Settings → Environment Variables
    3. Redeploy
    4. Verificar en https://remarubi.com

    💾 MongoDB Compass (opcional):
    ───────────────────────────────
    Connection: ${MONGO_URL.substring(0, 80)}...
    Database: ${DB_NAME}
    Collection: ${COLLECTION_NAME}
    `);

  } catch (error) {
    console.error('\n❌ ERROR EN MIGRACIÓN\n');
    console.error('Tipo:', error.name);
    console.error('Mensaje:', error.message);

    if (error.message.includes('authentication failed')) {
      console.error('\n💡 Sugerencia: Verifica que usuario/password son correctos');
      console.error('   En MongoDB Atlas → Database Access');
    }

    if (error.message.includes('ECONNREFUSED')) {
      console.error('\n💡 Sugerencia: MongoDB no está accesible');
      console.error('   Verifica que IP whitelist incluye tu IP');
      console.error('   En MongoDB Atlas → Security → Network Access');
    }

    process.exit(1);
  } finally {
    await client.close();
    console.log('\n🔌 Desconexión de MongoDB completada');
  }
}

// Ejecutar migración
migrate();
