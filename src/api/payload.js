// src/api/payload.js

// If you used a proxy, this can just be ''
const BASE = process.env.REACT_APP_PAYLOAD_URL || ''

/**
 * Fetch all docs from a given collection slug
 */
export async function fetchCollection(slug, params = {}) {
  const qs = new URLSearchParams(params).toString()
  const res = await fetch(`${BASE}/api/${slug}${qs ? `?${qs}` : ''}`)
  if (!res.ok) throw new Error(`Payload Error: ${res.statusText}`)
  const json = await res.json()
  return json.docs || json
}
