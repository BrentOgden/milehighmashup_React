// src/components/LeagueVideos.jsx
import React from 'react';
import DenverNuggetsVideos     from './DenverNuggetsVideos';
import DenverBroncosVideos     from './DenverBroncosVideos';
import ColoradoAvalancheVideos from './ColoradoAvalancheVideos';
import ColoradoMammothVideos from './ColoradoMammothVideos';
import ScrollToTopArrow        from '../utilities/scrollToTopArrow';
import nflBanner               from '../assets/nflbanner.png';
import nhlBanner               from '../assets/nhlbanner.png';
import nbaBanner               from '../assets/nbabanner.png';
import nllBanner               from '../assets/nllbanner.png';
import '../App.css';

export default function LeagueVideos() {
  const sections = [
    {
      title: 'Denver Nuggets',
      Banner: nbaBanner,
      bannerClass: 'object-center',
      Component: <DenverNuggetsVideos />,
    },
    {
      title: 'Denver Broncos',
      Banner: nflBanner,
      bannerClass: 'object-center',
      Component: <DenverBroncosVideos />,
    },
    {
      title: 'Colorado Avalanche',
      Banner: nhlBanner,
      bannerClass: 'object-center',
      Component: <ColoradoAvalancheVideos />,
    },
    {
      title: 'Colorado Mammoth',
      Banner: nllBanner,
      bannerClass: 'object-center',
      Component: <ColoradoMammothVideos />,
    },
  ];

  return (
    <>
      {/* Page Title */}
      <div className="py-12">
        <h2 className="text-4xl font-extrabold text-white text-center text-shadow-slate-500/70 text-shadow-lg">
          Latest League Videos
        </h2>
      </div>

      {/* Sections */}
      {sections.map(({ title, Banner, bannerClass, Component }) => (
        <section key={title} className="mb-16">

          {/* full-width banner image */}
          <div className="relative left-1/2 -translate-x-1/2 w-screen">
            <img
              src={Banner}
              alt={`${title} banner`}
              className={`w-full h-[200px] md:h-[250px] object-cover ${bannerClass} shadow-blue-900/80 shadow-lg`}
            />
          </div>

          {/* full-width translucent background */}
          <div className="relative left-1/2 -translate-x-1/2 w-screen bg-blue-700/30 py-10">
            {/* constrained inner container */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* <h3 className="text-2xl font-semibold text-white mb-6">{title}</h3> */}
              <div className="grid gap-6">
                {Component}
              </div>
            </div>
          </div>
        </section>
      ))}

      <ScrollToTopArrow />
    </>
  );
}
