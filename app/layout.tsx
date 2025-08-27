// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Next Movies',
  description: 'Movies explorer powered by TMDB',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a href="/" style={{ fontWeight: 700, fontSize: 18 }}>Next Movies</a>
          </div>
        </header>
        <main style={{ maxWidth: 1100, margin: '0 auto', padding: '1rem' }}>{children}</main>
      </body>
    </html>
  );
}
