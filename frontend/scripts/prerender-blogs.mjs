/* After `vite build`, write a real HTML file for /blogs and each /blogs/<slug>.
   The SPA is client-rendered, so crawlers and link-preview bots that don't run JS would
   otherwise see the home page's <head>. These files carry the right title, description,
   canonical, OG/Twitter tags and JSON-LD before any JavaScript runs. */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const dist = join(here, "..", "dist");
const SITE = "Connect Gen AI";

const meta = await import(new URL("../src/pages/blog/meta.js", import.meta.url));
const { BLOGS, BLOG_INDEX, BLOG_BASE, SITE_URL, blogPath, blogOgImage, blogSchema, blogIndexSchema } = meta;

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const template = readFileSync(join(dist, "index.html"), "utf8");

function head({ title, description, path, image, type = "website", schema, published, modified, section }) {
  const url = `${SITE_URL}${path}`;
  const full = `${title} | ${SITE}`;
  const ld = (Array.isArray(schema) ? schema : [schema]).map((g) => `<script type="application/ld+json">${JSON.stringify(g)}</script>`).join("\n    ");
  return `<title>${esc(full)}</title>
    <meta name="description" content="${esc(description)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:site_name" content="${SITE}" />
    <meta property="og:title" content="${esc(full)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:locale" content="en_IN" />${published ? `\n    <meta property="article:published_time" content="${published}" />` : ""}${
    modified ? `\n    <meta property="article:modified_time" content="${modified}" />` : ""
  }${section ? `\n    <meta property="article:section" content="${esc(section)}" />` : ""}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(full)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${image}" />
    ${ld}`;
}

/* Replace the template's title/description/OG block with this page's own. */
function render(page) {
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, "___HEAD___");
  html = html.replace(/\n\s*<meta name="description"[^>]*>/, "");
  html = html.replace(/\n\s*<meta property="og:[^>]*>/g, "");
  html = html.replace(/\n\s*<meta name="twitter:[^>]*>/g, "");
  return html.replace("___HEAD___", head(page));
}

function write(path, html) {
  const dir = join(dist, path.replace(/^\//, ""));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
}

write(BLOG_BASE, render({
  title: BLOG_INDEX.title,
  description: BLOG_INDEX.description,
  path: BLOG_BASE,
  image: blogOgImage("index"),
  schema: blogIndexSchema(),
}));

for (const post of BLOGS) {
  write(blogPath(post.slug), render({
    title: post.title,
    description: post.description,
    path: blogPath(post.slug),
    image: blogOgImage(post.slug),
    type: "article",
    schema: blogSchema(post),
    published: post.date,
    modified: post.updated || post.date,
    section: post.category,
  }));
}

console.log(`prerendered ${BLOGS.length + 1} blog pages into dist/`);
