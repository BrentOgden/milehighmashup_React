import React, { useEffect } from 'react';

export default function ListTimeline({
  listUrl,
  height = 400,
  theme  = 'light',
  chrome = 'noheader nofooter noborders',
}) {
  useEffect(() => {
    // Tell Twitter's widgets.js to parse any new .twitter-timeline anchors
    window.twttr?.widgets?.load();
  }, []);

  return (
    <a
      className="twitter-timeline"
      data-theme={theme}
      data-chrome={chrome}
      data-height={height}
      href={listUrl}
    >
      Loading feed…
    </a>
  );
}
