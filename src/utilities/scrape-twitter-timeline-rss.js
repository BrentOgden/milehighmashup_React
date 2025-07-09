// scripts/scrape-twitter-timeline-rsshub.js
import fs from 'fs/promises';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

// Your handles and how many tweets to grab
const ACCOUNTS = ['nuggets','MammothLax','Broncos','Avalanche'];
const MAX      = 10;

// Fetch JSON feed from RSSHub
async function fetchFeed(handle) {
  const url = `https://api.rsshub.app/twitter/user/${handle}`;
  const { data } = await axios.get(url, { timeout: 5000 });
  // data.items is an array of { title, pubDate, ... }
  const items = (data.items || []).slice(0, MAX);
  return items.map((it, idx) => ({
    id: `${handle}-${idx}`,
    // title comes in as “@handle: tweet text”
    text: it.title.replace(new RegExp(`^@${handle}:?\\s*`, 'i'), '').trim(),
    created_at: new Date(it.pubDate).toISOString(),
  }));
}

;(async function main() {
  const result = {};
  for (const handle of ACCOUNTS) {
    process.stdout.write(`Fetching @${handle} from RSSHub… `);
    try {
      const tweets = await fetchFeed(handle);
      console.log(`${tweets.length} items`);
      result[handle] = tweets;
    } catch (err) {
      console.log(`error (${err.response?.status||err.code||err.message})`);
      result[handle] = [];
    }
  }

  // Write into src/data so React can import it
  const outDir  = join(__dirname, '..', 'src', 'data');
  const outFile = join(outDir, 'twitter-timeline.json');
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(outFile, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`✅ Written ${outFile}`);
})();
