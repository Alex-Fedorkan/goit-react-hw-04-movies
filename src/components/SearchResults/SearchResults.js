import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import MoviesApiService from '../../services/theMovieDB-api';

const moviesApiService = new MoviesApiService();

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const SearchResults = () => {
  const location = useLocation();
  const { url } = useRouteMatch();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  const searchQuery = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      return setStatus(Status.IDLE);
    }

    setMovies([]);
    setStatus(Status.PENDING);

    moviesApiService.resetPage();
    moviesApiService.query = searchQuery;

    moviesApiService
      .fetchMovies()
      .then(movies => {
        if (movies.total_results) {
          setStatus(Status.RESOLVED);
          setMovies(movies.results);
        } else {
          return Promise.reject(new Error(`No match found!`));
        }
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [searchQuery]);

  if (status === Status.IDLE) {
    return null;
  }

  if (status === Status.PENDING && !movies.length) {
    return <h1>Loading...</h1>;
  }

  if (status === Status.REJECTED) {
    return <h1>{error.message}</h1>;
  }

  if (status === Status.RESOLVED) {
    return (
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`${url}/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    );
  }
};

export default SearchResults;
