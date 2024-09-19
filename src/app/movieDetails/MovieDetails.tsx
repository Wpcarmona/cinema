"use client";
import React, { useEffect, useState } from "react";
import { Movie } from "../../types/movieTypes";
import styles from "./MovieDetails.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHeart } from "@fortawesome/free-solid-svg-icons";
import { getMoviesByPath } from "../../utils/api";
import RecomendationCard from "../../components/recomendationCard/RecomendationCard";

interface MovieDetailProps {
  movie: Movie;
  onBack: () => void;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movie, onBack }) => {
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const ratingPercentage = `${Math.round(movie.vote_average * 10)}%`;

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const movieResponse = await getMoviesByPath(1, "top_rated");
        setTopRatedMovies(movieResponse.results);
      } catch (err) {
        console.error("Error fetching top rated movies:", err);
      }
    };

    fetchTopRatedMovies();
  }, []);

  return (
    <div className={styles.detailContainer}>
      <div
        className={styles.banner}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`,
        }}
      >
        <button onClick={onBack} className={styles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className={styles.content}>
          <div className={styles.leftContent}>
            <div className={styles.coverContainer}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className={styles.coverImage}
              />
              <button className={styles.trailerButton}>Official Trailer</button>
            </div>
          </div>
          <div className={styles.rightContent}>
            <h1 className={styles.title}>{movie.title}</h1>
            <div className={styles.info}>
              <span className={styles.releaseDate}>{movie.release_date}</span>
            </div>
            <h2 className={styles.overviewTitle}>Overview</h2>
            <p className={styles.description}>{movie.overview}</p>
            <div className={styles.ratingContainer}>
              <div className={styles.rating}>{ratingPercentage}</div>
              <FontAwesomeIcon icon={faHeart} className={styles.heartIcon} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.topRatedSection}>
        <h2 className={styles.topRatedTitle}>Recommendations</h2>
        <div className={styles.topRatedContainer}>
          {topRatedMovies.slice(0, 6).map((movie) => (
            <RecomendationCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
