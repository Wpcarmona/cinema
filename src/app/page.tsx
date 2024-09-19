"use client";

import React, { useState, useEffect } from "react";
import MovieDetail from "./movieDetails/MovieDetails";
import MovieListPage from "./movies/MovieListPage";
import { Movie } from "../types/movieTypes";
import Auth from "./auth/Auth";

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  if (selectedMovie) {
    return (
      <MovieDetail
        movie={selectedMovie}
        onBack={() => setSelectedMovie(null)}
      />
    );
  }

  return (
    <div>
      {!isAuthenticated && <Auth onAuthSuccess={handleAuthSuccess} />}
      <MovieListPage onMovieClick={(movie) => setSelectedMovie(movie)} />
    </div>
  );
}
