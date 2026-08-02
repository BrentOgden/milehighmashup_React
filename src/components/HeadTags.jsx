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
