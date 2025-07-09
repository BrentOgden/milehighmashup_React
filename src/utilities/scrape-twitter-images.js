// scripts/scrape-twitter-images.js
import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs/promises';
import { TwitterApi } from 'twitter-api-v2';

// your bearer token
const BEARER = process.env.TWITTER_BEARER_TOKEN;
if (!BEARER) {
  console.error('⚠️  Missing TWITTER_BEARER_TOKEN in .env');
  process.exit(1);
}

// set up the client
const twitter = new TwitterApi(BEARER).readOnly.v2;

// the four team slugs & their human names
const TEAMS = {
  broncos:   'Denver Broncos',
  avalanche: 'Colorado Avalanche',
  nuggets:   'Denver Nuggets',
  mammoth:   'Colorado Mammoth',
};

// build a single OR‐query
const query = Object.values(TEAMS)
  .map(name => `"${name}"`)
  .join(' OR ')
  + ' has:images -is:retweet -is:reply';

// how many images total to pull
const DESIRED = 100; // fetch up to 100 and then slice per‐team

async function fetchAllImages() {
  const images = [];  
  let nextToken;
  do {
    const res = await twitter.search(query, {
      max_results:    100,
      next_token:     nextToken,
      expansions:     'attachments.media_keys',
      'media.fields': 'url,type',
      'tweet.fields': 'text',
    });

    // collect all photo URLs + their tweet text
    const mediaMap = new Map(
      (res.includes?.media || [])
        .filter(m => m.type === 'photo' && m.url)
        .map(m => [m.media_key, m.url])
    );
    for (const tweet of res.data || []) {
      if (!tweet.attachments) continue;
      for (const key of tweet.attachments.media_keys) {
        const url = mediaMap.get(key);
        if (url) {
          images.push({ url, text: tweet.text });
          if (images.length >= DESIRED) break;
        }
      }
      if (images.length >= DESIRED) break;
    }

    nextToken = res.meta.next_token;
  } while (nextToken && images.length < DESIRED);

  return images;
}

async function main() {
  console.log('🔍 Running combined search for all four teams…');
  const all = await fetchAllImages();
  console.log(`  → fetched ${all.length} images total`);

  // bucket by team slug based on text match
  const out = {};
  for (const slug of Object.keys(TEAMS)) {
    out[slug] = all
      .filter(item => 
        item.text.toLowerCase().includes(TEAMS[slug].toLowerCase())
      )
      .map(item => item.url)
      .slice(0, 24);  // max 24 per team
    console.log(`  • ${slug}: ${out[slug].length} images`);
  }

  // save
  await fs.mkdir('data', { recursive: true });
  await fs.writeFile(
    'data/twitter-images.json',
    JSON.stringify(out, null, 2)
  );
  console.log('✅ data/twitter-images.json written');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
