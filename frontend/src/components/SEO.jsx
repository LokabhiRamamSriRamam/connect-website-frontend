import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Connect Gen AI';
const BASE_URL = 'https://connectgenai.in';
const DEFAULT_IMAGE = `${BASE_URL}/og-default.png`;

export default function SEO({
  title,
  description,
  path = '',
  image = DEFAULT_IMAGE,
  noindex = false,
  siteName = SITE_NAME,
  type = 'website',
  publishedTime,
  modifiedTime,
  section,
  schema,
}) {
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const url = `${BASE_URL}${path}`;
  const graphs = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_IN" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured data */}
      {graphs.map((g, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(g)}
        </script>
      ))}
    </Helmet>
  );
}
