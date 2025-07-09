// server.js
import express from 'express';
import cors    from 'cors';
import NodeCache from 'node-cache';
import { TwitterApi } from 'twitter-api-v2';
import dotenv  from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;
const cache = new NodeCache({ stdTTL: Number(process.env.CACHE_TTL_SEC) || 900 });
const twitter = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

app.use(cors());

// GET /api/timeline/:screenName
app.get('/api/timeline/:screenName', async (req, res) => {
  const { screenName } = req.params;
  const cacheKey = `timeline_${screenName}`;

  // 1) return cached if available
  if (cache.has(cacheKey)) {
    return res.json(cache.get(cacheKey));
  }

  try {
    // 2) lookup user ID
    const { data: user } = await twitter.v2.userByUsername(screenName);

    // 3) fetch last 5 tweets
    const timeline = await twitter.v2.userTimeline(user.id, {
      max_results: 5,
      'tweet.fields': ['created_at','text','entities'],
    });

    // 4) cache and return
    cache.set(cacheKey, timeline.data);
    res.json(timeline.data);
  } catch (err) {
    console.error(`Error fetching @${screenName}`, err);
    res.status(500).json({ error: 'Failed to fetch timeline' });
  }
});

app.listen(port, () => {
  console.log(`🟢 Twitter‐cached API listening on http://localhost:${port}`);
});
