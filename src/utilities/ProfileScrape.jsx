// src/components/ProfileScrape.jsx
import React, { useEffect, useState } from 'react';

export default function ProfileScrape({ handle }) {
  const [tweets, setTweets] = useState(null);

  useEffect(() => {
    fetch(`/api/scrape/${handle}`)
      .then(r => r.json())
      .then(setTweets)
      .catch(() => setTweets([]));
  }, [handle]);

  if (tweets === null) return <p>Loading…</p>;
  if (tweets.length === 0) return <p>No tweets found.</p>;

  return (
    <ul className="space-y-4">
      {tweets.map((t, i) => (
        <li key={i} className="border-b pb-2">
          <p>{t.text}</p>
          <a
            href={t.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            {t.time}
          </a>
        </li>
      ))}
    </ul>
  );
}
