// scripts/scrape-twitter-timeline-v1.js
import fs from 'fs/promises';
import dotenv from 'dotenv';
import { TwitterApi } from 'twitter-api-v2';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

// You must set these in .env:
// TWITTER_API_KEY, TWITTER_API_SECRET,
// TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET
const {
  TWITTER_API_KEY:    apiKey,
  TWITTER_API_SECRET: apiSecret,
  TWITTER_ACCESS_TOKEN:  accessToken,
  TWITTER_ACCESS_SECRET: accessSecret,
} = process.env;

if (!apiKey || !apiSecret || !accessToken || !accessSecret) {
  console.error('❌ Missing Twitter API v1.1 credentials in .env');
  process.exit(1);
}

// Create a client that can call both v2 and v1.1
const client = new TwitterApi({
  appKey:       apiKey,
  appSecret:    apiSecret,
  accessToken,
  accessSecret,
});
const v1 = client.v1;

const ACCOUNTS = ['nuggets','MammothLax','Broncos','Avalanche'];
const MAX_TWEETS = 10;

async function fetchV1Timeline(handle) {
  // count=MAX_TWEETS, exclude replies and retweets
  const tweets = await v1.get('statuses/user_timeline.json', {
    screen_name: handle,
    count:       MAX_TWEETS,
    exclude_replies: true,
    include_rts:     false,
    tweet_mode:      'extended',  // get full text
  });
  // tweets is an array of Tweet objects
  return tweets.map((t, idx) => ({
    id:         `${handle}-${t.id_str || idx}`,
    text:       t.full_text || t.text,
    created_at: new Date(t.created_at).toISOString(),
  }));
}

(async function main() {
  const result = {};

  for (const handle of ACCOUNTS) {
    process.stdout.write(`Fetching v1.1 timeline for @${handle}… `);
    try {
      const tl = await fetchV1Timeline(handle);
      console.log(`${tl.length} tweets`);
      result[handle] = tl;
    } catch (err) {
      console.error('error', err?.message || err);
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
