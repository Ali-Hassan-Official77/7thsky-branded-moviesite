
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Star,
  Plus,
} from "lucide-react";

import {
  tmdbImage,
  mediaDate,
  mediaTitle,
} from "@/lib/tmdb";

import { formatRating } from "@/lib/utils";

export default function Hero({ movies = [] }) {
  const items = movies.filter(Boolean).slice(0, 7);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const reduce = useReducedMotion();

  useEffect(() => {
    if (items.length < 2 || reduce || paused) return;

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [items.length, reduce, paused]);

  if (!items.length) {
    return (
      <section className="cinema-hero">
        <div className="cinema-hero-loading" />
      </section>
    );
  }

  const movie = items[index];

  const title = mediaTitle(movie);

  const year = String(mediaDate(movie) || "").slice(0, 4);

  const backdrop = tmdbImage(
    movie.backdrop_path || movie.poster_path,
    "original"
  );

  const poster = tmdbImage(
    movie.poster_path || movie.backdrop_path,
    "w780"
  );

  const nextIndex = (index + 1) % items.length;
  const nextMovie = items[nextIndex];

  const previousIndex =
    (index - 1 + items.length) % items.length;

  const previousMovie = items[previousIndex];

  const goNext = () => {
    setIndex((current) => (current + 1) % items.length);
  };

  const goPrevious = () => {
    setIndex(
      (current) =>
        (current - 1 + items.length) % items.length
    );
  };

  return (
    <section
      className="cinema-hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* =================================================
          BACKDROP
      ================================================= */}

      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${movie.id}`}
          className="cinema-backdrop"
          initial={
            reduce
              ? { opacity: 1 }
              : {
                  opacity: 0,
                  scale: 1.025,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={
            reduce
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  scale: 1.015,
                }
          }
          transition={{
            duration: reduce ? 0.2 : 1,
            ease: "easeOut",
          }}
        >
          {backdrop && (
            <Image
              src={backdrop}
              alt=""
              fill
              priority
              sizes="100vw"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* =================================================
          CINEMATIC OVERLAY
      ================================================= */}

      <div className="cinema-vignette" />
      <div className="cinema-gradient" />
      <div className="cinema-grain" />

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="cinema-hero-inner">

        {/* LEFT CONTENT */}

        <AnimatePresence mode="wait">
          <motion.div
            key={movie.id}
            className="cinema-content"
            initial={
              reduce
                ? undefined
                : {
                    opacity: 0,
                    x: -18,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={
              reduce
                ? undefined
                : {
                    opacity: 0,
                    x: -12,
                  }
            }
            transition={{
              duration: 0.55,
              ease: "easeOut",
            }}
          >
            {/* Editorial label */}

            <div className="cinema-label">
              <span className="cinema-label-line" />

              <span>
                FEATURED FILM
              </span>

              <span className="cinema-label-number">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Title */}

            <h1 className="cinema-title">
              {title}
            </h1>

            {/* Meta */}

            <div className="cinema-meta">

              {movie.vote_average > 0 && (
                <span className="cinema-rating">
                  <Star
                    size={13}
                    fill="currentColor"
                  />

                  {formatRating(
                    movie.vote_average
                  )}
                </span>
              )}

              {year && (
                <span>
                  {year}
                </span>
              )}

              <span>
                {movie.genre_ids?.length ||
                  movie.genres?.length ||
                  0}{" "}
                genres
              </span>

              <span className="cinema-quality">
                TMDB
              </span>
            </div>

            {/* Overview */}

            <p className="cinema-description">
              {movie.overview ||
                "Discover a new story from the cinematic universe."}
            </p>

            {/* Actions */}

            <div className="cinema-actions">

              <Link
                href={`/movie/${movie.id}`}
                className="cinema-primary"
              >
                <Play
                  size={15}
                  fill="currentColor"
                />

                Watch details
              </Link>

              <Link
                href="/reading-list"
                className="cinema-secondary"
              >
                <Plus size={16} />

                My list
              </Link>
            </div>

            {/* Desktop navigation */}

            <div className="cinema-navigation">

              <button
                type="button"
                onClick={goPrevious}
                aria-label="Previous movie"
                className="cinema-nav-button"
              >
                <ArrowLeft size={15} />
              </button>

              <div className="cinema-progress">
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="cinema-progress-line">
                  <motion.i
                    key={movie.id}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: 7,
                      ease: "linear",
                    }}
                  />
                </div>

                <span>
                  {String(items.length).padStart(2, "0")}
                </span>
              </div>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next movie"
                className="cinema-nav-button"
              >
                <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>


        {/* =================================================
            POSTER FRAME
        ================================================= */}

        <AnimatePresence mode="wait">
          <motion.div
            key={`poster-${movie.id}`}
            className="cinema-poster-area"
            initial={
              reduce
                ? undefined
                : {
                    opacity: 0,
                    y: 16,
                    scale: 0.97,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={
              reduce
                ? undefined
                : {
                    opacity: 0,
                    y: -10,
                  }
            }
            transition={{
              duration: 0.65,
              ease: "easeOut",
            }}
          >
            <Link
              href={`/movie/${movie.id}`}
              className="cinema-poster-link"
              aria-label={`Open ${title}`}
            >
              <div className="cinema-poster-frame">

                {/* Poster */}

                {poster && (
                  <Image
                    src={poster}
                    alt={`${title} poster`}
                    fill
                    priority
                    sizes="(max-width: 700px) 42vw, 390px"
                  />
                )}

                {/* Frame lighting */}

                <div className="cinema-poster-light" />

                {/* Frame label */}

                <div className="cinema-poster-top">
                  <span>
                    7TH SKY
                  </span>

                  <span>
                    {year || "—"}
                  </span>
                </div>

                {/* Bottom title strip */}

                <div className="cinema-poster-bottom">
                  <span>
                    VIEW FILM
                  </span>

                  <ArrowRight size={13} />
                </div>
              </div>
            </Link>

            {/* Next movie preview */}

            <div className="cinema-next">

              <span className="cinema-next-label">
                NEXT
              </span>

              <div className="cinema-next-info">
                <span>
                  {mediaTitle(nextMovie)}
                </span>

                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next movie"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>


      {/* =================================================
          MOBILE FILM STRIP
      ================================================= */}

      <div className="cinema-mobile-strip">

        <button
          type="button"
          onClick={goPrevious}
          aria-label={`Previous: ${mediaTitle(
            previousMovie
          )}`}
        >
          <ArrowLeft size={14} />
        </button>

        <div className="cinema-mobile-strip-track">

          {items.map((item, i) => (
            <button
              key={item.id || i}
              type="button"
              onClick={() => setIndex(i)}
              className={
                i === index
                  ? "active"
                  : ""
              }
              aria-label={`Show ${mediaTitle(item)}`}
            >
              <span />
            </button>
          ))}

        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label={`Next: ${mediaTitle(
            nextMovie
          )}`}
        >
          <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
}
