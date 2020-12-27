import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  NavLink,
  Route,
  useRouteMatch,
  Switch,
  Redirect,
  useHistory,
} from 'react-router-dom';
import MoviesApiService from '../../services/theMovieDB-api';
import s from './MovieDetailsPage.module.css';

const Cast = lazy(() => import('../Cast/Cast' /* webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import('../Reviews/Reviews' /* webpackChunkName: "reviews" */),
);

const moviesApiService = new MoviesApiService();

export default function MovieDetailsPage() {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [saveHistoryLength, setSaveHistoryLength] = useState(null);

  const handleBackBtnClk = () => {
    history.go(saveHistoryLength - history.length - 1);
  };

  useEffect(() => {
    setSaveHistoryLength(history.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    moviesApiService.id = movieId;

    moviesApiService.fetchMovieById().then(setMovie).catch(setMovie);
  }, [movieId]);

  return (
    <>
      <button type="button" onClick={handleBackBtnClk}>
        Go back
      </button>

      {movie &&
        (movie.id ? (
          <>
            <div className={s.container}>
              <img
                className={s.img}
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.original_title}
              />
              <div className={s.descr}>
                <h2 className={s.title} data-id={movie.id}>
                  {movie.title} ({movie.release_date.slice(0, 4)})
                </h2>
                <ul className={s.list}>
                  <li>
                    <p className="descr-header"> Vote / Votes</p>
                    <p>
                      <span className={s.vote}>{movie.vote_average}</span> /{' '}
                      {movie.vote_count}
                    </p>
                  </li>
                  <li>
                    <p className="descr-header">Popularity</p>
                    <p>{movie.popularity}</p>
                  </li>
                  <li>
                    <p className="descr-header">Original Title</p>
                    <p>{movie.original_title}</p>
                  </li>
                  <li>
                    <p className="descr-header">Genres</p>
                    <ul className={s.genre}>
                      {movie.genres.map(genre => (
                        <li className={s.genreItem} key={genre.id}>
                          {genre.name}
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
                <h3>Overview</h3>
                <p className={s.overview}>{movie.overview}</p>
              </div>
            </div>
            <div className={s.box}>
              <h3>Additional information</h3>
              <ul>
                <li>
                  <NavLink to={`${url}/cast`}>Cast</NavLink>
                </li>
                <li>
                  <NavLink to={`${url}/reviews`}>Reviews</NavLink>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <Redirect to="/" />
        ))}
      <Suspense fallback={<h2>Loading...</h2>}>
        <Switch>
          <Route path={`${path}/cast`}>{movie && <Cast />}</Route>

          <Route path={`${path}/reviews`}>{movie && <Reviews />}</Route>
        </Switch>
      </Suspense>
    </>
  );
}
