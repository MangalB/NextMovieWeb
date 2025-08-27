import { json } from "stream/consumers";

// app/movie/[id]/page.tsx
type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  runtime?: number;
  genres?: { id: number; name: string }[];
  vote_average?: number;
  credits?: { cast: { id: number; name: string; character: string }[] };
};

const IMG = (path: string, size: 'w500' | 'w780' | 'original' = 'w780') =>
  `https://image.tmdb.org/t/p/${size}${path}`;

async function getMovie(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/tmdb/movie/${id}`, { next: { revalidate: 300 } });
  return res.json();
}

export default async function MoviePage({ params }: { params: { id: string } }) {

    const { id } = await params;
  const movie: MovieDetails = await getMovie(id);
  console.log(`movie = ${JSON.stringify(movie)}`);

  const poster = movie.poster_path ? IMG(movie.poster_path, 'w500') : '/placeholder.svg';
  const year = (movie.release_date || '').slice(0, 4);

  return (
    <article style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1.5rem' }}>
      <div>
        <img src={poster} alt={movie.title} width={500} height={750} style={{ borderRadius: 8 }} />
      </div>
      <div style={{ display: 'grid', gap: 12 }}>
        <h1 style={{ margin: 0 }}>{movie.title} {year && <span style={{ color: '#6b7280', fontWeight: 400 }}>({year})</span>}</h1>
        <div className="meta">
          {movie.runtime ? `${movie.runtime}m` : null}
          {movie.runtime && ' • '}
          ⭐ {movie.vote_average?.toFixed(1) ?? '—'}
          {movie.genres?.length ? ' • ' + movie.genres.map(g => g.name).join(', ') : null}
        </div>
        <p style={{ lineHeight: 1.6 }}>{movie.overview}</p>
        {movie.credits?.cast?.length ? (
          <div>
            <h3 style={{ margin: '1rem 0 0.5rem' }}>Top Cast</h3>
            <ul style={{ padding: 0, listStyle: 'none', display: 'grid', gap: 6, gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
              {movie.credits.cast.slice(0, 8).map(c => (
                <li key={c.id} className="meta">
                  <strong>{c.name}</strong>
                  <div>{c.character}</div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
}
