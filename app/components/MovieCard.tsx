// components/MovieCard.tsx
import Link from 'next/link';

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
  vote_average?: number;
};

const IMG = (path: string, size: 'w342' | 'w500' = 'w342') =>
  `https://image.tmdb.org/t/p/${size}${path}`;

export default function MovieCard({ movie }: { movie: Movie }) {
  const poster = movie.poster_path ? IMG(movie.poster_path) : '/placeholder.svg';
  return (
    <Link href={`/movie/${movie.id}`} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <img
        src={poster}
        alt={movie.title}
        width={342}
        height={513}
        style={{ objectFit: 'cover', aspectRatio: '2/3' }}
      />
      <div style={{ padding: '0.5rem 0.75rem', display: 'grid', gap: 4 }}>
        <div className="title">{movie.title}</div>
        <div className="meta">
          {(movie.release_date || '').slice(0, 4)} • ⭐ {movie.vote_average?.toFixed(1) ?? '—'}
        </div>
      </div>
    </Link>
  );
}
