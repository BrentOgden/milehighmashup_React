// src/components/DenverBroncosNews.jsx
import React, { useState, useEffect } from 'react'
import espn from '../api/espnApi'

// ESPN’s Broncos team ID (from your schedule JSON)
const TEAM_ID = 7

export default function DenverBroncosNews() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFallback, setFallback] = useState(false)

  // Format a JS Date into "MM-DD" in America/Denver
  function fmtDate(date) {
    const [yyyy, mm, dd] = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Denver',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
      .format(date)
      .split('-')
    return `${mm}-${dd}`
  }

  function safeHref(article) {
    const href =
      article?.links?.web?.href ||
      article?.links?.api?.news?.href ||
      article?.link ||
      article?.url ||
      null

    if (!href || typeof href !== 'string') return null

    if (/^https?:\/\//i.test(href) || /^\/\//.test(href)) return href
    if (href.startsWith('/')) return `https://www.espn.com${href}`

    return null
  }

  useEffect(() => {
    async function loadNews() {
      setLoading(true)
      setError(null)

      try {
        // 1) Fetch the NFL news feed
        const res = await espn.get('/sports/football/nfl/news', {
          params: { lang: 'en', region: 'us', limit: 8 },
        })

        const all = Array.isArray(res?.data?.articles) ? res.data.articles : []

        // Keep only articles that have a usable link (prevents href crashes)
        const allWithLinks = all.filter((a) => !!safeHref(a))

        // 2) Filter for Broncos **and** NFL league (`l:28`) via the category.uid
        const filtered = allWithLinks.filter((article) =>
          article.categories?.some(
            (cat) =>
              cat.type === 'team' &&
              (cat.teamId === TEAM_ID || cat.team?.id === TEAM_ID) &&
              cat.uid?.includes(`~l:28~t:${TEAM_ID}`)
          )
        )

        if (filtered.length) {
          setArticles(filtered)
          setFallback(false)
        } else {
          // No Broncos articles: show all NFL news (with links)
          setArticles(allWithLinks)
          setFallback(true)
        }
      } catch (e) {
        console.error(e)
        setError('Failed to load Broncos news.')
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [])

  if (loading) {
    return (
      <div className="max-w-sm mx-auto bg-white shadow rounded-lg p-6 text-center">
        <p className="text-gray-500">Loading Broncos news…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-sm mx-auto bg-white shadow rounded-lg p-6 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (!articles.length) {
    return (
      <div className="max-w-sm mx-auto bg-white shadow rounded-lg p-6 text-center">
        <p className="text-gray-500">No news available.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-4xl font-bold mb-6 text-white text-shadow-orange-500/90 text-shadow-lg">
        {isFallback ? 'NFL News' : 'Broncos News'}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 h-full md:auto-rows-fr">
        {articles.map((article) => {
          const imgUrl = article.images?.[0]?.url || ''
          const pubDate = fmtDate(new Date(article.published))
          const link = safeHref(article)

          // Extra safety (shouldn't happen due to filtering)
          if (!link) return null

          return (
            <a
              key={article.id || link}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col h-full">
                {imgUrl && (
                  <img
                    src={imgUrl}
                    alt={article.headline}
                    className="w-full h-48 object-cover flex-shrink-0"
                    onError={(e) => {
                      // If an image 406/403s, just hide it; don't break layout
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                )}

                <div className="p-4 flex flex-col flex-grow">
                  <p
                    className="text-xl font-semibold text-gray-800 text-right mb-2"
                    style={{ color: '#1F2937' }}
                  >
                    {pubDate}
                  </p>

                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {article.headline}
                  </h3>

                  <p className="text-gray-600 flex-grow">{article.description}</p>
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
