// src/twitterloader.jsx
import { useEffect } from 'react';

export default function TwitterWidgetLoader() {
  useEffect(() => {
    // If script hasn’t been injected yet…
    if (!window.twttr) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      // Once it loads, render ALL timelines on the page
      script.onload = () => {
        window.twttr && window.twttr.widgets.load();
      };
      document.body.appendChild(script);
    } else {
      // If script is already present, just re-run load
      window.twttr.widgets.load();
    }
  });
  return null;
}
