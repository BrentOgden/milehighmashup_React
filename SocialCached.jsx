// src/components/SocialCached.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const accounts = ['nuggets', 'MammothLax', 'Broncos', 'Avalanche'];

export default function SocialCached() {
  const [timelines, setTimelines] = useState({});

  useEffect(() => {
    accounts.forEach(async (screenName) => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE}/api/timeline/${screenName}`
        );
        setTimelines(prev => ({ ...prev, [screenName]: data }));
      } catch (err) {
        console.error(`Failed to load @${screenName}`, err);
      }
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-8 text-center">Social Feeds</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {accounts.map((screenName) => (
          <div
            key={screenName}
            className="overflow-hidden bg-white rounded shadow p-4"
          >
            <h3 className="font-semibold mb-2">@{screenName}</h3>
            <ul className="space-y-4">
              {(timelines[screenName] || []).map(tweet => (
                <li key={tweet.id} className="border-b pb-2">
                  <p className="mb-1">{tweet.text}</p>
                  <small className="text-gray-500">
                    {new Date(tweet.created_at).toLocaleString()}
                  </small>
                </li>
              ))}
              {timelines[screenName]?.length === 0 && (
                <li className="text-gray-500">No tweets found.</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
