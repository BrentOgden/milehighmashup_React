// src/components/ProfileTimeline.jsx
import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

export default function ProfileTimeline({
  screenName,   // e.g. "Broncos"
  height = 400,
  theme  = 'light',
  noHeader = true,
  noFooter = true,
  noBorders= true,
}) {
  const chromeFlags = [
    noHeader  && 'noheader',
    noFooter  && 'nofooter',
    noBorders && 'noborders',
  ].filter(Boolean).join(' ');

  return (
    <TwitterTimelineEmbed
      sourceType="profile"
      screenName={screenName}
      options={{ 
        height, 
        chrome: chromeFlags,
      }}
      theme={theme}
    />
  );
}
