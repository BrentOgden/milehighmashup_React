// src/components/ColoradoMammothNews.jsx
import React, { useState, useEffect } from 'react';
import espn from '../api/espnApi';

// ESPN’s Broncos team ID (from your schedule JSON)  
const TEAM_ID = 125422;

export default function ColoradoMammothNews() {
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
        // 1) Fetch the NLL news feed
        const res = await espn.get('/sports/lacrosse/nll/news', {
          params: { lang:'en', region:'us', limit: 8 }
        });
        const all = res.data.articles || [];  // :contentReference[oaicite:3]{index=3}

        // 2) Filter for Mammoth **and** NLL league (`l:28`) via the category.uid
        const filtered = all.filter(article =>
          article.categories?.some(cat =>
            cat.type === 'team' &&
            (cat.teamId === TEAM_ID || cat.team?.id === TEAM_ID) &&
            cat.uid?.includes(`~l:28~t:${TEAM_ID}`)
          )
        );

        if (filtered.length) {
          setArticles(filtered);
          setFallback(false);
        } else {
          // No Mammoth articles: show all NLL news
          setArticles(all);
          setFallback(true);
        }
      } catch (e) {
        console.error(e);
        setError('Failed to load Mammoth news.');
      } finally {
        setLoading(false);
      }
    }
    loadNews();
  }, []);

  if (loading) {
    return (
      <div className="max-w-sm mx-auto bg-white shadow rounded-lg p-6 text-center">
        <p className="text-gray-500">Loading Mammoth news…</p>
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

  return (
    <div>
      <h2 className="text-4xl font-bold mb-6 text-white text-shadow-gray-500/90 text-shadow-lg">
        {isFallback ? 'NLL News' : 'Mammoth News'}
      </h2>
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
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {article.headline}
                  </h3>
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
