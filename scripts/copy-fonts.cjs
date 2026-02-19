const fs = require("fs");
const path = require("path");

const fontsDir = path.join(__dirname, "..", "public", "fonts");
fs.mkdirSync(fontsDir, { recursive: true });

const copies = [
  ["@fontsource-variable/inter/files/inter-latin-wght-normal.woff2", "inter-latin-wght-normal.woff2"],
  ["@fontsource/space-grotesk/files/space-grotesk-latin-400-normal.woff2", "space-grotesk-latin-400-normal.woff2"],
  ["@fontsource/space-grotesk/files/space-grotesk-latin-500-normal.woff2", "space-grotesk-latin-500-normal.woff2"],
  ["@fontsource/space-grotesk/files/space-grotesk-latin-600-normal.woff2", "space-grotesk-latin-600-normal.woff2"],
  ["@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2", "jetbrains-mono-latin-400-normal.woff2"],
  ["@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2", "jetbrains-mono-latin-500-normal.woff2"],
];

const nodeModules = path.join(__dirname, "..", "node_modules");
for (const [src, dest] of copies) {
  const srcPath = path.join(nodeModules, src);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, path.join(fontsDir, dest));
  }
}
