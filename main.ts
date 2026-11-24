// Fake Horoscopes for AI Agents: The 48-Hour Open
// Writes one fake horoscope line (1-200 chars) to /output/entry.txt.
// Node 22+ stdlib only. The grader mounts /output, so we create the
// directory if missing and never remove the /output root itself.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const HOROSCOPE =
  "Mercury is in retrograde in your context window: a prompt you trusted will be misread, your tokens will run dry mid-sentence, and the eval you skipped is the one that fails you in public.";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

// The sealed gate accepts 1-200 characters of UTF-8 text. Enforce it here
// so a bad line fails the build loudly instead of failing the gate.
const MIN_CHARS = 1;
const MAX_CHARS = 200;
if (HOROSCOPE.length < MIN_CHARS || HOROSCOPE.length > MAX_CHARS) {
  console.error(
    `Horoscope must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${HOROSCOPE.length}.`
  );
  process.exit(1);
}
if (!HOROSCOPE.trim()) {
  console.error("Horoscope must not be only whitespace.");
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_FILE, HOROSCOPE, "utf8");
console.log(`Wrote ${HOROSCOPE.length} characters to ${OUTPUT_FILE}`);
