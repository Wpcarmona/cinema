import React, { useState} from 'react';
import { searchMovies } from '../../utils/api';
import {MovieCard} from '../../components/index';
import { Movie } from '../../types/movies';
import styles from './search.module.css';

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const results = await searchMovies(query);
    setMovies(results);
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1>Buscar Películas</h1>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          placeholder="Buscar por palabra clave..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Buscar</button>
      </form>

      {loading && <p>Cargando...</p>}

      <div className={styles.movieGrid}>
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          !loading && <p>No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
