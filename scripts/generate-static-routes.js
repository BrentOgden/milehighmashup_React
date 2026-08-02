import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  NOT_FOUND_METADATA,
  getIndexableRoutes,
} from '../src/seo/siteMetadata.js';
import { renderSeoBlock } from './seoHtml.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const indexPath = path.join(distDir, 'index.html');
const seoPattern = /<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/;

if (!fs.existsSync(indexPath)) {
  throw new Error('dist/index.html was not found. Run Vite before generating static routes.');
}

const homeHtml = fs.readFileSync(indexPath, 'utf8');
if (!seoPattern.test(homeHtml)) {
  throw new Error('The built index.html does not contain the generated SEO block.');
}

for (const metadata of getIndexableRoutes()) {
  if (metadata.path === '/') continue;

  const routeDirectory = path.join(
    distDir,
    metadata.canonicalPath.replace(/^\/+|\/+$/g, '')
  );
  fs.mkdirSync(routeDirectory, { recursive: true });

  const routeHtml = homeHtml.replace(seoPattern, renderSeoBlock(metadata));
  fs.writeFileSync(path.join(routeDirectory, 'index.html'), routeHtml);
}

const notFoundHtml = homeHtml.replace(
  seoPattern,
  renderSeoBlock(NOT_FOUND_METADATA)
);
fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml);

console.log(
  `Generated ${getIndexableRoutes().length - 1} route entry files and 404.html.`
);
