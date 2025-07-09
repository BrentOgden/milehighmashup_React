// scripts/scrape-twitter-images-google.js
import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs/promises';
import axios from 'axios';

// full team names to search for
const TEAMS = [
  'Denver Broncos',
  'Colorado Avalanche',
  'Denver Nuggets',
  'Colorado Mammoth',
];

// how many per team
const DESIRED = 24;

// your CSE credentials
const API_KEY = process.env.GOOGLE_API_KEY;
const CX      = process.env.GOOGLE_CX;
if (!API_KEY || !CX) {
  console.error('❌ Missing GOOGLE_API_KEY or GOOGLE_CX in .env');
  process.exit(1);
}

/**
 * Fetches up to DESIRED images for a given query.
 * Loops pages of 10 results until done.
 */
async function fetchImages(query) {
  let results = [];
  let start   = 1;

  while (results.length < DESIRED && start < 100) {
    const { data } = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key:        API_KEY,
        cx:         CX,
        searchType: 'image',
        q:          `${query} Twitter fan photos`,
        num:        10,
        start,
        safe:       'high',
      },
    });

    if (!data.items || data.items.length === 0) break;

    // collect the image URLs
    results.push(...data.items.map(item => item.link));
    start += 10;
  }

  // dedupe, take the first DESIRED
  return Array.from(new Set(results)).slice(0, DESIRED);
}

(async () => {
  const out = {};
  console.log('🔍 Fetching images via Google CSE…');

  for (const team of TEAMS) {
    process.stdout.write(`- ${team}… `);
    try {
      const imgs = await fetchImages(team);
      console.log(`${imgs.length} images`);
      out[team] = imgs;
    } catch (e) {
      console.error(`❌ failed for ${team}:`, e.message);
      out[team] = [];
    }
  }

  await fs.mkdir('data', { recursive: true });
  await fs.writeFile('data/twitter-images.json', JSON.stringify(out, null, 2));
  console.log('✅ data/twitter-images.json written');
})();
