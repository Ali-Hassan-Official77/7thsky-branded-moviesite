import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Clock,
  Calendar,
  Camera,
} from "lucide-react";

import {
  tmdb,
  tmdbImage,
} from "@/lib/tmdb";

import {
  formatYear,
  formatRuntime,
  findTrailer,
  findCertification,
} from "@/lib/utils";

import SectionGrid from "@/components/SectionGrid";
import RatingBadge from "@/components/RatingBadge";
import TrailerButton from "@/components/TrailerButton";
import SaveButton from "@/components/SaveButton";
import Reveal from "@/components/Reveal";

export const runtime = 'edge';
export const revalidate = 1800;

export async function generateMetadata({ params }) {
  try {
    const { id } = await params;

    const movie = await tmdb.movieDetails(id);

    return {
      title: `${movie.title} — 7thSky`,
      description:
        movie.overview?.slice(0, 155) ||
        "Explore this movie on 7thSky.",
    };
  } catch {
    return {
      title: "Movie — 7thSky",
    };
  }
}

export default async function MovieDetailPage({ params }) {
  const { id } = await params;

  let movie;

  try {
    movie = await tmdb.movieDetails(id);
  } catch {
    notFound();
  }

  if (!movie) {
    notFound();
  }

  const title = movie.title || "Untitled";

  const backdrop = tmdbImage(
    movie.backdrop_path,
    "original"
  );

  const poster = tmdbImage(
    movie.poster_path,
    "w500"
  );

  const cast =
    movie.credits?.cast?.slice(0, 8) || [];

  const director =
    movie.credits?.crew?.find(
      (person) => person.job === "Director"
    );

  const trailer = findTrailer(movie.videos);

  const certification = findCertification(
    movie.release_dates
  );

  const shots =
    (movie.images?.backdrops || [])
      .filter((image) => image?.file_path)
      .slice(0, 8);

  const genres = movie.genres || [];

  const similar =
    movie.similar?.results || [];

  return (
    <div className="detail-shell">

      {/* =========================
          HERO
      ========================== */}
      <section className="detail-hero">

        {backdrop && (
          <div className="detail-backdrop">
            <Image
              src={backdrop}
              alt=""
              fill
              priority
              sizes="100vw"
            />
          </div>
        )}

        <div className="detail-wash" />

        <div className="detail-content">

          {/* Poster */}
          <Reveal className="detail-poster">
            {poster && (
              <Image
                src={poster}
                alt={`${title} poster`}
                fill
                priority
                sizes="300px"
              />
            )}
          </Reveal>

          {/* Main information */}
          <Reveal className="detail-copy">

            <p className="eyebrow">
              Movie profile
            </p>

            <h1>{title}</h1>

            {movie.tagline && (
              <p className="detail-tagline">
                {movie.tagline}
              </p>
            )}

            {/* Movie stats */}
            <div className="detail-stats">

              <RatingBadge
                value={movie.vote_average}
                size="lg"
              />

              <span>
                <Calendar
                  size={14}
                  className="inline mr-1"
                />

                {formatYear(movie.release_date)}
              </span>

              {movie.runtime && (
                <span>
                  <Clock
                    size={14}
                    className="inline mr-1"
                  />

                  {formatRuntime(movie.runtime)}
                </span>
              )}

              {certification && (
                <span className="pill">
                  {certification}
                </span>
              )}

            </div>

            {/* Genres */}
            {genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5">
                {genres.map((genre) => (
                  <span
                    className="pill"
                    key={genre.id}
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            {movie.overview && (
              <p className="detail-overview">
                {movie.overview}
              </p>
            )}

            {/* Director */}
            {director && (
              <p className="!mt-4 !text-xs">
                Directed by{" "}
                <strong className="text-[var(--text)]">
                  {director.name}
                </strong>
              </p>
            )}

            {/* Actions */}
            <div className="detail-actions">

              {trailer && (
                <TrailerButton
                  youtubeKey={trailer}
                />
              )}

              <SaveButton
                movieId={movie.id}
                variant="button"
              />

            </div>

          </Reveal>

        </div>
      </section>


      {/* =========================
          VISUAL GALLERY
      ========================== */}
      {shots.length > 0 && (
        <section className="gallery">

          <div className="section-head">

            <div>
              <p className="eyebrow">
                <Camera
                  size={13}
                  className="inline mr-1"
                />

                Visual gallery
              </p>

              <h2>
                Behind the frames
              </h2>
            </div>

            <span className="section-count">
              {shots.length}{" "}
              {shots.length === 1
                ? "still"
                : "stills"}
            </span>

          </div>

          <div className="gallery-grid">

            {shots.map((shot, index) => {
              const imageUrl = tmdbImage(
                shot.file_path,
                "w780"
              );

              if (!imageUrl) {
                return null;
              }

              return (
                <div
                  className="gallery-item"
                  key={`${shot.file_path}-${index}`}
                >
                  <Image
                    src={imageUrl}
                    alt={`${title} still ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              );
            })}

          </div>

        </section>
      )}


      {/* =========================
          CAST
      ========================== */}
      {cast.length > 0 && (
        <section className="cast-section">

          <p className="eyebrow">
            The cast
          </p>

          <h2 className="text-2xl font-semibold">
            Faces behind the story
          </h2>

          <div className="cast-grid mt-6">

            {cast.map((person) => {
              const profile = tmdbImage(
                person.profile_path,
                "w185"
              );

              return (
                <div
                  key={
                    person.credit_id ||
                    person.cast_id ||
                    person.id
                  }
                >

                  <div className="cast-photo">

                    {profile && (
                      <Image
                        src={profile}
                        alt={
                          person.name ||
                          "Cast member"
                        }
                        fill
                        sizes="120px"
                      />
                    )}

                  </div>

                  <div className="cast-name">
                    {person.name}
                  </div>

                  {person.character && (
                    <div className="cast-role">
                      {person.character}
                    </div>
                  )}

                </div>
              );
            })}

          </div>

        </section>
      )}


      {/* =========================
          SIMILAR MOVIES
      ========================== */}
      {similar.length > 0 && (
        <SectionGrid
          title="More like this"
          movies={similar}
          eyebrow="You may also like"
        />
      )}

    </div>
  );
}