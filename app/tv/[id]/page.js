import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  Camera,
} from "lucide-react";

import {
  tmdb,
  tmdbImage,
  mediaTitle,
} from "@/lib/tmdb";

import {
  formatRuntime,
  findTrailer,
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

    const series = await tmdb.tvDetails(id);

    return {
      title: `${mediaTitle(series)} — 7thSky`,
      description:
        series.overview?.slice(0, 155) ||
        "Explore this series on 7thSky.",
    };
  } catch {
    return {
      title: "Series — 7thSky",
    };
  }
}

export default async function TVDetailPage({ params }) {
  const { id } = await params;

  let series;

  try {
    series = await tmdb.tvDetails(id);
  } catch {
    notFound();
  }

  if (!series) {
    notFound();
  }

  const title = mediaTitle(series);

  const backdrop = tmdbImage(
    series.backdrop_path,
    "original"
  );

  const poster = tmdbImage(
    series.poster_path,
    "w500"
  );

  const cast =
    series.credits?.cast?.slice(0, 8) || [];

  const trailer = findTrailer(series.videos);

  const shots =
    (series.images?.backdrops || [])
      .filter((image) => image?.file_path)
      .slice(0, 8);

  const genres = series.genres || [];

  const similar =
    series.similar?.results || [];

  const releaseYear =
    String(series.first_air_date || "").slice(0, 4);

  const runtime =
    formatRuntime(
      series.episode_run_time?.[0]
    ) || "Episode runtime";

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

          {/* Content */}
          <Reveal className="detail-copy">

            <p className="eyebrow">
              Series profile
            </p>

            <h1>{title}</h1>

            {series.tagline && (
              <p className="detail-tagline">
                {series.tagline}
              </p>
            )}

            {/* Stats */}
            <div className="detail-stats">

              <RatingBadge
                value={series.vote_average}
                size="lg"
              />

              <span>
                <Calendar
                  size={14}
                  className="inline mr-1"
                />

                {releaseYear || "—"}
              </span>

              <span>
                <Clock
                  size={14}
                  className="inline mr-1"
                />

                {runtime}
              </span>

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
            {series.overview && (
              <p className="detail-overview">
                {series.overview}
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
                movieId={series.id}
                variant="button"
              />

            </div>

          </Reveal>

        </div>
      </section>


      {/* =========================
          GALLERY
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
                    person.id
                  }
                >

                  <div className="cast-photo">

                    {profile && (
                      <Image
                        src={profile}
                        alt={person.name || "Cast member"}
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
          SIMILAR SERIES
      ========================== */}
      {similar.length > 0 && (
        <SectionGrid
          title="More series to explore"
          movies={similar}
          eyebrow="You may also like"
        />
      )}

    </div>
  );
}