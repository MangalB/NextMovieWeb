// app/api/tmdb/popular/route.ts
import { NextResponse } from 'next/server';
import { tmdbFetch } from '@/lib/tmdb';

export async function GET() {
  const data = await tmdbFetch('/movie/popular?language=en-US&page=1');
  return NextResponse.json(data);
}
