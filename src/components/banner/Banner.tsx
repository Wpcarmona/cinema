"use client";

import React, { useEffect, useState } from "react";
import styles from "./Banner.module.css";
import { getMovieDetails } from "../../utils/api";
import { Movie } from "../../types/movieTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const movieIds = [
  365177, 1022789, 646097, 917496, 573435, 970347, 923667, 1079091, 945961,
  831815,
];

const Banner: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [ratingPercentage, setRatingPercentage] = useState<string>("0%");

  useEffect(() => {
    const fetchRandomMovie = async () => {
      const randomId = movieIds[Math.floor(Math.random() * movieIds.length)];
      try {
        const movieDetails = await getMovieDetails(randomId.toString());
        setMovie(movieDetails);
        setRatingPercentage(`${Math.round(movieDetails.vote_average * 10)}%`);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchRandomMovie();
  }, []);

  if (!movie) return <p>Loading...</p>;

  return (
    <div
      className={styles.banner}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`,
      }}
    >
      <div className={styles.content}>
        <div className={styles.leftContent}>
          <h1 className={styles.title}>{movie.title}</h1>
          <p className={styles.description}>{movie.overview}</p>
        </div>
        <div className={styles.rightContent}>
          <button className={styles.favoriteButton}>
            <FontAwesomeIcon icon={faHeart} className={styles.heartIcon} />
          </button>
          <div className={styles.divider}></div>
          <div className={styles.rating}>{ratingPercentage}</div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
