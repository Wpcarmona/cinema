import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import styles from "./movieCard.module.css";
import { Movie } from "../../types/movieTypes";

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  const ratingPercentage = `${Math.round(movie.vote_average * 10)}%`;

  return (
    <div className={styles.card} onClick={onClick}>
      <img src={imageUrl} alt={movie.title} className={styles.poster} />
      <div className={styles.containerBox}>
        <h2 className={styles.title}>{movie.title}</h2>
        <p className={styles.releaseDate}>{movie.release_date}</p>
        <div className={styles.container}>
          <div className={styles.contentRating}>
            <span className={styles.label}>Rating</span>
            <div className={styles.rating}>{ratingPercentage}</div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.contentRating}>
            <span className={styles.label}>Favorite</span>
            <button className={styles.favoriteButton}>
              <FontAwesomeIcon icon={faHeart} className={styles.heartIcon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
