// src/App.jsx
import React from 'react';
import { Parallax } from 'react-parallax';

import heroBg from './assets/hero2.jpg';
import Facts from './components/Facts.jsx';
import PhotoGrid from './components/PhotoGrid';
import VideoComponent from './components/Videos.jsx';
import VideoHighlightComponent from './components/VideoHighlights.jsx';
import ColoradoAvalancheLastGame from './components/ColoradoAvalancheLastGame.jsx';
import DenverBroncosLastGame from './components/DenverBroncosLastGame.jsx';
import NuggetsNews from './components/DenverNuggetsNews.jsx';
import AvsNews from './components/ColoradoAvalancheNews.jsx';
import BroncosNews from './components/DenverBroncosNews.jsx';
import MammothNews from './components/ColoradoMammothNews.jsx'
import Quotes from './components/Quotes.jsx';
import DenverNuggetsVideos from './components/DenverNuggetsVideos.jsx';
import Social from './components/Social';


//  ↓ make sure this matches the file & export name ↓
import DenverNuggetsLastGame from './components/DenverNuggetsLastGame.jsx';
import DenverNuggetsNews from './components/DenverNuggetsNews.jsx';
import ColoradoMammothLastGame from './components/ColoradoMammothLastGame.jsx';
import Footer from './Footer.jsx';

export default function App() {
  return (
    <>

      <Parallax
        bgImage={heroBg}
        strength={300}
        className="relative w-screen left-1/2 -translate-x-1/2"
      >
        <div className="relative flex items-center justify-center h-screen w-full">
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-12 text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">
              Welcome to Mile High Mashup
              <div className="text-3xl mt-2">
                Where <span className="text-orange-400">Passion</span> Meets <span className="text-blue-600">Pride!</span>
              </div>
            </h1>
            <p className="max-w-3xl mb-6 mt-6 text-lg leading-relaxed">
              Fans in Colorado don’t just follow sports — they LIVE them! Whether you're cheering for the Broncos, Nuggets, Avalanche or Mammoth, we've got you covered with non-stop news, juicy rumors, and the latest buzz from the Mile High City. Get your daily dose of Denver sports excitement right here, all day, every day!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#standings"
                className="inline-block bg-gradient-to-br from-amber-600 via-yellow-300 to-amber-700 text-black font-bold text-shadow-amber-700 py-4 px-6 rounded-sm hover:bg-amber-700 transition"
                style={{ boxShadow: '0 0 20px #FEC524' }}
              >
                Scoreboard →
              </a>
              <a
                href="#news"
                className="inline-block bg-gradient-to-br from-amber-600 via-yellow-300 to-amber-700 text-black font-bold py-4 px-6 rounded-sm hover:bg-amber-700 transition"
                style={{ boxShadow: '0 0 20px #FEC524' }}
              >
                Follow the Latest Buzz →
              </a>
            </div>
          </div>
        </div>
      </Parallax>

      <Quotes />
      <PhotoGrid />

      <div
        id="standings"
        className="
        scroll-mt-30
        relative w-screen left-1/2 -translate-x-1/2
       bg-blue-700/40 py-12
        grid grid-cols-1 md:grid-cols-4 gap-4
        px-4 my-12
  "
      >
        <DenverNuggetsLastGame />

        {/* these use their own default date-range logic */}
        <ColoradoAvalancheLastGame />
        <DenverBroncosLastGame />
        <ColoradoMammothLastGame />
      </div>


      {/* ─── NBA Scoreboard ──────────────────────────────────────── */}


      {/* ─── Did You Know? Facts ─────────────────────────────────── */}
      <div id="facts" className="mt-200 md:mt-0 md:max-w-8xl mx-auto px-4 py-12 mb-8">
        <h2 className="text-4xl font-bold">Did You Know?</h2>
        <Facts />
      </div>
      <div id="news" className="scroll-mt-20">
        {/* Centered container + vertical gaps */}
        <div className="max-w-8xl mx-auto px-4 mb-30 sm:px-6 lg:px-8 
                        space-y-8 md:space-y-6 lg:space-y-8">

          {/* Avalanche News */}
          <section className="relative rounded-lg overflow-hidden shadow py-8 md:py-8">
            <AvsNews />
          </section>

          {/* Broncos News */}
          <section className="relative rounded-lg overflow-hidden shadow py-8 md:py-8">
            <BroncosNews />
          </section>

          {/* Nuggets News */}
          <section className="relative rounded-lg overflow-hidden shadow py-8 md:py-8">
            <NuggetsNews />
          </section>
          <section className="relative rounded-lg overflow-hidden shadow py-8 md:py-8">
            <MammothNews />
          </section>
        </div>
      </div>

      {/* ─── Highlight Videos ────────────────────────────────────── */}
      <section
        id="video-block"
        className="relative w-screen left-1/2 -translate-x-1/2 bg-blue-700/40 py-12"
      >
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Action-Packed Edits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 justify-items-center">
            <VideoComponent videoId="jdTo9sHk66o" />
            <VideoComponent videoId="qP02cOCqcn8" />
            <VideoComponent videoId="6C9FAWKr--s" />
          </div>
        </div>

      </section>
      
    </>

  );
}
