// components/SearchBar.tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const initial = params.get('q') ?? '';
  const [q, setQ] = useState(initial);

  useEffect(() => setQ(initial), [initial]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) {
      router.push('/');
      return;
    }
    router.push(`/?.q=${encodeURIComponent(query)}&q=${encodeURIComponent(query)}`);
    // The ".q" param avoids Next caching oddities by varying the URL slightly
  }

  return (
    <form className="searchBar" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Search movies..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search movies"
      />
      <button type="submit" disabled={!q.trim()}>Search</button>
    </form>
  );
}
