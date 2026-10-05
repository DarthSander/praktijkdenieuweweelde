// Voert db/schema.sql uit op de Neon-database uit DATABASE_URL.
// Gebruik: DATABASE_URL=postgres://... npm run db:migrate
// (of zet DATABASE_URL in .env.local; dat bestand wordt automatisch gelezen)
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Pool, neonConfig } from "@neondatabase/serverless";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

if (!process.env.DATABASE_URL && existsSync(join(root, ".env.local"))) {
  process.loadEnvFile(join(root, ".env.local"));
}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL ontbreekt. Zet hem in .env.local of als env-variabele.");
  process.exit(1);
}

// Node 22+ heeft een ingebouwde WebSocket.
neonConfig.webSocketConstructor = globalThis.WebSocket;

const schema = readFileSync(join(root, "db", "schema.sql"), "utf8");
const pool = new Pool({ connectionString: url });

try {
  await pool.query(schema);
  console.log("Schema uitgevoerd.");
} catch (err) {
  console.error("Migratie mislukt:", err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
