// Voert db/schema.sql uit op de Neon-database uit DATABASE_URL (of POSTGRES_URL).
// Gebruik: DATABASE_URL=postgres://... npm run db:migrate
// (of zet DATABASE_URL in .env.local; dat bestand wordt automatisch gelezen)
//
// Met --build (gebruikt door `npm run build`, dus bij elke Vercel-deploy):
// ontbreekt de database-URL of mislukt de migratie, dan volgt alleen een
// waarschuwing en gaat de build gewoon door.
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { neon } from "@neondatabase/serverless";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

if (!process.env.DATABASE_URL && existsSync(join(root, ".env.local"))) {
  process.loadEnvFile(join(root, ".env.local"));
}

const buildMode = process.argv.includes("--build");
const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!url) {
  if (buildMode) {
    console.warn("[db:migrate] Geen DATABASE_URL; schema-migratie overgeslagen.");
    process.exit(0);
  }
  console.error("DATABASE_URL ontbreekt. Zet hem in .env.local of als env-variabele.");
  process.exit(1);
}

/** Splitst SQL op ";" aan het eind van een regel, behalve binnen $$-blokken. */
function splitStatements(text) {
  const statements = [];
  let current = "";
  let inDollar = false;
  for (const line of text.split("\n")) {
    if (line.trim().startsWith("--") && !inDollar) continue;
    current += line + "\n";
    const dollars = (line.match(/\$\$/g) || []).length;
    if (dollars % 2 === 1) inDollar = !inDollar;
    if (!inDollar && line.trimEnd().endsWith(";")) {
      if (current.trim()) statements.push(current.trim());
      current = "";
    }
  }
  if (current.trim()) statements.push(current.trim());
  return statements;
}

const sql = neon(url);
const statements = splitStatements(readFileSync(join(root, "db", "schema.sql"), "utf8"));

try {
  for (const statement of statements) {
    await sql.query(statement);
  }
  console.log(`[db:migrate] Schema uitgevoerd (${statements.length} statements).`);
} catch (err) {
  console.error("[db:migrate] Migratie mislukt:", err.message);
  if (!buildMode) process.exitCode = 1;
}
