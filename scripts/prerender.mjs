/**
 * Post-build static prerender: generates per-route HTML by injecting
 * the correct Helmet meta tags into the built index.html. No browser needed.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");

const ROUTES = [
  {
    path: "/",
    title: "Stanley Labs - Websites & Software",
    description:
      "Stanley Labs builds fast, cinematic websites and software for businesses.",
    canonical: "https://stanleylabs.com/",
  },
  {
    path: "/book",
    title: "Book a Call - Stanley Labs",
    description:
      "Schedule a free 30-minute consultation with Stanley Labs. We'll discuss your project scope, timeline, and next steps.",
    canonical: "https://stanleylabs.com/book",
  },
];

async function prerender() {
  const template = await readFile(join(DIST, "index.html"), "utf-8");

  for (const route of ROUTES) {
    // Replace <title>
    let html = template.replace(
      /<title>[^<]*<\/title>/,
      `<title>${route.title}</title>`
    );

    // Inject meta description + canonical + OG right before </head>
    const inject = [
      `<meta name="description" content="${route.description}" />`,
      `<link rel="canonical" href="${route.canonical}" />`,
      `<meta property="og:title" content="${route.title}" />`,
      `<meta property="og:description" content="${route.description}" />`,
      `<meta property="og:url" content="${route.canonical}" />`,
    ].join("\n    ");

    html = html.replace("</head>", `    ${inject}\n  </head>`);

    const outDir = join(DIST, route.path === "/" ? "" : route.path);
    await mkdir(outDir, { recursive: true });
    const outFile = join(outDir, "index.html");
    await writeFile(outFile, html, "utf-8");
    console.log(`Prerendered: ${route.path} -> ${outFile}`);
  }
}

prerender().catch((err) => {
  console.error(err);
  process.exit(1);
});
