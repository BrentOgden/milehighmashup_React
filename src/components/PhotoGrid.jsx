// src/PhotoGrid.jsx
import React, { useEffect, useState } from 'react'
import imagesData from '../data/twitter-images.json' // make sure this lives under src/data

// Fisher–Yates shuffle
function shuffle(array) {
  const a = array.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function isProbablyUrl(value) {
  if (typeof value !== 'string') return false
  // Only allow absolute http(s) URLs to avoid ERR_NAME_NOT_RESOLVED on bare filenames/hosts
  return /^https?:\/\//i.test(value.trim())
}

export default function PhotoGrid() {
  const [imageUrls, setImageUrls] = useState([])

  useEffect(() => {
    const allImages = Object.values(imagesData ?? {})
      .flatMap((v) => (Array.isArray(v) ? v : []))
      .map((v) => (typeof v === 'string' ? v.trim() : v))
      .filter(isProbablyUrl)

    const random16 = shuffle(allImages).slice(0, 16)
    setImageUrls(random16)
  }, [])

  if (!imageUrls.length) {
    return (
      <div className="max-w-6xl mx-auto px-2 py-12 text-center text-gray-500">
        Loading photos…
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* <h2 className="text-3xl font-bold mb-6 text-center">
        Random Denver Sports Photos
      </h2> */}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
        {imageUrls.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="overflow-hidden rounded-lg m-2"
            style={{ boxShadow: '0 0 20px #FEC524' }}
          >
            <img
              src={src}
              alt={`Denver Sports #${i + 1}`}
              className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-110"
              loading="lazy"
              onError={(e) => {
                // Hide broken images rather than showing a broken icon
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
