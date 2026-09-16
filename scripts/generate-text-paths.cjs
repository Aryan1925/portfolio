const opentype = require("opentype.js");
const fs = require("fs");
const path = require("path");

const FONT_FILE = path.join(__dirname, "..", "public", "fonts", "PatrickHand-Regular.ttf");
const OUT_FILE = path.join(__dirname, "..", "lib", "IntroTextPaths.js");

const FONT_SIZE = 300;
const STROKE_WIDTH = 14;
const PAD = STROKE_WIDTH * 2 + 60;

const TEXTS = {
  hello: "Hello",
  name: "I'm Aryan",
  tagline: "Welcome to my work and ideas",
};

function toPathData(cmds, dec) {
  const n = Math.pow(10, dec);
  let d = "";
  for (const c of cmds) {
    switch (c.type) {
      case "M":
        d += `M${Math.round(c.x * n) / n} ${Math.round(c.y * n) / n}`;
        break;
      case "L":
        d += `L${Math.round(c.x * n) / n} ${Math.round(c.y * n) / n}`;
        break;
      case "C":
        d += `C${Math.round(c.x1 * n) / n} ${Math.round(c.y1 * n) / n} ${
          Math.round(c.x2 * n) / n
        } ${Math.round(c.y2 * n) / n} ${Math.round(c.x * n) / n} ${
          Math.round(c.y * n) / n
        }`;
        break;
      case "Q":
        d += `Q${Math.round(c.x1 * n) / n} ${Math.round(c.y1 * n) / n} ${
          Math.round(c.x * n) / n
        } ${Math.round(c.y * n) / n}`;
        break;
      case "Z":
        d += "Z";
        break;
      default:
        break;
    }
  }
  return d;
}

function collectPoints(cmds) {
  const pts = [];
  for (const c of cmds) {
    if (c.type === "M" || c.type === "L" || c.type === "C" || c.type === "Q") {
      pts.push([c.x, c.y]);
    }
    if (c.type === "C" || c.type === "Q") {
      pts.push([c.x1, c.y1]);
      pts.push([c.x2, c.y2]);
    }
  }
  return pts;
}

const font = opentype.parse(fs.readFileSync(FONT_FILE));
const scale = FONT_SIZE / font.unitsPerEm;

const result = {};

for (const [key, text] of Object.entries(TEXTS)) {
  const paths = [];
  const allPts = [];

  let cursor = 0;
  let prevGlyph = null;

  for (const ch of text) {
    const glyph = font.charToGlyph(ch);

    if (glyph && glyph.path && glyph.path.commands.length) {
      // getPath(x, y, fontSize) already offsets every coordinate (controls
      // included) by x — do NOT add cursor again.
      const glyphPath = glyph.getPath(cursor, 0, FONT_SIZE);
      const cmds = glyphPath.commands;

      // Sanity guard: ink must fit inside the glyph's advance box. Variable /
      // misparsed fonts quietly produce overlapping, deformed outlines.
      let inkMinX = Infinity;
      let inkMaxX = -Infinity;
      for (const c of cmds) {
        if (c.type === "M" || c.type === "L" || c.type === "C" || c.type === "Q") {
          if (c.x < inkMinX) inkMinX = c.x;
          if (c.x > inkMaxX) inkMaxX = c.x;
        }
      }
      const advance = glyph.advanceWidth * scale;
      const tol = FONT_SIZE * 0.06;
      if (inkMinX < cursor - tol || inkMaxX > cursor + advance + tol) {
        throw new Error(
          `Glyph ${JSON.stringify(ch)} ink box [${inkMinX.toFixed(1)}, ${inkMaxX.toFixed(1)}] ` +
            `does not fit inside its advance box [${cursor.toFixed(1)}, ${(cursor + advance).toFixed(1)}]. ` +
            `The font outlines are likely sparse or variable — use a static font.`
        );
      }

      paths.push(toPathData(cmds, 2));
      allPts.push(...collectPoints(cmds));
    }

    if (prevGlyph) {
      cursor += font.getKerningValue(prevGlyph, glyph) * scale;
    }

    cursor += glyph.advanceWidth * scale;
    prevGlyph = glyph;
  }

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const [px, py] of allPts) {
    if (px < minX) minX = px;
    if (px > maxX) maxX = px;
    if (py < minY) minY = py;
    if (py > maxY) maxY = py;
  }

  const width = maxX - minX + PAD * 2;
  const height = maxY - minY + PAD * 2;

  result[key] = {
    paths,
    viewBox: {
      x: minX - PAD,
      y: minY - PAD,
      width,
      height,
    },
    strokeWidth: STROKE_WIDTH,
  };
}

const output =
  `// AUTO-GENERATED — do not edit. Run: node scripts/generate-text-paths.cjs\n` +
  `export const INTRO_TEXTS = ${JSON.stringify(result, null, 2)};\n`;

fs.writeFileSync(OUT_FILE, output, "utf8");

console.log("Generated", OUT_FILE);
console.log("Hello paths:", result.hello.paths.length, "| Name paths:", result.name.paths.length);
console.log("Hello viewBox:", JSON.stringify(result.hello.viewBox));
console.log("Name viewBox:", JSON.stringify(result.name.viewBox));