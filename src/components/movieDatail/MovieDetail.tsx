import React from "react";
import styles from "./movieDetails.module.css";
import { Movie } from "../../types/movies";
import Image from "next/image";

interface MovieDetailsProps {
  movie: Movie;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  return (
    <div className={styles.container}>
      <Image src={imageUrl} alt={movie.title} className={styles.poster} />
      <div className={styles.info}>
        <h1 className={styles.title}>{movie.title}</h1>
        <p className={styles.genres}>
          Géneros: {movie.genres.map((genre) => genre.name).join(", ")}
        </p>
        <p className={styles.releaseDate}>
          Fecha de estreno: {movie.release_date}
        </p>
        <p className={styles.rating}>Rating: {movie.vote_average}/10</p>
        <p className={styles.overview}>{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
