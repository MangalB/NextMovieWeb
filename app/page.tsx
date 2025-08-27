// app/page.tsx
import MovieCard from '@/app/components/MovieCard';
import SearchBar from '@/app/components/SearchBar';

async function fetchPopular() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/tmdb/popular`, { next: { revalidate: 60 } });
  return res.json();
}

async function fetchSearch(q: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/tmdb/search?q=${encodeURIComponent(q)}`, { cache: 'no-store' });
  return res.json();
}

export default async function Page({ searchParams }: { searchParams?: { q?: string } }) {
  const { q='' } = await searchParams??{};
  const data = q ? await fetchSearch(q) : await fetchPopular();
  const movies = data?.results ?? [];

  return (
    <section>
      <SearchBar />
      {q ? <h2>Results for “{q}”</h2> : <h2>Popular Movies</h2>}
      <div className="grid" style={{ marginTop: '1rem' }}>
        {movies.map((m: any) => <MovieCard key={m.id} movie={m} />)}
      </div>
      {!movies.length && <p>No movies found.</p>}
    </section>
  );
}
