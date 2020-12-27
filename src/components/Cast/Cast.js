import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MoviesApiService from '../../services/theMovieDB-api';

const moviesApiService = new MoviesApiService();

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    moviesApiService.id = movieId;

    moviesApiService.fetchCastByMovieId().then(responce => {
      setCast(responce.cast);
    });
  }, [movieId]);

  return (
    <>
      {cast && (
        <ul>
          {cast.map(actor => (
            <li key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                alt={actor.name}
                width="100"
              />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Cast;
