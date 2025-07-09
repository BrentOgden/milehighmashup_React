// src/components/TwitterFrame.jsx
import React from 'react';

export default function TwitterFrame({
  url,       // full Twitter profile URL
  height = 400,
  width  = '100%',
}) {
  // We’re leveraging twitframe.com which takes any tweet or profile URL
  // and returns an embeddable HTML page.
  const src = `https://twitframe.com/show?url=${encodeURIComponent(url)}`;

  return (
    <iframe
      src={src}
      width={width}
      height={height}
      style={{ border: 'none', overflow: 'hidden' }}
      scrolling="no"
      title={`Twitter feed for ${url}`}
    />
  );
}
