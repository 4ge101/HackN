const BASE = 'https://hacker-news.firebaseio.com/v0'

const FEED_MAP = {
  top:  'topstories',
  new:  'newstories',
  ask:  'askstories',
  show: 'showstories',
  job:  'jobstories',
}

async function get(path) {
  const res = await fetch(`${BASE}${path}.json`)
  if (!res.ok) throw new Error(`HN API error: ${res.status}`)
  return res.json()
}

export async function fetchFeedIds(feed) {
  const key = FEED_MAP[feed] ?? 'topstories'
  return get(`/${key}`)
}

export async function fetchItem(id) {
  return get(`/item/${id}`)
}

export async function fetchItems(ids) {
  return Promise.all(ids.map(fetchItem))
}

export async function fetchUser(id) {
  return get(`/user/${id}`)
}

export async function fetchStoriesPage(feed, page = 0, perPage = 30) {
  const ids = await fetchFeedIds(feed)
  const slice = ids.slice(page * perPage, (page + 1) * perPage)
  const items = await fetchItems(slice)
  return { items: items.filter(Boolean), total: ids.length }
}