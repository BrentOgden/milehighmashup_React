import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SITE_CONFIG,
  getIndexableRoutes,
  toAbsoluteUrl,
} from '../src/seo/siteMetadata.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const errors = [];
const warnings = [];
const routes = getIndexableRoutes();
const titles = new Set();
const descriptions = new Set();
const canonicals = new Set();

for (const route of routes) {
  const canonical = toAbsoluteUrl(route.canonicalPath);

  if (titles.has(route.title)) errors.push(`Duplicate title: ${route.title}`);
  if (descriptions.has(route.description)) {
    errors.push(`Duplicate description for ${route.path}`);
  }
  if (canonicals.has(canonical)) errors.push(`Duplicate canonical: ${canonical}`);

  titles.add(route.title);
  descriptions.add(route.description);
  canonicals.add(canonical);

  if (route.title.length < 30 || route.title.length > 65) {
    warnings.push(`${route.path} title length is ${route.title.length}.`);
  }
  if (route.description.length < 90 || route.description.length > 165) {
    warnings.push(
      `${route.path} description length is ${route.description.length}.`
    );
  }
  if (!route.heading) errors.push(`${route.path} is missing a page heading.`);
}

const requiredFiles = [
  'index.html',
  'public/robots.txt',
  'public/sitemap.xml',
  'public/_redirects',
  `public${SITE_CONFIG.defaultImage}`,
];

for (const relativePath of requiredFiles) {
  if (!fs.existsSync(path.join(root, relativePath))) {
    errors.push(`Missing required SEO file: ${relativePath}`);
  }
}

const sitemapPath = path.join(root, 'public/sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  for (const route of routes) {
    const canonical = toAbsoluteUrl(route.canonicalPath);
    if (!sitemap.includes(`<loc>${canonical}</loc>`)) {
      errors.push(`Sitemap is missing ${canonical}`);
    }
  }
  if (sitemap.includes('/videos')) {
    errors.push('Legacy /videos URL must not appear in the sitemap.');
  }
}

const robotsPath = path.join(root, 'public/robots.txt');
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf8');
  if (!robots.includes(`Sitemap: ${SITE_CONFIG.url}/sitemap.xml`)) {
    errors.push('robots.txt does not reference the canonical sitemap URL.');
  }
}

const redirectsPath = path.join(root, 'public/_redirects');
if (fs.existsSync(redirectsPath)) {
  const redirects = fs.readFileSync(redirectsPath, 'utf8');
  if (!redirects.includes('/videos /leaguevideos/ 301')) {
    errors.push('Missing legacy /videos redirect.');
  }
  if (!redirects.includes('/* /404.html 404')) {
    errors.push('Missing true 404 fallback directive.');
  }
}

const distPath = path.join(root, 'dist');
if (fs.existsSync(distPath)) {
  for (const route of routes) {
    const htmlPath =
      route.path === '/'
        ? path.join(distPath, 'index.html')
        : path.join(
            distPath,
            route.canonicalPath.replace(/^\/+|\/+$/g, ''),
            'index.html'
          );

    if (!fs.existsSync(htmlPath)) {
      errors.push(`Missing generated route HTML: ${htmlPath}`);
      continue;
    }

    const html = fs.readFileSync(htmlPath, 'utf8');
    const canonical = toAbsoluteUrl(route.canonicalPath);
    for (const required of [
      `<title>${route.title.replaceAll('&', '&amp;')}</title>`,
      `rel="canonical" href="${canonical}"`,
      `property="og:url" content="${canonical}"`,
      'name="twitter:card" content="summary_large_image"',
      'type="application/ld+json"',
    ]) {
      if (!html.includes(required)) {
        errors.push(`${htmlPath} is missing: ${required}`);
      }
    }
  }
}

for (const warning of warnings) console.warn(`SEO warning: ${warning}`);

if (errors.length) {
  for (const error of errors) console.error(`SEO error: ${error}`);
  process.exit(1);
}

console.log(`SEO validation passed for ${routes.length} indexable routes.`);
