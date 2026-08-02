# Mile High Mashup SEO Audit and Update

Audit date: August 2, 2026  
Canonical domain: `https://milehighmashup.com`

## Executive summary

The project had a solid starting set of homepage tags, but the SEO implementation was effectively homepage-only. Route-level metadata was not mounted, `HelmetProvider` was missing, the sitemap listed only the homepage, the social preview image and schema logo URLs did not resolve to existing assets, and all client-side routes could inherit conflicting homepage canonicals. The project also lacked a true 404 response and contained several heading hierarchy issues.

The update creates one shared SEO source of truth, generates crawlable route-specific HTML during the production build, adds complete route metadata and schema, fixes canonical and social preview conflicts, expands the sitemap, and corrects heading semantics without changing unrelated styling, layout, page copy, component names, data fetching, or interactive behavior.

## Key issues found

1. `HeadTags.jsx` existed but was not used by any route.
2. `HelmetProvider` was not mounted, so `react-helmet-async` could not manage route metadata correctly.
3. Every route received the same homepage title, description, canonical, Open Graph tags, Twitter tags, and schema from `index.html`.
4. The homepage title emphasized videos even though the page covers news, scores, facts, and highlights.
5. The Open Graph image pointed to `/og-default.jpg`, but that file did not exist.
6. Organization schema referenced `/logo.png`, which did not exist.
7. Schema social profiles did not match the social accounts linked in the site footer.
8. The sitemap contained only the homepage and an outdated modification date.
9. The legacy `/videos` route rendered a video component without a `videoId`, creating a thin/broken duplicate URL.
10. The wildcard Netlify rewrite returned the SPA with a `200` status for unknown URLs, creating soft 404s.
11. Several standalone routes had no H1, some pages skipped heading levels, the homepage placed a `<div>` inside an H1, and footer headings began at H4.
12. Static social crawlers could not receive route-specific metadata without executing JavaScript.

## SEO architecture added

- `src/seo/siteMetadata.js` is now the shared source for:
  - Site identity and canonical domain
  - Route titles and descriptions
  - Canonical paths
  - Indexability
  - Schema page types
  - Sitemap frequency and priority values
  - Social accounts and default social image
- `HeadTags.jsx` now generates complete route metadata at runtime.
- `vite.config.js` injects homepage SEO into the built HTML from the shared metadata source.
- `scripts/generate-static-routes.js` creates route-specific HTML entry files after every Vite build, allowing search and social crawlers to receive the correct tags before JavaScript runs.
- Static SEO tags include React Helmet hydration markers to prevent duplicate tags after the app loads.
- `scripts/validate-seo.js` checks metadata uniqueness, title/description lengths, sitemap coverage, robots configuration, redirects, required assets, and generated route HTML.

## Route SEO matrix

| Route | Canonical | Page title | Schema | Indexing |
|---|---|---|---|---|
| `/` | `https://milehighmashup.com/` | Denver Sports News, Scores & Highlights \| Mile High Mashup | WebPage | Index, follow |
| `/facts/` | `https://milehighmashup.com/facts/` | Denver Sports Facts & Team History \| Mile High Mashup | CollectionPage | Index, follow |
| `/news/` | `https://milehighmashup.com/news/` | Denver Sports News: Broncos, Nuggets, Avs & Mammoth | CollectionPage | Index, follow |
| `/standings/` | `https://milehighmashup.com/standings/` | Denver Sports Scores & Team Records \| Mile High Mashup | WebPage | Index, follow |
| `/leaguevideos/` | `https://milehighmashup.com/leaguevideos/` | Denver Sports Videos & Highlights \| Mile High Mashup | CollectionPage | Index, follow |
| `/videohighlights/` | `https://milehighmashup.com/videohighlights/` | Classic Denver Sports Moments \| Mile High Mashup | CollectionPage | Index, follow |
| `/videos` | Redirects to `/leaguevideos/` | N/A | N/A | 301 redirect |
| Unknown routes | Served through `404.html` | Page Not Found \| Mile High Mashup | WebPage | Noindex, nofollow; HTTP 404 |

## Schema updates

Each indexable route now receives a JSON-LD graph containing:

- `Organization`
- `WebSite`
- The route's `WebPage` or `CollectionPage`
- `BreadcrumbList` for non-home routes
- Existing, valid logo and social image URLs
- Social profiles that match the footer links
- Consistent `@id`, publisher, language, image, and canonical references

## Social preview updates

- Added `public/og-default.jpg` at 1200 × 630 pixels.
- Added complete Open Graph image URL, secure URL, dimensions, and alt text.
- Added complete Twitter large-card metadata and image alt text.
- Corrected the Twitter account to `@MileHiRocks5280`.
- Every route receives its own title, description, canonical URL, Open Graph URL, and schema while sharing the branded preview image.

## Crawl and indexation updates

- Expanded `sitemap.xml` from one URL to all six indexable routes.
- Updated sitemap modification dates to August 2, 2026.
- Kept `robots.txt` open to legitimate crawling and linked it to the canonical sitemap.
- Added permanent redirects for both `/videos` and `/videos/`.
- Replaced the catch-all `200` SPA rewrite with a real `404.html` response.
- Standardized canonical URLs and internal navigation on trailing-slash route URLs.

## Heading and semantic updates

- Preserved the visible homepage H1 copy while replacing its invalid nested `<div>` with a block-level `<span>`.
- Added one page-level H1 to every route, using visually hidden headings where adding visible copy would change the design.
- Made facts slide headings context-aware: H3 on the homepage and H2 on the standalone facts route.
- Made team news and article headings context-aware: H3/H4 on the homepage and H2/H3 on the news route.
- Changed standalone video page titles to H1.
- Added H2 section headings to video groups.
- Changed non-heading score/status text from H3 to paragraph elements.
- Changed footer section headings from H4 to H2.
- Added a semantic `<main>` landmark and improved navigation labels.

## Validation performed

- Parsed all 52 JavaScript and JSX source files with Babel parser: passed.
- Ran the custom SEO validator across six indexable routes: passed.
- Generated five route entry files plus homepage and 404 HTML: passed.
- Parsed seven generated HTML files and confirmed exactly one title, description, robots directive, canonical, Open Graph URL, and Twitter card per file: passed.
- Parsed every generated JSON-LD block as valid JSON: passed.
- Confirmed sitemap coverage and exclusion of the redirected legacy route: passed.
- Confirmed `robots.txt` references the canonical sitemap: passed.
- Confirmed redirect and 404 directives: passed.
- Confirmed the social preview image exists at 1200 × 630 pixels: passed.

## Build validation note

A full native Vite production bundle could not be executed in this Linux workspace because the uploaded archive included macOS-specific `node_modules`, and the isolated package registry did not provide the required Linux Rollup binary. The source was instead validated with a full JavaScript/JSX parser, and the complete SEO generation pipeline was executed against generated HTML. The clean deliverable intentionally excludes `node_modules` and the stale pre-existing `dist` directory.

## Local validation and build commands

```bash
npm install
npm run validate:seo
npm run build
npm run preview
```

The updated `npm run build` command runs Vite and then automatically creates the route-specific static HTML files and `404.html`.
