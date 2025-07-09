// src/PhotoGrid.jsx
import React, { useState, useEffect } from 'react';
import imagesData from '../data/twitter-images.json'; // make sure this lives under src/data

// Fisher–Yates shuffle
function shuffle(array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function PhotoGrid() {
  console.log('imagesData:', imagesData);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
  const allImages = Object.values(imagesData).flat();
  console.log('allImages:', allImages);
  const random16 = shuffle(allImages).slice(0, 16);
  setImageUrls(random16);
}, []);


  if (!imageUrls.length) {
    return (
      <div className="max-w-6xl mx-auto px-2 py-12 text-center text-gray-500">
        Loading photos…
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* <h2 className="text-3xl font-bold mb-6 text-center">
        Random Denver Sports Photos
      </h2> */}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
        {imageUrls.map((src, i) => (
          <div key={i} className="overflow-hidden rounded-lg m-2" style={{ boxShadow: '0 0 20px #FEC524'}}>
            
            <img
              src={src}
              alt={`Denver Sports #${i + 1}`}
              className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
