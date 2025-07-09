// src/components/InstagramGrid.jsx
import React, { useEffect, useState } from 'react';
import InstagramEmbed from './InstagramEmbed';

export default function InstagramFeed() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    // load your cached URLs from server
    fetch('/api/instagram/urls')  // implement this route in server if needed
      .then(res => res.json())
      .then(data => setUrls(data))
      .catch(() => setUrls([]));
  }, []);

  if (!urls.length) {
    return <p className="text-center py-12">Loading posts…</p>;
  }

  return (
    <div className="grid grid-cols-1 text-black sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {urls.map(url => (
        <InstagramEmbed key={url} url={url} />
      ))}
    </div>
  );
}
