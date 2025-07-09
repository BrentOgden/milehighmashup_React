// scripts/scrape-twitter-timeline-nitter.js
import fs from 'fs/promises';
import axios from 'axios';
import { load } from 'cheerio';

const NITTER_BASE = 'https://nitter.net';

// The handles you want to scrape
const ACCOUNTS = ['nuggets', 'MammothLax', 'Broncos', 'Avalanche'];
// How many tweets per account
const MAX_TWEETS = 10;
// Pause between requests (ms)
const PAUSE = 2000;

async function scrapeTimeline(handle) {
  const url = `${NITTER_BASE}/${handle}`;
  const resp = await axios.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const $ = load(resp.data);

  const tweets = [];
  $('div.timeline-item').each((_, el) => {
    if (tweets.length >= MAX_TWEETS) return;

    // tweet text is in the first <p> inside this item
    const text = $(el).find('div.tweet-content p').first().text().trim();
    // the datetime attribute on the <time> tag
    const datetime = $(el).find('div.tweet-header time').attr('datetime');

    if (text && datetime) {
      tweets.push({
        id: `${handle}-${tweets.length}`, // just a unique key
        text,
        created_at: datetime
      });
    }
  });

  return tweets;
}

async function main() {
  const out = {};
  console.log('🔍 Scraping Nitter timelines…');
  for (const handle of ACCOUNTS) {
    process.stdout.write(`- ${handle}: `);
    try {
      const tl = await scrapeTimeline(handle);
      console.log(`${tl.length} tweets`);
      out[handle] = tl;
    } catch (e) {
      console.error(`❌ error for @${handle}:`, e.message);
      out[handle] = [];
    }
    await new Promise(r => setTimeout(r, PAUSE));
  }

  await fs.mkdir('data', { recursive: true });
  await fs.writeFile(
    'data/twitter-timeline.json',
    JSON.stringify(out, null, 2)
  );
  console.log('✅ Written data/twitter-timeline.json');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
