// src/components/News.jsx
import React from 'react';
import ScrollToTopArrow from '../utilities/scrollToTopArrow';
import ColoradoAvalancheNews from './ColoradoAvalancheNews';
import DenverBroncosNews       from './DenverBroncosNews';
import DenverNuggetsNews       from './DenverNuggetsNews';
import ColoradoMammothNews from './ColoradoMammothNews';

export default function News() {
  return (
    <>


      {/* Avalanche News */}
      <section className="max-w-8xl mx-auto px-4 py-12">
        <ColoradoAvalancheNews />
      </section>

      {/* Broncos News */}
      <section className="max-w-8xl mx-auto px-4 py-12">
        <DenverBroncosNews />
      </section>

      {/* Nuggets News */}
      <section className="max-w-8xl mx-auto px-4 py-12">
        <DenverNuggetsNews />
      </section>

      {/* Mammoth News */}
      <section className="max-w-8xl mx-auto px-4 py-12">
        <ColoradoMammothNews />
      </section>

      {/* Scroll-to-Top */}
      <ScrollToTopArrow />
    </>
  );
}
