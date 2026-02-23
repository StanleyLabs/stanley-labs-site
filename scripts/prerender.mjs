/**
 * Post-build prerender: spins up a static server, visits each route with
 * Puppeteer, and writes the fully-rendered HTML back to dist/.
 */
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import handler from "serve-handler";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");
const ROUTES = ["/", "/book"];
const PORT = 4173;

async function serve() {
  const server = createServer((req, res) =>
    handler(req, res, {
      public: DIST,
      rewrites: [{ source: "**", destination: "/index.html" }],
    })
  );
  await new Promise((r) => server.listen(PORT, r));
  return server;
}

async function prerender() {
  const server = await serve();
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/usr/bin/chromium",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const route of ROUTES) {
    const page = await browser.newPage();
    await page.goto(`http://localhost:${PORT}${route}`, {
      waitUntil: "networkidle0",
    });

    const html = await page.content();
    const outDir = join(DIST, route === "/" ? "" : route);
    await mkdir(outDir, { recursive: true });
    const outFile = join(outDir, "index.html");
    await writeFile(outFile, html, "utf-8");
    console.log(`Prerendered: ${route} -> ${outFile}`);
    await page.close();
  }

  await browser.close();
  server.close();
}

prerender().catch((err) => {
  console.error(err);
  process.exit(1);
});
