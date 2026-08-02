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
