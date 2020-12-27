import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MoviesApiService from '../../services/theMovieDB-api';

const moviesApiService = new MoviesApiService();

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    moviesApiService.id = movieId;

    moviesApiService.fetchReviewsByMovieId().then(responce => {
      setReviews(responce.results);
    });
  }, [movieId]);

  return (
    <>
      {reviews &&
        (reviews.length > 0 ? (
          <ul>
            {reviews.map(review => (
              <li key={review.id}>
                <p>{review.author}</p>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>We don't have any reviews for this movie</p>
        ))}
    </>
  );
};

export default Reviews;
