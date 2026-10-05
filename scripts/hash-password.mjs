// Maakt een hash van het admin-wachtwoord voor ADMIN_PASSWORD_HASH.
// Formaat: scrypt:<salt>:<hash> (zonder $-tekens, zodat .env-bestanden het niet als variabele lezen).
// Gebruik: npm run admin:hash -- "jouw-wachtwoord"
import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];
if (!password) {
  console.error('Gebruik: npm run admin:hash -- "jouw-wachtwoord"');
  process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);
console.log(`scrypt:${salt.toString("base64url")}:${hash.toString("base64url")}`);
