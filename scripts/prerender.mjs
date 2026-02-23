/**
 * Post-build static prerender: generates per-route HTML by replacing
 * meta tags in the built index.html per route. No browser needed.
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

/** Replace ALL occurrences of a meta tag by property or name. */
function replaceMetaProperty(html, property, content) {
  return html.replaceAll(
    new RegExp(`<meta property="${property}" content="[^"]*" />`, "g"),
    `<meta property="${property}" content="${content}" />`
  );
}

function replaceMetaName(html, name, content) {
  return html.replaceAll(
    new RegExp(`<meta name="${name}" content="[^"]*" />`, "g"),
    `<meta name="${name}" content="${content}" />`
  );
}

async function prerender() {
  const template = await readFile(join(DIST, "index.html"), "utf-8");

  for (const route of ROUTES) {
    let html = template;

    // Title
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`);

    // OG tags
    html = replaceMetaProperty(html, "og:title", route.title);
    html = replaceMetaProperty(html, "og:description", route.description);
    html = replaceMetaProperty(html, "og:url", route.canonical);

    // Twitter tags
    html = replaceMetaName(html, "twitter:title", route.title);
    html = replaceMetaName(html, "twitter:description", route.description);

    // Inject description + canonical before </head>
    const inject = [
      `<meta name="description" content="${route.description}" />`,
      `<link rel="canonical" href="${route.canonical}" />`,
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
