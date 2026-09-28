"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  X,
  Bookmark,
  Search,
  Compass,
  Clapperboard,
  ChevronDown,
  Sparkles,
  Film,
  Star,
  ArrowUpRight,
} from "lucide-react";

import Logo from "@/components/Logo";
import SearchBar from "@/components/SearchBar";
import ThemeToggle from "@/components/ThemeToggle";

const GENRES = [
  [28, "Action"],
  [12, "Adventure"],
  [16, "Animation"],
  [35, "Comedy"],
  [80, "Crime"],
  [99, "Documentary"],
  [18, "Drama"],
  [14, "Fantasy"],
  [27, "Horror"],
  [9648, "Mystery"],
  [10749, "Romance"],
  [878, "Sci-Fi"],
  [53, "Thriller"],
];

const MAIN_LINKS = [
  {
    href: "/",
    label: "Discover",
    icon: Compass,
    description: "Explore movies",
  },
  {
    href: "/web-series",
    label: "Series",
    icon: Clapperboard,
    description: "Binge worthy shows",
  },
  {
    href: "/reading-list",
    label: "My List",
    icon: Bookmark,
    description: "Your saved movies",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [genres, setGenres] = useState(false);
  const pathname = usePathname();

  // Close everything whenever route changes
  useEffect(() => {
    setOpen(false);
    setGenres(false);
  }, [pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="site-header">
      <div className="nav-shell">

        {/* ================= LOGO ================= */}
        <Link
          href="/"
          className="nav-brand"
          aria-label="Go to homepage"
        >
          <Logo />
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="desktop-nav" aria-label="Main navigation">

          {MAIN_LINKS.slice(0, 2).map(
            ({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`nav-link ${
                  isActive(href) ? "nav-link-active" : ""
                }`}
              >
                <Icon size={15} strokeWidth={2} />
                <span>{label}</span>
              </Link>
            )
          )}

          {/* GENRES */}
          <div
            className="genre-wrap"
            onMouseEnter={() => setGenres(true)}
            onMouseLeave={() => setGenres(false)}
          >
            <button
              type="button"
              className={`nav-link ${
                pathname.startsWith("/genre") ? "nav-link-active" : ""
              }`}
              onClick={() => setGenres((v) => !v)}
              aria-expanded={genres}
            >
              <Sparkles size={15} />
              <span>Genres</span>
              <ChevronDown
                size={13}
                className={`genre-chevron ${
                  genres ? "genre-chevron-open" : ""
                }`}
              />
            </button>

            {genres && (
              <div className="genre-menu">

                <div className="genre-menu-head">
                  <div>
                    <span className="genre-kicker">
                      <Film size={11} />
                      Browse the collection
                    </span>

                    <h3>Find your mood</h3>
                  </div>

                  <Sparkles size={18} />
                </div>

                <div className="genre-grid">
                  {GENRES.map(([id, name]) => (
                    <Link
                      key={id}
                      href={`/genre/${id}`}
                      className={
                        pathname === `/genre/${id}`
                          ? "genre-active"
                          : ""
                      }
                    >
                      <span className="genre-dot" />
                      {name}
                    </Link>
                  ))}
                </div>

                <Link href="/genres" className="all-genres">
                  <span>Explore all genres</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            )}
          </div>

          {/* MY LIST */}
          <Link
            href="/reading-list"
            className={`nav-link ${
              isActive("/reading-list")
                ? "nav-link-active"
                : ""
            }`}
          >
            <Bookmark size={15} />
            <span>My List</span>
          </Link>
        </nav>

        {/* ================= DESKTOP ACTIONS ================= */}
        <div className="nav-actions">

          <div className="nav-search">
            <SearchBar />
          </div>

          <Link
            href="/search"
            className="icon-btn search-mobile-trigger"
            aria-label="Search"
          >
            <Search size={17} />
          </Link>

          <Link
            href="/reading-list"
            className="icon-btn desktop-list-btn"
            aria-label="My list"
          >
            <Bookmark size={17} />
          </Link>

          <div className="desktop-theme">
            <ThemeToggle />
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            className={`mobile-menu-btn ${
              open ? "mobile-menu-active" : ""
            }`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {open && (
        <div className="mobile-overlay">

          <div className="mobile-panel">

            {/* Mobile top */}
            <div className="mobile-panel-top">
              <div>
                <span className="mobile-eyebrow">
                  <Sparkles size={11} />
                  Cinema universe
                </span>

                <h2>Where do you want to go?</h2>
              </div>

              <button
                type="button"
                className="mobile-close"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X size={19} />
              </button>
            </div>

            {/* Search */}
            <div className="mobile-search-box">
              <div className="mobile-search-label">
                <Search size={13} />
                <span>Search movies, series & people</span>
              </div>

              <SearchBar />
            </div>

            {/* Main links */}
            <div className="mobile-links">

              {MAIN_LINKS.map(
                ({
                  href,
                  label,
                  icon: Icon,
                  description,
                }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`mobile-nav-card ${
                      isActive(href)
                        ? "mobile-nav-active"
                        : ""
                    }`}
                  >
                    <span className="mobile-card-icon">
                      <Icon size={19} />
                    </span>

                    <span className="mobile-card-content">
                      <strong>{label}</strong>
                      <small>{description}</small>
                    </span>

                    <ArrowUpRight
                      size={16}
                      className="mobile-card-arrow"
                    />
                  </Link>
                )
              )}

              {/* Genres */}
              <div className="mobile-genre-box">

                <div className="mobile-genre-title">
                  <span className="mobile-card-icon">
                    <Sparkles size={18} />
                  </span>

                  <span>
                    <strong>Genres</strong>
                    <small>Pick your next mood</small>
                  </span>

                  <Star size={15} />
                </div>

                <div className="mobile-genre-grid">
                  {GENRES.map(([id, name]) => (
                    <Link
                      key={id}
                      href={`/genre/${id}`}
                      className={
                        pathname === `/genre/${id}`
                          ? "mobile-genre-active"
                          : ""
                      }
                    >
                      {name}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/genres"
                  className="mobile-all-genres"
                >
                  Explore all genres
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* Appearance */}
            <div className="mobile-theme">
              <div>
                <span className="appearance-title">
                  Appearance
                </span>

                <span className="appearance-subtitle">
                  Personalize your cinema
                </span>
              </div>

              <ThemeToggle />
            </div>

            {/* Bottom decoration */}
            <div className="mobile-footer-glow">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
