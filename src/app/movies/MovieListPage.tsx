'use client';
import React, { useEffect, useState } from 'react';
import MovieCard from '../../components/movieCard/MovieCard';
import { getMoviesByPath } from '../../utils/api'; 
import { Movie, MovieResponse } from '../../types/movieTypes';
import styles from './MovieListPage.module.css'
import Pagination from '../../components/pagination/Pagination';

interface MovieListPageProps {
  onMovieClick: (movie: Movie) => void;
}

const MovieListPage: React.FC<MovieListPageProps> = ({ onMovieClick }) => {
  const [page, setPage] = useState<number>(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [upcomming, setUpcomming] = useState<Movie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieResponse: MovieResponse = await getMoviesByPath(page,'popular');
        setMovies(movieResponse.results);
        const upcommingResponse: MovieResponse = await getMoviesByPath(page,'now_playing');
        setUpcomming(upcommingResponse.results);
        const nowPlayingResponse: MovieResponse = await getMoviesByPath(page,'upcoming');
        setNowPlaying(nowPlayingResponse.results);
        const topratedMovies: MovieResponse = await getMoviesByPath(page,'top_rated');
        setTopRated(topratedMovies.results);
      } catch (err) {
        setError('Error fetching movies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  
  return (
    <div>
       <div className={styles.contentMain}>
      <div>
        <label className={styles.titleName}>Popular</label>
        <div className={styles.moviesContainer}>
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} onClick={() => onMovieClick(movie)} />
          ))}
        </div>
      </div>
      <div>
        <label className={styles.titleName}>Now Playing</label>
        <div className={styles.moviesContainer}>
          {nowPlaying.map(movie => (
            <MovieCard key={movie.id} movie={movie} onClick={() => onMovieClick(movie)} />
          ))}
        </div>
      </div>
      <div>
        <label className={styles.titleName}>Upcomming</label>
        <div className={styles.moviesContainer}>
          {upcomming.map(movie => (
            <MovieCard key={movie.id} movie={movie} onClick={() => onMovieClick(movie)} />
          ))}
        </div>
      </div>
      <div>
        <label className={styles.titleName}>Top Rated</label>
        <div className={styles.moviesContainer}>
          {topRated.map(movie => (
            <MovieCard key={movie.id} movie={movie} onClick={() => onMovieClick(movie)} />
          ))}
        </div>
      </div>
    </div>
      <Pagination currentPage={page} onPageChange={(p) => setPage(p)} />
    </div>
  );
};

export default MovieListPage;
