/**
 * Run this script to create the users table and seed data in the dyning database.
 * From project root: node backend/scripts/setup-db.js
 * From backend folder: node scripts/setup-db.js
 */
import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env from project root (one level up from backend)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const pool = new pg.Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME || 'dyning',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
});

async function runSqlFile(filePath) {
  const fullPath = path.resolve(__dirname, '../../db', filePath);
  const sql = fs.readFileSync(fullPath, 'utf8');
  await pool.query(sql);
}

async function setup() {
  try {
    console.log('Connecting to database dyning...');
    await pool.query('SELECT 1');
    console.log('Running schema.sql...');
    await runSqlFile('schema.sql');
    console.log('Running seed.sql...');
    await runSqlFile('seed.sql');
    console.log('Done. Users table is ready with 4 rows.');
  } catch (err) {
    console.error('Setup failed:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

setup();
