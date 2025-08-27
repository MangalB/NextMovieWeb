// app/api/tmdb/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { tmdbFetch } from '@/lib/tmdb';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || '';
  const page = searchParams.get('page') || '1';

  if (!query.trim()) {
    return NextResponse.json({ results: [], total_results: 0, total_pages: 0 }, { status: 200 });
  }

  const data = await tmdbFetch(`/search/movie?language=en-US&include_adult=false&page=${page}&query=${encodeURIComponent(query)}`);
  return NextResponse.json(data);
}
