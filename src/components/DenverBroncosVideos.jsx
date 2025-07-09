// src/components/DenverBroncosVideos.jsx
import React, { useState, useEffect } from 'react';
import espn from '../api/espnApi';

const TEAM_ID = 7;

export default function DenverBroncosVideos() {
  const [clips, setClips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function fmtDate(date) {
    const [ , mm, dd ] = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Denver',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date).split('-');
    return `${mm}-${dd}`;
  }

  useEffect(() => {
    espn.get('/sports/football/nfl/news', { params: { lang:'en', region:'us', limit:10 } })
      .then(res => {
        const all = res.data.articles || [];
        const media = all.filter(a => a.images?.some(i => i.type==='Media'));
        const team = media.filter(a =>
          a.categories?.some(c =>
            c.type==='team' && (c.teamId===TEAM_ID || c.team?.id===TEAM_ID)
          )
        );
        setClips(team.length ? team : media);
      })
      .catch(() => setError('Failed to load Broncos clips'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading Broncos…</p>;
  if (error)   return <p className="text-center text-red-500">{error}</p>;
  if (!clips.length) return <p className="text-center text-gray-500">No Broncos clips.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 h-full md:auto-rows-fr">
      {clips.map(clip => {
        const thumb = clip.images.find(i => i.type==='Media')?.url;
        return (
          <a key={clip.id}
             href={clip.links.web.href}
             target="_blank"
             rel="noopener noreferrer"
             className="block h-full"
          >
            <div className="flex flex-col h-full bg-white shadow-lg rounded-2xl overflow-hidden">
              {thumb && (
                <img
                  src={thumb}
                  alt={clip.headline}
                  className="w-full h-48 object-cover flex-shrink-0"
                />
              )}
              <div className="p-4 flex flex-col flex-grow">
                <p className="text-right text-gray-800 font-semibold mb-2">
                  {fmtDate(new Date(clip.published))}
                </p>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {clip.headline}
                </h3>
                <p className="text-gray-600 flex-grow">
                  {clip.description}
                </p>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}
