import React, { useEffect, useState } from 'react';

export default function InstagramEmbed({ url }) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    fetch(`/api/instagram/oembed?url=${encodeURIComponent(url)}`)
      .then(res => res.json())
      .then(data => setHtml(data.html || ''))
      .catch(err => {
        console.error('Instagram oEmbed fetch error', err);
        setHtml('');
      });
  }, [url]);

  if (!html) {
    return <div className="aspect-square bg-gray-100 flex items-center justify-center">
      <p className="text-gray-500">Loading…</p>
    </div>;
  }

  return (
    <div
      className="instagram-embed"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
