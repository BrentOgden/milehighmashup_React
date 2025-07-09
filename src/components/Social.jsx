import React from 'react';
import InstagramFeed from '../InstagramFeed';

export default function Social() {
  return (
    <section className="py-12 bg-white">
      <h2 className="text-4xl font-bold mb-8 text-center">
        Team Instagram Highlights
      </h2>
      <div className="max-w-6xl mx-auto px-4">
        <InstagramFeed />
      </div>
    </section>
  );
}
