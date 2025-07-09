// scripts/scrape-twitter-timeline-rss.js
import fs from 'fs/promises';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const ACCOUNTS = ['nuggets','MammothLax','Broncos','Avalanche'];
const MAX       = 10;

// fetch & parse RSS for one handle
async function fetchRss(handle) {
  const url = `https://twitrss.me/twitter_user_to_rss/?user=${handle}`;
  const { data: xml } = await axios.get(url, { timeout: 5000 });
  const parsed = await parseStringPromise(xml);
  const items  = parsed.rss.channel[0].item || [];
  return items.slice(0, MAX).map((it, idx) => ({
    id:         `${handle}-${idx}`,
    text:       (it.title[0] || '').replace(/^.*?:\s*/, ''), // strip “@handle: ” prefix
    created_at: new Date(it.pubDate[0]).toISOString(),
  }));
}

(async function main() {
  const result = {};
  for (const handle of ACCOUNTS) {
    process.stdout.write(`Fetching RSS @${handle}… `);
    try {
      const tweets = await fetchRss(handle);
      console.log(`${tweets.length} items`);
      result[handle] = tweets;
    } catch (err) {
      console.log(`error (${err.response?.status||err.code||err.message})`);
      result[handle] = [];
    }
  }

  // write into src/data so React can import
  const outDir  = join(__dirname, '..', 'src', 'data');
  const outFile = join(outDir, 'twitter-timeline.json');
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(outFile, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`✅ Written ${outFile}`);
})();
