// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';     // ← pull in Tailwind here

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Nav               from './Nav.jsx';
import App               from './App.jsx';
import Facts             from './components/Facts.jsx';
import News              from './components/News.jsx';
import Standings         from './components/Standings.jsx';
import VideoComponent    from './components/Videos.jsx';
import LeagueVideos      from './components/LeagueVideos.jsx';
import ScrollToTopArrow  from './utilities/scrollToTopArrow.jsx';
import VideoHighlightComponent from './components/VideoHighlights.jsx';
import Footer from './Footer.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Nav />
      <div className="max-w-6xl mx-auto px-4">
        <Routes>
          <Route path="/"             element={<App />} />
          <Route path="/facts"        element={<Facts />} />
          <Route path="/news"         element={<News />} />
          <Route path="/standings"    element={<Standings />} />
          <Route path="/videos"       element={<VideoComponent />} />
          <Route path="/leaguevideos" element={<LeagueVideos />} />
          <Route path="/videohighlights" element={<VideoHighlightComponent />} />
        </Routes>
      </div>
      <ScrollToTopArrow />
    </Router>
    <Footer />
  </React.StrictMode>
);
