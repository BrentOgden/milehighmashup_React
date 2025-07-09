// src/components/QuoteScroller.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
  { athlete: 'John Elway', quote: 'You have two options in sports; you can either quit or keep going. Quitting is never an option.', description: 'Speaking to his relentless drive to compete during his legendary NFL career' },
  { athlete: 'Patrick Roy', quote: 'I can’t really hear what Jeremy says, because I’ve got my two Stanley Cup rings plugging my ears.', description: 'The infamous classic quote from the 1996 playoffs referring to Jeremy Roenick' },
  { athlete: 'Joe Sakic', quote: 'Success is not about luck, but about preparation meeting opportunity.', description: 'When asked about his diligence and readiness for every game' },
  { athlete: 'Nikola Jokić', quote: 'A point makes you happy; an assist makes you and your teammate happy.', description: 'When asked about his playing style and teamwork' },
  { athlete: 'Jamal Murray', quote: 'It’s not a funeral, guys.', description: 'Following a Game 4 playoff loss in 2025' },
  { athlete: 'Dillon Ward', quote: 'The lacrosse fandom in Colorado is at the top of the list throughout North America.', description: 'Describing the growing lacrosse culture in Colorado' },
  { athlete: 'Nikola Jokić', quote: "I think I'm playing the best basketball of my life. So if that's enough, it's enough. If not, Gilgeous-Alexander deserves it.", description: 'Reflecting on his MVP season after a playoff exit in 2025' },
  { athlete: 'Shannon Sharpe', quote: 'We go into every game confident. That is the way you have to be. You have to expect to win and dominate.', description: 'Speaking to his leadership and effort throughout his career' },
  { athlete: 'Nikola Jokic', quote: 'The next couple of days is gonna be a lot of beer probably.', description: 'After the Game 7 loss to the Thunder in 2025' }
];

export default function QuoteScroller({ interval = 5000, typeSpeed = 50 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedDesc, setDisplayedDesc] = useState('');

  // cycle quotes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % quotes.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);

  // typewriter effect for description
  useEffect(() => {
    const fullDesc = quotes[currentIndex].description;
    setDisplayedDesc('');  // reset
    let idx = 0;
    const typer = setInterval(() => {
      setDisplayedDesc(fullDesc.slice(0, idx + 1));
      idx += 1;
      if (idx >= fullDesc.length) {
        clearInterval(typer);
      }
    }, typeSpeed);
    return () => clearInterval(typer);
  }, [currentIndex, typeSpeed]);

  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-orange-600/40 py-14 overflow-hidden">
      <div className="mx-auto max-w-3xl bg-blue-800/60 text-white rounded-xl shadow-lg">
        <h2 className="text-4xl font-bold p-4 text-center">Wisdom from the Greats</h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="text-center p-6"
          >
            <blockquote className="italic text-xl md:text-2xl">
              “{quotes[currentIndex].quote}”
            </blockquote>
            <p className="mt-4 text-2xl font-semibold">
              {quotes[currentIndex].athlete}
            </p>
            <p className="mt-4 text-lg font-light italic h-20">
              {displayedDesc}
              {/* You can add a blinking cursor if you like: */}
              
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
