import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import s from './HomePage.module.css';
import MoviesApiService from '../../services/theMovieDB-api';

const moviesApiService = new MoviesApiService();

export default function HomePage() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    moviesApiService
      .fetchTrendingMovies()
      .then(({ results }) => setMovies(results))
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <h1 className={s.title}>Trending today</h1>
      {(movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )) || <h2>Loading...</h2>}
    </>
  );
}
