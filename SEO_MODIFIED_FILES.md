# Complete Contents of Every Modified Text File

The binary social preview image is documented at the end of this file.

## `index.html`

```html
<!doctype html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#000000" />

  <!-- SEO tags are injected from src/seo/siteMetadata.js by Vite. -->
  <!-- SEO_TAGS -->

  <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
    rel="stylesheet"
  />

  <script async src="https://www.googletagmanager.com/gtag/js?id=G-BJ4PDV4BR3"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-BJ4PDV4BR3');
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

## `package.json`

```json
{
  "name": "milehighmashup",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "concurrently --kill-others \"npm:serve\" \"npm:client\"",
    "serve": "nodemon server/index.js",
    "client": "vite",
    "build": "vite build && node scripts/generate-static-routes.js",
    "scrape:google-images": "node scrape-google-images.js",
    "scrape:timeline": "node scrape-twitter-timeline-v1.js",
    "scrape:twitter-nitter": "node scrape-twitter-images-nitter.js",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "validate:seo": "node scripts/validate-seo.js"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.1.10",
    "axios": "^1.9.0",
    "bootstrap": "^5.3.2",
    "cheerio": "^1.1.0",
    "cors": "^2.8.5",
    "dotenv": "^16.5.0",
    "express": "^4.21.2",
    "framer-motion": "^12.18.1",
    "node-cache": "^5.1.2",
    "node-cron": "^4.1.0",
    "node-fetch": "^3.3.2",
    "nodemon": "^3.1.10",
    "path-to-regexp": "^6.3.0",
    "puppeteer": "^24.10.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-helmet-async": "^2.0.5",
    "react-icons": "^5.5.0",
    "react-parallax": "^3.5.2",
    "react-player": "^2.13.0",
    "react-router-dom": "^6.19.0",
    "react-slick": "^0.29.0",
    "react-twitter-embed": "^4.0.4",
    "react-youtube": "^10.1.0",
    "rss-parser": "^3.13.0",
    "slick-carousel": "^1.8.1",
    "twitter-api-v2": "^1.23.2",
    "xml2js": "^0.6.2"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.10",
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.21",
    "concurrently": "^9.1.2",
    "eslint": "^8.53.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.4",
    "nodemon": "^3.1.10",
    "postcss": "^8.5.5",
    "tailwindcss": "^4.1.10",
    "tailwindcss-textshadow": "^2.1.3",
    "vite": "^5.0.0"
  }
}
```

## `public/_redirects`

```text
/videos /leaguevideos/ 301
/videos/ /leaguevideos/ 301
/* /404.html 404
```

## `public/robots.txt`

```text
User-agent: *
Allow: /

Sitemap: https://milehighmashup.com/sitemap.xml
```

## `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://milehighmashup.com/</loc>
    <lastmod>2026-08-02</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://milehighmashup.com/facts/</loc>
    <lastmod>2026-08-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://milehighmashup.com/news/</loc>
    <lastmod>2026-08-02</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://milehighmashup.com/standings/</loc>
    <lastmod>2026-08-02</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://milehighmashup.com/leaguevideos/</loc>
    <lastmod>2026-08-02</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://milehighmashup.com/videohighlights/</loc>
    <lastmod>2026-08-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

## `scripts/generate-static-routes.js`

```javascript
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
```

## `scripts/seoHtml.js`

```javascript
import {
  SITE_CONFIG,
  buildSchemaGraph,
  toAbsoluteUrl,
} from '../src/seo/siteMetadata.js';

function escapeAttribute(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function escapeText(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

export function renderSeoBlock(metadata) {
  const canonicalUrl = toAbsoluteUrl(metadata.canonicalPath);
  const imageUrl = toAbsoluteUrl(metadata.image || SITE_CONFIG.defaultImage);
  const imageAlt = metadata.imageAlt || SITE_CONFIG.defaultImageAlt;
  const robots = metadata.indexable
    ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    : 'noindex, nofollow, noarchive';
  const schema = JSON.stringify(buildSchemaGraph(metadata)).replaceAll('<', '\\u003c');

  return `<!-- SEO:START -->
  <title>${escapeText(metadata.title)}</title>
  <meta name="description" content="${escapeAttribute(metadata.description)}" data-rh="true" />
  <meta name="author" content="${escapeAttribute(SITE_CONFIG.author)}" data-rh="true" />
  <meta name="robots" content="${robots}" data-rh="true" />
  <link rel="canonical" href="${escapeAttribute(canonicalUrl)}" data-rh="true" />

  <meta property="og:type" content="website" data-rh="true" />
  <meta property="og:locale" content="${escapeAttribute(SITE_CONFIG.locale)}" data-rh="true" />
  <meta property="og:site_name" content="${escapeAttribute(SITE_CONFIG.name)}" data-rh="true" />
  <meta property="og:url" content="${escapeAttribute(canonicalUrl)}" data-rh="true" />
  <meta property="og:title" content="${escapeAttribute(metadata.title)}" data-rh="true" />
  <meta property="og:description" content="${escapeAttribute(metadata.description)}" data-rh="true" />
  <meta property="og:image" content="${escapeAttribute(imageUrl)}" data-rh="true" />
  <meta property="og:image:secure_url" content="${escapeAttribute(imageUrl)}" data-rh="true" />
  <meta property="og:image:width" content="${SITE_CONFIG.defaultImageWidth}" data-rh="true" />
  <meta property="og:image:height" content="${SITE_CONFIG.defaultImageHeight}" data-rh="true" />
  <meta property="og:image:alt" content="${escapeAttribute(imageAlt)}" data-rh="true" />

  <meta name="twitter:card" content="summary_large_image" data-rh="true" />
  <meta name="twitter:site" content="${escapeAttribute(SITE_CONFIG.twitterHandle)}" data-rh="true" />
  <meta name="twitter:title" content="${escapeAttribute(metadata.title)}" data-rh="true" />
  <meta name="twitter:description" content="${escapeAttribute(metadata.description)}" data-rh="true" />
  <meta name="twitter:image" content="${escapeAttribute(imageUrl)}" data-rh="true" />
  <meta name="twitter:image:alt" content="${escapeAttribute(imageAlt)}" data-rh="true" />

  <script type="application/ld+json" data-rh="true">${schema}</script>
  <!-- SEO:END -->`;
}
```

## `scripts/validate-seo.js`

```javascript
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
```

## `src/App.jsx`

```jsx
// src/App.jsx
import React from 'react';
import { Parallax } from 'react-parallax';

import heroBg from './assets/hero2.jpg';
import Facts from './components/Facts.jsx';
import PhotoGrid from './components/PhotoGrid';
import VideoComponent from './components/Videos.jsx';
import VideoHighlightComponent from './components/VideoHighlights.jsx';
import ColoradoAvalancheLastGame from './components/ColoradoAvalancheLastGame.jsx';
import DenverBroncosLastGame from './components/DenverBroncosLastGame.jsx';
import NuggetsNews from './components/DenverNuggetsNews.jsx';
import AvsNews from './components/ColoradoAvalancheNews.jsx';
import BroncosNews from './components/DenverBroncosNews.jsx';
import MammothNews from './components/ColoradoMammothNews.jsx'
import Quotes from './components/Quotes.jsx';
import DenverNuggetsVideos from './components/DenverNuggetsVideos.jsx';
import Social from './components/Social';


//  ↓ make sure this matches the file & export name ↓
import DenverNuggetsLastGame from './components/DenverNuggetsLastGame.jsx';
import DenverNuggetsNews from './components/DenverNuggetsNews.jsx';
import ColoradoMammothLastGame from './components/ColoradoMammothLastGame.jsx';
import Footer from './Footer.jsx';

export default function App() {
  return (
    <>

      <Parallax
        bgImage={heroBg}
        strength={300}
        className="relative w-screen left-1/2 -translate-x-1/2"
      >
        <div className="relative flex items-center justify-center h-screen w-full">
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-12 text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">
              Welcome to Mile High Mashup
              <span className="block text-3xl mt-2">
                Where <span className="text-orange-400">Passion</span> Meets <span className="text-blue-600">Pride!</span>
              </span>
            </h1>
            <p className="max-w-3xl mb-6 mt-6 text-lg leading-relaxed">
              Fans in Colorado don’t just follow sports — they LIVE them! Whether you're cheering for the Broncos, Nuggets, Avalanche or Mammoth, we've got you covered with non-stop news, juicy rumors, and the latest buzz from the Mile High City. Get your daily dose of Denver sports excitement right here, all day, every day!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#standings"
                className="inline-block bg-gradient-to-br from-amber-600 via-yellow-300 to-amber-700 text-black font-bold text-shadow-amber-700 py-4 px-6 rounded-sm hover:bg-amber-700 transition"
                style={{ boxShadow: '0 0 20px #FEC524' }}
              >
                Scoreboard →
              </a>
              <a
                href="#news"
                className="inline-block bg-gradient-to-br from-amber-600 via-yellow-300 to-amber-700 text-black font-bold py-4 px-6 rounded-sm hover:bg-amber-700 transition"
                style={{ boxShadow: '0 0 20px #FEC524' }}
              >
                Follow the Latest Buzz →
              </a>
            </div>
          </div>
        </div>
      </Parallax>

      <Quotes />
      <PhotoGrid />

      <section
        id="standings"
        className="
        scroll-mt-30
        relative w-screen left-1/2 -translate-x-1/2
       bg-blue-700/40 py-12
        grid grid-cols-1 md:grid-cols-4 gap-4
        px-4 my-12
  "
      >
        <h2 className="sr-only">Latest Denver sports scores and records</h2>
        <DenverNuggetsLastGame />

        {/* these use their own default date-range logic */}
        <ColoradoAvalancheLastGame />
        <DenverBroncosLastGame />
        <ColoradoMammothLastGame />
      </section>


      {/* ─── NBA Scoreboard ──────────────────────────────────────── */}


      {/* ─── Did You Know? Facts ─────────────────────────────────── */}
      <section id="facts" className="mt-200 md:mt-0 md:max-w-8xl mx-auto px-4 py-12 mb-8">
        <h2 className="text-4xl font-bold">Did You Know?</h2>
        <Facts />
      </section>
      <section id="news" className="scroll-mt-20" aria-labelledby="latest-news-heading">
        <h2 id="latest-news-heading" className="sr-only">Latest Denver sports news</h2>
        {/* Centered container + vertical gaps */}
        <div className="max-w-8xl mx-auto px-4 mb-30 sm:px-6 lg:px-8 
                        space-y-8 md:space-y-6 lg:space-y-8">

          {/* Avalanche News */}
          <section className="relative rounded-lg overflow-hidden shadow py-8 md:py-8">
            <AvsNews headingLevel="h3" articleHeadingLevel="h4" />
          </section>

          {/* Broncos News */}
          <section className="relative rounded-lg overflow-hidden shadow py-8 md:py-8">
            <BroncosNews headingLevel="h3" articleHeadingLevel="h4" />
          </section>

          {/* Nuggets News */}
          <section className="relative rounded-lg overflow-hidden shadow py-8 md:py-8">
            <NuggetsNews headingLevel="h3" articleHeadingLevel="h4" />
          </section>
          <section className="relative rounded-lg overflow-hidden shadow py-8 md:py-8">
            <MammothNews headingLevel="h3" articleHeadingLevel="h4" />
          </section>
        </div>
      </section>

      {/* ─── Highlight Videos ────────────────────────────────────── */}
      <section
        id="video-block"
        className="relative w-screen left-1/2 -translate-x-1/2 bg-blue-700/40 py-12"
      >
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Action-Packed Edits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 justify-items-center">
            <VideoComponent videoId="jdTo9sHk66o" />
            <VideoComponent videoId="qP02cOCqcn8" />
            <VideoComponent videoId="6C9FAWKr--s" />
          </div>
        </div>

      </section>
      
    </>

  );
}
```

## `src/Footer.jsx`

```jsx
// src/components/Footer.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa'
import logo from './assets/logo-white.png'
import footerimg from './assets/footerimg.png'

export default function Footer() {
    return (
        <footer className="relative w-screen bg-black/60 text-gray-400 left-1/2 -translate-x-1/2">
            {/* Main content */}
            <div className="max-w-screen mx-10 md:mx-40 md:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Branding */}
                <div>
                    <img
                        src={logo}
                        alt="Mile High Mashup"
                        className="h-auto w-screen px-30 md:h-30 mb-4 md:px-0 md:w-auto"
                    />
                    <p className="text-sm md:text-left">
                        Your go-to Mile High sports hub — delivering news, scores, highlights and more for the Broncos, Avalanche, Nuggets and Mammoth.
                    </p>
                </div>

                {/* Explore links */}
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-white font-semibold mb-2">Explore</h2>
                        <ul className="space-y-1 text-sm">
                            <li><Link to="/facts/" className="hover:text-white">Did You Know?</Link></li>
                            <li><Link to="/news/" className="hover:text-white">News</Link></li>
                            <li><Link to="/leaguevideos/" className="hover:text-white">Videos</Link></li>
                            <li><Link to="/videohighlights/" className="hover:text-white">Classic Moments</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-white font-semibold mb-2">Follow Me</h2>
                        <div className="flex space-x-4">
                            <a href="https://twitter.com/MileHiRocks5280" aria-label="Twitter" className="hover:text-white" target="_blank" rel="noopener noreferrer"><FaTwitter size={20} /></a>
                            <a href="https://youtube.com/@MileHiMayhem303" aria-label="YouTube" className="hover:text-white" target="_blank" rel="noopener noreferrer"><FaYoutube size={20} /></a>
                            <a href="https://instagram.com/MileHiRocks5280" aria-label="Instagram" className="hover:text-white" target="_blank" rel="noopener noreferrer"><FaInstagram size={20} /></a>
                        </div>
                    </div>
                </div>

                {/* (Optional: Newsletter or other section) */}
                <img
                    src={footerimg}
                    alt="Denver Broncos, Colorado Mammoth, Denver Nuggets, and Colorado Avalanche logos"
                    className="w-full px-20 md:w-50 h-auto md:px-0 md:ml-40"  // scales the image to full container width
                />
            </div>

            {/* Bottom bar */}
            <div className="w-full bg-black/60">
                <div className="max-w-screen-xl mx-auto px-6 py-4 text-center text-sm">
                    © {new Date().getFullYear()} Mile High Mashup. All rights reserved.
                </div>
                <div className="pb-10 text-sm">
                    Designed and built by <a className="hover:text-amber-400" href="https://bsquaredsolutions.io" target="_blank" rel="noopener noreferrer">B Squared Solutions</a>
                </div>
            </div>
        </footer>
    )
}
```

## `src/Nav.jsx`

```jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import siteLogo from './assets/logo-white.png';

export default function Nav() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 w-screen z-50 bg-black/60 text-white shadow-amber-400 shadow-md"
      aria-label="Primary navigation"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between pt-3 h-16">
          {/* Logo on the left */}
          <Link to="/" className="flex-shrink-0" aria-label="Mile High Mashup home">
            <img src={siteLogo} alt="Mile High Mashup" className="h-20 w-auto my-2" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/facts/" className="hover:text-gray-300">Did You Know?</Link>
            <Link to="/news/" className="hover:text-gray-300">News</Link>
            <Link to="/leaguevideos/" className="hover:text-gray-300">Videos</Link>
            <Link to="/videohighlights/" className="hover:text-gray-300">Classic Moments</Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden focus:outline-none"
            onClick={() => setIsNavExpanded(!isNavExpanded)}
            aria-label="Toggle navigation menu"
            aria-expanded={isNavExpanded}
            aria-controls="mobile-navigation"
          >
            <svg className="h-6 w-6" fill="black" stroke="black" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isNavExpanded && (
          <div id="mobile-navigation" className="md:hidden flex flex-col space-y-2 py-2">
            <Link to="/facts/" className="scroll-mt-20 block px-2 py-1 hover:bg-gray-700 rounded">Did You Know?</Link>
            <Link to="/news/" className="scroll-mt-20 block px-2 py-1 hover:bg-gray-700 rounded">News</Link>
            <Link to="/leaguevideos/" className="scroll-mt-20 block px-2 py-1 hover:bg-gray-700 rounded">Videos</Link>
            <Link to="/videohighlights/" className="scroll-mt-20 block px-2 py-1 hover:bg-gray-700 rounded">Classic Moments</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
```

## `src/components/ColoradoAvalancheNews.jsx`

```jsx
// src/components/ColoradoAvalancheNews.jsx
import React, { useState, useEffect } from 'react';
import espn from '../api/espnApi';



// ESPN’s Avalanche team ID from your schedule JSON: 17
const TEAM_ID = 17;

export default function ColoradoAvalancheNews({ headingLevel = 'h2', articleHeadingLevel = 'h3' }) {
  const [articles,   setArticles]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [isFallback, setFallback]   = useState(false);

  // Format a JS Date into "MM-DD" in America/Denver
  function fmtDate(date) {
    const [yyyy, mm, dd] = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Denver',
      year:     'numeric',
      month:    '2-digit',
      day:      '2-digit',
    }).format(date).split('-');
    return `${mm}-${dd}`;
  }

  useEffect(() => {
    async function loadNews() {
      setLoading(true);
      setError(null);
      try {
        const res = await espn.get('/sports/hockey/nhl/news', {
          params: { lang: 'en', region: 'us', limit: 8 }
        });
        const all = res.data.articles || [];

        const filtered = all.filter(article =>
          article.categories?.some(cat =>
            cat.type === 'team' &&
            (cat.teamId === TEAM_ID || cat.team?.id === TEAM_ID)
          )
        );

        if (filtered.length) {
          setArticles(filtered);
          setFallback(false);
        } else {
          setArticles(all);
          setFallback(true);
        }
      } catch (e) {
        console.error(e);
        setError('Failed to load Avalanche news.');
      } finally {
        setLoading(false);
      }
    }
    loadNews();
  }, []);

  if (loading) {
    return (
      <div className="max-w-sm mx-auto bg-white shadow rounded-lg p-6 text-center">
        <p className="text-gray-500">Loading Avalanche news…</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="max-w-sm mx-auto bg-white shadow rounded-lg p-6 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  if (!articles.length) {
    return (
      <div className="max-w-sm mx-auto bg-white shadow rounded-lg p-6 text-center">
        <p className="text-gray-500">No news available.</p>
      </div>
    );
  }

  const Heading = headingLevel
  const ArticleHeading = articleHeadingLevel

  return (
    <div>
      <Heading className="text-4xl font-bold mb-6 text-white text-shadow-red-800/90 text-shadow-lg">
        {isFallback ? 'NHL News' : 'Avalanche News'}
      </Heading>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 h-full md:auto-rows-fr">
        {articles.map(article => {
          const imgUrl  = article.images?.[0]?.url || '';
          const pubDate = fmtDate(new Date(article.published));
          const link    = article.links.web.href;

          return (
            <a
              key={article.id}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col h-full">
                {imgUrl && (
                  <img
                    src={imgUrl}
                    alt={article.headline}
                    className="w-full h-48 object-cover flex-shrink-0"
                  />
                )}
                <div className="p-4 flex flex-col flex-grow">
                  <p
                    className="text-xl font-semibold text-gray-800 text-right mb-2"
                    style={{ color: '#1F2937' }}
                  >
                    {pubDate}
                  </p>
                  <ArticleHeading className="text-lg font-bold text-gray-800 mb-2">
                    {article.headline}
                  </ArticleHeading>
                  <p className="text-gray-600 flex-grow">
                    {article.description}
                  </p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
```

## `src/components/ColoradoMammothNews.jsx`

```jsx
// src/components/ColoradoMammothNews.jsx
import React, { useState, useEffect } from 'react'
import espn from '../api/espnApi'

// ESPN’s Mammoth team ID
const TEAM_ID = 125422

export default function ColoradoMammothNews({ headingLevel = 'h2', articleHeadingLevel = 'h3' }) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFallback, setFallback] = useState(false)

  // Format a JS Date into "MM-DD" in America/Denver
  function fmtDate(date) {
    const [yyyy, mm, dd] = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Denver',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
      .format(date)
      .split('-')
    return `${mm}-${dd}`
  }

  function safeHref(article) {
    // ESPN sometimes uses different shapes; try a few common ones
    const href =
      article?.links?.web?.href ||
      article?.links?.api?.news?.href ||
      article?.link ||
      article?.url ||
      null

    if (!href || typeof href !== 'string') return null

    // Allow absolute URLs; also allow protocol-relative URLs just in case
    if (/^https?:\/\//i.test(href) || /^\/\//.test(href)) return href

    // If ESPN returns a relative path, make it absolute
    if (href.startsWith('/')) return `https://www.espn.com${href}`

    return null
  }

  useEffect(() => {
    async function loadNews() {
      setLoading(true)
      setError(null)

      try {
        // 1) Fetch the NLL news feed
        const res = await espn.get('/sports/lacrosse/nll/news', {
          params: { lang: 'en', region: 'us', limit: 8 },
        })

        const all = Array.isArray(res?.data?.articles) ? res.data.articles : []

        // Only keep articles that have a usable link (prevents href crash + dead cards)
        const allWithLinks = all.filter((a) => !!safeHref(a))

        // 2) Filter for Mammoth **and** NLL league (`l:28`) via the category.uid
        const filtered = allWithLinks.filter((article) =>
          article.categories?.some(
            (cat) =>
              cat.type === 'team' &&
              (cat.teamId === TEAM_ID || cat.team?.id === TEAM_ID) &&
              cat.uid?.includes(`~l:28~t:${TEAM_ID}`)
          )
        )

        if (filtered.length) {
          setArticles(filtered)
          setFallback(false)
        } else {
          // No Mammoth articles: show all NLL news (with links)
          setArticles(allWithLinks)
          setFallback(true)
        }
      } catch (e) {
        console.error(e)
        setError('Failed to load Mammoth news.')
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [])

  if (loading) {
    return (
      <div className="max-w-sm mx-auto bg-white shadow rounded-lg p-6 text-center">
        <p className="text-gray-500">Loading Mammoth news…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-sm mx-auto bg-white shadow rounded-lg p-6 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (!articles.length) {
    return (
      <div className="max-w-sm mx-auto bg-white shadow rounded-lg p-6 text-center">
        <p className="text-gray-500">No news available.</p>
      </div>
    )
  }

  const Heading = headingLevel
  const ArticleHeading = articleHeadingLevel

  return (
    <div>
      <Heading className="text-4xl font-bold mb-6 text-white text-shadow-gray-500/90 text-shadow-lg">
        {isFallback ? 'NLL News' : 'Mammoth News'}
      </Heading>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 h-full md:auto-rows-fr">
        {articles.map((article) => {
          const imgUrl = article.images?.[0]?.url || ''
          const pubDate = fmtDate(new Date(article.published))
          const link = safeHref(article)

          // Shouldn’t happen because we filtered, but keep it extra safe
          if (!link) return null

          return (
            <a
              key={article.id || link}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col h-full">
                {imgUrl && (
                  <img
                    src={imgUrl}
                    alt={article.headline}
                    className="w-full h-48 object-cover flex-shrink-0"
                    onError={(e) => {
                      // If an image 406/403s, just hide it; don't break layout
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                )}

                <div className="p-4 flex flex-col flex-grow">
                  <p
                    className="text-xl font-semibold text-gray-800 text-right mb-2"
                    style={{ color: '#1F2937' }}
                  >
                    {pubDate}
                  </p>

                  <ArticleHeading className="text-lg font-bold text-gray-800 mb-2">
                    {article.headline}
                  </ArticleHeading>

                  <p className="text-gray-600 flex-grow">{article.description}</p>
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
```

## `src/components/DenverBroncosNews.jsx`

```jsx
// src/components/DenverBroncosNews.jsx
import React, { useState, useEffect } from 'react'
import espn from '../api/espnApi'

// ESPN’s Broncos team ID (from your schedule JSON)
const TEAM_ID = 7

export default function DenverBroncosNews({ headingLevel = 'h2', articleHeadingLevel = 'h3' }) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFallback, setFallback] = useState(false)

  // Format a JS Date into "MM-DD" in America/Denver
  function fmtDate(date) {
    const [yyyy, mm, dd] = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Denver',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
      .format(date)
      .split('-')
    return `${mm}-${dd}`
  }

  function safeHref(article) {
    const href =
      article?.links?.web?.href ||
      article?.links?.api?.news?.href ||
      article?.link ||
      article?.url ||
      null

    if (!href || typeof href !== 'string') return null

    if (/^https?:\/\//i.test(href) || /^\/\//.test(href)) return href
    if (href.startsWith('/')) return `https://www.espn.com${href}`

    return null
  }

  useEffect(() => {
    async function loadNews() {
      setLoading(true)
      setError(null)

      try {
        // 1) Fetch the NFL news feed
        const res = await espn.get('/sports/football/nfl/news', {
          params: { lang: 'en', region: 'us', limit: 8 },
        })

        const all = Array.isArray(res?.data?.articles) ? res.data.articles : []

        // Keep only articles that have a usable link (prevents href crashes)
        const allWithLinks = all.filter((a) => !!safeHref(a))

        // 2) Filter for Broncos **and** NFL league (`l:28`) via the category.uid
        const filtered = allWithLinks.filter((article) =>
          article.categories?.some(
            (cat) =>
              cat.type === 'team' &&
              (cat.teamId === TEAM_ID || cat.team?.id === TEAM_ID) &&
              cat.uid?.includes(`~l:28~t:${TEAM_ID}`)
          )
        )

        if (filtered.length) {
          setArticles(filtered)
          setFallback(false)
        } else {
          // No Broncos articles: show all NFL news (with links)
          setArticles(allWithLinks)
          setFallback(true)
        }
      } catch (e) {
        console.error(e)
        setError('Failed to load Broncos news.')
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [])

  if (loading) {
    return (
      <div className="max-w-sm mx-auto bg-white shadow rounded-lg p-6 text-center">
        <p className="text-gray-500">Loading Broncos news…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-sm mx-auto bg-white shadow rounded-lg p-6 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (!articles.length) {
    return (
      <div className="max-w-sm mx-auto bg-white shadow rounded-lg p-6 text-center">
        <p className="text-gray-500">No news available.</p>
      </div>
    )
  }

  const Heading = headingLevel
  const ArticleHeading = articleHeadingLevel

  return (
    <div>
      <Heading className="text-4xl font-bold mb-6 text-white text-shadow-orange-500/90 text-shadow-lg">
        {isFallback ? 'NFL News' : 'Broncos News'}
      </Heading>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 h-full md:auto-rows-fr">
        {articles.map((article) => {
          const imgUrl = article.images?.[0]?.url || ''
          const pubDate = fmtDate(new Date(article.published))
          const link = safeHref(article)

          // Extra safety (shouldn't happen due to filtering)
          if (!link) return null

          return (
            <a
              key={article.id || link}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col h-full">
                {imgUrl && (
                  <img
                    src={imgUrl}
                    alt={article.headline}
                    className="w-full h-48 object-cover flex-shrink-0"
                    onError={(e) => {
                      // If an image 406/403s, just hide it; don't break layout
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                )}

                <div className="p-4 flex flex-col flex-grow">
                  <p
                    className="text-xl font-semibold text-gray-800 text-right mb-2"
                    style={{ color: '#1F2937' }}
                  >
                    {pubDate}
                  </p>

                  <ArticleHeading className="text-lg font-bold text-gray-800 mb-2">
                    {article.headline}
                  </ArticleHeading>

                  <p className="text-gray-600 flex-grow">{article.description}</p>
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
```

## `src/components/DenverNuggetsNews.jsx`

```jsx
// src/components/DenverNuggetsNews.jsx
import React, { useState, useEffect } from 'react'
import espn from '../api/espnApi'

// NOTE: TEAM_ID = 7 is almost certainly NOT the Nuggets on ESPN (7 is commonly Broncos/NFL Denver).
// Leaving as-is since you didn’t ask to change it.
const TEAM_ID = 7 // Nuggets

export default function DenverNuggetsNews({ headingLevel = 'h2', articleHeadingLevel = 'h3' }) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFallback, setFallback] = useState(false)

  function fmtDate(date) {
    const [yyyy, mm, dd] = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Denver',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
      .format(date)
      .split('-')
    return `${mm}-${dd}`
  }

  function safeHref(article) {
    const href =
      article?.links?.web?.href ||
      article?.links?.api?.news?.href ||
      article?.link ||
      article?.url ||
      null

    if (!href || typeof href !== 'string') return null

    if (/^https?:\/\//i.test(href) || /^\/\//.test(href)) return href
    if (href.startsWith('/')) return `https://www.espn.com${href}`

    return null
  }

  useEffect(() => {
    async function loadNews() {
      setLoading(true)
      setError(null)

      try {
        const res = await espn.get('/sports/basketball/nba/news', {
          params: { lang: 'en', region: 'us', limit: 8 },
        })

        const all = Array.isArray(res?.data?.articles) ? res.data.articles : []

        // Keep only articles that have a usable link (prevents href crashes)
        const allWithLinks = all.filter((a) => !!safeHref(a))

        const filtered = allWithLinks.filter((article) =>
          article.categories?.some(
            (cat) =>
              cat.type === 'team' &&
              (cat.teamId === TEAM_ID || cat.team?.id === TEAM_ID)
          )
        )

        if (filtered.length) {
          setArticles(filtered)
          setFallback(false)
        } else {
          setArticles(allWithLinks)
          setFallback(true)
        }
      } catch (e) {
        console.error(e)
        setError('Failed to load Nuggets news.')
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [])

  if (loading) {
    return (
      <div className="max-w-sm mx-auto bg-white shadow rounded-lg p-6 text-center">
        <p className="text-gray-500">Loading Nuggets news…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-sm mx-auto bg-white shadow rounded-lg p-6 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (!articles.length) {
    return (
      <div className="max-w-sm mx-auto bg-white shadow rounded-lg p-6 text-center">
        <p className="text-gray-500">No news available.</p>
      </div>
    )
  }

  const Heading = headingLevel
  const ArticleHeading = articleHeadingLevel

  return (
    <div>
      <Heading className="text-4xl font-bold mb-6 text-white text-shadow-amber-700/90 text-shadow-lg">
        {isFallback ? 'NBA News' : 'Nuggets News'}
      </Heading>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 h-full gap-6 md:auto-rows-fr">
        {articles.map((article) => {
          const imgUrl = article.images?.[0]?.url || ''
          const pubDate = fmtDate(new Date(article.published))
          const link = safeHref(article)

          // Extra safety (shouldn't happen due to filtering)
          if (!link) return null

          return (
            <a
              key={article.id || link}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col h-full">
                {imgUrl && (
                  <img
                    src={imgUrl}
                    alt={article.headline}
                    className="w-full h-48 object-cover text-md flex-shrink-0"
                    onError={(e) => {
                      // If an image 406/403s, just hide it; don't break layout
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                )}

                <div className="p-4 flex flex-col flex-grow">
                  <p
                    className="text-xl font-semibold text-gray-800 text-right mb-2"
                    style={{ color: '#1F2937' }}
                  >
                    {pubDate}
                  </p>

                  <ArticleHeading className="text-lg font-bold text-gray-800 mb-2">
                    {article.headline}
                  </ArticleHeading>

                  <p className="text-gray-600 flex-grow">{article.description}</p>
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
```

## `src/components/Facts.jsx`

```jsx
// src/Facts.jsx
import React, { useState } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaCheck } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import broncosLogo from '../assets/broncos.png';
import avsLogo from '../assets/avs.png';
import mammothLogo from '../assets/mammoth.png';
import nuggetsLogo from '../assets/Nuggets.png';

import broncosBg from '../assets/broncosbackground2.jpg';
import avsBg from '../assets/avsbackground.jpg';
import mammothBg from '../assets/mammothbackground.png';
import nuggetsBg from '../assets/denver-nuggets-logo-3840x2160-11719.jpg';

export default function Facts({ headingLevel = 'h3' }) {
    const [activeSlide, setActiveSlide] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        arrows: false,
        adaptiveHeight: true,
        beforeChange: (_, newIndex) => setActiveSlide(newIndex),
    };

    // Framer Motion variants for staggering
    const container = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
    };
    const item = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const slides = [
        {
            title: 'Denver Broncos',
            titleColor: '#FB4F14',
            bg: broncosBg,
            logo: broncosLogo,
            stats: [
                '16 Division Championships',
                '24 Playoff Appearances',
                '8 Conference Titles',
                '3 Super Bowl Championships',
            ],
            bullets: [
                '15 Hall-of-Famers (* are enshrined as Broncos) — John Elway*, Floyd Little*, Shannon Sharpe*, Terrell Davis*, Champ Bailey*, Steve Atwater*, Pat Bowlen*, Willie Brown, Brian Dawkins, Tony Dorsett, Randy Gradishar*, Ty Law, John Lynch, Peyton Manning*, DeMarcus Ware, Gary Zimmerman*',
                'Have sold out every home game since 1970 (longest sellout streak in the 4 major professional sports)',
            ],
        },
        {
            title: 'Colorado Avalanche',
            titleColor: '#236192',
            bg: avsBg,
            logo: avsLogo,
            stats: [
                '12 Division Championships',
                "3 President's Trophies",
                '29 Playoff Appearances',
                '3 Conference Titles',
                '3 Stanley Cup Championships',
            ],
            bullets: [
                '6 Hall-of-Famers — Ray Bourque, Joe Sakic, Patrick Roy, Peter Forsberg, etc.',
                'Won 3 Stanley Cups (including their first season in Colorado) - (3–0 in Finals)',
            ],
        },
        {
            title: 'Denver Nuggets',
            titleColor: '#FEC524',
            bg: nuggetsBg,
            logo: nuggetsLogo,
            stats: [
                '3 MVPs (2021, 2022, 2024)',
                '12 Division Titles',
                '32 Playoff Appearances',
                '1 Conference Title',
                '1 NBA Championship',
            ],
            bullets: [
                '7 Retired Numbers — 2, 12, 33, 40, 44, 55, 432',
                'Won their first NBA Championship in 2023',
            ],
        },
        {
            title: 'Colorado Mammoth',
            titleColor: '#B0B6BB',
            bg: mammothBg,
            logo: mammothLogo,
            stats: [
                '3 Division Titles',
                '18 Playoff Appearances',
                '2 Conference Titles',
                '2 NLL Championships',
                '2nd in NLL for Attendance',
            ],
            bullets: [
                '4 Hall-of-Famers — Gary Gait, Paul Gait, Dan Stroup, Pat Coyle',
                'Both titles clinched on the road vs. Buffalo Bandits',
                'Have averaged 14,077 fans per game since moving to Denver - 2nd in the league over the last 3 seasons',
            ],
        },
    ];

    // Use the active slide's titleColor for the shadow
    const shadowColor = slides[activeSlide].titleColor;
    const Heading = headingLevel;

    return (
        <div className="md:max-w-4xl mw-2xl mx-auto py-12">
            {/* Wrapper with dynamic colored shadow */}
            <div
                className="rounded-2xl overflow-hidden"
                style={{ boxShadow: `0 0 20px ${shadowColor}` }}
            >
                <Slider {...settings}>
                    {slides.map(({ title, titleColor, bg, logo, stats, bullets }, idx) => {
                        const isActive = idx === activeSlide;
                        return (
                            <div key={title} className="relative md:h-[500px] bg-black/80">
                                {/* Background image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                    style={{ backgroundImage: `url(${bg})` }}
                                />
                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-black/70" />

                                {/* Slide content */}
                                <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8 text-white">
                                    <div className="md:text-center">
                                        <img
                                            src={logo}
                                            alt={`${title} Logo`}
                                            className="w-16 h-auto mx-auto mb-4"
                                        />
                                        <Heading
                                            className="text-5xl font-bold mb-8"
                                            style={{ color: titleColor }}
                                        >
                                            {title}
                                        </Heading>

                                        {/* Stats with staggered animation */}
                                        <motion.div
                                            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 md:pl-10 contain-content"
                                            variants={container}
                                            initial="hidden"
                                            animate={isActive ? 'visible' : 'hidden'}
                                        >
                                            {stats.map(s => (
                                                <motion.div
                                                    key={s}
                                                    className="flex text-left md:items-center text-xl font-semibold"
                                                    variants={item}
                                                >
                                                    <FaCheck className="mr-3 flex-shrink-0" style={{ color: titleColor }} />
                                                    <span>{s}</span>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    </div>

                                    {/* Bullets with staggered animation */}
                                    <motion.ul
                                        className="md:pl-6 md:space-y-4 text-lg text-left"
                                        variants={container}
                                        initial="hidden"
                                        animate={isActive ? 'visible' : 'hidden'}
                                    >
                                        {bullets.map(b => (
                                            <motion.li
                                                key={b}
                                                variants={item}
                                                className="flex items-start"
                                            >
                                                <FaStar className="mt-1 mr-3 flex-shrink-0" style={{ color: titleColor }} />
                                                <span>{b}</span>
                                            </motion.li>
                                        ))}
                                    </motion.ul>

                                </div>
                            </div>
                        );
                    })}
                </Slider>
            </div>
        </div>
    );
}
```

## `src/components/HeadTags.jsx`

```jsx
import { Helmet } from 'react-helmet-async';
import {
  SITE_CONFIG,
  buildSchemaGraph,
  toAbsoluteUrl,
} from '../seo/siteMetadata.js';

export default function HeadTags({ metadata }) {
  const canonicalUrl = toAbsoluteUrl(metadata.canonicalPath);
  const imageUrl = toAbsoluteUrl(metadata.image || SITE_CONFIG.defaultImage);
  const imageAlt = metadata.imageAlt || SITE_CONFIG.defaultImageAlt;
  const robots = metadata.indexable
    ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    : 'noindex, nofollow, noarchive';

  return (
    <Helmet prioritizeSeoTags>
      <html lang={SITE_CONFIG.language} />
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="author" content={SITE_CONFIG.author} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content={SITE_CONFIG.locale} />
      <meta property="og:site_name" content={SITE_CONFIG.name} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta
        property="og:image:width"
        content={String(SITE_CONFIG.defaultImageWidth)}
      />
      <meta
        property="og:image:height"
        content={String(SITE_CONFIG.defaultImageHeight)}
      />
      <meta property="og:image:alt" content={imageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE_CONFIG.twitterHandle} />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />

      <script type="application/ld+json">
        {JSON.stringify(buildSchemaGraph(metadata))}
      </script>
    </Helmet>
  );
}
```

## `src/components/LeagueVideos.jsx`

```jsx
// src/components/LeagueVideos.jsx
import React from 'react';
import DenverNuggetsVideos     from './DenverNuggetsVideos';
import DenverBroncosVideos     from './DenverBroncosVideos';
import ColoradoAvalancheVideos from './ColoradoAvalancheVideos';
import ColoradoMammothVideos from './ColoradoMammothVideos';
import ScrollToTopArrow        from '../utilities/scrollToTopArrow';
import nflBanner               from '../assets/nflbanner.png';
import nhlBanner               from '../assets/nhlbanner.png';
import nbaBanner               from '../assets/nbabanner.png';
import nllBanner               from '../assets/nllbanner.png';
import '../App.css';

export default function LeagueVideos() {
  const sections = [
    {
      title: 'Denver Nuggets',
      Banner: nbaBanner,
      bannerClass: 'object-center',
      Component: <DenverNuggetsVideos />,
    },
    {
      title: 'Denver Broncos',
      Banner: nflBanner,
      bannerClass: 'object-center',
      Component: <DenverBroncosVideos />,
    },
    {
      title: 'Colorado Avalanche',
      Banner: nhlBanner,
      bannerClass: 'object-center',
      Component: <ColoradoAvalancheVideos />,
    },
    {
      title: 'Colorado Mammoth',
      Banner: nllBanner,
      bannerClass: 'object-center',
      Component: <ColoradoMammothVideos />,
    },
  ];

  return (
    <>
      {/* Page Title */}
      <div className="py-12">
        <h1 className="text-4xl font-extrabold text-white text-center text-shadow-slate-500/70 text-shadow-lg">
          Latest League Videos
        </h1>
      </div>

      {/* Sections */}
      {sections.map(({ title, Banner, bannerClass, Component }) => (
        <section key={title} className="mb-16">
          <h2 className="sr-only">{title} videos</h2>

          {/* full-width banner image */}
          <div className="relative left-1/2 -translate-x-1/2 w-screen">
            <img
              src={Banner}
              alt={`${title} banner`}
              className={`w-full h-[200px] md:h-[250px] object-cover ${bannerClass} shadow-blue-900/80 shadow-lg`}
            />
          </div>

          {/* full-width translucent background */}
          <div className="relative left-1/2 -translate-x-1/2 w-screen bg-blue-700/30 py-10">
            {/* constrained inner container */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* <h3 className="text-2xl font-semibold text-white mb-6">{title}</h3> */}
              <div className="grid gap-6">
                {Component}
              </div>
            </div>
          </div>
        </section>
      ))}

      <ScrollToTopArrow />
    </>
  );
}
```

## `src/components/Standings.jsx`

```jsx
import React, { useState, useEffect } from 'react';

const Standings = () => {
  const [teamRecords, setTeamRecords] = useState({});

  useEffect(() => {
    Promise.all([
      fetch('https://www.thesportsdb.com/api/v2/json/60130162/livescore.php?s=Ice_Hockey'),
      fetch('https://www.thesportsdb.com/api/v2/json/60130162/livescore.php?l=4391'),
      fetch('https://www.thesportsdb.com/api/v2/json/60130162/livescore.php?s=Basketball'),
    ])
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(dataArrays => {
        let newRecords = {};
        dataArrays.forEach((data, index) => {
          if (index === 0) { // Assuming index 0 is for Colorado Avalanche
            newRecords['Colorado Avalanche'] = processAvalancheRecord(data.events);
          } else if (index === 1) { // Assuming index 1 is for Denver Broncos
            newRecords['Denver Broncos'] = processBroncosRecord(data.events);
          } else if (index === 2) { // Assuming index 1 is for Denver Broncos
            newRecords['Denver Nuggets'] = processNuggetsRecord(data.events);
          }
          // Add other teams as needed
        });
        setTeamRecords(newRecords);
      })
      .catch(err => {
        console.error('Error fetching team records:', err);
      });
  }, []);


  
  const processAvalancheRecord = (events) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of the day

    return events.filter(event => {
      const eventDate = new Date(event.dateEvent);
      return eventDate.getDate() === today.getDate() &&
             (event.strHomeTeam === 'Colorado Avalanche' || event.strAwayTeam === 'Colorado Avalanche');
    }).map(event => {
      return {
        date: formatDate(event.dateEvent),
        homeTeam: event.strHomeTeam,
        awayTeam: event.strAwayTeam,
        homeScore: event.intHomeScore,
        awayScore: event.intAwayScore,
        imageHome: event.strHomeTeamBadge,
        imageAway: event.strAwayTeamBadge
      };
    });
  };

  const processBroncosRecord = (events) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of the day

    return events.filter(event => {
      const eventDate = new Date(event.dateEvent);
      return eventDate.getDate() === today.getDate() &&
             (event.strHomeTeam === 'Denver Broncos' || event.strAwayTeam === 'Denver Broncos');
    }).map(event => {
      return {
        date: formatDate(event.dateEvent),
        homeTeam: event.strHomeTeam,
        awayTeam: event.strAwayTeam,
        homeScore: event.intHomeScore,
        awayScore: event.intAwayScore,
        imageHome: event.strHomeTeamBadge,
        imageAway: event.strAwayTeamBadge
      };
    });
  };
  const processNuggetsRecord = (events) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of the day

    return events.filter(event => {
      const eventDate = new Date(event.dateEvent);
      return eventDate.getDate() === today.getDate() &&
        (event.strHomeTeam === 'Denver Nuggets' || event.strAwayTeam === 'Denver Nuggets');
    }).map(event => {
      return {
        date: formatDate(event.dateEvent),
        homeTeam: event.strHomeTeam,
        awayTeam: event.strAwayTeam,
        homeScore: event.intHomeScore,
        awayScore: event.intAwayScore,
        imageHome: event.strHomeTeamBadge,
        imageAway: event.strAwayTeamBadge
      };
    });
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderTeamRecord = (team, records) => {
    if (records.length === 0) {
      return <p className='results-block'>There are no games for the {team} today.</p>;
    }
    return (
      <div>
        {/* <h2>{team}</h2> */}
        {records.map(record => (
          <div key={record.date}>
            <img className='logo-home' src={record.imageHome} alt={`${team} game`} />
            <div className='results-block'>
              {record.homeTeam} <p>{record.homeScore}</p>
            </div>
            <img className='logo-home' src={record.imageAway} alt={`${team} game`} />
            <div className='results-block'>
              {record.awayTeam}<p>{record.awayScore}</p>
            </div>
            <div className='date-block'>
              <p>{record.date}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {Object.keys(teamRecords).map(team => (
        <div className={`card-standings header-style-home-${team.toLowerCase().replace(' ', '-')} col-md-4`} key={team}>
          <ul className='record-text'>
            {teamRecords[team] ? (
              renderTeamRecord(team, teamRecords[team])
            ) : (
              <p>Loading {team} record...</p>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Standings;
```

## `src/components/VideoHighlights.jsx`

```jsx
// src/components/VideoHighlights.jsx
import React from 'react'
import '../index.css'
import '../App.css'


import broncosBg  from '../assets/broncosVidBg.png'
import avsBg      from '../assets/avsVidBg.png'
import nuggetsBg  from '../assets/nuggetsVidBg.png'
import mammothBg from '../assets/mammothVidBg.png'

/** Single video embed + optional description */
function VideoEmbed({ embedHtml, description }) {
  return (
    <div className="video-item text-center">
      <div
        className="video-iframe-wrapper"
        dangerouslySetInnerHTML={{ __html: embedHtml }}
      />
      {description && (
        <p className="mt-2 text-sm text-white">
          {description}
        </p>
      )}
    </div>
  )
}

export default function VideoHighlights() {
  const broncosVideos = [
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/XCE8jf7Iil4?si=62RkpPaibb8phz_J" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: 'Von Miller strip sack for the TD in Super Bowl 50',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/BuL1QaVXUpM?si=_elvJt81HfD9jA71" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: 'John Elway leads Denver to a win in Super Bowl XXXII with the famous "helicopter play"',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/xPa_FWrIL6Q?si=AcFf6RVoXcTecAlC" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: '"The Drive" quickly becomes legend as the Broncos win the 1986 AFC Championship in epic fashion',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/fkk6WZnUNfo?si=o4aKHietUw3CBGyL" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: 'The Broncos use "The Fumble" to hang on and win the 1987 AFC Championship',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Yh68klo7OrA?si=dtNmUYsdJ8HORzt1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: 'Demaryius Thomas walks off the Steelers in OT to win the 2011 AFC Wildcard game',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/jQDPCY4ZD6I?si=xPvyd69I3s-EFpTk" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: 'John Elway leads incredible 15-point comeback to beat the Tennessee Titans in the 1991 AFC Divisional Playoff',
    },
  ]

  const avsVideos = [
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/-f8_1AwNeTk?si=g8dQFcsvsq1iPtAP&amp;start=63" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: 'From their move to Denver in 1996 to earning the city’s first pro sports championship that same season - relive the 1996 drive to the Stanley Cup',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/RHox0QhOG-s?si=9pHxv-fM7Iz48OPy&amp;start=63" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: 'Recapping the epic 2001 Stanley Cup Championship run that earned Ray Bourque his elusive Stanley Cup',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/84fHrT0Y_C4?si=TWaqu_G3_AOWLFk8&amp;start=63" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: 'For the first time since 2001, the Avalanche return to the top of the NHL. Relive the 2022 Stanley Cup Championship run to earn the Avs their 3rd Stanley Cup',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/vJlCdIOWkYM?si=d1Xmt8guftmaZzwE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: 'In an epic rivalry riddled with great moments, no one will ever forget the infamous goalie brawl between Patrick Roy and Chris Osgood',
    },
  ]

  const nuggetsVideos = [
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/pif3R6BeCWs?si=Txc0-5LyL75-UYEa" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: 'The final moments of the historic Game 5 in 2023 that earned the Nuggets their first ever NBA Championship',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/inCcQgcWmY8?si=o6gtR0q39PG1gh1n" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: 'Jamal Murray’s two game-winning shots in the 2024 NBA Playoffs to help knock out the Lakers',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/LEoCn0qB5tk?si=tuZTqBcJXwQwaE17" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: 'Aaron Gordon’s INSANE buzzer-beater dunk in Game 5 of the 2025 NBA Playoffs',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/VXA8RLzMMdM?si=bsCbzNaKxv68XRfW" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: 'The final moments of an extraordinary Game 1 of the 2025 Western Conference Semifinals… capped off by another Aaron Gordon game winner',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/gEQgHW_3vOQ?si=SNWqQPHn5MwZlnvZ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: 'One of the greatest moments for the Nuggets in the 1990s, Dikembe Mutombo celebrates the Nuggets becoming the 1st 8-seed to ever beat a 1-seed as they upset Seattle',
    },
  ]
  const mammothVideos = [
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/FOBZnManJxw?si=YoaD2tYHQGMcERUp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      description: 'One of the most exciting moments to see live, the epic hit laid out by Mammoth backup goaltender Alex Buque versus the rival Roughnecks',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/g0r_-EokxOY?si=Nomao6DoOtBNSxdj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      description: 'The final seconds and celebration of the Mammoth securing their 2nd NLL Cup - once again on the road in Buffalo',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/8l4mbaKkzFY?si=nIEDq_xB7mlfMwES" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      description: 'Mammoth superstar Adam Jones securing a sock trick with 6 goals in the 4th quarter in a game against Vancouver',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/fE0lPgjoPEo?si=LUNCDDX97qbxGl3T" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      description: 'Amazing behind the net dunk goal for Drew Westervelt against Vancouver',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/rejchmYEamw?si=9nNZs5oZY-PK_UUx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      description: 'Mammoth Hall of Famer John Grant Jr. scoring a clutch game winner versus the Georgia Swarm',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/W26eqHyw9Z8?si=1v-z0FUcdwXuvDpD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      description: 'Just one of many game winners from Mammoth Hall of Famer John Grant Jr. - this one to win it in OT',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/nBEvwTmxAYw?si=vHncIanKaO4ajkUu" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      description: 'Mammoth fan favorite Eli McLaughlin scores 5 goals and leads the team past San Diego and into the NLL Finals in 2022',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/5bsZlAA8Hqc?si=zE2SZ9vCYKqQjx8L" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      description: 'Full highlights from one of the most incredible comebacks in Mammoth history as they score 7 unanswered goals in the 4th to win in overtime',
    },
  ]

  return (
    <>
    <div className='font-bold pt-20 md:text-lg text-center'>
        <h1 className='text-4xl text-shadow-lg text-shadow-amber-500/50'>Memorable Moments in Colorado Sports</h1>
    </div>
      {/* Broncos Section */}
      <section className="relative left-1/2 -translate-x-1/2 w-screen bg-[#FB4F14]/50 text-white mt-20">
        <h2 className="sr-only">Denver Broncos memorable moments</h2>
        <img
          src={broncosBg}
          alt="Denver Broncos banner"
          className="w-full h-[250px] object-cover shadow-amber-500/60 shadow-lg"
        />
        <div className="py-12 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {broncosVideos.map((v, i) => (
              <VideoEmbed key={i} {...v} />
            ))}
          </div>
        </div>
      </section>

      {/* Avalanche Section */}
      <section className="relative left-1/2 -translate-x-1/2 w-screen bg-[#236192]/50 text-white mt-20">
        <h2 className="sr-only">Colorado Avalanche memorable moments</h2>
        <img
          src={avsBg}
          alt="Colorado Avalanche banner"
          className="w-full h-[250px] object-cover shadow-blue-500/60 shadow-lg"
        />
        <div className="py-12 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {avsVideos.map((v, i) => (
              <VideoEmbed key={i} {...v} />
            ))}
          </div>
        </div>
      </section>

      {/* Nuggets Section */}
      <section className="relative left-1/2 -translate-x-1/2 w-screen bg-[#FEC524]/50 text-white mt-20">
        <h2 className="sr-only">Denver Nuggets memorable moments</h2>
        <img
          src={nuggetsBg}
          alt="Denver Nuggets banner"
          className="w-full h-[250px] object-cover shadow-yellow-500/60 shadow-lg"
        />
        <div className="py-12 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {nuggetsVideos.map((v, i) => (
              <VideoEmbed key={i} {...v} />
            ))}
          </div>
        </div>
      </section>
      {/* Nuggets Section */}
      <section className="relative left-1/2 -translate-x-1/2 w-screen bg-[#B0B6BB]/50 text-white mt-20">
        <h2 className="sr-only">Colorado Mammoth memorable moments</h2>
        <img
          src={mammothBg}
          alt="Colorado Mammoth banner"
          className="w-full h-[250px] object-cover shadow-red-500/60 shadow-lg"
        />
        <div className="py-12 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mammothVideos.map((v, i) => (
              <VideoEmbed key={i} {...v} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

## `src/main.jsx`

```jsx
// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';     // ← pull in Tailwind here

import { HelmetProvider } from 'react-helmet-async';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import Nav               from './Nav.jsx';
import App               from './App.jsx';
import Facts             from './components/Facts.jsx';
import News              from './components/News.jsx';
import Standings         from './components/Standings.jsx';
import LeagueVideos      from './components/LeagueVideos.jsx';
import ScrollToTopArrow  from './utilities/scrollToTopArrow.jsx';
import VideoHighlightComponent from './components/VideoHighlights.jsx';
import HeadTags from './components/HeadTags.jsx';
import Footer from './Footer.jsx';
import {
  NOT_FOUND_METADATA,
  getRouteMetadata,
} from './seo/siteMetadata.js';

function SeoRoute({
  routePath,
  children,
  includeHiddenHeading = true,
}) {
  const metadata = getRouteMetadata(routePath);

  return (
    <>
      <HeadTags metadata={metadata} />
      {includeHiddenHeading && (
        <h1 className="sr-only">{metadata.heading}</h1>
      )}
      {children}
    </>
  );
}

function NotFound() {
  return (
    <>
      <HeadTags metadata={NOT_FOUND_METADATA} />
      <section className="min-h-[60vh] flex flex-col items-center justify-center py-24 text-center">
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p>The page you requested does not exist.</p>
      </section>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <Nav />
        <main id="main-content" className="max-w-6xl mx-auto px-4">
          <Routes>
            <Route
              path="/"
              element={(
                <SeoRoute routePath="/" includeHiddenHeading={false}>
                  <App />
                </SeoRoute>
              )}
            />
            <Route
              path="/facts"
              element={(
                <SeoRoute routePath="/facts">
                  <Facts headingLevel="h2" />
                </SeoRoute>
              )}
            />
            <Route
              path="/news"
              element={(
                <SeoRoute routePath="/news">
                  <News />
                </SeoRoute>
              )}
            />
            <Route
              path="/standings"
              element={(
                <SeoRoute routePath="/standings">
                  <Standings />
                </SeoRoute>
              )}
            />
            <Route
              path="/leaguevideos"
              element={(
                <SeoRoute routePath="/leaguevideos" includeHiddenHeading={false}>
                  <LeagueVideos />
                </SeoRoute>
              )}
            />
            <Route
              path="/videohighlights"
              element={(
                <SeoRoute routePath="/videohighlights" includeHiddenHeading={false}>
                  <VideoHighlightComponent />
                </SeoRoute>
              )}
            />
            <Route path="/videos" element={<Navigate to="/leaguevideos/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <ScrollToTopArrow />
        <Footer />
      </Router>
    </HelmetProvider>
  </React.StrictMode>
);
```

## `src/seo/siteMetadata.js`

```javascript
export const SITE_CONFIG = {
  name: 'Mile High Mashup',
  url: 'https://milehighmashup.com',
  language: 'en',
  locale: 'en_US',
  author: 'Mile High Mashup',
  twitterHandle: '@MileHiRocks5280',
  defaultImage: '/og-default.jpg',
  defaultImageAlt: 'Mile High Mashup Denver sports coverage',
  defaultImageWidth: 1200,
  defaultImageHeight: 630,
  logo: '/logo-black.png',
  socialProfiles: [
    'https://twitter.com/MileHiRocks5280',
    'https://www.youtube.com/@MileHiMayhem303',
    'https://www.instagram.com/MileHiRocks5280/',
  ],
};

export const ROUTE_METADATA = {
  '/': {
    path: '/',
    canonicalPath: '/',
    title: 'Denver Sports News, Scores & Highlights | Mile High Mashup',
    description:
      'Follow Denver Broncos, Nuggets, Colorado Avalanche and Colorado Mammoth news, scores, videos and memorable moments.',
    heading: 'Denver Sports News, Scores and Highlights',
    schemaType: 'WebPage',
    changeFrequency: 'daily',
    priority: '1.0',
    indexable: true,
  },
  '/facts': {
    path: '/facts',
    canonicalPath: '/facts/',
    title: 'Denver Sports Facts & Team History | Mile High Mashup',
    description:
      'Explore Denver Broncos, Nuggets, Colorado Avalanche and Colorado Mammoth facts, championships, records and team history.',
    heading: 'Denver Sports Facts and Team History',
    schemaType: 'CollectionPage',
    changeFrequency: 'monthly',
    priority: '0.7',
    indexable: true,
  },
  '/news': {
    path: '/news',
    canonicalPath: '/news/',
    title: 'Denver Sports News: Broncos, Nuggets, Avs & Mammoth',
    description:
      'Read the latest Denver Broncos, Nuggets, Colorado Avalanche and Colorado Mammoth headlines, updates and team news.',
    heading: 'Latest Denver Sports News',
    schemaType: 'CollectionPage',
    changeFrequency: 'hourly',
    priority: '0.9',
    indexable: true,
  },
  '/standings': {
    path: '/standings',
    canonicalPath: '/standings/',
    title: 'Denver Sports Scores & Team Records | Mile High Mashup',
    description:
      'Check recent scores and current team records for the Denver Broncos, Nuggets, Colorado Avalanche and Colorado Mammoth.',
    heading: 'Denver Sports Scores and Team Records',
    schemaType: 'WebPage',
    changeFrequency: 'daily',
    priority: '0.7',
    indexable: true,
  },
  '/leaguevideos': {
    path: '/leaguevideos',
    canonicalPath: '/leaguevideos/',
    title: 'Denver Sports Videos & Highlights | Mile High Mashup',
    description:
      'Watch recent Denver Broncos, Nuggets, Colorado Avalanche and Colorado Mammoth videos, highlights and team coverage.',
    heading: 'Latest Denver Sports Videos',
    schemaType: 'CollectionPage',
    changeFrequency: 'daily',
    priority: '0.8',
    indexable: true,
  },
  '/videohighlights': {
    path: '/videohighlights',
    canonicalPath: '/videohighlights/',
    title: 'Classic Denver Sports Moments | Mile High Mashup',
    description:
      'Relive memorable Broncos, Nuggets, Avalanche and Mammoth plays, championships, comebacks and classic Colorado sports moments.',
    heading: 'Memorable Moments in Colorado Sports',
    schemaType: 'CollectionPage',
    changeFrequency: 'monthly',
    priority: '0.7',
    indexable: true,
  },
};

export const NOT_FOUND_METADATA = {
  path: '/404',
  canonicalPath: '/404.html',
  title: 'Page Not Found | Mile High Mashup',
  description: 'The requested Mile High Mashup page could not be found.',
  heading: 'Page Not Found',
  schemaType: 'WebPage',
  indexable: false,
};

export function normalizeRoutePath(pathname = '/') {
  if (!pathname || pathname === '/') return '/';

  const normalized = pathname.split('?')[0].split('#')[0].replace(/\/+$/, '');
  return normalized || '/';
}

export function getRouteMetadata(pathname = '/') {
  return ROUTE_METADATA[normalizeRoutePath(pathname)] || NOT_FOUND_METADATA;
}

export function getIndexableRoutes() {
  return Object.values(ROUTE_METADATA).filter((route) => route.indexable);
}

export function toAbsoluteUrl(path = '/') {
  return new URL(path, `${SITE_CONFIG.url}/`).toString();
}

export function buildSchemaGraph(metadata) {
  const canonicalUrl = toAbsoluteUrl(metadata.canonicalPath);
  const imageUrl = toAbsoluteUrl(metadata.image || SITE_CONFIG.defaultImage);
  const organizationId = `${SITE_CONFIG.url}/#organization`;
  const websiteId = `${SITE_CONFIG.url}/#website`;
  const webpageId = `${canonicalUrl}#webpage`;

  const graph = [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: SITE_CONFIG.name,
      url: `${SITE_CONFIG.url}/`,
      logo: {
        '@type': 'ImageObject',
        url: toAbsoluteUrl(SITE_CONFIG.logo),
      },
      sameAs: SITE_CONFIG.socialProfiles,
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${SITE_CONFIG.url}/`,
      name: SITE_CONFIG.name,
      description: ROUTE_METADATA['/'].description,
      publisher: { '@id': organizationId },
      inLanguage: SITE_CONFIG.language,
    },
    {
      '@type': metadata.schemaType || 'WebPage',
      '@id': webpageId,
      url: canonicalUrl,
      name: metadata.title,
      description: metadata.description,
      isPartOf: { '@id': websiteId },
      about: { '@id': organizationId },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: imageUrl,
        width: SITE_CONFIG.defaultImageWidth,
        height: SITE_CONFIG.defaultImageHeight,
      },
      inLanguage: SITE_CONFIG.language,
    },
  ];

  if (metadata.path !== '/' && metadata.indexable) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_CONFIG.url}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: metadata.heading,
          item: canonicalUrl,
        },
      ],
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
```

## `vite.config.js`

```javascript
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { getRouteMetadata } from './src/seo/siteMetadata.js'
import { renderSeoBlock } from './scripts/seoHtml.js'

function seoHtmlPlugin() {
  return {
    name: 'mile-high-mashup-seo-html',
    transformIndexHtml(html) {
      return html.replace(
        '<!-- SEO_TAGS -->',
        renderSeoBlock(getRouteMetadata('/'))
      )
    },
  }
}

export default defineConfig(({ mode }) => {
  // load your .env vars
  const env = loadEnv(mode, process.cwd())
  const API_KEY = env.VITE_API_SPORTS_KEY
  if (!API_KEY) {
    console.warn('[vite.config] Missing VITE_API_SPORTS_KEY')
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      seoHtmlPlugin(),
    ],
    server: {
      port: 5173,
      proxy: {
        // 1) ESPN proxy (yours already)
        '/api/espn': {
          target: 'https://site.api.espn.com',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api\/espn/, '/apis/site/v2/sports'),
        },
        // 2) Payload CMS proxy
        //    your React code can now fetch('/cms-api/pages') → http://localhost:3000/api/pages
        '/cms-api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/cms-api/, '/api'),
        },
        // 3) your existing backend
        '/api': {
          target: 'http://localhost:5002',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
```

## `public/og-default.jpg`

- Binary JPEG social preview image
- Dimensions: 1200 × 630 pixels
- File size: 212,524 bytes
- SHA-256: `7f41d98a27933b350033fe8757bd90493507a24f644173a27e4ef4ce9e935f94`
- The complete binary file is included in the updated project ZIP.
