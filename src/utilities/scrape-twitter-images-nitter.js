// scripts/scrape-twitter-images-nitter.js
import fs from 'fs/promises';
import axios from 'axios';
import { load } from 'cheerio';    // <-- named import

const NITTER_BASE = 'https://nitter.net';  
const TEAMS = {
  broncos:   'Denver Broncos',
  avalanche: 'Colorado Avalanche',
  nuggets:   'Denver Nuggets',
  mammoth:   'Colorado Mammoth',
};
const MAX_IMAGES = 24;

async function scrapeTeam(slug, query) {
  const url = `${NITTER_BASE}/search?f=tweets&q=${encodeURIComponent(query)}`;
  const resp = await axios.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  });
  const $ = load(resp.data);

  const urls = [];
  $('div.timeline-item .attachments img').each((_, img) => {
    const src = $(img).attr('src');
    if (src) urls.push(NITTER_BASE + src);
  });

  return Array.from(new Set(urls)).slice(0, MAX_IMAGES);
}

async function main() {
  const out = {};
  console.log('🔍 Scraping Nitter for team images…');
  for (const [slug, name] of Object.entries(TEAMS)) {
    process.stdout.write(`- ${slug}: `);
    try {
      const imgs = await scrapeTeam(slug, name);
      console.log(`${imgs.length} images`);
      out[slug] = imgs;
      await new Promise(r => setTimeout(r, 2000));
    } catch (e) {
      console.error(`❌ error for ${slug}:`, e.message);
      out[slug] = [];
    }
  }

  await fs.mkdir('data', { recursive: true });
  await fs.writeFile(
    'data/twitter-images.json',
    JSON.stringify(out, null, 2)
  );
  console.log('✅ Wrote data/twitter-images.json');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
