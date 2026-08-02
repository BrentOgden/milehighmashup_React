// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';     // ← pull in Tailwind here

import { HelmetProvider } from 'react-helmet-async';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import Nav               from './Nav.jsx';
import App               from './App.jsx';
import Facts             from './components/Facts.jsx';
import News              from './components/News.jsx';
import Standings         from './components/Standings.jsx';
import LeagueVideos      from './components/LeagueVideos.jsx';
import ScrollToTopArrow  from './utilities/scrollToTopArrow.jsx';
import VideoHighlightComponent from './components/VideoHighlights.jsx';
import HeadTags from './components/HeadTags.jsx';
import Footer from './Footer.jsx';
import {
  NOT_FOUND_METADATA,
  getRouteMetadata,
} from './seo/siteMetadata.js';

function SeoRoute({
  routePath,
  children,
  includeHiddenHeading = true,
}) {
  const metadata = getRouteMetadata(routePath);

  return (
    <>
      <HeadTags metadata={metadata} />
      {includeHiddenHeading && (
        <h1 className="sr-only">{metadata.heading}</h1>
      )}
      {children}
    </>
  );
}

function NotFound() {
  return (
    <>
      <HeadTags metadata={NOT_FOUND_METADATA} />
      <section className="min-h-[60vh] flex flex-col items-center justify-center py-24 text-center">
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p>The page you requested does not exist.</p>
      </section>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <Nav />
        <main id="main-content" className="max-w-6xl mx-auto px-4">
          <Routes>
            <Route
              path="/"
              element={(
                <SeoRoute routePath="/" includeHiddenHeading={false}>
                  <App />
                </SeoRoute>
              )}
            />
            <Route
              path="/facts"
              element={(
                <SeoRoute routePath="/facts">
                  <Facts headingLevel="h2" />
                </SeoRoute>
              )}
            />
            <Route
              path="/news"
              element={(
                <SeoRoute routePath="/news">
                  <News />
                </SeoRoute>
              )}
            />
            <Route
              path="/standings"
              element={(
                <SeoRoute routePath="/standings">
                  <Standings />
                </SeoRoute>
              )}
            />
            <Route
              path="/leaguevideos"
              element={(
                <SeoRoute routePath="/leaguevideos" includeHiddenHeading={false}>
                  <LeagueVideos />
                </SeoRoute>
              )}
            />
            <Route
              path="/videohighlights"
              element={(
                <SeoRoute routePath="/videohighlights" includeHiddenHeading={false}>
                  <VideoHighlightComponent />
                </SeoRoute>
              )}
            />
            <Route path="/videos" element={<Navigate to="/leaguevideos/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <ScrollToTopArrow />
        <Footer />
      </Router>
    </HelmetProvider>
  </React.StrictMode>
);
