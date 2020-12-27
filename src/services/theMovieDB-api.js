const API_KEY = '6051117e6b9550508a2a40fdd673c490';
const BASE_URL = 'https://api.themoviedb.org/3/';
// const CORS = 'https://cors-anywhere.herokuapp.com/';
const CORS = '';

export default class MoviesApiService {
  constructor() {
    this.searchQuery = '';
    this.movieId = null;
    this.page = 1;
  }

  fetchTrendingMovies() {
    const url = `${CORS}${BASE_URL}trending/movie/day?api_key=${API_KEY}`;

    return fetch(url).then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(new Error('Bad request!'));
    });
  }

  fetchMovies() {
    const url = `${CORS}${BASE_URL}search/movie?api_key=${API_KEY}&query=${this.searchQuery}`;

    return fetch(url).then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(new Error('Bad request!'));
    });
  }

  fetchMovieById() {
    const url = `${CORS}${BASE_URL}movie/${this.movieId}?api_key=${API_KEY}`;

    return fetch(url).then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(new Error('Bad request!'));
    });
  }

  fetchCastByMovieId() {
    const url = `${CORS}${BASE_URL}movie/${this.movieId}/credits?api_key=${API_KEY}`;

    return fetch(url).then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(new Error('Bad request!'));
    });
  }

  fetchReviewsByMovieId() {
    const url = `${CORS}${BASE_URL}movie/${this.movieId}/reviews?api_key=${API_KEY}`;

    return fetch(url).then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(new Error('Bad request!'));
    });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get id() {
    return this.movieId;
  }

  set id(newId) {
    this.movieId = newId;
  }

  get pageNum() {
    return this.page;
  }

  set pageNum(newNum) {
    this.page = newNum;
  }
}
