"use client";

import React, { useEffect, useState } from "react";
import MovieCard from "../../components/movieCard/MovieCard";
import { getMoviesByPath, addFavorite } from "../../utils/api";
import { Movie, MovieResponse } from "../../types/movieTypes";
import styles from "./MovieListPage.module.css";
import Pagination from "../../components/pagination/Pagination";

interface MovieListPageProps {
  onMovieClick?: (movie: Movie) => void;
  onFavoriteClick?: (movie: Movie) => void;
}

const MovieListPage: React.FC<MovieListPageProps> = ({
  onMovieClick,
  onFavoriteClick,
}) => {
  const [page, setPage] = useState<number>(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [upcomming, setUpcomming] = useState<Movie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleFavoriteClick = async (movie: Movie) => {
    if (!isAuthenticated) {
      alert("Please log in to add favorites");
      return;
    }
    try {
      await addFavorite(movie.id.toString());
      onFavoriteClick?.(movie);
      alert(`${movie.title} has been added to your favorites.`);
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert(`Failed to add ${movie.title} to favorites.`);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieResponse: MovieResponse = await getMoviesByPath(page, "popular");
        setMovies(movieResponse.results);
        const upcommingResponse: MovieResponse = await getMoviesByPath(page, "now_playing");
        setUpcomming(upcommingResponse.results);
        const nowPlayingResponse: MovieResponse = await getMoviesByPath(page, "upcoming");
        setNowPlaying(nowPlayingResponse.results);
        const topratedMovies: MovieResponse = await getMoviesByPath(page, "top_rated");
        setTopRated(topratedMovies.results);
      } catch (err) {
        setError("Error fetching movies");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!isAuthenticated) {
    return <p>Please log in to view movies and add to favorites.</p>;
  }

  return (
    <div>
      <div className={styles.contentMain}>
        <div>
          <label className={styles.titleName}>Popular</label>
          <div className={styles.moviesContainer}>
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => onMovieClick?.(movie)}
                onClickFavorite={() => handleFavoriteClick(movie)}
              />
            ))}
          </div>
        </div>
        <div>
          <label className={styles.titleName}>Now Playing</label>
          <div className={styles.moviesContainer}>
            {nowPlaying.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => onMovieClick?.(movie)}
                onClickFavorite={() => handleFavoriteClick(movie)}
              />
            ))}
          </div>
        </div>
        <div>
          <label className={styles.titleName}>Upcoming</label>
          <div className={styles.moviesContainer}>
            {upcomming.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => onMovieClick?.(movie)}
                onClickFavorite={() => handleFavoriteClick(movie)}
              />
            ))}
          </div>
        </div>
        <div>
          <label className={styles.titleName}>Top Rated</label>
          <div className={styles.moviesContainer}>
            {topRated.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => onMovieClick?.(movie)}
                onClickFavorite={() => handleFavoriteClick(movie)}
              />
            ))}
          </div>
        </div>
      </div>
      <Pagination currentPage={page} onPageChange={(p) => setPage(p)} />
    </div>
  );
};

export default MovieListPage;
