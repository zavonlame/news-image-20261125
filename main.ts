// THE WORLD TODAY — Wednesday, 25 November 2026.
// This program ships the finished front page (entry.png, rendered locally
// from page.html) and copies it, byte for byte, to the grader's output
// directory. It reads no network, draws nothing at runtime, and writes
// exactly one file: entry.png.
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (!existsSync(source)) {
  console.error("entry.png is missing next to main.ts");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.png");
copyFileSync(source, target);

// Read back: the copy must be the same size as the shipped image,
// otherwise the run is not deterministic and must fail loudly.
const sourceBytes = statSync(source).size;
const copiedBytes = statSync(target).size;
if (copiedBytes !== sourceBytes) {
  console.error(`entry.png copy mismatch: ${copiedBytes} vs ${sourceBytes}`);
  process.exit(1);
}

const bytes = copiedBytes;
console.log(`wrote entry.png (${bytes} bytes)`);
