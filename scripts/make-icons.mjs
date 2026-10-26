#!/usr/bin/env node
/**
 * Maakt alle icoonbestanden uit de twee SVG's in public/.
 *
 *   public/icon.svg            de bloem, zonder achtergrond (tab en favicon)
 *   public/icon-maskable.svg   de bloem op een gekleurd vlak (Android)
 *
 * Draai dit opnieuw zodra een van die twee verandert:
 *
 *   node scripts/make-icons.mjs
 *
 * Wat eruit komt:
 *   public/icon-192.png, icon-512.png        vierkant, achtergrond in roomwit
 *   public/apple-touch-icon.png              idem, 180px, voor iOS
 *   public/icon-maskable-192.png, -512.png   uit icon-maskable.svg
 *   src/app/favicon.ico                      16, 32, 48 en 64 pixels
 */
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const ROOM = "#FAF5F2"; // achtergrond van de vierkante iconen

async function rond(svg, size, achtergrond) {
  const bloem = await sharp(svg).resize(size, size).png().toBuffer();
  if (!achtergrond) return bloem;
  return sharp({
    create: { width: size, height: size, channels: 4, background: achtergrond },
  })
    .composite([{ input: bloem }])
    .png()
    .toBuffer();
}

// ICO met PNG-frames: de kop verwijst naar vier complete PNG-bestanden.
function ico(frames) {
  const kop = Buffer.alloc(6 + 16 * frames.length);
  kop.writeUInt16LE(0, 0);
  kop.writeUInt16LE(1, 2);
  kop.writeUInt16LE(frames.length, 4);
  let offset = kop.length;
  frames.forEach(({ size, data }, i) => {
    const p = 6 + 16 * i;
    kop.writeUInt8(size >= 256 ? 0 : size, p);
    kop.writeUInt8(size >= 256 ? 0 : size, p + 1);
    kop.writeUInt8(0, p + 2);
    kop.writeUInt8(0, p + 3);
    kop.writeUInt16LE(1, p + 4);
    kop.writeUInt16LE(32, p + 6);
    kop.writeUInt32LE(data.length, p + 8);
    kop.writeUInt32LE(offset, p + 12);
    offset += data.length;
  });
  return Buffer.concat([kop, ...frames.map((f) => f.data)]);
}

const icon = await readFile("public/icon.svg");
const maskable = await readFile("public/icon-maskable.svg");

await writeFile("public/icon-192.png", await rond(icon, 192, ROOM));
await writeFile("public/icon-512.png", await rond(icon, 512, ROOM));
await writeFile("public/apple-touch-icon.png", await rond(icon, 180, ROOM));
await writeFile("public/icon-maskable-192.png", await rond(maskable, 192));
await writeFile("public/icon-maskable-512.png", await rond(maskable, 512));

const frames = [];
for (const size of [16, 32, 48, 64]) {
  frames.push({ size, data: await rond(icon, size) });
}
await writeFile("src/app/favicon.ico", ico(frames));

console.log("Iconen opnieuw gemaakt.");
