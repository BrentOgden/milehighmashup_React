// server/index.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

//
// ── Setup & load cache ─────────────────────────────────────────────────────
//
const __filename    = fileURLToPath(import.meta.url);
const __dirname     = dirname(__filename);
const IG_JSON       = join(__dirname, 'data/instagram.json');

let instagramData = {};
try {
  instagramData = JSON.parse(fs.readFileSync(IG_JSON, 'utf-8'));
} catch (e) {
  console.warn('⚠️ instagram.json load failed:', e.message);
}

//
// ── Express + CORS ─────────────────────────────────────────────────────────
//
const app = express();

// Log every request (for debugging)
app.use((req, res, next) => {
  console.log(`→ ${req.method} ${req.originalUrl}`);
  next();
});

// Allow Vite dev (5173) or any origin
app.use(cors({ origin: '*' }));
app.options('*', cors());

const PORT = process.env.PORT || 5000;

//
// ── Serve cached Instagram post URLs ────────────────────────────────────────
//
app.get('/api/instagram/urls', (req, res) => {
  console.log('↪️  GET /api/instagram/urls');
  try {
    const all = Object.values(instagramData).flat();
    const urls = all.slice(0, 16).map(p => p.link);
    return res.json({ urls });
  } catch (err) {
    console.error('❌ /api/instagram/urls error:', err);
    return res.status(500).json({ urls: [] });
  }
});

//
// ── Instagram oEmbed proxy (optional) ───────────────────────────────────────
//
app.get('/api/instagram/oembed', async (req, res) => {
  console.log('↪️  GET /api/instagram/oembed', req.query.url);
  const postUrl = req.query.url;
  if (!postUrl) return res.status(400).json({ error: 'Missing url' });

  try {
    const token = `${process.env.FB_APP_ID}|${process.env.FB_APP_SECRET}`;
    const oembed = new URL('https://graph.facebook.com/v16.0/instagram_oembed');
    oembed.searchParams.set('url', postUrl);
    oembed.searchParams.set('access_token', token);
    oembed.searchParams.set('omitscript', 'true');

    const r = await fetch(oembed);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const json = await r.json();
    return res.json(json);
  } catch (err) {
    console.error('❌ oEmbed error:', err);
    return res.status(500).json({ error: err.message });
  }
});

//
// ── Start ──────────────────────────────────────────────────────────────────
//
app.listen(PORT, () => {
  console.log(`✅ API listening on http://localhost:${PORT}`);
});
