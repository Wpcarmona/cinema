/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./RecomendationCard.module.css";
import { Movie } from "../../types/movieTypes";

interface RecomendationCardProps {
  movie: Movie;
}

const RecomendationCard: React.FC<RecomendationCardProps> = ({ movie }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={movie.title} className={styles.poster} />
      <div className={styles.containerBox}>
        <h2 className={styles.title}>{movie.title}</h2>
      </div>
    </div>
  );
};

export default RecomendationCard;
