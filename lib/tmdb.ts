// lib/tmdb.ts
const TMDB_BASE = 'https://api.themoviedb.org/3';

export async function tmdbFetch(path: string, init?: RequestInit) {
  const url = `${TMDB_BASE}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      'Content-Type': 'application/json;charset=utf-8',
      ...(init?.headers || {}),
    },
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(`TMDB error ${res.status}: ${msg || res.statusText}`);
  }
  return res.json();
}
