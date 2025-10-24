// src/components/DenverNuggetsLastGame.jsx
import React, { useState, useEffect } from 'react';
import espn  from '../api/espnApi';
import axios from 'axios';

const TEAM_ID    = 7;   // Denver Nuggets’ ESPN team ID
const SEASON     = 2026;
const SEASONTYPE = 2;   // regular season

const RECORD_URL = `https://sports.core.api.espn.com/v2/sports/basketball/leagues/nba
  /seasons/${SEASON}/types/${SEASONTYPE}/teams/${TEAM_ID}/record`
  .replace(/\s+/g, '');

export default function DenverNuggetsLastGame() {
  const [game,           setGame]         = useState(null);
  const [displayDate,    setDisplayDate]  = useState('');
  const [recordSummary,  setRecordSummary]= useState('');
  const [winPct,         setWinPct]       = useState('');
  const [playoffSeed,    setPlayoffSeed]  = useState('');
  const [loading,        setLoading]      = useState(true);
  const [error,          setError]        = useState(null);

  // Format a Date into "MM-DD" in America/Denver
  function fmtDenver(date) {
    const iso = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Denver',
      year:     'numeric',
      month:    'numeric',
      day:      '2-digit',
    }).format(date); // "YYYY-MM-DD"
    const [_, m, d] = iso.split('-');
    return `${m}-${d}`;
  }

  // Safely extract a numeric or object score
  function extractScore(comp) {
    const s = comp.score;
    return typeof s === 'object'
      ? s.displayValue ?? s.value ?? JSON.stringify(s)
      : s;
  }

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        // 1) Last completed game (regular + playoffs)
        const [regRes, postRes] = await Promise.all([
          espn.get(`/sports/basketball/nba/teams/${TEAM_ID}/schedule`, {
            params: { lang:'en', region:'us', season:SEASON, seasontype:SEASONTYPE }
          }),
          espn.get(`/sports/basketball/nba/teams/${TEAM_ID}/schedule`, {
            params: { lang:'en', region:'us', season:SEASON, seasontype:3 }
          })
        ]);

        const all = [...(regRes.data.events||[]), ...(postRes.data.events||[])];
        const done = all
          .filter(e => e.competitions?.[0]?.status?.type.completed)
          .sort((a,b) =>
            new Date(b.competitions[0].date) - new Date(a.competitions[0].date)
          );

        if (!done.length) throw new Error('No completed games found');

        const lastGame = done[0];
        setGame(lastGame);
        setDisplayDate(fmtDenver(new Date(lastGame.competitions[0].date)));

        // 2) Fetch overall record, win % & playoff seed
        const recRes = await axios.get(RECORD_URL, {
          params: { lang:'en', region:'us' }
        });
        const overall = recRes.data.items.find(i => i.id === '0');
        if (overall) {
          // W–L record
          setRecordSummary(overall.displayValue);  // e.g. "55-27"

          // Win %
          const pctStat = overall.stats.find(s => s.type === 'winpercent');
          if (pctStat) {
            setWinPct(`${(pctStat.value * 100).toFixed(1)}%`);  // e.g. "67.1%"
          }

          // Playoff seed
          const seedStat = overall.stats.find(s => s.type === 'playoffseed');
          if (seedStat) {
            const seed = seedStat.displayValue !== '-'
              ? seedStat.displayValue
              : seedStat.value.toString();
            setPlayoffSeed(seed);
          }
        }
      } catch (e) {
        console.error(e.response?.data || e.message);
        setError(
          e.message.includes('No completed')
            ? 'No completed Nuggets games found.'
            : 'Failed to load Nuggets data.'
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-sm mx-auto bg-white shadow rounded-lg p-6 text-center">
        <p className="text-gray-500">Loading last Nuggets game…</p>
      </div>
    );
  }
  if (error || !game) {
    return (
      <div className="max-w-sm mx-auto bg-white shadow rounded-lg p-6 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const comps     = game.competitions[0].competitors;
  const homeComp  = comps.find(c => c.homeAway === 'home');
  const awayComp  = comps.find(c => c.homeAway === 'away');
  const homeScore = extractScore(homeComp);
  const awayScore = extractScore(awayComp);
  const getLogo   = c => c.team.logo || c.team.logos?.[0]?.href || '';

  return (
    <div className="mx-4 bg-white shadow-lg rounded-2xl h-fit overflow-hidden">
      <div className="p-6">
        {/* Game Date */}
        <p className="text-2xl font-semibold text-gray-800 text-center mb-1">
          {displayDate}
        </p>

        {/* Logos & Score */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <img src={getLogo(awayComp)} alt={awayComp.team.displayName}
               className="h-12 w-12 object-contain" />
          <span className="text-black font-medium">vs</span>
          <img src={getLogo(homeComp)} alt={homeComp.team.displayName}
               className="h-12 w-12 object-contain" />
        </div>
        <div className="flex items-baseline justify-center space-x-4">
          <span className="text-4xl font-bold text-indigo-600">{awayScore}</span>
          <span className="text-3xl font-medium text-gray-500">–</span>
          <span className="text-4xl font-bold text-indigo-600">{homeScore}</span>
        </div>
      </div>

      {/* Record, Win % & Playoff Seed */}
      <div className="text-center mb-4">
        {recordSummary && (
          <p className="text-black font-bold text-md mb-1">
            Record: {recordSummary} {winPct && `(${winPct})`}
          </p>
        )}
        {playoffSeed && (
          <p className="text-black">
            #{playoffSeed} in the Western Conference
          </p>
        )}
      </div>
    </div>
  );
}
