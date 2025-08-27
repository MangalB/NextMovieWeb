// app/api/tmdb/movie/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { tmdbFetch } from '@/lib/tmdb';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { searchParams } = new URL(req.url);
    const {id} = await params
    const page = searchParams.get('page') || '1';

    console.log(`Id: ${id}, Page: ${page}`);
    console.log(searchParams);

    if (!id.trim()) {
        return NextResponse.json({ results: [], total_results: 0, total_pages: 0 }, { status: 200 });
    }

    // const data = await tmdbFetch(`/search/movie?language=en-US&include_adult=false&page=${page}&query=${encodeURIComponent(query)}`);
    const data = await tmdbFetch(`/movie/${id}?language=en-US`);
    return NextResponse.json(data);
}
