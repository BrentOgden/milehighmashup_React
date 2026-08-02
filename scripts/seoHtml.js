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
