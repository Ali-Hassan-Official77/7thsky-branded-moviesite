# 7thSky — Cinema Above the Ordinary

A premium movie and series discovery experience built with Next.js, React, Tailwind CSS, Framer Motion and the TMDB API.

## Brand direction

7thSky uses a celestial cinema concept: midnight space, aurora cyan, violet, and restrained champagne-gold accents. The UI is intentionally different from the original CineVanta/Cineverse presentation, with a floating glass navigation shell, orbital hero composition, cinematic poster framing, responsive rails, and a minimal production-style footer.

## Included

- TMDB-powered movies and TV series
- Trending, popular, top-rated, upcoming and now-playing sections
- Search with live suggestions
- Genre discovery
- Movie and series detail pages
- Backdrops, galleries, cast and trailers
- Personal My List using localStorage
- Light / dark theme persistence
- Toast notifications
- Skeleton loading states
- Responsive mobile navigation
- Framer Motion transitions with reduced-motion support
- 7thSky SVG logo and favicon

## Environment

Create `.env.local`:

```env
TMDB_API_KEY=
TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_URL=https://image.tmdb.org/t/p
API_ACCESS_TOKEN=
```

`API_ACCESS_TOKEN` is preferred; `TMDB_API_KEY` is used as the fallback.

## Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm start
```

## TMDB

This product uses the TMDB API but is not endorsed or certified by TMDB.
